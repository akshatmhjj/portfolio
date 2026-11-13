"use client";

import { useEffect, useState } from "react";
import { SunMoon } from "./ui";

/** Reads/toggles the site-wide theme (the same data-theme attribute the classic UI uses). */
export function useThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const read = () => setDark(document.documentElement.getAttribute("data-theme") !== "light");
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, []);

  // Same attribute and storage key the classic UI's ThemeProvider uses, so both stay in sync.
  const toggle = () => {
    const next = dark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("data-theme", next);
    } catch {}
  };

  return { dark, toggle };
}

export function ThemeButton() {
  const { dark, toggle } = useThemeToggle();
  return (
    <button className="tbtn" onClick={toggle} aria-label={`Switch to ${dark ? "light" : "dark"} theme`}>
      <SunMoon dark={dark} />
    </button>
  );
}

/** Sticky outline for long-form pages; reuses the trace-rail look. */
export function Toc({ items }: { items: { id: string; text: string }[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const mid = innerHeight * 0.35;
      let act = 0;
      items.forEach((it, i) => {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top < mid) act = i;
      });
      setActive((a) => (a === act ? a : act));
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, [items]);

  return (
    <aside className="rail" aria-label="On this page">
      <p className="rail-title">outline</p>
      <div>
        {items.map((it, i) => (
          <a
            key={it.id}
            href={`#${it.id}`}
            className={`rr ${i === active ? "on" : ""} ${i < active ? "done" : ""}`}
            style={{ "--rc": "var(--c)" } as React.CSSProperties}
          >
            <i />
            <span className="rn">{it.text}</span>
          </a>
        ))}
      </div>
    </aside>
  );
}
