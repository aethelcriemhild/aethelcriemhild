import { useRef, useState } from "react";
import { COLLECTIONS } from "../data/content.js";
import { ArrowIcon, Eyebrow } from "./ui.jsx";

const HeadingTag = ({ level, ...props }) => (level === 2 ? <h2 {...props} /> : <h3 {...props} />);

/** Desktop: photo, name, one line and a link to the collection page. */
function CollectionCard({ collection, headingLevel }) {
  const { slug, numeral, name, line, image } = collection;
  return (
    <article className="flex flex-col gap-4.5">
      <a href={`/${slug}`} tabIndex={-1} aria-hidden="true" className="relative block h-[380px] overflow-hidden bg-sand">
        <img src={image} alt="" className="size-full object-cover transition-transform duration-700 hover:scale-[1.03]" loading="lazy" />
        <span className="absolute top-3 left-5 font-serif text-[44px] text-paper italic">{numeral}</span>
      </a>
      <div className="flex flex-col gap-2">
        <Eyebrow>Collection {numeral}</Eyebrow>
        <HeadingTag level={headingLevel} className="font-serif text-[44px] leading-none font-normal">
          {name}
        </HeadingTag>
        <span className="font-serif text-[19px] text-body italic">{line}</span>
      </div>
      <a
        href={`/${slug}`}
        aria-label={`Explore the ${name} collection`}
        className="inline-flex items-center gap-3 self-start border-t border-line pt-4 text-sm font-semibold tracking-[0.08em] text-ink uppercase no-underline hover:text-umber"
      >
        Explore <ArrowIcon />
      </a>
    </article>
  );
}

export function FlipIcon({ className = "size-4" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`fill-none stroke-current stroke-[1.6] ${className}`}>
      <path d="M4 12a8 8 0 0 1 14-5.3M20 4v4h-4M20 12a8 8 0 0 1-14 5.3M4 20v-4h4" />
    </svg>
  );
}

/** Small screens: a photo card that turns over to show the collection line and a link. */
function FlipCard({ collection, headingLevel }) {
  const [flipped, setFlipped] = useState(false);
  const frontButton = useRef(null);
  const backButton = useRef(null);
  const { slug, numeral, name, line, image, imageAlt } = collection;

  const flip = (toBack) => {
    setFlipped(toBack);
    // Keep keyboard focus on the visible side.
    requestAnimationFrame(() => (toBack ? backButton : frontButton).current?.focus({ preventScroll: true }));
  };

  return (
    <article className="relative aspect-[3/4.4] perspective-distant">
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
          <HeadingTag level={headingLevel} className="absolute bottom-3.5 left-3.5 font-serif text-[30px] leading-none font-normal text-paper">
            {name}
          </HeadingTag>
          {!flipped && (
            <button
              ref={frontButton}
              type="button"
              onClick={() => flip(true)}
              aria-label={`${name}: show details`}
              className="absolute inset-0 cursor-pointer"
            />
          )}
        </div>

        {/* Back: one line and a link */}
        <div
          className="absolute inset-0 flex rotate-y-180 flex-col gap-2 overflow-hidden bg-ink p-4 text-paper backface-hidden"
          aria-hidden={!flipped}
        >
          <div className="flex items-start justify-between">
            <Eyebrow className="text-champagne">Collection {numeral}</Eyebrow>
            {flipped && (
              <button
                ref={backButton}
                type="button"
                onClick={() => flip(false)}
                aria-label={`${name}: show photo`}
                className="-mt-2 -mr-2 flex size-10 items-center justify-center text-paper/90"
              >
                <FlipIcon />
              </button>
            )}
          </div>
          <p className="font-serif text-[30px] leading-none max-[359px]:text-[25px]">{name}</p>
          <p className="font-serif text-[18px] leading-snug text-paper/85 italic max-[359px]:text-[16px]">{line}</p>
          <a
            href={`/${slug}`}
            tabIndex={flipped ? 0 : -1}
            aria-label={`Explore the ${name} collection`}
            className="mt-auto inline-flex items-center gap-2 border-t border-paper/25 pt-3 text-xs font-semibold tracking-[0.14em] text-champagne uppercase no-underline hover:text-paper"
          >
            Explore <ArrowIcon className="size-3.5" />
          </a>
        </div>
      </div>
    </article>
  );
}

/** The four collections: flip cards on small screens, a four-column grid on desktop. */
export function CollectionCards({ headingLevel = 3 }) {
  return (
    <>
      <div className="flex flex-col gap-4 lg:hidden">
        <p className="eyebrow flex items-center justify-center gap-2 text-umber">
          <FlipIcon className="size-3.5" /> Tap a card to flip
        </p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {COLLECTIONS.map((c) => (
            <FlipCard key={c.slug} collection={c} headingLevel={headingLevel} />
          ))}
        </div>
      </div>
      <div className="hidden lg:grid lg:grid-cols-4 lg:gap-6">
        {COLLECTIONS.map((c) => (
          <CollectionCard key={c.slug} collection={c} headingLevel={headingLevel} />
        ))}
      </div>
    </>
  );
}

/** Home · II — the collections. */
export default function Collection() {
  return (
    <section
      id="collections"
      aria-labelledby="collections-heading"
      className="flex scroll-mt-4 flex-col gap-10 bg-cream py-24 lg:gap-18 lg:px-[120px] lg:py-40"
    >
      <div className="grid gap-6 px-5 md:px-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end lg:gap-20 lg:px-0">
        <div className="flex flex-col gap-5 lg:gap-7">
          <Eyebrow>II · The Collections</Eyebrow>
          <h2 id="collections-heading" className="font-serif text-[46px] leading-none font-normal tracking-[-0.01em] lg:text-[80px]">
            Four collections,
            <br />
            <em>one philosophy.</em>
          </h2>
        </div>
        <p className="text-base leading-relaxed text-body lg:text-[17px]">
          Every creation belongs to one of four collections — from the art of measure to unapologetic delight. Choose
          your path.
        </p>
      </div>

      <div className="px-5 md:px-10 lg:px-0">
        <CollectionCards />
      </div>
    </section>
  );
}
