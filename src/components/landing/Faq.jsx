"use client";

import { useState } from "react";

import { faqs } from "@/data/faq";

function Item({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-neutral-200">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-6 py-5 text-left"
      >
        <span className="text-[16px] font-medium text-neutral-800 sm:text-[18px]">
          {item.question}
        </span>
        <span
          className={`shrink-0 text-[#e23a2e] transition-transform duration-300 ${
            isOpen ? "rotate-45" : ""
          }`}
          aria-hidden="true"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>

      {/* Grid-rows trick animates to auto height without measuring. */}
      <div
        className={`grid transition-all duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl font-body text-[14.5px] leading-relaxed text-neutral-500">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faq"
      className="scroll-mt-16 bg-white px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="font-body text-[13px] uppercase tracking-[0.18em] text-[#e23a2e]">
            FAQ
          </p>
          <h2 className="mt-4 text-[32px] font-semibold leading-tight tracking-tight text-neutral-800 sm:text-[46px]">
            Answers before you ask.
          </h2>
        </div>

        <div className="mt-14 max-w-3xl border-t border-neutral-200">
          {faqs.map((item, index) => (
            <Item
              key={item.question}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
