"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Bullet list drawn as a route: a rail with waypoint nodes leading to the CTA. */
function PathStops({ items }) {
  return (
    <div className="relative mt-7 flex-1">
      <span
        data-line
        aria-hidden="true"
        className="absolute bottom-1 left-[8px] top-2 w-px bg-gradient-to-b from-hr-red/60 via-white/15 to-transparent"
      />
      <ul className="space-y-5">
        {items.map((item) => (
          <li key={item} data-bullet className="flex items-start gap-4">
            <span
              aria-hidden="true"
              className="relative z-10 mt-[2px] flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-full border border-hr-red/50 bg-[#111417] transition-colors duration-300 group-hover:border-hr-red"
            >
              <span className="h-[5px] w-[5px] rounded-full bg-hr-red" />
            </span>
            <span className="font-body text-[14.5px] leading-snug text-white/70">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PathCard({ eyebrow, title, blurb, items, href, cta, filled }) {
  return (
    <article
      data-card
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0b0d0f] transition-colors duration-300 hover:border-hr-red/25"
    >
      {/* Brand hairline sweep — same motif as the service cards. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-hr-red to-[#ff8a3d] transition-transform duration-500 group-hover:scale-x-100"
      />
      {/* One quiet corner glow in place of the old inset artwork. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-hr-red/[0.07] blur-3xl transition-colors duration-500 group-hover:bg-hr-red/[0.13]"
      />

      <div className="relative flex flex-1 flex-col p-7 sm:p-9">
        <p className="font-body text-[12px] uppercase tracking-[0.18em] text-hr-red">
          {eyebrow}
        </p>
        <h3 className="mt-3 text-[24px] font-semibold leading-tight text-white sm:text-[27px]">
          {title}
        </h3>
        <p className="mt-2.5 max-w-md font-body text-[14px] leading-relaxed text-white/60">
          {blurb}
        </p>

        <PathStops items={items} />

        <Link
          href={href}
          className={
            filled
              ? "mt-9 inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-6 py-3 text-[14px] font-semibold text-black transition-colors hover:bg-white/85"
              : "mt-9 inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-white/10"
          }
        >
          {filled && (
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-hr-red" />
          )}
          {cta}
        </Link>
      </div>
    </article>
  );
}

export default function Adventure() {
  const root = useRef(null);

  useEffect(() => {
    const context = gsap.context((self) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const reveal = (target, vars) =>
        gsap.from(target, {
          ...vars,
          scrollTrigger: {
            trigger: target,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

      reveal(self.selector("[data-heading]"), {
        y: 28,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      reveal(self.selector("[data-lead]"), {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.1,
      });

      // Cards rise in sequence; the rail draws down while its stops tick in.
      self.selector("[data-card]").forEach((card, index) => {
        const trigger = {
          trigger: card,
          start: "top 82%",
          toggleActions: "play none none reverse",
        };

        gsap.from(card, {
          y: 48,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          delay: index * 0.12,
          scrollTrigger: trigger,
        });

        gsap.from(card.querySelector("[data-line]"), {
          scaleY: 0,
          transformOrigin: "top center",
          duration: 0.9,
          ease: "power2.out",
          delay: 0.25 + index * 0.12,
          scrollTrigger: trigger,
        });

        gsap.from(card.querySelectorAll("[data-bullet]"), {
          x: -14,
          opacity: 0,
          duration: 0.5,
          stagger: 0.09,
          ease: "power2.out",
          delay: 0.25 + index * 0.12,
          scrollTrigger: trigger,
        });
      });
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section
      id="adventure"
      ref={root}
      className="scroll-mt-16 bg-white px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          data-heading
          className="text-center text-[34px] font-semibold leading-tight tracking-tight text-neutral-700 sm:text-[46px]"
        >
          Choose Your <span className="text-[#e23a2e]">Path</span>
        </h2>
        <p
          data-lead
          className="mx-auto mt-4 max-w-lg text-center font-body text-[15px] leading-relaxed text-neutral-500"
        >
          We partner with founders, product teams, and enterprises to design and
          build software that solves real problems
        </p>

        <div className="relative mt-14 grid gap-6 lg:grid-cols-2">
          {/* "or" pivot sitting on the seam between the two paths. */}
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 z-10 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white font-body text-[12px] font-semibold uppercase tracking-wide text-neutral-400 shadow-[0_4px_14px_rgba(0,0,0,0.08)] lg:flex"
          >
            or
          </span>

          <PathCard
            eyebrow="The launch path"
            title="For startups"
            blurb="Weberzio takes your concept from discovery to a launched product."
            items={[
              "Ship an MVP in weeks, not months",
              "SaaS platforms and Flutter mobile apps",
              "Fractional CTO advisory as you scale",
            ]}
            href="/services/saas-product-engineering"
            cta="Explore product engineering"
            filled
          />

          <PathCard
            eyebrow="The scale path"
            title="For enterprises"
            blurb="Production-grade platforms that stay available as you grow."
            items={[
              "Secure REST and GraphQL API architectures",
              "Cloud infrastructure and DevOps on AWS",
              "Architecture audits and legacy migrations",
            ]}
            href="/services"
            cta="Explore all services"
          />
        </div>
      </div>
    </section>
  );
}
