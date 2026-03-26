const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

export const parsePipeline = async (payload) => {
  const response = await fetch(`${API_BASE_URL}/pipelines/parse`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('The backend could not validate this pipeline.');
  }

  return response.json();
};
