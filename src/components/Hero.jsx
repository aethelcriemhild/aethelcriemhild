import Nav from "./Nav.jsx";
import { Eyebrow } from "./ui.jsx";

// Warm cream marble (pre-rendered from SVG noise) — evokes the texture of gelato without a stock photo.
export function MarbleBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-hero bg-[url(/assets/hero-marble.webp)] bg-cover bg-center"
    />
  );
}

export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only z-50 bg-ink px-4 py-3 text-sm font-semibold text-cream focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
    >
      Skip to content
    </a>
  );
}

export default function Hero() {
  return (
    <header id="top" className="relative overflow-hidden bg-hero">
      <MarbleBackdrop />
      <SkipLink />
      <Nav />

      <div className="relative mx-auto grid max-w-[1440px] gap-12 px-5 pb-16 pt-12 md:px-10 lg:min-h-[804px] lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center lg:gap-20 lg:px-[120px] lg:pb-24 lg:pt-10">
        <div className="flex flex-col gap-6 lg:gap-9">
          <Eyebrow>Ice Cream · Sorbet · Mindful Gastronomy</Eyebrow>
          <h1 className="font-serif text-[68px] leading-[0.96] font-normal tracking-[-0.02em] sm:text-8xl lg:text-[108px] xl:text-[132px]">
            Spoon with
            <br />
            <em>Purpose.</em>
          </h1>
          <p className="max-w-[520px] text-[17px] leading-relaxed text-ink-2 lg:text-xl">
            Bridging philosophical mindful living with uncompromising culinary indulgence.
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <a href="#ice-cream" className="btn-solid">
              Explore Ice Cream
            </a>
            <a href="#wholesale" className="btn-outline">
              Wholesale Inquiry
            </a>
          </div>
        </div>

        <figure className="mx-auto flex w-60 flex-col items-center gap-6 sm:w-80 lg:w-[420px]">
          <div className="aspect-[420/580] w-full overflow-hidden rounded-full bg-[#D9CDB8] shadow-[0_0_0_14px_rgba(255,255,255,0.35)]">
            <img
              src="/assets/hero-bowl.png"
              alt="Two scoops of ice cream in a ceramic bowl on marble, an olive branch beside"
              className="size-full object-cover"
            />
          </div>
          <figcaption className="eyebrow hidden text-muted lg:block">Chapter I — Virtue</figcaption>
        </figure>
      </div>

      <div className="absolute bottom-12 left-[120px] hidden items-center gap-4 lg:flex">
        <span className="h-px w-14 bg-ink" />
        <span className="eyebrow text-ink-2">Scroll to begin</span>
      </div>
    </header>
  );
}
