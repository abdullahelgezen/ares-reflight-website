import { articleText, engineeringArticles } from "@/content/articles";
import { PROJECT_LEAD, PROJECT_LEAD_TITLE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/content/site";

export const dynamic = "force-static";

export function GET() {
  const articleIndex = engineeringArticles
    .map(
      (article) => `\n\n---\n\n# ${article.title}\n\nURL: ${SITE_URL}/engineering-log/${article.slug}\nStatus: ${article.status}\nPublished: ${article.published}\nUpdated: ${article.updated}\nAuthor: ${PROJECT_LEAD}\n\n${articleText(article)}${article.sources ? `\n\nSources:\n${article.sources.map((source) => `- ${source.organization}, ${source.title}, ${source.publicationDate}, ${source.url}. Supports: ${source.supports}`).join("\n")}` : ""}`,
    )
    .join("");
  const body = `# ${SITE_NAME}: Public Documentation Index\n\n${SITE_DESCRIPTION}\n\nOfficial domain: ${SITE_URL}\nProject lead: ${PROJECT_LEAD} — ${PROJECT_LEAD_TITLE}\n\nEvidence boundary: ARES-01 software has been tested in local fixed-wing ArduPilot SITL. ARES Flight Computer baseline ARES-FC-REV-A-SCH-5C.0 is a bench/HIL prototype with Stage 6 digital PCB placement complete and is not flight approved. All 69 populated components are placed on a preliminary 60 × 85 mm four-layer board; 54 multi-node nets and 218 connectivity items remain intentionally unrouted. Human mechanical review is the current gate. There are no routed tracks, vias, copper zones, Gerbers, manufacturing package, fabrication order, physical sample, assembled board, power-up measurements, or flight validation. The physical aircraft, RF system, ground-station antenna, embedded-compute variant, and real-world disaster roles remain conceptual or unvalidated. No field deployment is claimed.\n\nKey pages:\n- ${SITE_URL}/engineering-log\n- ${SITE_URL}/development\n- ${SITE_URL}/documentation\n- ${SITE_URL}/roadmap\n- ${SITE_URL}/about\n- ${SITE_URL}/transparency\n- ${SITE_URL}/open-knowledge\n- ${SITE_URL}/contribute\n- ${SITE_URL}/corrections\n${articleIndex}\n`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
