# Letter Store

Streetwear storefront demo for Letter Store built with Next.js 14 and Tailwind. Static mock catalog, no backend.

## Features

- Home page with hero, marquee and new arrivals
- Filterable, searchable catalog (tees, hoodies, hats, shorts)
- Statically generated product pages with size selection and related products
- Cart drawer and cart page, persisted in `localStorage`, with free-shipping threshold logic
- Contact page (demo form, nothing is sent anywhere)
- Custom cursor, scramble-text and page transitions; respects `prefers-reduced-motion`

## Stack

- Next.js 14 (App Router) and React 18
- TypeScript
- Tailwind CSS 3
- lucide-react icons
- Bebas Neue and DM Mono via `next/font/google`

## Run locally

```bash
npm ci
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Project structure

```
app/          routes: home, catalog, product/[slug], cart, contact
components/   navbar, footer, product card, cart drawer, UI effects
context/      cart state (useReducer + localStorage)
data/         static product catalog (products.ts)
public/       logo and product photos
```

## License

Code is released under the MIT License (see `LICENSE`). Brand assets in `public/` are excluded from that license.

## Brand assets

Brand assets belong to Letter Store and are used with permission.
