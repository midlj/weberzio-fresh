import PageHeader from "@/components/landing/PageHeader";
import { ServiceCards } from "@/components/landing/Services";
import Process from "@/components/landing/Process";
import CTA from "@/components/landing/CTA";

export const metadata = {
  title: "Web & Mobile App Development Services",
  description:
    "Web applications, SaaS platforms, APIs, cloud infrastructure, and the technical guidance to keep it all moving forward.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="End-to-end engineering, done well"
        intro="Web applications, SaaS platforms, APIs, cloud infrastructure, and the technical guidance to keep it all moving forward. Engagements are scoped to the outcome, not the hours."
      />

      <section className="bg-neutral-100 px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <ServiceCards />
        </div>
      </section>

      <Process />
      <CTA />
    </>
  );
}
