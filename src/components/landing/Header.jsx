"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";

import OverlayMenu from "./OverlayMenu";

const navLinks = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#changing" },
  { label: "Services", href: "#adventure" },
  { label: "Portfolio", href: "#adventure" },
  { label: "Products", href: "#adventure" },
  { label: "Contact", href: "#cta" },
];

/** Nine-dot grid that opens the fullscreen menu. */
function GridIcon() {
  return (
    <span className="grid grid-cols-3 gap-[4px]" aria-hidden="true">
      {Array.from({ length: 9 }).map((_, index) => (
        <span key={index} className="h-[3.5px] w-[3.5px] rounded-full bg-white/85" />
      ))}
    </span>
  );
}

/**
 * Concave corner that tucks the frame's rounded edge against the logo tab, so
 * the tab reads as carved out of the frame rather than sitting on top of it.
 */
function Notch({ className }) {
  return (
    <span aria-hidden="true" className={`pointer-events-none absolute ${className}`}>
      <svg viewBox="0 0 26 26" className="h-full w-full" fill="none">
        <path d="M26 0v26H0C14.36 26 26 14.36 26 0Z" fill="#000" />
      </svg>
    </span>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const root = useRef(null);

  useEffect(() => {
    const context = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(root.current, {
        y: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }, root);

    return () => context.revert();
  }, []);

  return (
    <>
      {/* Rides on the frame's black top band, above the frame overlay. */}
      <header
        ref={root}
        className="pointer-events-none fixed inset-x-0 top-0 z-50 flex h-[var(--frame-top)] items-center justify-between font-display"
      >
        <Link
          href="/"
          className="pointer-events-auto relative flex h-full items-center gap-2.5 pl-6 pr-10 text-white sm:pl-8"
        >
          <span className="grid grid-cols-2 gap-[2px]" aria-hidden="true">
            <span className="h-[7px] w-[7px] rounded-[2px] bg-[#f5c451]" />
            <span className="h-[7px] w-[7px] rounded-[2px] bg-[#4aa3f0]" />
            <span className="h-[7px] w-[7px] rounded-[2px] bg-[#e0554e]" />
            <span className="h-[7px] w-[7px] rounded-[2px] bg-hr-green" />
          </span>
          <span className="text-[19px] tracking-tight">
            <span className="font-bold">techware</span>
            <span className="font-light">lab</span>
          </span>

          {/* Curves the frame edge in under the right side of the tab. */}
          <Notch className="bottom-0 right-0 h-[var(--frame-radius)] w-[var(--frame-radius)] translate-x-full" />
        </Link>

        <div className="pointer-events-auto flex items-center gap-3 pr-5 sm:gap-4 sm:pr-7">
          <nav className="hidden items-center rounded-xl bg-[#111] p-1.5 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setActive(link.label)}
                className={`rounded-lg px-4 py-2 text-[14.5px] transition-colors ${
                  active === link.label
                    ? "bg-white text-black"
                    : "text-white/75 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-lg transition-opacity hover:opacity-70"
          >
            <GridIcon />
          </button>
        </div>
      </header>

      <OverlayMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
