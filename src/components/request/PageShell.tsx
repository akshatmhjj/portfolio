import { person, social } from "@/resources";
import "./request.css";
import "@/components/folio/folio.css";
import { rqFontClasses } from "./fonts";
import { FolioHeader } from "@/components/folio/FolioHeader";
import { FolioFooter } from "@/components/folio/FolioFooter";
import { Ask } from "@/components/folio/Ask";

/** Frame for the inner pages (case studies): the same pill header, footer and assistant as the home page. */
export function RqPage({ children, accent }: { children: React.ReactNode; accent?: string }) {
  const links = [
    ...social.filter((s) => s.name !== "Email").map((s) => ({ name: s.name, href: s.link })),
    { name: "Resume", href: encodeURI("/Akshat Mahajan Resume.pdf") },
  ];
  return (
    <div className={`rq fo ${rqFontClasses}`} style={accent ? ({ "--c": accent } as React.CSSProperties) : undefined}>
      <FolioHeader />
      <main id="main" tabIndex={-1} className="fo-inner">
        <div className="wrap inner">{children}</div>
        <FolioFooter name={person.name} email={person.email} links={links} year={new Date().getFullYear()} />
      </main>
      <Ask email={person.email} />
    </div>
  );
}
