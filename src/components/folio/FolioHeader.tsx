"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeButton } from "@/components/request/Chrome";

const LINKS: [string, string][] = [
  ["/#stack", "Tools"],
  ["/#work", "Projects"],
  ["/#path", "Journey"],
  ["/#contact", "Contact"],
];

/** The floating pill header shared by the home page and every case study. */
export function FolioHeader() {
  const [menu, setMenu] = useState(false);
  return (
    <header className="fo-pillbar">
      <div className="fo-pill-nav">
        <Link className="fo-brand" href="/">
          Akshat
        </Link>
        <div className="fo-pill-right">
          <ThemeButton />
          <button
            className="fo-dots"
            aria-expanded={menu}
            aria-controls="fo-menu"
            aria-label={menu ? "Close menu" : "Open menu"}
            onClick={() => setMenu((m) => !m)}
          >
            •••
          </button>
        </div>
      </div>
      <nav id="fo-menu" className={`fo-menu ${menu ? "on" : ""}`} aria-label="Sections" aria-hidden={!menu}>
        {LINKS.map(([h, l]) => (
          <Link key={h} href={h} tabIndex={menu ? 0 : -1} onClick={() => setMenu(false)}>
            {l}
          </Link>
        ))}
      </nav>
    </header>
  );
}
