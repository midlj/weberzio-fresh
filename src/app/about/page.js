import Link from "next/link";

import PageHeader from "@/components/landing/PageHeader";
import CTA from "@/components/landing/CTA";
import {
  aboutIntro,
  whoWeAre,
  aboutStats,
  principles,
  aboutProcess,
  toolStack,
  aboutCta,
} from "@/data/about";
import { services } from "@/data/services";

export const metadata = {
  title: "About Us — Web & Mobile App Development Agency in Kerala",
  description: aboutIntro.intro,
  alternates: { canonical: "/about" },
};

/** Uppercase section label used across the interior pages. */
function SectionLabel({ children }) {
  return (
    <p className="font-body text-[12px] uppercase tracking-[0.16em] text-neutral-400">
      {children}
    </p>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow={aboutIntro.eyebrow}
        title={aboutIntro.title}
        intro={aboutIntro.intro}
      />

      {/* Who we are + stats */}
      <section className="bg-white px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-20">
            <div>
              <SectionLabel>Who we are</SectionLabel>
              <div className="mt-6 space-y-6">
                {whoWeAre.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="font-body text-[15px] leading-relaxed text-neutral-600 sm:text-[17px]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-200 self-start">
              {aboutStats.map((stat) => (
                <div key={stat.label} className="bg-neutral-50 p-6">
                  <p className="text-[28px] font-semibold tracking-tight text-neutral-900">
                    {stat.value}
                  </p>
                  <p className="mt-1 font-body text-[12.5px] text-neutral-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="border-t border-neutral-100 bg-neutral-50 px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <SectionLabel>Principles</SectionLabel>
          <h2 className="mt-4 max-w-2xl text-[28px] font-semibold leading-tight tracking-tight text-neutral-900 sm:text-[36px]">
            How we think about the work.
          </h2>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {principles.map((principle) => (
              <div
                key={principle.number}
                className="rounded-2xl border border-neutral-200 bg-white p-7"
              >
                <p className="font-body text-[13px] font-semibold text-[#e23a2e]">
                  {principle.number}
                </p>
                <h3 className="mt-3 text-[18px] font-semibold text-neutral-900">
                  {principle.title}
                </h3>
                <p className="mt-3 font-body text-[14px] leading-relaxed text-neutral-500">
                  {principle.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <SectionLabel>Process</SectionLabel>
          <h2 className="mt-4 max-w-2xl text-[28px] font-semibold leading-tight tracking-tight text-neutral-900 sm:text-[36px]">
            From first call to production.
          </h2>

          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {aboutProcess.map((step, index) => (
              <div key={step.number} className="relative">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e23a2e]/30 bg-[#e23a2e]/10 font-body text-[13px] font-semibold text-[#c02a20]">
                    {step.number}
                  </span>
                  {index < aboutProcess.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="hidden h-px flex-1 bg-neutral-200 lg:block"
                    />
                  )}
                </div>
                <h3 className="mt-5 text-[17px] font-semibold text-neutral-900">
                  {step.title}
                </h3>
                <p className="mt-2.5 font-body text-[14px] leading-relaxed text-neutral-500">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="border-t border-neutral-100 bg-neutral-50 px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <SectionLabel>Stack</SectionLabel>
          <h2 className="mt-4 max-w-2xl text-[28px] font-semibold leading-tight tracking-tight text-neutral-900 sm:text-[36px]">
            The tools we reach for by default.
          </h2>

          <div className="mt-12 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
            {toolStack.map((row, index) => (
              <div
                key={row.area}
                className={`flex flex-col gap-1 px-7 py-5 sm:flex-row sm:items-center sm:gap-10 ${
                  index > 0 ? "border-t border-neutral-100" : ""
                }`}
              >
                <p className="w-28 shrink-0 font-body text-[13px] font-semibold uppercase tracking-[0.12em] text-[#c02a20]">
                  {row.area}
                </p>
                <p className="font-body text-[15px] text-neutral-600">
                  {row.tools}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services summary */}
      <section className="bg-white px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <SectionLabel>What we do</SectionLabel>
          <h2 className="mt-4 max-w-2xl text-[28px] font-semibold leading-tight tracking-tight text-neutral-900 sm:text-[36px]">
            Services we deliver end to end.
          </h2>

          <div className="mt-14 space-y-0 border-t border-neutral-200">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex flex-col gap-3 border-b border-neutral-200 py-7 transition-colors hover:bg-neutral-50 sm:flex-row sm:items-baseline sm:gap-10 sm:px-4"
              >
                <h3 className="w-full shrink-0 text-[17px] font-semibold text-neutral-900 transition-colors group-hover:text-[#c02a20] sm:w-80">
                  {service.title}
                </h3>
                <p className="font-body text-[14px] leading-relaxed text-neutral-500">
                  {service.summary}
                </p>
              </Link>
            ))}
          </div>

          {/* Inline CTA band */}
          <div className="mt-20 rounded-2xl border border-neutral-200 bg-neutral-50 p-8 sm:flex sm:items-center sm:justify-between sm:p-10">
            <div>
              <h3 className="text-[22px] font-semibold tracking-tight text-neutral-900">
                {aboutCta.title}
              </h3>
              <p className="mt-2 max-w-xl font-body text-[14.5px] leading-relaxed text-neutral-500">
                {aboutCta.body}
              </p>
            </div>
            <Link
              href="/contact"
              className="mt-6 inline-flex shrink-0 items-center gap-2.5 rounded-full bg-neutral-900 px-6 py-3.5 font-display text-[14px] font-semibold text-white transition-colors hover:bg-neutral-700 sm:mt-0"
            >
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-hr-red" />
              {aboutCta.label}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
