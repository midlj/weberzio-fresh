"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/** Hero band for interior pages, matching the home hero's entrance. */
export default function PageHeader({ eyebrow, title, intro, children }) {
  const root = useRef(null);

  useEffect(() => {
    const context = gsap.context(() => {
      const targets = "[data-hero-line], [data-hero-copy]";

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(targets, { opacity: 1, y: 0 });
        return;
      }

      // CSS hides these pre-hydration, so clear opacity before `from()` runs.
      gsap.set(targets, { opacity: 1 });

      gsap
        .timeline({ defaults: { ease: "power3.out" }, delay: 0.1 })
        .from("[data-hero-line]", {
          yPercent: 110,
          opacity: 0,
          duration: 0.95,
        })
        .from("[data-hero-copy]", { y: 18, opacity: 0, duration: 0.7 }, "-=0.5")
        .from("[data-hero-glow]", { opacity: 0, duration: 1.3 }, 0);
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-white px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-24"
    >
      <div
        data-hero-glow
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[760px] max-w-[110vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e23a2e]/10 blur-[140px]"
      />

      <div className="relative mx-auto max-w-6xl">
        {eyebrow && (
          <p
            data-hero-copy
            className="font-body text-[13px] uppercase tracking-[0.18em] text-[#e23a2e]"
          >
            {eyebrow}
          </p>
        )}

        <h1 className="mt-4 max-w-4xl text-[34px] font-semibold leading-[1.1] tracking-tight text-neutral-900 sm:text-[54px]">
          <span className="block overflow-hidden pb-[0.06em]">
            <span data-hero-line className="block">
              {title}
            </span>
          </span>
        </h1>

        {intro && (
          <p
            data-hero-copy
            className="mt-6 max-w-2xl font-body text-[15px] leading-relaxed text-neutral-500 sm:text-[17px]"
          >
            {intro}
          </p>
        )}

        {children}
      </div>
    </section>
  );
}
