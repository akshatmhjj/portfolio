import Link from "next/link";
import { Meta, Schema } from "@/lib/seo";
import { baseURL, about, person, work } from "@/resources";
import { RqPage } from "@/components/request/PageShell";
import { getSortedPosts, projectAccent } from "@/components/request/projects";
import { PROJECT_META } from "@/components/request/data";
import { Rv } from "@/components/request/ui";
import { WorkList } from "@/components/request/WorkList";
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

      <WorkList
        items={posts.map((p) => {
          const m = p.metadata;
          const meta = PROJECT_META[p.slug];
          return {
            slug: p.slug,
            title: m.title,
            summary: m.summary,
            image: m.image || m.images[0] || "",
            year: new Date(m.publishedAt).getFullYear(),
            badge: meta?.badge,
            badgeColor: meta?.badgeColor,
            role: meta?.role,
            layer: meta?.layer ?? "data",
            accent: projectAccent(p.slug),
            metrics: (m.metrics || []).slice(0, 3),
            stack: (m.stack || []).slice(0, 5),
          };
        })}
      />
    </RqPage>
  );
}
