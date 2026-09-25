import Hero from "./components/Hero.jsx";
import Philosophy from "./components/Philosophy.jsx";
import Collection from "./components/Collection.jsx";
import Equipment from "./components/Equipment.jsx";
import WholesaleOrder from "./components/WholesaleOrder.jsx";
import FutureGastronomy from "./components/FutureGastronomy.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

// Sections are independent — reorder, remove or add new product-line sections here.
export default function App() {
  return (
    <>
      <Hero />
      <main>
        <Philosophy />
        <Collection />
        <Equipment />
        <WholesaleOrder />
        <FutureGastronomy />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
