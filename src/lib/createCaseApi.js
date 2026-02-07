const apiBase = import.meta.env.VITE_API_BASE_URL || '';

export const createCase = async (payload) => {
  const base = apiBase.replace(/\/$/, '');
  const url = base ? `${base}/api/create-case` : '/api/create-case';

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Case creation failed.');
  }

  return response.json();
};
