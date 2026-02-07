import { GoogleGenAI } from '@google/genai';
import { parseTicketText, buildAiAnalysis } from '../src/lib/ticketAnalysis.js';

const DEFAULT_MODEL = process.env.GEMINI_MODEL || 'gemini-3-flash-preview';
const MAX_IMAGE_BYTES = 2 * 1024 * 1024;
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const stripToJson = (text: string) => {
  if (!text) return '';
  const first = text.indexOf('{');
  const last = text.lastIndexOf('}');
  if (first === -1 || last === -1 || last <= first) return '';
  return text.slice(first, last + 1);
};

const safeJsonParse = (text: string) => {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
};

const extractStatuteNumber = (statute: string) => {
  if (!statute) return '';
  const normalized = statute.replace(/\s+/g, '').toUpperCase();
  const match = normalized.match(/(\d{2,5}(?:\.\d+)?)/);
  return match ? match[1] : '';
};

const resolveStatuteUrl = (state: string, statute: string) => {
  const stateCode = (state || '').trim().toUpperCase();
  const normalized = (statute || '').replace(/\s+/g, '').toUpperCase();
  const number = extractStatuteNumber(normalized);
  if (!number) return null;

  if (stateCode === 'CA' || normalized.startsWith('VC') || normalized.startsWith('CVC')) {
    return `https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=${number}.&lawCode=VEH`;
  }

  if (stateCode === 'FL' || normalized.startsWith('316')) {
    const chapterMatch = number.match(/(\d{3})\.?\d+/);
    if (!chapterMatch) return null;
    const chapter = chapterMatch[1].padStart(4, '0');
    const section = number.replace(/^\d{3}\.?/, '');
    return `https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&Search_String=&URL=${chapter}00-${chapter}99/${chapter}/Sections/${chapter}.${section}.html`;
  }

  return null;
};

const fetchStatuteSource = async (state: string, statute: string) => {
  const url = resolveStatuteUrl(state, statute);
  if (!url) return null;

  const jinaUrl = `https://r.jina.ai/http://${url.replace(/^https?:\/\//, '')}`;
  const response = await fetch(jinaUrl);
  if (!response.ok) return null;
  const text = await response.text();
  const snippet = text.replace(/\s+/g, ' ').slice(0, 1200);
  return {
    label: 'Statute reference',
    url,
    snippet,
  };
};

const runOcr = async (imageUrl: string) => {
  const visionKey = process.env.GOOGLE_VISION_API_KEY;
  if (!visionKey) {
    throw new Error('Missing GOOGLE_VISION_API_KEY for OCR.');
  }

  const response = await fetch(
    `https://vision.googleapis.com/v1/images:annotate?key=${visionKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requests: [
          {
            image: { source: { imageUri: imageUrl } },
            features: [{ type: 'TEXT_DETECTION' }],
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`OCR request failed: ${message}`);
  }

  const data = await response.json();
  return data?.responses?.[0]?.fullTextAnnotation?.text || '';
};

const normalizeBase64 = (input: string) =>
  (input || '').replace(/^data:[^;]+;base64,/, '');

const estimateBase64Bytes = (base64: string) => {
  const cleaned = normalizeBase64(base64);
  if (!cleaned) return 0;
  const padding = cleaned.endsWith('==') ? 2 : cleaned.endsWith('=') ? 1 : 0;
  return Math.max(0, Math.floor((cleaned.length * 3) / 4) - padding);
};

const runOcrFromBase64 = async (imageBase64: string) => {
  const visionKey = process.env.GOOGLE_VISION_API_KEY;
  if (!visionKey) {
    throw new Error('Missing GOOGLE_VISION_API_KEY for OCR.');
  }

  const content = normalizeBase64(imageBase64);
  if (!content) {
    throw new Error('Missing imageBase64 content.');
  }

  const response = await fetch(
    `https://vision.googleapis.com/v1/images:annotate?key=${visionKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requests: [
          {
            image: { content },
            features: [{ type: 'TEXT_DETECTION' }],
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`OCR request failed: ${message}`);
  }

  const data = await response.json();
  return data?.responses?.[0]?.fullTextAnnotation?.text || '';
};

