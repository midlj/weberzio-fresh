/**
 * Outlined glyphs for the service cards, keyed by service slug.
 *
 * All are drawn on a 24×24 grid with a 1.6 stroke so they sit at the same
 * optical weight inside the dark icon tile.
 */
const paths = {
  "web-application-development": (
    <>
      <rect x="2.5" y="4" width="19" height="15" rx="2.5" />
      <path d="M2.5 8.5h19" />
      <circle cx="5.8" cy="6.25" r=".55" fill="currentColor" stroke="none" />
      <circle cx="7.9" cy="6.25" r=".55" fill="currentColor" stroke="none" />
      <path d="m10.5 12 -2 2 2 2M13.5 12l2 2-2 2" />
    </>
  ),
  "saas-product-engineering": (
    <>
      <rect x="3" y="2.5" width="12" height="19" rx="2.5" />
      <path d="M9 18.5h.01" />
      <path d="M17.5 7.5h2a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1-1.5 1.5h-2" />
    </>
  ),
  "api-backend-systems": (
    <>
      <ellipse cx="12" cy="5.5" rx="7.5" ry="3" />
      <path d="M4.5 5.5v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-6" />
      <path d="M4.5 11.5v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-6" />
    </>
  ),
  "cloud-infrastructure-devops": (
    <>
      <path d="M6.5 18.5a4 4 0 0 1-.6-7.95 5.5 5.5 0 0 1 10.72-1.3A3.75 3.75 0 0 1 18 18.5Z" />
      <path d="M12 12.5v4.5M10 15l2-2 2 2" />
    </>
  ),
  "ecommerce-solutions": (
    <>
      <path d="M2.5 3.5h2.2l2 11.2a1.6 1.6 0 0 0 1.6 1.3h8.1a1.6 1.6 0 0 0 1.6-1.25l1.5-6.75H6" />
      <circle cx="9" cy="20" r="1.3" />
      <circle cx="17" cy="20" r="1.3" />
    </>
  ),
  "technical-consulting": (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M8.5 12.5h7M8.5 9h7M8.5 16h4" />
    </>
  ),
};

export default function ServiceIcon({ slug, className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[slug] ?? paths["technical-consulting"]}
    </svg>
  );
}
