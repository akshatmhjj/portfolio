"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import "@/components/request/request.css";
import "./folio.css";
import { rqFontClasses } from "@/components/request/fonts";
import { FolioHeader } from "./FolioHeader";
import { FolioFooter } from "./FolioFooter";
import { Ask } from "./Ask";
import { Intro } from "./Intro";
import { FolioProject, ProjectIndex } from "./ProjectIndex";

type Props = {
  person: { name: string; role: string; location: string; email: string; avatar: string; languages: string[] };
  links: { name: string; href: string }[];
  about: {
    experience: { company: string; role: string; timeframe: string; achievements: ReactNode[] }[];
    skills: { title: string; tags: string[] }[];
    education: { name: string; description: ReactNode }[];
    certifications: { name: string; link: string }[];
  };
  projects: FolioProject[];
};

// The hero backdrop: two different "files". Left is Akshat's profile as an object; right is snippets of the work
// itself. [[double brackets]] mark the words shown bolder; lines starting with // - # are tinted as comments.
const CODE_PROFILE = `const akshat = {
  name: "[[Akshat Mahajan]]",
  role: "[[Software Engineer]]",
  focus: ["fast web", "iOS", "[[RAG + evaluation]]"],
  experience: [
    { company: "[[MLock Innovations]]", role: "Software Engineer", status: "Current" },
    { company: "DigiValet", role: "Software Engineer Intern", impact: "[[-45% API latency]]" },
    { company: "Itigai Technologies", role: "Frontend Developer Intern" },
  ],
  education: [
    { degree: "B.Tech, Computer Science Engineering", status: "[[Graduated 2026]]" },
  ],
  skills: {
    languages: ["TypeScript", "Python", "Swift", "SQL"],
    frameworks: ["[[Next.js]]", "React", "SwiftUI", "Node.js"],
    ai: ["RAG", "Embeddings", "Vector Search", "LLM APIs"],
    data: ["PostgreSQL", "Redis", "Docker"],
  },
  projects: [
    { name: "[[Code Journey]]", kind: "career map + AI guide" },
    { name: "[[Grounded]]", kind: "local RAG chatbot" },
    { name: "Shortify", kind: "URL shortener" },
    { name: "Predictye", kind: "value prediction" },
  ],
  certifications: ["IBM RDBMS", "IBM Microservices", "IBM Java"],
  languagesSpoken: ["Hindi", "English", "French"],
  openTo: "[[full-time roles, relocation]]",
};`;

const CODE_WORK = `# grounded/guard.py: refuse before the model is ever called
def answer(question: str) -> Answer:
    chunks = vector_store.search(question, k=4)
    if best_score(chunks) < [[SIMILARITY_THRESHOLD]]:
        return refuse("I can't answer that from your documents.")
    reply = llm.generate(grounded_prompt(question, chunks))
    return cite(reply, chunks)

// payments.ts: never trust the client's price
export async function capture(orderId: string, sig: string) {
  [[verifyHmac]](rawBody, sig, process.env.WEBHOOK_SECRET);
  const order = await db.order.findUnique({ where: { id: orderId } });
  if (order.status === "paid") return order; // [[idempotent]]
  return markPaid(order, serverSidePrice(order));
}

-- device job queue: one worker per job, no double runs
SELECT * FROM device_jobs
 WHERE status = 'queued' ORDER BY created_at LIMIT 1
 [[FOR UPDATE SKIP LOCKED]];

$ npm test
 [[200+ passing]]  tenant isolation, JWT, RBAC

$ git log --oneline
a41c9e2 cut API latency 800 ms -> [[440 ms]]
7be03d1 add refusal guard and evaluation harness
c9d5f10 ship idempotent webhooks`;

const KEYWORDS = /("[^"\n]*"|`[^`\n]*`|\b(?:const|return|if|def|export|async|await|function|SELECT|FROM|WHERE|ORDER|BY|LIMIT|FOR|UPDATE|SKIP|LOCKED|status|true|false)\b)/g;

