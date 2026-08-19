import Frame from "@/components/layout/Frame";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Adventure from "@/components/landing/Adventure";
import ChangingDev from "@/components/landing/ChangingDev";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import CookieBanner from "@/components/landing/CookieBanner";

export default function Home() {
  return (
    <Frame>
      <div id="top" className="relative">
        <Header />
        <main>
          <Hero />
          <Adventure />
          <ChangingDev />
          <CTA />
        </main>
        <Footer />
      </div>
      <CookieBanner />
    </Frame>
  );
}
