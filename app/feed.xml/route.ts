import { engineeringArticles } from "@/content/articles";
import { PROJECT_LEAD, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/content/site";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");
}

export function GET() {
  const items = engineeringArticles.map((article) => {
    const url = `${SITE_URL}/engineering-log/${article.slug}`;
    return `<item><title>${escapeXml(article.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><description>${escapeXml(article.summary)}</description><dc:creator>${escapeXml(PROJECT_LEAD)}</dc:creator><category>${escapeXml(article.status)}</category><pubDate>${new Date(`${article.published}T12:00:00Z`).toUTCString()}</pubDate></item>`;
  }).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/"><channel><title>${SITE_NAME} Engineering Log</title><link>${SITE_URL}/engineering-log</link><description>${escapeXml(SITE_DESCRIPTION)}</description><language>en</language><lastBuildDate>${new Date("2026-07-22T12:00:00Z").toUTCString()}</lastBuildDate><atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
