"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

import { contact } from "@/data/site";

const menuLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Terms", href: "/terms" },
];

const socialLinks = [
  { label: "Email", href: contact.emailHref },
  { label: "WhatsApp", href: contact.whatsapp },
  { label: "Phone", href: contact.phoneHref },
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

      // Match the element's initial CSS (invisible + opacity-0) so GSAP and
      // the stylesheet agree before the first play().
      gsap.set(root.current, { autoAlpha: 0 });

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
        /*
         * fromTo, not from: a paused `.from()` applies its start values at
         * build time via immediateRender, and once this timeline has been
         * reversed those targets can stay latched at opacity 0 even after a
         * later play(). Declaring both endpoints removes that ambiguity.
         */
        tl.set(root.current, { autoAlpha: 1 })
          .fromTo(
            panel.current,
            { yPercent: -3, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.45 }
          )
          .fromTo(
            "[data-menu-close]",
            { opacity: 0 },
            { opacity: 1, duration: 0.3 },
            0.15
          )
          .fromTo(
            "[data-menu-link]",
            { yPercent: 110, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.65, stagger: 0.06 },
            0.1
          )
          .fromTo(
            "[data-menu-social]",
            { y: 14, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, stagger: 0.035 },
            0.4
          );
      }

      timeline.current = tl;
    }, root);

    return () => context.revert();
  }, []);

  /*
   * Drive the timeline on toggle.
   *
   * The first run happens on mount with `open` still false. Reversing a
   * timeline that is already at time 0 completes instantly, which fires
   * onReverseComplete and leaves every `.from()` target parked at its start
   * value (opacity: 0) — so a later play() would find the timeline already
   * finished and reveal an empty panel. Skip that first reverse.
   */
  const hasOpened = useRef(false);

  useEffect(() => {
    const tl = timeline.current;
    if (!tl) return;

    if (open) {
      hasOpened.current = true;
      tl.play();
    } else if (hasOpened.current) {
      tl.reverse();
    }
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
      className="invisible fixed inset-[var(--frame-gap)] z-[60] font-display opacity-0"
      aria-hidden={!open}
    >
      <div
        ref={panel}
        className="relative flex h-full flex-col overflow-y-auto rounded-[var(--frame-radius)] bg-[#f4f4f2] px-6 py-8 text-black sm:px-12 sm:py-10"
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
          {menuLinks.map((link) => (
            // Each label clips its own reveal so the stagger reads as a wipe.
            <span key={link.label} className="block overflow-hidden">
              <Link
                data-menu-link
                href={link.href}
                onClick={onClose}
                className="group inline-flex items-start text-[44px] font-light uppercase leading-[1.12] tracking-tight transition-opacity hover:opacity-55 sm:text-[64px] lg:text-[76px]"
              >
                {link.label}
                <Arrow className="mt-[0.35em] h-[0.3em] w-[0.3em] shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </span>
          ))}
        </nav>

        <div className="mt-10 border-t border-black/15 pt-5">
          <ul className="flex flex-wrap gap-x-7 gap-y-3">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  data-menu-social
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="group inline-flex items-start text-[13.5px] font-semibold uppercase tracking-[0.06em] transition-opacity hover:opacity-55"
                >
                  {link.label}
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
