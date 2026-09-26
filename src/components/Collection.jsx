import { useState } from "react";
import { CHAPTERS, WHOLESALE_LINK, sectionNumber } from "../data/content.js";
import { ArrowIcon, Eyebrow } from "./ui.jsx";

function ChapterCard({ chapter }) {
  const { numeral, name, tagline, description, image, imageAlt, featured } = chapter;
  return (
    <article className="flex flex-col gap-4.5">
      <div className="relative h-[380px] overflow-hidden bg-sand">
        <img src={image} alt={imageAlt} className="size-full object-cover" loading="lazy" />
        <span className="absolute top-3 left-5 font-serif text-[44px] text-paper italic">{numeral}</span>
      </div>
      <div className="flex flex-col gap-2">
        <Eyebrow>Chapter {numeral}</Eyebrow>
        <h3 className="font-serif text-[44px] leading-none font-normal">{name}</h3>
        <span className="font-serif text-[19px] text-body italic">{tagline}</span>
      </div>
      <p className="text-[15px] leading-relaxed text-body">{description}</p>
      <div className="flex flex-col gap-2 border-t border-line pt-4">
        <Eyebrow className="text-muted">Featured</Eyebrow>
        <span className="text-[15px] font-semibold">{featured.name}</span>
        {featured.detail && <span className="text-sm text-muted">{featured.detail}</span>}
        {featured.status && <Eyebrow>{featured.status}</Eyebrow>}
      </div>
    </article>
  );
}

function FlipIcon({ className = "size-4" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`fill-none stroke-current stroke-[1.6] ${className}`}>
      <path d="M4 12a8 8 0 0 1 14-5.3M20 4v4h-4M20 12a8 8 0 0 1-14 5.3M4 20v-4h4" />
    </svg>
  );
}

/** Small screens: a photo card that turns over to show the chapter details. */
function FlipCard({ chapter }) {
  const [flipped, setFlipped] = useState(false);
  const { numeral, name, tagline, image, imageAlt, featured } = chapter;
  return (
    <article className="relative aspect-[3/4.8] perspective-distant max-[359px]:aspect-[3/5.6]">
      <div
        className={`relative size-full transition-transform duration-700 transform-3d motion-reduce:transition-none ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front: photo */}
        <div className="absolute inset-0 overflow-hidden bg-sand backface-hidden" aria-hidden={flipped}>
          <img src={image} alt={imageAlt} className="size-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/5 to-ink/25" />
          <span className="absolute top-2 left-3.5 font-serif text-[34px] text-paper italic">{numeral}</span>
          <span className="absolute top-3.5 right-3 text-paper/90">
            <FlipIcon />
          </span>
          <h3 className="absolute bottom-3.5 left-3.5 font-serif text-[30px] leading-none font-normal text-paper">{name}</h3>
        </div>

        {/* Back: details */}
        <div
          className="absolute inset-0 flex rotate-y-180 flex-col gap-1.5 overflow-hidden bg-ink px-3.5 py-3.5 text-paper max-[359px]:px-3 max-[359px]:py-3 backface-hidden"
          aria-hidden={!flipped}
        >
          <Eyebrow className="text-champagne">Chapter {numeral}</Eyebrow>
          <p className="font-serif text-[28px] leading-none max-[359px]:text-[23px]">{name}</p>
          <p className="font-serif text-[15px] leading-tight text-paper/85 italic max-[359px]:text-[13px]">{tagline}</p>
          <div className="mt-auto flex flex-col gap-1 border-t border-paper/25 pt-2.5">
            <Eyebrow className="text-champagne">Featured</Eyebrow>
            <span className="text-[13px] leading-snug font-semibold max-[359px]:text-xs">{featured.name}</span>
            {featured.detail && <span className="text-xs leading-snug text-paper/80 max-[359px]:text-[11px]">{featured.detail}</span>}
            {featured.status && <Eyebrow className="text-champagne">{featured.status}</Eyebrow>}
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setFlipped((v) => !v)}
        aria-pressed={flipped}
        aria-label={`Chapter ${numeral}, ${name}: ${flipped ? "show photo" : "show details"}`}
        className="absolute inset-0 cursor-pointer"
      />
    </article>
  );
}

export default function Collection() {
  return (
    <section id="ice-cream" className="flex flex-col gap-10 bg-cream py-24 lg:gap-18 lg:px-[120px] lg:py-40">
      <div className="grid gap-6 px-5 md:px-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end lg:gap-20 lg:px-0">
        <div className="flex flex-col gap-5 lg:gap-7">
          <Eyebrow>{sectionNumber("ice-cream")} · The Ice Cream Collection</Eyebrow>
          <h2 className="font-serif text-[46px] leading-none font-normal tracking-[-0.01em] lg:text-[80px]">
            Four chapters,
            <br />
            <em>
              one philosophy
              <br />
              in ice cream.
            </em>
          </h2>
        </div>
        <div className="flex flex-col gap-6">
          <p className="text-base leading-relaxed text-body lg:text-[17px]">
            Every flavor belongs to one of four philosophical chapters — from disciplined purity to unapologetic
            indulgence. Choose your path to Eudaimonia.
          </p>
          <a
            href={WHOLESALE_LINK.href}
            className="inline-flex items-center gap-3 self-start border-b border-ink pb-1.5 text-sm font-semibold tracking-[0.08em] text-ink uppercase no-underline"
          >
            {WHOLESALE_LINK.collectionLabel}
            <ArrowIcon />
          </a>
        </div>
      </div>

      {/* Small screens: 2 × 2 flip cards. */}
      <div className="flex flex-col gap-4 px-5 md:px-10 lg:hidden">
        <p className="flex items-center justify-center gap-2 eyebrow text-umber">
          <FlipIcon className="size-3.5" /> Tap a card to flip
        </p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {CHAPTERS.map((chapter) => (
            <FlipCard key={chapter.name} chapter={chapter} />
          ))}
        </div>
      </div>

      {/* Desktop: four-column grid. */}
      <div className="hidden lg:grid lg:grid-cols-4 lg:gap-6">
        {CHAPTERS.map((chapter) => (
          <ChapterCard key={chapter.name} chapter={chapter} />
        ))}
      </div>
    </section>
  );
}
