import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { createPageMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/content/site";

export const metadata = createPageMetadata({
  title: "Public Corrections Log",
  description: "Public record of reported issues, review status, corrections, clarifications, and revision dates for ARES ReFlight content.",
  path: "/corrections",
});

export default function CorrectionsPage() {
  return <main id="main-content"><JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Corrections Log", item: `${SITE_URL}/corrections` }] }} /><PageHero index="13" eyebrow="PUBLIC CORRECTIONS" title="Corrections stay visible." copy="Reported issues are reviewed against evidence. Confirmed corrections and clarifications are recorded instead of silently hidden." aside={<><span>LOG STATUS</span><b>NO ENTRIES RECORDED</b><small>OPENED 22 JUL 2026</small></>} />
    <section className="section corrections-section"><div className="page-width"><div className="corrections-intro"><div><span>REVIEW STATES</span><h2>Under review · Confirmed · Corrected · Clarified · Not reproduced · Rejected with explanation</h2></div><p>Personal information and email addresses are never published without explicit permission. An acknowledgment can remain anonymous even when a correction is accepted.</p></div><div className="article-table-wrap corrections-table"><table><thead><tr><th>Date reported</th><th>Affected page</th><th>Issue</th><th>Review status</th><th>Correction made</th><th>Acknowledgment</th><th>Revision date</th></tr></thead><tbody><tr><td colSpan={7}><strong>No public corrections have been recorded.</strong><span>The absence of entries is not a claim that the project contains no errors. This log began on 22 July 2026.</span></td></tr></tbody></table></div><div className="corrections-cta"><div><small>FOUND A PROBLEM?</small><h2>Identify the exact claim and the evidence that challenges it.</h2></div><Link className="button button-dark" href="/contribute">Submit a correction <ArrowRight size={15} /></Link></div></div></section>
  </main>;
}
