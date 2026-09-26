import { PRINCIPLES } from "../data/content.js";
import { Eyebrow } from "./ui.jsx";

// Restraint ←— Golden Mean —→ Pleasure
function GoldenMeanScale() {
  return (
    <div className="relative w-full max-w-[1040px] pt-8 pb-2">
      <div className="flex justify-between">
        <Eyebrow className="text-ink">Restraint</Eyebrow>
        <Eyebrow className="text-ink">Pleasure</Eyebrow>
      </div>
      <div className="relative mt-5 h-px bg-ink">
        <span className="absolute -top-2 left-0 h-[17px] w-px bg-ink" />
        <span className="absolute -top-2 right-0 h-[17px] w-px bg-ink" />
        <span className="absolute top-1/2 left-1/2 flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-umber bg-paper">
          <span className="size-3 rounded-full bg-umber" />
        </span>
      </div>
      <div className="mt-7 grid grid-cols-[1fr_auto_1fr] items-start gap-4">
        <span className="hidden font-serif text-xl text-muted italic sm:block">Measure without joy.</span>
        <span className="col-start-2 flex flex-col items-center gap-1.5 text-center">
          <Eyebrow>The Golden Mean</Eyebrow>
          <span className="font-serif text-[22px]">Aethel Criemhild</span>
        </span>
        <span className="hidden text-right font-serif text-xl text-muted italic sm:block">Joy without measure.</span>
      </div>
    </div>
  );
}

export default function Philosophy() {
  return (
    <section
      id="philosophy"
      className="flex flex-col items-center gap-14 bg-paper px-5 py-24 md:px-10 lg:gap-22 lg:px-[120px] lg:py-42"
    >
      <div className="flex max-w-[880px] flex-col items-center gap-6 text-center lg:gap-8">
        <img src="/assets/emblem-gold.webp" alt="Aethel Criemhild emblem — Spoon with Purpose" className="h-22 w-auto lg:h-28" />
        <Eyebrow>I · Our Philosophy</Eyebrow>
        <span className="font-serif text-2xl text-muted italic lg:text-3xl">εὐδαιμονία</span>
        <h2 className="font-serif text-[46px] leading-[1.02] font-normal tracking-[-0.01em] lg:text-[80px]">
          Eudaimonia, and
          <br />
          <em>the Golden Mean.</em>
        </h2>
        <div className="flex flex-col gap-5 text-left text-[17px] leading-[1.7] text-ink-2 sm:text-center lg:gap-6 lg:text-xl lg:leading-[1.75]">
          <p>
            At Aethel Criemhild, we are modern disciples of the ancient philosophers. We believe in <em>Eudaimonia</em>
            —the ultimate flourishing of the human soul, achieved through the deliberate pursuit of virtue. We craft
            our products as if we were crystallizing the ‘<em>Frozen Tears of Socrates</em>,’ the essence of
            philosophy. They are not merely cold treats, but profound catalysts that ignite the contemplation of a life
            well-lived.
          </p>
          <p>
            To taste our collection is to explore the full breadth of the human experience. We do not confine
            ourselves to strict stoicism; instead, we honor the <em>Golden Mean</em>. From the disciplined purity of{" "}
            <em>Virtue</em> and the search for the <em>Origin</em> of ice cream, to a <em>Tribute</em> to diverse
            global heritages and the <em>Wicked</em> spark of hedonistic joy—we capture the entire spectrum of
            existence in every scoop. We invite you to <em>Spoon with Purpose</em>, embrace the duality of reason and
            passion, and discover a dessert that truly makes human life better.
          </p>
        </div>
      </div>

      <GoldenMeanScale />

      <ol className="grid w-full max-w-[1200px] border-t border-line md:grid-cols-3">
        {PRINCIPLES.map((p, i) => (
          <li
            key={p.title}
            className="flex flex-col gap-3.5 border-b border-line py-7 md:border-b-0 md:py-0 md:pt-9 md:pr-10 md:not-first:pl-10 md:not-last:border-r"
          >
            <Eyebrow>{String(i + 1).padStart(2, "0")}</Eyebrow>
            <span className="font-serif text-[28px] leading-tight lg:text-[32px]">{p.title}</span>
            <span className="text-[15px] leading-relaxed text-body lg:text-base">{p.body}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
