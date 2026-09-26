import Hero from "./components/Hero.jsx";
import Philosophy from "./components/Philosophy.jsx";
import Collection from "./components/Collection.jsx";
import Equipment from "./components/Equipment.jsx";
import WholesaleOrder from "./components/WholesaleOrder.jsx";
import FutureGastronomy from "./components/FutureGastronomy.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import { SHOW_ORDER_PORTAL } from "./data/content.js";

// Sections are independent — reorder, remove or add new product-line sections here.
export default function App() {
  return (
    <>
      <Hero />
      <main id="main">
        <Philosophy />
        <Collection />
        <Equipment />
        {SHOW_ORDER_PORTAL && <WholesaleOrder />}
        <FutureGastronomy />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
