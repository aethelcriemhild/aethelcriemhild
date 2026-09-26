import { FOOTER_COLUMNS } from "../data/content.js";
import { Eyebrow } from "./ui.jsx";

export default function Footer() {
  return (
    <footer className="bg-night px-5 pt-18 pb-10 text-[#CFC8BC] md:px-10 lg:px-[120px] lg:pt-26 lg:pb-12">
      <div className="grid grid-cols-2 gap-x-5 gap-y-10 border-b border-[#36322D] pb-12 lg:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))] lg:gap-12 lg:pb-18">
        <div className="col-span-2 lg:col-span-1">
          <img
            src="/assets/logo-stacked-white.webp"
            alt="Aethel Criemhild — Spoon with Purpose"
            className="w-50 lg:w-60"
            loading="lazy"
          />
        </div>
        {FOOTER_COLUMNS.map((col) => (
          <nav key={col.heading} aria-label={col.heading} className="flex flex-col gap-3.5 text-sm">
            <Eyebrow className="mb-1.5 text-[#9A9285]">{col.heading}</Eyebrow>
            {col.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-[#CFC8BC] no-underline hover:text-white hover:underline ${link.className ?? ""}`}
              >
                {link.label}
              </a>
            ))}
          </nav>
        ))}
      </div>
      <p className="pt-8 text-center text-xs tracking-[0.04em] text-stone lg:pt-12 lg:text-[13px]">
        Copyright © 2026 Criemhild, Inc. All rights reserved.
      </p>
    </footer>
  );
}
