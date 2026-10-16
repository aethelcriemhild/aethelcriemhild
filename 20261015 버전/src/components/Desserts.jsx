import { PRODUCTS } from "../data/content.js";
import { ArchImage, ArrowLink, EmblemArch, Eyebrow } from "./ui.jsx";

function DessertCard({ slug, children }) {
  const p = PRODUCTS[slug];
  return (
    <article className="flex h-full flex-col items-center gap-7 text-center">
      <div className="w-56 sm:w-64 lg:w-72">{children}</div>
      <div className="flex flex-col items-center gap-2.5">
        <h3 className="font-serif text-[34px] leading-tight font-normal lg:text-[40px]">{p.name}</h3>
        <span className="font-serif text-[19px] text-body italic">{p.descriptor}</span>
        {p.status && <Eyebrow>{p.status}</Eyebrow>}
      </div>
      <ArrowLink href={`/${slug}`} className="mt-auto text-ink">
        <span>
          Discover<span className="sr-only"> {p.name}</span>
        </span>
      </ArrowLink>
    </article>
  );
}

/** Home · III — the individual desserts. */
export function MeetTheDesserts() {
  const fts = PRODUCTS["frozen-tears-of-socrates"];
  return (
    <section aria-labelledby="desserts-heading" className="flex flex-col items-center gap-14 bg-paper px-5 py-24 md:px-10 lg:gap-20 lg:px-[120px] lg:py-40">
      <div className="flex flex-col items-center gap-5 text-center lg:gap-7">
        <Eyebrow>III · Meet the Desserts</Eyebrow>
        <h2 id="desserts-heading" className="font-serif text-[46px] leading-none font-normal tracking-[-0.01em] lg:text-[80px]">
          Meet the <em>desserts.</em>
        </h2>
      </div>
      <div className="grid w-full max-w-[1000px] gap-18 md:grid-cols-2 md:gap-10">
        <DessertCard slug="frozen-tears-of-socrates">
          <ArchImage src={fts.image} alt={fts.imageAlt} />
        </DessertCard>
        <DessertCard slug="dondurma">
          <EmblemArch label="Aethel Criemhild emblem on navy — Aethel Criemhild Dondurma" />
        </DessertCard>
      </div>
    </section>
  );
}

/** Thin navy band pointing trade partners to the contact form. */
export function TradeBand() {
  return (
    <section aria-label="For trade partners" className="bg-navy px-5 py-10 text-cream md:px-10 lg:px-[120px] lg:py-12">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="flex flex-col gap-2.5">
          <Eyebrow className="text-champagne">For trade partners</Eyebrow>
          <p className="font-serif text-[22px] leading-snug lg:text-[26px]">
            Retailers, distributors, and hospitality partners — we’d be glad to hear from you.
          </p>
        </div>
        <ArrowLink href="/contact?type=trade" className="shrink-0 text-champagne hover:text-cream">
          Get in touch
        </ArrowLink>
      </div>
    </section>
  );
}
