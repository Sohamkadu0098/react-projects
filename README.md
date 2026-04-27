# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Netlify deployment setup

This app proxies CoinGecko requests through the Netlify function at
`/.netlify/functions/coingecko` using the redirect defined in `netlify.toml`.

Before deploying, add these environment variables in Netlify:

- `COINGECKO_API_KEY` - your CoinGecko API key (required)
- `COINGECKO_API_HEADER` - header name to send the key with (optional, defaults to `x-cg-demo-api-key`)

If `COINGECKO_API_KEY` is missing, the function returns a `500` response with
`Server API key not configured`.

## Vercel deployment setup (GitHub)

This repo also includes a Vercel serverless function at
`api/coingecko/[...splat].js` for production API proxying.

1. Push your code to GitHub.
2. Import the repo in Vercel.
3. In project settings, add environment variables:
   - `COINGECKO_API_KEY` (required)
   - `COINGECKO_API_HEADER` (optional, defaults to `x-cg-demo-api-key`)
4. Deploy.

The frontend already calls `/api/coingecko/*`, so no app code change is needed.
`vercel.json` is included for Vite build config and SPA route fallback.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
