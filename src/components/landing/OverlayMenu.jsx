"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const menuLinks = [
  "Services",
  "Products",
  "Portfolio",
  "Partner",
  "Blog",
  "Careers",
];

const socialLinks = [
  "Instagram",
  "Email",
  "LinkedIn",
  "WhatsApp",
  "Facebook",
  "Behance",
  "Dribbble",
];

/** Up-right arrow that trails every menu label. */
function Arrow({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  );
}

export default function OverlayMenu({ open, onClose }) {
  const root = useRef(null);
  const panel = useRef(null);
  const timeline = useRef(null);

  // Build the open/close timeline once, then play or reverse it on toggle.
  useEffect(() => {
    const context = gsap.context(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
        onReverseComplete: () => gsap.set(root.current, { autoAlpha: 0 }),
      });

      if (reduced) {
        tl.set(root.current, { autoAlpha: 1 }).set(
          "[data-menu-link], [data-menu-social], [data-menu-close]",
          { opacity: 1, y: 0 }
        );
      } else {
        tl.set(root.current, { autoAlpha: 1 })
          .from(panel.current, { yPercent: -3, opacity: 0, duration: 0.45 })
          .from("[data-menu-close]", { opacity: 0, duration: 0.3 }, 0.15)
          .from(
            "[data-menu-link]",
            { yPercent: 110, opacity: 0, duration: 0.65, stagger: 0.06 },
            0.1
          )
          .from(
            "[data-menu-social]",
            { y: 14, opacity: 0, duration: 0.4, stagger: 0.035 },
            0.4
          );
      }

      timeline.current = tl;
    }, root);

    return () => context.revert();
  }, []);

  useEffect(() => {
    const tl = timeline.current;
    if (!tl) return;
    if (open) tl.play();
    else tl.reverse();
  }, [open]);

  // Escape closes, and the page behind stops scrolling while the menu is up.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <div
      ref={root}
      className="invisible fixed inset-x-[var(--frame-gap)] bottom-[var(--frame-gap)] top-[var(--frame-top)] z-[60] font-display opacity-0"
      aria-hidden={!open}
    >
      <div
        ref={panel}
        className="relative flex h-full flex-col overflow-y-auto rounded-[var(--frame-radius)] rounded-tl-none bg-[#f4f4f2] px-6 py-8 text-black sm:px-12 sm:py-10"
      >
        <button
          data-menu-close
          onClick={onClose}
          className="flex w-fit items-center gap-2.5 text-[15px] font-semibold tracking-[0.08em] transition-opacity hover:opacity-60"
        >
          CLOSE
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <nav className="mt-10 flex-1 sm:mt-14">
          {menuLinks.map((label) => (
            // Each label clips its own reveal so the stagger reads as a wipe.
            <span key={label} className="block overflow-hidden">
              <a
                data-menu-link
                href="#"
                className="group inline-flex items-start text-[44px] font-light uppercase leading-[1.12] tracking-tight transition-opacity hover:opacity-55 sm:text-[64px] lg:text-[76px]"
              >
                {label}
                <Arrow className="mt-[0.35em] h-[0.3em] w-[0.3em] shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </span>
          ))}
        </nav>

        <div className="mt-10 border-t border-black/15 pt-5">
          <ul className="flex flex-wrap gap-x-7 gap-y-3">
            {socialLinks.map((label) => (
              <li key={label}>
                <a
                  data-menu-social
                  href="#"
                  className="group inline-flex items-start text-[13.5px] font-semibold uppercase tracking-[0.06em] transition-opacity hover:opacity-55"
                >
                  {label}
                  <Arrow className="mt-[1px] h-[9px] w-[9px] shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
