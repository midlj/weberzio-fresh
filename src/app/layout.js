import "./globals.css";
import { manrope } from "./fonts";
import { site } from "@/data/site";
import Frame from "@/components/layout/Frame";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import CookieBanner from "@/components/landing/CookieBanner";

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "web development company Kerala",
    "mobile app development",
    "SaaS development",
    "Next.js development",
    "API and backend systems",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="bg-black font-body text-white antialiased">
        {/* Without JS the GSAP entrance never runs, so reveal the hero outright. */}
        <noscript>
          <style>{`[data-hero-line],[data-hero-copy],[data-hero-cta]{opacity:1 !important}`}</style>
        </noscript>

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
