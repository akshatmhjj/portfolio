"use client";

import "./request.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { PageNav, useThemeToggle } from "./Chrome";
import { rqFontClasses } from "./fonts";
import {
  API_CARD,
  CLIENT_CARDS,
  PROJECT_META,
  SECTIONS,
  SKILL_CHIPS,
  WORDS,
} from "./data";
import type { Layer, Metric } from "./data";
import { Count, MetricValue, Rv, SunMoon } from "./ui";
import Widget from "./Widget";
import { GroundedDemo, IdempotencyDemo, PredictyeDemo, ShortifyDemo } from "./Demos";
import { Drawer, Palette } from "./Overlays";
import type { PaletteItem } from "./Overlays";
import type { ProjectData, SiteProps } from "./types";

const COLORS = ["var(--c1)", "var(--c2)", "var(--c3)", "var(--c4)", "var(--c5)"];

const cssVar = (v: Record<string, string>) => v as CSSProperties;

function Metrics({ items, two }: { items: Metric[]; two?: boolean }) {
  return (
    <div className={`mx ${two ? "two" : ""}`}>
      {items.map((m) => (
        <div className="m" key={m.label}>
          <b>
            {m.prefix}
            <Count to={m.value} dec={m.dec} />
            {m.suffix}
          </b>
          <span>{m.label}</span>
        </div>
      ))}
    </div>
  );
}

