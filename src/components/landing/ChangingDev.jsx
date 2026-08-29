"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  {
    id: "discovery",
    label: "Discovery",
    lead: "Discovery",
    rest: " comes before code.",
    body: "We ask questions until the business goal is clear, not just the feature list.",
  },
  {
    id: "design",
    label: "Design",
    lead: "Design",
    rest: " turns intent into structure.",
    body: "Architecture decisions and system design happen upfront — not as an afterthought halfway through a sprint.",
  },
  {
    id: "scope",
    label: "Scope",
    lead: "Scope",
    rest: " is written down, in the open.",
    body: "An explicit plan with milestones and trade-offs — no surprises, no scope creep, and no invoices you haven't seen coming.",
  },
  {
    id: "launch",
    label: "Shipping",
    lead: "Shipping",
    rest: " happens every single week.",
    body: "Working software on a staging URL you can click, then monitoring, documentation and handover so your team owns what we built.",
  },
  {
    id: "handoff",
    label: "Handoff",
    lead: "Handoff",
    rest: " means your team owns it.",
    body: "We leave behind clean code, thorough docs, and a team that knows every line — so you're never stuck calling us at 2 a.m.",
  },
];

const ACCENTS = {
  discovery: "#e23a2e",
  design: "#e0a33c",
  scope: "#8b93f8",
  board: "#e23a2e",
};

/* ------------------------------------------------------------------ */
/*  Card chrome — shared shell so every stage card reads as one system */
/* ------------------------------------------------------------------ */

/**
 * Shell for every stage card: same width, radius, header rhythm and
 * ambient glow, so swapping between stages reads as one object changing
 * its contents rather than four unrelated panels dissolving.
 */
