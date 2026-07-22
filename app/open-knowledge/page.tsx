import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { createPageMetadata } from "@/lib/metadata";
import { PUBLIC_REPOSITORY, SITE_URL } from "@/content/site";

export const metadata = createPageMetadata({
  title: "Open Knowledge for Humanitarian Engineering",
  description: "ARES ReFlight project principles for accessible knowledge, scientific criticism, reproducibility, privacy, civilian use, and responsible public release.",
  path: "/open-knowledge",
});

const availability = [
  ["Website", "Source available", "License under review", "Public repository available"],
  ["Public documentation", "Documentation public", "License under review", "Published on this website"],
  ["Telemetry dashboard source", "Internal development", "License under review", "Not yet available"],
  ["UI components", "Internal development", "License under review", "Not yet available"],
  ["Simulation tools", "Internal development", "License under review", "Not yet available"],
  ["Hardware drawings", "Planned for release", "License under review", "Not yet available"],
  ["Airframe CAD", "Internal development", "License under review", "Not yet available"],
  ["Flight-control configuration", "Restricted for safety or privacy", "License under review", "Not publicly released"],
  ["Datasets", "Planned for release", "License under review", "No validated public dataset yet"],
  ["Test logs", "Restricted for safety or privacy", "License under review", "Curated evidence planned"],
];

export default function OpenKnowledgePage() {
  return <main id="main-content"><JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Open Knowledge", item: `${SITE_URL}/open-knowledge` }] }} /><PageHero index="11" eyebrow="PROJECT PRINCIPLES" title="Open Knowledge for Humanitarian Engineering" copy="Useful engineering knowledge should travel farther than borders, institutions, and individual projects—without turning unfinished or unsafe material into a careless release." aside={<><span>POSITION</span><b>PEACEFUL CIVILIAN USE</b><small>ACCESS · CRITICISM · RESPONSIBILITY</small></>} />
    <section className="section manifesto-section"><div className="page-width manifesto-layout"><div className="manifesto-opening"><p>We believe useful engineering knowledge should travel farther than borders, institutions, and individual projects. Disaster response improves when researchers, students, responders, public institutions, and local communities can examine ideas, question assumptions, and build upon shared work.</p><p>The policy supports humanitarian benefit, equal dignity, international cooperation, peaceful civilian use, scientific criticism, reproducibility, environmental responsibility, respect for local communities, and privacy-conscious data handling. It rejects discrimination by nationality, language, ethnicity, or economic status.</p></div><div className="manifesto-values">{["Students can learn from public engineering records.", "Researchers can challenge and improve published concepts.", "Disaster-response organizations can access practical findings.", "Communities are not treated only as data sources.", "Technical knowledge is not obscured for prestige.", "Humanitarian technology is designed with local users, not only for them."].map((value, index) => <div key={value}><span>{String(index + 1).padStart(2, "0")}</span><p>{value}</p></div>)}</div></div></section>
    <section className="section availability-section"><div className="page-width"><div className="availability-heading"><div><span>PUBLIC AVAILABILITY</span><h2>Open-source claims must be precise.</h2></div><p>No software license is inferred from public visibility. Until a license is explicitly selected and attached to a component, its status remains “License under review.”</p></div><div className="article-table-wrap"><table><thead><tr><th>Component</th><th>Public status</th><th>License</th><th>Current availability</th></tr></thead><tbody>{availability.map((row) => <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <th key={cell} scope="row">{cell}</th> : <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div><div className="release-limits"><h3>Why some material may remain unpublished</h3><p>Publication may be delayed or restricted when material would expose personal data, unsafe operating procedures, third-party copyrighted content, credentials or secrets, security-sensitive configurations, or unverified instructions that could create physical risk.</p><a href={PUBLIC_REPOSITORY} target="_blank" rel="noreferrer">View the public website repository <ArrowUpRight size={14} /></a></div></div></section>
    <section className="knowledge-cta"><div className="page-width"><h2>Knowledge becomes stronger when it can be examined.</h2><div><Link className="button button-light" href="/engineering-log">Read the Engineering Log <ArrowRight size={15} /></Link><Link className="button button-dark-outline" href="/contribute">Challenge the project <ArrowUpRight size={15} /></Link></div></div></section>
  </main>;
}
