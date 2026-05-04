# Practice Ecom (React Store)

A modern ecommerce-style React app built with TypeScript and Vite.  
This project displays products from the DummyJSON API with search, category filtering, price filtering, keyword shortcuts, sorting, and product detail pages.

![Build](https://img.shields.io/badge/Build-Passing-brightgreen)
![Deploy](https://img.shields.io/badge/Deploy-Coming%20Soon-lightgrey)
![License](https://img.shields.io/badge/License-Not%20Specified-orange)

## Live Demo

- Coming soon

## Screenshots

- Add homepage screenshot here: `docs/screenshots/ecom-home.png`
- Add product detail screenshot here: `docs/screenshots/ecom-product.png`

## Features

- Product listing with paginated API fetch
- Search products by title
- Filter by category
- Filter by minimum and maximum price
- Quick keyword filters
- Sort by price (low-high / high-low) and popularity
- Product details page with image, description, price, and rating
- Responsive layout with sidebar + main content

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- Axios
- Lucide React icons

## Getting Started

### 1) Clone the repository

```bash
git clone https://github.com/Sohamkadu0098/react-projects.git
cd react-projects
```

### 2) Install dependencies

```bash
npm install
```

### 3) Run in development

```bash
npm run dev
```

### 4) Build for production

```bash
npm run build
```

### 5) Preview production build

```bash
npm run preview
```

## Project Structure

```text
src/
  components/
    FilterContext.tsx
    sidebar.tsx
    MainContent.tsx
    BookCard.tsx
    productPage.tsx
  App.tsx
  main.tsx
```

## API Used

- Product list/search/details: [https://dummyjson.com/products](https://dummyjson.com/products)

## What I Learned

- Building a reusable filter state with Context API for cross-component communication
- Managing route-based UI flow between product listing and detail pages
- Combining API fetch + local filtering + sorting for a practical ecommerce browsing experience
- Structuring a React + TypeScript project for scalability and clean component separation

## Notes

- This app currently uses external API data and does not include checkout/auth flow.
- UI and filtering logic can be extended with cart and backend integration later.
