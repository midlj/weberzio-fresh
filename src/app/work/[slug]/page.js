import Link from "next/link";
import { notFound } from "next/navigation";

import PageHeader from "@/components/landing/PageHeader";
import CTA from "@/components/landing/CTA";
import JsonLd, { ORG_ID, breadcrumbs } from "@/components/seo/JsonLd";
import { caseStudies, getCaseStudy } from "@/data/casestudies";
import { site } from "@/data/site";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) return {};

  return {
    title: `${study.name} | Case Study`,
    description: study.description[0],
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: {
      title: `${study.name} | Case Study`,
      description: study.description[0],
    },
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) notFound();

  const meta = [
    ["Client", study.client],
    ["Role", study.role],
    ["Year", study.year],
  ];

  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: study.name,
    description: study.description[0],
    url: `${site.url}/work/${study.slug}`,
    creator: { "@id": ORG_ID },
    dateCreated: study.year,
    keywords: study.stack.join(", "),
  };

  return (
    <>
      <JsonLd data={caseStudySchema} />
      <JsonLd
        data={breadcrumbs(site.url, [
          ["Home", "/"],
          ["Work", "/work"],
          [study.name, null],
        ])}
      />
      <PageHeader
        eyebrow="Case Study"
        title={study.name}
        intro={study.category}
      />

      <section className="bg-white px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-14 lg:grid-cols-[1fr_300px] lg:gap-20">
            <div>
              <div className="space-y-5">
                {study.description.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="font-body text-[15px] leading-relaxed text-neutral-600 sm:text-[17px]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <h2 className="mt-14 font-body text-[12px] uppercase tracking-[0.16em] text-neutral-400">
                Results
              </h2>
              <ul className="mt-6 space-y-4">
                {study.results.map((result) => (
                  <li key={result} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-[#e23a2e]"
                    />
                    <span className="font-body text-[15px] leading-relaxed text-neutral-700">
                      {result}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-16 border-t border-neutral-100 pt-8">
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 font-display text-[14px] font-semibold text-neutral-900 transition-colors hover:text-[#c02a20]"
                >
                  <span aria-hidden="true">←</span>
                  All case studies
                </Link>
              </div>
            </div>

            {/* Meta sidebar */}
            <aside className="self-start rounded-2xl border border-neutral-200 bg-neutral-50 p-7">
              <dl className="space-y-5">
                {meta.map(([label, value]) => (
                  <div key={label}>
                    <dt className="font-body text-[11.5px] uppercase tracking-[0.14em] text-neutral-400">
                      {label}
                    </dt>
                    <dd className="mt-1 font-body text-[15px] font-medium text-neutral-800">
                      {value}
                    </dd>
                  </div>
                ))}
                <div>
                  <dt className="font-body text-[11.5px] uppercase tracking-[0.14em] text-neutral-400">
                    Stack
                  </dt>
                  <dd className="mt-2.5 flex flex-wrap gap-2">
                    {study.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-neutral-200 bg-white px-2.5 py-1 font-body text-[12px] text-neutral-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
