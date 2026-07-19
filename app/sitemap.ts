import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ares-reflight.vercel.app";
  return ["", "/development", "/documentation", "/roadmap", "/about"].map((route) => ({ url: `${base}${route}`, lastModified: new Date(), changeFrequency: route ? "monthly" : "weekly", priority: route ? 0.8 : 1 }));
}
