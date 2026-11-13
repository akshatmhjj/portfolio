import Script from "next/script";
import type { Metadata } from "next";

/**
 * Local copies of Once UI's `Meta.generate` and `<Schema>`.
 * They produce the same output, but importing them from `@once-ui-system/core` makes Next.js
 * ship the library's entire client bundle (~250 KB gzipped) to every page.
 */

type MetaInput = {
  title: string;
  description: string;
  baseURL: string;
  path?: string;
  type?: "website" | "article";
  image?: string;
  publishedTime?: string;
  author?: { name: string; url?: string };
  canonical?: string;
  robots?: string;
  noindex?: boolean;
  nofollow?: boolean;
};

function generateMetadata({
  title,
  description,
  baseURL,
  path = "",
  type = "website",
  image,
  publishedTime,
  author,
  canonical,
  robots,
  noindex,
  nofollow,
}: MetaInput): Metadata {
  const normalizedBaseURL = baseURL.endsWith("/") ? baseURL.slice(0, -1) : baseURL;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const ogImage = image
    ? image.startsWith("http")
      ? image
      : `${image.startsWith("/") ? "" : "/"}${image}`
    : `/api/og/generate?title=${encodeURIComponent(title)}`;
  const url = canonical || `${normalizedBaseURL}${normalizedPath}`;

  let robotsContent = robots;
  if (!robotsContent && (noindex || nofollow)) {
    robotsContent = `${noindex ? "noindex" : "index"},${nofollow ? "nofollow" : "follow"}`;
  }

  return {
    metadataBase: new URL(normalizedBaseURL.startsWith("https://") ? normalizedBaseURL : `https://${normalizedBaseURL}`),
    title,
    description,
    openGraph: {
      title,
      description,
      type,
      ...(publishedTime && type === "article" ? { publishedTime } : {}),
      url,
      images: [{ url: ogImage, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
    ...(author ? { authors: [{ name: author.name, url: author.url }] } : {}),
    ...(robotsContent ? { robots: robotsContent } : {}),
  };
}

export const Meta = { generate: generateMetadata };

const SCHEMA_TYPES = {
  website: "WebSite",
  article: "Article",
  blogPosting: "BlogPosting",
  techArticle: "TechArticle",
  webPage: "WebPage",
  organization: "Organization",
} as const;

export function Schema({
  as,
  title,
  description,
  baseURL,
  path,
  datePublished,
  dateModified,
  image,
  sameAs = [],
  author,
}: {
  as: keyof typeof SCHEMA_TYPES;
  title: string;
  description: string;
  baseURL: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
  sameAs?: string[];
  author?: { name: string; url?: string; image?: string };
}) {
  const normalizedBaseURL = baseURL.endsWith("/") ? baseURL.slice(0, -1) : baseURL;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const imageUrl = image
    ? `${normalizedBaseURL}${image.startsWith("/") ? image : `/${image}`}`
    : `${normalizedBaseURL}/og?title=${encodeURIComponent(title)}`;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": SCHEMA_TYPES[as],
    url: `${normalizedBaseURL}${normalizedPath}`,
    sameAs: sameAs.filter(Boolean),
  };

  if (as === "website" || as === "organization") {
    schema.name = title;
    schema.description = description;
    schema.image = imageUrl;
  } else {
    schema.headline = title;
    schema.description = description;
    schema.image = imageUrl;
    if (datePublished) {
      schema.datePublished = datePublished;
      schema.dateModified = dateModified || datePublished;
    }
  }

  if (author) {
    schema.author = {
      "@type": "Person",
      name: author.name,
      ...(author.url && { url: author.url }),
      ...(author.image && { image: { "@type": "ImageObject", url: author.image } }),
    };
  }

  return (
    <Script
      id={`schema-${as}-${path}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
