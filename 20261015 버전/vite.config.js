import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Multi-page build: every page is its own .html file (served without ".html" on Vercel via cleanUrls).
const pages = [
  "index",
  "philosophy",
  "virtue",
  "origin",
  "tribute",
  "wicked",
  "frozen-tears-of-socrates",
  "dondurma",
  "contact",
  "privacy",
  "terms",
  "accessibility",
  "404",
];

// Lets the dev/preview server answer "/virtue" with virtue.html, the way Vercel's cleanUrls does.
const cleanUrls = () => {
  const rewrite = (req, _res, next) => {
    const [path, query = ""] = req.url.split("?");
    const name = path.replace(/^\//, "").replace(/\/$/, "");
    if (pages.includes(name)) req.url = `/${name}.html${query ? "?" + query : ""}`;
    next();
  };
  return {
    name: "clean-urls",
    configureServer(server) {
      server.middlewares.use(rewrite);
    },
    configurePreviewServer(server) {
      server.middlewares.use(rewrite);
    },
  };
};

export default defineConfig({
  plugins: [react(), tailwindcss(), cleanUrls()],
  build: {
    rollupOptions: {
      input: Object.fromEntries(pages.map((p) => [p, resolve(import.meta.dirname, `${p}.html`)])),
    },
  },
});
