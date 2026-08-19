import Hero from "@/components/landing/Hero";
import Stats from "@/components/landing/Stats";
import Adventure from "@/components/landing/Adventure";
import Services from "@/components/landing/Services";
import ChangingDev from "@/components/landing/ChangingDev";
import Work from "@/components/landing/Work";
import Testimonials from "@/components/landing/Testimonials";
import Faq from "@/components/landing/Faq";
import CTA from "@/components/landing/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Adventure />
      <Services />
      <ChangingDev />
      <Work />
      <Testimonials />
      <Faq />
      <CTA />
    </>
  );
}
