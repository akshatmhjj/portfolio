"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { HIT, LAYER_COLORS, MISS, NODE_INFO, NODE_X } from "./data";
import type { NodeKey } from "./data";

type Row = { label: string; ms: number; left: number; width: number; done: boolean; color: string };

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

const NODES: { k: NodeKey; x: number; title: string; sub: string; color: string }[] = [
  { k: "client", x: 14, title: "CLIENT", sub: "web · iOS", color: "var(--c1)" },
  { k: "api", x: 144, title: "API", sub: "REST · auth", color: "var(--c2)" },
  { k: "cache", x: 274, title: "CACHE", sub: "Redis", color: "var(--c3)" },
  { k: "db", x: 404, title: "DB", sub: "Postgres", color: "var(--c4)" },
];

/** The hero: a request travels client → API → cache → DB with a live latency waterfall. */
export default function Widget() {
  const pkt = useRef<SVGCircleElement>(null);
  const cacheOn = useRef(true);
  const warm = useRef(false);
  const busy = useRef(false);
  const touched = useRef(false);
  const curTot = useRef(0);

  const [cacheUi, setCacheUi] = useState(true);
  const [rows, setRows] = useState<Row[]>([]);
  const [tot, setTot] = useState(0);
  const [status, setStatus] = useState<ReactNode>("warming up…");
  const [sending, setSending] = useState(false);
  const [info, setInfo] = useState<NodeKey | "none">("none");
  const [lit, setLit] = useState<Partial<Record<NodeKey, string>>>({});

  const move = (x: number, dur: number) =>
    new Promise<void>((res) => {
      const el = pkt.current;
      if (!el) return res();
      const x0 = parseFloat(el.getAttribute("cx") || "60");
      const t0 = performance.now();
      const step = (t: number) => {
        const p = Math.min(1, (t - t0) / dur);
        const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        el.setAttribute("cx", String(x0 + (x - x0) * e));
        if (p < 1) requestAnimationFrame(step);
        else res();
      };
      requestAnimationFrame(step);
    });

  const flash = (k: NodeKey, cls: string) => {
    setLit((p) => ({ ...p, [k]: cls }));
    setTimeout(() => setLit((p) => ({ ...p, [k]: "" })), 700);
  };

  const tween = (to: number) => {
    const from = curTot.current;
    curTot.current = to;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / 320);
      setTot(Math.round(from + (to - from) * p));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const send = async () => {
    if (busy.current) return;
    busy.current = true;
    setSending(true);
    const hit = cacheOn.current && warm.current;
    const spans = hit ? HIT : MISS;
    const total = spans.reduce((a, s) => a + s[1], 0);
    let start = 0;
    setRows(
      spans.map((s, i) => {
        const r: Row = {
          label: s[0],
          ms: s[1],
          left: (start / total) * 100,
          width: Math.max((s[1] / total) * 100, 2.5),
          done: false,
          color: LAYER_COLORS[i % 5],
        };
        start += s[1];
        return r;
      }),
    );
    curTot.current = 0;
    setTot(0);
    pkt.current?.setAttribute("cx", String(NODE_X.client));
    setStatus(
      cacheOn.current ? (
        warm.current ? (
          <>
            cache is <span className="ok">warm</span>…
          </>
        ) : (
          <>
            cache is <span className="wn">cold</span>…
          </>
        )
      ) : (
        <>
          cache <span className="wn">off</span>…
        </>
      ),
    );

    let acc = 0;
    const done = (i: number) => {
      setRows((p) => p.map((r, j) => (j === i ? { ...r, done: true } : r)));
      acc += spans[i][1];
      tween(acc);
    };

    await move(NODE_X.api, 520);
    flash("api", "act");
    done(0);
    await wait(220);
    done(1);
    await move(NODE_X.cache, 520);
    flash("cache", hit ? "hitx" : "miss");
    done(2);
    if (!hit) {
      await move(NODE_X.db, 520);
      flash("db", "act");
      await wait(700);
      done(3);
      await move(NODE_X.cache, 320);
    }
    await move(NODE_X.api, hit ? 260 : 320);
    await move(NODE_X.client, hit ? 260 : 320);
    done(spans.length - 1);

    if (hit) {
      setStatus(
        <>
          <span className="ok">cache HIT</span> · served from memory
        </>,
      );
    } else if (cacheOn.current) {
      setStatus(
        <>
          <span className="wn">cache MISS</span> · went to Postgres · now warm, send again
        </>,
      );
      warm.current = true;
    } else {
      setStatus(
        <>
          <span className="wn">no cache</span> · every request hits Postgres
        </>,
      );
    }
    busy.current = false;
    setSending(false);
  };

  // Fire a cold request, then a warm one, so the hero demonstrates itself.
  useEffect(() => {
    const t = setTimeout(async () => {
      if (touched.current) return;
      await send();
      await wait(1500);
      if (!touched.current) send();
    }, 1600);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setCache = (on: boolean) => {
    touched.current = true;
    cacheOn.current = on;
    warm.current = false;
    setCacheUi(on);
    setStatus(on ? "cache on · cold. send a request" : "cache off · every request hits the DB");
  };

  return (
    <div className="widget">
      <div className="wh">
        <div className="dots">
          <i />
          <i />
          <i />
        </div>
        <span className="mono">GET /api/items/42</span>
        <div className="seg" role="group" aria-label="Cache toggle">
          <button className={cacheUi ? "on" : ""} aria-pressed={cacheUi} onClick={() => setCache(true)}>
            cache on
          </button>
          <button className={cacheUi ? "" : "on"} aria-pressed={!cacheUi} onClick={() => setCache(false)}>
            cache off
          </button>
        </div>
      </div>

      <svg
        className="dia"
        viewBox="0 0 520 130"
        role="group"
        aria-label="A request flowing from client to API to cache to database"
      >
        <line className="ln" x1="106" y1="65" x2="144" y2="65" />
        <line className="ln" x1="236" y1="65" x2="274" y2="65" />
        <line className="ln" x1="366" y1="65" x2="404" y2="65" />
        {NODES.map((n) => (
          <g
            key={n.k}
            className={`nd ${lit[n.k] || ""}`}
            tabIndex={0}
            role="button"
            aria-label={`${n.title}: what I built here`}
            transform={`translate(${n.x},37)`}
            style={{ "--nc": n.color } as CSSProperties}
            onMouseEnter={() => setInfo(n.k)}
            onFocus={() => setInfo(n.k)}
            onClick={() => setInfo(n.k)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setInfo(n.k);
              }
            }}
          >
            <rect width="92" height="56" rx="14" />
            <text x="46" y="25" textAnchor="middle">
              {n.title}
            </text>
            <text className="sm" x="46" y="41" textAnchor="middle">
              {n.sub}
            </text>
          </g>
        ))}
        <circle ref={pkt} className="pkt" r="6" cx="60" cy="65" />
      </svg>

      <div className="wf">
        {rows.map((r, i) => (
          <div className="wr" key={i}>
            <span>{r.label}</span>
            <div className="tr">
              <b style={{ left: `${r.left}%`, width: r.done ? `${r.width}%` : 0, background: r.color }} />
            </div>
            <em>{r.done ? `${r.ms}ms` : "–"}</em>
          </div>
        ))}
      </div>

      <div className="wfoot">
        <div className="tot">
          {tot}
          <small>ms</small>
        </div>
        <div className="st" aria-live="polite">
          {status}
        </div>
        <button
          className="send"
          disabled={sending}
          onClick={() => {
            touched.current = true;
            send();
          }}
        >
          Send request ▸
        </button>
      </div>
      <div className="ninfo mono" aria-live="polite">
        {NODE_INFO[info]}
      </div>
    </div>
  );
}
