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
    id: "design",
    lead: "Design",
    rest: " turns intent into structure.",
    body: "Architecture decisions and system design happen upfront — not as an afterthought halfway through a sprint.",
  },
  {
    id: "scope",
    lead: "Scope",
    rest: " is written down, in the open.",
    body: "An explicit plan with milestones and trade-offs — no surprises, no scope creep, and no invoices you haven't seen coming.",
  },
  {
    id: "launch",
    lead: "Shipping",
    rest: " happens every single week.",
    body: "Working software on a staging URL you can click, then monitoring, documentation and handover so your team owns what we built.",
  },
  {
    id: "handoff",
    lead: "Handoff",
    rest: " means your team owns it.",
    body: "We leave behind clean code, thorough docs, and a team that knows every line — so you're never stuck calling us at 2 a.m.",
  },
];

/* ------------------------------------------------------------------ */
/*  Visual cards — one per early stage                                 */
/* ------------------------------------------------------------------ */

/** Discovery: research notes, interview questions, user insights. */
function DiscoveryCard() {
  const questions = [
    { q: "Who is the primary user?", a: "Fund managers & retail investors" },
    { q: "What problem are we solving?", a: "Real-time portfolio visibility" },
    { q: "What does success look like?", a: "Daily active users + AUM growth" },
  ];

  return (
    <div className="w-[300px] rounded-2xl border border-white/10 bg-[#0d1117] p-5 shadow-2xl sm:w-[360px]">
      <div className="flex items-center gap-3.5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#6b8a6b] to-[#2d4a2d]">
          <span className="text-[18px]">🔍</span>
        </div>
        <div>
          <p className="text-[16px] font-semibold text-white">Discovery Brief</p>
          <p className="text-[12.5px] text-white/55">Interview Notes</p>
        </div>
      </div>

      <div className="mt-5 border-t border-white/10 pt-4 space-y-3">
        {questions.map((item) => (
          <div key={item.q} className="rounded-lg border border-white/10 bg-black/40 p-3">
            <p className="text-[11px] font-semibold text-hr-green">{item.q}</p>
            <p className="mt-1.5 text-[12px] leading-relaxed text-white/70">{item.a}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 border-t border-white/10 pt-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-hr-green" />
          <span className="text-[11px] text-white/50">3 of 8 questions answered</span>
        </div>
        <div className="mt-2 h-[3px] w-full rounded-full bg-white/10">
          <div className="h-full w-[37%] rounded-full bg-hr-green" />
        </div>
      </div>
    </div>
  );
}

/** Design: architecture diagram with components and connections. */
function DesignCard() {
  const layers = [
    { label: "Client", items: ["Next.js SSR", "React SPA"] },
    { label: "API", items: ["GraphQL", "REST"] },
    { label: "Data", items: ["PostgreSQL", "Redis"] },
  ];

  return (
    <div className="w-[300px] rounded-2xl border border-white/10 bg-[#0d1117] p-5 shadow-2xl sm:w-[360px]">
      <div className="flex items-center gap-3.5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#8b6b4a] to-[#3d2d1a]">
          <span className="text-[18px]">🏗️</span>
        </div>
        <div>
          <p className="text-[16px] font-semibold text-white">System Design</p>
          <p className="text-[12.5px] text-white/55">Architecture Overview</p>
        </div>
      </div>

      <div className="mt-5 border-t border-white/10 pt-4">
        <div className="space-y-3">
          {layers.map((layer, i) => (
            <div key={layer.label}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-semibold text-[#e0a33c]">{layer.label}</span>
                {i < layers.length - 1 && (
                  <span className="text-white/20" aria-hidden="true">↓</span>
                )}
              </div>
              <div className="flex gap-2">
                {layer.items.map((item) => (
                  <div
                    key={item}
                    className="flex-1 rounded-lg border border-white/10 bg-black/40 p-2.5 text-center"
                  >
                    <span className="text-[11px] text-white/75">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 border-t border-white/10 pt-4 flex justify-between">
        <div className="text-center">
          <p className="text-[18px] font-bold text-white">4</p>
          <p className="text-[10px] text-white/40">Services</p>
        </div>
        <div className="text-center">
          <p className="text-[18px] font-bold text-white">12</p>
          <p className="text-[10px] text-white/40">Endpoints</p>
        </div>
        <div className="text-center">
          <p className="text-[18px] font-bold text-white">2</p>
          <p className="text-[10px] text-white/40">Databases</p>
        </div>
      </div>
    </div>
  );
}

/** Scope: milestones timeline with progress indicators. */
function ScopeCard() {
  const milestones = [
    { title: "Discovery & Scope", status: "done", week: "Week 1" },
    { title: "Core API & Auth", status: "done", week: "Week 2–3" },
    { title: "Dashboard UI", status: "active", week: "Week 4–5" },
    { title: "Testing & Launch", status: "upcoming", week: "Week 6" },
  ];

  return (
    <div className="w-[300px] rounded-2xl border border-white/10 bg-[#0d1117] p-5 shadow-2xl sm:w-[360px]">
      <div className="flex items-center gap-3.5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#6b6b8a] to-[#2d2d4a]">
          <span className="text-[18px]">📋</span>
        </div>
        <div>
          <p className="text-[16px] font-semibold text-white">Project Scope</p>
          <p className="text-[12.5px] text-white/55">Milestones & Timeline</p>
        </div>
      </div>

      <div className="mt-5 border-t border-white/10 pt-4">
        <div className="space-y-0">
          {milestones.map((m, i) => (
            <div key={m.title} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span
                  className={`h-3 w-3 rounded-full ${
                    m.status === "done"
                      ? "bg-hr-green"
                      : m.status === "active"
                        ? "bg-[#e0a33c]"
                        : "bg-white/20"
                  }`}
                />
                {i < milestones.length - 1 && (
                  <div className="w-px flex-1 bg-white/15" />
                )}
              </div>
              <div className="pb-4">
                <p className="text-[13px] font-medium text-white">{m.title}</p>
                <p className="mt-0.5 text-[10.5px] text-white/40">{m.week}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 pt-4 flex items-center justify-between">
        <div>
          <p className="text-[12.5px] text-white/50">Total estimated</p>
          <p className="text-[15px] font-semibold text-white">6 weeks</p>
        </div>
        <div className="rounded-lg bg-white/10 px-3 py-2">
          <p className="text-[11px] text-white/50">Budget</p>
          <p className="text-[13px] font-semibold text-hr-green">$48k</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Delivery board — stages 3-4                                        */
/* ------------------------------------------------------------------ */

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

/** Backlog → Shipped board — shown in the final stages. */
function DelegationBoard() {
  return (
    <div className="relative w-[300px] sm:w-[420px]">
      <div
        data-board="backlog"
        className="w-[240px] rounded-xl bg-[#141c28] p-3.5 shadow-2xl sm:w-[290px]"
      >
        <div className="mb-3 flex items-center justify-between px-1">
          <p className="text-[12.5px] text-white/80">Backlog</p>
          <span className="text-white/45" aria-hidden="true">···</span>
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
          <span className="text-white/45" aria-hidden="true">···</span>
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

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

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
        gsap.set(self.selector("[data-visual='discovery']"), { display: "none" });
        gsap.set(self.selector("[data-visual='design']"), { display: "none" });
        gsap.set(self.selector("[data-visual='scope']"), { display: "none" });
        gsap.set(self.selector("[data-visual='board']"), { opacity: 1, display: "flex" });
        return;
      }

      // Statements start dim; each one lights up as its stage arrives.
      gsap.set(statements, { opacity: 0.22 });
      gsap.set(bodies, { opacity: 0, y: 8 });
      gsap.set(self.selector("[data-visual='design']"), { opacity: 0 });
      gsap.set(self.selector("[data-visual='scope']"), { opacity: 0 });
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

      // --- Stage 0: Discovery -------------------------------------------------
      timeline
        .to(statements[0], { opacity: 1, duration: 0.4 }, 0)
        .to(bodies[0], { opacity: 1, y: 0, duration: 0.4 }, 0)
        .from(
          self.selector("[data-visual='discovery']"),
          { opacity: 0, y: 40, duration: 0.6 },
          0
        )
        .from(
          self.selector("[data-visual='discovery'] [data-badge]"),
          { opacity: 0, scale: 0.6, stagger: 0.08, duration: 0.4 },
          0.2
        );

      // --- Stage 0 → 1: Design — cross-fade visuals --------------------------
      timeline
        .to(statements[0], { opacity: 0.22, duration: 0.35 }, 0.8)
        .to(bodies[0], { opacity: 0, y: -8, duration: 0.3 }, 0.8)
        .to(self.selector("[data-visual='discovery']"), { opacity: 0, duration: 0.4 }, 0.8)
        .set(self.selector("[data-visual='discovery']"), { display: "none" }, 1.2)
        .set(self.selector("[data-visual='design']"), { display: "block" }, 1.2)
        .to(self.selector("[data-visual='design']"), { opacity: 1, duration: 0.4 }, 1.2)
        .to(statements[1], { opacity: 1, duration: 0.35 }, 0.9)
        .to(bodies[1], { opacity: 1, y: 0, duration: 0.35 }, 0.95);

      // --- Stage 1 → 2: Scope — cross-fade visuals ---------------------------
      timeline
        .to(statements[1], { opacity: 0.22, duration: 0.35 }, 1.6)
        .to(bodies[1], { opacity: 0, y: -8, duration: 0.3 }, 1.6)
        .to(self.selector("[data-visual='design']"), { opacity: 0, duration: 0.4 }, 1.6)
        .set(self.selector("[data-visual='design']"), { display: "none" }, 2.0)
        .set(self.selector("[data-visual='scope']"), { display: "block" }, 2.0)
        .to(self.selector("[data-visual='scope']"), { opacity: 1, duration: 0.4 }, 2.0)
        .to(statements[2], { opacity: 1, duration: 0.35 }, 1.7)
        .to(bodies[2], { opacity: 1, y: 0, duration: 0.35 }, 1.75);

      // --- Stage 2 → 3: Shipping — panel inverts to black ---------------------
      timeline
        .to(statements[2], { opacity: 0.22, duration: 0.35 }, 2.4)
        .to(bodies[2], { opacity: 0, y: -8, duration: 0.3 }, 2.4)
        .to(self.selector("[data-heading]"), { opacity: 0, duration: 0.5 }, 2.3)
        .to(panel, { backgroundColor: "#000000", duration: 0.7 }, 2.3)
        .to(statements, { color: "#ffffff", duration: 0.7 }, 2.3)
        .to(bodies, { color: "rgba(255,255,255,0.55)", duration: 0.7 }, 2.3)
        .to(
          self.selector("[data-visual='scope']"),
          { opacity: 0, y: -60, duration: 0.5 },
          2.3
        )
        .set(self.selector("[data-visual='scope']"), { display: "none" }, 2.8)
        .set(self.selector("[data-visual='board']"), { display: "flex" }, 2.8)
        .to(
          self.selector("[data-visual='board']"),
          { opacity: 1, duration: 0.4 },
          2.8
        )
        .from(
          self.selector("[data-board='backlog']"),
          { opacity: 0, x: -40, duration: 0.5 },
          2.85
        )
        .from(
          self.selector("[data-board='delegated']"),
          { opacity: 0, x: 40, y: 20, duration: 0.5 },
          2.95
        )
        .from(
          self.selector("[data-board='arrow']"),
          { opacity: 0, scale: 0.8, duration: 0.4 },
          3.1
        )
        .to(statements[3], { opacity: 1, duration: 0.35 }, 2.7)
        .to(bodies[3], { opacity: 1, y: 0, duration: 0.35 }, 2.75);

      // --- Stage 3 → 4: Handoff -----------------------------------------------
      timeline
        .to(statements[3], { opacity: 0.22, duration: 0.35 }, 3.6)
        .to(bodies[3], { opacity: 0, y: -8, duration: 0.3 }, 3.6)
        .to(statements[4], { opacity: 1, duration: 0.35 }, 3.7)
        .to(bodies[4], { opacity: 1, y: 0, duration: 0.35 }, 3.75);
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section id="changing" ref={root} className="relative h-[440vh] scroll-mt-16">
      <div
        data-panel
        className="sticky top-[var(--frame-gap)] flex h-[calc(100dvh-var(--frame-gap)*2)] flex-col overflow-hidden bg-white px-5 pb-12 pt-[calc(var(--frame-top)-var(--frame-gap)+2rem)] sm:px-8"
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

          {/* Visual column — one card per early stage, then the board for shipping/handoff. */}
          <div className="relative hidden min-h-[400px] items-center justify-center lg:flex">
            {/* Stage 0: Discovery */}
            <div data-visual="discovery" className="absolute">
              <PhotoPlate className="h-[300px] w-[260px]" />
              <div className="absolute -bottom-16 -right-24">
                <DiscoveryCard />
              </div>
            </div>

            {/* Stage 1: Design */}
            <div data-visual="design" className="absolute hidden">
              <PhotoPlate className="h-[300px] w-[260px]" />
              <div className="absolute -bottom-16 -right-24">
                <DesignCard />
              </div>
            </div>

            {/* Stage 2: Scope */}
            <div data-visual="scope" className="absolute hidden">
              <PhotoPlate className="h-[300px] w-[260px]" />
              <div className="absolute -bottom-16 -right-24">
                <ScopeCard />
              </div>
            </div>

            {/* Stages 3-4: Delivery board */}
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
