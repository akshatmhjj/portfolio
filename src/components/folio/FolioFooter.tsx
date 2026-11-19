"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

type LinkItem = { name: string; href: string };

// The crowd: simple blob "visitors" drawn in code. Heights, shapes and colours vary.
type Visitor = { w: number; h: number; shape: "arch" | "blob" | "round" | "tall" | "drop"; color: string; eyeY: number; gap: number };
const CROWD: Visitor[] = [
  { w: 92, h: 120, shape: "arch", color: "#7aa2ff", eyeY: 52, gap: 0 },
  { w: 78, h: 96, shape: "blob", color: "#ffb454", eyeY: 42, gap: -14 },
  { w: 70, h: 150, shape: "tall", color: "var(--vis-n)", eyeY: 44, gap: -10 },
  { w: 96, h: 96, shape: "round", color: "#5ef2c0", eyeY: 46, gap: -16 },
  { w: 80, h: 132, shape: "drop", color: "#b794ff", eyeY: 62, gap: -12 },
  { w: 88, h: 108, shape: "arch", color: "#ff8a6b", eyeY: 50, gap: -14 },
  { w: 74, h: 140, shape: "tall", color: "#7aa2ff", eyeY: 42, gap: -10 },
  { w: 92, h: 92, shape: "round", color: "var(--vis-n)", eyeY: 44, gap: -16 },
  { w: 82, h: 118, shape: "blob", color: "#b794ff", eyeY: 48, gap: -14 },
  { w: 76, h: 128, shape: "drop", color: "#ffb454", eyeY: 60, gap: -12 },
  { w: 90, h: 104, shape: "arch", color: "#5ef2c0", eyeY: 50, gap: -14 },
  { w: 72, h: 146, shape: "tall", color: "#ff8a6b", eyeY: 42, gap: -10 },
];

function body(v: Visitor) {
  const { w, h } = v;
  const r = w / 2;
  switch (v.shape) {
    case "arch":
      return `M0 ${h} V${r} A${r} ${r} 0 0 1 ${w} ${r} V${h} Z`;
    case "round":
      return `M${r} 0 a${r} ${r} 0 1 0 0.01 0 Z`;
    case "tall":
      return `M0 ${h} V${r} A${r} ${r} 0 0 1 ${w} ${r} V${h} Z`;
    case "drop":
      return `M${r} 0 C${r + 8} ${h * 0.28} ${w} ${h * 0.42} ${w} ${h * 0.66} A${r} ${r} 0 0 1 0 ${h * 0.66} C0 ${h * 0.42} ${r - 8} ${h * 0.28} ${r} 0 Z`;
    default:
      return `M0 ${h} V28 Q0 0 28 0 H${w - 28} Q${w} 0 ${w} 28 V${h} Z`;
  }
}

/** Big black footer: who/where, links, email, a giant name and a crowd of visitors whose eyes follow you. */
export function FolioFooter({
  name,
  email,
  links,
  year,
}: {
  name: string;
  email: string;
  links: LinkItem[];
  year: number;
}) {
  const crowd = useRef<HTMLDivElement>(null);

  // pupils look toward the pointer
  useEffect(() => {
    const el = crowd.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let px = 0;
    let py = 0;
    const update = () => {
      raf = 0;
      el.querySelectorAll<HTMLElement>("[data-eyes]").forEach((eyes) => {
        const r = eyes.getBoundingClientRect();
        const dx = px - (r.left + r.width / 2);
        const dy = py - (r.top + r.height / 2);
        const d = Math.hypot(dx, dy) || 1;
        const k = Math.min(1, d / 220) * 4.2;
        eyes.style.setProperty("--ex", `${((dx / d) * k).toFixed(2)}px`);
        eyes.style.setProperty("--ey", `${((dy / d) * k).toFixed(2)}px`);
      });
    };
    const move = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!raf) raf = requestAnimationFrame(update);
    };
    addEventListener("pointermove", move, { passive: true });
    return () => {
      removeEventListener("pointermove", move);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const hop = (e: React.PointerEvent<HTMLDivElement>) => {
    const t = e.currentTarget;
    t.classList.remove("hop");
    void t.offsetWidth;
    t.classList.add("hop");
  };

  return (
    <footer className="fo-site-foot">
      <div className="fo-sf-top">
        <div className="fo-sf-id">
          <b>{name.split(" ")[0]}.</b>
          <span>Software Engineer.</span>
          <span>Web, iOS &amp; AI.</span>
        </div>
        <nav className="fo-sf-nav" aria-label="Footer">
          <span className="mono">Explore</span>
          <Link href="/#stack">Tools</Link>
          <Link href="/#work">Projects</Link>
          <Link href="/#path">Journey</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
        <div className="fo-sf-touch">
          <span className="mono">Get in touch</span>
          <a className="fo-sf-mail" href={`mailto:${email}`}>
            {email} <i aria-hidden="true">↗</i>
          </a>
          <div className="fo-sf-links">
            {links.map((l) => (
              <a key={l.name} href={l.href} target="_blank" rel="noopener noreferrer">
                {l.name} ↗<span className="sr"> (opens in a new tab)</span>
              </a>
            ))}
          </div>
          <span className="fo-sf-copy mono">© {year} {name}</span>
        </div>
      </div>

      <div className="fo-sf-bye">
        <b>See you around.</b>
        <a href="#top" onClick={(e) => { e.preventDefault(); scrollTo({ top: 0, behavior: "smooth" }); }}>
          Back to top <i aria-hidden="true">↑</i>
        </a>
      </div>

      <div className="fo-sf-stage">
        <div className="fo-sf-word" aria-hidden="true">
          AKSHAT.
        </div>
        <div className="fo-sf-crowd" ref={crowd} aria-hidden="true">
          {CROWD.map((v, i) => (
            <div
              key={i}
              className="fo-vis"
              onPointerEnter={hop}
              onPointerDown={hop}
              style={{ "--w": v.w, "--gap": `${v.gap}px`, "--i": i, width: `calc(var(--u) * ${v.w})`, marginLeft: `calc(var(--u) * ${v.gap})` } as CSSProperties}
            >
              <svg viewBox={`0 0 ${v.w} ${v.h}`} width="100%" style={{ display: "block" }}>
                <path d={body(v)} style={{ fill: v.color }} />
                <g data-eyes className="fo-eyes" transform={`translate(${v.w / 2} ${v.eyeY})`}>
                  {[-14, 14].map((x) => (
                    <g key={x} transform={`translate(${x} 0)`}>
                      <circle r="11" fill="#fff" />
                      <circle r="5" fill="#0c0d10" className="fo-pupil" />
                    </g>
                  ))}
                </g>
              </svg>
            </div>
          ))}
        </div>
        <p className="fo-sf-cap mono">Finally, some traffic. <b>200 OK</b>: you made it to the bottom.</p>
      </div>
    </footer>
  );
}
