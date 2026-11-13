import { MDXRemote } from "next-mdx-remote/rsc";
import type { ReactNode } from "react";
import { slugify } from "./slug";

const text = (children: ReactNode): string =>
  typeof children === "string"
    ? children
    : Array.isArray(children)
      ? children.map((c) => (typeof c === "string" ? c : "")).join("")
      : "";

const heading =
  (Tag: "h2" | "h3" | "h4") =>
  // eslint-disable-next-line react/display-name
  ({ children }: { children?: ReactNode }) => {
    const id = slugify(text(children));
    return (
      <Tag id={id}>
        <a href={`#${id}`} className="anchor" aria-label="Link to this section">
          #
        </a>
        {children}
      </Tag>
    );
  };

const components = {
  h2: heading("h2"),
  h3: heading("h3"),
  h4: heading("h4"),
  a: ({ href = "", children }: { href?: string; children?: ReactNode }) =>
    href.startsWith("/") || href.startsWith("#") ? (
      <a href={href}>{children}</a>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  // eslint-disable-next-line @next/next/no-img-element
  img: ({ src = "", alt = "" }: { src?: string; alt?: string }) => <img src={src} alt={alt} loading="lazy" />,
  table: ({ children }: { children?: ReactNode }) => (
    <div className="tablewrap">
      <table>{children}</table>
    </div>
  ),
};

/** Renders a project's MDX body in the new design's typography. */
export function Prose({ source }: { source: string }) {
  return (
    <div className="prose">
      <MDXRemote source={source} components={components} options={{ blockJS: false }} />
    </div>
  );
}
