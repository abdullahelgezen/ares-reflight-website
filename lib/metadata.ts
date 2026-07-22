import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/content/site";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

export function createPageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  modifiedTime,
}: PageMetadataInput): Metadata {
  const canonical = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical },
    authors: [{ name: "Abdullah Mert Elgezen", url: `${SITE_URL}/about` }],
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "en_US",
      type,
      ...(type === "article" ? { publishedTime, modifiedTime, authors: [`${SITE_URL}/about`] } : {}),
      images: [
        {
          url: "/og.png",
          width: 1733,
          height: 907,
          alt: "ARES ReFlight Engineering Log social card with a conceptual white uncrewed research aircraft and the statement Evidence before confidence",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
  };
}
