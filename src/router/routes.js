export const ROUTES = {
  HOME: "/",
  ABOUT_US: "/about-us",
  CONTACT: "/contact",
  CAREERS: "/careers",
  BLOG: "/blog",
  HELP_CENTER: "/help-center",
  PRIVACY_POLICY: "/privacy-policy",
  TERMS_CONDITIONS: "/terms-and-conditions",
  REFUND_POLICY: "/refund-policy",
};

const ROUTE_ALIASES = {
  "/about": ROUTES.ABOUT_US,
  "/aboutus": ROUTES.ABOUT_US,
  "/contact-us": ROUTES.CONTACT,
  "/career": ROUTES.CAREERS,
  "/jobs": ROUTES.CAREERS,
  "/blogs": ROUTES.BLOG,
  "/help": ROUTES.HELP_CENTER,
  "/faq": ROUTES.HELP_CENTER,
  "/support": ROUTES.HELP_CENTER,
  "/privacy": ROUTES.PRIVACY_POLICY,
  "/terms": ROUTES.TERMS_CONDITIONS,
  "/terms-conditions": ROUTES.TERMS_CONDITIONS,
  "/refund": ROUTES.REFUND_POLICY,
  "/refunds": ROUTES.REFUND_POLICY,
};

export const ROUTE_META = {
  [ROUTES.HOME]: {
    title: "Docdor — Your Complete Healthcare Ecosystem",
    label: "Home",
  },
  [ROUTES.ABOUT_US]: {
    title: "About Us | Docdor",
    label: "About Us",
  },
  [ROUTES.CONTACT]: {
    title: "Contact Us | Docdor",
    label: "Contact",
  },
  [ROUTES.CAREERS]: {
    title: "Careers | Docdor",
    label: "Careers",
  },
  [ROUTES.BLOG]: {
    title: "Health & Wellness Blog | Docdor",
    label: "Blog",
  },
  [ROUTES.HELP_CENTER]: {
    title: "Help Center | Docdor",
    label: "Help Center",
  },
  [ROUTES.PRIVACY_POLICY]: {
    title: "Privacy Policy | Docdor",
    label: "Privacy Policy",
  },
  [ROUTES.TERMS_CONDITIONS]: {
    title: "Terms & Conditions | Docdor",
    label: "Terms & Conditions",
  },
  [ROUTES.REFUND_POLICY]: {
    title: "Refund Policy | Docdor",
    label: "Refund Policy",
  },
};

export const normalizePathname = (rawPath = "/") => {
  const trimmed = rawPath.trim() || "/";
  const lower = trimmed.toLowerCase();
  const withoutTrailing = lower.length > 1 ? lower.replace(/\/+$/, "") : lower;
  if (withoutTrailing.startsWith("/blogs/")) {
    return `${ROUTES.BLOG}/${withoutTrailing.slice("/blogs/".length)}`;
  }
  return ROUTE_ALIASES[withoutTrailing] || withoutTrailing;
};

export const getBlogPostRoute = (slug) =>
  `${ROUTES.BLOG}/${encodeURIComponent(slug)}`;

export const matchBlogSlug = (rawPath = "/") => {
  const normalized = normalizePathname(rawPath);
  if (!normalized.startsWith(`${ROUTES.BLOG}/`)) return null;
  const rawSlug = normalized.slice(ROUTES.BLOG.length + 1);
  if (!rawSlug || rawSlug.includes("/")) return null;
  try {
    return decodeURIComponent(rawSlug);
  } catch {
    return rawSlug;
  }
};

export const COMPANY_LINKS = [
  { label: "About Us", to: ROUTES.ABOUT_US, description: "Our mission, story & medical board" },
  { label: "Contact", to: ROUTES.CONTACT, description: "24/7 support, clinics & partnerships" },
  { label: "Careers", to: ROUTES.CAREERS, description: "Open roles across clinical & tech teams" },
  { label: "Blog", to: ROUTES.BLOG, description: "Doctor-reviewed wellness & health guides" },
];

export const SUPPORT_LINKS = [
  { label: "Help Center", to: ROUTES.HELP_CENTER, description: "FAQs, booking & order assistance" },
  { label: "Privacy Policy", to: ROUTES.PRIVACY_POLICY, description: "How we protect your health data" },
  { label: "Terms & Conditions", to: ROUTES.TERMS_CONDITIONS, description: "Platform terms & clinical disclaimers" },
  { label: "Refund Policy", to: ROUTES.REFUND_POLICY, description: "Cancellations, timelines & eligibility" },
];