function ProjectCard({ p, onOpen }: { p: ProjectData; onOpen: () => void }) {
  const meta = PROJECT_META[p.slug];
  return (
    <Rv as="article" className="card" id={`p-${p.slug}`}>
      <div className="ch">
        <div>
          <h3>{p.title}</h3>
          <div className="role">{meta?.role}</div>
        </div>
        {meta && (
          <span className="badge" style={cssVar({ "--bd": meta.badgeColor })}>
            {meta.badge}
          </span>
        )}
      </div>
      <div className="mx">
        {p.metrics.slice(0, 3).map((m) => (
          <div className="m" key={m.label}>
            <b>
              <MetricValue value={m.value} />
            </b>
            <span>{m.label}</span>
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
      {meta?.demo === "shortify" && <ShortifyDemo />}
      {meta?.demo === "predictye" && <PredictyeDemo />}
      {meta?.demo === "grounded" && <GroundedDemo />}
      <div className="actions">
        {p.link && (
          <a className="mini" href={p.link} target="_blank" rel="noopener noreferrer">
            Live site ↗
          </a>
        )}
        {p.source && (
          <a className="mini" href={p.source} target="_blank" rel="noopener noreferrer">
            Source ↗
          </a>
        )}
        <button className="mini" onClick={onOpen}>
          Case study
        </button>
      </div>
    </Rv>
  );
}

export default function RequestSite({ person, social, projects, resumeHref }: SiteProps) {
  const { dark, toggle: toggleTheme } = useThemeToggle();
  const [wi, setWi] = useState(0);
  const [wordClass, setWordClass] = useState("");
  const [proofOn, setProofOn] = useState(true);
  const [active, setActive] = useState(-1);
  const [drawer, setDrawer] = useState<string | null>(null);
  const [palette, setPalette] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const progRef = useRef<HTMLElement>(null);

  const layerProjects = (layer: Layer) =>
    projects.filter((p) => (PROJECT_META[p.slug]?.layer ?? "data") === layer);

  /* cycling headline word */
  useEffect(() => {
    const id = setInterval(() => {
      if (document.hidden) return;
      setWordClass("out");
      setProofOn(false);
      setTimeout(() => {
        setWi((i) => (i + 1) % WORDS.length);
        setWordClass("pre");
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            setWordClass("");
            setProofOn(true);
          }),
        );
      }, 380);
    }, 3300);
    return () => clearInterval(id);
  }, []);

  /* pointer glow */
  useEffect(() => {
    if (!window.matchMedia("(pointer:fine)").matches) return;
    let raf = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        rootRef.current?.style.setProperty("--mx", `${e.clientX}px`);
        rootRef.current?.style.setProperty("--my", `${e.clientY}px`);
      });
    };
    addEventListener("pointermove", move);
    return () => {
      removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* scroll progress + active section */
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const p = scrollY / Math.max(1, h.scrollHeight - innerHeight);
      if (progRef.current) progRef.current.style.width = `${p * 100}%`;
      const mid = innerHeight * 0.45;
      let act = -1;
      SECTIONS.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top < mid) act = i;
      });
      setActive((a) => (a === act ? a : act));
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
    };
  }, []);

  /* keyboard + scroll lock */
  const closeAll = useCallback(() => {
    setDrawer(null);
    setPalette(false);
  }, []);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setDrawer(null);
        setPalette((o) => !o);
      } else if (e.key === "Escape") closeAll();
    };
    addEventListener("keydown", key);
    return () => removeEventListener("keydown", key);
  }, [closeAll]);
  useEffect(() => {
    document.documentElement.style.overflow = drawer || palette ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [drawer, palette]);

  const goTo = useCallback((id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), []);

  const items: PaletteItem[] = useMemo(
    () => [
      ...SECTIONS.map((s) => ({ label: s.label.replace(" ", " · "), kind: "section", run: () => goTo(s.id) })),
      ...projects.map((p) => ({ label: p.title, kind: "project", run: () => setDrawer(p.slug) })),
      { label: dark ? "Switch to light theme" : "Switch to dark theme", kind: "theme", run: toggleTheme },
      { label: "Email Akshat", kind: "link", run: () => (location.href = `mailto:${person.email}`) },
      { label: "Resume", kind: "link", run: () => window.open(resumeHref, "_blank") },
      ...social
        .filter((s) => !s.link.startsWith("mailto:"))
        .map((s) => ({ label: s.name, kind: "link", run: () => window.open(s.link, "_blank") })),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [projects, social, person.email, resumeHref, dark, goTo],
  );

  const current = projects.find((p) => p.slug === drawer) ?? null;
  const navLinks = social.filter((s) => s.name !== "Email");

  return (
    <main ref={rootRef} className={`rq ${rqFontClasses}`}>
      <noscript>
        <style>{`.rq .rv{opacity:1!important;transform:none!important}`}</style>
      </noscript>
      <div className="prog">
        <i ref={progRef} />
      </div>

      <header className="hdr">
        <a className="brand" href="#top" aria-label={person.name}>
          <span className="logo">{person.name[0]}</span>
          {person.name}
        </a>
        <div className="hright">
          <nav className="nav" aria-label="Links">
            {navLinks.map((s) => (
              <a key={s.name} href={s.link} target="_blank" rel="noopener noreferrer">
                {s.name.toLowerCase()}
              </a>
            ))}
            <a href={`mailto:${person.email}`}>email</a>
          </nav>
          <div className="here" style={cssVar({ "--hc": COLORS[Math.max(active, 0)] })}>
            <i />
            <span>{active >= 0 ? SECTIONS[active].label : "hero"}</span>
          </div>
          <PageNav hideOnMobile />
          <button className="tbtn" onClick={toggleTheme} aria-label={`Switch to ${dark ? "light" : "dark"} theme`}>
            <SunMoon dark={dark} />
          </button>
        </div>
      </header>

      <div className="wrap" id="top">
        <section className="hero">
          <div>
            <Rv as="span" className="tagline">
              <b />
              open to full-time roles · relocation
            </Rv>
            <Rv as="h1" className="h1" delay={0.08}>
              I build for
              <span className={`w ${wordClass}`}>{WORDS[wi][0]}</span>
            </Rv>
            <div className="proof" style={{ opacity: proofOn ? 1 : 0 }}>
              {WORDS[wi][1]}
            </div>
            <Rv as="p" className="who" delay={0.2}>
              Software engineer building fast, secure web and iOS products, plus AI tools that know when to say “I
              don&apos;t know.” Currently interning at MLock Innovations.
            </Rv>
            <Rv className="cta" delay={0.3}>
              <a className="btn pri" href="#s1">
                Follow the request ↓
              </a>
              <a className="btn ghost" href={`mailto:${person.email}`}>
                Email me
              </a>
            </Rv>
          </div>
          <Rv delay={0.2}>
            <Widget />
          </Rv>
          <div className="cue mono">
            <i />
            keep scrolling — the request continues down the page
          </div>
        </section>

        <div className="layout">
          <aside className="rail" aria-label="Trace of this page">
            <h6>trace</h6>
            <div>
              {SECTIONS.map((s, i) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`rr ${i === active ? "on" : ""} ${i < active ? "done" : ""}`}
                  style={cssVar({ "--rc": COLORS[i] })}
                >
                  <i />
                  <span className="rn">{s.label}</span>
                  <span className="rt">
                    <b style={{ left: `${s.off[0]}%`, width: `${s.off[1]}%` }} />
                  </span>
                </a>
              ))}
            </div>
            <div className="trace">
              trace_id 8f3c·a91e
              <br />
              spans 5 · services 4
            </div>
          </aside>

          <div>
            {/* 01 CLIENT */}
            <section className="sec first" id="s1" style={cssVar({ "--c": COLORS[0] })}>
              <Rv as="span" className="stag">
                01 · client
              </Rv>
              <Rv as="h2" className="h2">
                Interfaces that feel instant.
              </Rv>
              <Rv as="p" className="lede">
                It starts at the edge, in a browser or in a pocket. Where the user actually feels speed (or doesn&apos;t).
              </Rv>
              <div className="twocol">
                {CLIENT_CARDS.map((c, i) => (
                  <Rv as="article" className="card" key={c.company} delay={i * 0.1}>
                    <div className="ch">
                      <div>
                        <h3>{c.company}</h3>
                        <div className="role">{c.role}</div>
                      </div>
                      <span className="mono">{c.when}</span>
                    </div>
                    <Metrics items={c.metrics} two />
                    <p className="mono note">{c.note}</p>
                  </Rv>
                ))}
              </div>
            </section>

            {/* 02 API */}
            <section className="sec" id="s2" style={cssVar({ "--c": COLORS[1] })}>
              <Rv as="span" className="stag">
                02 · api
              </Rv>
              <Rv as="h2" className="h2">
                Backends you can trust under load.
              </Rv>
              <Rv as="p" className="lede">
                Behind every fast screen is a boring, careful system. Auth that holds, tenants that stay separate,
                payments that never charge twice.
              </Rv>
              <Rv as="article" className="card">
                <div className="ch">
                  <div>
                    <h3>{API_CARD.company}</h3>
                    <div className="role">{API_CARD.role}</div>
                  </div>
                  <span className="mono">{API_CARD.when}</span>
                </div>
                <Metrics items={API_CARD.metrics} />
                <IdempotencyDemo />
              </Rv>
            </section>

            {/* 03 DATA */}
            <section className="sec" id="s3" style={cssVar({ "--c": COLORS[2] })}>
              <Rv as="span" className="stag">
                03 · data
              </Rv>
              <Rv as="h2" className="h2">
                Fast reads. Honest numbers.
              </Rv>
              <Rv as="p" className="lede">
                Caches, indexes and models. The part of the system where milliseconds are won or lost, just like the
                request you sent at the top.
              </Rv>
              {layerProjects("data").map((p) => (
                <ProjectCard key={p.slug} p={p} onOpen={() => setDrawer(p.slug)} />
              ))}
            </section>

            {/* 04 AI */}
            <section className="sec" id="s4" style={cssVar({ "--c": COLORS[3] })}>
              <Rv as="span" className="stag">
                04 · ai
              </Rv>
              <Rv as="h2" className="h2">
                AI that knows when it doesn&apos;t know.
              </Rv>
              <Rv as="p" className="lede">
                Most chatbots would rather be wrong than silent. I build ones that cite their sources, or refuse.
              </Rv>
              {layerProjects("ai").map((p) => (
                <ProjectCard key={p.slug} p={p} onOpen={() => setDrawer(p.slug)} />
              ))}
            </section>

            {/* 05 RESPONSE */}
            <section className="sec resp" id="s5" style={cssVar({ "--c": COLORS[4] })}>
              <Rv as="span" className="stag">
                05 · response
              </Rv>
              <Rv className="code200">200 OK</Rv>
              <Rv as="h2" className="h2">
                Let&apos;s build something fast.
              </Rv>
              <Rv as="p" className="lede">
                I&apos;m open to full-time roles and relocation. If you&apos;ve got a hard system, a slow endpoint, or an AI
                feature that shouldn&apos;t make things up, I&apos;d like to hear about it.
              </Rv>
              <Rv className="cta">
                <a className="btn pri" href={`mailto:${person.email}`}>
                  {person.email}
                </a>
                <a className="btn ghost" href={resumeHref} target="_blank" rel="noopener noreferrer">
                  Resume
                </a>
                {navLinks.map((s) => (
                  <a key={s.name} className="btn ghost" href={s.link} target="_blank" rel="noopener noreferrer">
                    {s.name}
                  </a>
                ))}
              </Rv>
              <Rv className="me">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={person.avatar} alt={person.name} />
                <div>
                  <strong>{person.name}</strong>
                  <div className="mono">
                    {person.location} · {person.languages.join(" · ")}
                  </div>
                  <div className="mono">B.Tech CSE · SVVV Indore · 2022 – 2026</div>
                </div>
              </Rv>
              <Rv className="chips">
                {SKILL_CHIPS.map((s) => (
                  <span className="chip" key={s}>
                    {s}
                  </span>
                ))}
              </Rv>
            </section>
          </div>
        </div>

        <footer className="foot mono">
          <span>
            © {new Date().getFullYear()} {person.name}
          </span>
          <span>trace complete · 200 OK</span>
        </footer>
      </div>

      <div className={`scrim ${drawer || palette ? "on" : ""}`} onClick={closeAll} />
      <Palette open={palette} items={items} onClose={() => setPalette(false)} />
      <Drawer project={current} onClose={() => setDrawer(null)} />
    </main>
  );
}
