"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { contact, site } from "@/data/site";
import { services } from "@/data/services";

gsap.registerPlugin(ScrollTrigger);

const columns = [
  {
    title: "Services",
    links: services.slice(0, 4).map((service) => ({
      label: service.title,
      href: `/services/${service.slug}`,
    })),
  },
  {
    title: "More services",
    links: services.slice(4).map((service) => ({
      label: service.title,
      href: `/services/${service.slug}`,
    })),
  },
  {
    title: "Company",
    links: [
      { label: "Our work", href: "/work" },
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
  {
    title: "Get in touch",
    links: [
      { label: contact.email, href: contact.emailHref },
      { label: contact.phone, href: contact.phoneHref },
      { label: "WhatsApp", href: contact.whatsapp },
    ],
  },
];

/**
 * Internal routes go through next/link; mail, tel and external URLs stay as
 * plain anchors so the browser hands them to the right handler.
 */
function FooterLink({ href, children }) {
  const className =
    "font-body text-[13.5px] text-white/50 transition-colors hover:text-white";

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  const external = href.startsWith("http");

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={className}
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const root = useRef(null);
  const pathname = usePathname();

  /*
   * Keyed on pathname: the footer lives in the root layout, so it survives
   * client-side navigations while each new page changes the document height.
   * A ScrollTrigger created on the previous page keeps that page's start
   * position - navigate from a tall page to a short one and the trigger can
   * sit beyond max scroll, leaving the columns stuck at opacity 0. Rebuilding
   * the context per route re-measures against the current page.
   */
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
  }, [pathname]);

  return (
    <footer ref={root} className="border-t border-white/10 bg-black px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div data-footer-col>
            <p className="text-[19px] tracking-tight">
              <span className="font-bold">weber</span>
              <span className="font-light">zio</span>
            </p>
            <p className="mt-3 max-w-xs font-body text-[13.5px] leading-relaxed text-white/50">
              {site.tagline}. A remote engineering studio building web and
              mobile products for founders and enterprises.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title} data-footer-col>
              <p className="text-[13px] font-semibold text-white">{column.title}</p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12.5px] text-white/40">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-[12.5px] text-white/40">
              {contact.address}
            </span>
            <Link
              href="/terms"
              className="text-[12.5px] text-white/40 transition-colors hover:text-white"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
