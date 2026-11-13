// Builds URLs for the /api/og/generate link-preview image.
// Hex values mirror the dark-theme tokens in request.css (images can't use CSS variables).

export const OG_COLORS = {
  c1: "#7aa2ff",
  c2: "#b794ff",
  c3: "#ffb454",
  c4: "#5ef2c0",
  c5: "#ff8a6b",
} as const;

export type OgParams = {
  kind: "home" | "work" | "project";
  title: string;
  sub?: string;
  /** hex colour, e.g. "#ffb454" */
  accent?: string;
  tag?: string;
  stats?: { value: string; label: string }[];
  chips?: string[];
};

export function ogUrl(p: OgParams): string {
  const q = new URLSearchParams();
  q.set("kind", p.kind);
  q.set("title", p.title);
  if (p.sub) q.set("sub", p.sub);
  if (p.accent) q.set("accent", p.accent);
  if (p.tag) q.set("tag", p.tag);
  if (p.stats?.length) q.set("stats", p.stats.slice(0, 3).map((s) => `${s.value}~${s.label}`).join("|"));
  if (p.chips?.length) q.set("chips", p.chips.slice(0, 5).join("|"));
  return `/api/og/generate?${q.toString()}`;
}

/** Accent hex for a project slug, matching the layer colours used on the site. */
export function projectAccentHex(layer?: "data" | "ai"): string {
  return layer === "ai" ? OG_COLORS.c4 : layer === "data" ? OG_COLORS.c3 : OG_COLORS.c1;
}
