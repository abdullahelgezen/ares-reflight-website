import { engineeringArticles } from "@/content/articles";
import { PROJECT_LEAD, PROJECT_LEAD_TITLE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/content/site";

export const dynamic = "force-static";

export function GET() {
  const articles = engineeringArticles
    .map((article) => `- ${article.title}: ${SITE_URL}/engineering-log/${article.slug}`)
    .join("\n");
  const body = `# ${SITE_NAME}\n\n> ${SITE_DESCRIPTION}\n\nOfficial domain: ${SITE_URL}\nProject lead: ${PROJECT_LEAD} — ${PROJECT_LEAD_TITLE}\n\n## Status\n\nARES-01 software is validated within a local ArduPilot software-in-the-loop boundary. The physical air vehicle, ground-station antenna system, and flight hardware remain conceptual or in development and are not flight validated. ARES ReFlight has not been deployed in a real disaster.\n\n## Major system areas\n\n- ARES-01 Windows-native simulation and ground-control software\n- Conceptual modular fixed-wing air vehicle\n- Conceptual portable ground station and antenna tracker\n- Engineering log, development record, safety documentation, and roadmap\n\n## Public documentation\n\n- Engineering Log: ${SITE_URL}/engineering-log\n- Development Log: ${SITE_URL}/development\n- Documentation: ${SITE_URL}/documentation\n- Roadmap: ${SITE_URL}/roadmap\n- Engineering Transparency: ${SITE_URL}/transparency\n- Open Knowledge Policy: ${SITE_URL}/open-knowledge\n- Corrections Log: ${SITE_URL}/corrections\n- Share Feedback: ${SITE_URL}/contribute\n\n## Engineering articles\n\n${articles}\n`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
