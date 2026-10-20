// One entry for every site page. Each .html file says which page it is with <div id="root" data-page="…">.
import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import Hero from "./components/Hero.jsx";
import Philosophy from "./components/Philosophy.jsx";
import Collection from "./components/Collection.jsx";
import { MeetTheDesserts, TradeBand } from "./components/Desserts.jsx";
import Ritual from "./components/Ritual.jsx";
import Footer from "./components/Footer.jsx";
import PhilosophyPage from "./pages/PhilosophyPage.jsx";
import CollectionPage from "./pages/CollectionPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import { LEGACY_ANCHORS } from "./data/content.js";
import "./index.css";

function Home() {
  // The sections render after the browser has looked for "#collections", so scroll there once they exist.
  useEffect(() => {
    // Wait for the web fonts, which change text heights, so the jump lands on the section.
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) document.fonts.ready.then(() => document.getElementById(id)?.scrollIntoView({ behavior: "instant" }));
  }, []);
  return (
    <>
      <Hero />
      <main id="main">
        <Philosophy />
        <Collection />
        <Ritual />
        <MeetTheDesserts />
        <TradeBand />
      </main>
    </>
  );
}

const PAGES = {
  home: () => <Home />,
  philosophy: () => <PhilosophyPage />,
  virtue: () => <CollectionPage slug="virtue" />,
  origin: () => <CollectionPage slug="origin" />,
  tribute: () => <CollectionPage slug="tribute" />,
  wicked: () => <CollectionPage slug="wicked" />,
  "frozen-tears-of-socrates": () => <ProductPage slug="frozen-tears-of-socrates" />,
  dondurma: () => <ProductPage slug="dondurma" />,
  contact: () => <ContactPage />,
};

const root = document.getElementById("root");
const page = root.dataset.page;

// Links to the old one-page site (/#ice-cream, /#contact…) land on the page that replaced each section.
const legacy = page === "home" && LEGACY_ANCHORS[window.location.hash];
if (legacy) window.location.replace(legacy);

createRoot(root).render(
  <StrictMode>
    {PAGES[page]()}
    <Footer />
  </StrictMode>
);
