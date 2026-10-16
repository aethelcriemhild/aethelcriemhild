import { SiteHeader } from "../components/Hero.jsx";
import { ArchImage, ArrowIcon, ArrowLink, Eyebrow, Rich } from "../components/ui.jsx";
import { COLLECTIONS, collectionBySlug } from "../data/content.js";

function HeroText({ c, dark }) {
  return (
    <div className="flex flex-col gap-5 lg:gap-7">
      <div className="flex items-center gap-4">
        <span aria-hidden="true" className="h-px w-12" style={{ background: c.accent }} />
        <Eyebrow className={dark ? "text-champagne" : "text-umber"}>{c.numeral} · The {c.name} Collection</Eyebrow>
      </div>
      <span className={`font-serif text-2xl italic lg:text-3xl ${dark ? "text-cream/85" : "text-muted"}`}>
        Spoon with {c.name}
      </span>
      <h1
        className="font-serif text-[76px] leading-[0.92] font-normal tracking-[-0.02em] sm:text-8xl lg:text-[132px]"
        style={dark ? { color: c.accent } : undefined}
      >
        {c.name}
      </h1>
      <p className={`font-serif text-[26px] leading-snug lg:text-[34px] ${dark ? "text-cream" : "text-ink-2"}`}>{c.subtitle}</p>
    </div>
  );
}

function Hero({ c }) {
  const layout =
    "relative mx-auto grid max-w-[1440px] items-center gap-12 px-5 pt-12 pb-16 md:px-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-20 lg:px-[120px] lg:pt-16 lg:pb-24";
  const arch = (
    <div className="mx-auto w-60 sm:w-72 lg:w-[400px]">
      <ArchImage src={c.image} alt={c.imageAlt} eager ring={`${c.accent}33`} />
    </div>
  );

  // Wicked alone gets a dark, high-contrast hero, using the orange of its photograph.
  if (c.slug === "wicked") {
    return (
      <>
        <SiteHeader />
        <section className="bg-night text-cream">
          <div className={layout}>
            <HeroText c={c} dark />
            {arch}
          </div>
        </section>
      </>
    );
  }
  return (
    <SiteHeader>
      <div className={layout}>
        <HeroText c={c} />
        {arch}
      </div>
    </SiteHeader>
  );
}

function ProductCard({ product, accent }) {
  const { name, detail, status, href } = product;
  return (
    <article className="flex flex-col gap-3 border bg-paper p-6 lg:p-8" style={{ borderColor: accent }}>
      <h3 className="font-serif text-[30px] leading-tight font-normal lg:text-[34px]">{name}</h3>
      {detail && <span className="font-serif text-lg text-body italic">{detail}</span>}
      {status && <Eyebrow>{status}</Eyebrow>}
      {href && (
        <a
          href={href}
          className="mt-auto inline-flex items-center gap-3 self-start pt-3 text-sm font-semibold tracking-[0.08em] text-ink uppercase no-underline hover:text-umber"
        >
          Discover<span className="sr-only"> {name}</span> <ArrowIcon />
        </a>
      )}
    </article>
  );
}

function OtherCollections({ current }) {
  const others = COLLECTIONS.filter((c) => c.slug !== current);
  return (
    <section aria-labelledby="others-heading" className="bg-cream px-5 py-20 md:px-10 lg:px-[120px] lg:py-28">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10">
        <h2 id="others-heading" className="font-serif text-[36px] leading-none font-normal lg:text-[52px]">
          The other <em>collections</em>
        </h2>
        <ul className="grid gap-5 sm:grid-cols-3 lg:gap-6">
          {others.map((c) => (
            <li key={c.slug}>
              <a href={`/${c.slug}`} className="group flex items-center gap-5 border border-line bg-paper p-3 text-ink no-underline hover:border-ink sm:flex-col sm:items-stretch sm:p-0">
                <span className="relative block size-24 shrink-0 overflow-hidden bg-sand sm:aspect-[4/3] sm:size-auto">
                  <img src={c.image} alt="" loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                </span>
                <span className="flex flex-col gap-1.5 sm:p-5">
                  <Eyebrow>Collection {c.numeral}</Eyebrow>
                  <span className="font-serif text-[30px] leading-none">{c.name}</span>
                  <span className="font-serif text-base text-body italic">{c.line}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function CollectionPage({ slug }) {
  const c = collectionBySlug(slug);
  return (
    <>
      <Hero c={c} />
      <main id="main">
        <section aria-label={`About ${c.name}`} className="bg-paper px-5 py-20 md:px-10 lg:px-[120px] lg:py-32">
          <div className="mx-auto flex max-w-[760px] flex-col gap-6 text-[19px] leading-[1.75] text-ink-2 lg:text-[22px]">
            {c.body.map((p, i) => (
              <p key={i}>
                <Rich text={p} />
              </p>
            ))}
          </div>
        </section>

        <section aria-labelledby="products-heading" className="bg-paper px-5 pb-20 md:px-10 lg:px-[120px] lg:pb-32">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-8 border-t border-line pt-14 lg:pt-20">
            <h2 id="products-heading" className="eyebrow text-umber">
              In this collection
            </h2>
            <div className={`grid gap-5 lg:gap-6 ${c.products.length > 1 ? "md:grid-cols-3" : "md:max-w-[520px]"}`}>
              {c.products.map((p) => (
                <ProductCard key={p.name} product={p} accent={c.accent} />
              ))}
            </div>
          </div>
        </section>

        <OtherCollections current={slug} />

        <section className="flex justify-center bg-paper px-5 py-16 lg:py-20">
          <ArrowLink href="/philosophy" className="text-ink">
            Read our philosophy
          </ArrowLink>
        </section>
      </main>
    </>
  );
}
