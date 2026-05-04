# Crypto Tracker

A React + Vite cryptocurrency tracking app that displays live market data and coin details with charting support.  
The app fetches data through a backend proxy route for safer API key handling.

![Build](https://img.shields.io/badge/Build-Passing-brightgreen)
![Deploy](https://img.shields.io/badge/Deploy-Netlify-00C7B7)
![License](https://img.shields.io/badge/License-Not%20Specified-orange)

## Live Demo

- [trackingcryptoforlife.netlify.app](https://trackingcryptoforlife.netlify.app/)

## Screenshots

- Add homepage screenshot here: `docs/screenshots/crypto-home.png`
- Add coin detail screenshot here: `docs/screenshots/crypto-coin.png`

## Features

- Top cryptocurrency table on home page
- Search coins by name
- Coin detail page for each asset
- Market chart visualization using `react-google-charts`
- Currency-aware prices from shared app context
- API proxy integration for CoinGecko endpoints

## Tech Stack

- React
- Vite
- React Router
- Context API
- `react-google-charts`
- Netlify Functions (for API proxy)

## Getting Started

### 1) Clone and install

```bash
git clone https://github.com/Sohamkadu0098/react-projects.git
cd react-projects
npm install
```

### 2) Run locally

```bash
npm run dev
```

### 3) Build and preview

```bash
npm run build
npm run preview
```

## Environment Variables

For API proxy deployments, set:

- `COINGECKO_API_KEY` (required)
- `COINGECKO_API_HEADER` (optional, default: `x-cg-demo-api-key`)

## Deployment Notes (Netlify)

This project includes:

- `netlify.toml` redirects `/api/coingecko/*` to Netlify function
- `netlify/functions/coingecko.js` proxy handler

If `COINGECKO_API_KEY` is missing, the function returns:

- `500 Server API key not configured`

## Project Structure

```text
src/
  components/
    Navbar/
    Footer/
    LineChart/
  context/
    Coinscontext.jsx
  pages/
    Home/
    Coin/
  lib/
    api.js
  App.jsx
  main.jsx
```

## What I Learned

- Managing app-wide state (currency and coin data) using Context API
- Building route-driven detail pages for dynamic coin IDs
- Handling asynchronous API + chart data loading with better UX states
- Deploying with a serverless proxy to protect API key usage

## API Source

- [CoinGecko API](https://www.coingecko.com/en/api)
