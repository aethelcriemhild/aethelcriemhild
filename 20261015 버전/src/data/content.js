// Single source of truth for site copy and page data.
// Adding a collection or a dessert should only require editing this file (plus one small .html entry page).

export const SITE_URL = "https://www.aethelcriemhild.com";
export const CONTACT_EMAIL = "contact@criemhild.com";

// Web3Forms key already used by the current site's contact form (public by design).
export const WEB3FORMS_ACCESS_KEY = "4eecda8f-966f-4191-ba4e-af94a1bbd983";

export const NAV_LINKS = [
  { href: "/#philosophy", label: "Philosophy" },
  { href: "/virtue", label: "Virtue" },
  { href: "/origin", label: "Origin" },
  { href: "/tribute", label: "Tribute" },
  { href: "/wicked", label: "Wicked" },
  { href: "/contact", label: "Contact" },
];

// Old one-page anchors → their new homes (the server never sees "#…", so this runs in the browser).
export const LEGACY_ANCHORS = {
  "#ice-cream": "/#collections",
  "#equipment": "/contact?type=trade",
  "#wholesale": "/contact?type=trade",
  "#contact": "/contact",
};

// Pre-launch notices: the desserts are not on sale yet, and the collection photos are mood images.
export const PRELAUNCH_NOTE = "A new chapter is coming. Not yet available.";
export const IMAGERY_NOTE =
  "Collection imagery sets the mood of our brand. It does not represent final products or packaging.";
export const FOOTER_NOTE = "Brand preview · Products not yet available";

// Home · I — the philosophy essay.
export const PHILOSOPHY_ESSAY = [
  "Long before dessert was a category, the philosophers of ancient Greece asked what it means to live well. Aristotle called the answer <em>eudaimonia</em> — a life that flourishes — and found it not in excess or denial, but in the Golden Mean between them.",
  "Aethel Criemhild takes that idea to the table. We are a brand of desserts and indulgent treats, built on the belief that every pleasure deserves a purpose. That belief begins with a simple invitation: pause, consider, and enjoy.",
  "Our four collections give that invitation different forms. Virtue practices the art of measure. Origin respects the original character of a dessert. Tribute honors the traditional foods of many cultures through a new expression. Wicked makes room for vivid delight. Each offers its own perspective; together, they create a considered whole.",
  "There is no single mood for every table, and no single answer to what makes a moment worth savoring. Some moments invite restraint, others curiosity, remembrance, or pleasure. Our collections give those impulses a place beside one another, without asking one to stand for everything.",
  "This is philosophy as a way of looking at the everyday: a question, a choice, a small spoonful worth thinking about.",
];

