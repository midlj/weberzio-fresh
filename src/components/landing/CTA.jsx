"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { contact } from "@/data/site";

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
        className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[700px] max-w-[110vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-hr-red/12 blur-[130px]"
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <h2
          data-cta-title
          className="text-[32px] font-semibold leading-tight tracking-tight sm:text-[48px]"
        >
          Ready to build your
          <br />
          <span className="text-hr-red">next project?</span>
        </h2>

        <p
          data-cta-copy
          className="mx-auto mt-5 max-w-lg font-body text-[15px] leading-relaxed text-white/55 sm:text-[16px]"
        >
          Tell us what you&rsquo;re building and we&rsquo;ll get back to you
          within one business day with next steps.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            data-cta-button
            href="/contact"
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-[14.5px] font-semibold text-black transition-colors hover:bg-white/85 sm:w-auto"
          >
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-hr-red" />
            Let&rsquo;s talk
          </Link>
          <a
            data-cta-button
            href={contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-full border border-white/15 px-7 py-3.5 text-[14.5px] font-medium text-white transition-colors hover:bg-white/5 sm:w-auto"
          >
            WhatsApp us
          </a>
        </div>
      </div>
    </section>
  );
}
