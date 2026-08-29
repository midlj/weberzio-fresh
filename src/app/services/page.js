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
        title="Software development services in Kerala."
        intro="Web applications, SaaS platforms, APIs, cloud infrastructure, and the technical guidance to keep it all moving forward."
      />

      <section className="bg-neutral-100 px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 max-w-2xl">
            <p className="font-body text-[12px] uppercase tracking-[0.16em] text-neutral-400">
              What we do
            </p>
            <h2 className="mt-4 text-[28px] font-semibold leading-tight tracking-tight text-neutral-900 sm:text-[36px]">
              End-to-end engineering, done well.
            </h2>
            <p className="mt-4 font-body text-[15px] leading-relaxed text-neutral-500">
              We work with founders, product teams, and enterprises across the
              web stack. Every engagement is scoped to the outcome, not the
              hours.
            </p>
          </div>
          <ServiceCards />
        </div>
      </section>

      <Process />
      <CTA />
    </>
  );
}
