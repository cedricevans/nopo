const DEFAULTS = {
  maxDimension: 1800,
  contrast: 1.3,
  threshold: 165
};

const loadImage = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Unable to load image.'));
      img.src = reader.result;
    };
    reader.onerror = () => reject(new Error('Unable to read image.'));
    reader.readAsDataURL(file);
  });

const clamp = (value) => Math.max(0, Math.min(255, value));

export const preprocessTicketImage = async (file, options = {}) => {
  const settings = { ...DEFAULTS, ...options };
  const image = await loadImage(file);

  const scale = Math.min(
    1,
    settings.maxDimension / Math.max(image.width, image.height)
  );
  const width = Math.round(image.width * scale);
  const height = Math.round(image.height * scale);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas not supported.');
  }

  ctx.drawImage(image, 0, 0, width, height);

  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const gray = 0.299 * r + 0.587 * g + 0.114 * b;
    const contrasted = clamp((gray - 128) * settings.contrast + 128);
    const value = contrasted > settings.threshold ? 255 : 0;
    data[i] = value;
    data[i + 1] = value;
    data[i + 2] = value;
    data[i + 3] = 255;
  }

  ctx.putImageData(imageData, 0, 0);

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png', 1));
  if (!blob) {
    throw new Error('Failed to prepare image for OCR.');
  }

  return blob;
};
