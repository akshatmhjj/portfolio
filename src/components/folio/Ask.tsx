"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; text: string; refused?: boolean };

const ERRORS: Record<string, string> = {
  not_configured: "The assistant isn't switched on yet. You can email Akshat directly.",
  rate_limited: "Too many questions in a short time. Please try again in a minute.",
  upstream: "The assistant is busy right now. Please try again in a moment, or email Akshat directly.",
};

export function Ask({ email }: { email: string }) {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const log = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => input.current?.focus(), 250);
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", key);
    return () => removeEventListener("keydown", key);
  }, [open]);

  useEffect(() => {
    log.current?.scrollTo({ top: log.current.scrollHeight, behavior: "smooth" });
  }, [msgs, busy]);

  const send = async () => {
    const q = text.trim();
    if (!q || busy) return;
    const next: Msg[] = [...msgs, { role: "user", text: q }];
    setMsgs(next);
    setText("");
    setBusy(true);
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.filter((m) => !m.refused).map(({ role, text }) => ({ role, text })) }),
      });
      const data = await res.json();
      setMsgs([
        ...next,
        data.answer
          ? { role: "assistant", text: data.answer, refused: data.refused }
          : { role: "assistant", text: ERRORS[data.error] ?? `Something went wrong. You can email ${email}.`, refused: true },
      ]);
    } catch {
      setMsgs([...next, { role: "assistant", text: `Couldn't reach the assistant. You can email ${email}.`, refused: true }]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <div className={`fo-scrim ${open ? "on" : ""}`} onClick={() => setOpen(false)} aria-hidden="true" />
      <button className="fo-fab" onClick={() => setOpen(true)} aria-haspopup="dialog" aria-expanded={open}>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-5.4A8 8 0 1 1 21 12z" />
        </svg>
        Ask AI
      </button>

      <div className={`fo-ask ${open ? "on" : ""}`} role="dialog" aria-label="Akshat's AI Assistant" aria-hidden={!open}>
        <div className="fo-ask-head">
          <span className="fo-ask-av" aria-hidden="true">A.</span>
          <div>
            <b>Akshat&apos;s AI Assistant</b>
            <span>Projects, skills &amp; experience</span>
          </div>
          <button className="fo-ask-x" onClick={() => setOpen(false)} aria-label="Close assistant" tabIndex={open ? 0 : -1}>
            ×
          </button>
        </div>

        <div className="fo-ask-log" ref={log} aria-live="polite">
          {msgs.length === 0 && (
            <h2 className="fo-ask-hello">
              Get to know
              <br />
              Akshat&apos;s work.
            </h2>
          )}
          {msgs.map((m, i) => (
            <div key={i} className={`fo-msg ${m.role} ${m.refused ? "refused" : ""}`}>
              {m.text}
            </div>
          ))}
          {busy && (
            <div className="fo-msg assistant fo-typing" aria-label="Typing">
              <i /><i /><i />
            </div>
          )}
        </div>

        <form
          className="fo-ask-form"
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
        >
          <input
            ref={input}
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={300}
            placeholder="Ask about Akshat..."
            aria-label="Ask about Akshat"
            tabIndex={open ? 0 : -1}
          />
          <button type="submit" disabled={!text.trim() || busy} aria-label="Send" tabIndex={open ? 0 : -1}>
            ↑
          </button>
        </form>
        <p className="fo-ask-note">AI can make mistakes. Confirm details with Akshat.</p>
      </div>
    </>
  );
}
