import PageHeader from "@/components/landing/PageHeader";
import ContactForm from "@/components/landing/ContactForm";
import ContactIcon from "@/components/landing/ContactIcon";
import CTA from "@/components/landing/CTA";
import { contact } from "@/data/site";

export const metadata = {
  title: "Contact Us — Software Development Company in Kerala",
  description:
    "Tell us what you're building and we'll get back to you within one business day with next steps.",
  alternates: { canonical: "/contact" },
};

const details = [
  {
    icon: "mail",
    label: "Email",
    value: contact.email,
    href: contact.emailHref,
  },
  {
    icon: "phone",
    label: "Phone",
    value: contact.phone,
    href: contact.phoneHref,
  },
  {
    icon: "chat",
    label: "WhatsApp",
    value: "Message us",
    href: contact.whatsapp,
  },
];

const facts = [
  { label: "Response time", value: contact.responseTime },
  { label: "Who we work with", value: "Founders, product teams" },
  { label: "Timezone", value: "Global / async" },
];

const assurances = [
  "Reply within one business day",
  "No obligation, no sales pressure",
  "Straight to an engineer",
];

/** Pre-empts the questions people hesitate over before writing in. */
const briefingNotes = [
  {
    question: "Don't have a spec yet?",
    answer:
      "That's fine — a paragraph on the problem is enough to start. Scoping is part of what we do.",
  },
  {
    question: "Not sure about budget?",
    answer:
      "Leave it blank. We'll suggest a range once we understand what's involved.",
  },
  {
    question: "Already have a codebase?",
    answer:
      "We take over existing projects, run audits, and handle legacy migrations without downtime.",
  },
  {
    question: "Need to move fast?",
    answer:
      "Say so in your message. We'll tell you honestly whether the timeline is realistic.",
  },
];

/** What happens after the form is sent — removes the "then what?" doubt. */
const nextSteps = [
  {
    step: "01",
    title: "We read and reply",
    detail: "A short note with questions, or a time to talk.",
  },
  {
    step: "02",
    title: "Discovery call",
    detail: "30 minutes to understand the goal behind the build.",
  },
  {
    step: "03",
    title: "Written scope",
    detail: "Milestones, trade-offs and cost, before any code.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk about your project."
        intro="Tell us what you're building and we'll get back to you within one business day with next steps."
      >
        {/* Sets expectations before the form, so the ask feels low-risk. */}
        <ul className="mt-9 flex flex-wrap gap-x-8 gap-y-3">
          {assurances.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 font-body text-[14px] text-neutral-600"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#e23a2e"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m4 12.5 5 5L20 7" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </PageHeader>

      <section className="bg-neutral-100 px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-[1.35fr_1fr]">
          {/* Form card — raised off the tinted field, matching the service cards. */}
          <div className="rounded-[26px] bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_14px_36px_-14px_rgba(0,0,0,0.13)] sm:p-10">
            <h2 className="text-[22px] font-semibold tracking-tight text-neutral-800">
              Send us a message
            </h2>
            <p className="mt-2 font-body text-[14.5px] leading-relaxed text-neutral-500">
              The more you tell us about the problem, the more useful our first
              reply will be.
            </p>

            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          {/* Balances the taller sidebar and answers the usual pre-brief doubts. */}
          <div className="rounded-[26px] border border-neutral-200 p-8 lg:col-start-1 lg:row-start-2">
            <p className="font-body text-[12px] uppercase tracking-[0.16em] text-neutral-400">
              Before you write
            </p>
            <dl className="mt-6 grid gap-6 sm:grid-cols-2">
              {briefingNotes.map((note) => (
                <div key={note.question}>
                  <dt className="text-[14.5px] font-medium text-neutral-800">
                    {note.question}
                  </dt>
                  <dd className="mt-1.5 font-body text-[13.5px] leading-relaxed text-neutral-500">
                    {note.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Spans both rows so the sidebar sits alongside form and notes. */}
          <div className="space-y-8 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            {/* Direct channels, each with an icon tile. */}
            <div className="rounded-[26px] bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_14px_36px_-14px_rgba(0,0,0,0.13)]">
              <p className="font-body text-[12px] uppercase tracking-[0.16em] text-neutral-400">
                Get in touch
              </p>

              <ul className="mt-6 space-y-2">
                {details.map((item) => {
                  const external = item.href.startsWith("http");

                  return (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        className="group -mx-3 flex items-center gap-4 rounded-2xl px-3 py-3 transition-colors hover:bg-neutral-50"
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neutral-900 text-white transition-colors duration-300 group-hover:bg-[#e23a2e]">
                          <ContactIcon name={item.icon} className="h-5 w-5" />
                        </span>

                        <span className="min-w-0">
                          <span className="block font-body text-[12.5px] text-neutral-400">
                            {item.label}
                          </span>
                          <span className="block truncate font-body text-[15px] font-medium text-neutral-800 transition-colors group-hover:text-[#e23a2e]">
                            {item.value}
                          </span>
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Dark panel anchors the column and echoes the site's hero. */}
            <div className="rounded-[26px] bg-neutral-900 p-8 text-white">
              <p className="font-body text-[12px] uppercase tracking-[0.16em] text-white/40">
                What happens next
              </p>

              {/* Connector line runs behind the step markers. */}
              <ol className="relative mt-7 space-y-7 before:absolute before:bottom-4 before:left-[13px] before:top-4 before:w-px before:bg-white/15">
                {nextSteps.map((item) => (
                  <li key={item.step} className="relative flex gap-4">
                    <span className="z-10 mt-0.5 flex h-[27px] w-[27px] shrink-0 items-center justify-center rounded-full bg-white text-[11px] font-semibold text-neutral-900">
                      {item.step}
                    </span>
                    <span>
                      <span className="block text-[15px] font-medium text-white">
                        {item.title}
                      </span>
                      <span className="mt-1 block font-body text-[13.5px] leading-relaxed text-white/50">
                        {item.detail}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>

              <dl className="mt-8 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-white/10 pt-6">
                {facts.map((item) => (
                  <div key={item.label}>
                    <dt className="font-body text-[12px] text-white/40">
                      {item.label}
                    </dt>
                    <dd className="mt-1 font-body text-[13.5px] font-medium text-white">
                      {item.value}
                    </dd>
                  </div>
                ))}
                <div>
                  <dt className="font-body text-[12px] text-white/40">
                    Where we are
                  </dt>
                  <dd className="mt-1 font-body text-[13.5px] font-medium text-white">
                    Remote, worldwide
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
