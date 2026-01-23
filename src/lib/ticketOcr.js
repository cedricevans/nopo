const TESSERACT_CDN = 'https://cdn.jsdelivr.net/npm/tesseract.js@4.0.2/dist/tesseract.min.js';

let tesseractLoader;

const loadTesseract = () => {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('OCR can only run in the browser.'));
  }
  if (window.Tesseract) {
    return Promise.resolve(window.Tesseract);
  }
  if (tesseractLoader) {
    return tesseractLoader;
  }

  tesseractLoader = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = TESSERACT_CDN;
    script.async = true;
    script.onload = () => resolve(window.Tesseract);
    script.onerror = () => reject(new Error('Failed to load OCR engine.'));
    document.head.appendChild(script);
  });

  return tesseractLoader;
};

export const runOcr = async (file, onProgress) => {
  const Tesseract = await loadTesseract();
  const result = await Tesseract.recognize(file, 'eng', {
    logger: (message) => {
      if (message.status === 'recognizing text' && typeof onProgress === 'function') {
        onProgress(message.progress || 0);
      }
    }
  });

  return result?.data?.text || '';
};
