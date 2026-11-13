import { Meta, Schema } from "@once-ui-system/core";
import { baseURL, about, person, social } from "@/resources";
import { getSortedPosts } from "@/components/request/projects";
import { ogUrl } from "@/components/request/og";
import RequestSite from "@/components/request/RequestSite";
import type { ProjectData } from "@/components/request/types";

// Link-preview image for the home page (matches the site's design).
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

// Projects come straight from the MDX files in src/app/work/projects,
// so adding/editing a project there updates this page too.
function loadProjects(): ProjectData[] {
  return getSortedPosts()
    .map((p) => ({
      slug: p.slug,
      title: p.metadata.title,
      summary: p.metadata.summary,
      image: p.metadata.image || p.metadata.images[0] || "",
      link: p.metadata.link || "",
      source: p.metadata.source || "",
      stack: p.metadata.stack || [],
      metrics: p.metadata.metrics || [],
      year: new Date(p.metadata.publishedAt).getFullYear(),
    }));
}

export default function Home() {
  return (
    <>
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={homeOg}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <RequestSite
        person={{
          name: person.name,
          role: person.role,
          email: person.email,
          location: person.location,
          languages: person.languages ?? [],
          avatar: person.avatar,
        }}
        social={social.map((s) => ({ name: s.name, link: s.link }))}
        projects={loadProjects()}
        resumeHref={encodeURI("/Akshat Mahajan Resume.pdf")}
      />
    </>
  );
}
