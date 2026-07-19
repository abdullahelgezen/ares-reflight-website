import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = { title: "About", description: "About Abdullah Mert Elgezen, project lead and system architect for ARES ReFlight." };

const responsibilities = ["System architecture", "Feature definition", "Software integration", "UI/UX direction", "Testing strategy", "Project documentation", "Hardware planning"];
export default function AboutPage() {
  return <main id="main-content"><PageHero index="09" eyebrow="PROJECT LEAD" title="Human-led. Tool-assisted. Evidence-driven." copy="ARES ReFlight is a student-led aerospace engineering project connecting software architecture, simulation, modular hardware design, and technical documentation." />
    <section className="section about-section"><div className="page-width about-grid"><Reveal className="about-identity"><div className="portrait-placeholder"><span>AME</span><i>PROJECT LEAD / SYSTEM ARCHITECT</i></div><small>ABDULLAH MERT ELGEZEN</small><h2>Project Lead and<br />System Architect</h2><p>Abdullah is developing ARES ReFlight as a disciplined engineering platform spanning flight software, telemetry, modular air vehicle design, ground systems, and the transition from simulation to physical validation.</p></Reveal>
      <Reveal className="responsibility-panel"><p className="eyebrow"><span>RESPONSIBILITIES</span></p>{responsibilities.map((item, i) => <div key={item}><span>{String(i + 1).padStart(2, "0")}</span><b>{item}</b></div>)}</Reveal>
      <Reveal className="ai-note"><span>AI-ASSISTED DEVELOPMENT WORKFLOW</span><p>Development is supported by AI-assisted engineering and coding tools. Architecture, requirements, integration, testing, and project direction remain human-led.</p><p>This distinction matters: project leadership includes defining the system, evaluating implementation, owning technical decisions, and verifying behavior—not claiming sole authorship of every line.</p></Reveal>
      <Reveal className="about-contact"><p>Interested in aerospace systems, simulation, or research collaboration?</p><a href="mailto:hello@ares-reflight.dev">Start a conversation <ArrowUpRight /></a></Reveal>
    </div></section></main>;
}
