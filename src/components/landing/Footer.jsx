"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const columns = [
  {
    title: "Products",
    links: ["Screen", "Interview", "SkillUp", "Certifications", "Pricing"],
  },
  {
    title: "Solutions",
    links: ["Hire developers", "Upskill teams", "AI platform teams", "Universities"],
  },
  {
    title: "Resources",
    links: ["Blog", "Customer stories", "Developer skills report", "Help center"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Newsroom", "Contact"],
  },
];

export default function Footer() {
  const root = useRef(null);

  useEffect(() => {
    const context = gsap.context((self) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(self.selector("[data-footer-col]"), {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });
    }, root);

    return () => context.revert();
  }, []);

  return (
    <footer ref={root} className="border-t border-white/10 bg-black px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div data-footer-col>
            <p className="text-[19px] font-extrabold tracking-tight">HackerRank</p>
            <p className="mt-3 max-w-xs font-body text-[13.5px] leading-relaxed text-white/50">
              The developer skills platform for a GenAI world.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title} data-footer-col>
              <p className="text-[13px] font-semibold text-white">{column.title}</p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-body text-[13.5px] text-white/50 transition-colors hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12.5px] text-white/40">
            © {new Date().getFullYear()} HackerRank. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Cookie Policy"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[12.5px] text-white/40 transition-colors hover:text-white"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
