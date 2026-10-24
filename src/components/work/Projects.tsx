import { getPosts } from "@/utils/utils";
import { Column } from "@once-ui-system/core";
import { ProjectCard } from "@/components";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
}

export function Projects({ range, exclude }: ProjectsProps) {
  let allProjects = getPosts(["src", "app", "work", "projects"]);

  // Exclude by slug (exact match)
  if (exclude && exclude.length > 0) {
    allProjects = allProjects.filter((post) => !exclude.includes(post.slug));
  }

  // Projects with an explicit `order` come first, in that order; the rest follow by date
  const sortedProjects = allProjects.sort((a, b) => {
    const orderA = a.metadata.order ?? Number.MAX_SAFE_INTEGER;
    const orderB = b.metadata.order ?? Number.MAX_SAFE_INTEGER;
    if (orderA !== orderB) return orderA - orderB;
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  const [featured, ...others] = displayedProjects;

  const renderCard = (post: (typeof displayedProjects)[number], index: number, isFeatured: boolean) => (
    <ProjectCard
      key={post.slug}
      priority={index < 2}
      featured={isFeatured}
      year={new Date(post.metadata.publishedAt).getFullYear()}
      href={`/work/${post.slug}`}
      title={post.metadata.title}
      description={post.metadata.summary}
      content={post.content}
      image={post.metadata.image || post.metadata.images[0]}
      stack={post.metadata.stack || []}
      metrics={post.metadata.metrics || []}
      link={post.metadata.link || ""}
      source={post.metadata.source || ""}
    />
  );

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      {featured && renderCard(featured, 0, true)}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "24px",
        }}
      >
        {others.map((post, index) => renderCard(post, index + 1, false))}
      </div>
    </Column>
  );
}
