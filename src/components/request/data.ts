// Per-project extras for the home page and case studies.
// Project facts (summary, metrics, stack, links, cover) come from the MDX files in
// src/app/work/projects; this file only holds what is specific to the layout.

export type Layer = "data" | "ai";

// Keyed by MDX slug. Unknown slugs fall back to the "data" layer.
export const PROJECT_META: Record<
  string,
  { layer: Layer; role: string; badge: string; badgeColor: string; flow: string[] }
> = {
  "url-shortener": {
    layer: "data",
    role: "URL management platform",
    badge: "live",
    badgeColor: "var(--c4)",
    flow: ["Create link", "Short code", "Redis cache", "Redirect"],
  },
  predicteye: {
    layer: "data",
    role: "Value prediction",
    badge: "live",
    badgeColor: "var(--c4)",
    flow: ["Photo", "Model", "Cached range", "Worth now & later"],
  },
  "rag-chatbot": {
    layer: "ai",
    role: "Local RAG document chatbot",
    badge: "open source",
    badgeColor: "var(--c1)",
    flow: ["Documents", "Chunk + embed", "Retrieve", "Guard", "Answer or refuse"],
  },
  "code-journey": {
    layer: "ai",
    role: "Role-based career map + AI guide",
    badge: "live",
    badgeColor: "var(--c4)",
    flow: ["Pick a role", "Ordered skills", "Official docs & free resources", "CJ AI answers, cited"],
  },
};
