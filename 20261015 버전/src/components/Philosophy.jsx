import { PHILOSOPHY_ESSAY, PRINCIPLES } from "../data/content.js";
import { Eyebrow, Rich } from "./ui.jsx";

const STOPS = [
  { numeral: "I", name: "Virtue", href: "/virtue", at: "0%" },
  { numeral: "II", name: "Origin", href: "/origin", at: "33.33%" },
  { numeral: "III", name: "Tribute", href: "/tribute", at: "66.67%" },
  { numeral: "IV", name: "Wicked", href: "/wicked", at: "100%" },
];

/** Restraint ←— Golden Mean —→ Pleasure, with the four collections along the line. */
export function GoldenMeanScale() {
  return (
    <div className="relative w-full max-w-[1040px] pt-8 pb-2">
      <div className="flex justify-between">
        <Eyebrow className="text-ink">Restraint</Eyebrow>
        <Eyebrow className="text-ink">Pleasure</Eyebrow>
      </div>
      <div className="relative mt-5 h-px bg-ink">
        <span className="absolute -top-2 left-0 h-[17px] w-px bg-ink" />
        <span className="absolute -top-2 right-0 h-[17px] w-px bg-ink" />
        {STOPS.slice(1, 3).map((s) => (
          <span key={s.name} className="absolute -top-1.5 size-3 -translate-x-1/2 rounded-full border border-umber bg-paper" style={{ left: s.at }} />
        ))}
      </div>
      <ol aria-label="The four collections, from restraint to pleasure" className="relative mt-6 h-16">
        {STOPS.map((s, i) => (
          <li
            key={s.name}
            className={`absolute top-0 flex flex-col gap-1 ${i === 0 ? "items-start" : i === 3 ? "items-end" : "-translate-x-1/2 items-center"}`}
            style={i === 3 ? { right: 0 } : { left: s.at }}
          >
            <Eyebrow className="text-umber">{s.numeral}</Eyebrow>
            <a href={s.href} className="font-serif text-xl text-ink no-underline hover:text-umber lg:text-[26px]">
              {s.name}
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Home · I — the brand philosophy in full. */
export default function Philosophy() {
  return (
    <section
      id="philosophy"
      aria-labelledby="philosophy-heading"
      className="flex scroll-mt-4 flex-col items-center gap-14 bg-paper px-5 py-24 md:px-10 lg:gap-22 lg:px-[120px] lg:py-42"
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
        <p className="font-serif text-[26px] leading-snug text-ink-2 italic lg:text-[34px]">A purpose in every spoonful.</p>
      </div>

      <div className="flex max-w-[760px] flex-col gap-6 text-[18px] leading-[1.75] text-ink-2 lg:gap-7 lg:text-[21px]">
        {PHILOSOPHY_ESSAY.map((p, i) => (
          <p
            key={i}
            className={
              i === 0
                ? "first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-[78px] first-letter:leading-[0.8] first-letter:text-umber"
                : ""
            }
          >
            <Rich text={p} />
          </p>
        ))}
      </div>

      <div className="w-full max-w-[860px]">
        <h3 className="sr-only">What guides us</h3>
        <ol className="border-t border-line">
          {PRINCIPLES.map((p, i) => (
            <li key={p.title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-3 border-b border-line py-8 lg:grid-cols-[4.5rem_minmax(0,1fr)] lg:py-10">
              <span className="pt-2 text-sm text-muted tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <div className="flex flex-col gap-3">
                <h4 className="font-serif text-[32px] leading-tight font-normal lg:text-[44px]">{p.title}</h4>
                <p className="text-[17px] leading-[1.7] text-body lg:text-lg">
                  <Rich text={p.body} />
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <figure className="flex w-full flex-col items-center gap-4">
        <GoldenMeanScale />
        <figcaption className="eyebrow pt-4 text-muted">The Golden Mean, from restraint to pleasure</figcaption>
      </figure>

      <div className="flex max-w-[900px] flex-col items-center gap-6 border-t border-line pt-14 text-center lg:pt-20">
        <h3 className="eyebrow text-umber">Our mission</h3>
        <p className="font-serif text-[30px] leading-[1.25] text-ink lg:text-[44px]">
          To create desserts and indulgent treats with a reason to exist — crafted with discipline, rooted in tradition,
          and made to be enjoyed.
        </p>
      </div>
    </section>
  );
}
