"use client";

import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";

/* ----------------------------------------------------------------------------
   Animated illustrations that replace the project screenshots.
   - Idle: a complete, still scene.
   - Hover/focus of the nearest `[data-art-host]` (or the art itself): a short
     scripted animation that loops while it stays hovered, and resets on leave.
   - Touch devices have no hover, so it plays for a few seconds when scrolled into view.
   ---------------------------------------------------------------------------- */

function usePlay(ref: RefObject<HTMLElement | null>) {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const host = (el.closest("[data-art-host]") as HTMLElement | null) ?? el;
    const on = () => setPlay(true);
    const off = () => setPlay(false);
    const touchOnly = window.matchMedia("(hover: none)").matches;

    // Pointer/focus handlers only where a real hover exists; on touch screens the
    // browser also fires pointerleave while scrolling, which would cancel the play.
    if (!touchOnly) {
      host.addEventListener("pointerenter", on);
      host.addEventListener("pointerleave", off);
    }
    host.addEventListener("focusin", on);
    host.addEventListener("focusout", off);

    let io: IntersectionObserver | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (touchOnly && !reduce) {
      io = new IntersectionObserver(
        ([e]) => {
          clearTimeout(timer);
          if (e.isIntersecting) {
            setPlay(true);
            timer = setTimeout(() => setPlay(false), 6500);
          } else setPlay(false);
        },
        { threshold: 0.6 },
      );
      io.observe(el);
    }

    return () => {
      if (!touchOnly) {
        host.removeEventListener("pointerenter", on);
        host.removeEventListener("pointerleave", off);
      }
      host.removeEventListener("focusin", on);
      host.removeEventListener("focusout", off);
      io?.disconnect();
      clearTimeout(timer);
    };
  }, [ref]);

  return play;
}

/** Steps 0..n while `play` is true (looping with a pause); snaps back to 0 when it stops. */
function useTimeline(play: boolean, n: number, stepMs = 520, hold = 1700) {
  const [state, setState] = useState({ step: 0, loop: 0 });

  useEffect(() => {
    if (!play) {
      setState((s) => (s.step === 0 ? s : { ...s, step: 0 }));
      return;
    }
    let t: ReturnType<typeof setTimeout>;
    let step = 0;
    const tick = () => {
      step += 1;
      if (step > n) {
        t = setTimeout(() => {
          step = 0;
          setState((s) => ({ step: 0, loop: s.loop + 1 }));
          t = setTimeout(tick, 700);
        }, hold);
        return;
      }
      setState((s) => ({ ...s, step }));
      t = setTimeout(tick, stepMs);
    };
    t = setTimeout(tick, 150);
    return () => clearTimeout(t);
  }, [play, n, stepMs, hold]);

  return state;
}

type Scene = { step: number; loop: number };

/* ------------------------------ Code Journey ------------------------------ */

const CJ_NODES = [
  { x: 90, y: 200, l: "Git" },
  { x: 205, y: 150, l: "Node.js" },
  { x: 320, y: 210, l: "SQL" },
  { x: 435, y: 150, l: "APIs" },
  { x: 550, y: 200, l: "Docker" },
];
const CJ_PATH = "M90 200 C 140 200 150 150 205 150 S 270 210 320 210 S 385 150 435 150 S 500 200 550 200";

function CodeJourneyScene({ step }: Scene) {
  const lit = Math.max(0, Math.min(5, step - 1));
  const prog = lit >= 1 ? (lit - 1) / 4 : 0;
  const typed = step >= 1;
  const bubble = step >= 7;
  return (
    <svg viewBox="0 0 640 360" aria-hidden="true">
      <rect className="a-pill" x="70" y="28" width="500" height="46" rx="23" />
      <circle className="a-ico" cx="98" cy="51" r="7" />
      <path className="a-ico" d="M103 56l6 6" />
      <text className="a-m a-fade" x="122" y="56" style={{ opacity: typed ? 0 : 1 }}>
        I want to become a…
      </text>
      <text className="a-b a-fade" x="122" y="56" style={{ opacity: typed ? 1 : 0 }}>
        Backend Engineer
      </text>
      <rect className="a-acc" x="486" y="36" width="76" height="30" rx="15" />
      <text className="a-btn" x="524" y="55" textAnchor="middle">
        Find route
      </text>

      <path className="a-ln" d={CJ_PATH} />
      <path
        className="a-route"
        d={CJ_PATH}
        pathLength={100}
        style={{ strokeDasharray: 100, strokeDashoffset: 100 - prog * 100 }}
      />
      {CJ_NODES.map((n, i) => (
        <g key={n.l}>
          <circle className={`a-node ${i === 0 ? "cur" : ""} ${lit >= i + 1 ? "on" : ""}`} cx={n.x} cy={n.y} r="11" />
          <text className="a-m" x={n.x} y={n.y + 34} textAnchor="middle">
            {n.l}
          </text>
        </g>
      ))}

      <g className="a-fade" style={{ opacity: bubble ? 1 : 0.5, transform: `translateY(${bubble ? 0 : 6}px)` }}>
        <rect className="a-pill" x="372" y="276" width="220" height="56" rx="16" />
        <circle className="a-acc" cx="396" cy="296" r="5" />
        <text className="a-m" x="408" y="300">
          CJ AI
        </text>
        <text className="a-t" x="388" y="321">
          Next up: Express ✓
        </text>
      </g>
      <text className="a-m" x="48" y="318">
        10 roles · ~100 skills
      </text>
    </svg>
  );
}

