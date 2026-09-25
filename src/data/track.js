/**
 * Sends a GA4 event. `window.gtag` only exists after the visitor accepts the cookie banner
 * (see public/analytics.js), so nothing is sent without consent. Never pass personal data
 * (names, emails, company names) — Google Analytics policy forbids it.
 */
export function trackEvent(name, params = {}) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
}
