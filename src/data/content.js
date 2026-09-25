// Single source of truth for site copy and catalog data.
// Adding a product line, equipment slot or order option should only require editing this file.

export const CONTACT_EMAIL = "contact@criemhild.com";

// Web3Forms key already used by the current site's contact form (public by design).
export const WEB3FORMS_ACCESS_KEY = "4eecda8f-966f-4191-ba4e-af94a1bbd983";

export const NAV_LINKS = [
  { href: "/#philosophy", label: "Philosophy" },
  { href: "/#ice-cream", label: "Ice Cream" },
  { href: "/#equipment", label: "F&B Equipment" },
  { href: "/#wholesale", label: "Wholesale" },
];

export const PRINCIPLES = [
  {
    title: "Guilt-free foundations",
    body: "Low-sugar bases, alternative sweeteners and dietary fibre — restraint built in, never bolted on.",
  },
  {
    title: "Extraordinary flavor",
    body: "A rational choice is never a compromise of taste. Texture, depth and finish come first.",
  },
  {
    title: "Considered sourcing",
    body: "Local ingredients and time-honored recipes, chosen with the patience of a philosopher.",
  },
];

export const CHAPTERS = [
  {
    numeral: "I",
    name: "Virtue",
    tagline: "Healthy, functional bases",
    description: "The discipline of health — philosophy you can spoon, without compromise of taste.",
    image: "/assets/chapter-virtue.jpg",
    imageAlt: "Greek yogurt ice cream with honey in a ceramic bowl",
    featured: { name: "Frozen Tears of Socrates", detail: "Frozen Greek Yogurt Ice Cream", status: "Coming soon" },
  },
  {
    numeral: "II",
    name: "Origin",
    tagline: "The inception of frozen treats",
    description:
      "An archaeological journey to the dawn of ice cream — ancient methods and a timeless taste that anchor us to our ancestors.",
    image: "/assets/chapter-origin.jpg",
    imageAlt: "Origin chapter dessert",
    featured: { name: "Aethel Criemhild", detail: "Original Ice Cream", status: "Coming soon" },
  },
  {
    numeral: "III",
    name: "Tribute",
    tagline: "Homage to tradition",
    description: "Reverence for time-tested recipes — a homage to the culinary heritages that shaped them.",
    image: "/assets/chapter-tribute.jpg",
    imageAlt: "Tribute chapter dessert",
    featured: { name: "Tribute to Horchata", detail: "Horchata Flavored Ice Cream", status: "Coming soon" },
  },
  {
    numeral: "IV",
    name: "Wicked",
    tagline: "Indulgent, bold profiles",
    description: "The spark of hedonism — unapologetic indulgence that honors the Golden Mean.",
    image: "/assets/chapter-wicked.png",
    imageAlt: "Orange sorbet scoops and limes on colored blocks",
    featured: {
      name: "Wicked Sherbet · Wicked Sorbet",
      detail: "Ice Yogurt · Hallabong · Green Tangerine",
      status: "Coming soon",
    },
  },
];

export const SNOWMAN = {
  code: "AC-EQ-01",
  model: "SM-300",
  tags: ["Turn-key", "Zero-prep"],
  status: "Coming soon",
  title: "Snowman Ice Shaver",
  titleEm: "& Capsule System",
  description:
    "A complete shaved-ice program in one box. No recipes, no prep, no specialist staff — load a capsule, shave and serve the same result from the first cup of the day to the last.",
  steps: ["Load", "Shave", "Serve"],
  specs: [
    ["Model", "SM-300"],
    ["Dimensions", "300 × 400 × 600 mm"],
    ["Weight", "approx. 16 kg"],
    ["Power", "110 V/60 Hz · 110 V/50 Hz · 220 V"],
    ["Build", "ABS · Stainless steel"],
    ["Drive", "Belt-driven"],
  ],
  inTheBox: "Main unit, cartridge shaving cup, ice holding plate, rotating plate tray",
};

