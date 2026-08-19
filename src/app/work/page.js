import PageHeader from "@/components/landing/PageHeader";
import { ProjectList } from "@/components/landing/Work";
import CTA from "@/components/landing/CTA";

export const metadata = {
  title: "Our Work",
  description:
    "A collection of web and mobile applications, SaaS platforms, and digital experiences we've crafted.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="Our work portfolio."
        intro="A collection of web and mobile applications, SaaS platforms, and digital experiences we've crafted."
      />

      <section className="bg-white px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <ProjectList />
        </div>
      </section>

      <CTA />
    </>
  );
}
