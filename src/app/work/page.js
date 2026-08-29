import Link from "next/link";

import PageHeader from "@/components/landing/PageHeader";
import { ProjectList } from "@/components/landing/Work";
import CTA from "@/components/landing/CTA";
import { caseStudies } from "@/data/casestudies";

export const metadata = {
  title: "Our Work — Web & Mobile App Development Portfolio",
  description:
    "A collection of web and mobile applications, SaaS platforms, and digital experiences we've crafted.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="Web & mobile app development portfolio."
        intro="A collection of web and mobile applications, SaaS platforms, and digital experiences we've crafted."
      />

      <section className="bg-white px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <ProjectList />
        </div>
      </section>

      {/* In-depth case studies */}
      <section className="border-t border-neutral-100 bg-neutral-50 px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="font-body text-[12px] uppercase tracking-[0.16em] text-neutral-400">
            Case studies
          </p>
          <h2 className="mt-4 max-w-2xl text-[28px] font-semibold leading-tight tracking-tight text-neutral-900 sm:text-[36px]">
            Selected engagements, in depth.
          </h2>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {caseStudies.map((study) => (
              <Link
                key={study.slug}
                href={`/work/${study.slug}`}
                className="group flex flex-col rounded-2xl border border-neutral-200 bg-white p-8 transition-colors hover:border-[#e23a2e]/50"
              >
                <p className="font-body text-[12px] uppercase tracking-[0.12em] text-neutral-400">
                  {study.category}
                </p>
                <h3 className="mt-3 text-[19px] font-semibold leading-snug tracking-tight text-neutral-900 transition-colors group-hover:text-[#c02a20]">
                  {study.name}
                </h3>
                <p className="mt-3 flex-1 font-body text-[14px] leading-relaxed text-neutral-500">
                  {study.description[0]}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {study.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-neutral-200 bg-neutral-50 px-2.5 py-1 font-body text-[12px] text-neutral-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="mt-6 inline-flex items-center gap-2 font-display text-[13.5px] font-semibold text-neutral-900 transition-colors group-hover:text-[#c02a20]">
                  Read case study
                  <span
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
