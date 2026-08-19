/** The six service offerings. `slug` drives the /services/[slug] routes. */
export const services = [
  {
    slug: "web-application-development",
    number: "01",
    title: "Web Application Development",
    tagline:
      "High-performance, scalable web platforms built with Next.js, React, and the MERN stack.",
    summary:
      "Production-grade applications using Next.js, React, and Astro alongside robust MERN stack foundations, focused on clean architecture, seamless UX, and exceptional Core Web Vitals.",
    body: "Weberzio is Kerala's premier web and mobile app development team, designing production-grade applications with clean architecture, seamless UX, and exceptional Core Web Vitals.",
    stack: ["Next.js", "React", "MERN Stack", "Astro", "TypeScript"],
    included: [
      "Server-rendered Next.js and Astro applications optimized for technical SEO and measurable performance",
      "Scalable frontend architectures utilizing React component systems and end-to-end type safety",
      "Robust MERN (MongoDB, Express, React, Node.js) stack implementations for enterprise scalability",
      "Automated testing, continuous integration, and seamless CI/CD-driven deployment pipelines",
    ],
  },
  {
    slug: "saas-product-engineering",
    number: "02",
    title: "SaaS & Digital Product Engineering",
    tagline: "Transforming concepts into resilient web and mobile platforms.",
    summary:
      "We partner with startups and enterprises to architect complete SaaS ecosystems, including React dashboards and Flutter mobile experiences.",
    body: "We partner with startups and enterprises to build complete SaaS ecosystems — React dashboards, Flutter mobile apps, and secure multi-tenant platforms.",
    stack: ["Flutter", "Node.js", "React", "PostgreSQL", "Stripe"],
    included: [
      "Architecturally sound multi-tenant systems with role-based access control",
      "Cross-platform mobile applications using Flutter for iOS and Android",
      "Complex subscription billing with tiered metering and payment integrations",
      "Product analytics dashboards with feature flagging and admin tooling",
    ],
  },
  {
    slug: "api-backend-systems",
    number: "03",
    title: "API & Backend Systems",
    tagline:
      "Secure, observable, and highly available architectures powered by Node.js.",
    summary:
      "Secure REST and GraphQL APIs, event-driven microservices, and reliable background processing built for high-throughput environments.",
    body: "We engineer the backbone of your digital infrastructure. Specializing in Node.js and scalable database technologies, our team builds secure REST and GraphQL APIs, event-driven microservices, and reliable background processing systems designed for high-throughput environments.",
    stack: ["Node.js", "REST APIs", "GraphQL", "Microservices", "Redis"],
    included: [
      "Strictly typed, comprehensively documented REST and GraphQL API contracts",
      "Fault-tolerant background workers, message queues, and resilient event-driven pipelines",
      "Seamless third-party system integrations ensuring idempotency and automated retry mechanisms",
      "Production-ready observability with structured logging, distributed tracing, and real-time metrics",
    ],
  },
  {
    slug: "cloud-infrastructure-devops",
    number: "04",
    title: "Cloud Infrastructure & DevOps",
    tagline:
      "Reliable deployments, automated pipelines, and optimized cloud orchestration.",
    summary:
      "DevOps workflows, containerized environments, and Infrastructure as Code solutions on AWS and Vercel.",
    body: "Weberzio ensures your applications are highly available and effortlessly scalable. We design robust DevOps workflows, containerized environments, and Infrastructure as Code (IaC) solutions on AWS and Vercel, enabling engineering teams to ship confidently without downtime.",
    stack: ["DevOps", "AWS", "Vercel", "CI/CD", "Terraform"],
    included: [
      "Immutable Infrastructure as Code provisioning via Terraform and modern cloud SDKs",
      "Advanced CI/CD pipelines featuring automated testing and ephemeral preview environments",
      "Comprehensive observability stacks encompassing alerts, metric dashboards, and log aggregation",
      "Strategic cloud cost optimization, architecture reviews, and capacity rightsizing recommendations",
    ],
  },
  {
    slug: "ecommerce-solutions",
    number: "05",
    title: "High-Conversion E-commerce Solutions",
    tagline:
      "Headless storefronts and custom commerce platforms built for speed and scale.",
    summary:
      "Blazing-fast, SEO-optimized e-commerce experiences with seamless checkout flows that drive revenue.",
    body: "We build sophisticated digital storefronts that drive revenue, using Next.js, React, and headless commerce architecture for blazing-fast, SEO-optimized experiences.",
    stack: ["Next.js", "React", "Shopify", "Stripe", "Headless CMS"],
    included: [
      "Performant headless storefronts with Shopify and custom backend integration",
      "Conversion-optimized checkout with secure payment gateways",
      "Real-time synchronization for inventory and order management",
      "Content-driven merchandising via CMS and static site generation",
    ],
  },
  {
    slug: "technical-consulting",
    number: "06",
    title: "Technical Consulting & Strategy",
    tagline:
      "Senior engineering perspectives for architecture, scaling, and technology strategy.",
    summary:
      "Architecture audits, tech-stack evaluations, and Fractional CTO services from an expert engineering studio.",
    body: "An expert engineering studio based in India, offering high-level technical oversight across architecture review, tech strategy, code audits, and Fractional CTO engagements.",
    stack: [
      "Architecture Review",
      "Tech Strategy",
      "Code Audit",
      "Fractional CTO",
    ],
    included: [
      "Comprehensive codebase audits, security reviews, and actionable architectural modernization reports",
      "Strategic technology selection, risk assessment, and detailed legacy migration planning",
      "Cross-platform mobile strategy evaluating Flutter and progressive web app (PWA) architectures",
      "Fractional CTO advisory for early-stage ventures and scalable engineering team structures",
    ],
  },
];

export function getService(slug) {
  return services.find((service) => service.slug === slug);
}
