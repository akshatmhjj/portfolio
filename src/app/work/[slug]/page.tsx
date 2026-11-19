import Link from "next/link";
import { notFound } from "next/navigation";
import { Meta, Schema } from "@/lib/seo";
import { Metadata } from "next";
import { baseURL, about, person, work } from "@/resources";
import { RqPage } from "@/components/request/PageShell";
import { Prose } from "@/components/request/Prose";
import { Toc } from "@/components/request/Chrome";
import { getHeadings } from "@/components/request/slug";
import { getSortedPosts, projectAccent } from "@/components/request/projects";
import { PROJECT_META } from "@/components/request/data";
import { MetricValue } from "@/components/request/ui";
import { ProjectArt } from "@/components/request/ProjectArt";
import { ogUrl, projectAccentHex } from "@/components/request/og";
import { ScrollToHash } from "@/components/ScrollToHash";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return getSortedPosts().map((post) => ({ slug: post.slug }));
}

async function findPost(params: Promise<{ slug: string | string[] }>) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug) ? routeParams.slug.join("/") : routeParams.slug || "";
  const posts = getSortedPosts();
  const index = posts.findIndex((p) => p.slug === slugPath);
  return { posts, index, post: index >= 0 ? posts[index] : undefined };
}

// Link-preview image for a project: title, summary, headline metrics, in the project's layer colour.
function projectOg(post: NonNullable<Awaited<ReturnType<typeof findPost>>["post"]>) {
  const m = post.metadata;
  return ogUrl({
    kind: "project",
    title: m.title,
    sub: m.summary,
    accent: projectAccentHex(PROJECT_META[post.slug]?.layer),
    tag: `project · ${new Date(m.publishedAt).getFullYear()}`,
    stats: m.metrics,
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const { post } = await findPost(params);
  if (!post) return {};

  return Meta.generate({
    title: `${post.metadata.title} – ${person.name}`,
    description: post.metadata.summary,
    baseURL: baseURL,
    image: projectOg(post),
    path: `${work.path}/${post.slug}`,
  });
}

export default async function Project({ params }: { params: Promise<{ slug: string | string[] }> }) {
  const { posts, index, post } = await findPost(params);
  if (!post) notFound();

  const m = post.metadata;
  const meta = PROJECT_META[post.slug];
  const accent = projectAccent(post.slug);
  const headings = getHeadings(post.content);
  const next = posts[(index + 1) % posts.length];
  const prev = posts[(index - 1 + posts.length) % posts.length];
  const cover = m.image || m.images[0];

  return (
    <RqPage accent={accent}>
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        path={`${work.path}/${post.slug}`}
        title={m.title}
        description={m.summary}
        datePublished={m.publishedAt}
        dateModified={m.publishedAt}
        image={projectOg(post)}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <section className="fo-dt-top">
        <Link href="/#work" className="fo-dt-back mono">
          ← all projects
        </Link>
        <div className="fo-dt-meta mono">
          <span>PROJECT · {new Date(m.publishedAt).getFullYear()}</span>
          {meta && (
            <span className="badge" style={{ "--bd": meta.badgeColor } as React.CSSProperties}>
              {meta.badge}
            </span>
          )}
          {meta && <span>{meta.role}</span>}
        </div>
        <h1 className="fo-dt-title">{m.title}</h1>
        <p className="fo-dt-lede">{m.summary}</p>

        {m.versions && m.versions.length > 0 && (
          <div className="fo-dt-vers">
            {m.versions.map((v) => (
              <a key={v.label} href={v.link} target="_blank" rel="noopener noreferrer" className="chip">
                <b>{v.label}</b> {v.name} ↗<span className="sr"> (opens in a new tab)</span>
              </a>
            ))}
          </div>
        )}

        <div className="fo-dt-actions">
          {m.link && (
            <a className="fo-btn pri" href={m.link} target="_blank" rel="noopener noreferrer">
              Live site ↗<span className="sr"> (opens in a new tab)</span>
            </a>
          )}
          {m.source && (
            <a className="fo-btn" href={m.source} target="_blank" rel="noopener noreferrer">
              Source ↗<span className="sr"> (opens in a new tab)</span>
            </a>
          )}
        </div>
      </section>

      <div className="fo-dt-cover" data-art-host>
        <ProjectArt slug={post.slug} title={m.title} image={cover} />
      </div>

      {m.metrics && m.metrics.length > 0 && (
        <div className="fo-dt-stats">
          {m.metrics.map((x) => (
            <div key={x.label}>
              <b>
                <MetricValue value={x.value} />
              </b>
              <span>{x.label}</span>
            </div>
          ))}
        </div>
      )}

      {m.stack && m.stack.length > 0 && (
        <div className="chips fo-dt-stack">
          {m.stack.map((s) => (
            <span className="chip" key={s}>
              {s}
            </span>
          ))}
        </div>
      )}

      {meta && <div className="fo-dt-flow mono">{meta.flow.join("  →  ")}</div>}

      <div className="doc">
        {headings.length > 1 ? <Toc items={headings} /> : <div />}
        <article>
          <Prose source={post.content} />
        </article>
      </div>

      <nav className="fo-dt-next" aria-label="More projects">
        <Link href={`/work/${prev.slug}`}>
          <span className="mono">← previous</span>
          <h3>{prev.metadata.title}</h3>
        </Link>
        <Link href={`/work/${next.slug}`}>
          <span className="mono">next →</span>
          <h3>{next.metadata.title}</h3>
        </Link>
      </nav>

      <ScrollToHash />
    </RqPage>
  );
}
