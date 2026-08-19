"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  {
    id: "discovery",
    lead: "Discovery",
    rest: " comes before code.",
    body: "We ask questions until the business goal is clear, not just the feature list.",
  },
  {
    id: "scope",
    lead: "Scope",
    rest: " is written down, in the open.",
    body: "An explicit plan with milestones and trade-offs — no surprises, no scope creep, and no invoices you haven’t seen coming.",
  },
  {
    id: "launch",
    lead: "Shipping",
    rest: " happens every single week.",
    body: "Working software on a staging URL you can click, then monitoring, documentation and handover so your team owns what we built.",
  },
];

/** Project brief card with deliverables and stack — shown in the first stages. */
function ProfileCard() {
  return (
    <div className="w-[300px] rounded-2xl border border-white/10 bg-[#0d1117] p-5 shadow-2xl sm:w-[360px]">
      <div className="flex items-center gap-3.5">
        <div className="h-12 w-12 shrink-0 rounded-full bg-gradient-to-br from-[#4b6d8c] to-[#22303d]" />
        <div>
          <p className="text-[16px] font-semibold text-white">Theliv</p>
          <p className="text-[12.5px] text-white/55">Investment Platform</p>
        </div>
      </div>

      <div className="mt-5 border-t border-white/10 pt-4">
        <p className="text-[12.5px] font-semibold text-white">Milestones</p>
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          {["Discovery & scope", "Portfolio dashboard"].map((milestone, index) => (
            <div
              key={milestone}
              className="rounded-lg border border-white/10 bg-black/40 p-2.5"
            >
              <p className="text-[9.5px] leading-tight text-white/75">
                {milestone}
              </p>
              <div className="mt-2 h-[3px] w-full rounded-full bg-white/60" />
              <div className="mt-3 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-white/25" />
                <span
                  className={`h-[3px] rounded-full bg-white/25 ${index ? "w-8" : "w-10"}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 border-t border-white/10 pt-4">
        <p className="text-[12.5px] font-semibold text-white">Stack</p>
        <div className="mt-4 flex justify-around">
          {[
            { label: "Next.js", stars: 3 },
            { label: "Node.js", stars: 3 },
            { label: "MongoDB", stars: 2 },
          ].map((badge) => (
            <div
              key={badge.label}
              data-badge
              className="flex flex-col items-center gap-1.5"
            >
              <div className="flex h-14 w-12 items-center justify-center bg-[#171c23] [clip-path:polygon(50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%)]">
                <span className="text-[7.5px] text-white/70">{badge.label}</span>
              </div>
              <div className="flex gap-0.5">
                {[0, 1, 2].map((star) => (
                  <span
                    key={star}
                    className={`text-[8px] ${star < badge.stars ? "text-[#f5c451]" : "text-white/20"}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Kanban task card reused by the delivery board. */
function TaskCard({ title, owner, dates, dim = false }) {
  return (
    <div className={`rounded-lg bg-[#1b2432] p-3.5 ${dim ? "opacity-45" : ""}`}>
      <p className="text-[13px] leading-snug text-white">{title}</p>
      <div className="mt-2.5 flex items-center gap-2">
        <span className="inline-flex items-center gap-1 rounded bg-white/10 px-1.5 py-1 text-[10px] text-white/85">
          <span className="text-hr-green">✦</span> Staging
        </span>
        <span className="inline-flex items-center gap-1 rounded bg-white/10 px-1.5 py-1 text-[10px] text-white/85">
          <span className="h-3 w-3 rounded-full bg-[#e0a33c]" /> {owner}
        </span>
      </div>
      <p className="mt-2.5 text-[10px] text-white/45">{dates}</p>
    </div>
  );
}

/** Backlog → Shipped board — shown in the final stage. */
function DelegationBoard() {
  return (
    <div className="relative w-[300px] sm:w-[420px]">
      <div
        data-board="backlog"
        className="w-[240px] rounded-xl bg-[#141c28] p-3.5 shadow-2xl sm:w-[290px]"
      >
        <div className="mb-3 flex items-center justify-between px-1">
          <p className="text-[12.5px] text-white/80">Backlog</p>
          <span className="text-white/45" aria-hidden="true">
            ···
          </span>
        </div>
        <TaskCard
          title="Payment gateway and checkout flow"
          owner="Weberzio"
          dates="Sprint 3"
          dim
        />
      </div>

      <div
        data-board="delegated"
        className="relative -mt-6 ml-auto w-[250px] rounded-xl bg-[#141c28] p-3.5 shadow-2xl sm:w-[300px]"
      >
        <div className="mb-3 flex items-center justify-between px-1">
          <p className="text-[12.5px] text-white/80">Shipped</p>
          <span className="text-white/45" aria-hidden="true">
            ···
          </span>
        </div>
        <div className="space-y-2.5">
          <TaskCard
            title="Payment gateway and checkout flow"
            owner="Weberzio"
            dates="Sprint 3"
          />
          <TaskCard
            title="Multi-tenant access control"
            owner="Weberzio"
            dates="Sprint 2"
            dim
          />
        </div>
      </div>

      <div data-board="arrow" className="absolute -left-4 bottom-4 sm:-left-10">
        <p className="-rotate-12 text-[15px] italic text-white/85">
          Shipped weekly
        </p>
        <svg viewBox="0 0 90 24" className="mt-1 w-24" fill="none" aria-hidden="true">
          <path
            data-arrow-path
            d="M2 4c22 22 62 20 84 12"
            stroke="var(--color-hr-green)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            data-arrow-head
            d="M78 12l8 4-6 5"
            stroke="var(--color-hr-green)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}

/** Photo stand-in that sits behind the floating cards. */
function PhotoPlate({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`rounded-2xl bg-gradient-to-br from-[#c8c3ba] via-[#9aa3a8] to-[#5d6a72] ${className}`}
    />
  );
}

export default function ChangingDev() {
  const root = useRef(null);

  useEffect(() => {
    const context = gsap.context((self) => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const panel = self.selector("[data-panel]")[0];
      const statements = self.selector("[data-statement]");
      const bodies = self.selector("[data-body]");

      // Reduced motion: land on the final state without pinning the viewport.
      if (reduced) {
        gsap.set(panel, { backgroundColor: "#000000" });
        gsap.set(statements, { opacity: 1 });
        gsap.set(bodies, { opacity: 1, y: 0 });
        gsap.set(self.selector("[data-heading]"), { opacity: 0 });
        gsap.set(self.selector("[data-visual='profile']"), { display: "none" });
        gsap.set(self.selector("[data-visual='board']"), { opacity: 1, display: "flex" });
        return;
      }

      // Statements start dim; each one lights up as its stage arrives.
      gsap.set(statements, { opacity: 0.22 });
      gsap.set(bodies, { opacity: 0, y: 8 });
      gsap.set(self.selector("[data-visual='board']"), { opacity: 0 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        },
        defaults: { ease: "none" },
      });

      // --- Stage 1 -------------------------------------------------------
      timeline
        .to(statements[0], { opacity: 1, duration: 0.4 }, 0)
        .to(bodies[0], { opacity: 1, y: 0, duration: 0.4 }, 0)
        .from(
          self.selector("[data-visual='profile']"),
          { opacity: 0, y: 40, duration: 0.6 },
          0
        )
        .from(
          self.selector("[data-badge]"),
          { opacity: 0, scale: 0.6, stagger: 0.08, duration: 0.4 },
          0.2
        );

      // --- Stage 1 → 2 ---------------------------------------------------
      timeline
        .to(statements[0], { opacity: 0.22, duration: 0.4 }, 1.1)
        .to(bodies[0], { opacity: 0, y: -8, duration: 0.35 }, 1.1)
        .to(statements[1], { opacity: 1, duration: 0.4 }, 1.2)
        .to(bodies[1], { opacity: 1, y: 0, duration: 0.4 }, 1.25)
        .to(
          self.selector("[data-visual='profile']"),
          { y: -30, duration: 0.9 },
          1.1
        );

      // --- Stage 2 → 3: the panel inverts to black -----------------------
      timeline
        .to(statements[1], { opacity: 0.22, duration: 0.4 }, 2.2)
        .to(bodies[1], { opacity: 0, y: -8, duration: 0.35 }, 2.2)
        .to(self.selector("[data-heading]"), { opacity: 0, duration: 0.5 }, 2.1)
        .to(panel, { backgroundColor: "#000000", duration: 0.7 }, 2.1)
        .to(statements, { color: "#ffffff", duration: 0.7 }, 2.1)
        .to(bodies, { color: "rgba(255,255,255,0.55)", duration: 0.7 }, 2.1)
        .to(
          self.selector("[data-visual='profile']"),
          { opacity: 0, y: -60, duration: 0.5 },
          2.1
        )
        .set(self.selector("[data-visual='profile']"), { display: "none" }, 2.6)
        .set(self.selector("[data-visual='board']"), { display: "flex" }, 2.6)
        .to(
          self.selector("[data-visual='board']"),
          { opacity: 1, duration: 0.4 },
          2.6
        )
        .from(
          self.selector("[data-board='backlog']"),
          { opacity: 0, x: -40, duration: 0.5 },
          2.65
        )
        .from(
          self.selector("[data-board='delegated']"),
          { opacity: 0, x: 40, y: 20, duration: 0.5 },
          2.75
        )
        .from(
          self.selector("[data-board='arrow']"),
          { opacity: 0, scale: 0.8, duration: 0.4 },
          2.9
        )
        .to(statements[2], { opacity: 1, duration: 0.4 }, 2.5)
        .to(bodies[2], { opacity: 1, y: 0, duration: 0.4 }, 2.55);
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section id="changing" ref={root} className="relative h-[340vh] scroll-mt-16">
      <div
        data-panel
        /*
         * Sticks to the frame's top edge (--frame-gap), not the logo tab's
         * depth. The tab and the nav notch each cut 78px deep, but only at
         * the far left and far right — across the middle run the panel's top
         * edge is at --frame-gap. Sticking at --frame-top left a white band
         * in that middle region, painting outside the frame's punch-out.
         */
        className="sticky top-[var(--frame-gap)] flex h-[calc(100dvh-var(--frame-gap)*2)] flex-col overflow-hidden rounded-[var(--frame-radius)] bg-white px-5 pb-12 pt-[calc(var(--frame-top)-var(--frame-gap)+2rem)] sm:px-8"
      >
        <h2
          data-heading
          className="text-center text-[30px] font-semibold leading-tight tracking-tight sm:text-[42px]"
        >
          <span className="text-[#22c55e]">How We</span>
          <br />
          <span className="text-neutral-700">Build Software</span>
        </h2>

        <div className="mx-auto mt-10 grid w-full max-w-6xl flex-1 items-center gap-10 lg:grid-cols-2">
          {/* Statement column — the active line is legible, the rest recede. */}
          <div className="space-y-10 sm:space-y-14">
            {STAGES.map((item) => (
              <div key={item.id}>
                <p
                  data-statement
                  className="text-[22px] font-semibold leading-snug tracking-tight text-neutral-800 sm:text-[28px]"
                >
                  <span className="text-[#22c55e]">{item.lead}</span>
                  {item.rest}
                </p>
                <p
                  data-body
                  className="mt-3 max-w-sm font-body text-[14px] leading-relaxed text-neutral-500"
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          {/* Visual column — swaps as the statements advance. */}
          <div className="relative hidden min-h-[400px] items-center justify-center lg:flex">
            <div data-visual="profile" className="absolute">
              <PhotoPlate className="h-[300px] w-[260px]" />
              <div className="absolute -bottom-16 -right-24">
                <ProfileCard />
              </div>
            </div>

            <div data-visual="board" className="absolute hidden items-center gap-6">
              <DelegationBoard />
              <PhotoPlate className="hidden h-[320px] w-[240px] xl:block" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
