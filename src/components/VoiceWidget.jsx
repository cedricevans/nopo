import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Mic } from 'lucide-react';
import { GoogleGenAI, Modality, Type } from '@google/genai';
import { ConnectionStatus } from '@/voice/types';
import { decode, decodeAudioData, createBlob } from '@/voice/utils/audio';
import { SYSTEM_INSTRUCTION } from '@/voice/constants';

const normalize = (value) => (value || '').toLowerCase().replace(/[^a-z0-9]/g, '');

const vipLookup = (rawText, entities = {}) => {
  const raw = normalize(rawText);
  const phone = normalize(entities.phone || entities.case_id || '');

  const matches = (name, phoneDigits) =>
    raw.includes(normalize(name)) || (phoneDigits && phone.includes(phoneDigits));

  if (matches('cedric evans', '4048890186')) return 'cedric';
  if (matches('nia evans', '4049320709')) return 'nia';
  if (matches('jc evans', '2108689160')) return 'jc';
  if (matches('dinavon bythwood', '7862858505')) return 'dinavon';
  if (matches('michelle bythwood', '')) return 'michelle';
  if (matches('imani evans', '')) return 'imani';
  if (matches('mr felder', '')) return 'felder';
  return null;
};

const mockBackendProcessor = (intent, entities, rawUserMessage) => {
  const vip = vipLookup(rawUserMessage, entities);
  if (vip) {
    switch (vip) {
      case 'cedric':
        return { response_for_voice_agent: 'Welcome back, Cedric. I have your demo case #CN-104928. Status: Defense Built. Next steps: strategy formulated and we are preparing court documents. Estimated completion: Oct 30, 2026. Do you want a full summary or a quick status update?' };
      case 'jc':
        return { response_for_voice_agent: 'Welcome back, JC. Your case update was sent to your parents. Please check with them on the latest status. Want me to look it up here as well?' };
      case 'dinavon':
        return { response_for_voice_agent: 'Welcome back, Dinavon. Is this ticket for you or for Michelle?' };
      case 'michelle':
        return { response_for_voice_agent: 'Hi Michelle. I can check your case status right now. Please confirm your phone number or case ID.' };
      case 'nia':
        return { response_for_voice_agent: 'Miss Nia? Always great to hear from you. Want me to check your status or help with a new ticket?' };
      case 'felder':
        return { response_for_voice_agent: 'Mr. Felder, welcome. This app lets you scan a ticket, match with a licensed attorney, and track every step with real-time updates. Want a quick demo or a status check?' };
      case 'imani':
        return { response_for_voice_agent: 'Hi Imani. Your tickets are resolved, thanks to the wonderful work of your dad. You are all set.' };
      default:
        break;
    }
  }
  const e = entities || {};

  switch (intent) {
    case 'upload_ticket':
      if (!e.state) return { response_for_voice_agent: "I can help with that. Which state issued the ticket?" };
      if (!e.violation) return { response_for_voice_agent: `Got it, ${e.state}. What type of violation is listed? For example, speeding or a red light.` };
      if (!e.court_date) return { response_for_voice_agent: "I've noted the violation. What is the court date shown on your ticket?" };
      return { response_for_voice_agent: `Thank you. I have the ${e.violation} in ${e.state} for ${e.court_date}. Is all that information correct?` };

    case 'check_status':
      if (!e.phone && !e.case_id) return { response_for_voice_agent: "I can look up your case status. Please tell me your phone number or Case ID." };
      return { response_for_voice_agent: "Searching... Your case is currently being reviewed by our legal team. We will text you an update shortly." };

    case 'pricing':
      return { response_for_voice_agent: "NOPO charges a flat ninety-nine dollar fee for most traffic tickets. This includes the legal professional's review and handling the contest." };

    case 'how_it_works':
      return { response_for_voice_agent: "NOPO connects you with legal professionals who contest your ticket for you. You just upload the photo, and we handle the rest to help keep points off your license." };

    case 'navigation':
      return { response_for_voice_agent: "I'm the voice assistant, and I can help you navigate. Would you like to go to the upload page or view your dashboard?" };

    case 'help':
      return { response_for_voice_agent: "I'm here to help with your ticket, status checks, or explaining how NOPO works. What would you like to start with?" };

    default:
      return { response_for_voice_agent: "I'm here to help you resolve your ticket. You can ask me to upload a ticket, check your status, or learn more about NOPO." };
  }
};

