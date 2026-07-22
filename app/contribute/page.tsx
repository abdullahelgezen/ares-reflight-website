import { PageHero } from "@/components/PageHero";
import { FeedbackForm } from "@/components/FeedbackForm";
import { JsonLd } from "@/components/JsonLd";
import { createPageMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/content/site";

export const metadata = createPageMetadata({
  title: "Share Feedback",
  description: "Submit a technical correction, safety concern, research reference, design suggestion, or accessibility note to ARES ReFlight.",
  path: "/contribute",
});

export default function ContributePage() {
  return <main id="main-content"><JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Share Feedback", item: `${SITE_URL}/contribute` }] }} /><PageHero index="12" eyebrow="PUBLIC REVIEW" title="Help Us Find What We Missed" copy="ARES ReFlight is being developed in public because outside perspectives can reveal weak assumptions, overlooked risks, and better solutions." aside={<><span>FEEDBACK</span><b>CRITICISM WELCOME</b><small>EMAIL OPTIONAL · ANONYMOUS AVAILABLE</small></>} />
    <section className="section feedback-section"><div className="page-width feedback-layout"><aside><span>REVIEW AREAS</span><h2>Agreement is not required. Well-supported criticism is valuable.</h2><p>Engineers, students, emergency responders, researchers, pilots, software developers, and interested readers are invited to review the project critically.</p><ul>{["Telemetry architecture", "Ground-station design", "Fixed-wing configuration", "Communications resilience", "Disaster-response use cases", "Accessibility", "Safety assumptions", "Environmental impact", "Documentation clarity", "Unrealistic claims", "Missing limitations", "Test methodology"].map((item) => <li key={item}>{item}</li>)}</ul><blockquote>If you believe a claim is unsupported, incomplete, misleading, or technically incorrect, please identify it. Corrections will be reviewed and documented.</blockquote></aside><FeedbackForm /></div></section>
  </main>;
}
