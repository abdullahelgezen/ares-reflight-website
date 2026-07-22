import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: ["Googlebot", "Bingbot", "OAI-SearchBot", "ChatGPT-User", "GPTBot", "ClaudeBot", "Claude-SearchBot", "PerplexityBot", "Google-Extended"], allow: "/" },
      { userAgent: "*", allow: "/" },
    ],
    sitemap: "https://aresreflight.com/sitemap.xml",
    host: "https://aresreflight.com",
  };
}
