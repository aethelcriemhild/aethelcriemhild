import { WEB3FORMS_ACCESS_KEY } from "./content.js";

/**
 * Posts a form to Web3Forms (the same service the current site uses).
 * `fields` is a plain object; it is sent alongside the access key and subject.
 * Resolves `{ ok, message }` — `message` is Web3Forms' explanation when it rejects a submission.
 */
export async function submitForm({ subject, fromName, fields }) {
  const body = new FormData();
  body.append("access_key", WEB3FORMS_ACCESS_KEY);
  body.append("subject", subject);
  if (fromName) body.append("from_name", fromName);
  for (const [key, value] of Object.entries(fields)) body.append(key, value ?? "");

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { Accept: "application/json" },
      body,
    });
    const result = await res.json();
    return { ok: Boolean(result.success), message: result.message };
  } catch {
    return { ok: false, message: "" };
  }
}

/**
 * Checks the form's required fields. When something is missing, moves the visitor to the
 * first problem so long forms never fail silently. Returns true when the form is valid.
 */
export function checkRequiredFields(form) {
  if (form.checkValidity()) return true;
  const first = form.querySelector("input:invalid, textarea:invalid, select:invalid");
  first?.scrollIntoView({ behavior: "smooth", block: "center" });
  first?.focus({ preventScroll: true });
  return false;
}
