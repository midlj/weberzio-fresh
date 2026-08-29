/**
 * Renders a JSON-LD structured-data block. Server component — the payload is
 * serialized once at build time. `<` is escaped so user-authored strings can
 * never break out of the script tag.
 */
export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/** Shared @id for the Organization node so every schema can reference it. */
export const ORG_ID = "https://www.weberzio.in/#organization";

/** BreadcrumbList for a detail page: Home > section > current. */
export function breadcrumbs(siteUrl, trail) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map(([name, path], index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      // The last crumb is the current page and carries no link.
      ...(path ? { item: `${siteUrl}${path}` } : {}),
    })),
  };
}
