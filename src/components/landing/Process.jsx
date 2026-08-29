"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { process } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

/** Four-phase engagement model, shown on /services and each service page. */
export default function Process({
  title = "Four phases, no surprises",
  intro = "A predictable four-phase engagement. No surprises, no scope creep, and no invoices you haven't seen coming.",
}) {
  const root = useRef(null);

  useEffect(() => {
    const context = gsap.context((self) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(self.selector("[data-phase]"), {
        y: 28,
        opacity: 0,
        duration: 0.7,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section ref={root} className="bg-white px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="font-body text-[13px] uppercase tracking-[0.18em] text-[#e23a2e]">
            How we work
          </p>
          <h2 className="mt-4 text-[32px] font-semibold leading-tight tracking-tight text-neutral-800 sm:text-[46px]">
            {title}
          </h2>
          <p className="mt-5 font-body text-[15px] leading-relaxed text-neutral-500 sm:text-[16px]">
            {intro}
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {process.map((phase) => (
            <div
              key={phase.step}
              data-phase
              className="rounded-2xl border border-neutral-200 bg-neutral-50 p-7"
            >
              <span className="text-[12px] font-semibold text-[#e23a2e]">
                {phase.step}
              </span>
              <h3 className="mt-4 text-[18px] font-semibold text-neutral-800">
                {phase.title}
              </h3>
              <p className="mt-1.5 font-body text-[13.5px] text-[#e23a2e]">
                {phase.summary}
              </p>
              <p className="mt-3 font-body text-[14px] leading-relaxed text-neutral-500">
                {phase.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
