import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";
import { PROJECT_LEAD_TITLE } from "@/content/site";

export const metadata: Metadata = createPageMetadata({ title: "Project Leadership", description: `Abdullah Mert Elgezen — ${PROJECT_LEAD_TITLE} for the independent student-led engineering initiative.`, path: "/about" });

const responsibilities = ["System architecture", "Feature definition", "Software integration", "UI/UX direction", "Testing strategy", "Project documentation", "Hardware planning"];
export default function AboutPage() {
  return <main id="main-content"><PageHero index="09" eyebrow="PROJECT LEAD" title="Human-led. Tool-assisted. Evidence-driven." copy="ARES ReFlight is a student-led aerospace engineering project connecting software architecture, simulation, modular hardware design, and technical documentation." />
    <section className="section about-section"><div className="page-width about-grid"><Reveal className="about-identity"><div className="portrait-placeholder"><span>AME</span><i>{PROJECT_LEAD_TITLE.toUpperCase()}</i></div><small>ABDULLAH MERT ELGEZEN</small><h2>{PROJECT_LEAD_TITLE}</h2><p>Abdullah Mert Elgezen leads the engineering direction of ARES ReFlight, coordinating software architecture, telemetry integration, fixed-wing concept development, and system-level testing. The project remains an independent student-led aerospace engineering initiative.</p></Reveal>
      <Reveal className="responsibility-panel"><p className="eyebrow"><span>RESPONSIBILITIES</span></p>{responsibilities.map((item, i) => <div key={item}><span>{String(i + 1).padStart(2, "0")}</span><b>{item}</b></div>)}</Reveal>
      <Reveal className="ai-note"><span>AI-ASSISTED DEVELOPMENT WORKFLOW</span><p>Development is supported by AI-assisted engineering and coding tools. Architecture, requirements, integration, testing, and project direction remain human-led.</p><p>This distinction matters: project leadership includes defining the system, evaluating implementation, owning technical decisions, and verifying behavior—not claiming sole authorship of every line.</p></Reveal>
      <Reveal className="about-contact"><p>Review the engineering record or share a technical criticism.</p><div><Link href="/engineering-log">Engineering Log <ArrowUpRight /></Link><Link href="/contribute">Share Feedback <ArrowUpRight /></Link></div></Reveal>
    </div></section></main>;
}
