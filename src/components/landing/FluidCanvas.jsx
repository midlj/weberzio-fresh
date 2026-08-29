"use client";

import { useEffect, useRef } from "react";

/*
 * Reference palette. Only ONE hue is active at a time: additive dye of
 * mixed hues sums toward white under accumulation, while a single hue
 * saturates toward that colour — the difference between a blown-out
 * white core and the deep coloured cores in the reference art.
 */
const HUES = ["#31e0c0", "#4a7ff0", "#9d4af0", "#ff2f92", "#ff8a3d", "#35c26e"];

/**
 * GPU fluid-simulation overlay for the hero: colorful dye swirls trail the
 * pointer, in the banner only. The library's own input listeners sit on its
 * canvas, which this wrapper keeps at pointer-events: none so buttons and
 * links above stay clickable — instead we listen on the hero section itself
 * and drive splats manually, so the effect works even while the cursor is
 * over the headline or CTAs.
 */
export default function FluidCanvas() {
  const wrapper = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const host = wrapper.current;
    const hero = host?.parentElement;
    if (!host || !hero) return;

    let sim = null;
    let disposed = false;
    let paused = false;
    let raf = 0;
    let pending = null;
    let last = null;
    const cleanups = [];

    // Dynamic import keeps the ~40KB sim out of the shared bundle and off
    // the server render path.
    import("webgl-fluid-enhanced").then(({ default: WebGLFluidEnhanced }) => {
      if (disposed) return;

      try {
        sim = new WebGLFluidEnhanced(host);
        sim.setConfig({
          simResolution: 128,
          dyeResolution: 1024,
          densityDissipation: 1.4,
          velocityDissipation: 0.8,
          curl: 4,
          splatRadius: 0.09,
          transparent: true,
          bloom: true,
          bloomIntensity: 0.25,
          sunrays: false,
          bloomThreshold: 0.5,
          // Caps each splat's HSV value; the library multiplies dye x10, so
          // the default 0.5 blows fresh trails out to white.
          brightness: 0.18,
          shading: false,
          colorful: false,
          colorPalette: [HUES[0]],
        });
        sim.start();
        // The library inlines position:relative on its container, which
        // knocks the wrapper out of its absolute inset-0 cover and leaves
        // the canvas as a content-sized box with a visible hard edge.
        host.style.position = "absolute";
      } catch {
        // No WebGL (old GPU, blocked context): the hero works without it.
        sim = null;
        return;
      }

      const canvas = host.querySelector("canvas");
      if (!canvas) return;

      // Drift through the palette one hue at a time (see HUES above).
      let hue = 0;
      const rotate = setInterval(() => {
        if (!sim) return;
        hue = (hue + 1) % HUES.length;
        sim.setConfig({ colorPalette: [HUES[hue]] });
      }, 1500);
      cleanups.push(() => clearInterval(rotate));

      const bufferX = (xCss) =>
        xCss * (canvas.width / Math.max(1, canvas.clientWidth));

      /*
       * splatAtLocation divides x by the drawing-buffer width but y by the
       * CSS height, so x must be pre-scaled into buffer pixels while y stays
       * in CSS pixels. The sim's y axis points up: a downward mouse move is
       * a negative dy.
       */
      const flush = () => {
        raf = 0;
        if (!pending || !sim) return;

        const rect = canvas.getBoundingClientRect();
        const x = pending.cx - rect.left;
        const y = pending.cy - rect.top;
        pending = null;

        if (last) {
          const clamp = (v) => Math.max(-120, Math.min(120, v));
          const dx = clamp((x - last.x) * 1.5);
          const dy = clamp(-(y - last.y) * 1.5);

          // Skip micro-jitters so idle hovering doesn't boil the dye.
          if (Math.hypot(x - last.x, y - last.y) > 6) {
            sim.splatAtLocation(bufferX(x), y, dx, dy);
          }
        }
        last = { x, y };
      };

      const onMove = (event) => {
        pending = { cx: event.clientX, cy: event.clientY };
        if (!raf) raf = requestAnimationFrame(flush);
      };

      // Reset the trail when the pointer leaves, so re-entering the banner
      // doesn't paint a straight streak from the exit point.
      const onLeave = () => {
        last = null;
        pending = null;
      };

      hero.addEventListener("pointermove", onMove);
      hero.addEventListener("pointerleave", onLeave);
      cleanups.push(() => {
        hero.removeEventListener("pointermove", onMove);
        hero.removeEventListener("pointerleave", onLeave);
      });

      // Idle the GPU loop while the banner is scrolled out of view.
      const observer = new IntersectionObserver(([entry]) => {
        if (!sim) return;
        const shouldPause = !entry.isIntersecting;
        if (shouldPause !== paused) {
          paused = shouldPause;
          sim.togglePause();
        }
      });
      observer.observe(hero);
      cleanups.push(() => observer.disconnect());
    });

    return () => {
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
      cleanups.forEach((fn) => fn());
      sim?.stop();
      sim = null;
    };
  }, []);

  return (
    <div
      ref={wrapper}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden opacity-60"
    />
  );
}
