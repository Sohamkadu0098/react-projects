const API_BASE = "https://api.coingecko.com/api/v3";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.COINGECKO_API_KEY;
  const apiHeader = process.env.COINGECKO_API_HEADER || "x-cg-demo-api-key";

  if (!apiKey) {
    return res.status(500).json({ error: "Server API key not configured" });
  }

  // Extract the path from the URL
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathParts = url.pathname.split('/').filter(p => p && p !== 'api' && p !== 'coingecko');
  const proxyPath = pathParts.join('/');

  if (!proxyPath) {
    return res.status(400).json({ error: "Missing CoinGecko API path" });
  }

  // Build the target URL with query parameters
  const targetUrl = `${API_BASE}/${proxyPath}${url.search}`;

  try {
    const response = await fetch(targetUrl, {
      headers: {
        accept: "application/json",
        [apiHeader]: apiKey,
      },
    });

    const text = await response.text();

    // Set the appropriate content type
    const contentType = response.headers.get("content-type") || "application/json";
    res.setHeader("content-type", contentType);

    res.status(response.status).send(text);
  } catch (error) {
    res.status(502).json({ error: "Failed to reach CoinGecko" });
  }
}