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

/** Splits "10+" / "98%" so the suffix can carry the brand red. */
function StatValue({ value }) {
  const match = value.match(/^([\d.]+)(.*)$/);
  if (!match) return value;
  return (
    <>
      {match[1]}
      {match[2] && <span className="text-hr-red">{match[2]}</span>}
    </>
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
          <div className="grid gap-12 lg:grid-cols-[1fr_340px] lg:gap-20">
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

            {/* Dark stat panel — echoes the site's black frame on the white page. */}
            <div className="relative grid grid-cols-2 self-center overflow-hidden rounded-[26px] bg-neutral-900">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-hr-red/25 blur-[80px]"
              />
              {aboutStats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`relative p-7 ${index % 2 === 1 ? "border-l border-white/10" : ""} ${
                    index > 1 ? "border-t border-white/10" : ""
                  }`}
                >
                  <p className="font-display text-[34px] font-semibold tracking-tight text-white">
                    <StatValue value={stat.value} />
                  </p>
                  <p className="mt-1 font-body text-[12.5px] text-white/50">
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
                className="group relative overflow-hidden rounded-[26px] bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_14px_36px_-14px_rgba(0,0,0,0.13)] transition-shadow duration-300 hover:shadow-[0_1px_2px_rgba(0,0,0,0.05),0_26px_56px_-18px_rgba(0,0,0,0.24)]"
              >
                {/* Brand hairline sweeps across the top edge on hover. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-hr-red to-[#ff8a3d] transition-transform duration-500 group-hover:scale-x-100"
                />

                {/* Ghost index bleeding off the top-right corner. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-5 right-6 font-display text-[96px] font-bold leading-none tracking-tight text-neutral-900/[0.05] transition-colors duration-300 group-hover:text-hr-red/[0.09]"
                >
                  {principle.number}
                </span>

                <h3 className="relative mt-6 pr-14 text-[18px] font-semibold text-neutral-900">
                  {principle.title}
                </h3>
                <p className="relative mt-3 font-body text-[14px] leading-relaxed text-neutral-500">
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
                  {/* Dark squircle badge, same family as the service icon tiles. */}
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-900 font-body text-[13px] font-semibold text-white">
                    {step.number}
                  </span>
                  {index < aboutProcess.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="hidden h-px flex-1 bg-gradient-to-r from-neutral-300 to-neutral-100 lg:block"
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

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {toolStack.map((row) => (
              <div
                key={row.area}
                className="rounded-[26px] bg-white p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_14px_36px_-14px_rgba(0,0,0,0.13)]"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 rounded-full bg-hr-red"
                  />
                  <p className="font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-neutral-900">
                    {row.area}
                  </p>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {row.tools.split(", ").map((tool) => (
                    <li
                      key={tool}
                      className="rounded-full border border-neutral-200 px-3 py-1 font-body text-[13px] text-neutral-600"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
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
                <span
                  aria-hidden="true"
                  className="hidden self-center text-hr-red opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:block"
                >
                  →
                </span>
              </Link>
            ))}
          </div>

          {/* Inline CTA band — dark, mirrors the hero's CTA styling. */}
          <div className="relative mt-20 overflow-hidden rounded-[26px] bg-neutral-900 p-8 sm:flex sm:items-center sm:justify-between sm:gap-10 sm:p-10">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -left-20 -top-24 h-56 w-72 rounded-full bg-hr-red/20 blur-[90px]"
            />
            <div className="relative">
              <h3 className="text-[22px] font-semibold tracking-tight text-white">
                {aboutCta.title}
              </h3>
              <p className="mt-2 max-w-xl font-body text-[14.5px] leading-relaxed text-white/60">
                {aboutCta.body}
              </p>
            </div>
            <Link
              href="/contact"
              className="relative mt-6 inline-flex shrink-0 items-center gap-2.5 rounded-full bg-white px-6 py-3.5 font-display text-[14px] font-semibold text-black transition-colors hover:bg-white/85 sm:mt-0"
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
