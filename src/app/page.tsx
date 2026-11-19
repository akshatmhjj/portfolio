import { Fragment } from "react";
import { Meta, Schema } from "@/lib/seo";
import { baseURL, about, person, social } from "@/resources";
import { getSortedPosts } from "@/components/request/projects";
import { PROJECT_META } from "@/components/request/data";
import { ogUrl } from "@/components/request/og";
import FolioSite from "@/components/folio/FolioSite";

// Link-preview image for the home page.
const homeOg = ogUrl({
  kind: "home",
  title: person.name,
  sub: "Software engineer. Fast web & iOS, and AI that cites its sources or refuses.",
});

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: homeOg,
    path: about.path,
  });
}

export default function Home() {
  const projects = getSortedPosts().map((p) => {
    const m = p.metadata;
    const meta = PROJECT_META[p.slug];
    return {
      slug: p.slug,
      title: m.title,
      summary: m.summary,
      image: m.image || m.images[0] || "",
      year: new Date(m.publishedAt).getFullYear(),
      role: meta?.role ?? "",
      badge: meta?.badge ?? "",
      stack: m.stack || [],
      metrics: (m.metrics || []).slice(0, 3),
      flow: meta?.flow ?? [],
      link: m.link || "",
      source: m.source || "",
    };
  });

  return (
    <>
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={homeOg}
        author={{ name: person.name, url: `${baseURL}${about.path}`, image: `${baseURL}${person.avatar}` }}
      />
      <FolioSite
      links={[
        ...social.filter((x) => x.name !== "Email").map((x) => ({ name: x.name, href: x.link })),
        { name: "Resume", href: encodeURI("/Akshat Mahajan Resume.pdf") },
      ]}
      person={{
        name: person.name,
        role: person.role,
        location: person.location,
        email: person.email,
        avatar: person.avatar,
        languages: person.languages ?? [],
      }}
      about={{
        experience: about.work.experiences.map((e) => ({
          company: e.company,
          role: e.role,
          timeframe: e.timeframe,
          achievements: e.achievements.map((a, i) => <Fragment key={i}>{a}</Fragment>),
        })),
        skills: about.technical.skills.map((g) => ({ title: g.title, tags: (g.tags ?? []).map((t) => t.name) })),
        education: about.studies.institutions.map((i) => ({ name: i.name, description: i.description })),
        certifications: about.certifications.items.map((c) => ({ name: c.name, link: c.link })),
      }}
      projects={projects}
    />
    </>
  );
}
