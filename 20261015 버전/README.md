# Aethel Criemhild — brand site (2026-10-15 version)

Multi-page site built with React 19, Vite and Tailwind CSS v4. Same design as the previous one-page site;
content is consumer-facing only (trade inquiries go through the Contact form).

```bash
npm install
npm run dev      # http://localhost:5173 — /virtue, /contact… work as on the live site
npm run build    # static output in dist/
```

## Pages

| URL | File | Component |
|---|---|---|
| `/` (philosophy at `/#philosophy`) | `index.html` | `Home` in `src/main.jsx` (Hero, Philosophy, Collection, Ritual, Desserts, closing band) |
| `/virtue` `/origin` `/tribute` `/wicked` | `virtue.html` … | `src/pages/CollectionPage.jsx` |
| `/frozen-tears-of-socrates` `/dondurma` | `frozen-tears-of-socrates.html` … | `src/pages/ProductPage.jsx` |
| `/contact` (`?type=trade` preselects Trade & Wholesale) | `contact.html` | `src/pages/ContactPage.jsx` |
| `/privacy` `/terms` `/accessibility` `/404` | plain HTML | `src/legal.jsx` adds header and footer |

Each page's `.html` file holds its title, description, canonical and Open Graph tags, and names the page with
`<div id="root" data-page="…">`. A new page needs a new `.html` file, an entry in `PAGES` (`src/main.jsx`) and
in `pages` (`vite.config.js`), and a line in `public/sitemap.xml`.

## Where things live

- `src/data/content.js` — all copy: menu, the four collections (text, photo, accent color, products), the
  dessert pages, inquiry types, social and footer links, and where old `/#…` links now go.
- `src/index.css` — brand tokens (colors, fonts) in `@theme`, plus `.eyebrow`, `.field`, `.btn-solid`,
  `.btn-outline` and the `.doc` styles for the legal pages.
- `src/data/submitForm.js` — sends the contact form through Web3Forms (same service and key as before).
- `public/` — images, `analytics.js` (GA4 behind the cookie banner), `robots.txt`, `sitemap.xml`.
- `vercel.json` — clean URLs and permanent redirects for removed pages.

## Images still to add

- `public/assets/fts-pint.webp` — Frozen Tears of Socrates pint. Until it exists, the arch frame shows
  "Image coming soon" (with the alt text kept for screen readers).
