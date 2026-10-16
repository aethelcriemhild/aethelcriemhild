import { SiteHeader } from "../components/Hero.jsx";
import { ArchImage, EmblemArch, Eyebrow } from "../components/ui.jsx";
import { PRODUCTS, collectionBySlug } from "../data/content.js";

export default function ProductPage({ slug }) {
  const p = PRODUCTS[slug];
  const c = collectionBySlug(p.collection);
  const [primary, secondary] = p.actions;

  return (
    <>
      <SiteHeader>
        <div className="relative mx-auto grid max-w-[1440px] items-center gap-12 px-5 pt-12 pb-16 md:px-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-20 lg:px-[120px] lg:pt-16 lg:pb-24">
          <div className="flex flex-col gap-5 lg:gap-7">
            <div className="flex items-center gap-4">
              <span aria-hidden="true" className="h-px w-12" style={{ background: c.accent }} />
              <Eyebrow>{c.name} Collection</Eyebrow>
            </div>
            <span className="font-serif text-2xl text-muted italic lg:text-3xl">Spoon with {c.name}</span>
            <h1 className="font-serif text-[56px] leading-[0.96] font-normal tracking-[-0.02em] sm:text-7xl lg:text-[96px]">
              {p.name}
            </h1>
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
              <span className="font-serif text-[26px] text-ink-2 italic lg:text-[30px]">{p.descriptor}</span>
              {p.status && <Eyebrow>{p.status}</Eyebrow>}
            </div>
            <p className="max-w-[560px] text-[17px] leading-relaxed text-ink-2 lg:text-xl">{p.body}</p>
          </div>
          <div className="mx-auto w-60 sm:w-80 lg:w-[420px]">
            {p.image ? (
              <ArchImage src={p.image} alt={p.imageAlt} eager />
            ) : (
              <EmblemArch label={`Aethel Criemhild emblem on navy — ${p.name}`} />
            )}
          </div>
        </div>
      </SiteHeader>

      <main id="main">
        {(p.info || p.quote) && (
          <section aria-label="Details" className="bg-paper px-5 py-20 md:px-10 lg:px-[120px] lg:py-28">
            <div className="mx-auto flex max-w-[1000px] flex-col gap-18 lg:gap-24">
              {p.info && (
                <dl className="grid border-t border-ink sm:grid-cols-2">
                  {p.info.map(([k, v]) => (
                    <div key={k} className="flex items-baseline justify-between gap-6 border-b border-line py-4.5 sm:odd:mr-5 sm:even:ml-5">
                      <dt className="eyebrow text-umber">{k}</dt>
                      <dd className="text-right text-[17px] text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {p.quote && (
                <blockquote className="mx-auto max-w-[860px] text-center font-serif text-[40px] leading-[1.15] text-ink italic lg:text-[68px]">
                  “{p.quote}”
                </blockquote>
              )}
            </div>
          </section>
        )}

        <section className="bg-cream px-5 py-16 md:px-10 lg:py-24">
          <div className="mx-auto flex max-w-[1000px] flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <a href={primary.href} className="btn-solid">
              {primary.label}
            </a>
            <a href={secondary.href} className="btn-outline">
              {secondary.label}
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
