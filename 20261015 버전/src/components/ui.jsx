import { Fragment, useState } from "react";
import { SOCIAL_LINKS } from "../data/content.js";
import { trackEvent } from "../data/track.js";

export function Eyebrow({ children, className = "text-umber", style }) {
  return (
    <span className={`eyebrow ${className}`} style={style}>
      {children}
    </span>
  );
}

export function ArrowIcon({ className = "size-4" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`fill-none stroke-current stroke-[1.6] ${className}`}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/** Underlined uppercase text link with an arrow, as used under section intros. */
export function ArrowLink({ href, children, className = "" }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-3 border-b border-current pb-1.5 text-sm font-semibold tracking-[0.08em] uppercase no-underline ${className}`}
    >
      {children}
      <ArrowIcon />
    </a>
  );
}

/** Renders copy that marks Greek/Latin terms with <em>…</em>, without injecting HTML. */
export function Rich({ text }) {
  return text.split(/(<em>.*?<\/em>)/).map((part, i) =>
    part.startsWith("<em>") ? <em key={i}>{part.slice(4, -5)}</em> : <Fragment key={i}>{part}</Fragment>
  );
}

/** Arch-framed image. If the file is missing (e.g. a product shot not yet supplied) the frame stays, labelled. */
export function ArchImage({ src, alt, eager = false, ring = "rgba(255,255,255,0.35)", className = "" }) {
  const [missing, setMissing] = useState(!src);
  return (
    <div
      className={`aspect-[420/580] w-full overflow-hidden rounded-full bg-[#D9CDB8] ${className}`}
      style={{ boxShadow: `0 0 0 14px ${ring}` }}
    >
      {missing ? (
        <div role="img" aria-label={alt} className="flex size-full items-center justify-center p-10 text-center">
          <span className="eyebrow text-muted">Image coming soon</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          onError={() => setMissing(true)}
          className="size-full object-cover"
        />
      )}
    </div>
  );
}

/** Navy arch with the gold emblem — stands in for a product photo. */
export function EmblemArch({ label, className = "" }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`flex aspect-[420/580] w-full items-center justify-center overflow-hidden rounded-full bg-navy shadow-[0_0_0_14px_rgba(255,255,255,0.35)] ${className}`}
    >
      <img src="/assets/emblem-gold.webp" alt="" className="w-[46%]" />
    </div>
  );
}

const SOCIAL_ICONS = {
  X: <path d="M5 5l14 14M19 5L5 19" />,
  Instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="16.8" cy="7.2" r="0.6" />
    </>
  ),
  YouTube: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="4" />
      <path d="M10.5 9.5l4 2.5-4 2.5z" />
    </>
  ),
  TikTok: (
    <>
      <path d="M13.5 4v10.5a3.5 3.5 0 1 1-3.5-3.5" />
      <path d="M13.5 4c.4 2.4 2.2 4 4.5 4.2" />
    </>
  ),
};

export function Socials({ dark = false }) {
  return (
    <ul className="flex gap-3.5">
      {SOCIAL_LINKS.map((s) => (
        <li key={s.name}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener"
            onClick={() => trackEvent("social_click", { platform: s.name, link_url: s.href })}
            aria-label={`Aethel Criemhild on ${s.name}`}
            className={`flex size-12 items-center justify-center rounded-full transition-colors lg:size-13 ${
              dark ? "bg-[#2A2723] hover:bg-umber" : "bg-ink hover:bg-umber"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="size-5.5 fill-none stroke-champagne stroke-[1.6] [stroke-linecap:round] [stroke-linejoin:round]"
            >
              {SOCIAL_ICONS[s.name]}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}

/** Terms + privacy consent checkbox. */
export function ConsentCheckbox({ id, children, describedBy }) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-start gap-3.5 text-sm leading-relaxed text-body">
      <input
        id={id}
        name={id}
        type="checkbox"
        required
        aria-invalid={describedBy ? true : undefined}
        aria-describedby={describedBy}
        className="mt-0.5"
      />
      <span>{children}</span>
    </label>
  );
}
