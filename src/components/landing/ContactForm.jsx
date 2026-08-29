"use client";

import { useState } from "react";

import { contact } from "@/data/site";

const budgets = [
  "<$10k",
  "$10k–$25k",
  "$25k–$50k",
  "$50k–$100k",
  "$100k+",
  "Not sure yet",
];

const MESSAGE_LIMIT = 5000;

const fieldClass =
  "w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3.5 font-body text-[14.5px] text-neutral-900 placeholder:text-neutral-400 outline-none transition-[border-color,box-shadow,background-color] focus:border-[#e23a2e] focus:bg-white focus:ring-4 focus:ring-[#e23a2e]/12";

const labelClass =
  "mb-2 block font-body text-[13px] font-medium text-neutral-700";

/** Marks a required field, with the asterisk hidden from screen readers. */
function Required() {
  return (
    <span aria-hidden="true" className="text-[#e23a2e]">
      *
    </span>
  );
}

function Arrow({ className = "" }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/** Confirmation shown in place of the form once a draft has been handed off. */
function Sent({ onReset }) {
  return (
    <div className="py-6 text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e23a2e]/12 text-[#e23a2e]">
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m4 12.5 5 5L20 7" />
        </svg>
      </span>

      <h3 className="mt-5 text-[19px] font-semibold text-neutral-800">
        Your draft is ready
      </h3>
      <p className="mx-auto mt-2 max-w-sm font-body text-[14.5px] leading-relaxed text-neutral-500">
        We&rsquo;ve opened your email client with the details filled in. Send it
        and we&rsquo;ll reply within {contact.responseTime}.
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
        <a
          href={contact.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 rounded-full bg-neutral-900 px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-neutral-700"
        >
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-hr-red" />
          Message on WhatsApp instead
        </a>
        <button
          type="button"
          onClick={onReset}
          className="font-body text-[13.5px] text-neutral-500 underline-offset-4 transition-colors hover:text-neutral-900 hover:underline"
        >
          Write another message
        </button>
      </div>
    </div>
  );
}

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [messageLength, setMessageLength] = useState(0);

  /*
   * No form backend is wired up yet, so the submission is handed to the
   * visitor's mail client rather than being silently dropped. Swap this for a
   * server action or API route once an endpoint exists.
   */
  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Company: ${data.get("company") || "—"}`,
      `Budget: ${data.get("budget") || "—"}`,
      "",
      data.get("message"),
    ].join("\n");

    const subject = `New project enquiry from ${data.get("name")}`;
    const mailto = `${contact.emailHref}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    // A synthetic anchor click hands the mailto: to the OS handler without
    // routing through Next, which window.location would be flagged for.
    const link = document.createElement("a");
    link.href = mailto;
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    link.remove();

    setSent(true);
  }

  if (sent) {
    return (
      <Sent
        onReset={() => {
          setSent(false);
          setMessageLength(0);
        }}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Your name <Required />
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder="Jane Doe"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email <Required />
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jane@company.com"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className={labelClass}>
            Company{" "}
            <span className="font-normal text-neutral-400">(optional)</span>
          </label>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            placeholder="Company name"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="budget" className={labelClass}>
            Budget{" "}
            <span className="font-normal text-neutral-400">(optional)</span>
          </label>

          {/* Native arrow is replaced with one that matches the field style. */}
          <div className="relative">
            <select
              id="budget"
              name="budget"
              className={`${fieldClass} cursor-pointer appearance-none pr-11`}
            >
              <option value="">Select a range</option>
              {budgets.map((budget) => (
                <option key={budget} value={budget}>
                  {budget}
                </option>
              ))}
            </select>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-baseline justify-between gap-4">
          <label htmlFor="message" className={`${labelClass} mb-0`}>
            Tell us about your project <Required />
          </label>
          <span
            aria-hidden="true"
            className={`font-body text-[12px] tabular-nums ${
              messageLength > MESSAGE_LIMIT - 200
                ? "text-[#e23a2e]"
                : "text-neutral-400"
            }`}
          >
            {messageLength}/{MESSAGE_LIMIT}
          </span>
        </div>

        <textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={MESSAGE_LIMIT}
          onChange={(event) => setMessageLength(event.target.value.length)}
          placeholder="What are you building, and what does success look like?"
          className={`${fieldClass} resize-y`}
        />
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-3">
        <button
          type="submit"
          className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-neutral-900 px-7 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-neutral-700 sm:w-auto"
        >
          <span aria-hidden="true" className="mr-0.5 h-2 w-2 rounded-full bg-hr-red" />
          Send message
          <Arrow className="transition-transform duration-200 group-hover:translate-x-1" />
        </button>

        <p className="font-body text-[13px] text-neutral-400">
          We reply within {contact.responseTime}. No spam, ever.
        </p>
      </div>
    </form>
  );
}
