"use client";

import Image from "next/image";
import type { PersonData } from "./types";

/** Hero option: a profile card with photo, status and the three numbers that matter most. */
export default function HeroProfile({ person }: { person: PersonData }) {
  return (
    <div className="pc">
      <div className="pc-top">
        <Image className="pc-photo" src={person.avatar} alt={person.name} width={112} height={112} sizes="112px" />
        <div className="pc-id">
          <div className="pc-name">{person.name}</div>
          <div className="pc-role mono">{person.role}</div>
          <div className="pc-loc mono">{person.location}</div>
        </div>
      </div>

      <div className="pc-status">
        <i />
        <span>Currently at MLock Innovations · open to relocation</span>
      </div>

      <div className="pc-nums">
        <div>
          <b>45%</b>
          <span>lower API latency</span>
        </div>
        <div>
          <b>80+</b>
          <span>REST endpoints</span>
        </div>
        <div>
          <b>92.9%</b>
          <span>correct refusals</span>
        </div>
      </div>

      <div className="pc-actions">
        <a className="btn pri" href={`mailto:${person.email}`}>
          Email me
        </a>
        <a className="btn ghost" href="/Akshat%20Mahajan%20Resume.pdf" target="_blank" rel="noopener noreferrer">
          Resume<span className="sr"> (opens in a new tab)</span>
        </a>
      </div>
    </div>
  );
}
