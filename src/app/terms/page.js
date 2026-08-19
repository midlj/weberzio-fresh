import PageHeader from "@/components/landing/PageHeader";
import { contact, site } from "@/data/site";

export const metadata = {
  title: "Terms & Conditions",
  description: `Terms and conditions governing the use of ${site.name}'s website and services.`,
  alternates: { canonical: "/terms" },
};

const clauses = [
  {
    heading: "Agreement",
    body: `By accessing this website or engaging ${site.name} for services, you agree to these terms. If you do not agree, please discontinue use of the site.`,
  },
  {
    heading: "Scope of work",
    body: "Every engagement is defined by a written scope agreed before work begins, setting out milestones, deliverables and trade-offs. Work outside that scope is quoted separately and is never invoiced without prior written agreement.",
  },
  {
    heading: "Payment",
    body: "Invoices are issued against milestones defined in the agreed scope. Unless stated otherwise in your engagement agreement, invoices are payable within 14 days of issue.",
  },
  {
    heading: "Intellectual property",
    body: "On final payment, ownership of the custom source code and assets we produce for your project transfers to you. Third-party libraries and open-source components remain under their own licences.",
  },
  {
    heading: "Confidentiality",
    body: "We treat all business information, credentials and data shared with us during an engagement as confidential, and disclose it to no third party without your consent.",
  },
  {
    heading: "Warranties and liability",
    body: "We deliver work to a professional standard and correct defects reported during the agreed support window. To the extent permitted by law, our liability is limited to the fees paid for the engagement in question.",
  },
  {
    heading: "Contact",
    body: `Questions about these terms can be sent to ${contact.email}.`,
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms & Conditions"
        intro={`The terms below govern use of this website and engagements with ${site.name}.`}
      />

      <section className="bg-white px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl space-y-10">
            {clauses.map((clause) => (
              <div key={clause.heading}>
                <h2 className="text-[20px] font-semibold text-neutral-800">
                  {clause.heading}
                </h2>
                <p className="mt-3 font-body text-[15px] leading-relaxed text-neutral-600">
                  {clause.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
