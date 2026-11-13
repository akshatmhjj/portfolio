import Link from "next/link";
import { person, social } from "@/resources";
import "./request.css";
import { rqFontClasses } from "./fonts";
import { SiteHeader } from "./SiteHeader";

/** Frame for the inner pages of the new UI (header, themed background, footer). */
export function RqPage({ children, accent }: { children: React.ReactNode; accent?: string }) {
  const links = social.filter((s) => s.name !== "Email").map((s) => ({ name: s.name, link: s.link }));
  return (
    <div className={`rq ${rqFontClasses}`} style={accent ? ({ "--c": accent } as React.CSSProperties) : undefined}>
      <SiteHeader name={person.name} email={person.email} links={links} resumeHref={encodeURI("/Akshat Mahajan Resume.pdf")} />
      <main id="main" tabIndex={-1}>
        <div className="wrap inner">{children}</div>
      </main>
      <div className="wrap">
        <footer className="foot mono">
          <span>
            © {new Date().getFullYear()} {person.name}
          </span>
          <Link href="/">back to the request ↑</Link>
        </footer>
      </div>
    </div>
  );
}