const runAi = async ({
  parsedData,
  rawText,
  useWebSources,
}: {
  parsedData: any;
  rawText: string;
  useWebSources?: boolean;
}) => {
  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    return { ai: null, sources: [], usedAi: false, error: 'Missing GEMINI_API_KEY.' };
  }

  const sources: Array<{ label: string; url: string; snippet: string }> = [];
  if (useWebSources) {
    try {
      const source = await fetchStatuteSource(parsedData?.driver?.state, parsedData?.violation?.statute);
      if (source) sources.push(source);
    } catch {
      // Ignore web lookup errors
    }
  }

  const systemHint =
    'You are a traffic ticket analyst. Provide a neutral, non-legal-advice summary and practical defense prep notes. Output JSON only.';
  const prompt = `
${systemHint}

Ticket OCR text:
${rawText}

Parsed fields (may be incomplete):
${JSON.stringify(parsedData, null, 2)}

${sources.length ? `Reference snippet:\n${sources[0].snippet}\n` : ''}

Return JSON with this shape:
{
  "quickSummary": "string",
  "strategy": [{"title": "string", "detail": "string"}],
  "flags": ["string"],
  "confidence": number
}
`.trim();

  const ai = new GoogleGenAI({ apiKey });
  try {
    const response = await ai.models.generateContent({
      model: DEFAULT_MODEL,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.2,
      },
    });

    const raw = response.text || '';
    const parsedJson = safeJsonParse(raw) || safeJsonParse(stripToJson(raw));
    if (!parsedJson) {
      return { ai: null, sources, usedAi: false, error: 'AI response was not JSON.' };
    }

    return { ai: parsedJson, sources, usedAi: true, error: '' };
  } catch (error: any) {
    const message = error?.message || 'AI request failed.';
    return { ai: null, sources, usedAi: false, error: message };
  }
};

export default async function handler(req: any, res: any) {
  Object.entries(CORS_HEADERS).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { imageUrl, imageBase64, useAi = true, useWebSources = false, rawText } = req.body || {};

    if (!imageUrl && !imageBase64 && !rawText) {
      res.status(400).json({ error: 'Missing imageUrl, imageBase64, or rawText.' });
      return;
    }

    if (imageBase64) {
      const bytes = estimateBase64Bytes(imageBase64);
      if (bytes > MAX_IMAGE_BYTES) {
        res.status(413).json({ error: 'Image too large. Max 2MB.' });
        return;
      }
    }

    const text = rawText || (imageBase64 ? await runOcrFromBase64(imageBase64) : await runOcr(imageUrl));
    if (!text || !text.trim()) {
      res.status(422).json({ error: 'No readable text found.' });
      return;
    }

    const parsed = parseTicketText(text);
    const fallbackAi = buildAiAnalysis(parsed);

    let aiOutput = fallbackAi;
    let aiSources: Array<{ label: string; url: string; snippet: string }> = [];
    let aiMeta = { usedAi: false, error: '' };

    if (useAi) {
      const aiResult = await runAi({ parsedData: parsed, rawText: text, useWebSources });
      if (aiResult.ai) {
        aiOutput = { ...fallbackAi, ...aiResult.ai };
      }
      aiSources = aiResult.sources || [];
      aiMeta = { usedAi: aiResult.usedAi, error: aiResult.error || '' };
    }

    res.status(200).json({
      parsed,
      ai: {
        ...aiOutput,
        sources: aiSources,
      },
      aiMeta,
      ticketImage: imageUrl || null,
    });
  } catch (error: any) {
    res.status(500).json({ error: error?.message || 'Server error.' });
  }
}
