# Aethel Criemhild — React site

Single-page site built with React 19, Vite and Tailwind CSS v4.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static output in dist/
```

## Where things live

- `src/data/content.js` — all copy and catalog data: chapters, equipment specs, capsule flavors, order-portal
  categories, minimum order quantities, social and footer links. Adding a product, flavor or equipment slot is
  a data edit here.
- `src/index.css` — brand tokens (colors, fonts) in the `@theme` block, plus shared `.eyebrow`, `.field`,
  `.btn-solid` and `.btn-outline` styles.
- `src/components/` — one component per section, composed in `src/App.jsx`.
- `src/data/submitForm.js` — sends the order and contact forms through Web3Forms (the same service and key as
  the previous site).
- `privacy.html`, `terms.html`, `accessibility.html`, `nutrition-guide.html` — standalone document pages. Their
  text is plain HTML inside `<article class="doc">`; headings, paragraphs, lists and links are styled
  automatically (see `.doc` in `src/index.css`). `src/legal.jsx` adds the shared header and footer.
- `public/` — images, `analytics.js` (GA4 behind the cookie-consent banner), `robots.txt` and `sitemap.xml`.

## Capsule photos

Set `image` on a flavor in `CAPSULE_FLAVORS` (e.g. `"/assets/bingsu-milk.jpg"`) to replace its
"Coming soon" placeholder.
