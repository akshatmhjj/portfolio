"use client";

import { useEffect, useState } from "react";

const BUILDS = [
  "retrieval pipelines that cite their sources.",
  "evaluation harnesses that score every answer.",
  "web and iOS apps people actually use.",
];

/** Live clock for Bengaluru (Asia/Kolkata). Shows a dash until the page has loaded in the browser. */
function useBengaluruTime() {
  const [t, setT] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-IN", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: "Asia/Kolkata" });
    const tick = () => setT(fmt.format(new Date()).toUpperCase());
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);
  return t;
}

/** The intro: a big greeting, one line about the work, and a ruled "spec sheet" of quick facts. */
export function Intro() {
  const time = useBengaluruTime();
  const [w, setW] = useState(0);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setW((i) => (i + 1) % BUILDS.length), 3000);
    return () => clearInterval(id);
  }, []);

  // Location and employer are separate facts: the city is where Akshat lives, not where his employer is.
  const rows: [string, React.ReactNode][] = [
    ["Based in", <>Bengaluru, India <span className="fo-time mono">{time ?? "--:--"}</span></>],
    ["Now", <>Software Engineer, MLock Innovations</>],
    ["Focus", <>RAG &amp; evaluation, web and iOS products</>],
    ["Education", <>B.Tech, Computer Science Engineering, 2026</>],
    ["Speaks", <>Hindi, English, French</>],
  ];

  return (
    <section className="fo-intro">
      <div className="fo-intro-l">
        <h2>
          Hi, I&apos;m <b>Akshat.</b>
        </h2>
        <p className="fo-cycle" aria-live="polite">
          <span className="mono">I build</span>
          <span key={w} className="fo-cyc-word">{BUILDS[w]}</span>
        </p>
      </div>

      <div className="fo-intro-r">
        <p className="fo-lede">
          I work on the whole stack around AI: retrieval pipelines that cite their sources, evaluation harnesses that score
          retrieval, facts and refusals, and the web and iOS apps people use on top.
        </p>
        <dl className="fo-spec">
          {rows.map(([k, v]) => (
            <div key={k} className="fo-spec-row">
              <dt className="mono">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
