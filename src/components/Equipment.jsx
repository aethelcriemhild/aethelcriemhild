import { useState } from "react";
import { CAPSULE_FLAVORS, EQUIPMENT_PLACEHOLDERS, SNOWMAN } from "../data/content.js";
import SnowmanDrawing from "./SnowmanDrawing.jsx";
import { ArrowIcon, Eyebrow, PlusIcon } from "./ui.jsx";

function FlagshipCard() {
  const s = SNOWMAN;
  return (
    <article className="grid border border-line bg-paper lg:grid-cols-[540px_minmax(0,1fr)]">
      <div className="relative flex min-h-[400px] items-center justify-center bg-ink px-6 py-14 lg:min-h-[660px] lg:px-0">
        <Eyebrow className="absolute top-5 left-5 text-stone lg:top-7 lg:left-7">Fig. 01 — Front elevation</Eyebrow>
        <Eyebrow className="absolute top-5 right-5 text-dusk lg:top-7 lg:right-7">Model {s.model}</Eyebrow>
        <SnowmanDrawing className="hidden w-[540px] lg:block" />
        <SnowmanDrawing callouts={false} className="w-44 lg:hidden" />
        <Eyebrow className="absolute inset-x-0 bottom-5 text-center text-[#CFC8BC] lg:hidden">
          W 300 · D 400 · H 600 mm
        </Eyebrow>
      </div>

      <div className="flex flex-col gap-6 px-5 py-8 lg:gap-7 lg:px-16 lg:py-14">
        <div className="flex flex-wrap gap-2.5">
          {s.tags.map((tag) => (
            <Eyebrow key={tag} className="border border-ink px-3 py-2 text-ink">
              {tag}
            </Eyebrow>
          ))}
          <Eyebrow className="bg-ink px-3 py-2 text-cream">{s.status}</Eyebrow>
        </div>
        <h3 className="font-serif text-4xl leading-[1.02] font-normal lg:text-[52px]">
          {s.title}
          <br />
          <em>{s.titleEm}</em>
        </h3>
        <p className="max-w-[560px] text-[15px] leading-relaxed text-body lg:text-[17px]">{s.description}</p>

        <ol className="grid grid-cols-3 border-y border-line">
          {s.steps.map((step, i) => (
            <li key={step} className="flex flex-col gap-1.5 py-4 not-first:pl-3 not-last:border-r not-last:border-line lg:py-4.5 lg:not-first:pl-5">
              <Eyebrow>Step {String(i + 1).padStart(2, "0")}</Eyebrow>
              <span className="font-serif text-[22px] lg:text-2xl">{step}</span>
            </li>
          ))}
        </ol>

        <dl className="grid sm:grid-cols-2 sm:gap-x-8">
          {s.specs.map(([term, value]) => (
            <div key={term} className="flex justify-between gap-4 border-b border-line-soft py-3 text-sm">
              <dt className="text-body">{term}</dt>
              <dd className="text-right font-semibold">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="flex flex-col gap-1.5 text-sm leading-relaxed sm:flex-row sm:gap-5">
          <Eyebrow className="shrink-0 pt-0.5 text-muted">In the box</Eyebrow>
          <span>{s.inTheBox}</span>
        </p>

        <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:gap-4">
          <a href="#contact" className="btn-solid h-13 text-[13px]">
            Request a quote <ArrowIcon />
          </a>
          <a href="#contact" className="btn-outline h-13 text-[13px]">
            Request spec sheet
          </a>
        </div>
      </div>
    </article>
  );
}

function CapsuleCard() {
  const [selected, setSelected] = useState(CAPSULE_FLAVORS[0].id);
  const current = CAPSULE_FLAVORS.find((f) => f.id === selected);

  return (
    <article className="flex flex-col gap-5 border border-line bg-paper p-6 lg:min-h-[660px] lg:p-9">
      <div className="flex justify-between">
        <Eyebrow className="text-muted">{SNOWMAN.code}·R</Eyebrow>
        <Eyebrow>Consumable</Eyebrow>
      </div>

      <div className="relative h-[220px] overflow-hidden transition-colors" style={{ background: current.bg }}>
        {current.image ? (
          <img src={current.image} alt={`${current.name} made with Snowman capsules`} className="size-full object-cover" />
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-2.5 text-center">
            <svg viewBox="0 0 48 32" aria-hidden="true" className="h-8 w-12 fill-none stroke-dusk stroke-[1.2]">
              <path d="M4 16 h40 a20 14 0 0 1 -40 0 z" />
              <path d="M9 16 c3 -12 27 -12 30 0" />
              <path d="M18 30 h12" />
            </svg>
            <Eyebrow className="text-muted">{current.name}</Eyebrow>
            <span className="font-serif text-[26px] text-ink italic">Coming soon</span>
          </div>
        )}
      </div>

      <div role="group" aria-label="Capsule flavor" className="flex gap-5 py-1.5">
        {CAPSULE_FLAVORS.map((f) => {
          const on = f.id === selected;
          const ring = `inset 0 0 0 7px #FBF8F3, inset 0 0 0 8px ${f.edge}`;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={on}
              onClick={() => setSelected(f.id)}
              className="flex cursor-pointer flex-col items-center gap-2.5"
            >
              <span
                className="size-14 rounded-full"
                style={{ background: f.color, boxShadow: on ? `${ring}, 0 0 0 2px #1E1C19` : ring }}
              />
              <Eyebrow className={`border-b-[1.5px] pb-0.5 text-ink ${on ? "border-ink" : "border-transparent"}`}>
                {f.label}
              </Eyebrow>
            </button>
          );
        })}
        <div className="flex flex-col items-center gap-2.5">
          <span className="flex size-14 items-center justify-center rounded-full border border-dashed border-[#A99F8C]">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4.5 fill-none stroke-dusk stroke-[1.4]">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
          <Eyebrow className="text-muted">In R&amp;D</Eyebrow>
        </div>
      </div>

      <h3 className="font-serif text-3xl leading-[1.05] font-normal lg:text-[34px]">
        Snowman Ice Shaver
        <br className="hidden lg:block" /> Capsule Refills
      </h3>
      <p className="text-[15px] leading-relaxed text-body">
        Launching in Milk and Mango — with several dozen more flavors in development.
      </p>
      <a href="#wholesale" className="mt-auto text-[13px] font-semibold tracking-[0.08em] text-ink uppercase underline">
        Order refills
      </a>
    </article>
  );
}

function PlaceholderSlot({ code, title }) {
  return (
    <article className="flex min-h-[200px] flex-col gap-5 border border-dashed border-[#A99F8C] p-5 lg:min-h-[660px] lg:p-9">
      <div className="flex justify-between">
        <Eyebrow className="text-muted">{code}</Eyebrow>
        <Eyebrow className="hidden text-muted sm:inline">Reserved</Eyebrow>
      </div>
      <div className="flex grow items-center lg:justify-center">
        <PlusIcon className="size-9 lg:size-12" />
      </div>
      <h3 className="font-serif text-[22px] leading-[1.05] font-normal text-body lg:text-[34px]">{title}</h3>
      <Eyebrow className="text-muted">Coming soon</Eyebrow>
    </article>
  );
}

export default function Equipment() {
  return (
    <section id="equipment" className="flex flex-col gap-8 bg-sand px-5 py-24 md:px-10 lg:gap-16 lg:px-[120px] lg:py-40">
      <div className="flex flex-col gap-5 border-b border-ink pb-6 lg:flex-row lg:items-end lg:justify-between lg:pb-8">
        <div className="flex flex-col gap-5 lg:gap-7">
          <Eyebrow>III · F&amp;B Equipment &amp; Innovations</Eyebrow>
          <h2 className="font-serif text-[46px] leading-none font-normal tracking-[-0.01em] lg:text-[80px]">
            Engineered
            <br />
            <em>for the counter.</em>
          </h2>
        </div>
        <div className="flex flex-col gap-2 lg:items-end">
          <Eyebrow className="text-ink">Catalog · Vol. 01</Eyebrow>
          <Eyebrow className="text-muted">Commercial hardware · B2B</Eyebrow>
        </div>
      </div>

      <FlagshipCard />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-6">
        <div className="col-span-2 md:col-span-1">
          <CapsuleCard />
        </div>
        {EQUIPMENT_PLACEHOLDERS.map((slot) => (
          <PlaceholderSlot key={slot.code} {...slot} />
        ))}
      </div>
    </section>
  );
}
