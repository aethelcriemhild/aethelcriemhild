import { Eyebrow } from "./ui.jsx";

const MOMENTS = [
  "The conversation that runs past dinner.",
  "The quiet after a long day.",
  "The spoon you reach for, just for yourself.",
];

/** Home — an olive band between the collections and the desserts (colour from the B2C mockup). */
export default function Ritual() {
  return (
    <section aria-labelledby="ritual-heading" className="bg-olive px-5 py-24 text-cream md:px-10 lg:px-[120px] lg:py-36">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 lg:gap-10">
        <Eyebrow className="text-cream">The Everyday Ritual</Eyebrow>
        <h2 id="ritual-heading" className="font-serif text-[46px] leading-[1.02] font-normal tracking-[-0.01em] lg:text-[84px]">
          No grand occasion.
          <br />
          <em>Just a good moment.</em>
        </h2>
        <ul className="flex flex-col gap-2.5 text-[17px] leading-relaxed text-cream/90 lg:text-xl">
          {MOMENTS.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
        <Eyebrow className="pt-4 text-cream/75">Spoon with Purpose.</Eyebrow>
      </div>
    </section>
  );
}
