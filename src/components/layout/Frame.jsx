/**
 * Page shell.
 *
 * The black frame is painted by a fixed overlay so it stays welded to the
 * viewport while the page scrolls behind it. The top edge is taller than the
 * other three (--frame-top) because the logo tab and nav pill live on it.
 *
 * The overlay only paints — it never clips — so the ScrollTrigger pin inside
 * ChangingDev keeps working.
 */
export default function Frame({ children }) {
  return (
    <div className="relative bg-black">
      <div className="px-[var(--frame-gap)] pb-[var(--frame-gap)] pt-[var(--frame-top)]">
        {children}
      </div>

      {/*
       * A 100vmax black ring fills everything outside the rounded rect, which
       * produces the gutter without covering the scrolling content.
       */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-[var(--frame-gap)] bottom-[var(--frame-gap)] top-[var(--frame-top)] z-40 rounded-[var(--frame-radius)] rounded-tl-none shadow-[0_0_0_100vmax_#000]"
      />
    </div>
  );
}
