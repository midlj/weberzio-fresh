import "./globals.css";
import { manrope } from "./fonts";

export const metadata = {
  title: "HackerRank — The future of development is human + AI",
  description:
    "We help you map the skills you need, track the skills you have, and close your gaps to thrive in a GenAI world.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="bg-black font-body text-white antialiased">
        {/* Without JS the GSAP entrance never runs, so reveal the hero outright. */}
        <noscript>
          <style>{`[data-hero-line],[data-hero-copy],[data-hero-cta]{opacity:1 !important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
