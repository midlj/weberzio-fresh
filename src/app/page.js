import Hero from "@/components/landing/Hero";
import Stats from "@/components/landing/Stats";
import Adventure from "@/components/landing/Adventure";
import Services from "@/components/landing/Services";
import ChangingDev from "@/components/landing/ChangingDev";
import Work from "@/components/landing/Work";
import Testimonials from "@/components/landing/Testimonials";
import Faq from "@/components/landing/Faq";
import CTA from "@/components/landing/CTA";
import JsonLd from "@/components/seo/JsonLd";
import { faqs } from "@/data/faq";

/* Mirrors the visible FAQ section so answers can surface in rich results. */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function Home() {
  return (
    <>
      <JsonLd data={faqSchema} />
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
