"use client";

import Link from "next/link";
import { useState } from "react";
import type { CSSProperties } from "react";
import { ProjectArt } from "./ProjectArt";
import { MetricValue, Rv } from "./ui";
import { useQueryVariant } from "./variants";

export type WorkItem = {
  slug: string;
  title: string;
  summary: string;
  image: string;
  year: number;
  badge?: string;
  badgeColor?: string;
  role?: string;
  layer: "data" | "ai";
  accent: string;
  metrics: { value: string; label: string }[];
  stack: string[];
};

const cssVar = (v: Record<string, string>) => v as CSSProperties;

/**
 * The /work list. `?work=` picks a layout to compare:
 *  0 current grid · 1 bento (first project as a feature) · 2 layer filter · 3 compact rows
 */
export function WorkList({ items }: { items: WorkItem[] }) {
  const variant = useQueryVariant("work", "0");
  const [filter, setFilter] = useState<"all" | "ai" | "data">("all");

  const shown = variant === "2" && filter !== "all" ? items.filter((i) => i.layer === filter) : items;
  const count = (f: "all" | "ai" | "data") => (f === "all" ? items.length : items.filter((i) => i.layer === f).length);

  return (
    <>
      {variant === "2" && (
        <div className="wf-chips" role="group" aria-label="Filter projects">
          {(["all", "ai", "data"] as const).map((f) => (
            <button key={f} className={`pill ${filter === f ? "on" : ""}`} aria-pressed={filter === f} onClick={() => setFilter(f)}>
              {f === "all" ? "All" : f === "ai" ? "AI" : "Data"} <span className="mono">{count(f)}</span>
            </button>
          ))}
        </div>
      )}

      <div className={`wk-grid v${variant}`}>
        {shown.map((p, i) => {
          const key = `${filter}-${p.slug}`;
          if (variant === "3") {
            const top = p.metrics[0];
            return (
              <Rv key={key} delay={(i % 2) * 0.1} style={cssVar({ "--c": p.accent })}>
                <Link href={`/work/${p.slug}`} className="card ctile" data-art-host>
                  <div className="cardimg">
                    <ProjectArt slug={p.slug} title={p.title} image={p.image} />
                  </div>
                  <div className="ct-body">
                    <div className="ct-top">
                      <h2 className="wt">{p.title}</h2>
                      {p.badge && (
                        <span className="badge" style={cssVar({ "--bd": p.badgeColor ?? "var(--c4)" })}>
                          {p.badge}
                        </span>
                      )}
                    </div>
                    {top && (
                      <div className="ct-metric">
                        <b>
                          <MetricValue value={top.value} />
                        </b>
                        <span>{top.label}</span>
                      </div>
                    )}
                  </div>
                  <span className="wgo" aria-hidden>
                    →
                  </span>
                </Link>
              </Rv>
            );
          }

          const feature = variant === "1" && i === 0;
          return (
            <Rv key={key} delay={(i % 2) * 0.1} style={cssVar({ "--c": p.accent })} className={feature ? "feature" : ""}>
              <Link href={`/work/${p.slug}`} className="card wcard" data-art-host>
                <div className="cardimg">
                  <ProjectArt slug={p.slug} title={p.title} image={p.image} />
                </div>
                <div className="wtext">
                  <div className="crow">
                    <span className="mono">PROJECT · {p.year}</span>
                    {p.badge && (
                      <span className="badge" style={cssVar({ "--bd": p.badgeColor ?? "var(--c4)" })}>
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <h2 className="wt">{p.title}</h2>
                  {p.role && <div className="role">{p.role}</div>}
                  <p className="wsum">{p.summary}</p>
                  <div className="mx">
                    {p.metrics.map((x) => (
                      <div className="m" key={x.label}>
                        <b>
                          <MetricValue value={x.value} />
                        </b>
                        <span>{x.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="chips">
                    {p.stack.map((s) => (
                      <span className="chip" key={s}>
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="wgo">
                    Read the case study <span aria-hidden>→</span>
                  </div>
                </div>
              </Link>
            </Rv>
          );
        })}
      </div>
    </>
  );
}
