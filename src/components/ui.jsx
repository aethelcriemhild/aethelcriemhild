export function Eyebrow({ children, className = "text-umber" }) {
  return <span className={`eyebrow ${className}`}>{children}</span>;
}

export function ArrowIcon({ className = "size-4" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`fill-none stroke-current stroke-[1.6] ${className}`}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function PlusIcon({ className = "size-12" }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={`fill-none stroke-dusk stroke-1 ${className}`}>
      <circle cx="24" cy="24" r="23" />
      <path d="M24 14v20M14 24h20" />
    </svg>
  );
}

export function Field({ id, label, required, textarea, className = "", ...inputProps }) {
  const Control = textarea ? "textarea" : "input";
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="eyebrow text-body">
        {label}
        {required && " *"}
      </label>
      <Control id={id} name={id} required={required} className="field" {...inputProps} />
    </div>
  );
}

/** Terms + privacy consent checkbox shared by both forms. */
export function ConsentCheckbox({ id, children }) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-start gap-3.5 text-sm leading-relaxed text-body">
      <input id={id} name={id} type="checkbox" required className="mt-0.5" />
      <span>{children}</span>
    </label>
  );
}
