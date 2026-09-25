import { CHAPTERS } from "../data/content.js";
import { ArrowIcon, Eyebrow } from "./ui.jsx";

function ChapterCard({ chapter }) {
  const { numeral, name, tagline, description, image, imageAlt, featured } = chapter;
  return (
    <article className="flex w-[290px] shrink-0 snap-start flex-col gap-4 lg:w-auto lg:gap-4.5">
      <div className="relative h-[360px] overflow-hidden bg-sand lg:h-[380px]">
        <img src={image} alt={imageAlt} className="size-full object-cover" loading="lazy" />
        <span className="absolute top-3 left-5 font-serif text-[44px] text-paper italic">{numeral}</span>
      </div>
      <div className="flex flex-col gap-2">
        <Eyebrow>Chapter {numeral}</Eyebrow>
        <h3 className="font-serif text-[44px] leading-none font-normal">{name}</h3>
        <span className="font-serif text-[19px] text-body italic">{tagline}</span>
      </div>
      <p className="hidden text-[15px] leading-relaxed text-body lg:block">{description}</p>
      <div className="flex flex-col gap-2 border-t border-line pt-4">
        <Eyebrow className="text-muted">Featured</Eyebrow>
        <span className="text-[15px] font-semibold">{featured.name}</span>
        {featured.detail && <span className="text-sm text-muted">{featured.detail}</span>}
        {featured.status && <Eyebrow>{featured.status}</Eyebrow>}
      </div>
    </article>
  );
}

export default function Collection() {
  return (
    <section id="ice-cream" className="flex flex-col gap-10 bg-cream py-24 lg:gap-18 lg:px-[120px] lg:py-40">
      <div className="grid gap-6 px-5 md:px-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end lg:gap-20 lg:px-0">
        <div className="flex flex-col gap-5 lg:gap-7">
          <Eyebrow>II · The Ice Cream Collection</Eyebrow>
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
            href="#wholesale"
            className="inline-flex items-center gap-3 self-start border-b border-ink pb-1.5 text-sm font-semibold tracking-[0.08em] text-ink uppercase no-underline"
          >
            Place a wholesale order
            <ArrowIcon />
          </a>
        </div>
      </div>

      {/* Swipeable rail on small screens, four-column grid on desktop. */}
      <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 md:px-10 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-0">
        {CHAPTERS.map((chapter) => (
          <ChapterCard key={chapter.name} chapter={chapter} />
        ))}
      </div>
    </section>
  );
}
