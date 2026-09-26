import { useState } from "react";
import { NAV_LINKS } from "../data/content.js";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav aria-label="Primary" className="relative z-20 border-b border-ink/12">
      <div className="mx-auto flex h-18 max-w-[1440px] items-center justify-between pl-5 pr-2 md:px-10 lg:h-24 lg:px-[120px]">
        <a href="/#top" aria-label="Aethel Criemhild — home" className="block">
          <img src="/assets/logo-horizontal-black.webp" alt="Aethel Criemhild" className="h-11 w-auto lg:h-15" />
        </a>

        <ul className="hidden items-center gap-7 text-sm font-medium tracking-[0.04em] lg:flex">
          {NAV_LINKS.map((link, i) => (
            <li key={link.href} className="flex items-center gap-7">
              {i > 0 && <span aria-hidden="true" className="h-3.5 w-px bg-ink/25" />}
              <a href={link.href} className="py-3 text-ink no-underline hover:text-umber">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex size-12 items-center justify-center text-ink lg:hidden"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6 fill-none stroke-current stroke-[1.4]">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 8h18M3 16h18" />}
          </svg>
        </button>
      </div>

      {open && (
        <ul id="mobile-menu" className="absolute inset-x-0 top-full border-b border-line bg-paper px-5 pb-7 pt-2 lg:hidden">
          {NAV_LINKS.map((link) => (
            <li key={link.href} className="border-b border-line-soft last:border-0">
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3.5 font-serif text-3xl text-ink no-underline"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
