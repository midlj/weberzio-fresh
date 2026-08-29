/**
 * In-depth case studies with their own /work/[slug] pages, synced from the
 * live site. Separate from `projects`, which are the linked client builds
 * shown on the home page carousel.
 */
export const caseStudies = [
  {
    slug: "nova-saas-platform",
    name: "Nova — SaaS Platform",
    category: "web app / product engineering",
    client: "Nova Technologies",
    role: "Lead Engineer & Architect",
    year: "2025",
    stack: ["Next.js", "TypeScript", "Postgres"],
    description: [
      "Architected and built a multi-tenant SaaS platform from scratch. The platform serves hundreds of businesses with role-based access, real-time collaboration, and subscription billing.",
      "The engagement covered: product discovery, system design, full-stack development, CI/CD pipeline setup, and AWS infrastructure with auto-scaling.",
    ],
    results: [
      "Launched MVP in 10 weeks from kickoff",
      "Handles 500k+ API requests daily within budget",
      "99.9% uptime since launch with zero P1 incidents",
      "10-person engineering team onboarded onto the codebase in under 2 weeks",
    ],
  },
  {
    slug: "halcyon-fintech-api",
    name: "Halcyon — FinTech API",
    category: "backend / integrations",
    client: "Halcyon Financial",
    role: "Backend Engineer",
    year: "2025",
    stack: ["Node.js", "Stripe", "GraphQL"],
    description: [
      "Designed and built a financial data aggregation API that connects with multiple banking providers, Stripe, and accounting platforms. The API serves as the backbone for a fintech startup's dashboard and reporting features.",
      "Built with GraphQL for flexible querying, queued workers for reliable data sync, and comprehensive monitoring from day one.",
    ],
    results: [
      "Aggregates data from 15+ financial providers within seconds",
      "Sub-200ms p95 response times on complex GraphQL queries",
      "Zero data-loss incidents across 2M+ transactions processed",
      "Automated reconciliation runs nightly with alerting",
    ],
  },
  {
    slug: "prism-ecommerce-suite",
    name: "Prism — E-commerce Suite",
    category: "full stack / commerce",
    client: "Prism Retail",
    role: "Full-Stack Developer",
    year: "2024",
    stack: ["Shopify", "Headless", "React"],
    description: [
      "Built a headless e-commerce storefront on top of Shopify's Storefront API with a custom checkout experience optimized for conversion. The project included a product CMS, search with Algolia integration, and a loyalty rewards system.",
      "The migration from a legacy Shopify theme to the headless architecture was executed with zero downtime.",
    ],
    results: [
      "40% improvement in Lighthouse performance score",
      "22% increase in conversion rate post-launch",
      "Seamless migration with zero downtime over a holiday weekend",
      "Reduced page load time from 4.2s to 0.9s",
    ],
  },
];

export function getCaseStudy(slug) {
  return caseStudies.find((study) => study.slug === slug);
}
