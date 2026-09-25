import { useState } from "react";
import { ACCOUNT_TYPES, CONTACT_EMAIL, ICE_CREAM_MOQ, ORDERS_OPEN, ORDER_CATEGORIES } from "../data/content.js";
import { checkRequiredFields, submitForm } from "../data/submitForm.js";
import { trackEvent } from "../data/track.js";
import { ConsentCheckbox, Eyebrow, Field } from "./ui.jsx";

const MESSAGES = {
  invalid: "Please complete the highlighted required fields and accept the terms before submitting.",
  empty: "Select at least one order category.",
  missingQty: "Enter a quantity for every selected item.",
  belowMin: `Some flavors are below the minimum order quantity of ${ICE_CREAM_MOQ} pcs. Please adjust the highlighted items before submitting.`,
  error: `Something went wrong. Please try again, or email us at ${CONTACT_EMAIL}.`,
};

function QtyInput({ id, label, value, onChange, disabled, unit, narrowUnit }) {
  return (
    <div className="flex shrink-0 items-center gap-2.5">
      <input
        id={id}
        type="number"
        inputMode="numeric"
        min="0"
        placeholder="Qty"
        aria-label={`${label} quantity`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="field h-11 w-20 px-2.5 sm:w-28 sm:px-4"
      />
      <span className={`text-sm text-muted ${narrowUnit ? "hidden sm:inline" : ""} sm:w-11`}>{unit}</span>
    </div>
  );
}

export default function WholesaleOrder() {
  const [account, setAccount] = useState(ACCOUNT_TYPES[0].id);
  const [checked, setChecked] = useState({}); // category and option ids → bool
  const [qty, setQty] = useState({}); // category and option ids → string
  const [status, setStatus] = useState("idle"); // idle | sending | sent | invalid | empty | missingQty | belowMin | error
  const [showErrors, setShowErrors] = useState(false); // outline missing required fields after a failed submit
  const [errorDetail, setErrorDetail] = useState("");

  const resetStatus = () => setStatus((s) => (s === "sending" ? s : "idle"));

  // Checking fills the start quantity; unchecking clears it.
  const toggle = (id, start = 1) => {
    const on = !checked[id];
    setChecked((c) => ({ ...c, [id]: on }));
    setQty((q) => {
      const next = { ...q };
      if (on) next[id] = String(start);
      else delete next[id];
      return next;
    });
    resetStatus();
  };

  // Lowering a quantity to 0 unchecks the item; an empty field is allowed while typing.
  const changeQty = (id, raw) => {
    if (raw !== "" && Number(raw) <= 0) {
      setChecked((c) => ({ ...c, [id]: false }));
      setQty((q) => {
        const next = { ...q };
        delete next[id];
        return next;
      });
    } else {
      setQty((q) => ({ ...q, [id]: raw }));
    }
    resetStatus();
  };

  const isBelowMin = (option) =>
    option.min && checked[option.id] && qty[option.id] !== "" && qty[option.id] !== undefined && Number(qty[option.id]) < option.min;

  // Flattened list of what the customer actually selected.
  const selectedLines = ORDER_CATEGORIES.filter((c) => checked[c.id]).flatMap((c) =>
    c.options
      ? c.options.filter((o) => checked[o.id]).map((o) => ({ ...o, category: c.title, key: o.id }))
      : [{ ...c, label: c.title, category: c.title, key: c.id }]
  );
  const selectedCount = ORDER_CATEGORIES.filter((c) => checked[c.id]).length;
  const anyBelowMin = ORDER_CATEGORIES.some((c) => checked[c.id] && c.options?.some(isBelowMin));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ORDERS_OPEN) return;
    const formEl = e.currentTarget;
    if (!checkRequiredFields(formEl)) {
      setShowErrors(true);
      return setStatus("invalid");
    }
    if (selectedLines.length === 0) return setStatus("empty");
    if (selectedLines.some((l) => !qty[l.key])) return setStatus("missingQty");
    if (anyBelowMin) return setStatus("belowMin");

    const form = new FormData(formEl);
    const fields = Object.fromEntries(form.entries());
    const accountTitle = ACCOUNT_TYPES.find((a) => a.id === account)?.title;
    const orderLines = selectedLines
      .map((l) => `${l.category}${l.category !== l.label ? ` — ${l.label}` : ""}: ${qty[l.key]} ${l.unit}`)
      .join("\n");

    setStatus("sending");
    const { ok, message } = await submitForm({
      subject: `Order — ${fields.company || "New account"} (${accountTitle})`,
      fromName: fields.contact_person,
      fields: { ...fields, account_type: accountTitle, order_lines: orderLines },
    });
    if (ok) {
      formEl.reset();
      setChecked({});
      setQty({});
      setShowErrors(false);
      trackEvent("order_form_submit", {
        account_type: accountTitle,
        order_categories: ORDER_CATEGORIES.filter((c) => checked[c.id]).map((c) => c.title).join(", "),
        line_count: selectedLines.length,
      });
    }
    setErrorDetail(ok ? "" : message);
    setStatus(ok ? "sent" : "error");
  };

  return (
    <section
      id="wholesale"
      className="grid gap-9 bg-cream px-5 py-24 md:px-10 lg:grid-cols-[400px_minmax(0,1fr)] lg:items-start lg:gap-20 lg:px-[120px] lg:py-40"
    >
      <div className="flex flex-col gap-5 lg:gap-8">
        <Eyebrow>IV · Wholesale</Eyebrow>
        <h2 className="font-serif text-[44px] leading-none font-normal lg:text-[64px]">
          Criemhild
          <br />
          <em>Order Portal</em>
        </h2>
        <p className="text-base leading-relaxed text-body lg:text-[17px]">
          For franchises, distributors and independent cafés. For pricing quotes, please reach us through the{" "}
          <a href="#contact">Contact Us</a> form.
        </p>
        <address className="flex flex-col gap-1.5 text-[15px] not-italic lg:gap-2">
          <Eyebrow className="mb-1 text-muted">Wholesale desk</Eyebrow>
          <span>Criemhild, Inc.</span>
          <span>Attn: Wholesale Team</span>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </address>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        data-validated={showErrors || undefined}
        className="flex flex-col gap-10 border border-line bg-white px-5 py-7 lg:gap-12 lg:p-14"
      >
        {/* Web3Forms spam honeypot — real users never see or tick it. */}
        <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
        <fieldset className="flex flex-col gap-4.5 lg:gap-5">
          <legend className="mb-5 font-serif text-[26px] lg:mb-6 lg:text-3xl">Company details</legend>
          <div className="grid gap-4.5 sm:grid-cols-2 lg:gap-5">
            <Field id="company" label="Company name" required autoComplete="organization" placeholder="Registered business name" />
            <Field id="contact_person" label="Contact person" required autoComplete="name" placeholder="Full name" />
            <Field id="email" label="Email" type="email" required autoComplete="email" placeholder="name@company.com" />
            <Field id="phone" label="Phone" type="tel" required autoComplete="tel" placeholder="+1 000 000 0000" />
          </div>
          <Field
            id="shipping_address"
            label="Shipping address"
            textarea
            required
            autoComplete="street-address"
            placeholder="Street, City, State, ZIP code, Country"
          />
        </fieldset>

        <fieldset>
          <legend className="mb-5 font-serif text-[26px] lg:mb-6 lg:text-3xl">Account type</legend>
          <div className="grid gap-2.5 md:grid-cols-3 md:gap-4">
            {ACCOUNT_TYPES.map((a) => {
              const on = account === a.id;
              return (
                <label
                  key={a.id}
                  className={`flex cursor-pointer gap-3.5 p-4.5 md:min-h-35 md:flex-col md:gap-3 md:p-5.5 ${
                    on ? "border-[1.5px] border-ink bg-cream" : "border border-line bg-white"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="account_type_id"
                      value={a.id}
                      checked={on}
                      onChange={() => {
                        setAccount(a.id);
                        resetStatus();
                      }}
                    />
                    <span className="hidden font-semibold md:inline">{a.title}</span>
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="font-semibold md:hidden">{a.title}</span>
                    <span className="text-sm leading-normal text-body">{a.description}</span>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-5 font-serif text-[26px] lg:mb-6 lg:text-3xl">Order categories</legend>
          <div className="flex flex-col border border-line">
            {ORDER_CATEGORIES.map((c) => {
              const on = !!checked[c.id];
              return (
                <div key={c.id} className={`flex flex-col not-last:border-b not-last:border-line-soft ${on ? "bg-paper" : "bg-white"}`}>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-3 p-4.5 lg:min-h-15 lg:px-5.5">
                    <label className="flex grow cursor-pointer items-start gap-3.5 lg:gap-4">
                      <input type="checkbox" checked={on} onChange={() => toggle(c.id)} className="mt-0.5" />
                      <span className="flex flex-col gap-1">
                        <span className="font-semibold">{c.title}</span>
                        <span className="text-sm text-muted">{c.description}</span>
                      </span>
                    </label>
                    {on && !c.options && (
                      <div className="pl-8.5 lg:pl-0">
                        <QtyInput
                          id={`qty-${c.id}`}
                          label={c.title}
                          unit={c.unit}
                          value={qty[c.id] ?? ""}
                          onChange={(v) => changeQty(c.id, v)}
                        />
                      </div>
                    )}
                    <Eyebrow className="hidden w-18 text-right text-muted lg:inline">{c.code}</Eyebrow>
                  </div>

                  {on && c.options && (
                    <div className="flex flex-col gap-2 px-3.5 pb-4.5 lg:pr-5.5 lg:pb-5 lg:pl-14.5">
                      {c.options.map((o) => {
                        const optOn = !!checked[o.id];
                        const low = isBelowMin(o);
                        return (
                          <div key={o.id} className="flex flex-col gap-1.5">
                            <div
                              className={`flex items-center gap-2.5 bg-white py-1.5 pr-1.5 pl-3 lg:gap-3.5 lg:py-2 lg:pr-2 lg:pl-4 ${
                                low ? "border border-alert" : "border border-line-soft"
                              }`}
                            >
                              <label className="flex min-h-11 grow cursor-pointer items-center gap-3 lg:gap-3.5">
                                <input type="checkbox" checked={optOn} onChange={() => toggle(o.id, o.start)} />
                                <span className="flex flex-col gap-0.5">
                                  <span className="text-[15px]">{o.label}</span>
                                  {o.detail && <span className="text-[13px] text-muted">{o.detail}</span>}
                                </span>
                              </label>
                              <QtyInput
                                id={`qty-${o.id}`}
                                label={o.label}
                                unit={o.unit}
                                narrowUnit
                                value={qty[o.id] ?? ""}
                                onChange={(v) => changeQty(o.id, v)}
                                disabled={!optOn}
                              />
                            </div>
                            {low && (
                              <span role="alert" className="flex items-center gap-2 pb-1 pl-3 text-[13px] text-alert lg:pl-4">
                                <svg viewBox="0 0 16 16" aria-hidden="true" className="size-3.5 shrink-0 fill-none stroke-current stroke-[1.4]">
                                  <circle cx="8" cy="8" r="6.5" />
                                  <path d="M8 4.5v4.2M8 11v.3" />
                                </svg>
                                Minimum order quantity is {o.min} {o.unit}.
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </fieldset>

        <Field
          id="notes"
          label="Notes"
          textarea
          placeholder="Estimated volumes, number of locations, delivery window, voltage requirements…"
        />

        <ConsentCheckbox id="order_consent">
          I confirm this inquiry is made on behalf of a registered business and agree to the{" "}
          <a href="/terms.html">Terms of Use</a> and <a href="/privacy.html">Privacy Policy</a>.
        </ConsentCheckbox>

        <div className="flex flex-col gap-3.5 lg:gap-4">
          <button
            type="submit"
            disabled={!ORDERS_OPEN || status === "sending"}
            aria-describedby={ORDERS_OPEN ? undefined : "orders-closed-note"}
            className="btn-solid h-16 w-full tracking-[0.18em] disabled:cursor-not-allowed disabled:border disabled:border-dashed disabled:border-dusk disabled:bg-sand disabled:text-muted disabled:hover:bg-sand disabled:hover:text-muted lg:h-18 lg:text-[15px]"
          >
            {status === "sending" ? "Sending…" : "[ Submit Order ]"}
          </button>
          {!ORDERS_OPEN && (
            <p id="orders-closed-note" className="flex items-center justify-center gap-2 text-center text-sm text-muted">
              <Eyebrow>Coming soon</Eyebrow>
              <span>Online ordering opens at launch.</span>
            </p>
          )}
          <span className="text-center text-[13px] text-muted">
            {selectedCount === 0 ? MESSAGES.empty : `${selectedCount} of ${ORDER_CATEGORIES.length} categories selected`}
          </span>

          {["invalid", "empty", "missingQty", "belowMin", "error"].includes(status) && (
            <div role="alert" className="border border-alert px-5 py-4 text-sm leading-relaxed text-alert">
              {MESSAGES[status]}
              {status === "error" && errorDetail && <span className="mt-1 block">Details: {errorDetail}</span>}
            </div>
          )}

          <p className="mt-1 text-center text-sm leading-relaxed text-body">
            Once your form is submitted, an official invoice and payment link will be sent within 3 business days to
            confirm your order. For any questions, please reach us through the <a href="#contact">Contact Us</a> form.
          </p>

          {status === "sent" && (
            <div role="status" className="flex flex-col gap-1.5 border border-ink px-6 py-5">
              <Eyebrow>Received</Eyebrow>
              <span className="text-[15px] leading-relaxed">
                Thank you — your order has been received. An official invoice and payment link will follow within 3
                business days.
              </span>
            </div>
          )}
        </div>
      </form>
    </section>
  );
}
