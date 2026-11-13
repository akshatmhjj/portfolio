import Link from "next/link";
import { RqPage } from "@/components/request/PageShell";

export const metadata = {
  title: "Page not found – Akshat Mahajan",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <RqPage>
      <section className="wk-hero" style={{ "--c": "var(--c5)" } as React.CSSProperties}>
        <span className="stag">404 · not found</span>
        <h1 className="h1 wk-title">
          Request <span className="grad">failed.</span>
        </h1>
        <p className="lede">
          The page you asked for doesn&apos;t exist, or it moved. The rest of the system is up.
        </p>
        <div className="actions">
          <Link className="btn pri" href="/">
            Back to the request
          </Link>
          <Link className="btn ghost" href="/work">
            See the work
          </Link>
        </div>
      </section>
    </RqPage>
  );
}
