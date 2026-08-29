"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { companyFacts, stats } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

/**
 * Counts a stat up to its final value on scroll. The numbers carry suffixes
 * and decimals ("99.9%", "10+", "24h"), so the numeric part is parsed out and
 * the surrounding characters are preserved.
 */
function useCountUp(selector, root) {
  useEffect(() => {
    const context = gsap.context((self) => {
      const nodes = self.selector(selector);
      if (!nodes.length) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches;

      nodes.forEach((node) => {
        const raw = node.dataset.value;
        const match = raw.match(/^([^\d]*)([\d.]+)(.*)$/);
        if (!match || reduced) {
          node.textContent = raw;
          return;
        }

        const [, prefix, digits, suffix] = match;
        const target = parseFloat(digits);
        const decimals = (digits.split(".")[1] || "").length;
        const counter = { value: 0 };

        node.textContent = `${prefix}${(0).toFixed(decimals)}${suffix}`;

        gsap.to(counter, {
          value: target,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
          onUpdate: () => {
            node.textContent = `${prefix}${counter.value.toFixed(
              decimals
            )}${suffix}`;
          },
        });
      });
    }, root);

    return () => context.revert();
  }, [selector, root]);
}

/** "Why teams choose us" — the measurable numbers, plus the company facts. */
export default function Stats() {
  const root = useRef(null);

  useCountUp("[data-count]", root);

  useEffect(() => {
    const context = gsap.context((self) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const reveal = (target, vars) =>
        gsap.from(target, {
          ...vars,
          scrollTrigger: {
            trigger: root.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });

      reveal(self.selector("[data-heading]"), {
        y: 28,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      reveal(self.selector("[data-stat]"), {
        y: 26,
        opacity: 0,
        duration: 0.7,
        stagger: 0.09,
        ease: "power3.out",
        delay: 0.12,
      });

      // The rule under each stat wipes out from the left as it lands.
      reveal(self.selector("[data-rule]"), {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.7,
        stagger: 0.09,
        ease: "power3.out",
        delay: 0.3,
      });

      reveal(self.selector("[data-fact]"), {
        y: 16,
        opacity: 0,
        duration: 0.6,
        stagger: 0.07,
        ease: "power3.out",
        delay: 0.34,
      });
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section
      id="about"
      ref={root}
      className="scroll-mt-16 bg-white px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div data-heading>
            <p className="font-body text-[13px] uppercase tracking-[0.18em] text-[#e23a2e]">
              Why teams choose us
            </p>
            <h2 className="mt-4 text-[34px] font-semibold leading-tight tracking-tight text-neutral-800 sm:text-[46px]">
              Engineering you
              <br />
              can measure
            </h2>
          </div>

          <div className="space-y-4 font-body text-[15px] leading-relaxed text-neutral-500 sm:text-[16.5px]">
            <p>
              A small team with deep engineering expertise. Weberzio partners
              with founders, product teams, and enterprises to design and build
              software that solves real problems. From early-stage MVPs to
              production-grade platforms, we own the full stack.
            </p>
            <p>
              Our engineers care about clean architecture, performance, and
              code that&apos;s easy to maintain. Ship fast, ship stable, and
              build for what comes next.
            </p>
          </div>
        </div>

        <p className="mt-14 max-w-2xl font-body text-[15px] leading-relaxed text-neutral-500">
          We help startups and enterprises turn ambitious ideas into
          production-ready software — from the first commit through years of
          scale.
        </p>

        {/* Numbers read as a row of measures, divided by hairlines. */}
        <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} data-stat>
              <p
                data-count
                data-value={stat.value}
                className="text-[42px] font-semibold leading-none tracking-tight text-neutral-900 tabular-nums sm:text-[56px]"
              >
                {stat.value}
              </p>
              <div
                data-rule
                aria-hidden="true"
                className="mt-5 h-px w-full bg-[#e23a2e]"
              />
              <p className="mt-4 font-body text-[13.5px] font-medium text-neutral-700">
                {stat.label}
              </p>
              <p className="mt-1.5 font-body text-[12.5px] leading-relaxed text-neutral-400">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Company facts sit below as a quieter spec strip. */}
        <dl className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-200 lg:grid-cols-4">
          {companyFacts.map((fact) => (
            <div key={fact.label} data-fact className="bg-neutral-50 p-6">
              <dt className="font-body text-[12px] uppercase tracking-[0.16em] text-neutral-400">
                {fact.label}
              </dt>
              <dd className="mt-2 text-[16px] font-medium text-neutral-800">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
