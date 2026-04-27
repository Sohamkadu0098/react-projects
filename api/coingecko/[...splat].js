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

  const splat = req.query.splat;
  const pathSegments = Array.isArray(splat) ? splat : splat ? [splat] : [];
  const proxyPath = pathSegments.join("/");

  if (!proxyPath) {
    return res.status(400).json({ error: "Missing CoinGecko API path" });
  }

  const query = new URLSearchParams(req.query);
  query.delete("splat");

  const targetUrl = `${API_BASE}/${proxyPath}${query.toString() ? `?${query.toString()}` : ""}`;

  try {
    const response = await fetch(targetUrl, {
      headers: {
        accept: "application/json",
        [apiHeader]: apiKey,
      },
    });

    const body = await response.text();
    const contentType = response.headers.get("content-type") || "application/json";

    res.status(response.status);
    res.setHeader("content-type", contentType);
    return res.send(body);
  } catch {
    return res.status(502).json({ error: "Failed to reach CoinGecko" });
  }
}
