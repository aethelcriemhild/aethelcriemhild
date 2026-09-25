// Entry for the standalone document pages (privacy, terms, accessibility, nutrition guide).
// Each page's text lives as plain HTML in its own .html file; this only adds the shared
// site header and footer so every page matches the homepage.
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import { MarbleBackdrop, SkipLink } from "./components/Hero.jsx";
import "./index.css";

function LegalHeader() {
  return (
    <div className="relative bg-hero">
      <MarbleBackdrop />
      <SkipLink />
      <Nav />
    </div>
  );
}

createRoot(document.getElementById("site-header")).render(
  <StrictMode>
    <LegalHeader />
  </StrictMode>
);
createRoot(document.getElementById("site-footer")).render(
  <StrictMode>
    <Footer />
  </StrictMode>
);
