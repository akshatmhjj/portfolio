import Link from "next/link";
import { RqPage } from "@/components/request/PageShell";

export const metadata = {
  title: "Page not found – Akshat Mahajan",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <RqPage>
      <section className="fo-404">
        <div className="fo-404-num" aria-hidden="true">
          404
        </div>
        <h1>This page wandered off.</h1>
        <p>The page you asked for doesn&apos;t exist, or it moved. The rest of the portfolio is right where you left it.</p>
        <div className="fo-cta">
          <Link className="fo-btn pri" href="/">
            Back to home
          </Link>
          <Link className="fo-btn" href="/#work">
            See the projects
          </Link>
        </div>
      </section>
    </RqPage>
  );
}
