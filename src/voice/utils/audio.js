export const decode = (base64) => {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
};

export const createPcmAudioMessage = (float32Array, sampleRate = 16000) => {
  const buffer = new ArrayBuffer(float32Array.length * 2);
  const view = new DataView(buffer);
  for (let i = 0; i < float32Array.length; i += 1) {
    const sample = Math.max(-1, Math.min(1, float32Array[i]));
    view.setInt16(i * 2, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
  }
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return {
    data: btoa(binary),
    mimeType: `audio/pcm;rate=${sampleRate}`
  };
};

export const downsampleTo16k = (float32Array, inputRate) => {
  if (!inputRate || inputRate === 16000) return float32Array;
  const ratio = inputRate / 16000;
  const outputLength = Math.round(float32Array.length / ratio);
  const output = new Float32Array(outputLength);
  let offset = 0;
  for (let i = 0; i < outputLength; i += 1) {
    const nextOffset = Math.round((i + 1) * ratio);
    let sum = 0;
    let count = 0;
    for (let j = offset; j < nextOffset && j < float32Array.length; j += 1) {
      sum += float32Array[j];
      count += 1;
    }
    output[i] = count ? sum / count : 0;
    offset = nextOffset;
  }
  return output;
};

export const decodeAudioData = (pcmBytes, audioContext, sampleRate, channels) => {
  const bytes = pcmBytes instanceof Uint8Array ? pcmBytes : new Uint8Array(pcmBytes);
  const frameCount = Math.floor(bytes.byteLength / 2 / channels);
  const audioBuffer = audioContext.createBuffer(channels, frameCount, sampleRate);
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);

  for (let channel = 0; channel < channels; channel += 1) {
    const channelData = audioBuffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i += 1) {
      const index = (i * channels + channel) * 2;
      const sample = view.getInt16(index, true);
      channelData[i] = sample / 0x8000;
    }
  }

  return audioBuffer;
};
