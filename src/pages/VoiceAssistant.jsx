import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, Modality, Type } from '@google/genai';
import { ConnectionStatus } from '@/voice/types';
import { decode, decodeAudioData, createPcmAudioMessage, downsampleTo16k } from '@/voice/utils/audio';
import { SYSTEM_INSTRUCTION } from '@/voice/constants';

const Header = () => (
  <header className="bg-white border-b border-slate-200 py-4 px-6 flex justify-between items-center sticky top-0 z-50 backdrop-blur-md bg-white/90">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-blue-200 shadow-lg">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <div>
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight leading-none">NOPO <span className="text-blue-600 font-medium">VOICE</span></h1>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Ticket Resolution Assistant</p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <div className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded-full border border-green-100 uppercase tracking-wider">
        Live Agent
      </div>
    </div>
  </header>
);

const mockBackendProcessor = (intent, entities) => {
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

const VoiceAssistant = () => {
  const [status, setStatus] = useState(ConnectionStatus.IDLE);
  const [transcriptions, setTranscriptions] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const inputAudioContextRef = useRef(null);
  const outputAudioContextRef = useRef(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef(new Set());
  const sessionRef = useRef(null);
  const transcriptionRef = useRef({ user: '', assistant: '' });
  const transcriptContainerRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const mediaSourceRef = useRef(null);
  const processorRef = useRef(null);
  const workletNodeRef = useRef(null);
  const workletGainRef = useRef(null);
  const canSendAudioRef = useRef(false);
  const sessionOpenRef = useRef(false);
  const pcmBufferRef = useRef({ chunks: [], length: 0 });
  const targetSamplesRef = useRef(3200);

  useEffect(() => {
    if (transcriptContainerRef.current) {
      transcriptContainerRef.current.scrollTop = transcriptContainerRef.current.scrollHeight;
    }
  }, [transcriptions]);

  const stopAllAudio = useCallback(() => {
    sourcesRef.current.forEach((source) => {
      try { source.stop(); } catch {}
    });
    sourcesRef.current.clear();
    nextStartTimeRef.current = 0;
  }, []);

  const cleanupAudioPipeline = useCallback(() => {
    canSendAudioRef.current = false;
    pcmBufferRef.current = { chunks: [], length: 0 };
    if (processorRef.current) {
      processorRef.current.onaudioprocess = null;
      try { processorRef.current.disconnect(); } catch {}
      processorRef.current = null;
    }
    if (workletNodeRef.current) {
      workletNodeRef.current.port.onmessage = null;
      try { workletNodeRef.current.disconnect(); } catch {}
      workletNodeRef.current = null;
    }
    if (workletGainRef.current) {
      try { workletGainRef.current.disconnect(); } catch {}
      workletGainRef.current = null;
    }
    if (mediaSourceRef.current) {
      try { mediaSourceRef.current.disconnect(); } catch {}
      mediaSourceRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (inputAudioContextRef.current) {
      try { inputAudioContextRef.current.close(); } catch {}
    }
    if (outputAudioContextRef.current) {
      try { outputAudioContextRef.current.close(); } catch {}
    }
    stopAllAudio();
  }, [stopAllAudio]);

  const startSession = async () => {
    try {
      setStatus(ConnectionStatus.CONNECTING);
      const hasVisited = localStorage.getItem('nopoVoiceVisited') === 'true';
      const storedName = localStorage.getItem('nopoVoiceName');
      const greetingPrompt = hasVisited
        ? `Give a warm, varied welcome-back greeting${storedName ? ` that uses their name (${storedName})` : ''}. It must include a welcome-back style message and can mention timely context (like a holiday) if relevant. Then ask for their name and phone number to look up their ticket. Mention you can also help upload a ticket or explain how NOPO works.`
        : 'Give a short friendly greeting. Ask their name and phone number so you can check status. Mention you can also help upload a ticket or explain how NOPO works.';

      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

      inputAudioContextRef.current = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
      outputAudioContextRef.current = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 24000 });
      await inputAudioContextRef.current.resume();
      await outputAudioContextRef.current.resume();
      targetSamplesRef.current = Math.round((inputAudioContextRef.current.sampleRate || 16000) * 0.2);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

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
            localStorage.setItem('nopoVoiceVisited', 'true');
            canSendAudioRef.current = true;
            sessionOpenRef.current = true;

            const source = inputAudioContextRef.current.createMediaStreamSource(stream);
            mediaSourceRef.current = source;

            inputAudioContextRef.current.audioWorklet
              .addModule(new URL('../voice/worklets/pcm-processor.js', import.meta.url))
              .then(() => {
                if (!canSendAudioRef.current) return;
                const workletNode = new AudioWorkletNode(inputAudioContextRef.current, 'pcm-processor');
                const silentGain = inputAudioContextRef.current.createGain();
                silentGain.gain.value = 0;
                workletNodeRef.current = workletNode;
                workletGainRef.current = silentGain;

                workletNode.port.onmessage = (event) => {
                  if (!canSendAudioRef.current || !sessionOpenRef.current) return;
                  const inputData = event.data;
                  if (!inputData || !inputData.length) return;
                  const bufferState = pcmBufferRef.current;
                  bufferState.chunks.push(inputData);
                  bufferState.length += inputData.length;

                  const targetSamples = targetSamplesRef.current;
                  while (bufferState.length >= targetSamples) {
                    const merged = new Float32Array(targetSamples);
                    let offset = 0;
                    while (offset < targetSamples && bufferState.chunks.length) {
                      const chunk = bufferState.chunks[0];
                      const remaining = targetSamples - offset;
                      if (chunk.length <= remaining) {
                        merged.set(chunk, offset);
                        offset += chunk.length;
                        bufferState.chunks.shift();
                      } else {
                        merged.set(chunk.subarray(0, remaining), offset);
                        bufferState.chunks[0] = chunk.subarray(remaining);
                        offset += remaining;
                      }
                    }
                    bufferState.length -= targetSamples;
                    const inputRate = inputAudioContextRef.current?.sampleRate || 16000;
                    const payload = inputRate === 16000 ? merged : downsampleTo16k(merged, inputRate);
                    const pcmMessage = createPcmAudioMessage(payload, 16000);
                    sessionPromise.then((session) => {
                      if (!canSendAudioRef.current || !sessionOpenRef.current) return;
                      try {
                        session.sendRealtimeInput({ audio: pcmMessage });
                      } catch {
                        sessionOpenRef.current = false;
                        cleanupAudioPipeline();
                      }
                    });
                  }
                };

                source.connect(workletNode);
                workletNode.connect(silentGain);
                silentGain.connect(inputAudioContextRef.current.destination);
              })
              .catch((err) => {
                console.error('VoiceAssistant: audio worklet failed', err);
                setStatus(ConnectionStatus.ERROR);
                setIsListening(false);
                cleanupAudioPipeline();
              });

            sessionPromise.then((session) => {
              if (session?.sendRealtimeInput && canSendAudioRef.current) {
                try { session.sendRealtimeInput({ text: greetingPrompt }); } catch {}
              }
            });
          },
          onmessage: async (message) => {
            if (message.toolCall) {
              for (const fc of message.toolCall.functionCalls) {
                if (fc.name === 'send_to_backend') {
                  const backendResponse = mockBackendProcessor(fc.args.intent, fc.args.entities);
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
              const userText = transcriptionRef.current.user.trim();
              const assistantText = transcriptionRef.current.assistant.trim();
              if (userText) setTranscriptions((prev) => [...prev, { role: 'user', text: userText, timestamp: new Date() }]);
              if (assistantText) setTranscriptions((prev) => [...prev, { role: 'assistant', text: assistantText, timestamp: new Date() }]);
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
          onerror: (err) => {
            console.error('VoiceAssistant: session error', err);
            setStatus(ConnectionStatus.ERROR);
            setIsListening(false);
            sessionOpenRef.current = false;
            cleanupAudioPipeline();
          },
          onclose: () => {
            setStatus(ConnectionStatus.IDLE);
            setIsListening(false);
            sessionOpenRef.current = false;
            cleanupAudioPipeline();
          }
        }
      });

      sessionPromise.catch((err) => {
        console.error('VoiceAssistant: session connect failed', err);
        setStatus(ConnectionStatus.ERROR);
        setIsListening(false);
        cleanupAudioPipeline();
      });

      sessionRef.current = sessionPromise;
    } catch (err) {
      console.error('VoiceAssistant: startSession failed', err);
      setStatus(ConnectionStatus.ERROR);
      setIsListening(false);
      stopAllAudio();
    }
  };

  const stopSession = () => {
    if (sessionRef.current) {
      sessionRef.current.then((session) => session.close());
      sessionRef.current = null;
    }
    cleanupAudioPipeline();
    setStatus(ConnectionStatus.IDLE);
    setIsListening(false);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Voice Session</h2>
              <p className="text-sm text-slate-500">Start a live conversation with NOPO Voice.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                status === ConnectionStatus.CONNECTED
                  ? 'bg-green-50 text-green-600 border-green-200'
                  : status === ConnectionStatus.CONNECTING
                    ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                    : status === ConnectionStatus.ERROR
                      ? 'bg-red-50 text-red-600 border-red-200'
                      : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}>
                {status === ConnectionStatus.CONNECTED && 'Connected'}
                {status === ConnectionStatus.CONNECTING && 'Connecting...'}
                {status === ConnectionStatus.ERROR && 'Connection Error'}
                {status === ConnectionStatus.IDLE && 'Idle'}
              </span>
              {status === ConnectionStatus.IDLE || status === ConnectionStatus.ERROR ? (
                <button
                  onClick={startSession}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg"
                >
                  Start Session
                </button>
              ) : (
                <button
                  onClick={stopSession}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-900 font-bold px-4 py-2 rounded-lg"
                >
                  Stop
                </button>
              )}
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-3 h-3 rounded-full ${
                isListening ? 'bg-green-500 animate-pulse' : 'bg-slate-300'
              }`}></div>
              <p className="text-sm text-slate-600">
                {isListening ? 'Listening for your voice...' : 'Microphone is off'}
              </p>
              <div className={`ml-auto text-xs font-semibold ${
                isSpeaking ? 'text-blue-600' : 'text-slate-400'
              }`}>
                {isSpeaking ? 'Assistant speaking' : 'Assistant idle'}
              </div>
            </div>

            <div
              ref={transcriptContainerRef}
              className="h-80 overflow-y-auto border border-slate-100 rounded-xl p-4 bg-slate-50"
            >
              {transcriptions.length === 0 && (
                <p className="text-slate-400 text-sm">No transcript yet. Start a session to begin.</p>
              )}
              {transcriptions.map((entry, idx) => (
                <div key={`${entry.role}-${idx}`} className="mb-4">
                  <div className={`text-xs font-semibold uppercase tracking-wider ${
                    entry.role === 'user' ? 'text-slate-500' : 'text-blue-600'
                  }`}>
                    {entry.role === 'user' ? 'You' : 'Assistant'}
                  </div>
                  <p className="text-slate-800">{entry.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default VoiceAssistant;
