import { useState } from "react";
import { CONTACT_EMAIL, SOCIAL_LINKS } from "../data/content.js";
import { checkRequiredFields, submitForm } from "../data/submitForm.js";
import { ConsentCheckbox, Eyebrow, Field } from "./ui.jsx";

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

function Socials() {
  return (
    <ul className="flex gap-3.5">
      {SOCIAL_LINKS.map((s) => (
        <li key={s.name}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener"
            aria-label={`Aethel Criemhild on ${s.name}`}
            className="flex size-12 items-center justify-center rounded-full bg-ink transition-colors hover:bg-umber lg:size-13"
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

function ContactDetails() {
  return (
    <div className="flex flex-col gap-6 lg:gap-7">
      <p className="flex items-baseline gap-4 font-serif">
        <span className="text-[26px] text-ink">E</span>
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-[22px]">
          {CONTACT_EMAIL}
        </a>
      </p>
      <Socials />
    </div>
  );
}

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | invalid | error
  const [showErrors, setShowErrors] = useState(false);
  const [errorDetail, setErrorDetail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    if (!checkRequiredFields(formEl)) {
      setShowErrors(true);
      return setStatus("invalid");
    }
    const fields = Object.fromEntries(new FormData(formEl).entries());
    setStatus("sending");
    const { ok, message } = await submitForm({
      subject: fields.subject || "Website contact",
      fromName: `${fields.first_name} ${fields.last_name}`.trim(),
      fields,
    });
    if (ok) {
      formEl.reset();
      setShowErrors(false);
    }
    setErrorDetail(ok ? "" : message);
    setStatus(ok ? "sent" : "error");
  };

  return (
    <section id="contact" className="bg-cream px-5 py-24 md:px-10 lg:px-[120px] lg:py-40">
      <div className="grid gap-9 border border-line bg-paper px-5.5 py-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-24 lg:p-20">
        <div className="flex flex-col justify-between gap-16">
          <div className="flex flex-col gap-6">
            <Eyebrow>VI · Contact</Eyebrow>
            <h2 className="font-serif text-[46px] leading-none font-normal lg:text-7xl">
              Get in <em>Touch</em>
            </h2>
            <p className="font-serif text-[22px] leading-normal text-ink-2 lg:text-[26px]">We’d like to hear from you.</p>
            <p className="text-base leading-relaxed text-body">
              If you have any inquiries or just want to say hi, please use the contact form.
            </p>
          </div>
          <div className="hidden lg:block">
            <ContactDetails />
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate data-validated={showErrors || undefined} className="flex flex-col gap-5">
          <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="first_name" label="First name" required autoComplete="given-name" />
            <Field id="last_name" label="Last name" required autoComplete="family-name" />
          </div>
          <Field id="contact_email" label="Email" type="email" required autoComplete="email" />
          <Field id="subject" label="Subject" required />
          <Field id="message" label="Message" textarea required className="[&_textarea]:h-45" />
          <div className="mt-1">
            <ConsentCheckbox id="contact_consent">
              I have read and agree to the Website’s <a href="/terms.html">Terms of Use</a> and{" "}
              <a href="/privacy.html">Privacy Policy</a>.
            </ConsentCheckbox>
          </div>
          <div className="mt-2 flex flex-col gap-3.5 lg:items-end">
            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-solid h-15 tracking-[0.2em] disabled:opacity-60 lg:px-14"
            >
              {status === "sending" ? "Sending…" : "Send"}
            </button>
            {status === "sent" && (
              <span role="status" className="text-[15px]">
                Thank you — we’ll be in touch shortly.
              </span>
            )}
            {status === "invalid" && (
              <span role="alert" className="text-[15px] text-alert">
                Please complete the highlighted required fields and accept the terms.
              </span>
            )}
            {status === "error" && (
              <span role="alert" className="text-[15px] text-alert">
                Something went wrong. Please try again, or email us at {CONTACT_EMAIL}.
                {errorDetail && <span className="block">Details: {errorDetail}</span>}
              </span>
            )}
          </div>
        </form>

        <div className="border-t border-line pt-7 lg:hidden">
          <ContactDetails />
        </div>
      </div>
    </section>
  );
}