// The four collections. `accent` is used sparingly — hero rule, arch ring, product-card borders.
export const COLLECTIONS = [
  {
    slug: "virtue",
    numeral: "I",
    name: "Virtue",
    line: "The art of measure.",
    subtitle: "The Art of Measure",
    accent: "#5F6B45",
    image: "/assets/chapter-virtue.webp",
    imageAlt: "Frozen Greek yogurt dessert with honey in a ceramic bowl",
    body: [
      "Virtue is the discipline of choosing well. Inspired by <em>sophrosyne</em> — the Greek ideal of self-command — this collection is built on balance: every element considered, nothing in excess. Its first expression, Frozen Tears of Socrates, is a frozen Greek yogurt dessert with a bright, tangy character.",
    ],
    products: [
      { name: "Frozen Tears of Socrates", detail: "Frozen Greek Yogurt Dessert", status: "Coming soon", href: "/frozen-tears-of-socrates" },
    ],
    meta: "Virtue, the first Aethel Criemhild collection — the art of measure, inspired by the Greek ideal of sophrosyne.",
  },
  {
    slug: "origin",
    numeral: "II",
    name: "Origin",
    line: "The original, kept whole.",
    subtitle: "The Original, Kept Whole",
    accent: "#1F2B40",
    image: "/assets/chapter-origin.webp",
    imageAlt: "A scoop of pale dessert on a dark, gold-flecked surface",
    body: [
      "Origin honors <em>arche</em> — the first principle, the form from which everything else follows. This collection respects the original character of a dessert. Its expression is Aethel Criemhild Dondurma, known for a dense, elastic texture.",
    ],
    products: [{ name: "Aethel Criemhild Dondurma", detail: "Milk", status: "Coming soon", href: "/dondurma" }],
    meta: "Origin, the second Aethel Criemhild collection — the original character of a dessert, kept whole.",
  },
  {
    slug: "tribute",
    numeral: "III",
    name: "Tribute",
    line: "Reverence for tradition.",
    subtitle: "Reverence, Served Cold",
    accent: "#6B2D37",
    image: "/assets/chapter-tribute.webp",
    imageAlt: "A dessert in a dark stone bowl beside cinnamon sticks",
    body: [
      "Tribute reimagines beloved traditional foods with respect for the recipes that came first. Our first tribute is Sujeonggwa, a traditional Korean beverage given a new dessert expression. More traditions are in development.",
    ],
    products: [{ name: "Sujeonggwa", status: "Coming soon" }],
    meta: "Tribute, the third Aethel Criemhild collection — beloved traditional foods reimagined with reverence.",
  },
  {
    slug: "wicked",
    numeral: "IV",
    name: "Wicked",
    line: "Pleasure, unapologetic.",
    subtitle: "Pleasure, Unapologetic",
    accent: "#D8452B",
    image: "/assets/chapter-wicked.webp",
    imageAlt: "Bright orange dessert scoops and limes on colored blocks",
    body: [
      "A life of virtue makes room for pleasure. Wicked is our case for pure delight: a collection with a vivid point of view. Balance is the whole; Wicked is the part that makes you smile.",
    ],
    products: [
      { name: "Yogurt", status: "Coming soon" },
      { name: "Jeju Green Tangerine", status: "Coming soon" },
      { name: "Jeju Hallabong", status: "Coming soon" },
    ],
    meta: "Wicked, the fourth Aethel Criemhild collection — pleasure, unapologetic.",
  },
];

export const collectionBySlug = (slug) => COLLECTIONS.find((c) => c.slug === slug);

// Individual dessert pages.
export const PRODUCTS = {
  "frozen-tears-of-socrates": {
    collection: "virtue",
    name: "Frozen Tears of Socrates",
    descriptor: "Frozen Greek Yogurt Dessert",
    status: "Coming soon",
    body: "Bright, tangy, and considered. Frozen Tears of Socrates brings the art of measure to a frozen Greek yogurt dessert.",
    image: "/assets/fts-pint.webp",
    imageAlt: "A pint of Frozen Tears of Socrates on marble",
    info: [
      ["Size", "16 fl oz (474 mL)"],
      ["Storage", "Keep frozen"],
    ],
    quote: "Don’t cry, Socrates. We brought dessert.",
    actions: [
      { href: "/virtue", label: "Explore Virtue" },
      { href: "/contact", label: "A question about this dessert?" },
    ],
  },
  dondurma: {
    collection: "origin",
    name: "Aethel Criemhild Dondurma",
    descriptor: "Milk",
    status: "Coming soon",
    body: "A dense, elastic texture, with a stretch that makes each spoonful distinctive. This is the first expression of our Origin collection.",
    actions: [
      { href: "/origin", label: "Explore Origin" },
      { href: "/contact", label: "Get in touch" },
    ],
  },
};

export const INQUIRY_TYPES = [
  { value: "general", label: "General" },
  { value: "trade", label: "Trade & Wholesale" },
  { value: "press", label: "Press" },
];

export const SOCIAL_LINKS = [
  { name: "X", href: "https://x.com/aethelcriemhild" },
  { name: "Instagram", href: "https://www.instagram.com/aethelcriemhild/" },
  { name: "YouTube", href: "https://www.youtube.com/@AethelCriemhild" },
  { name: "TikTok", href: "https://www.tiktok.com/@aethelcriemhild" },
];

export const FOOTER_COLUMNS = [
  {
    heading: "Collections",
    links: COLLECTIONS.map((c) => ({ href: `/${c.slug}`, label: c.name })),
  },
  {
    heading: "Explore",
    links: [
      { href: "/#philosophy", label: "Philosophy" },
      { href: "/frozen-tears-of-socrates", label: "Frozen Tears of Socrates" },
      { href: "/dondurma", label: "Aethel Criemhild Dondurma" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Use" },
      { href: "/accessibility", label: "Accessibility Statement" },
      { href: "#", label: "Cookie Settings", className: "cookie-settings-link" },
    ],
  },
];
