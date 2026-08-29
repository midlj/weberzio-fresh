import "./globals.css";
import { manrope } from "./fonts";
import { site, contact } from "@/data/site";
import Frame from "@/components/layout/Frame";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import CookieBanner from "@/components/landing/CookieBanner";
import JsonLd, { ORG_ID } from "@/components/seo/JsonLd";

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "AI native software development",
    "software development company Kerala",
    "web development company Kerala",
    "mobile app development Kerala",
    "Flutter app development",
    "SaaS development",
    "Next.js development",
    "ecommerce website development Kerala",
    "API and backend systems",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: ["/og.png"],
  },
};

/** Sitewide entity graph: who Weberzio is, once, referenced from every page. */
const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: site.name,
      url: site.url,
      logo: `${site.url}/star.png`,
      description: site.description,
      email: contact.email,
      telephone: contact.phone,
      address: {
        "@type": "PostalAddress",
        addressRegion: "Kerala",
        addressCountry: "IN",
      },
      areaServed: ["IN", "Worldwide"],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: contact.email,
        telephone: contact.phone,
        availableLanguage: ["English"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      name: site.name,
      url: site.url,
      publisher: { "@id": ORG_ID },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="bg-black font-body text-white antialiased">
        <JsonLd data={organizationSchema} />

        {/* Without JS the GSAP entrance never runs, so reveal the hero outright. */}
        <noscript>
          <style>{`[data-hero-line],[data-hero-copy],[data-hero-cta]{opacity:1 !important}`}</style>
        </noscript>

        <SmoothScroll />
        <Frame>
          <div id="top" className="relative">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
          <CookieBanner />
        </Frame>
      </body>
    </html>
  );
}
