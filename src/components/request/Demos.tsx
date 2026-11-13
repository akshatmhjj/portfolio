"use client";

import { useRef, useState } from "react";
import type { ReactNode } from "react";
import { B62, GROUNDED_QA } from "./data";

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

function DemoHead({ children }: { children: ReactNode }) {
  return (
    <div className="dh mono">
      try it · {children} <span className="ok">(simulated)</span>
    </div>
  );
}

/** MLock: idempotent payment capture + server-side pricing. */
export function IdempotencyDemo() {
  const [lines, setLines] = useState<ReactNode[]>([]);
  const captured = useRef(false);
  const add = (n: ReactNode) => setLines((p) => [...p, n]);
  const req = (extra: ReactNode) => (
    <>
      <span className="bl">→ POST /payments/capture</span> {extra}
    </>
  );

  const capture = async () => {
    add(req("Idempotency-Key: 7f3a-91c2"));
    await wait(330);
    if (!captured.current) {
      add(
        <>
          <span className="ok">← 201 Created</span> charge_8f3a · $49.00 (server-side price)
        </>,
      );
      captured.current = true;
    } else {
      add(
        <>
          <span className="ok">← 200 OK</span> replayed charge_8f3a · <span className="wn">no duplicate charge</span>
        </>,
      );
    }
  };
  const tamper = async () => {
    add(
      req(
        <>
          body.total = <span className="er">$0.01</span>
        </>,
      ),
    );
    await wait(330);
    add(
      <>
        <span className="er">← 422 Unprocessable</span> price mismatch · client total ignored, server price $49.00 used
      </>,
    );
  };
  const reset = () => {
    captured.current = false;
    setLines([]);
  };

  return (
    <div className="demo">
      <DemoHead>idempotent payment capture</DemoHead>
      <div className="row">
        <button className="go" onClick={capture}>
          POST /payments/capture
        </button>
        <button className="go alt" onClick={tamper}>
          …with a tampered price
        </button>
        <button className="pill" onClick={reset}>
          reset
        </button>
      </div>
      <div className="out" aria-live="polite">
        {lines.length ? (
          lines.map((l, i) => <div key={i}>{l}</div>)
        ) : (
          <span className="dim">press capture, then press it again.</span>
        )}
      </div>
    </div>
  );
}

export function ShortifyDemo() {
  const [url, setUrl] = useState("https://example.com/a/really/long/path?utm=portfolio");
  const [code, setCode] = useState("");
  const [ms, setMs] = useState<number | null>(null);

  const shorten = () => {
    setCode(Array.from({ length: 6 }, () => B62[Math.floor(Math.random() * 62)]).join(""));
    const target = 38 + Math.floor(Math.random() * 52);
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / 700);
      setMs(Math.round(target * p));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  return (
    <div className="demo">
      <DemoHead>shorten + redirect</DemoHead>
      <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} aria-label="URL to shorten" />
      <div className="row" style={{ marginTop: 10 }}>
        <button className="go" onClick={shorten}>
          Shorten
        </button>
      </div>
      <div className="out" style={{ minHeight: 52 }}>
        {code ? (
          <>
            sho.rt/<b style={{ color: "var(--c3)" }}>{code}</b>
            <br />
            <span className="dim">62^6 ≈ 56 billion codes · collision-checked · cached in Redis</span>
          </>
        ) : (
          <span className="dim">short link appears here</span>
        )}
      </div>
      <div className="lat">
        {ms ?? 0}
        <span> ms redirect</span>
      </div>
    </div>
  );
}

export function PredictyeDemo() {
  const [age, setAge] = useState(3);
  const base = 1200;
  const mid = base * Math.pow(0.82, age);
  const spread = 0.08 + age * 0.035;
  const lo = mid * (1 - spread);
  const hi = mid * (1 + spread);

  return (
    <div className="demo">
      <DemoHead>a range, not a guess</DemoHead>
      <div className="price">
        ${Math.round(lo)} – ${Math.round(hi)}
      </div>
      <div className="range">
        <i style={{ left: `${(lo / base) * 100}%`, width: `${Math.max(4, (hi / base) * 100 - (lo / base) * 100)}%` }} />
      </div>
      <label className="mono">
        item age: <b style={{ color: "var(--text)" }}>{age}</b> yrs
      </label>
      <input
        type="range"
        min={0}
        max={10}
        value={age}
        onChange={(e) => setAge(+e.target.value)}
        aria-label="Item age in years"
      />
    </div>
  );
}

export function GroundedDemo() {
  const [sel, setSel] = useState<number | null>(null);
  const [pipe, setPipe] = useState<string[]>(["", "", ""]);
  const [out, setOut] = useState<ReactNode>(<span className="dim">One question is in the documents, one isn&apos;t.</span>);
  const busy = useRef(false);

  const ask = async (i: number) => {
    if (busy.current) return;
    busy.current = true;
    setSel(i);
    const q = GROUNDED_QA[i];
    setPipe(["on", "", ""]);
    setOut("retrieving top passages…");
    await wait(600);
    setPipe(["good", "on", ""]);
    setOut(`similarity ${q.score.toFixed(2)}  vs threshold 0.35…`);
    await wait(700);
    setPipe(["good", q.ok ? "good" : "bad", "on"]);
    await wait(400);
    let text = "";
    for (const ch of q.text) {
      text += ch;
      setOut(text);
      await wait(14);
    }
    if (q.cite)
      setOut(
        <>
          {q.text}
          <br />
          <span className="ok">[source: {q.cite}]</span>
        </>,
      );
    setPipe(["good", q.ok ? "good" : "bad", q.ok ? "good" : "bad"]);
    busy.current = false;
  };

  return (
    <div className="demo">
      <DemoHead>answer or refuse</DemoHead>
      <div className="row">
        <button className={`pill ${sel === 0 ? "on" : ""}`} onClick={() => ask(0)}>
          What is the refund window?
        </button>
        <button className={`pill ${sel === 1 ? "on" : ""}`} onClick={() => ask(1)}>
          Who won the 2030 World Cup?
        </button>
      </div>
      <div className="pipe">
        {["Retrieve", "Guard", "Answer"].map((n, i) => (
          <b key={n} className={pipe[i]}>
            {n}
          </b>
        ))}
      </div>
      <div className="out" style={{ minHeight: 62 }} aria-live="polite">
        {out}
      </div>
    </div>
  );
}
