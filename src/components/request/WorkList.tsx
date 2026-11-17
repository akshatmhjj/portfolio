"use client";

import Link from "next/link";
import { useState } from "react";
import type { CSSProperties } from "react";
import { ProjectArt } from "./ProjectArt";
import { MetricValue } from "./ui";

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

/**
 * The /work projects as shutter panels. One panel opens wide to show the full project;
 * the others close into thin strips with their names running up the side.
 * Hover, focus or click a strip to open it.
 */
export function WorkList({ items }: { items: WorkItem[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="sh-row" role="list" aria-label="Projects">
      {items.map((p, i) => {
        const on = i === active;
        return (
          <div
            key={p.slug}
            role="listitem"
            className={`sh-panel ${on ? "on" : ""}`}
            style={{ "--c": p.badgeColor ?? "var(--c1)" } as CSSProperties}
            onPointerEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
          >
            <button
              type="button"
              className="sh-strip"
              aria-expanded={on}
              aria-label={`${p.title}`}
              onClick={(e) => {
                e.stopPropagation();
                setActive(i);
              }}
            >
              <span className="sh-num mono">{String(i + 1).padStart(2, "0")}</span>
              <span className="sh-name">{p.title}</span>
            </button>

            <div className="sh-full" aria-hidden={!on}>
              <div className="sh-art">
                <ProjectArt slug={p.slug} title={p.title} image={p.image} />
              </div>
              <div className="sh-body">
                <div className="sh-top mono">
                  <span>PROJECT · {p.year}</span>
                  {p.badge && (
                    <span className="badge" style={{ "--bd": p.badgeColor ?? "var(--c4)" } as CSSProperties}>
                      {p.badge}
                    </span>
                  )}
                </div>
                <h2 className="sh-title">{p.title}</h2>
                {p.role && <div className="sh-role">{p.role}</div>}
                <p className="sh-sum">{p.summary}</p>
                {p.metrics[0] && (
                  <div className="sh-metric">
                    <b>
                      <MetricValue value={p.metrics[0].value} />
                    </b>
                    <span>{p.metrics[0].label}</span>
                  </div>
                )}
                <div className="chips">
                  {p.stack.slice(0, 5).map((s) => (
                    <span className="chip" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
                <Link className="sh-go" href={`/work/${p.slug}`} tabIndex={on ? 0 : -1}>
                  Read the case study <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