/** One line of code with simple syntax colours (comments, strings, keywords). */
function Line({ text, i, cursor }: { text: string; i: number; cursor?: boolean }) {
  const clean = text.replace(/\[\[|\]\]/g, "");
  const comment = /^\s*(\/\/|--|#|\$)/.test(clean);
  return (
    <span className={`ln ${comment ? "cm" : ""}`} style={{ "--i": i } as CSSProperties}>
      {comment
        ? clean
        : clean.split(KEYWORDS).map((t, j) =>
            t.startsWith('"') || t.startsWith("`") ? (
              <span key={j} className="sg">{t}</span>
            ) : /^(const|return|if|def|export|async|await|function|SELECT|FROM|WHERE|ORDER|BY|LIMIT|FOR|UPDATE|SKIP|LOCKED|status|true|false)$/.test(t) ? (
              <span key={j} className="kw">{t}</span>
            ) : (
              t
            ),
          )}
      {cursor && <i className="fo-caret" />}
    </span>
  );
}

/** Two floating editor windows behind the headline: the profile on the left, snippets of the work on the right. */
function CodeBg() {
  const ref = useRef<HTMLDivElement>(null);

  // the windows drift a little against the pointer
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      raf = 0;
      el.style.setProperty("--mx", x.toFixed(3));
      el.style.setProperty("--my", y.toFixed(3));
    };
    const move = (e: PointerEvent) => {
      x = e.clientX / innerWidth - 0.5;
      y = e.clientY / innerHeight - 0.5;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    addEventListener("pointermove", move, { passive: true });
    return () => {
      removeEventListener("pointermove", move);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const profile = CODE_PROFILE.split("\n");
  const work = CODE_WORK.split("\n");
  return (
    <div className="fo-code" aria-hidden="true" ref={ref}>
      <div className="fo-win left">
        <div className="fo-win-bar">
          <i /><i /><i />
          <span className="tab on">profile.ts</span>
          <span className="tab">resume.md</span>
        </div>
        <div className="fo-view">
          <div className="fo-track" style={{ "--dur": "70s" } as CSSProperties}>
            {[0, 1].map((n) => (
              <pre key={n}>
                {profile.map((l, i) => (
                  <Line key={i} text={l} i={i} cursor={n === 0 && i === profile.length - 1} />
                ))}
              </pre>
            ))}
          </div>
        </div>
      </div>
      <div className="fo-win right">
        <div className="fo-win-bar">
          <i /><i /><i />
          <span className="tab on">guard.py</span>
          <span className="tab">payments.ts</span>
          <span className="tab">queue.sql</span>
        </div>
        <div className="fo-view">
          <div className="fo-track rev" style={{ "--dur": "85s" } as CSSProperties}>
            {[0, 1].map((n) => (
              <pre key={n}>
                {work.map((l, i) => (
                  <Line key={i} text={l} i={i} />
                ))}
              </pre>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Skills are shown in three groups: AI, languages & frameworks, and everything else. */
function groupSkills(skills: Props["about"]["skills"]) {
  // backend frameworks and API work sit with languages & frameworks
  const FRAMEWORKS = ["Node.js", "Express.js", "REST APIs"];
  const bucket = (t: string) => (/ai|llm/i.test(t) ? 0 : /language|frontend|mobile/i.test(t) ? 1 : 2);
  const out = [
    { n: "01", title: "AI & Machine Learning", note: "RAG pipelines, embeddings & semantic search, evaluation", tags: [] as string[] },
    { n: "02", title: "Languages & Frameworks", note: "REST API design, LLM integration, full-stack builds", tags: [] as string[] },
    { n: "03", title: "Tools, Databases & Cloud", note: "Data storage, payments, deployment and tooling", tags: [] as string[] },
  ];
  skills.forEach((g) =>
    g.tags.forEach((t) => {
      const i = FRAMEWORKS.includes(t) ? 1 : bucket(g.title);
      if (!out[i].tags.includes(t)) out[i].tags.push(t);
    }),
  );
  return out;
}

/** Splits a word into letters so each can rise in on load. */
function Letters({ text, from = 0 }: { text: string; from?: number }) {
  return (
    <>
      {[...text].map((ch, i) => (
        <span className="ch" key={i} aria-hidden="true" style={{ "--i": from + i } as CSSProperties}>
          {ch}
        </span>
      ))}
    </>
  );
}

const LIMIT = 12;
const collapsible = (n: number) => n > LIMIT + 2;
const INTENTS = ["a full-time role", "a freelance project", "just saying hi"];

export default function FolioSite({ person, about, projects, links }: Props) {
  const [more, setMore] = useState<Record<string, boolean>>({});
  const [name, setName] = useState("");
  const [intent, setIntent] = useState(INTENTS[0]);
  const [idea, setIdea] = useState("");
  const [sent, setSent] = useState(false);
  const vlist = useRef<HTMLOListElement>(null);

  // the journey line fills as you scroll past it, and each stop lights up when reached
  useEffect(() => {
    const el = vlist.current;
    if (!el) return;
    const items = [...el.querySelectorAll<HTMLElement>(".fo-vitem")];
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--fill", "1");
      items.forEach((i) => i.classList.add("lit"));
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const line = innerHeight * 0.6;
      el.style.setProperty("--fill", Math.min(1, Math.max(0, (line - r.top) / r.height)).toFixed(4));
      items.forEach((i) => i.classList.toggle("lit", i.getBoundingClientRect().top < line));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const groups = groupSkills(about.skills);

  const path = [
    ...about.experience.map((e) => ({ kind: "Work", title: e.company, sub: e.role, when: e.timeframe, lines: e.achievements.slice(0, 2) as ReactNode[] })),
    ...about.education.map((ed, i) => ({
      kind: i === 0 ? "College" : "School",
      title: ed.name,
      sub: "",
      when: "",
      lines: [ed.description] as ReactNode[],
    })),
  ];
  const certs = about.certifications;

  const draft = () => {
    const body = `Hi Akshat,\n\nI'm ${name || "someone"}, and I'm reaching out about ${intent}.\n\n${idea}`.trim();
    window.location.href = `mailto:${person.email}?subject=${encodeURIComponent(`Hello from ${name || "your site"}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <div className={`rq fo ${rqFontClasses}`}>
      <FolioHeader />

      <main id="top">
        <section className="fo-hero">
          <CodeBg />
          <h1 className="fo-giant" aria-label="Software Engineer">
            <span className="l1"><i aria-hidden="true">&lt;</i> <Letters text="SOFTWARE" from={1} /></span>
            <span className="l2"><Letters text="ENGINEER" from={9} /> <i aria-hidden="true">/&gt;</i></span>
          </h1>
          <div className="fo-shot">
            <Image src="/images/akshat-hero.jpg" alt={person.name} fill sizes="(max-width: 900px) 70vw, 440px" priority />
          </div>
          <div className="fo-hero-meta">
            <span className="fo-copy">©{new Date().getFullYear()}</span>
            <span className="mono fo-brace">{"{{ /AI & FULL-STACK DEVELOPMENT }}"}</span>
          </div>
        </section>

        <Intro />

        <section id="stack" className="fo-section">
          <div className="fo-head">
            <span className="mono">01 · tools</span>
            <h2>Tech Stack</h2>
            <p>The tools behind my work.</p>
          </div>
          <div className="fo-stack">
            {groups.map((g) => (
              <div className="fo-sg" key={g.n}>
                <h3>{g.title}</h3>
                <p>{g.note}</p>
                <div className="fo-tags">
                  {(collapsible(g.tags.length) && !more[g.n] ? g.tags.slice(0, LIMIT) : g.tags).map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                  {collapsible(g.tags.length) && (
                    <button
                      type="button"
                      className="fo-more"
                      aria-expanded={!!more[g.n]}
                      onClick={() => setMore((m) => ({ ...m, [g.n]: !m[g.n] }))}
                    >
                      {more[g.n] ? "Show less" : `+ ${g.tags.length - LIMIT} more`}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="work" className="fo-section">
          <div className="fo-head">
            <span className="mono">02 · projects</span>
            <h2>Open a folder.</h2>
            <p>Hover to peek inside, click to read the case study.</p>
          </div>
          <ProjectIndex projects={projects} />
        </section>

        <section id="path" className="fo-section">
          <div className="fo-head">
            <span className="mono">03 · journey</span>
            <h2>Where I&apos;ve been.</h2>
            <p>Work, college and school, most recent first.</p>
          </div>
          <ol className="fo-vlist" ref={vlist}>
            {path.map((s, i) => (
              <li key={`${s.title}-${i}`} className="fo-vitem">
                <span className="fo-vnode" aria-hidden="true" />
                <div className="fo-vmeta mono">
                  <b>{s.kind}</b>
                  {s.when && <span>{s.when}</span>}
                </div>
                <div className="fo-vcard">
                  <h3>{s.title}</h3>
                  {s.sub && <span className="fo-psub mono">{s.sub}</span>}
                  <ul>
                    {s.lines.map((l, j) => (
                      <li key={j}>{l}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>

          <div className="fo-certs-head mono">Certifications · {certs.length}</div>
          <div className="fo-marq">
            {[0, 1].map((row) => (
              <div className={`fo-marq-row r${row}`} key={row}>
                {[0, 1].map((copy) => (
                  <div className="fo-marq-set" key={copy} aria-hidden={copy === 1 ? true : undefined}>
                    {(row === 1 ? [...certs].reverse() : certs).map((c, k) => (
                      <a
                        key={`${c.name}-${k}`}
                        className="fo-cert"
                        href={c.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={copy === 1 || row === 1 ? -1 : 0}
                      >
                        <i aria-hidden="true">✦</i> {c.name}
                        {copy === 0 && row === 0 && <span className="sr"> (opens in a new tab)</span>}
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="fo-section fo-contact">
          <div className="fo-head">
            <span className="mono">04 · contact</span>
            <p>Fill in the sentence. It opens a draft in your email app; nothing is sent from this page.</p>
          </div>
          <form
            className="fo-sentence"
            onSubmit={(e) => {
              e.preventDefault();
              draft();
            }}
          >
            <p>
              Hi Akshat, I&apos;m{" "}
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="your name" aria-label="Your name" />, and
              I&apos;m reaching out about
            </p>
            <div className="fo-intents" role="radiogroup" aria-label="What about">
              {INTENTS.map((t) => (
                <button
                  type="button"
                  key={t}
                  role="radio"
                  aria-checked={intent === t}
                  className={intent === t ? "on" : ""}
                  onClick={() => setIntent(t)}
                >
                  {t}
                </button>
              ))}
            </div>
            <p>
              Here&apos;s the idea:{" "}
              <input className="long" value={idea} onChange={(e) => setIdea(e.target.value)} placeholder="a line or two" aria-label="Your message" />
            </p>
            <div className="fo-send">
              <button className="fo-btn pri" type="submit">
                Create email draft →
              </button>
              {sent && <span className="mono fo-sent">Draft opened in your mail app.</span>}
            </div>
          </form>
        </section>

        <FolioFooter name={person.name} email={person.email} links={links} year={new Date().getFullYear()} />
      </main>

      <Ask email={person.email} />
    </div>
  );
}
