import type { MetadataRoute } from "next";
import { engineeringArticles } from "@/content/articles";
import { developmentEntries } from "@/content/project";
import { CONTENT_REVIEW_DATE, SITE_URL } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/development", "/documentation", "/roadmap", "/about", "/engineering-log", "/transparency", "/open-knowledge", "/contribute", "/corrections"];
  const staticPages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({ url: `${SITE_URL}${route}`, lastModified: new Date(`${CONTENT_REVIEW_DATE}T00:00:00Z`), changeFrequency: route === "" || route === "/engineering-log" ? "weekly" : "monthly", priority: route === "" ? 1 : route === "/engineering-log" ? 0.9 : 0.75 }));
  const articlePages: MetadataRoute.Sitemap = engineeringArticles.map((article) => ({ url: `${SITE_URL}/engineering-log/${article.slug}`, lastModified: new Date(`${article.updated}T00:00:00Z`), changeFrequency: "monthly", priority: 0.8 }));
  const developmentPages: MetadataRoute.Sitemap = developmentEntries.map((entry) => ({ url: `${SITE_URL}/development/${entry.slug}`, lastModified: new Date(`${CONTENT_REVIEW_DATE}T00:00:00Z`), changeFrequency: "monthly", priority: 0.6 }));
  return [...staticPages, ...articlePages, ...developmentPages];
}
