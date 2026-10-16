import { HOME_PHILOSOPHY } from "../data/content.js";
import { ArrowLink, Eyebrow } from "./ui.jsx";

/**
 * Restraint ←— Golden Mean —→ Pleasure.
 * With `collections`, the four collections sit along the line: Virtue at restraint, Wicked at
 * pleasure, Origin and Tribute between.
 */
export function GoldenMeanScale({ collections = false }) {
  const stops = [
    { name: "Virtue", href: "/virtue", at: "0%" },
    { name: "Origin", href: "/origin", at: "33.33%" },
    { name: "Tribute", href: "/tribute", at: "66.67%" },
    { name: "Wicked", href: "/wicked", at: "100%" },
  ];
  return (
    <div className="relative w-full max-w-[1040px] pt-8 pb-2">
      <div className="flex justify-between">
        <Eyebrow className="text-ink">Restraint</Eyebrow>
        <Eyebrow className="text-ink">Pleasure</Eyebrow>
      </div>
      <div className="relative mt-5 h-px bg-ink">
        <span className="absolute -top-2 left-0 h-[17px] w-px bg-ink" />
        <span className="absolute -top-2 right-0 h-[17px] w-px bg-ink" />
        {collections ? (
          stops.slice(1, 3).map((s) => (
            <span key={s.name} className="absolute -top-1.5 size-3 -translate-x-1/2 rounded-full border border-umber bg-paper" style={{ left: s.at }} />
          ))
        ) : (
          <span className="absolute top-1/2 left-1/2 flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-umber bg-paper">
            <span className="size-3 rounded-full bg-umber" />
          </span>
        )}
      </div>

      {collections ? (
        <ol aria-label="The four collections, from restraint to pleasure" className="relative mt-6 h-16">
          {stops.map((s, i) => (
            <li
              key={s.name}
              className={`absolute top-0 flex flex-col gap-1 ${i === 0 ? "items-start" : i === 3 ? "items-end" : "-translate-x-1/2 items-center"}`}
              style={i === 3 ? { right: 0 } : { left: s.at }}
            >
              <Eyebrow className="text-umber">{["I", "II", "III", "IV"][i]}</Eyebrow>
              <a href={s.href} className="font-serif text-xl text-ink no-underline hover:text-umber lg:text-[26px]">
                {s.name}
              </a>
            </li>
          ))}
        </ol>
      ) : (
        <div className="mt-7 grid grid-cols-[1fr_auto_1fr] items-start gap-4">
          <span className="hidden font-serif text-xl text-muted italic sm:block">Measure without joy.</span>
          <span className="col-start-2 flex flex-col items-center gap-1.5 text-center">
            <Eyebrow>The Golden Mean</Eyebrow>
            <span className="font-serif text-[22px]">Aethel Criemhild</span>
          </span>
          <span className="hidden text-right font-serif text-xl text-muted italic sm:block">Joy without measure.</span>
        </div>
      )}
    </div>
  );
}

/** Home · I — the philosophy in brief. */
export default function Philosophy() {
  return (
    <section
      id="philosophy-intro"
      aria-labelledby="philosophy-heading"
      className="flex flex-col items-center gap-14 bg-paper px-5 py-24 md:px-10 lg:gap-22 lg:px-[120px] lg:py-42"
    >
      <div className="flex max-w-[880px] flex-col items-center gap-6 text-center lg:gap-8">
        <img src="/assets/emblem-gold.webp" alt="Aethel Criemhild emblem" className="h-22 w-auto lg:h-28" loading="lazy" />
        <Eyebrow>I · Our Philosophy</Eyebrow>
        <span className="flex flex-col items-center gap-1">
          <span lang="grc" className="font-serif text-2xl text-muted italic lg:text-3xl">
            εὐδαιμονία
          </span>
          <span className="text-sm text-body">eudaimonia — a life that flourishes</span>
        </span>
        <h2 id="philosophy-heading" className="font-serif text-[46px] leading-[1.02] font-normal tracking-[-0.01em] lg:text-[80px]">
          Eudaimonia, and
          <br />
          <em>the Golden Mean.</em>
        </h2>
        <p className="text-[17px] leading-[1.7] text-ink-2 lg:text-xl lg:leading-[1.75]">{HOME_PHILOSOPHY}</p>
        <ArrowLink href="/philosophy" className="text-ink">
          Read our philosophy
        </ArrowLink>
      </div>

      <GoldenMeanScale />
    </section>
  );
}