/* -------------------------------- Grounded -------------------------------- */

const GR = [
  { t: "Documents", s: "md · pdf" },
  { t: "Chunk+embed", s: "Chroma" },
  { t: "Retrieve", s: "cosine" },
  { t: "Guard", s: "threshold" },
  { t: "Answer", s: "cited" },
];

function GroundedScene({ step, loop }: Scene) {
  const ok = loop % 2 === 0;
  const q = ok ? "What is the refund window?" : "Who won the 2030 World Cup?";
  const p = step >= 1 ? Math.min(step - 1, 4) : 0;
  const px = 14 + p * 126 + 54;
  return (
    <svg viewBox="0 0 640 360" aria-hidden="true">
      <rect className="a-pill" x="110" y="34" width="420" height="44" rx="22" />
      <text className="a-m" x="136" y="61">
        ask
      </text>
      <text className="a-t a-fade" x="176" y="61">
        “{q}”
      </text>

      {GR.map((b, i) => {
        const x = 14 + i * 126;
        const on = step - 1 >= i && step >= 1;
        const res = i === 4 && step >= 5 ? (ok ? "good" : "bad") : "";
        return (
          <g key={b.t}>
            <rect className={`a-box ${on ? "on" : ""} ${res}`} x={x} y="130" width="108" height="70" rx="14" />
            <text className="a-bs" x={x + 54} y="161" textAnchor="middle">
              {b.t}
            </text>
            <text className="a-m" x={x + 54} y="181" textAnchor="middle">
              {b.s}
            </text>
            {i < 4 && (
              <>
                <line className="a-ln" x1={x + 108} y1="165" x2={x + 126} y2="165" />
                <polygon className="a-head" points={`${x + 121},161 ${x + 126},165 ${x + 121},169`} />
              </>
            )}
          </g>
        );
      })}

      <g className="a-slide" style={{ transform: `translate(${px}px, 165px)`, opacity: step >= 1 ? 1 : 0 }}>
        <circle className="a-pkt" r="8" />
      </g>

      <text
        className={`a-b a-fade ${ok ? "a-okt" : "a-badt"}`}
        x="378"
        y="230"
        style={{ opacity: step >= 4 ? 1 : 0 }}
      >
        {ok ? "0.82 ≥ 0.35 ✓" : "0.19 < 0.35 ✗"}
      </text>

      <g className="a-fade" style={{ opacity: step >= 5 ? 1 : 0, transform: `translateY(${step >= 5 ? 0 : 8}px)` }}>
        <rect className="a-pill" x="110" y="262" width="420" height="52" rx="16" />
        <text className={`a-b ${ok ? "a-okt" : "a-badt"}`} x="320" y="293" textAnchor="middle">
          {ok ? "30 days · [policy.md §2.1]" : "I can't answer that from your docs."}
        </text>
      </g>
    </svg>
  );
}

/* -------------------------------- Shortify -------------------------------- */

const LONG = "https://example.com/a/really/long/path?utm=portfolio";
const CODE = "aB3xK9";

function ShortifyScene({ step }: Scene) {
  const n = Math.min(6, step);
  const shown = CODE.slice(0, n) + "·".repeat(6 - n);
  return (
    <svg viewBox="0 0 640 360" aria-hidden="true">
      <text className="a-m" x="44" y="54">
        long url · 52 chars
      </text>
      <rect className="a-pill" x="40" y="64" width="560" height="46" rx="14" />
      <text className="a-t a-mono a-fade" x="62" y="92" style={{ opacity: step >= 1 ? 0.3 : 1 }}>
        {LONG}
      </text>

      <line className="a-ln" x1="320" y1="122" x2="320" y2="164" />
      <polygon className="a-head" points="315,158 320,166 325,158" />
      <text className="a-m" x="338" y="148">
        base62 · 6 chars · collision-checked
      </text>

      <rect className={`a-pill a-fade ${step >= 1 ? "hot" : ""}`} x="170" y="174" width="300" height="56" rx="28" />
      <text className="a-big" x="200" y="212">
        <tspan className="a-dim">sho.rt/</tspan>
        <tspan className="a-acct">{shown}</tspan>
      </text>

      <g>
        <rect className={`a-chip ${step >= 7 ? "on" : ""}`} x="60" y="262" width="168" height="38" rx="19" />
        <text className="a-m" x="144" y="286" textAnchor="middle">
          Redis · cache hit
        </text>
        <rect className={`a-chip ${step >= 8 ? "on" : ""}`} x="244" y="262" width="150" height="38" rx="19" />
        <text className="a-m" x="319" y="286" textAnchor="middle">
          302 redirect
        </text>
        <text
          className="a-big a-okt a-fade"
          x="470"
          y="290"
          style={{ opacity: step >= 8 ? 1 : 0.35 }}
        >
          38 ms
        </text>
      </g>
    </svg>
  );
}