const VoiceWidget = () => {
  const [status, setStatus] = useState(ConnectionStatus.IDLE);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Tap to start');

  const inputAudioContextRef = useRef(null);
  const outputAudioContextRef = useRef(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef(new Set());
  const sessionRef = useRef(null);
  const transcriptionRef = useRef({ user: '', assistant: '' });
  const greetedRef = useRef(false);

  const stopAllAudio = useCallback(() => {
    sourcesRef.current.forEach((source) => {
      try { source.stop(); } catch {}
    });
    sourcesRef.current.clear();
    nextStartTimeRef.current = 0;
  }, []);

  const stopSession = useCallback(() => {
    if (sessionRef.current) {
      sessionRef.current.then((session) => session.close());
      sessionRef.current = null;
    }
    if (inputAudioContextRef.current) inputAudioContextRef.current.close();
    if (outputAudioContextRef.current) outputAudioContextRef.current.close();
    setStatus(ConnectionStatus.IDLE);
    setIsListening(false);
    setStatusMessage('Tap to start');
    greetedRef.current = false;
    stopAllAudio();
  }, [stopAllAudio]);

  useEffect(() => () => stopSession(), [stopSession]);

  const startSession = async () => {
    try {
      setStatus(ConnectionStatus.CONNECTING);
      const hasVisited = localStorage.getItem('nopoVoiceVisited') === 'true';
      const storedName = localStorage.getItem('nopoVoiceName');
      const greetingPrompt = hasVisited
        ? `Give a warm, varied welcome-back greeting${storedName ? ` that uses their name (${storedName})` : ''}. It must include a welcome-back style message and can mention timely context (like a holiday) if relevant. Then ask for their name and phone number to look up their ticket. Mention you can also help upload a ticket or explain how NOPO works.`
        : 'Give a short friendly greeting. Ask their name and phone number so you can check status. Mention you can also help upload a ticket or explain how NOPO works.';

      localStorage.setItem('nopoVoiceVisited', 'true');
      setStatusMessage('Connecting...');
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

      inputAudioContextRef.current = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
      outputAudioContextRef.current = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 24000 });

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const sendToBackendTool = {
        name: 'send_to_backend',
        parameters: {
          type: Type.OBJECT,
          description: 'Pass the identified intent and extracted entities to the NOPO backend.',
          properties: {
            intent: { type: Type.STRING, description: 'One of: upload_ticket, check_status, pricing, how_it_works, navigation, help' },
            entities: {
              type: Type.OBJECT,
              description: 'Entities like state, violation, court_date, ticket_number, phone, case_id',
              properties: {
                state: { type: Type.STRING },
                violation: { type: Type.STRING },
                court_date: { type: Type.STRING },
                ticket_number: { type: Type.STRING },
                phone: { type: Type.STRING },
                case_id: { type: Type.STRING }
              }
            },
            raw_user_message: { type: Type.STRING, description: 'The verbatim user input.' }
          },
          required: ['intent', 'raw_user_message']
        }
      };

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: SYSTEM_INSTRUCTION,
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
          tools: [{ functionDeclarations: [sendToBackendTool] }],
          inputAudioTranscription: {},
          outputAudioTranscription: {},
        },
        callbacks: {
          onopen: () => {
            setStatus(ConnectionStatus.CONNECTED);
            setIsListening(true);

            const source = inputAudioContextRef.current.createMediaStreamSource(stream);
            const scriptProcessor = inputAudioContextRef.current.createScriptProcessor(4096, 1, 1);

            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromise.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContextRef.current.destination);

            sessionPromise.then((session) => {
              if (session?.sendRealtimeInput && !greetedRef.current) {
                greetedRef.current = true;
                session.sendRealtimeInput({ text: greetingPrompt });
              }
            });
          },
          onmessage: async (message) => {
            if (message.toolCall) {
              for (const fc of message.toolCall.functionCalls) {
                if (fc.name === 'send_to_backend') {
                  const backendResponse = mockBackendProcessor(fc.args.intent, fc.args.entities, fc.args.raw_user_message);
                  sessionPromise.then((session) => {
                    session.sendToolResponse({
                      functionResponses: {
                        id: fc.id,
                        name: fc.name,
                        response: { result: backendResponse.response_for_voice_agent }
                      }
                    });
                  });
                }
              }
            }

            if (message.serverContent?.inputTranscription) {
              transcriptionRef.current.user += message.serverContent.inputTranscription.text;
            }
            if (message.serverContent?.outputTranscription) {
              transcriptionRef.current.assistant += message.serverContent.outputTranscription.text;
            }
            if (message.serverContent?.turnComplete) {
              transcriptionRef.current = { user: '', assistant: '' };
            }

            const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData) {
              setIsSpeaking(true);
              const outCtx = outputAudioContextRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outCtx.currentTime);

              const buffer = await decodeAudioData(decode(audioData), outCtx, 24000, 1);
              const source = outCtx.createBufferSource();
              source.buffer = buffer;
              source.connect(outCtx.destination);
              source.onended = () => {
                sourcesRef.current.delete(source);
                if (sourcesRef.current.size === 0) setIsSpeaking(false);
              };
              sourcesRef.current.add(source);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
            }
          },
          onerror: () => {
            setStatus(ConnectionStatus.ERROR);
            setIsListening(false);
            setStatusMessage('Connection error. Please try again.');
            stopAllAudio();
          },
          onclose: () => {
            setStatus(ConnectionStatus.IDLE);
            setIsListening(false);
            setStatusMessage('Tap to start');
            stopAllAudio();
          }
        }
      });

      sessionRef.current = sessionPromise;
    } catch {
      setStatus(ConnectionStatus.ERROR);
      setIsListening(false);
      setStatusMessage('Connection error. Please try again.');
      stopAllAudio();
    }
  };

  const toggleSession = () => {
    if (status === ConnectionStatus.CONNECTED || status === ConnectionStatus.CONNECTING) {
      stopSession();
      return;
    }
    startSession();
  };

  return (
    <button
      onClick={toggleSession}
      className="inline-flex items-center justify-center gap-3 rounded-full border border-[#C6FF4D]/50 bg-[#0F213A] px-6 sm:px-7 py-6 sm:py-7 h-[64px] sm:h-[76px] w-full sm:w-auto text-sm sm:text-base font-semibold text-white shadow-[0_0_20px_rgba(198,255,77,0.2)] hover:shadow-[0_0_30px_rgba(198,255,77,0.35)] hover:bg-[#122844] transition-all whitespace-nowrap"
      type="button"
    >
      <span className={`flex items-center justify-center w-8 h-8 rounded-full bg-[#C6FF4D]/20 text-[#C6FF4D] ${isListening ? 'animate-pulse' : ''}`}>
        <Mic className="w-4 h-4" />
      </span>
      Talk to NOPO (Voice AI)
      <span className="flex items-end gap-1 h-4">
        {[8, 12, 10, 14, 9].map((height, idx) => (
          <span
            key={height}
            className={`w-1 rounded-full ${
              isListening ? 'bg-[#C6FF4D] animate-pulse' : 'bg-white/30'
            }`}
            style={{ height: `${height}px`, animationDelay: `${idx * 120}ms` }}
          />
        ))}
      </span>
      <span className="sr-only">Tap to speak. I can check your case in seconds.</span>
    </button>
  );
};

export default VoiceWidget;
