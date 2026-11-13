"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeButton } from "./Chrome";
import { Icon } from "./ui";
import type { SocialLink } from "./types";

const ICON_FOR: Record<string, string> = {
  github: "github",
  linkedin: "linkedin",
  "code journey": "compass",
};

/**
 * One header for every page of the new UI.
 *  - Desktop (≥1100px): brand · Home/Work switch · social icons · "Email me" · theme.
 *  - Tablet (700–1099px): brand · Home/Work switch · theme · menu button.
 *  - Mobile (<700px): brand · theme · menu button (the menu carries the page links).
 * It's transparent at the top, turns into a frosted floating bar once you scroll, and on
 * small screens slides away while scrolling down and returns when scrolling up.
 */
export function SiteHeader({
  name,
  email,
  links,
  resumeHref,
}: {
  name: string;
  email: string;
  links: SocialLink[];
  resumeHref: string;
}) {
  const pathname = usePathname() ?? "/";
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const prog = useRef<HTMLElement>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const openRef = useRef(false);
  const openedAt = useRef(0);
  openRef.current = open;

  // remember where the page was when the menu opened, so we can close it if the user scrolls away
  useEffect(() => {
    if (open) openedAt.current = scrollY;
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  // scroll: progress bar, frosted state, hide-on-scroll-down (small screens only)
  useEffect(() => {
    let last = scrollY;
    const onScroll = () => {
      const y = scrollY;
      const h = document.documentElement;
      if (prog.current) prog.current.style.width = `${(y / Math.max(1, h.scrollHeight - innerHeight)) * 100}%`;
      setScrolled(y > 8);

      const small = innerWidth < 900;
      const dy = y - last;
      if (small && !openRef.current) {
        if (dy > 8 && y > 160) setHidden(true);
        else if (dy < -6 || y < 80) setHidden(false);
      } else setHidden(false);
      if (openRef.current && Math.abs(y - openedAt.current) > 60) setOpen(false);
      if (Math.abs(dy) > 6) last = y;
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
    };
  }, []);

  // close the menu on navigation, Escape, and when growing to the desktop layout
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape" && openRef.current) {
        setOpen(false);
        menuBtn.current?.focus();
      }
    };
    const resize = () => innerWidth >= 1100 && setOpen(false);
    addEventListener("keydown", key);
    addEventListener("resize", resize);
    return () => {
      removeEventListener("keydown", key);
      removeEventListener("resize", resize);
    };
  }, []);

  const goHome = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      scrollTo({ top: 0, behavior: "smooth" });
    }
    setOpen(false);
  };

  const onWork = pathname.startsWith("/work");

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="prog" aria-hidden="true">
        <i ref={prog} />
      </div>

      <header className={`hdr ${scrolled ? "scrolled" : ""} ${hidden ? "hide" : ""}`}>
        <div className="hbar">
          <Link className="brand" href="/" onClick={goHome} aria-label={`${name} — home`}>
            <span className="logo">{name[0]}</span>
            <span className="bname">{name}</span>
          </Link>

          <nav className="pnav" aria-label="Pages">
            <Link href="/" onClick={goHome} className={!onWork ? "on" : ""} aria-current={!onWork ? "page" : undefined}>
              home
            </Link>
            <Link href="/work" className={onWork ? "on" : ""} aria-current={onWork ? "page" : undefined}>
              work
            </Link>
          </nav>

          <div className="hright">
            <div className="hicons">
              {links.map((s) => (
                <a
                  key={s.name}
                  className="ibtn"
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.name} (opens in a new tab)`}
                  title={s.name}
                >
                  <Icon name={ICON_FOR[s.name.toLowerCase()] ?? "link"} />
                </a>
              ))}
              <a className="ibtn" href={resumeHref} target="_blank" rel="noopener noreferrer" aria-label="Resume (opens in a new tab)" title="Resume">
                <Icon name="file" />
              </a>
            </div>
            <a className="hcta" href={`mailto:${email}`}>
              Email me
            </a>
            <ThemeButton />
            <button
              ref={menuBtn}
              className="tbtn menubtn"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <Icon name={open ? "close" : "menu"} />
            </button>
          </div>
        </div>
      </header>

      <div className={`mscrim ${open ? "on" : ""}`} onClick={close} aria-hidden="true" />
      <div id="site-menu" className={`mpanel ${open ? "on" : ""}`} role="dialog" aria-label="Menu" aria-hidden={!open}>
        <div className="mp-pages">
          <Link href="/" className={`mp-big ${!onWork ? "on" : ""}`} onClick={goHome} tabIndex={open ? 0 : -1}>
            Home <span aria-hidden="true">→</span>
          </Link>
          <Link href="/work" className={`mp-big ${onWork ? "on" : ""}`} onClick={close} tabIndex={open ? 0 : -1}>
            Work <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="mp-label mono">find me</div>
        <div className="mp-links">
          {links.map((s) => (
            <a
              key={s.name}
              className="mp-row"
              href={s.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              tabIndex={open ? 0 : -1}
            >
              <Icon name={ICON_FOR[s.name.toLowerCase()] ?? "link"} />
              <span>{s.name}</span>
              <span className="mp-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          ))}
          <a className="mp-row" href={resumeHref} target="_blank" rel="noopener noreferrer" onClick={close} tabIndex={open ? 0 : -1}>
            <Icon name="file" />
            <span>Resume</span>
            <span className="mp-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>

        <a className="btn pri mp-cta" href={`mailto:${email}`} onClick={close} tabIndex={open ? 0 : -1}>
          <Icon name="mail" /> Email me
        </a>
        <div className="mp-open mono">
          <i /> open to full-time roles · relocation
        </div>
      </div>
    </>
  );
}
