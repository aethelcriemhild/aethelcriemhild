import { useState } from "react";
import { SiteHeader } from "../components/Hero.jsx";
import { ConsentCheckbox, Eyebrow, Socials } from "../components/ui.jsx";
import { CONTACT_EMAIL, INQUIRY_TYPES } from "../data/content.js";
import { submitForm } from "../data/submitForm.js";
import { trackEvent } from "../data/track.js";

// /contact?type=trade (or press/general) preselects the inquiry type.
const initialType = () => {
  const t = new URLSearchParams(window.location.search).get("type");
  return INQUIRY_TYPES.some((o) => o.value === t) ? t : "general";
};

const MESSAGES = {
  name: "Please enter your name.",
  email: "Please enter a valid email address.",
  message: "Please enter a message.",
  consent: "Please confirm you agree to the Terms of Use and Privacy Policy.",
};

function FieldError({ id, error }) {
  return error ? (
    <span id={`${id}-error`} className="text-sm text-alert">
      {error}
    </span>
  ) : null;
}

function Field({ id, label, error, textarea, ...props }) {
  const Control = textarea ? "textarea" : "input";
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="eyebrow text-body">
        {label} *
      </label>
      <Control
        id={id}
        name={id}
        required
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`field ${error ? "border-alert" : ""}`}
        {...props}
      />
      <FieldError id={id} error={error} />
    </div>
  );
}

function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errors, setErrors] = useState({});
  const [errorDetail, setErrorDetail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = {};
    for (const key of ["name", "email", "message", "consent"]) {
      if (!form.elements[key].checkValidity()) found[key] = MESSAGES[key];
    }
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      form.elements[first].focus();
      return;
    }

    const fields = Object.fromEntries(new FormData(form).entries());
    const typeLabel = INQUIRY_TYPES.find((o) => o.value === fields.inquiry_type)?.label ?? "General";
    setStatus("sending");
    const { ok, message } = await submitForm({
      subject: `Website contact — ${typeLabel}`,
      fromName: fields.name,
      fields: { ...fields, inquiry_type: typeLabel },
    });
    if (ok) {
      form.reset();
      form.elements.inquiry_type.value = initialType();
      trackEvent("contact_form_submit", { inquiry_type: fields.inquiry_type });
    }
    setErrorDetail(ok ? "" : message);
    setStatus(ok ? "sent" : "error");
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
      <Field id="name" label="Name" autoComplete="name" error={errors.name} />
      <Field id="email" label="Email" type="email" autoComplete="email" error={errors.email} />
      <div className="flex flex-col gap-2">
        <label htmlFor="inquiry_type" className="eyebrow text-body">
          Inquiry type
        </label>
        <select id="inquiry_type" name="inquiry_type" defaultValue={initialType()} className="field">
          {INQUIRY_TYPES.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <Field id="message" label="Message" textarea error={errors.message} className={`field h-45 ${errors.message ? "border-alert" : ""}`} />
      <div className="mt-1 flex flex-col gap-2">
        <ConsentCheckbox id="consent" describedBy={errors.consent ? "consent-error" : undefined}>
          I have read and agree to the Website’s <a href="/terms">Terms of Use</a> and{" "}
          <a href="/privacy">Privacy Policy</a>.
        </ConsentCheckbox>
        <FieldError id="consent" error={errors.consent} />
      </div>
      <div className="mt-2 flex flex-col gap-3.5 lg:items-end">
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-solid h-15 tracking-[0.2em] disabled:cursor-not-allowed disabled:opacity-60 lg:px-14"
        >
          {status === "sending" ? "Sending…" : "Send"}
        </button>
        <span role="status" className="text-[15px]">
          {status === "sent" && "Thank you. Your message has been received."}
        </span>
        {status === "error" && (
          <span role="alert" className="text-[15px] text-alert">
            Something went wrong. Please try again, or email us at {CONTACT_EMAIL}.
            {errorDetail && <span className="block">Details: {errorDetail}</span>}
          </span>
        )}
      </div>
    </form>
  );
}

function PreferEmail() {
  return (
    <div className="flex flex-col gap-6">
      <p className="flex flex-col gap-1.5 font-serif">
        <span className="text-[22px] text-ink">Prefer email?</span>
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-[22px]">
          {CONTACT_EMAIL}
        </a>
      </p>
      <Socials />
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="bg-cream px-5 py-16 md:px-10 lg:px-[120px] lg:py-28">
        <div className="mx-auto grid max-w-[1200px] gap-9 border border-line bg-paper px-5.5 py-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-24 lg:p-20">
          <div className="flex flex-col justify-between gap-12">
            <div className="flex flex-col gap-6">
              <Eyebrow>Contact</Eyebrow>
              <h1 className="font-serif text-[46px] leading-none font-normal lg:text-7xl">
                Get in <em>touch</em>
              </h1>
              <p className="text-base leading-relaxed text-body lg:text-[17px]">
                We’d like to hear from you. For general questions, trade and wholesale inquiries, or press, use the
                form below.
              </p>
            </div>
            <div className="hidden lg:block">
              <PreferEmail />
            </div>
          </div>
          <ContactForm />
          <div className="border-t border-line pt-7 lg:hidden">
            <PreferEmail />
          </div>
        </div>
      </main>
    </>
  );
}
