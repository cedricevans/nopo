import { GoogleGenAI } from '@google/genai';

const DEFAULT_MODEL = 'gemini-3-flash-preview';

const stripToJson = (text) => {
  if (!text) return '';
  const first = text.indexOf('{');
  const last = text.lastIndexOf('}');
  if (first === -1 || last === -1 || last <= first) return '';
  return text.slice(first, last + 1);
};

const safeJsonParse = (text) => {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
};

const extractStatuteNumber = (statute) => {
  if (!statute) return '';
  const normalized = statute.replace(/\s+/g, '').toUpperCase();
  const match = normalized.match(/(\d{2,5}(?:\.\d+)?)/);
  return match ? match[1] : '';
};

const resolveStatuteUrl = (state, statute) => {
  const stateCode = (state || '').trim().toUpperCase();
  const normalized = (statute || '').replace(/\s+/g, '').toUpperCase();
  const number = extractStatuteNumber(normalized);
  if (!number) return null;

  if (stateCode === 'CA' || normalized.startsWith('VC') || normalized.startsWith('CVC')) {
    return `https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=${number}.&lawCode=VEH`;
  }

  if (stateCode === 'FL' || normalized.startsWith('316')) {
    const chapterMatch = number.match(/(\d{3})\.?(\d+)/);
    if (!chapterMatch) return null;
    const chapter = chapterMatch[1].padStart(4, '0');
    const section = chapterMatch[2];
    return `https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&Search_String=&URL=${chapter}00-${chapter}99/${chapter}/Sections/${chapter}.${section}.html`;
  }

  return null;
};

const fetchStatuteSource = async (state, statute) => {
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
    snippet
  };
};

export const generateAiAnalysis = async ({
  parsedData,
  rawText,
  useWebSources
}) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    return { ai: null, sources: [], usedAi: false, error: 'Missing API key.' };
  }

  const sources = [];
  if (useWebSources) {
    try {
      const source = await fetchStatuteSource(parsedData?.driver?.state, parsedData?.violation?.statute);
      if (source) sources.push(source);
    } catch {
      // Ignore web lookup errors for demo mode.
    }
  }

  const systemHint = `You are a traffic ticket analyst. Provide a neutral, non-legal-advice summary and practical defense prep notes. Output JSON only.`;
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
        temperature: 0.2
      }
    });

    const raw = response.text || '';
    const parsedJson = safeJsonParse(raw) || safeJsonParse(stripToJson(raw));
    if (!parsedJson) {
      return { ai: null, sources, usedAi: false, error: 'AI response was not JSON.' };
    }

    return { ai: parsedJson, sources, usedAi: true, error: '' };
  } catch (error) {
    const message = error?.message || 'AI request failed.';
    return { ai: null, sources, usedAi: false, error: message };
  }
};

export const testAiConnection = async () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    return { ok: false, error: 'Missing API key.' };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    await ai.models.generateContent({
      model: DEFAULT_MODEL,
      contents: 'ping',
      config: {
        responseMimeType: 'text/plain',
        temperature: 0
      }
    });
    return { ok: true, error: '' };
  } catch (error) {
    return { ok: false, error: error?.message || 'AI request failed.' };
  }
};
