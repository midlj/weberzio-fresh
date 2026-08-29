"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { services } from "@/data/services";
import ServiceIcon from "./ServiceIcon";

gsap.registerPlugin(ScrollTrigger);

/** Card grid of all six services. Shared by the home page and /services. */
export function ServiceCards() {
  const root = useRef(null);

  useEffect(() => {
    const context = gsap.context((self) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(self.selector("[data-service]"), {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
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
    <div ref={root} className="grid gap-7 md:grid-cols-2">
      {services.map((service) => (
        <Link
          key={service.slug}
          data-service
          href={`/services/${service.slug}`}
          className="group relative flex flex-col overflow-hidden rounded-[26px] bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_14px_36px_-14px_rgba(0,0,0,0.13)] transition-shadow duration-300 hover:shadow-[0_1px_2px_rgba(0,0,0,0.05),0_26px_56px_-18px_rgba(0,0,0,0.24)]"
        >
          {/* Brand hairline sweeps across the top edge on hover. */}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-hr-red to-[#ff8a3d] transition-transform duration-500 group-hover:scale-x-100"
          />

          {/* Ghost index bleeding off the top-right corner. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-5 right-6 font-display text-[96px] font-bold leading-none tracking-tight text-neutral-900/[0.05] transition-colors duration-300 group-hover:text-hr-red/[0.09]"
          >
            {service.number}
          </span>

          <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-900 text-white shadow-[0_10px_24px_-8px_rgba(0,0,0,0.45)] transition-all duration-300 group-hover:-rotate-6 group-hover:scale-105 group-hover:bg-hr-red group-hover:shadow-[0_12px_28px_-8px_rgba(226,58,46,0.5)]">
            <ServiceIcon slug={service.slug} className="h-[24px] w-[24px]" />
          </span>

          <h3 className="relative mt-6 text-[19px] font-semibold leading-snug text-neutral-800">
            {service.title}
          </h3>

          <p className="relative mt-3 font-body text-[14px] leading-relaxed text-neutral-500">
            {service.summary}
          </p>

          {/* flex-1 pushes the footer down, so every card's rule lines up. */}
          <ul className="relative mt-5 flex flex-1 flex-wrap content-start gap-2">
            {service.stack.slice(0, 4).map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-neutral-200 px-3 py-1 font-body text-[12px] text-neutral-500 transition-colors duration-300 group-hover:border-neutral-300"
              >
                {tech}
              </li>
            ))}
          </ul>

          <span className="relative mt-7 flex items-center justify-between border-t border-neutral-100 pt-5 font-body text-[13.5px] font-medium text-neutral-400 transition-colors group-hover:text-hr-red">
            Explore service
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-hr-red group-hover:text-white">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      className="scroll-mt-16 bg-neutral-100 px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="font-body text-[13px] uppercase tracking-[0.18em] text-[#e23a2e]">
            Services
          </p>
          <h2 className="mt-4 text-[32px] font-semibold leading-tight tracking-tight text-neutral-800 sm:text-[46px]">
            End-to-end engineering, done well
          </h2>
          <p className="mt-5 font-body text-[15px] leading-relaxed text-neutral-500 sm:text-[16px]">
            Web applications, SaaS platforms, APIs, cloud infrastructure, and
            the technical guidance to keep it all moving forward. Engagements
            are scoped to the outcome, not the hours.
          </p>
        </div>

        <div className="mt-14">
          <ServiceCards />
        </div>
      </div>
    </section>
  );
}
