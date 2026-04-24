const API_BASE_PATH = import.meta.env.VITE_API_BASE_PATH || "/api";

export async function getFromApi(path, params = {}) {
  const query = new URLSearchParams(params).toString();
  const url = `${API_BASE_PATH}/coingecko/${path}${query ? `?${query}` : ""}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}
