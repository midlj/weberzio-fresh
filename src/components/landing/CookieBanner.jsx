"use client";

import { useSyncExternalStore, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "cookie-consent";

const subscribe = () => () => {};

/** True once hydrated, so the banner never renders during SSR. */
function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}

function hasStoredChoice() {
  try {
    return Boolean(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return false;
  }
}

/** Consent strip pinned to the bottom of the hero until the visitor answers. */
export default function CookieBanner() {
  const mounted = useMounted();
  // Lazy initializer only runs on the client, where localStorage exists.
  const [answered, setAnswered] = useState(() =>
    typeof window === "undefined" ? true : hasStoredChoice()
  );

  const respond = (choice) => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ choice, timestamp: new Date().toISOString() })
      );
    } catch {
      // Storage unavailable (private mode, blocked) — dismiss for this visit only.
    }
    setAnswered(true);
  };

  if (!mounted || answered) return null;

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
            onClick={() => respond("declined")}
            className="rounded-md bg-white/10 px-5 py-2 font-display text-[13px] font-medium text-white transition-colors hover:bg-white/20"
          >
            Decline
          </button>
          <button
            onClick={() => respond("accepted")}
            className="rounded-md bg-hr-green px-5 py-2 font-display text-[13px] font-semibold text-black transition-colors hover:bg-hr-green-bright"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
