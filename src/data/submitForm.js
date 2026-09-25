import { WEB3FORMS_ACCESS_KEY } from "./content.js";

/**
 * Posts a form to Web3Forms (the same service the current site uses).
 * `fields` is a plain object; it is sent alongside the access key and subject.
 * Resolves true on success, false otherwise.
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
    return Boolean(result.success);
  } catch {
    return false;
  }
}
