export const decode = (base64) => {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
};

export const createBlob = (float32Array) => {
  const buffer = new ArrayBuffer(float32Array.length * 2);
  const view = new DataView(buffer);
  for (let i = 0; i < float32Array.length; i += 1) {
    const sample = Math.max(-1, Math.min(1, float32Array[i]));
    view.setInt16(i * 2, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
  }
  return new Blob([buffer], { type: 'audio/pcm;rate=16000' });
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
