import { Eyebrow } from "./ui.jsx";
import { sectionNumber } from "../data/content.js";

export default function FutureGastronomy() {
  return (
    <section className="relative flex min-h-[600px] flex-col items-center justify-center gap-6 overflow-hidden bg-ink px-5 pb-36 text-center text-cream lg:min-h-[760px] lg:gap-9 lg:pb-0">
      {/* A sun rising over the horizon line. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 300"
        preserveAspectRatio="xMidYMax meet"
        className="absolute inset-x-0 bottom-0 h-[180px] w-full fill-none lg:h-[300px]"
      >
        <circle cx="720" cy="300" r="120" stroke="#C9B48A" />
        <circle cx="720" cy="300" r="190" stroke="#4A453E" />
        <circle cx="720" cy="300" r="270" stroke="#36322D" />
        <line x1="-2000" y1="299.5" x2="3440" y2="299.5" stroke="#5C554B" />
      </svg>
      <Eyebrow className="text-champagne">{sectionNumber("future")} · Future Gastronomy</Eyebrow>
      <h2 className="max-w-[980px] font-serif text-[42px] leading-[1.05] font-normal lg:text-[76px]">
        Expanding the Horizon of
        <br className="hidden lg:block" /> <em>Mindful Gastronomy.</em>
      </h2>
      <Eyebrow className="text-stone lg:pb-30">
        Coming Soon<span className="hidden lg:inline"> — the next chapter is being written</span>
      </Eyebrow>
    </section>
  );
}
