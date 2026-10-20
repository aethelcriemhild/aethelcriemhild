import { Eyebrow } from "./ui.jsx";

const MOMENTS = [
  "The conversation that runs past dinner.",
  "The quiet after a long day.",
  "The spoon you reach for, just for yourself.",
];

/** Home — a dark band between the collections and the desserts. */
export default function Ritual() {
  return (
    <section aria-labelledby="ritual-heading" className="relative overflow-hidden bg-ink px-5 py-24 text-cream md:px-10 lg:px-[120px] lg:py-36">
      {/* The rising-sun rings from the previous site's dark band, kept as a quiet motif. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 600 600"
        className="pointer-events-none absolute -right-48 -bottom-56 size-[520px] fill-none lg:-right-24 lg:-bottom-64 lg:size-[720px]"
      >
        <circle cx="300" cy="300" r="140" stroke="#C9B48A" strokeOpacity="0.55" />
        <circle cx="300" cy="300" r="210" stroke="#4A453E" />
        <circle cx="300" cy="300" r="290" stroke="#36322D" />
      </svg>

      <div className="relative mx-auto flex max-w-[1200px] flex-col gap-8 lg:gap-10">
        <Eyebrow className="text-champagne">The Everyday Ritual</Eyebrow>
        <h2 id="ritual-heading" className="font-serif text-[46px] leading-[1.02] font-normal tracking-[-0.01em] lg:text-[84px]">
          No grand occasion.
          <br />
          <em>Just a good moment.</em>
        </h2>
        <ul className="flex flex-col gap-2.5 text-[17px] leading-relaxed text-cream/85 lg:text-xl">
          {MOMENTS.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
        <Eyebrow className="pt-4 text-stone">Spoon with Purpose.</Eyebrow>
      </div>
    </section>
  );
}
