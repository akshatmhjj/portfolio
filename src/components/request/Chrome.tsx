"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@once-ui-system/core";
import { SunMoon } from "./ui";
import type { SocialLink } from "./types";

/** Reads/toggles the site-wide theme (the same data-theme attribute the classic UI uses). */
export function useThemeToggle() {
  const { setTheme } = useTheme();
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const read = () => setDark(document.documentElement.getAttribute("data-theme") !== "light");
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, []);

  return { dark, toggle: () => setTheme(dark ? "light" : "dark") };
}

export function ThemeButton() {
  const { dark, toggle } = useThemeToggle();
  return (
    <button className="tbtn" onClick={toggle} aria-label={`Switch to ${dark ? "light" : "dark"} theme`}>
      <SunMoon dark={dark} />
    </button>
  );
}

/** Small "home | work" switcher shared by every page of the new UI. */
export function PageNav({ hideOnMobile = false }: { hideOnMobile?: boolean }) {
  const path = usePathname() ?? "";
  return (
    <nav className={`pnav ${hideOnMobile ? "hm" : ""}`} aria-label="Pages">
      <Link href="/" className={path === "/" ? "on" : ""}>
        home
      </Link>
      <Link href="/work" className={path.startsWith("/work") ? "on" : ""}>
        work
      </Link>
    </nav>
  );
}

/** Header + reading-progress bar for the inner (/work) pages. */
export function RqHeader({ name, email, links }: { name: string; email: string; links: SocialLink[] }) {
  const prog = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const p = scrollY / Math.max(1, h.scrollHeight - innerHeight);
      if (prog.current) prog.current.style.width = `${p * 100}%`;
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <div className="prog">
        <i ref={prog} />
      </div>
      <header className="hdr">
        <Link className="brand" href="/" aria-label={`${name} — home`}>
          <span className="logo">{name[0]}</span>
          {name}
        </Link>
        <div className="hright">
          <nav className="nav" aria-label="Links">
            {links.map((s) => (
              <a key={s.name} href={s.link} target="_blank" rel="noopener noreferrer">
                {s.name.toLowerCase()}
              </a>
            ))}
            <a href={`mailto:${email}`}>email</a>
          </nav>
          <PageNav />
          <ThemeButton />
        </div>
      </header>
    </>
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
      <h6>outline</h6>
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
