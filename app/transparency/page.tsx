import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { createPageMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/content/site";

export const metadata = createPageMetadata({
  title: "Engineering Transparency",
  description: "The ARES ReFlight policy for proportional claims, visible limitations, revision history, corrections, and evidence-led engineering communication.",
  path: "/transparency",
});

const principles = [
  "Simulation is labeled as simulation.",
  "Concepts are labeled as concepts.",
  "Field-tested systems are distinguished from planned systems.",
  "Failed approaches may be documented when useful.",
  "Performance figures require test conditions and evidence.",
  "Known limitations are published alongside potential benefits.",
  "Article dates and revision histories remain visible.",
  "Corrections are documented rather than silently hidden.",
  "Feedback and technical criticism are welcomed.",
  "Human safety takes priority over promotional value.",
];

export default function TransparencyPage() {
  return <main id="main-content"><JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Engineering Transparency", item: `${SITE_URL}/transparency` }] }} /><PageHero index="10" eyebrow="ENGINEERING TRANSPARENCY" title="Claims proportional to evidence." copy="Radical technical transparency means documenting what works, what fails, what remains conceptual, and what still requires validation." aside={<><span>POLICY STATUS</span><b>PUBLIC / ACTIVE</b><small>REVISION 22 JUL 2026</small></>} />
    <section className="section principles-section"><div className="page-width principles-layout"><div className="principles-lead"><span>RADICAL TECHNICAL TRANSPARENCY</span><h2>Transparency is not presented as perfection.</h2><p>ARES ReFlight aims to document what works, what fails, what remains conceptual, and what still requires validation. Transparency is a commitment to keeping claims proportional to evidence.</p><blockquote>We do not ask readers to trust the project because of confident language. We invite them to examine the evidence, assumptions, limitations, and development record.</blockquote></div><ol className="principles-list">{principles.map((principle, index) => <li key={principle}><span>{String(index + 1).padStart(2, "0")}</span><p>{principle}</p></li>)}</ol></div></section>
    <section className="transparency-links"><div className="page-width"><div><small>ACCOUNTABILITY PATHS</small><h2>Review the record, then challenge it.</h2></div><div><Link href="/engineering-log">Engineering Log <ArrowUpRight /></Link><Link href="/corrections">Corrections Log <ArrowUpRight /></Link><Link href="/contribute">Share Feedback <ArrowRight /></Link><Link href="/roadmap">Engineering Roadmap <ArrowUpRight /></Link></div></div></section>
  </main>;
}
