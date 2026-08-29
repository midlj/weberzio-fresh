import PageHeader from "@/components/landing/PageHeader";
import CTA from "@/components/landing/CTA";
import { site } from "@/data/site";

export const metadata = {
  title: "Terms & Conditions",
  description: `The rules and legal terms that govern your use of the ${site.name} website and services.`,
  alternates: { canonical: "/terms" },
};

const LAST_UPDATED = "July 2026";

const clauses = [
  {
    heading: "1. Acceptance of Terms",
    paragraphs: [
      'By accessing or using the Weberzio website, engaging our services, or entering into a written agreement with us, you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree with any part of these Terms, you should not use our website or services.',
      "These Terms apply to all visitors, clients, and users. Where a signed statement of work or master services agreement exists, its terms take precedence over any conflict with this document.",
    ],
  },
  {
    heading: "2. Services",
    paragraphs: [
      "Weberzio provides web development, mobile application development, SaaS engineering, DevOps, product design, and technical consulting services. The specific scope, deliverables, timeline, and fees for each engagement are documented in a separate proposal or statement of work agreed to by both parties.",
      "We reserve the right to modify, suspend, or discontinue any part of our website or non-contracted services at any time without prior notice.",
    ],
  },
  {
    heading: "3. Client Responsibilities",
    paragraphs: [
      "Clients agree to provide timely feedback, required assets, access credentials, and any information reasonably necessary for us to perform the agreed services. Delays caused by missing input from the client may extend project timelines and are not the responsibility of Weberzio.",
      "Clients warrant that all materials supplied to us — including text, images, code, and third-party assets — are either owned by them or properly licensed for the intended use.",
    ],
  },
  {
    heading: "4. Fees and Payment",
    paragraphs: [
      "Fees are set out in the applicable proposal or statement of work. Unless otherwise agreed in writing, invoices are payable within 14 days of issue. Late payments may incur interest at the maximum rate permitted by applicable law.",
      "Deposits and milestone payments are non-refundable once the corresponding work has commenced. Applicable taxes are additional to quoted fees and are the responsibility of the client.",
    ],
  },
  {
    heading: "5. Post-Launch Support & Warranty",
    paragraphs: [
      "Normal project deliveries include one (1) month (30 days) of free support starting from the date of final delivery or deployment to the production server. This support covers bug fixes for the original scope of work.",
      "After the 1-month support period has concluded, any requests for updates, bug fixes, features, or modifications will be considered additional work and will be billed as payable updates based on our standard hourly rate or a newly agreed-upon fixed price.",
    ],
  },
  {
    heading: "6. Client Modifications to Source Code",
    paragraphs: [
      "We provide warranties only on the code exactly as it was delivered by our team. If the client, in-house developers, or any third-party developers make any modifications, additions, or changes to the source code after delivery, all support obligations from Weberzio are immediately voided.",
      "We do not provide support for code modified by others. Continued support after such modifications may be arranged only under a new agreement.",
    ],
  },
  {
    heading: "7. Server Handover & Responsibility",
    paragraphs: [
      "Upon completion of the project, we may hand over access to production servers, hosting accounts, or cloud infrastructure to the client.",
      "Once server credentials have been handed over, Weberzio holds no responsibility for any server downtime, data loss, security breaches, or system failures caused by actions taken by the client or any third parties. It is the client's responsibility to secure and maintain their infrastructure unless an ongoing DevOps or maintenance contract is signed with us.",
    ],
  },
  {
    heading: "8. Intellectual Property",
    paragraphs: [
      "Upon full payment of all applicable fees, the client receives ownership of the custom deliverables produced specifically for their project, excluding any pre-existing tools, libraries, frameworks, or open-source components owned by Weberzio or third parties, which remain under their respective licences.",
      "Weberzio retains ownership of its underlying methodologies, general know-how, and reusable code. We grant the client a perpetual, non-exclusive licence to use such items solely as embedded in the delivered work.",
      "Unless otherwise agreed, Weberzio may reference the completed project in its portfolio, case studies, and marketing materials.",
    ],
  },
  {
    heading: "9. Confidentiality",
    paragraphs: [
      "Each party agrees to treat as confidential any non-public information disclosed by the other party in connection with an engagement, and to use such information only for the purpose of performing or receiving the services.",
      "Confidentiality obligations survive termination of the engagement for a period of three (3) years, except where longer protection is required by law.",
    ],
  },
  {
    heading: "10. Warranties and Disclaimers",
    paragraphs: [
      'We warrant that services will be performed with reasonable skill and care consistent with industry standards. Except as expressly stated, all services and website content are provided "as is" and "as available" without warranties of any kind, either express or implied.',
      "We do not warrant that our website will be uninterrupted or error-free, that defects will be corrected, or that the website is free of viruses or other harmful components.",
    ],
  },
  {
    heading: "11. Limitation of Liability",
    paragraphs: [
      "To the maximum extent permitted by law, Weberzio shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, revenue, data, or business, arising out of or in connection with these Terms or the use of our services.",
      "Our total aggregate liability arising from or related to any engagement shall not exceed the total fees paid by the client to us during the three (3) months preceding the event giving rise to the claim.",
    ],
  },
  {
    heading: "12. Third-Party Services",
    paragraphs: [
      "Our deliverables may integrate or depend on third-party platforms, libraries, and APIs (for example, cloud providers, authentication services, or payment processors). We are not responsible for the availability, performance, pricing, or terms of any third-party service, and use of those services is subject to their own terms.",
    ],
  },
  {
    heading: "13. Termination",
    paragraphs: [
      "Either party may terminate an engagement with written notice for material breach that is not cured within fourteen (14) days of notice. Upon termination, the client will pay for all services performed and expenses incurred up to the effective date of termination.",
      "We may suspend or restrict access to our website at any time for users who violate these Terms or engage in unlawful activity.",
    ],
  },
  {
    heading: "14. Indemnification",
    paragraphs: [
      "The client agrees to indemnify and hold harmless Weberzio, its team, and its contractors from any claims, damages, liabilities, and expenses (including reasonable legal fees) arising from client-supplied materials, misuse of deliverables, or breach of these Terms.",
    ],
  },
  {
    heading: "15. Governing Law and Disputes",
    paragraphs: [
      "These Terms are governed by and construed in accordance with the laws of India. Any dispute arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the competent courts in Kerala, India.",
      "The parties will attempt to resolve any dispute through good-faith negotiation before commencing formal proceedings.",
    ],
  },
  {
    heading: "16. Changes to These Terms",
    paragraphs: [
      'We may update these Terms from time to time to reflect changes to our services, legal requirements, or business practices. The updated version will be posted on this page with a revised "Last updated" date. Continued use of our website or services after changes take effect constitutes acceptance of the revised Terms.',
    ],
  },
  {
    heading: "17. Contact",
    paragraphs: [
      "Questions about these Terms can be sent to support@weberzio.in. We aim to respond within one business day.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms and conditions."
        intro={`The rules and legal terms that govern your use of the ${site.name} website and services.`}
      >
        <p data-hero-copy className="mt-6 font-body text-[13px] text-neutral-400">
          Last updated — {LAST_UPDATED}
        </p>
      </PageHeader>

      <section className="bg-white px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-14 lg:grid-cols-[260px_1fr] lg:gap-20">
            {/* Contents */}
            <nav
              aria-label="Contents"
              className="self-start lg:sticky lg:top-28"
            >
              <p className="font-body text-[12px] uppercase tracking-[0.16em] text-neutral-400">
                Contents
              </p>
              <ol className="mt-5 space-y-2.5">
                {clauses.map((clause) => (
                  <li key={clause.heading}>
                    <a
                      href={`#${clause.heading.replace(/^\d+\.\s/, "").toLowerCase().replace(/[^a-z]+/g, "-")}`}
                      className="font-body text-[13px] text-neutral-500 transition-colors hover:text-[#c02a20]"
                    >
                      {clause.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {/* Clauses */}
            <div className="max-w-3xl space-y-12">
              {clauses.map((clause) => (
                <div
                  key={clause.heading}
                  id={clause.heading.replace(/^\d+\.\s/, "").toLowerCase().replace(/[^a-z]+/g, "-")}
                  className="scroll-mt-28"
                >
                  <h2 className="text-[20px] font-semibold text-neutral-800">
                    {clause.heading}
                  </h2>
                  <div className="mt-3 space-y-3">
                    {clause.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 32)}
                        className="font-body text-[15px] leading-relaxed text-neutral-600"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
