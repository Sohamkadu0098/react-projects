const API_BASE = "https://api.coingecko.com/api/v3";

export async function handler(event) {
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  const apiKey = process.env.COINGECKO_API_KEY;
  const apiHeader = process.env.COINGECKO_API_HEADER || "x-cg-demo-api-key";
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server API key not configured" }),
    };
  }

  // Robust path extraction - splat is reliable from Netlify redirect
  const proxyPath =
    event.pathParameters?.splat ||
    (event.path || "")
      .replace(/^\/(api\/coingecko|\.netlify\/functions\/coingecko)\/?/, "")
      .replace(/^\//, "");

  if (!proxyPath) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing CoinGecko API path" }),
    };
  }

  // Use standard queryStringParameters - rawQuery is not a standard Netlify field
  const queryString = new URLSearchParams(
    event.queryStringParameters || {}
  ).toString();
  const targetUrl = `${API_BASE}/${proxyPath}${queryString ? `?${queryString}` : ""}`;

  try {
    const response = await fetch(targetUrl, {
      headers: {
        accept: "application/json",
        [apiHeader]: apiKey,
      },
    });

    const text = await response.text();
    return {
      statusCode: response.status,
      headers: {
        "content-type": response.headers.get("content-type") || "application/json",
      },
      body: text,
    };
  } catch {
    return {
      statusCode: 502,
      body: JSON.stringify({ error: "Failed to reach CoinGecko" }),
    };
  }
}
