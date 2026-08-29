"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { projects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

/** Case-study rows. Shared by the home page and the /work index. */
export function ProjectList({ items = projects }) {
  const root = useRef(null);

  useEffect(() => {
    const context = gsap.context((self) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(self.selector("[data-project]"), {
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
    <div
      ref={root}
      className="divide-y divide-neutral-200 border-y border-neutral-200"
    >
      {items.map((project) => (
        <a
          key={project.slug}
          data-project
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group grid gap-4 py-8 transition-colors hover:bg-neutral-50 sm:grid-cols-[auto_1fr_auto] sm:items-baseline sm:gap-8 sm:px-4"
        >
          <span className="font-body text-[13px] text-neutral-400">
            {project.year}
          </span>

          <span className="block">
            <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-[21px] font-semibold text-neutral-900 sm:text-[26px]">
                {project.name}
              </span>
              <span className="font-body text-[13.5px] text-[#e23a2e]">
                {project.category}
              </span>
            </span>
            <span className="mt-2 block max-w-xl font-body text-[14px] leading-relaxed text-neutral-500">
              {project.description}
            </span>
            <span className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-neutral-200 bg-neutral-50 px-2.5 py-1 font-body text-[11.5px] text-neutral-500"
                >
                  {tech}
                </span>
              ))}
            </span>
          </span>

          <span className="inline-flex items-center gap-1.5 font-body text-[13px] text-neutral-400 transition-colors group-hover:text-neutral-900">
            {project.domain}
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </span>
        </a>
      ))}
    </div>
  );
}

export default function Work() {
  return (
    <section
      id="work"
      className="scroll-mt-16 bg-white px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-body text-[13px] uppercase tracking-[0.18em] text-[#e23a2e]">
              Case studies
            </p>
            <h2 className="mt-4 text-[32px] font-semibold leading-tight tracking-tight text-neutral-800 sm:text-[46px]">
              Our work: from discovery to launch
            </h2>
          </div>

          <Link
            href="/work"
            className="rounded-full border border-neutral-300 bg-white px-6 py-3 font-body text-[14px] font-medium text-neutral-800 transition-colors hover:bg-neutral-50"
          >
            View all work
          </Link>
        </div>

        <div className="mt-14">
          <ProjectList items={projects.slice(0, 3)} />
        </div>
      </div>
    </section>
  );
}
