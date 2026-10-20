import { CollectionCards } from "../components/Collection.jsx";
import { SiteHeader } from "../components/Hero.jsx";
import { GoldenMeanScale } from "../components/Philosophy.jsx";
import { Eyebrow, Rich } from "../components/ui.jsx";
import { PRINCIPLES } from "../data/content.js";

const ESSAY = [
  <>
    Long before dessert was a category, the philosophers of ancient Greece asked what it means to live well.
    Aristotle called the answer <em>eudaimonia</em> — a life that flourishes — and found it not in excess or denial,
    but in the Golden Mean between them.
  </>,
  <>
    Aethel Criemhild takes that idea to the table. We are a brand of desserts and indulgent treats, built on the
    belief that every pleasure deserves a purpose. That belief begins with a simple invitation: pause, consider, and
    enjoy.
  </>,
  <>
    Our four collections give that invitation different forms. Virtue practices the art of measure. Origin respects
    the original character of a dessert. Tribute honors the traditional foods of many cultures through a new
    expression. Wicked makes room for vivid delight. Each offers its own perspective; together, they create a
    considered whole.
  </>,
  <>
    There is no single mood for every table, and no single answer to what makes a moment worth savoring. Some
    moments invite restraint, others curiosity, remembrance, or pleasure. Our collections give those impulses a place
    beside one another, without asking one to stand for everything.
  </>,
  <>
    This is philosophy as a way of looking at the everyday: a question, a choice, a small spoonful worth thinking
    about.
  </>,
];

export default function PhilosophyPage() {
  return (
    <>
      <SiteHeader>
        <div className="relative mx-auto flex max-w-[1000px] flex-col items-center gap-6 px-5 pt-16 pb-20 text-center md:px-10 lg:gap-8 lg:pt-24 lg:pb-28">
          <img src="/assets/emblem-gold.webp" alt="" className="h-22 w-auto lg:h-28" />
          <Eyebrow>I · Our Philosophy</Eyebrow>
          <h1 className="font-serif text-[56px] leading-[0.98] font-normal tracking-[-0.02em] sm:text-7xl lg:text-[104px]">
            A purpose in
            <br />
            <em>every spoonful.</em>
          </h1>
        </div>
      </SiteHeader>

      <main id="main">
        <section aria-label="Our philosophy" className="flex flex-col items-center gap-16 bg-paper px-5 py-20 md:px-10 lg:gap-24 lg:px-[120px] lg:py-32">
          <div className="flex max-w-[760px] flex-col gap-6 text-[18px] leading-[1.75] text-ink-2 lg:gap-7 lg:text-[21px]">
            {ESSAY.map((p, i) => (
              <p key={i} className={i === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-[78px] first-letter:leading-[0.8] first-letter:text-umber" : ""}>
                {p}
              </p>
            ))}
          </div>

          <div className="w-full max-w-[860px]">
            <h2 className="sr-only">What guides us</h2>
            <ol className="border-t border-line">
              {PRINCIPLES.map((p, i) => (
                <li key={p.title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-3 border-b border-line py-8 lg:grid-cols-[4.5rem_minmax(0,1fr)] lg:py-10">
                  <span className="pt-2 text-sm text-muted tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <div className="flex flex-col gap-3">
                    <h3 className="font-serif text-[32px] leading-tight font-normal lg:text-[44px]">{p.title}</h3>
                    <p className="text-[17px] leading-[1.7] text-body lg:text-lg">
                      <Rich text={p.body} />
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <figure className="flex w-full flex-col items-center gap-4">
            <GoldenMeanScale collections />
            <figcaption className="eyebrow pt-4 text-muted">The Golden Mean, from restraint to pleasure</figcaption>
          </figure>
        </section>

        <section aria-labelledby="mission-heading" className="bg-cream px-5 py-20 md:px-10 lg:px-[120px] lg:py-32">
          <div className="mx-auto flex max-w-[900px] flex-col items-center gap-6 text-center">
            <h2 id="mission-heading" className="eyebrow text-umber">
              Our mission
            </h2>
            <p className="font-serif text-[30px] leading-[1.25] text-ink lg:text-[44px]">
              To create desserts and indulgent treats with a reason to exist — crafted with discipline, rooted in
              tradition, and made to be enjoyed.
            </p>
          </div>
        </section>

        <section aria-labelledby="collections-heading" className="flex flex-col gap-10 bg-paper px-5 py-20 md:px-10 lg:gap-16 lg:px-[120px] lg:py-32">
          <div className="flex flex-col items-center gap-5 text-center">
            <Eyebrow>The Collections</Eyebrow>
            <h2 id="collections-heading" className="font-serif text-[42px] leading-none font-normal lg:text-[64px]">
              Four collections, <em>one philosophy.</em>
            </h2>
          </div>
          <CollectionCards />
          <p className="pt-6 text-center font-serif text-[40px] leading-none italic lg:pt-10 lg:text-[64px]">Spoon with Purpose.</p>
        </section>
      </main>
    </>
  );
}
