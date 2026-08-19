"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/** Concentric fingerprint mark that sits inline before the word "human". */
function Fingerprint() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="inline-block h-[0.78em] w-[0.78em] -translate-y-[0.06em] align-middle"
      fill="none"
      stroke="var(--color-hr-green)"
      strokeWidth="2.6"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="4.5" className="hr-print" />
      <path d="M32 18a14 14 0 0 1 14 14v4" className="hr-print" />
      <path d="M18 36v-4a14 14 0 0 1 14-14" className="hr-print" />
      <path d="M32 9a23 23 0 0 1 23 23v6" className="hr-print" />
      <path d="M9 38v-6A23 23 0 0 1 32 9" className="hr-print" />
      <path d="M23 45a10 10 0 0 0 18 0" className="hr-print" />
      <path d="M15 47a19 19 0 0 0 34 0" className="hr-print" />
    </svg>
  );
}

/** Four-point spark that sits inline before "AI", with a soft green bloom. */
function Spark() {
  return (
    <span className="relative inline-block h-[0.8em] w-[0.8em] align-middle">
      <span className="hr-bloom absolute inset-0 rounded-full bg-hr-green/40 blur-xl" />
      <svg viewBox="0 0 64 64" className="hr-spark relative h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="hr-spark-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8dfcc4" />
            <stop offset="100%" stopColor="#12b268" />
          </linearGradient>
        </defs>
        <path
          d="M32 2c2.6 15.4 14 26.8 29.4 30C46 35.2 34.6 46.6 32 62c-2.6-15.4-14-26.8-29.4-30C18 28.8 29.4 17.4 32 2Z"
          fill="url(#hr-spark-fill)"
        />
      </svg>
    </span>
  );
}

export default function Hero() {
  const root = useRef(null);

  useEffect(() => {
    const context = gsap.context(() => {
      const targets = "[data-hero-line], [data-hero-copy], [data-hero-cta]";

      // Respect reduced motion: show the final state, skip the choreography.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(targets, { opacity: 1, y: 0 });
        return;
      }

      // The CSS above hides these until now, so `from()` tweens start clean.
      gsap.set(targets, { opacity: 1 });

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.15,
      });

      timeline
        .from("[data-hero-line]", {
          yPercent: 115,
          opacity: 0,
          duration: 1.1,
          stagger: 0.11,
        })
        // The fingerprint ridges draw on, outermost first.
        .from(
          ".hr-print",
          {
            opacity: 0,
            scale: 0.4,
            transformOrigin: "32px 32px",
            duration: 0.5,
            stagger: 0.05,
          },
          "-=0.45"
        )
        .from(
          ".hr-spark",
          { scale: 0, rotate: -140, duration: 0.7, ease: "back.out(2)" },
          "-=0.35"
        )
        .from(".hr-bloom", { opacity: 0, scale: 0.3, duration: 0.6 }, "-=0.5")
        .from("[data-hero-copy]", { y: 18, opacity: 0, duration: 0.7 }, "-=0.3")
        .from("[data-hero-cta]", { y: 18, opacity: 0, duration: 0.7 }, "-=0.5")
        .from("[data-hero-glow]", { opacity: 0, duration: 1.4 }, 0);

      // Ambient breathing on the spark bloom once the entrance settles.
      gsap.to(".hr-bloom", {
        opacity: 0.55,
        scale: 1.12,
        duration: 1.7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.8,
      });
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-black px-5 pb-28 pt-16 sm:px-8 sm:pb-36 sm:pt-24"
    >
      {/* Ambient green bloom behind the headline. */}
      <div
        data-hero-glow
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[820px] max-w-[110vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-hr-green/12 blur-[140px]"
      />

      <div className="relative mx-auto max-w-5xl text-center">
        <h1 className="font-display text-[40px] font-light leading-[1.06] tracking-tight text-white/45 sm:text-[64px] lg:text-[86px]">
          {/* Each line clips its own reveal, so the stagger reads as a wipe. */}
          <span className="block overflow-hidden pb-[0.06em]">
            <span data-hero-line className="block">
              The future
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <span data-hero-line className="block">
              of development
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <span
              data-hero-line
              className="inline-flex flex-wrap items-center justify-center gap-x-[0.22em]"
            >
              is
              <span className="inline-flex items-center gap-[0.16em] text-white/90">
                <Fingerprint />
                human
              </span>
              <span className="text-white/45">+</span>
              <span className="inline-flex items-center gap-[0.16em] text-white/90">
                <Spark />
                AI
              </span>
            </span>
          </span>
        </h1>

        <p
          data-hero-copy
          className="mx-auto mt-8 max-w-xl font-body text-[15px] leading-relaxed text-white/55 sm:text-[17px]"
        >
          We help you map the skills you need, track the skills you have, and
          close your gaps to thrive in a GenAI world.
        </p>

        <div data-hero-cta className="mt-10">
          <a
            href="#adventure"
            className="inline-block rounded-lg border border-white/15 bg-white/5 px-8 py-4 font-display text-[15px] font-medium text-white shadow-[0_0_60px_-12px_rgba(57,224,138,0.5)] transition-colors hover:bg-white/10"
          >
            Join The Community
          </a>
        </div>
      </div>
    </section>
  );
}
