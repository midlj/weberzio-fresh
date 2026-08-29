"use client";

import { useLayoutEffect, useRef, useState } from "react";

/**
 * Geometry of the frame, in CSS pixels.
 *
 * tabW/notchW are fallbacks only: both are measured from the real logo and
 * nav on mount, because a hard-coded notch that is wider than the nav leaves
 * a ragged slab of black hanging past it.
 */
const DESKTOP = {
  gap: 18, // gutter on sides and bottom
  radius: 22, // corner radius, convex and concave alike
  tabH: 78, // depth of the black tab holding the logo
  tabW: 236, // where that tab ends
  notchH: 78, // depth of the black notch holding the nav
  notchW: 502, // width of that notch
};

const MOBILE = {
  gap: 12,
  radius: 18,
  tabH: 62,
  tabW: 178,
  notchH: 0,
  notchW: 0,
};

/**
 * Traces the outline of the white content panel as one closed path.
 *
 * Walking it clockwise from under the logo tab: right along the tab's
 * underside, up around the flat middle run, down into the nav notch, then
 * around the panel's three outer corners and back. `A` arcs with sweep 0 cut
 * the concave corners; sweep 1 rounds the convex ones.
 */
function panelPath(w, h, g) {
  const { gap, radius: r, tabH, tabW, notchH, notchW } = g;
  const right = w - gap;
  const bottom = h - gap;
  const hasNotch = notchW > 0;

  // x where the notch's left edge meets the flat top run
  const notchX = right - notchW;

  const parts = [
    // Start under the logo tab, at its bottom-left (flush with the panel's left edge).
    `M ${gap} ${tabH}`,
    // Along the tab's underside to where it curves away.
    `H ${tabW - r}`,
    // Concave: curve up out of the tab onto the flat run.
    `A ${r} ${r} 0 0 0 ${tabW} ${tabH - r}`,
    // Up the tab's right side to the panel's top edge.
    `V ${gap + r}`,
    // Convex: round onto the flat top.
    `A ${r} ${r} 0 0 1 ${tabW + r} ${gap}`,
  ];

  if (hasNotch) {
    parts.push(
      // Flat run across the top to the notch.
      `H ${notchX - r}`,
      // Convex: round down off the top edge.
      `A ${r} ${r} 0 0 1 ${notchX} ${gap + r}`,
      // Down the notch's left side.
      `V ${notchH - r}`,
      // Concave: curve right into the notch's underside.
      `A ${r} ${r} 0 0 0 ${notchX + r} ${notchH}`,
      // Along the notch underside to the panel's right edge.
      `H ${right}`,
    );
  } else {
    parts.push(
      // No notch: run the top edge straight to the right corner.
      `H ${right - r}`,
      `A ${r} ${r} 0 0 1 ${right} ${gap + r}`,
    );
  }

  parts.push(
    // Down the right edge, round the bottom two corners, back up the left.
    `V ${bottom - r}`,
    `A ${r} ${r} 0 0 1 ${right - r} ${bottom}`,
    `H ${gap + r}`,
    `A ${r} ${r} 0 0 1 ${gap} ${bottom - r}`,
    `Z`,
  );

  return parts.join(" ");
}

export default function Frame({ children }) {
  const [size, setSize] = useState(null);
  const [chrome, setChrome] = useState(null);
  const raf = useRef(0);

  /*
   * The path is drawn in real pixels, so it has to track the viewport exactly.
   * On mobile the URL bar hides and shows as you scroll, which changes the
   * visible height without ever firing `resize` — measuring off visualViewport
   * (and listening to its own resize/scroll) keeps the frame's bottom edge
   * welded to the bottom of what the user can actually see.
   *
   * This runs as a layout effect so the measurement lands before paint, and
   * the CSS stand-in below is never visibly swapped for the SVG.
   */
  useLayoutEffect(() => {
    const vv = window.visualViewport;

    /*
     * Measure the real logo and nav rather than trusting fixed widths: the
     * nav's width changes with its label text and font, and a notch wider
     * than the nav leaves a slab of black hanging past it.
     */
    const measureChrome = () => {
      const header = document.querySelector("[data-frame-header]");
      if (!header) return null;

      const logo = header.querySelector("[data-frame-logo]");
      const nav = header.querySelector("[data-frame-nav]");
      if (!logo || !nav) return null;

      const navRect = nav.getBoundingClientRect();
      const width = vv?.width ?? window.innerWidth;

      return {
        tabW: Math.ceil(logo.getBoundingClientRect().right),
        // The notch runs from the nav's left edge to the viewport's right.
        notchW: Math.ceil(width - navRect.left),
      };
    };

    const measure = () => {
      raf.current = 0;
      setSize({
        w: Math.round(vv?.width ?? window.innerWidth),
        h: Math.round(vv?.height ?? window.innerHeight),
      });
      setChrome(measureChrome());
    };

    const onResize = () => {
      if (raf.current) return;
      raf.current = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    vv?.addEventListener("resize", onResize);
    vv?.addEventListener("scroll", onResize);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      vv?.removeEventListener("resize", onResize);
      vv?.removeEventListener("scroll", onResize);
    };
  }, []);

  const base = size && size.w >= 1024 ? DESKTOP : MOBILE;

  // Measured widths win once available; the constants are the first-paint
  // fallback and stay in use on mobile, where there is no nav notch.
  const geo =
    chrome && base.notchW > 0
      ? { ...base, tabW: chrome.tabW, notchW: chrome.notchW }
      : base;

  return (
    <div className="relative bg-black">
      {/*
       * The panel's top edge is at --frame-gap, not --frame-top: the tab and
       * notch only cut into the top at the far left and far right, so across
       * the middle the content must reach all the way up to the gap. Padding
       * the whole block down by --frame-top instead leaves that middle run
       * showing black through the cut-out, which flattens the frame into a
       * plain bar. Sections needing clearance use --frame-top themselves.
       */}
      <div
        className="px-[var(--frame-gap)] pb-[var(--frame-gap)] pt-[var(--frame-gap)]"
        style={{
          "--frame-gap": `${geo.gap}px`,
          "--frame-top": `${geo.tabH}px`,
        }}
      >
        {children}
      </div>

      {/*
       * One path, filled with evenodd against a full-viewport rect, so the
       * panel is punched out of the black. Drawing the whole outline as a
       * single shape is what keeps every junction seamless.
       *
       * It only paints — it never clips — so the ScrollTrigger pin inside
       * ChangingDev keeps working.
       */}
      {/*
       * Until the viewport has been measured the SVG cannot be sized, so a
       * plain CSS frame stands in for it. Without this the overlay is absent
       * on the server render and the first client paint, and the black frame
       * visibly pops in after hydration.
       */}
      {!size && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-40"
          style={{
            borderStyle: "solid",
            borderColor: "#000",
            borderWidth: `${geo.tabH}px ${geo.gap}px ${geo.gap}px`,
          }}
        />
      )}

      {size && (
        <>
          <svg
            aria-hidden="true"
            className="pointer-events-none fixed left-0 top-0 z-40"
            style={{ width: size.w, height: size.h }}
            viewBox={`0 0 ${size.w} ${size.h}`}
            preserveAspectRatio="none"
          >
            <path
              fill="#000"
              fillRule="evenodd"
              d={`M 0 0 H ${size.w} V ${size.h} H 0 Z ${panelPath(size.w, size.h, geo)}`}
            />
          </svg>
          
        </>
      )}
    </div>
  );
}