function CardShell({ accent, glyph, title, subtitle, children, footer }) {
  return (
    <div className="relative w-[300px] sm:w-[358px]">
      {/* Ambient wash tinted to the stage accent. */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 rounded-[32px] opacity-45 blur-2xl"
        style={{
          background: `radial-gradient(60% 60% at 50% 40%, ${accent}40, transparent 70%)`,
        }}
      />

      <div className="relative overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0d1117]/95 shadow-[0_28px_70px_-24px_rgba(0,0,0,0.85)] backdrop-blur-sm">
        {/* Hairline of stage colour along the top edge. */}
        <div
          aria-hidden="true"
          className="h-px w-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          }}
        />

        <div className="p-5">
          <div className="flex items-center gap-3.5">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border"
              style={{
                borderColor: `${accent}38`,
                background: `linear-gradient(145deg, ${accent}26, transparent)`,
                color: accent,
              }}
            >
              {glyph}
            </div>
            <div className="min-w-0">
              <p className="truncate text-[15px] font-semibold text-white">
                {title}
              </p>
              <p className="truncate text-[12px] text-white/45">{subtitle}</p>
            </div>
          </div>

          <div className="mt-4 border-t border-white/[0.08] pt-4">{children}</div>

          {footer ? (
            <div className="mt-4 border-t border-white/[0.08] pt-4">{footer}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/* Line glyphs instead of emoji, which render inconsistently across
   platforms and sit awkwardly against the type. */

function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M16 16l4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function IconLayers() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <path
        d="M12 3l8.5 4.5L12 12 3.5 7.5 12 3z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M4 12.5l8 4.2 8-4.2M4 16.8l8 4.2 8-4.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconRoute() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <circle cx="6" cy="6" r="2.6" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="18" cy="18" r="2.6" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M8.6 6H14a3.4 3.4 0 010 6.8h-4A3.4 3.4 0 006.6 16v-.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Stage cards                                                        */
/* ------------------------------------------------------------------ */

/** Discovery: the questions asked before any code is written. */
function DiscoveryCard() {
  const questions = [
    { q: "Who is the primary user?", a: "Fund managers & retail investors" },
    { q: "What problem are we solving?", a: "Real-time portfolio visibility" },
    { q: "What does success look like?", a: "Daily active users + AUM growth" },
  ];

  return (
    <CardShell
      accent={ACCENTS.discovery}
      glyph={<IconSearch />}
      title="Discovery Brief"
      subtitle="Interview notes"
      footer={
        <>
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-white/45">Questions answered</span>
            <span className="text-[11px] font-medium text-white/70">3 of 8</span>
          </div>
          <div className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full"
              style={{ width: "37%", background: ACCENTS.discovery }}
            />
          </div>
        </>
      }
    >
      <div className="space-y-2.5">
        {questions.map((item) => (
          <div
            key={item.q}
            data-card-row
            className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-3"
          >
            <p className="text-[11px] font-semibold" style={{ color: ACCENTS.discovery }}>
              {item.q}
            </p>
            <p className="mt-1.5 text-[12px] leading-relaxed text-white/65">{item.a}</p>
          </div>
        ))}
      </div>
    </CardShell>
  );
}

/** Design: the architecture agreed before the first sprint. */
function DesignCard() {
  const layers = [
    { label: "Client", items: ["Next.js SSR", "React SPA"] },
    { label: "API", items: ["GraphQL", "REST"] },
    { label: "Data", items: ["PostgreSQL", "Redis"] },
  ];
  const stats = [
    ["4", "Services"],
    ["12", "Endpoints"],
    ["2", "Databases"],
  ];

  return (
    <CardShell
      accent={ACCENTS.design}
      glyph={<IconLayers />}
      title="System Design"
      subtitle="Architecture overview"
      footer={
        <div className="flex justify-between">
          {stats.map(([value, label]) => (
            <div key={label} className="text-center">
              <p className="text-[17px] font-bold text-white">{value}</p>
              <p className="text-[10px] text-white/40">{label}</p>
            </div>
          ))}
        </div>
      }
    >
      <div className="space-y-2.5">
        {layers.map((layer, i) => (
          <div key={layer.label} data-card-row>
            <div className="mb-1.5 flex items-center gap-2">
              <span
                className="text-[10px] font-semibold uppercase tracking-wider"
                style={{ color: ACCENTS.design }}
              >
                {layer.label}
              </span>
              <span className="h-px flex-1 bg-white/[0.08]" />
            </div>
            <div className="flex gap-2">
              {layer.items.map((item) => (
                <div
                  key={item}
                  className="flex-1 rounded-lg border border-white/[0.07] bg-white/[0.03] p-2.5 text-center"
                >
                  <span className="text-[11px] text-white/70">{item}</span>
                </div>
              ))}
            </div>
            {i < layers.length - 1 && (
              <div aria-hidden="true" className="mx-auto mt-1.5 h-2 w-px bg-white/[0.12]" />
            )}
          </div>
        ))}
      </div>
    </CardShell>
  );
}

/** Scope: milestones and budget, written down in the open. */
function ScopeCard() {
  const milestones = [
    { title: "Discovery & Scope", status: "done", week: "Week 1" },
    { title: "Core API & Auth", status: "done", week: "Week 2–3" },
    { title: "Dashboard UI", status: "active", week: "Week 4–5" },
    { title: "Testing & Launch", status: "upcoming", week: "Week 6" },
  ];

  return (
    <CardShell
      accent={ACCENTS.scope}
      glyph={<IconRoute />}
      title="Project Scope"
      subtitle="Milestones & timeline"
      footer={
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] text-white/45">Total estimated</p>
            <p className="text-[15px] font-semibold text-white">6 weeks</p>
          </div>
          <div className="rounded-lg border border-white/[0.07] bg-white/[0.04] px-3 py-1.5 text-right">
            <p className="text-[10px] text-white/45">Budget</p>
            <p className="text-[13px] font-semibold" style={{ color: ACCENTS.scope }}>
              $48k
            </p>
          </div>
        </div>
      }
    >
      <div>
        {milestones.map((m, i) => {
          const done = m.status === "done";
          const active = m.status === "active";
          return (
            <div key={m.title} data-card-row className="flex gap-3">
              <div className="flex flex-col items-center">
                <span
                  className="relative flex h-3 w-3 items-center justify-center rounded-full"
                  style={{
                    background: done
                      ? ACCENTS.discovery
                      : active
                        ? ACCENTS.scope
                        : "rgba(255,255,255,0.18)",
                  }}
                >
                  {active && (
                    <span
                      className="absolute h-3 w-3 animate-ping rounded-full opacity-60"
                      style={{ background: ACCENTS.scope }}
                    />
                  )}
                </span>
                {i < milestones.length - 1 && (
                  <div className="w-px flex-1 bg-white/[0.12]" />
                )}
              </div>
              <div className="pb-3.5">
                <p
                  className={`text-[12.5px] font-medium ${
                    m.status === "upcoming" ? "text-white/45" : "text-white"
                  }`}
                >
                  {m.title}
                </p>
                <p className="mt-0.5 text-[10.5px] text-white/35">{m.week}</p>
              </div>
            </div>
          );
        })}
      </div>
    </CardShell>
  );
}

/* ------------------------------------------------------------------ */
/*  Delivery board — stages 3-4                                        */
/* ------------------------------------------------------------------ */

/** Kanban task card reused by the delivery board. */
function TaskCard({ title, owner, dates, dim = false, shipped = false }) {
  return (
    <div
      className={`rounded-xl border border-white/[0.07] bg-white/[0.04] p-3 ${
        dim ? "opacity-40" : ""
      }`}
    >
      <p className="text-[12.5px] leading-snug text-white">{title}</p>
      <div className="mt-2.5 flex items-center gap-1.5">
        <span
          className="inline-flex items-center rounded-md px-1.5 py-1 text-[10px]"
          style={{
            background: shipped ? `${ACCENTS.discovery}1f` : "rgba(255,255,255,0.07)",
            color: shipped ? ACCENTS.discovery : "rgba(255,255,255,0.7)",
          }}
        >
          {shipped ? "Shipped" : "Staging"}
        </span>
        <span className="inline-flex items-center gap-1 rounded-md bg-white/[0.07] px-1.5 py-1 text-[10px] text-white/70">
          <span className="h-2.5 w-2.5 rounded-full bg-[#e0a33c]" />
          {owner}
        </span>
        <span className="ml-auto text-[10px] text-white/35">{dates}</span>
      </div>
    </div>
  );
}

/** Backlog → Shipped board — shown in the final stages. */
function DelegationBoard() {
  return (
    <div className="relative w-[300px] sm:w-[358px]">
      <div
        aria-hidden="true"
        className="absolute -inset-6 rounded-[32px] opacity-40 blur-2xl"
        style={{
          background: `radial-gradient(60% 60% at 50% 40%, ${ACCENTS.board}38, transparent 70%)`,
        }}
      />

      <div className="relative space-y-3">
        <div
          data-board="backlog"
          className="rounded-2xl border border-white/[0.09] bg-[#0d1117]/95 p-3.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)]"
        >
          <div className="mb-2.5 flex items-center justify-between px-0.5">
            <p className="text-[12px] font-medium text-white/70">Backlog</p>
            <span className="text-[11px] text-white/35">1</span>
          </div>
          <TaskCard
            title="Payment gateway and checkout flow"
            owner="Weberzio"
            dates="Sprint 3"
            dim
          />
        </div>

        {/* Motion cue between the two columns. */}
        <div data-board="arrow" className="flex items-center gap-2 px-1">
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" aria-hidden="true">
            <path
              d="M12 4v16m0 0l-5-5m5 5l5-5"
              stroke={ACCENTS.board}
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[11.5px] italic text-white/55">Shipped weekly</span>
          <span className="h-px flex-1 bg-white/[0.08]" />
        </div>

        <div
          data-board="delegated"
          className="rounded-2xl border border-white/[0.09] bg-[#0d1117]/95 p-3.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)]"
        >
          <div className="mb-2.5 flex items-center justify-between px-0.5">
            <p className="text-[12px] font-medium text-white/70">Shipped</p>
            <span className="text-[11px] text-white/35">2</span>
          </div>
          <div className="space-y-2.5">
            <TaskCard
              title="Payment gateway and checkout flow"
              owner="Weberzio"
              dates="Sprint 3"
              shipped
            />
            <TaskCard
              title="Multi-tenant access control"
              owner="Weberzio"
              dates="Sprint 2"
              shipped
              dim
            />
          </div>
        </div>
      </div>
    </div>
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
      const labels = self.selector("[data-rail-label]");
      const track = self.selector("[data-track]")[0];
      const rails = self.selector("[data-rail-fill]");
      const ticks = self.selector("[data-tick]");
      const discovery = self.selector("[data-visual='discovery']");
      const design = self.selector("[data-visual='design']");
      const scope = self.selector("[data-visual='scope']");
      const board = self.selector("[data-visual='board']");

      // Reduced motion: land on the final state without pinning the viewport.
      if (reduced) {
        gsap.set(panel, { backgroundColor: "#000000" });
        gsap.set(statements, { opacity: 1, color: "#ffffff" });
        gsap.set(bodies, { opacity: 1, y: 0, color: "rgba(255,255,255,0.55)" });
        gsap.set(labels, { color: "rgba(255,255,255,0.5)" });
        gsap.set(rails, { scaleY: 1 });
        gsap.set(ticks, { opacity: 1 });
        gsap.set(self.selector("[data-heading]"), { opacity: 0 });
        gsap.set([discovery, design, scope], { display: "none" });
        gsap.set(board, { opacity: 1, display: "flex" });
        // Every statement is legible at once here, and the stack is taller than
        // the panel — so let the column scroll rather than clipping the last two.
        const scroller = track?.parentElement;
        if (scroller) {
          scroller.style.overflowY = "auto";
          // Safari does not make overflow scrollers keyboard-focusable by
          // default, and this one has no focusable children — without a
          // tabindex a keyboard user could never reach the last stages.
          scroller.tabIndex = 0;
          scroller.setAttribute("role", "region");
          scroller.setAttribute("aria-label", "How we build software — process stages");
        }
        return;
      }

      /**
       * Offset that centres stage `index` inside the visible column. Measured
       * lazily at tween time so it stays correct after a resize, and clamped so
       * the track never pulls past its own ends.
       */
      const trackOffset = (index) => {
        const viewport = track?.parentElement;
        const stage = statements[index]?.closest("div");
        if (!track || !viewport || !stage) return 0;
        const raw =
          stage.offsetTop + stage.offsetHeight / 2 - viewport.clientHeight / 2;
        const max = Math.max(0, track.scrollHeight - viewport.clientHeight);
        return -Math.min(Math.max(raw, 0), max);
      };

      // Statement states: upcoming -> active -> completed. Stages activate
      // one by one and accumulate — a completed stage stays half-lit instead
      // of receding to near-invisible, so the column reads as a checklist
      // filling in rather than a single roving highlight.
      const DIM_UPCOMING = 0.16;
      const DIM_DONE = 0.5;
      gsap.set(statements, { opacity: DIM_UPCOMING });
      gsap.set(bodies, { opacity: 0, y: 8 });
      gsap.set(ticks, { opacity: 0.25, scale: 0.75 });
      gsap.set(rails, { scaleY: 0, transformOrigin: "top center" });
      gsap.set([design, scope, board], { opacity: 0 });
      // Stage 0 starts already centred, so later stages only ever slide upward.
      gsap.set(track, { y: () => trackOffset(0) });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          // Re-evaluate function-based values (trackOffset) after a resize,
          // so the active statement re-centres against the new panel height.
          invalidateOnRefresh: true,
        },
        defaults: { ease: "none" },
      });

      /**
       * Swap one stage card for the next. The outgoing card lifts and
       * shrinks while the incoming one rises into the same spot, so the
       * two read as a single object being replaced rather than two
       * panels dissolving over each other.
       */
      const swapVisual = (from, to, at) => {
        timeline
          .to(from, { opacity: 0, y: -26, scale: 0.96, duration: 0.4 }, at)
          .set(from, { display: "none" }, at + 0.4)
          .set(to, { display: "block" }, at + 0.4)
          .fromTo(
            to,
            { opacity: 0, y: 34, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power2.out" },
            at + 0.4
          )
          .from(
            to[0].querySelectorAll("[data-card-row]"),
            { opacity: 0, y: 12, stagger: 0.05, duration: 0.35, ease: "power2.out" },
            at + 0.55
          );
      };

      /** Light the active step on the rail and fill the segment below it. */
      const advanceRail = (index, at) => {
        if (ticks[index]) {
          timeline.to(
            ticks[index],
            { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" },
            at
          );
        }
        if (rails[index]) {
          timeline.to(rails[index], { scaleY: 1, duration: 0.55 }, at);
        }
      };

      /** Bring a statement forward; dim whichever one preceded it. */
      const focusStatement = (index, at) => {
        if (index > 0) {
          timeline
            .to(statements[index - 1], { opacity: DIM_DONE, duration: 0.35 }, at - 0.1)
            .to(bodies[index - 1], { opacity: 0, y: -8, duration: 0.3 }, at - 0.1);
        }
        timeline
          .to(statements[index], { opacity: 1, duration: 0.35 }, at)
          .to(bodies[index], { opacity: 1, y: 0, duration: 0.35 }, at + 0.05)
          .to(
            track,
            { y: () => trackOffset(index), duration: 0.5, ease: "power2.inOut" },
            at - 0.05
          );
        advanceRail(index, at);
      };

      // --- Stage 0: Discovery -------------------------------------------------
      timeline
        .to(statements[0], { opacity: 1, duration: 0.4 }, 0)
        .to(bodies[0], { opacity: 1, y: 0, duration: 0.4 }, 0)
        .from(
          discovery,
          { opacity: 0, y: 44, scale: 0.96, duration: 0.6, ease: "power2.out" },
          0
        )
        .from(
          self.selector("[data-visual='discovery'] [data-card-row]"),
          { opacity: 0, y: 14, stagger: 0.07, duration: 0.4, ease: "power2.out" },
          0.2
        );
      advanceRail(0, 0.1);

      // --- Stage 0 → 1: Design ------------------------------------------------
      swapVisual(discovery, design, 0.85);
      focusStatement(1, 0.95);

      // --- Stage 1 → 2: Scope -------------------------------------------------
      // Swaps are spaced so a card's exit never starts until its entrance
      // (including the row stagger) has fully finished — overlapping tweens on
      // the same target capture mid-animation start values and make the card's
      // peak brightness depend on scroll speed.
      swapVisual(design, scope, 1.95);
      focusStatement(2, 2.05);

      // --- Stage 2 → 3: Shipping — panel inverts to black ---------------------
      timeline
        .to(self.selector("[data-heading]"), { opacity: 0, y: -20, duration: 0.5 }, 3.1)
        .to(panel, { backgroundColor: "#000000", duration: 0.7 }, 3.1)
        .to(statements, { color: "#ffffff", duration: 0.7 }, 3.1)
        .to(bodies, { color: "rgba(255,255,255,0.55)", duration: 0.7 }, 3.1)
        .to(labels, { color: "rgba(255,255,255,0.5)", duration: 0.7 }, 3.1)
        .to(
          self.selector("[data-rail-track]"),
          { backgroundColor: "rgba(255,255,255,0.14)", duration: 0.7 },
          3.1
        );

      timeline
        .to(scope, { opacity: 0, y: -40, scale: 0.96, duration: 0.5 }, 3.15)
        .set(scope, { display: "none" }, 3.65)
        .set(board, { display: "flex" }, 3.65)
        .to(board, { opacity: 1, duration: 0.4 }, 3.65)
        .fromTo(
          self.selector("[data-board='backlog']"),
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
          3.7
        )
        .fromTo(
          self.selector("[data-board='arrow']"),
          { opacity: 0, scaleX: 0.7 },
          { opacity: 1, scaleX: 1, duration: 0.35, ease: "power2.out" },
          3.85
        )
        .fromTo(
          self.selector("[data-board='delegated']"),
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
          3.95
        );
      focusStatement(3, 3.55);

      // --- Stage 3 → 4: Handoff -----------------------------------------------
      focusStatement(4, 4.5);
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section id="changing" ref={root} className="relative h-[440vh] scroll-mt-16">
      <div
        data-panel
        className="sticky top-[var(--frame-gap)] flex h-[calc(100dvh-var(--frame-gap)*2)] flex-col overflow-hidden bg-white px-5 pb-12 pt-[calc(var(--frame-top)-var(--frame-gap)+2rem)] sm:px-8"
      >
        <div data-heading className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 font-body text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-500">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e23a2e]" />
            Our process
          </span>
          <h2 className="mt-4 text-[30px] font-semibold leading-tight tracking-tight sm:text-[42px]">
            <span className="text-[#e23a2e]">How We</span>
            <br />
            <span className="text-neutral-700">Build Software</span>
          </h2>
        </div>

        <div className="mx-auto mt-8 grid w-full min-h-0 max-w-6xl flex-1 grid-rows-1 items-stretch gap-10 lg:grid-cols-2">
          {/* Statement column — a progress rail marks how far the story has run.
              `min-h-0` lets this column stay inside the grid row instead of
              inflating it; without it the stacked stages force the row far past
              the panel and the visual column inherits that height. */}
          {/* `self-stretch` + inset-0 bounds this viewport to the grid row; without
              it the wrapper grows to the track's own height and there is nothing
              to scroll the active stage into. */}
          <div className="relative min-h-0 self-stretch">
            <div className="absolute inset-0 overflow-hidden">
            {/* Rail and statements share one translated track so the active stage
                is always centred in view — the five stages together are taller
                than the pinned panel, so a static column would bury the later
                ones below the fold. */}
            <div data-track className="flex gap-5 sm:gap-6">
            <div
              aria-hidden="true"
              className="relative flex w-3 shrink-0 flex-col items-center pt-6"
            >
              {STAGES.map((item, i) => (
                <div
                  key={item.id}
                  className={`flex w-full flex-col items-center ${
                    i < STAGES.length - 1 ? "flex-1" : ""
                  }`}
                >
                  <span
                    data-tick
                    className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#e23a2e]"
                  />
                  {i < STAGES.length - 1 && (
                    <div
                      data-rail-track
                      className="relative my-1.5 w-px flex-1 bg-neutral-200"
                    >
                      <span
                        data-rail-fill
                        className="absolute inset-0 block bg-[#e23a2e]"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex-1 space-y-8 sm:space-y-11">
              {STAGES.map((item, i) => (
                <div key={item.id}>
                  <p
                    data-rail-label
                    className="mb-1.5 font-body text-[10.5px] font-semibold uppercase tracking-[0.16em] text-neutral-400"
                  >
                    {String(i + 1).padStart(2, "0")} — {item.label}
                  </p>
                  <p
                    data-statement
                    className="text-[21px] font-semibold leading-snug tracking-tight text-neutral-800 sm:text-[27px]"
                  >
                    <span className="text-[#e23a2e]">{item.lead}</span>
                    {item.rest}
                  </p>
                  <p
                    data-body
                    className="mt-2.5 max-w-sm font-body text-[14px] leading-relaxed text-neutral-500"
                  >
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
            </div>
            </div>
          </div>

          {/* Visual column — one card per stage, then the board for shipping/handoff.
              The statement column runs taller than the panel, and a stretched grid
              item would inherit that height and push the centred cards off-screen.
              Pinning the stage with absolute inset-0 keeps it the size of the grid
              row, so the cards centre against what is actually visible. */}
          {/* `self-stretch` is required: a `hidden lg:block` grid item collapses to
              zero height, leaving the absolutely-positioned stage below nothing to
              resolve `inset-0` against — which drops the cards past the panel's
              clipped bottom edge. Stretching pins it to the grid row instead. */}
          <div className="relative hidden self-stretch lg:block">
            {/* On short viewports the tallest card exceeds the row, so the stage
                scales down proportionally rather than being clipped. The zoom var
                is set in globals.css via a max-height media query; GSAP only ever
                touches the cards inside, so the two transforms never collide. */}
            <div
              data-stage
              className="absolute inset-0 flex origin-center items-center justify-center"
            >
              <div data-visual="discovery" className="absolute">
                <DiscoveryCard />
              </div>

              <div data-visual="design" className="absolute hidden">
                <DesignCard />
              </div>

              <div data-visual="scope" className="absolute hidden">
                <ScopeCard />
              </div>

              <div
                data-visual="board"
                className="absolute hidden items-center justify-center"
              >
                <DelegationBoard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
