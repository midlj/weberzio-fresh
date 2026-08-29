"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Small red plus used as the bullet marker inside both cards. */
function Plus() {
  return (
    <span aria-hidden="true" className="mt-[3px] shrink-0 text-hr-red">
      +
    </span>
  );
}

function Bullets({ items }) {
  return (
    <ul className="mt-5 space-y-2.5">
      {items.map((item) => (
        <li
          key={item}
          data-bullet
          className="flex gap-2.5 font-body text-[14px] leading-snug text-white/70"
        >
          <Plus />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Mock editor window peeking in from the right of the startup card. */
function EditorMock() {
  return (
    <div
      data-art
      className="pointer-events-none absolute -right-6 top-10 hidden w-[300px] overflow-hidden rounded-l-xl border border-white/10 bg-[#0d1013] shadow-2xl sm:block lg:-right-10 lg:w-[340px]"
    >
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      </div>

      <div className="p-4">
        <p className="text-[10px] text-white/35">app / dashboard</p>
        <p className="mt-1.5 text-[19px] font-semibold text-white">page.tsx</p>

        <p className="mt-3 inline-flex items-center gap-1.5 rounded bg-hr-red/15 px-2 py-1 text-[10px] font-medium text-hr-red">
          <span className="h-2 w-2 rounded-[2px] bg-hr-red" />
          Deployed to staging
        </p>

        <p className="mt-4 text-[11px] text-white/55">Build passed in 42s</p>

        {/* Suggestive code block — colored bars stand in for syntax. */}
        <div className="mt-3 space-y-1.5 rounded-md bg-black/60 p-3">
          {[
            ["w-4/5", "bg-[#c678dd]"],
            ["w-3/5", "bg-[#61afef]"],
            ["w-2/3", "bg-[#98c379]"],
            ["w-1/2", "bg-[#e5c07b]"],
            ["w-3/4", "bg-[#56b6c2]"],
          ].map(([width, color]) => (
            <div key={width + color} className={`h-1.5 rounded-full ${width} ${color} opacity-70`} />
          ))}
        </div>
      </div>
    </div>
  );
}

/** Faceted cloud prism anchored to the enterprise card. */
function CloudMock() {
  return (
    <div data-art className="pointer-events-none absolute bottom-0 right-0 hidden h-full w-[46%] sm:block">
      <div className="absolute right-6 top-12 flex h-[86px] w-[86px] items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff8577] to-[#a8241a] text-[17px] font-bold text-black shadow-[0_0_50px_-8px_rgba(226,58,46,0.7)]">
          Cloud
      </div>

      <svg
        viewBox="0 0 220 240"
        className="absolute bottom-0 right-0 h-[78%] w-full"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="hr-prism" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e23a2e" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0b6ea8" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <path d="M110 118 210 176 110 234 10 176Z" fill="url(#hr-prism)" stroke="#e23a2e" strokeOpacity="0.5" />
        <path d="M110 118 210 176M110 118 10 176" stroke="#e23a2e" strokeOpacity="0.35" />
        {[
          [40, 40],
          [180, 66],
          [86, 28],
          [150, 108],
          [26, 96],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" fill="#ffb3a8" opacity="0.7" />
        ))}
      </svg>
    </div>
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

      // Cards rise in sequence, then their bullets tick in behind them.
      self.selector("[data-card]").forEach((card, index) => {
        gsap.from(card, {
          y: 48,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          delay: index * 0.12,
          scrollTrigger: {
            trigger: card,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.from(card.querySelectorAll("[data-bullet]"), {
          x: -14,
          opacity: 0,
          duration: 0.5,
          stagger: 0.09,
          ease: "power2.out",
          delay: 0.25 + index * 0.12,
          scrollTrigger: {
            trigger: card,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });

        // The inset product art drifts in from the card's outer edge.
        const art = card.querySelector("[data-art]");
        if (art) {
          gsap.from(art, {
            x: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.3 + index * 0.12,
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          });
        }
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

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* Startup card */}
          <article
            data-card
            className="relative min-h-[330px] overflow-hidden rounded-2xl bg-[#0b0d0f] p-8"
          >
            <div className="relative z-10 max-w-[54%] sm:max-w-[52%]">
              <h3 className="text-[26px] font-semibold text-white">
                For startups
              </h3>
              <p className="mt-2.5 font-body text-[14px] leading-relaxed text-white/60">
                Weberzio takes your concept from discovery to a launched
                product.
              </p>

              <Bullets
                items={[
                  "Ship an MVP in weeks, not months",
                  "SaaS platforms and Flutter mobile apps",
                  "Fractional CTO advisory as you scale",
                ]}
              />

              <Link
                href="/services/saas-product-engineering"
                className="mt-8 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-white px-6 py-3 text-[14px] font-semibold text-black transition-colors hover:bg-white/85"
              >
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-hr-red" />
                Explore product engineering
              </Link>
            </div>

            <EditorMock />
          </article>

          {/* Enterprise card */}
          <article
            data-card
            className="relative min-h-[330px] overflow-hidden rounded-2xl bg-[#0b0d0f] p-8"
          >
            <div className="relative z-10 max-w-[58%] sm:max-w-[56%]">
              <h3 className="text-[26px] font-semibold text-white">
                For enterprises
              </h3>
              <p className="mt-2.5 font-body text-[14px] leading-relaxed text-white/60">
                Production-grade platforms that stay available as you grow
              </p>

              <Bullets
                items={[
                  "Secure REST and GraphQL API architectures",
                  "Cloud infrastructure and DevOps on AWS",
                  "Architecture audits and legacy migrations",
                ]}
              />

              <Link
                href="/services"
                className="mt-8 inline-flex w-full items-center justify-center rounded-full border border-white/15 px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-white/10"
              >
                Explore all services
              </Link>
            </div>

            <CloudMock />
          </article>
        </div>
      </div>
    </section>
  );
}
