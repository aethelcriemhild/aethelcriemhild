// Entry for the standalone document pages (privacy, terms, accessibility, 404).
// Each page's text lives as plain HTML in its own .html file; this only adds the shared
// site header and footer so every page matches the rest of the site.
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Footer from "./components/Footer.jsx";
import { SiteHeader } from "./components/Hero.jsx";
import "./index.css";

createRoot(document.getElementById("site-header")).render(
  <StrictMode>
    <SiteHeader />
  </StrictMode>
);
createRoot(document.getElementById("site-footer")).render(
  <StrictMode>
    <Footer />
  </StrictMode>
);
