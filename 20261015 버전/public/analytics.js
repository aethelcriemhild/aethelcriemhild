(function () {
  const GA_ID = "G-EWYF49RY9D";
  const CONSENT_KEY = "ac_cookie_consent";

  function loadGA4() {
    if (window.gaLoaded) return;
    window.gaLoaded = true;

    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", GA_ID);
  }

  function injectBannerStyles() {
    if (document.getElementById("cookieBannerStyles")) return;
    const style = document.createElement("style");
    style.id = "cookieBannerStyles";
    style.textContent = `
      #cookieBanner {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 999;
        background: #1e1c19;
        color: #f4efe7;
        padding: 18px 24px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: 16px;
        font-family: 'Hanken Grotesk', system-ui, sans-serif;
        font-size: 12.5px;
        box-shadow: 0 -4px 16px rgba(0,0,0,0.15);
      }
      #cookieBanner p { margin: 0; max-width: 560px; line-height: 1.6; }
      #cookieBanner a { color: #c9b48a; text-decoration: underline; text-underline-offset: 3px; }
      #cookieBanner .cookie-actions { display: flex; gap: 10px; flex-shrink: 0; }
      #cookieBanner button:focus-visible, #cookieBanner a:focus-visible { outline: 2px solid #c9b48a; outline-offset: 3px; }
      #cookieBanner button {
        font-family: 'Hanken Grotesk', system-ui, sans-serif;
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 1px;
        padding: 10px 18px;
        border-radius: 0;
        border: none;
        cursor: pointer;
      }
      #cookieBanner .cookie-decline { background: #f4efe7; color: #1e1c19; }
      #cookieBanner .cookie-accept { background: transparent; color: #f4efe7; border: 1px solid #5c554b; }
    `;
    document.head.appendChild(style);
  }

  let returnFocusTo = null;

  function hideBanner() {
    const banner = document.getElementById("cookieBanner");
    if (banner) banner.remove();
    if (returnFocusTo && document.contains(returnFocusTo)) returnFocusTo.focus();
    returnFocusTo = null;
  }

  function showBanner(trigger) {
    hideBanner();
    injectBannerStyles();

    const wasAccepted = localStorage.getItem(CONSENT_KEY) === "accepted";

    const banner = document.createElement("div");
    banner.id = "cookieBanner";
    banner.setAttribute("role", "region");
    banner.setAttribute("aria-label", "Cookie consent");
    banner.innerHTML = `
      <p>We use cookies to understand how visitors interact with our site via Google Analytics and to improve your browsing experience. We do not use cookies for targeted advertising. Please see our <a href="/privacy.html">Privacy Policy</a> for details.</p>
      <div class="cookie-actions">
        <button class="cookie-accept" id="cookieAccept" type="button">Accept</button>
        <button class="cookie-decline" id="cookieDecline" type="button">Decline</button>
      </div>
    `;
    document.body.prepend(banner);
    // Opened from "Cookie Settings": move focus into the banner and return it afterwards.
    if (trigger) {
      returnFocusTo = trigger;
      document.getElementById("cookieAccept").focus();
    }

    document.getElementById("cookieAccept").addEventListener("click", () => {
      localStorage.setItem(CONSENT_KEY, "accepted");
      if (!gpc) loadGA4();
      hideBanner();
    });
    document.getElementById("cookieDecline").addEventListener("click", () => {
      localStorage.setItem(CONSENT_KEY, "declined");
      hideBanner();
      if (wasAccepted) {
        clearAnalyticsCookies();
        window.location.reload();
      }
    });
  }

  // Deletes Google Analytics cookies (_ga, _ga_<ID>) for this host and its parent domain.
  function clearAnalyticsCookies() {
    const host = location.hostname;
    const domains = ["", host, "." + host, "." + host.split(".").slice(-2).join(".")];
    document.cookie.split(";").forEach((c) => {
      const name = c.split("=")[0].trim();
      if (!/^_ga(_|$)/.test(name)) return;
      domains.forEach((d) => {
        document.cookie = name + "=; Max-Age=0; path=/" + (d ? "; domain=" + d : "");
      });
    });
  }

  // A Global Privacy Control signal is always treated as declining analytics.
  const gpc = navigator.globalPrivacyControl === true;
  const consent = localStorage.getItem(CONSENT_KEY);
  if (gpc) {
    clearAnalyticsCookies();
  } else if (consent === "accepted") {
    loadGA4();
  } else if (consent !== "declined") {
    showBanner();
  }

  document.addEventListener("click", (e) => {
    const link = e.target.closest(".cookie-settings-link");
    if (link) {
      e.preventDefault();
      showBanner(link);
    }
  });
})();
