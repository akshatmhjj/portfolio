import { Meta, Schema } from "@once-ui-system/core";
import { baseURL, about, person, social } from "@/resources";
import { getPosts } from "@/utils/utils";
import RequestSite from "@/components/request/RequestSite";
import type { ProjectData } from "@/components/request/types";

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
    path: about.path,
  });
}

// Projects come straight from the MDX files in src/app/work/projects,
// so adding/editing a project there updates this page too.
function loadProjects(): ProjectData[] {
  return getPosts(["src", "app", "work", "projects"])
    .sort((a, b) => {
      const oa = a.metadata.order ?? Number.MAX_SAFE_INTEGER;
      const ob = b.metadata.order ?? Number.MAX_SAFE_INTEGER;
      if (oa !== ob) return oa - ob;
      return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
    })
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
        image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
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
