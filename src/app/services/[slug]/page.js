import Link from "next/link";
import { notFound } from "next/navigation";

import PageHeader from "@/components/landing/PageHeader";
import Process from "@/components/landing/Process";
import CTA from "@/components/landing/CTA";
import JsonLd, { ORG_ID, breadcrumbs } from "@/components/seo/JsonLd";
import { services, getService } from "@/data/services";
import { site } from "@/data/site";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) return {};

  return {
    title: `${service.title} in Kerala`,
    description: service.tagline,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} in Kerala`,
      description: service.tagline,
    },
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  const related = services.filter((item) => item.slug !== service.slug);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.body,
    serviceType: service.title,
    url: `${site.url}/services/${service.slug}`,
    provider: { "@id": ORG_ID },
    areaServed: ["Kerala", "India", "Worldwide"],
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd
        data={breadcrumbs(site.url, [
          ["Home", "/"],
          ["Services", "/services"],
          [service.title, null],
        ])}
      />
      <PageHeader
        eyebrow={`Service ${service.number}`}
        title={service.title}
        intro={service.tagline}
      >
        <div className="mt-8 flex flex-wrap gap-2">
          {service.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-neutral-200 bg-neutral-50 px-3 py-1.5 font-body text-[12.5px] text-neutral-600"
            >
              {tech}
            </span>
          ))}
        </div>
      </PageHeader>

      <section className="bg-white px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="max-w-3xl font-body text-[15px] leading-relaxed text-neutral-600 sm:text-[17px]">
            {service.body}
          </p>

          <p className="mt-14 font-body text-[12px] uppercase tracking-[0.16em] text-neutral-400">
            What&rsquo;s included
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {service.included.map((item, index) => (
              <div
                key={item}
                className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6"
              >
                <span className="text-[12px] font-semibold text-[#e23a2e]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 font-body text-[14.5px] leading-relaxed text-neutral-600">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Process
        title="How this engagement runs"
        intro="The same four phases on every project, so you always know what happens next."
      />

      <section className="bg-white px-5 pb-24 sm:px-8 sm:pb-32">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-[26px] font-semibold tracking-tight text-neutral-800 sm:text-[34px]">
            Explore what else we do
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}`}
                className="group rounded-2xl border border-neutral-200 bg-neutral-50 p-6 transition-colors hover:border-[#e23a2e]/50 hover:bg-white"
              >
                <span className="text-[12px] font-semibold text-[#e23a2e]">
                  {item.number}
                </span>
                <h3 className="mt-3 text-[16.5px] font-semibold leading-snug text-neutral-800">
                  {item.title}
                </h3>
                <p className="mt-2 font-body text-[13.5px] leading-relaxed text-neutral-500">
                  {item.tagline}
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
