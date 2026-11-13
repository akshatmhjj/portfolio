import Link from "next/link";
import { Meta, Schema } from "@/lib/seo";
import { baseURL, about, person, work } from "@/resources";
import { RqPage } from "@/components/request/PageShell";
import { getSortedPosts, projectAccent } from "@/components/request/projects";
import { PROJECT_META } from "@/components/request/data";
import { MetricValue, Rv } from "@/components/request/ui";
import { ProjectArt } from "@/components/request/ProjectArt";
import { ogUrl } from "@/components/request/og";

function workOg() {
  return ogUrl({
    kind: "work",
    title: "Things I've built.",
    sub: "Web, iOS and AI projects, from a role-based career map to a chatbot that refuses to guess.",
    tag: "work",
    chips: getSortedPosts().map((p) => p.metadata.title),
  });
}

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: workOg(),
    path: work.path,
  });
}

export default function Work() {
  const posts = getSortedPosts();

  return (
    <RqPage>
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={workOg()}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <section className="wk-hero" style={{ "--c": "var(--c1)" } as React.CSSProperties}>
        <Rv as="span" className="stag" now>
          work · {posts.length} projects
        </Rv>
        <Rv as="h1" className="h1 wk-title" delay={0.06} now>
          Things I&apos;ve <span className="grad">built.</span>
        </Rv>
        <Rv as="p" className="lede" delay={0.14} now>
          Each one started as a question I wanted answered: how fast can this be, how far can I trust it, what
          happens when it doesn&apos;t know. Open a project for the full story.
        </Rv>
      </section>

      <div className="wk-grid">
        {posts.map((p, i) => {
          const meta = PROJECT_META[p.slug];
          const m = p.metadata;
          return (
            <Rv key={p.slug} delay={(i % 2) * 0.1} style={{ "--c": projectAccent(p.slug) } as React.CSSProperties}>
              <Link href={`/work/${p.slug}`} className="card wcard" data-art-host>
                <div className="cardimg">
                  <ProjectArt slug={p.slug} title={m.title} image={m.image || m.images[0]} />
                </div>
                <div className="crow">
                  <span className="mono">PROJECT · {new Date(m.publishedAt).getFullYear()}</span>
                  {meta && (
                    <span className="badge" style={{ "--bd": meta.badgeColor } as React.CSSProperties}>
                      {meta.badge}
                    </span>
                  )}
                </div>
                <h2 className="wt">{m.title}</h2>
                {meta && <div className="role">{meta.role}</div>}
                <p className="wsum">{m.summary}</p>
                <div className="mx">
                  {(m.metrics || []).slice(0, 3).map((x) => (
                    <div className="m" key={x.label}>
                      <b>
                        <MetricValue value={x.value} />
                      </b>
                      <span>{x.label}</span>
                    </div>
                  ))}
                </div>
                <div className="chips">
                  {(m.stack || []).slice(0, 5).map((s) => (
                    <span className="chip" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
                <div className="wgo">
                  Read the case study <span aria-hidden>→</span>
                </div>
              </Link>
            </Rv>
          );
        })}
      </div>
    </RqPage>
  );
}
