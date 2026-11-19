"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { MetricValue } from "@/components/request/ui";
import { ProjectArt } from "@/components/request/ProjectArt";

export type FolioProject = {
  slug: string;
  title: string;
  summary: string;
  image: string;
  year: number;
  role: string;
  badge: string;
  stack: string[];
  metrics: { value: string; label: string }[];
  flow: string[];
  link: string;
  source: string;
};

/**
 * Projects as folders. Hovering one pulls its papers up (a headline number and the stack).
 * Opening one scrolls to a case-study panel that sits as its own section under the grid.
 */
export function ProjectIndex({ projects }: { projects: FolioProject[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const panel = useRef<HTMLDivElement>(null);
  const current = projects.find((p) => p.slug === open) ?? null;

  useEffect(() => {
    if (!open || !panel.current) return;
    const t = setTimeout(() => {
      const y = panel.current!.getBoundingClientRect().top + scrollY - 92;
      scrollTo({ top: y, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    }, 60);
    return () => clearTimeout(t);
  }, [open]);

  return (
    <div className="fo-folders">
      <div className="fo-fgrid">
        {projects.map((p, i) => {
          const on = open === p.slug;
          const m = p.metrics[0];
          return (
            <button
              key={p.slug}
              className="fo-folder"
              aria-expanded={on}
              aria-controls="fo-case"
              onClick={() => setOpen(on ? null : p.slug)}
            >
              <span className="fo-scene">
                <span className="fo-fback" aria-hidden="true" />
                <span className="fo-paper pb" aria-hidden="true">
                  <span>{p.role}</span>
                  <span className="fo-plines" />
                </span>
                <span className="fo-paper pp" aria-hidden="true">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt="" />
                  <span>Preview</span>
                </span>
                <span className="fo-paper pf" aria-hidden="true">
                  <b>{m?.value}</b>
                  <span>{m?.label}</span>
                </span>
                <span className="fo-front">
                  <span className="fo-ftitle">
                    <small className="mono">{String(i + 1).padStart(2, "0")}</small>
                    {p.title}
                  </span>
                  <span className="fo-fgo" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17 17 7M8 7h9v9" />
                    </svg>
                  </span>
                </span>
              </span>
              <span className="fo-fcap">
                <span>{p.role}</span>
                <span className="fo-fact">{on ? "Close" : "View project"} ↗</span>
              </span>
            </button>
          );
        })}
      </div>

      <div id="fo-case" ref={panel} className={`fo-case ${current ? "open" : ""}`} aria-hidden={!current}>
        <div className="fo-case-inner">
          {current && (
            <article className="fo-case-body" style={{ "--c": "var(--c1)" } as CSSProperties}>
              <div className="fo-case-bar">
                <span className="mono">Case study · {current.role}</span>
                <button className="fo-case-x mono" onClick={() => setOpen(null)}>
                  close ×
                </button>
              </div>
              <div className="fo-case-top">
                <div className="fo-case-art">
                  <ProjectArt slug={current.slug} title={current.title} image={current.image} />
                </div>
                <div>
                  <h3 className="fo-case-title">{current.title}</h3>
                  <p className="fo-sum">{current.summary}</p>
                  <div className="fo-metrics">
                    {current.metrics.map((m, k) => (
                      <div key={`${m.label}-${k}`}>
                        <b>
                          <MetricValue value={m.value} />
                        </b>
                        <span>{m.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="chips">
                    {current.stack.map((s, k) => (
                      <span className="chip" key={`${s}-${k}`}>
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="fo-links">
                    <Link href={`/work/${current.slug}`}>Full write-up →</Link>
                    {current.link && (
                      <a href={current.link} target="_blank" rel="noopener noreferrer">
                        Live site ↗<span className="sr"> (opens in a new tab)</span>
                      </a>
                    )}
                    {current.source && (
                      <a href={current.source} target="_blank" rel="noopener noreferrer">
                        Source ↗<span className="sr"> (opens in a new tab)</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          )}
        </div>
      </div>
    </div>
  );
}
