"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";

import OverlayMenu from "./OverlayMenu";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/**
 * Nine-dot grid that opens the fullscreen menu.
 *
 * Below lg there is no nav notch, so the button sits on the white panel and
 * the dots have to be dark; from lg up it sits in the black notch.
 */
function GridIcon() {
  return (
    <span className="grid grid-cols-3 gap-[4px]" aria-hidden="true">
      {Array.from({ length: 9 }).map((_, index) => (
        <span
          key={index}
          className="h-[3.5px] w-[3.5px] rounded-full bg-neutral-900 lg:bg-white/85"
        />
      ))}
    </span>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const pathname = usePathname();
  const root = useRef(null);

  /*
   * Exactly one link may be active at a time.
   *
   * Hash links ("/#about") share a pathname with "/", so a path-only match
   * would light up both Home and About at once. Hash links are therefore
   * matched against the section currently scrolled into view, and the plain
   * path links only when no such section is active.
   */
  const isActive = (href) => {
    const [path, hash] = href.split("#");
    const base = path || "/";

    if (base !== "/") return pathname.startsWith(base);
    if (pathname !== "/") return false;

    return hash ? activeHash === hash : activeHash === "";
  };

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

  // Track which in-page section the reader is on, for the hash links above.
  useEffect(() => {
    if (pathname !== "/") return;

    const sections = navLinks
      .map((link) => link.href.split("#")[1])
      .filter(Boolean)
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return;

    // Recomputed from the observer's full record of what is on screen, so the
    // result never depends on the previous state and stays a pure derivation.
    const visible = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }

        // Document order wins when two sections straddle the band, so at most
        // one link is ever marked active.
        const current = sections.find((section) => visible.has(section.id));
        setActiveHash(current ? current.id : "");
      },
      // A band just under the header: a section counts as current only while
      // it crosses that line.
      { rootMargin: "-20% 0px -75% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <>
      {/* Rides above the frame overlay: logo in the tab, nav over the panel. */}
      <header
        ref={root}
        data-frame-header
        className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-start justify-between font-display"
      >
        {/* Sits inside the frame's logo tab. */}
        <Link
          href="/"
          data-frame-logo
          className="pointer-events-auto relative flex h-[var(--frame-top)] items-center gap-2.5 pl-6 pr-7 text-white sm:pl-8"
        >
          <span className="grid grid-cols-2 gap-[2px]" aria-hidden="true">
            <span className="h-[7px] w-[7px] rounded-[2px] bg-[#f5c451]" />
            <span className="h-[7px] w-[7px] rounded-[2px] bg-[#4aa3f0]" />
            <span className="h-[7px] w-[7px] rounded-[2px] bg-[#8b93f8]" />
            <span className="h-[7px] w-[7px] rounded-[2px] bg-hr-red" />
          </span>
          <span className="text-[19px] tracking-tight">
            <span className="font-bold">weber</span>
            <span className="font-light">zio</span>
          </span>
        </Link>

        <div data-frame-nav
          className="pointer-events-auto flex h-[var(--nav-notch-h)] items-center gap-4 pr-5 sm:pr-6">
          <nav className="hidden items-center rounded-xl bg-[#111] p-1.5 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`rounded-lg px-4 py-2 text-[14.5px] transition-colors ${
                  isActive(link.href)
                    ? "bg-white text-black"
                    : "text-white/75 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
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
