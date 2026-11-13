import { ImageResponse } from "next/og";
import { baseURL, person } from "@/resources";

export const runtime = "nodejs";

const C = ["#7aa2ff", "#b794ff", "#ffb454", "#5ef2c0", "#ff8a6b"];
const TRACE = ["client", "api", "data", "ai", "200 OK"];

async function loadGoogleFont(family: string, weight: number): Promise<ArrayBuffer | null> {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${family}:wght@${weight}`)).text();
    const match = [...css.matchAll(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/g)].pop();
    if (!match) return null;
    const res = await fetch(match[1]);
    return res.status === 200 ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

const clip = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s);
const hex = (v: string | null, fallback: string) => (v && /^#[0-9a-f]{6}$/i.test(v) ? v : fallback);

export async function GET(request: Request) {
  const sp = new URL(request.url).searchParams;
  const kind = sp.get("kind") || "home";
  const title = clip(sp.get("title") || person.name, 40);
  const sub = clip(sp.get("sub") || "", 150);
  const accent = hex(sp.get("accent"), C[0]);
  const tag = sp.get("tag") || "";
  const stats = (sp.get("stats") || "")
    .split("|")
    .filter(Boolean)
    .slice(0, 3)
    .map((s) => {
      const [value, label] = s.split("~");
      return { value: clip(value || "", 10), label: clip(label || "", 26) };
    });
  const chips = (sp.get("chips") || "")
    .split("|")
    .filter(Boolean)
    .slice(0, 5)
    .map((c) => clip(c, 18));
  const host = (() => {
    try {
      return new URL(baseURL).host;
    } catch {
      return "";
    }
  })();

  const [heading, body] = await Promise.all([
    loadGoogleFont("Bricolage+Grotesque", 800),
    loadGoogleFont("DM+Sans", 500),
  ]);
  const fonts = [
    heading && { name: "Bricolage", data: heading, weight: 800 as const, style: "normal" as const },
    body && { name: "DM Sans", data: body, weight: 500 as const, style: "normal" as const },
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 800 | 500; style: "normal" }[];

  const head = heading ? "Bricolage" : "sans-serif";
  const text = body ? "DM Sans" : "sans-serif";

  // Title: the last word gets the gradient, like the headline on the site.
  const words = title.split(" ");
  const lastWord = kind === "home" ? "" : words.pop() || "";
  const lead = kind === "home" ? "" : words.join(" ");

  const pill = (label: string, color: string, key: string) => (
    <div
      key={key}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 22px",
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,0.14)",
        background: "rgba(255,255,255,0.05)",
        fontFamily: text,
        fontSize: 24,
        color: "#c5cad5",
      }}
    >
      <div style={{ display: "flex", width: 12, height: 12, borderRadius: 999, background: color }} />
      {label}
    </div>
  );

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        color: "#eceef2",
        fontFamily: text,
        backgroundColor: "#090b0f",
        backgroundImage:
          "radial-gradient(circle at 88% 8%, rgba(122,162,255,0.26), rgba(9,11,15,0) 46%), radial-gradient(circle at 0% 100%, rgba(94,242,192,0.16), rgba(9,11,15,0) 48%)",
      }}
    >
      {/* five-colour trace bar */}
      <div style={{ display: "flex", width: "100%", height: 12 }}>
        {C.map((c) => (
          <div key={c} style={{ display: "flex", flex: 1, background: c }} />
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "40px 72px 48px", justifyContent: "space-between" }}>
        {/* header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 58,
                height: 58,
                borderRadius: 16,
                color: "#0b0d12",
                fontFamily: head,
                fontWeight: 800,
                fontSize: 32,
                backgroundImage: "linear-gradient(135deg, #7aa2ff, #b794ff)",
              }}
            >
              {person.name[0]}
            </div>
            <div style={{ display: "flex", fontFamily: head, fontWeight: 800, fontSize: 34, letterSpacing: -0.5 }}>
              {person.name}
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#8b92a1" }}>{host}</div>
        </div>

        {/* main */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {kind === "home" ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  fontFamily: head,
                  fontWeight: 800,
                  fontSize: 122,
                  lineHeight: 1,
                  letterSpacing: -5,
                }}
              >
                I build for
              </div>
              <div
                style={{
                  display: "flex",
                  fontFamily: head,
                  fontWeight: 800,
                  fontSize: 122,
                  lineHeight: 1.05,
                  letterSpacing: -5,
                  color: "#5ef2c0",
                  backgroundImage: "linear-gradient(95deg, #5ef2c0, #7aa2ff 60%, #b794ff)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                }}
              >
                <span style={{ color: "transparent" }}>speed.</span>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
                <div style={{ display: "flex", width: 44, height: 4, borderRadius: 2, background: accent }} />
                <div style={{ display: "flex", fontSize: 26, letterSpacing: 4, color: accent, textTransform: "uppercase" }}>
                  {tag || (kind === "work" ? "work" : "project")}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  fontFamily: head,
                  fontWeight: 800,
                  fontSize: title.length > 18 ? 104 : 132,
                  lineHeight: 1.02,
                  letterSpacing: -5,
                }}
              >
                {lead && <span style={{ marginRight: 28 }}>{lead}</span>}
                <span style={{ color: accent }}>{lastWord}</span>
              </div>
            </div>
          )}
          {sub && (
            <div style={{ display: "flex", marginTop: 22, fontSize: 30, lineHeight: 1.35, color: "#a7aebb", maxWidth: 1040 }}>
              {sub}
            </div>
          )}
        </div>

        {/* footer */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {stats.length > 0
            ? stats.map((s) => (
                <div
                  key={s.label}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "16px 28px",
                    borderRadius: 22,
                    border: "1px solid rgba(255,255,255,0.14)",
                    background: "rgba(255,255,255,0.05)",
                  }}
                >
                  <div style={{ display: "flex", fontFamily: head, fontWeight: 800, fontSize: 56, lineHeight: 1, letterSpacing: -2 }}>
                    {s.value}
                  </div>
                  <div style={{ display: "flex", marginTop: 8, fontSize: 22, color: "#8b92a1" }}>{s.label}</div>
                </div>
              ))
            : chips.length > 0
              ? chips.map((c, i) => pill(c, C[i % 5], `c${i}`))
              : TRACE.map((t, i) => pill(t, C[i], `t${i}`))}
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: fonts.length ? fonts : undefined,
    },
  );
}
