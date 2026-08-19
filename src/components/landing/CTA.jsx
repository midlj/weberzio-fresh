"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const root = useRef(null);

  useEffect(() => {
    const context = gsap.context((self) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
          defaults: { ease: "power3.out" },
        })
        .from("[data-cta-glow]", { opacity: 0, scale: 0.7, duration: 1.2 }, 0)
        .from("[data-cta-title]", { y: 30, opacity: 0, duration: 0.8 }, 0.1)
        .from("[data-cta-copy]", { y: 22, opacity: 0, duration: 0.7 }, 0.28)
        .from(
          "[data-cta-button]",
          { y: 18, opacity: 0, duration: 0.6, stagger: 0.1 },
          0.42
        );
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section
      id="cta"
      ref={root}
      className="relative overflow-hidden bg-black px-5 py-28 sm:px-8 sm:py-36"
    >
      <div
        data-cta-glow
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[700px] max-w-[110vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-hr-green/12 blur-[130px]"
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <h2
          data-cta-title
          className="text-[32px] font-semibold leading-tight tracking-tight sm:text-[48px]"
        >
          Close your skill gaps
          <br />
          <span className="text-hr-green">before they close on you</span>
        </h2>

        <p
          data-cta-copy
          className="mx-auto mt-5 max-w-lg font-body text-[15px] leading-relaxed text-white/55 sm:text-[16px]"
        >
          Map the skills your team needs, see where you stand today, and start
          closing the distance.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            data-cta-button
            href="#"
            className="w-full rounded-md bg-hr-green px-7 py-3.5 text-[14.5px] font-semibold text-black transition-colors hover:bg-hr-green-bright sm:w-auto"
          >
            Sign Up
          </a>
          <a
            data-cta-button
            href="#"
            className="w-full rounded-md border border-white/15 bg-white/5 px-7 py-3.5 text-[14.5px] font-medium text-white transition-colors hover:bg-white/10 sm:w-auto"
          >
            Request Demo
          </a>
        </div>
      </div>
    </section>
  );
}
