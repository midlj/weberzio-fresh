/** Journal posts, synced from the live site. Newest first. */
export const posts = [
  {
    slug: "building-fast-nextjs-sites",
    title: "Building fast Next.js sites without losing the plot",
    excerpt:
      "How we approach performance budgets, image strategy, and edge rendering to ship marketing sites that load in under a second — even on shaky mobile networks.",
    category: "Engineering",
    date: "2026-07-15",
    dateLabel: "July 15, 2026",
    author: "Midlaj",
    readTime: "6 min read",
    featured: true,
    sections: [
      {
        heading: "Start with a budget, not a framework",
        paragraphs: [
          "Before writing a single line of code, we set a performance budget: a target Largest Contentful Paint under 1.2 seconds on a mid-range Android over a throttled 4G connection. Every decision after that — fonts, images, third-party scripts — gets measured against the budget, not against what feels reasonable in isolation.",
          "Frameworks are tools, not answers. Next.js gives you the primitives (streaming, partial prerendering, the Image component) but it will happily let you ship a 3MB bundle if you don't watch it.",
        ],
      },
      {
        heading: "The image strategy that actually moves the needle",
        paragraphs: [
          "Nine times out of ten, images are the largest thing on the page. We convert everything to AVIF with a WebP fallback, generate three or four sizes, and let the browser pick. The Next.js Image component handles the plumbing, but only if you give it accurate width and height — otherwise you'll pay for layout shift.",
          "For hero images that need to appear immediately, we mark them priority and inline a low-quality placeholder. For everything below the fold, native lazy loading is enough.",
        ],
      },
      {
        heading: "Third-party scripts are the silent killer",
        paragraphs: [
          "Analytics, chat widgets, tag managers — each one looks harmless in isolation. Together they turn a fast site into a slow one. We load them with the afterInteractive strategy, defer anything non-critical, and periodically audit what's actually earning its place on the page.",
        ],
      },
      {
        heading: "Measure in production, not in Lighthouse",
        paragraphs: [
          "Lighthouse scores are a starting point. Real users have older phones, worse networks, and browser extensions that Lighthouse doesn't simulate. We wire up real-user monitoring on day one so we can see what actual visitors experience, and we treat regressions like bugs.",
        ],
      },
    ],
  },
  {
    slug: "design-systems-that-scale",
    title: "Design systems that scale with the team, not against it",
    excerpt:
      "A pragmatic look at when a design system pays for itself, what to leave out, and how to keep tokens, components, and documentation from drifting apart.",
    category: "Design",
    date: "2026-06-28",
    dateLabel: "June 28, 2026",
    author: "Anagh",
    readTime: "8 min read",
    featured: false,
    sections: [
      {
        heading: "You probably don't need a design system yet",
        paragraphs: [
          "Most teams reach for a design system too early. If you have two designers and a handful of screens, a shared Figma library and a well-organized component folder will get you further than a full-blown system with tokens, docs, and a Storybook deployment.",
          "The right moment is when the cost of inconsistency starts to outweigh the cost of maintenance. That's usually when you have more than one product surface, more than three designers, or a growing engineering team that's shipping UI in parallel.",
        ],
      },
      {
        heading: "Tokens first, components second",
        paragraphs: [
          "The most durable part of a design system is the token layer: color, spacing, radius, typography, motion. Get these right and the components that consume them can change without breaking anything downstream.",
          "We keep tokens in a single source of truth — usually a JSON file — and generate CSS custom properties, Tailwind config, and Figma variables from it. When a designer changes a token, the update flows everywhere at once.",
        ],
      },
      {
        heading: "Ship fewer components, better",
        paragraphs: [
          "Every component you add is a component you have to maintain, document, and evolve. We start with the ten or fifteen primitives that appear on nearly every screen — button, input, card, modal, table — and resist adding more until there's clear demand from at least two product areas.",
        ],
      },
      {
        heading: "Documentation is a product",
        paragraphs: [
          "The best design system in the world is useless if no one knows how to use it. We treat documentation like a product: usage examples, do-and-don't guidance, accessibility notes, and code snippets that can be copied without editing. When docs and components drift apart, adoption stalls.",
        ],
      },
    ],
  },
  {
    slug: "shipping-saas-mvp-in-six-weeks",
    title: "Shipping a SaaS MVP in six weeks — what to cut",
    excerpt:
      "Behind the scenes of a recent engagement where we took a founder from idea to paying customers in six weeks. The trade-offs, the sharp edges, and the parts we would do again.",
    category: "Case Study",
    date: "2026-06-10",
    dateLabel: "June 10, 2026",
    author: "Weberzio Team",
    readTime: "5 min read",
    featured: false,
    sections: [
      {
        heading: "The brief",
        paragraphs: [
          "A solo founder came to us with a validated idea in the SMB accounting space, six weeks of runway, and a small list of prospects already asking to pay. The goal wasn't a polished product — it was to prove the core workflow, take money, and learn.",
        ],
      },
      {
        heading: "What we cut",
        paragraphs: [
          "No custom design system. We used a well-maintained component library and themed it in a day. No microservices — a single Next.js app with a Postgres database. No CI/CD pipeline beyond preview deployments. No feature flags, no A/B testing, no analytics dashboards. Just the shortest path to a working product.",
          "The hardest cuts were the ones that felt like fundamentals. Onboarding was a single email with a magic link. Billing was a Stripe Checkout redirect, not an in-app flow. Admin tools were direct database queries. Each of these would need to be rebuilt for scale, and that was fine.",
        ],
      },
      {
        heading: "What we kept",
        paragraphs: [
          "Testing on the core financial calculations — because getting money math wrong once destroys trust forever. Proper database migrations from day one. Structured logging, so we could debug production issues without shipping a new build. And a clear separation between the core domain logic and the framework, so the parts that mattered could survive a rewrite.",
        ],
      },
      {
        heading: "What we would do again",
        paragraphs: [
          "Weekly demos with the founder's three warmest prospects. Their feedback shaped the roadmap more than any user research could have, and it turned prospects into champions before launch. The product shipped on week six, took its first payment on week seven, and the founder raised a seed round three months later on the strength of the traction.",
        ],
      },
    ],
  },
];

export function getPost(slug) {
  return posts.find((post) => post.slug === slug);
}
