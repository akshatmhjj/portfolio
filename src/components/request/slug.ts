/** Stable heading ids; used by both the MDX renderer and the outline. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Pulls the "## Heading" lines out of an MDX body. */
export function getHeadings(source: string): { id: string; text: string }[] {
  return [...source.matchAll(/^##\s+(.+)$/gm)].map((m) => {
    const text = m[1].trim();
    return { id: slugify(text), text };
  });
}
