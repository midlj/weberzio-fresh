/**
 * Site-wide copy for Weberzio. Components read from here so content edits
 * land in one place rather than being spread through the markup.
 */

export const site = {
  name: "Weberzio",
  tagline: "AI Native Software Development Company in Kerala",
  description:
    "Weberzio is an AI native software development company in Kerala building web and mobile apps for startups and enterprises — Flutter apps, MERN stack platforms, ecommerce websites and cloud infrastructure built to scale.",
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
  {
    value: "10+",
    label: "Products shipped",
    description:
      "Web apps, SaaS platforms, and internal tools delivered to production.",
  },
  {
    value: "1+",
    label: "Years engineering",
    description:
      "Full-stack experience across startups, scale-ups, and enterprise teams.",
  },
  {
    value: "99.9%",
    label: "Uptime targeted",
    description:
      "Cloud infrastructure designed, monitored, and hardened for reliability.",
  },
  {
    value: "24h",
    label: "Response time",
    description: "We reply to project inquiries within one business day.",
  },
];

/** Shared engagement model, repeated on every service detail page. */
export const process = [
  {
    step: "01",
    title: "Discovery",
    summary: "Understand the problem",
    detail:
      "We start by asking questions. Business goals, user needs, constraints. Nothing gets built until the shape of the problem is clear.",
  },
  {
    step: "02",
    title: "Scope",
    summary: "Plan the smallest useful thing",
    detail:
      "A written plan with milestones, deliverables, and explicit trade-offs. You always know what's coming next and why.",
  },
  {
    step: "03",
    title: "Build",
    summary: "Ship in short iterations",
    detail:
      "Working software every week, deployed to a staging URL. Feedback loops stay tight and course-corrections are cheap.",
  },
  {
    step: "04",
    title: "Launch",
    summary: "Roll out with confidence",
    detail:
      "Monitoring, docs, and handover if you need them. Go-lives are boring because everything was tested twice.",
  },
];