// Capsule flavors shown on the refill card. Set `image` to a finished-bingsu photo when available.
export const CAPSULE_FLAVORS = [
  { id: "milk", label: "Milk", name: "Milk Bingsu", color: "#EFE8DA", edge: "#CFC6B6", bg: "#F1ECE2", image: "" },
  { id: "mango", label: "Mango", name: "Mango Bingsu", color: "#F0B43C", edge: "#D99A22", bg: "#F7E7C4", image: "" },
];

// Future equipment slots — replace a placeholder with a real product when it launches.
export const EQUIPMENT_PLACEHOLDERS = [
  { code: "AC-EQ-02", title: "Next innovation" },
  { code: "AC-EQ-03", title: "Culinary equipment" },
];

export const ACCOUNT_TYPES = [
  { id: "franchise", title: "Franchise", description: "Single or multi-site franchise operators." },
  { id: "distributor", title: "Distributor", description: "Regional and cross-border distribution partners." },
  { id: "cafe", title: "Independent Cafe", description: "Independent cafés, dessert shops and restaurants." },
];

// Products are still "Coming soon" — flip to true to start accepting orders through the portal.
export const ORDERS_OPEN = false;

export const ICE_CREAM_MOQ = 100;

// Order portal categories. A category either takes a quantity directly (`unit`)
// or lists options that each take a quantity. `start` is the quantity filled in on check;
// `min` enables the minimum-order warning and blocks submission below it.
export const ORDER_CATEGORIES = [
  {
    id: "icecream",
    code: "IC-W",
    title: "The Ice Cream Collection",
    description: `Select flavors · Minimum order quantity: ${ICE_CREAM_MOQ}`,
    options: [
      { id: "socrates", label: "Frozen Tears of Socrates", detail: "Frozen Greek Yogurt Ice Cream" },
      { id: "aethel", label: "Aethel Criemhild", detail: "Original Ice Cream" },
      { id: "horchata", label: "Tribute to Horchata", detail: "Horchata Flavored Ice Cream" },
      { id: "sherbet", label: "Wicked Sherbet — Ice Yogurt" },
      { id: "hallabong", label: "Wicked Sorbet — Hallabong" },
      { id: "greentang", label: "Wicked Sorbet — Green Tangerine" },
    ].map((o) => ({ ...o, unit: "pcs", start: ICE_CREAM_MOQ, min: ICE_CREAM_MOQ })),
  },
  { id: "shaver", code: "EQ-01", title: "Snowman Ice Shaver System", description: "Complete machine", unit: "units" },
  {
    id: "parts",
    code: "EQ-01·P",
    title: "Snowman Ice Shaver Parts",
    description: "Select the parts you need",
    options: [
      { id: "cup", label: "Cartridge shaving cup", unit: "pcs" },
      { id: "plate", label: "Ice holding plate", unit: "pcs" },
      { id: "tray", label: "Rotating plate tray", unit: "pcs" },
    ],
  },
  {
    id: "refills",
    code: "EQ-01·R",
    title: "Snowman Ice Shaver Capsule Refill",
    description: "Select flavors",
    options: [
      { id: "milk", label: "Milk", unit: "boxes" },
      { id: "mango", label: "Mango", unit: "boxes" },
    ],
  },
];

export const SOCIAL_LINKS = [
  { name: "X", href: "https://x.com/aethelcriemhild" },
  { name: "Instagram", href: "https://www.instagram.com/aethelcriemhild/" },
  { name: "YouTube", href: "https://www.youtube.com/@AethelCriemhild" },
  { name: "TikTok", href: "https://www.tiktok.com/@aethelcriemhild" },
];

export const FOOTER_COLUMNS = [
  { heading: "Explore", links: NAV_LINKS },
  {
    heading: "Legal",
    links: [
      { href: "/privacy.html", label: "Privacy Policy" },
      { href: "/terms.html", label: "Terms of Use" },
      { href: "/accessibility.html", label: "Accessibility Statement" },
      { href: "#", label: "Cookie Settings", className: "cookie-settings-link" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/nutrition-guide.html", label: "Nutrition Guide" },
      { href: "/#contact", label: "Contact Us" },
    ],
  },
];
