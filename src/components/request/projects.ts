import { getPosts } from "@/utils/utils";
import { PROJECT_META } from "./data";

type Post = ReturnType<typeof getPosts>[number];

/** All projects from src/app/work/projects, ordered by `order` then newest first. */
export function getSortedPosts(): Post[] {
  return getPosts(["src", "app", "work", "projects"]).sort((a, b) => {
    const oa = a.metadata.order ?? Number.MAX_SAFE_INTEGER;
    const ob = b.metadata.order ?? Number.MAX_SAFE_INTEGER;
    if (oa !== ob) return oa - ob;
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });
}

/** Accent colour for a project, matching the layer it belongs to on the home page. */
export function projectAccent(slug: string): string {
  const layer = PROJECT_META[slug]?.layer;
  return layer === "ai" ? "var(--c4)" : layer === "data" ? "var(--c3)" : "var(--c1)";
}
