# Aethel Criemhild B2C brand site

Approved frozen dessert brand site, copied from the October 19, 2026 Sites publication with the requested terminology corrections. Design, copy, images, and interactions are preserved.

This folder is independent of the existing React website in the repository root.

## Vercel setup

Create a separate Vercel project from `aethelcriemhild/aethelcriemhild`:

- Source branch: `codex/b2c-brand-site` (or `main` after a deliberate merge).
- Root Directory: `b2c`.
- Framework Preset: Other.
- Output Directory: `public`.
- Build Command: empty.
- Install Command: empty.
- Environment variables: none.

The folder's `vercel.json` supplies the static configuration. Its public assets use root-relative paths, so serve `b2c/public` as the site root, not as a URL subdirectory. No package installation or build step is required.

Official configuration reference: https://vercel.com/docs/project-configuration/vercel-json

## Before domain cutover

Verify the separate Vercel deployment first. The existing production site and DNS are not changed by this folder. Once the final domain is confirmed, update `og:url` and `og:image` in `public/index.html` from the current Sites hostname. Then add the domain in Vercel and apply the exact DNS records supplied by Vercel at the authoritative DNS provider. Preserve email and unrelated DNS records.

## Editing

- `public/index.html`: copy and metadata.
- `public/style.css`: existing design.
- `public/script.js`: mobile menu.
- `public/assets/`: local images and fonts.
- `licenses/`: bundled font license notices.

Aethel Criemhild is a frozen dessert brand. Keep the product names Frozen Tears of Socrates and Aethel Criemhild Dondurma. Frozen Tears of Socrates remains described as Frozen Greek Yogurt Dessert. Do not add unsupported nutrition, product, or launch claims.

Brand content and imagery remain proprietary. Font licenses are included separately. This addition does not itself deploy to Vercel or change any domain settings.
