import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { StatusLabel } from "@/components/StatusLabel";
import { documentation } from "@/content/project";

export const metadata: Metadata = { title: "Documentation", description: "ARES ReFlight system, software, safety, simulation, testing, and roadmap documentation index." };

export default function DocumentationPage() {
  return <main id="main-content"><PageHero index="07" eyebrow="TECHNICAL DOCUMENTATION" title="Architecture before assertion." copy="A structured index of the system evidence, safety decisions, simulation environment, and development path." aside={<><span>DOCUMENT SET</span><b>ARES REF / 2026</b><small>REVISION-CONTROLLED CONTENT</small></>} />
    <section className="section subpage-section"><div className="page-width"><div className="doc-version"><div><small>SOFTWARE VERSION</small><b>ARES-01 v1.3.0</b></div><div><small>SYSTEM VERSION</small><b>ARES ReFlight v0.1.0</b></div><div><small>DOCUMENTATION STATE</small><b>ACTIVE / EVOLVING</b></div></div>
      <div className="doc-list">{documentation.map(([code, title, copy, status]) => <Reveal className="doc-entry" key={code}><span><FileText size={18} />{code}</span><div><h2>{title}</h2><p>{copy}</p></div><StatusLabel status={status} /><Link href={`/documentation#${code.toLowerCase()}`} id={code.toLowerCase()} aria-label={`Reference ${title}`}><ArrowUpRight /></Link></Reveal>)}</div>
      <div className="changelog"><p className="eyebrow"><span>CHANGELOG PREVIEW</span></p><div><span>v1.3.0</span><b>Digital Twin research layer, synchronized state, bounded evidence, and read-only health analysis.</b><small>CURRENT</small></div><div><span>v1.2.0</span><b>UI refinement, layout verification, performance controls, and Windows release improvements.</b><small>RELEASED</small></div><div><span>v1.1.0</span><b>Scenario Lab, failure injection, comparison evidence, and analysis-only recovery.</b><small>RELEASED</small></div><Link href="/roadmap">View integrated system roadmap <ArrowUpRight size={14} /></Link></div>
    </div></section></main>;
}
