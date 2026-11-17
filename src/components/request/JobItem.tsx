"use client";

import { useId, useState } from "react";
import type { ReactNode } from "react";

/** One experience entry. Opens and closes with a smooth height animation. */
export function JobItem({
  company,
  role,
  timeframe,
  achievements,
  defaultOpen = false,
}: {
  company: string;
  role: string;
  timeframe: string;
  achievements: ReactNode[];
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();

  return (
    <div className={`job ${open ? "open" : ""}`}>
      <button
        type="button"
        className="job-head"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="jt">
          <b>{company}</b>
          <span className="role">{role}</span>
        </span>
        <span className="mono">{timeframe}</span>
        <span className="job-plus" aria-hidden="true">
          +
        </span>
      </button>
      <div id={id} className="job-panel" aria-hidden={!open}>
        <div className="job-inner">
          <ul className="plist">
            {achievements.map((a, j) => (
              <li key={j}>{a}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