/* -------------------------------- Predictye ------------------------------- */

const PE_UP = "M270 126 C 340 120 420 104 600 64";
const PE_LO = "M270 134 C 340 142 420 168 600 214";
const PE_BAND = "M270 126 C 340 120 420 104 600 64 L600 214 C 420 168 340 142 270 134 Z";
const PE_MID = "M270 130 C 340 131 420 136 600 139";

function PredictyeScene({ step }: Scene) {
  const p = step < 2 ? 0 : Math.min(1, (step - 2) / 4);
  const scan = step >= 1 && step < 3;
  return (
    <svg viewBox="0 0 640 360" aria-hidden="true">
      <rect className="a-box" x="40" y="40" width="180" height="210" rx="20" />
      <rect className="a-pill" x="96" y="108" width="68" height="14" rx="5" />
      <rect className="a-pill" x="68" y="118" width="124" height="82" rx="12" />
      <circle className="a-ring" cx="130" cy="159" r="26" />
      <circle className="a-lens" cx="130" cy="159" r="14" />
      <circle className="a-acc" cx="176" cy="132" r="4" />
      <text className="a-m" x="130" y="228" textAnchor="middle">
        photo
      </text>
      <rect
        className="a-scan a-slide"
        x="50"
        y="50"
        width="160"
        height="3"
        rx="2"
        style={{ transform: `translateY(${step >= 2 ? 178 : 0}px)`, opacity: scan ? 1 : 0 }}
      />

      <line className="a-ln" x1="250" y1="250" x2="610" y2="250" />
      <path className="a-bandfill a-fade" d={PE_BAND} style={{ opacity: step >= 7 ? 0.22 : 0.08 }} />
      <path className="a-ln" d={PE_UP} />
      <path className="a-ln" d={PE_LO} />
      <path
        className="a-route"
        d={PE_UP}
        pathLength={100}
        style={{ strokeDasharray: 100, strokeDashoffset: 100 - p * 100 }}
      />
      <path
        className="a-route"
        d={PE_LO}
        pathLength={100}
        style={{ strokeDasharray: 100, strokeDashoffset: 100 - p * 100 }}
      />
      <path className="a-mid" d={PE_MID} />
      <line
        className="a-sweep a-slide"
        x1="270"
        y1="50"
        x2="270"
        y2="250"
        style={{ transform: `translateX(${p * 330}px)`, opacity: step >= 2 && step < 7 ? 1 : 0 }}
      />

      <g className="a-fade" style={{ opacity: step >= 2 ? 1 : 0.4 }}>
        <text className="a-m" x="270" y="92">
          worth now
        </text>
        <text className="a-b" x="270" y="110">
          $540 – $780
        </text>
      </g>
      <g className="a-fade" style={{ opacity: step >= 7 ? 1 : 0, transform: `translateY(${step >= 7 ? 0 : 6}px)` }}>
        <text className="a-m" x="600" y="30" textAnchor="end">
          in 5 years
        </text>
        <text className="a-b" x="600" y="48" textAnchor="end">
          $310 – $690
        </text>
      </g>
      <text className="a-m" x="270" y="270">
        now
      </text>
      <text className="a-m" x="600" y="270" textAnchor="end">
        +5 yrs · the range widens
      </text>
    </svg>
  );
}

/* --------------------------------- wrapper -------------------------------- */

const SCENES: Record<string, { n: number; stepMs: number; Scene: (p: Scene) => React.ReactElement; label: string }> = {
  "code-journey": { n: 7, stepMs: 480, Scene: CodeJourneyScene, label: "a role roadmap lighting up skill by skill" },
  "rag-chatbot": { n: 5, stepMs: 620, Scene: GroundedScene, label: "a question flowing through a retrieve-and-guard pipeline" },
  "url-shortener": { n: 8, stepMs: 460, Scene: ShortifyScene, label: "a long link shrinking into a short code" },
  predicteye: { n: 7, stepMs: 520, Scene: PredictyeScene, label: "a value range widening over time" },
};

export function hasArt(slug: string) {
  return slug in SCENES;
}

export function ProjectArt({ slug, title, image }: { slug: string; title: string; image?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const def = SCENES[slug];
  const play = usePlay(ref);
  const { step, loop } = useTimeline(play, def?.n ?? 1, def?.stepMs);

  if (!def) {
    // Unknown project: fall back to its cover image.
    // eslint-disable-next-line @next/next/no-img-element
    return image ? <img className="cover" src={image} alt={`${title} cover`} loading="lazy" /> : null;
  }

  const { Scene } = def;
  return (
    <div ref={ref} className={`art ${play ? "playing" : ""}`} role="img" aria-label={`${title}: ${def.label}`}>
      <Scene step={step} loop={loop} />
      <span className="art-hint" aria-hidden="true">
        ▶ hover to play
      </span>
    </div>
  );
}
