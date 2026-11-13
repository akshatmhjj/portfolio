"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PROJECT_META } from "./data";
import type { ProjectData } from "./types";

/* ---------------------------- case-study drawer ---------------------------- */

export function Drawer({ project, onClose }: { project: ProjectData | null; onClose: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const meta = project ? PROJECT_META[project.slug] : undefined;

  useEffect(() => {
    if (project) ref.current?.scrollTo({ top: 0 });
  }, [project]);

  return (
    <>
      <aside ref={ref} className={`drawer ${project ? "on" : ""}`} aria-label="Case study" aria-hidden={!project}>
        {project && (
          <div className="dr-in" style={{ "--c": meta?.badgeColor || "var(--c1)" } as React.CSSProperties}>
            <div className="mono">PROJECT · {project.year}</div>
            <h2 className="h2" style={{ fontSize: "clamp(36px,6vw,56px)", margin: "10px 0 12px" }}>
              {project.title}
            </h2>
            <p className="lede" style={{ marginBottom: 20 }}>
              {project.summary}
            </p>
            <div className="mx" style={{ marginTop: 0 }}>
              {project.metrics.slice(0, 3).map((m) => (
                <div className="m" key={m.label}>
                  <b style={{ fontSize: "clamp(24px,4vw,34px)" }}>{m.value}</b>
                  <span>{m.label}</span>
                </div>
              ))}
            </div>
            {meta && (
              <>
                <div className="eyebrow">how it works</div>
                <div className="flow">
                  {meta.flow.map((f, i) => (
                    <span key={f} style={{ display: "contents" }}>
                      {i > 0 && <i>→</i>}
                      <span>{f}</span>
                    </span>
                  ))}
                </div>
              </>
            )}
            <div className="eyebrow" style={{ marginTop: 6 }}>
              stack
            </div>
            <div className="chips" style={{ marginTop: 8 }}>
              {project.stack.map((s) => (
                <span className="chip" key={s}>
                  {s}
                </span>
              ))}
            </div>
            <div className="actions">
              {project.link && (
                <a className="btn pri" href={project.link} target="_blank" rel="noopener noreferrer">
                  Live site ↗
                </a>
              )}
              {project.source && (
                <a className="btn ghost" href={project.source} target="_blank" rel="noopener noreferrer">
                  Source ↗
                </a>
              )}
              <Link className="btn ghost" href={`/work/${project.slug}`}>
                Full case study →
              </Link>
            </div>
          </div>
        )}
      </aside>
      <button className={`dr-x ${project ? "on" : ""}`} onClick={onClose} aria-label="Close case study">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" strokeWidth="2" strokeLinecap="round">
          <path d="M3 3l10 10M13 3L3 13" />
        </svg>
      </button>
    </>
  );
}

/* ---------------------------- command palette ---------------------------- */

export type PaletteItem = { label: string; kind: string; run: () => void };

export function Palette({ open, items, onClose }: { open: boolean; items: PaletteItem[]; onClose: () => void }) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQ("");
      setSel(0);
      const t = setTimeout(() => input.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [open]);

  const list = items.filter((i) => `${i.label} ${i.kind}`.toLowerCase().includes(q.toLowerCase()));
  const run = (i?: PaletteItem) => {
    if (!i) return;
    onClose();
    i.run();
  };

  return (
    <div className={`pal ${open ? "on" : ""}`} role="dialog" aria-label="Command palette" aria-hidden={!open}>
      <input
        ref={input}
        value={q}
        placeholder="Jump to a section, project, or link…"
        autoComplete="off"
        onChange={(e) => {
          setQ(e.target.value);
          setSel(0);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setSel((s) => Math.min(list.length - 1, s + 1));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSel((s) => Math.max(0, s - 1));
          } else if (e.key === "Enter") {
            e.preventDefault();
            run(list[sel]);
          }
        }}
      />
      <div className="pl">
        {list.length ? (
          list.map((it, i) => (
            <button
              key={`${it.kind}-${it.label}`}
              className={`pi ${i === sel ? "sel" : ""}`}
              onMouseEnter={() => setSel(i)}
              onClick={() => run(it)}
            >
              <span>{it.label}</span>
              <small>{it.kind}</small>
            </button>
          ))
        ) : (
          <div className="mono" style={{ padding: 16 }}>
            no matches
          </div>
        )}
      </div>
    </div>
  );
}
