"use client";

import { useState } from "react";
import Link from "next/link";

/** Consent strip pinned to the bottom of the hero until the visitor answers. */
export default function CookieBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[45] flex justify-center px-[calc(var(--frame-gap)+12px)] pb-[calc(var(--frame-gap)+12px)]">
      <div className="pointer-events-auto flex w-full max-w-3xl flex-col gap-4 rounded-xl border border-white/10 bg-hr-panel/95 p-5 backdrop-blur-md sm:flex-row sm:items-center">
        <p className="flex-1 font-body text-[13px] leading-relaxed text-white/65">
          We set essential cookies to help run our websites and services. By
          clicking Accept, you consent to the use of additional cookies for
          analytics and marketing. Feel free to update your settings at any
          time. Read more in our{" "}
          <Link
            href="/terms"
            className="text-hr-green underline-offset-2 hover:underline"
          >
            Terms &amp; Conditions
          </Link>
          .
        </p>

        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => setVisible(false)}
            className="rounded-md bg-white/10 px-5 py-2 font-display text-[13px] font-medium text-white transition-colors hover:bg-white/20"
          >
            Decline
          </button>
          <button
            onClick={() => setVisible(false)}
            className="rounded-md bg-hr-green px-5 py-2 font-display text-[13px] font-semibold text-black transition-colors hover:bg-hr-green-bright"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
