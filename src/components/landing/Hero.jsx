"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import FluidCanvas from "@/components/landing/FluidCanvas";
import gsap from "gsap";

/** Concentric fingerprint mark that sits inline before the word "human". */
function Fingerprint() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="inline-block h-[0.78em] w-[0.78em] -translate-y-[0.06em] align-middle"
      fill="none"
      stroke="var(--color-hr-red)"
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

/** Brand starburst that sits inline in the headline, with a soft red bloom. */
function Spark() {
  return (
    <span className="relative inline-block h-[0.8em] w-[0.8em] align-middle">
      <span className="hr-bloom absolute inset-0 rounded-full bg-hr-red/40 blur-xl" />
      <Image
        src="/star.png"
        alt=""
        width={256}
        height={256}
        preload
        aria-hidden="true"
        className="hr-spark relative h-full w-full object-contain"
      />
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
        gsap.set("[data-hero-clip]", { overflow: "visible" });
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
        .from("[data-hero-glow]", { opacity: 0, duration: 1.4 }, 0)
        // The clip exists only to stage the line wipes; once the entrance
        // settles it would slice the spark's bloom, so release it.
        .set("[data-hero-clip]", { overflow: "visible" });

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
      /*
       * Full-height banner: the section starts at the frame's top gutter
       * (the nav floats above it), so filling the first screen means
       * 100dvh less the gutter above and below. dvh keeps the bottom edge
       * welded to the viewport as mobile browser bars hide.
       */
      className="relative flex min-h-[calc(100dvh-var(--frame-gap)*2)] flex-col justify-center overflow-hidden bg-black px-5 py-20 sm:px-8"
    >
      {/* Ambient red bloom behind the headline, weighted to the text side. */}
      <div
        data-hero-glow
        aria-hidden="true"
        className="pointer-events-none absolute left-[32%] top-1/3 h-[420px] w-[820px] max-w-[110vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-hr-red/12 blur-[140px]"
      />

      {/* Pointer-reactive fluid layer; sits under the copy, over the glow. */}
      <FluidCanvas />

      <div className="relative mx-auto w-full max-w-6xl">
        <p
          data-hero-copy
          className="mb-6 font-body text-[14px] text-white/60 sm:text-[15px]"
        >
          Hi, we&apos;re <span className="text-hr-red">Weberzio</span>.
        </p>

        <h1 className="font-display text-[42px] font-light leading-[1.06] tracking-tight text-white sm:text-[64px] lg:text-[84px]">
          {/* Each line clips its own reveal, so the stagger reads as a wipe. */}
          <span data-hero-clip className="block overflow-hidden pb-[0.06em]">
            <span data-hero-line className="block">
              <span className="font-bold">AI</span> native
            </span>
          </span>
          <span data-hero-clip className="block overflow-hidden pb-[0.06em]">
            <span data-hero-line className="block">
              software
            </span>
          </span>
          <span data-hero-clip className="block overflow-hidden pb-[0.06em]">
            <span
              data-hero-line
              className="inline-flex flex-wrap items-center gap-x-[0.22em]"
            >
              development
              <span className="inline-flex items-center gap-[0.16em]">
                <Spark />
              </span>
            </span>
          </span>
        </h1>

        {/* Muted continuation of the headline, half a step down. */}
        <p className="mt-4 font-display text-[24px] font-light leading-[1.12] tracking-tight text-white/35 sm:text-[36px] lg:text-[46px]">
          <span data-hero-clip className="block overflow-hidden pb-[0.06em]">
            <span data-hero-line className="block">
              tailored to your
            </span>
          </span>
          <span data-hero-clip className="block overflow-hidden pb-[0.06em]">
            <span
              data-hero-line
              className="inline-flex flex-wrap items-center gap-x-[0.22em]"
            >
              <span className="inline-flex items-center gap-[0.16em] text-white/60">
                <Fingerprint />
                business
              </span>
              needs
            </span>
          </span>
        </p>

        <p
          data-hero-copy
          className="mt-8 max-w-xl font-body text-[15px] leading-relaxed text-white/55 sm:text-[16px]"
        >
          Weberzio is an AI native software development company in Kerala,
          building web and mobile apps for startups and enterprises — Flutter
          mobile apps, MERN stack platforms, ecommerce websites and cloud
          infrastructure engineered to scale.
        </p>

        <div data-hero-cta className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 font-display text-[15px] font-semibold text-black shadow-[0_0_60px_-12px_rgba(226,58,46,0.5)] transition-colors hover:bg-white/85"
          >
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-hr-red" />
            Get Started
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center rounded-full border border-white/15 px-7 py-3.5 font-display text-[15px] font-medium text-white/85 transition-colors hover:bg-white/5"
          >
            View our work
          </Link>
        </div>
      </div>
    </section>
  );
}
