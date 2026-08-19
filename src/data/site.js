/**
 * Site-wide copy for Weberzio. Components read from here so content edits
 * land in one place rather than being spread through the markup.
 */

export const site = {
  name: "Weberzio",
  tagline: "Web & Mobile Apps that scale with your business",
  description:
    "Premium web and mobile app development team and best website development company in Kerala, helping startups and enterprises ship reliable products.",
  url: "https://www.weberzio.in",
};

export const contact = {
  phone: "+91 8281 571 805",
  phoneHref: "tel:+918281571805",
  email: "support@weberzio.in",
  emailHref: "mailto:support@weberzio.in",
  whatsapp: "https://wa.me/918281571805",
  address: "Remote — distributed team operating worldwide",
  responseTime: "~24 hours",
};

export const companyFacts = [
  { label: "HQ", value: "Remote / Distributed" },
  { label: "Focus", value: "Web & Software" },
  { label: "Founded", value: "2025" },
  { label: "Availability", value: "24/7" },
];

export const stats = [
  { value: "10+", label: "Products shipped" },
  { value: "1+", label: "Years engineering" },
  { value: "99.9%", label: "Uptime targeted" },
  { value: "24h", label: "Response time" },
];

/** Shared engagement model, repeated on every service detail page. */
export const process = [
  {
    step: "01",
    title: "Discovery",
    summary: "Understand the problem",
    detail:
      "We ask questions until the business goal is clear, not just the feature list.",
  },
  {
    step: "02",
    title: "Scope",
    summary: "Plan the smallest useful thing",
    detail:
      "An explicit written plan with milestones and trade-offs before any code is written.",
  },
  {
    step: "03",
    title: "Build",
    summary: "Ship in short iterations",
    detail:
      "Working software deployed to a staging URL every week, so progress is visible.",
  },
  {
    step: "04",
    title: "Launch",
    summary: "Roll out with confidence",
    detail:
      "Monitoring, documentation and handover support so your team owns what we built.",
  },
];
