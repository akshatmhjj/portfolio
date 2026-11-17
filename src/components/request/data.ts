// Curated copy + config for the "Request" UI.
// Project facts (summary, metrics, stack, links, cover) come from the MDX files in
// src/app/work/projects — this file only holds what's specific to this layout.

export const WORDS: [string, string][] = [
  ["speed.", "45% lower API latency · 800 → 440 ms"],
  ["trust.", "200+ tests · JWT, RBAC, signed webhooks"],
  ["scale.", "80+ endpoints · multi-tenant IoT platform"],
  ["honesty.", "92.9% correct refusals · Grounded RAG"],
];

export const SECTIONS = [
  { id: "s1", label: "01 client", off: [0, 16] },
  { id: "s2", label: "02 api", off: [14, 22] },
  { id: "s3", label: "03 data", off: [34, 28] },
  { id: "s4", label: "04 ai", off: [56, 34] },
  { id: "s5", label: "05 response", off: [88, 12] },
] as const;

export type Metric = { value: number; dec?: number; prefix?: string; suffix?: string; label: string };

export const CLIENT_CARDS: {
  company: string;
  role: string;
  when: string;
  metrics: Metric[];
  note: string;
}[] = [
  {
    company: "Itigai Technologies",
    role: "Frontend Developer Intern",
    when: "Aug – Oct 2025",
    metrics: [
      { value: 25, suffix: "%", label: "faster page loads (FCP 3.2 → 2.4 s)" },
      { value: 60, suffix: "%", label: "fewer redundant API calls" },
    ],
    note: "Code splitting and memoization, centralized state with API caching, and a real-time WebSocket chatbot under 500 ms.",
  },
  {
    company: "DigiValet",
    role: "Software Engineer Intern · iOS",
    when: "Jan – Jun 2026",
    metrics: [
      { value: 45, suffix: "%", label: "lower API latency (800 → 440 ms)" },
      { value: 25, suffix: "%", label: "better app stability (root-caused runtime failures)" },
    ],
    note: "A modular client SDK on MVVM + dependency injection cut partner integration time 20% and code duplication 30%.",
  },
];

export const API_CARD = {
  company: "MLock Innovations",
  role: "Software Engineer · multi-tenant IoT platform",
  when: "Sep 2026 → now",
  metrics: [
    { value: 80, suffix: "+", label: "REST endpoints across three Next.js + TS apps" },
    { value: 200, suffix: "+", label: "automated tests: JWT, RBAC, tenant isolation" },
    { value: 0, label: "duplicate charges: idempotent capture, signed webhooks" },
  ] as Metric[],
};

export type Layer = "data" | "ai";
export type DemoKind = "shortify" | "predictye" | "grounded";

// Keyed by MDX slug. Unknown slugs fall back to the "data" layer with no demo.
export const PROJECT_META: Record<
  string,
  { layer: Layer; role: string; badge: string; badgeColor: string; demo?: DemoKind; flow: string[] }
> = {
  "url-shortener": {
    layer: "data",
    role: "URL management platform",
    badge: "live",
    badgeColor: "var(--c4)",
    demo: "shortify",
    flow: ["Create link", "Short code", "Redis cache", "Redirect"],
  },
  predicteye: {
    layer: "data",
    role: "Value prediction",
    badge: "live",
    badgeColor: "var(--c4)",
    demo: "predictye",
    flow: ["Photo", "Model", "Cached range", "Worth now & later"],
  },
  "rag-chatbot": {
    layer: "ai",
    role: "Local RAG document chatbot",
    badge: "open source",
    badgeColor: "var(--c1)",
    demo: "grounded",
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

export const GROUNDED_QA = [
  {
    ok: true,
    score: 0.82,
    text: "Refunds are accepted within 30 days of purchase, with proof of payment.",
    cite: "policy.md §2.1",
  },
  { ok: false, score: 0.19, text: "I can't answer that from your documents.", cite: "" },
];

export const B62 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
