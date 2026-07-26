import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ShieldCheck } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { StatusLabel } from "@/components/StatusLabel";
import { SystemExplorer } from "@/components/SystemExplorer";
import { TelemetryPanel } from "@/components/TelemetryPanel";
import { TrackerDiagram } from "@/components/TrackerDiagram";
import { Reveal } from "@/components/Reveal";
import { developmentEntries, roadmap, softwareFeatures } from "@/content/project";
import { engineeringArticles } from "@/content/articles";
import { PUBLIC_REPOSITORY } from "@/content/site";
import { createPageMetadata } from "@/lib/metadata";
import { ArticleStatusBadge } from "@/components/ArticleStatusBadge";

export const metadata = createPageMetadata({
  title: "ARES ReFlight — Modular Fixed-Wing UAS Research",
  description: "ARES ReFlight combines ARES-01 simulation software with conceptual fixed-wing, ground-station, antenna-tracking, and humanitarian engineering research.",
  path: "/",
});

export default function Home() {
  return (
    <main id="main-content">
      <section className="hero" id="overview">
        <Image className="hero-aircraft" src="/images/ares-uav-hero.png" alt="Conceptual white twin-engine ARES fixed-wing research UAV shown in a blueprint studio" fill priority sizes="100vw" />
        <div className="hero-vignette" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy page-width">
          <p className="hero-kicker"><span>STUDENT-LED AEROSPACE ENGINEERING PROJECT</span><i /></p>
          <h1><span>ARES</span> ReFlight</h1>
          <p className="hero-subhead">A modular fixed-wing UAV ecosystem for post-disaster reconnaissance, mapping, and engineering research.</p>
          <p className="hero-support">Custom ground-control software. Modular air vehicle. Telemetry architecture. A planned automated antenna-tracking ground station.</p>
          <div className="hero-actions"><a className="button button-light" href="#system">Explore the System <ArrowDown size={16} /></a><Link className="button button-ghost" href="/engineering-log">Engineering Log <ArrowRight size={16} /></Link><a className="text-link" href={PUBLIC_REPOSITORY} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} /></a></div>
        </div>
        <div className="hero-meta page-width">
          <div><span>01 / SOFTWARE</span><p><i className="dot-complete" />ARES-01 v1.3.0</p><b>INITIAL STABLE RELEASE</b></div>
          <div><span>02 / INTEGRATED SYSTEM</span><p><i className="dot-progress" />ARES ReFlight v0.1.0</p><b>IN DEVELOPMENT</b></div>
          <div className="hero-coordinate"><span>CONCEPTUAL AIR VEHICLE</span><p>NOT YET FLIGHT VALIDATED</p></div>
        </div>
      </section>

      <section className="mission-section" id="mission">
        <div className="mission-lines" aria-hidden="true" />
        <div className="page-width mission-grid">
          <Reveal className="mission-label"><p className="eyebrow"><span>01 · THE MISSION</span></p><span className="vertical-rule" /></Reveal>
          <Reveal className="mission-copy">
            <h2>Timely aerial information should not depend on expensive, inaccessible systems.</h2>
            <p>During disasters, access to current aerial information can be limited by cost, damaged infrastructure, and deployment complexity.</p>
            <p>ARES explores how a low-cost, repairable, modular fixed-wing system <em>could</em> support rapid mapping and situational awareness—while remaining accessible for engineering research and education.</p>
            <div className="mission-principles"><span><b>01</b>Affordable by design</span><span><b>02</b>Repairable by principle</span><span><b>03</b>Evidence before claims</span></div>
          </Reveal>
        </div>
      </section>

      <section className="section system-section" id="system">
        <div className="page-width">
          <Reveal><SectionHeader eyebrow="02 · SYSTEM ARCHITECTURE" title="One ecosystem. Four engineered layers." copy="ARES ReFlight is being developed as a connected stack. Select a module to inspect its purpose, function, and verified development state." /></Reveal>
          <Reveal delay={0.1}><SystemExplorer /></Reveal>
        </div>
      </section>

      <section className="software-section" id="software">
        <div className="page-width">
          <Reveal><div className="software-title"><p className="eyebrow eyebrow-light"><span>03 · SOFTWARE FOUNDATION</span></p><div><h2>ARES-01</h2><p>A Windows-native research environment for designing, monitoring, controlling, replaying, analyzing, and documenting fixed-wing UAV simulation.</p></div><div className="version-block"><span>SOFTWARE VERSION</span><strong>v1.3.0</strong><b>INITIAL STABLE RELEASE</b></div></div></Reveal>
          <Reveal className="software-frame">
            <div className="frame-bar"><span><i /><i /><i /></span><b>ARES-01 / OPERATIONS</b><small>WINDOWS NATIVE</small></div>
            <div className="software-screen"><Image src="/images/ares-01-operations.png" alt="ARES-01 operations dashboard running with simulated telemetry" width={1920} height={1080} sizes="(max-width: 900px) 100vw, 1200px" /></div>
            <TelemetryPanel />
          </Reveal>
          <div className="software-bottom">
            <Reveal className="feature-index"><p>CAPABILITIES / VERIFIED SOFTWARE</p><div>{softwareFeatures.map((feature, i) => <span key={feature}><b>{String(i + 1).padStart(2, "0")}</b>{feature}<Check size={14} /></span>)}</div></Reveal>
            <Reveal className="software-note" delay={0.1}><ShieldCheck size={30} /><div><b>SIMULATION SAFETY BOUNDARY</b><p>Commands are restricted to verified local ArduPlane SITL and require explicit operator enablement.</p><strong>Hardware flight integration has not yet been validated.</strong></div></Reveal>
          </div>
        </div>
      </section>

      <section className="section aircraft-section" id="air-vehicle">
        <div className="page-width">
          <Reveal><div className="split-heading"><div><p className="eyebrow"><span>04 · AIR VEHICLE</span></p><h2>ARES Air Vehicle</h2></div><StatusLabel status="IN DEVELOPMENT" /></div></Reveal>
          <div className="aircraft-concept">
            <Reveal className="aircraft-visual"><Image src="/images/ares-uav-hero.png" alt="Conceptual ARES fixed-wing air vehicle configuration, not flight validated" width={1672} height={941} sizes="(max-width: 900px) 100vw, 65vw" /><span>CONCEPTUAL CONFIGURATION</span><b>NOT YET FLIGHT VALIDATED</b></Reveal>
            <Reveal className="aircraft-copy" delay={0.1}><h3>Modularity is the performance target.</h3><p>The aircraft concept prioritizes repairability, replaceable sections, cost-conscious manufacturing, and clear separation between reclaimed non-critical structure and new safety-critical systems.</p><dl><div><dt>DESIGN TARGET / 01</dt><dd>Modular fuselage</dd></div><div><dt>DESIGN TARGET / 02</dt><dd>Swappable payload bay</dd></div><div><dt>DESIGN TARGET / 03</dt><dd>Low-cost repair model</dd></div><div><dt>DESIGN TARGET / 04</dt><dd>Mapping-oriented mission profile</dd></div></dl></Reveal>
          </div>
          <Reveal className="exploded-stack"><div className="stack-axis"><i /><span>CONCEPTUAL SYSTEM LAYERS</span></div>{["Airframe", "Structural Reinforcement", "Propulsion", "Avionics", "Communications", "Payload Bay"].map((item, i) => <div key={item} className="stack-row"><span>0{i + 1}</span><b>{item}</b><i /><small>{i === 0 ? "REPAIRABLE STRUCTURE" : i === 1 ? "CARBON-REINFORCED LOAD PATHS" : i === 2 ? "TWIN-ELECTRIC CONCEPT" : i === 3 ? "NEW SAFETY-CRITICAL SYSTEMS" : i === 4 ? "TELEMETRY + RC INDEPENDENCE" : "MAPPING-ORIENTED / SWAPPABLE"}</small></div>)}</Reveal>
        </div>
      </section>

      <section className="ground-section">
        <div className="page-width ground-grid">
          <Reveal><SectionHeader inverted eyebrow="05 · GROUND SYSTEMS" title="Field-ready in principle. Hardware validation ahead." copy="The ground system is being developed around independent control safety, portable telemetry, and a future directional tracking link." /></Reveal>
          <Reveal className="ground-scene">
            <div className="ground-laptop"><span>ARES-01</span><div><i /><i /><i /></div><b>GROUND CONTROL</b></div>
            <div className="ground-link"><i /><i /><i /></div>
            <div className="ground-antenna"><span /><i /><b /></div>
            <div className="ground-labels"><span>01 / LAPTOP + ARES-01</span><span>02 / TELEMETRY MODEM</span><span>03 / DIRECTIONAL ANTENNA</span><span>04 / PORTABLE POWER</span></div>
          </Reveal>
          <div className="ground-facts"><Reveal><p className="eyebrow eyebrow-light"><span>GROUND STATION</span></p><StatusLabel status="IN DEVELOPMENT" /><p>Laptop, telemetry modem, omni-directional backup antenna, directional antenna, portable power, and optional controller input.</p></Reveal><Reveal delay={0.1}><p className="eyebrow eyebrow-light"><span>SAFETY SEPARATION</span></p><ShieldCheck /><p>Flight-critical RC control remains independent from the laptop-based ground station.</p></Reveal></div>
        </div>
      </section>

      <section className="section tracker-section">
        <div className="page-width">
          <Reveal><div className="split-heading"><div><p className="eyebrow"><span>06 · ANTENNA TRACKER</span></p><h2>Telemetry into line of sight.</h2></div><div><StatusLabel status="PLANNED" /><p>PLANNED HARDWARE<br />SOFTWARE ARCHITECTURE IN DEVELOPMENT</p></div></div></Reveal>
          <Reveal><TrackerDiagram /></Reveal>
        </div>
      </section>

      <section className="section sustainability-section">
        <div className="page-width"><Reveal><SectionHeader eyebrow="07 · MATERIAL PRINCIPLE" title="Reclaimed structure. New critical systems." copy="Sustainability here is a classification problem—not a marketing claim. Reuse is governed by consequence and validation." /></Reveal>
          <div className="class-grid">
            <Reveal className="material-class class-a"><span>A</span><div><small>FLIGHT CRITICAL</small><h3>New or validated components only.</h3><p>Flight controller · Power module · GPS · Receiver · Battery · ESC · Primary servos · Critical structural members</p></div></Reveal>
            <Reveal className="material-class class-b" delay={0.08}><span>B</span><div><small>MISSION CRITICAL</small><h3>Reused only after testing.</h3><p>Camera · Tracker motors · Display hardware · Non-flight computing</p></div></Reveal>
            <Reveal className="material-class class-c" delay={0.16}><span>C</span><div><small>NON-CRITICAL</small><h3>Suitable for reclaimed materials.</h3><p>Enclosures · Tripod · Covers · Brackets · Ground-station panels · Cable routing</p></div></Reveal>
          </div>
        </div>
      </section>

      <section className="timeline-section">
        <div className="page-width"><Reveal><div className="timeline-heading"><SectionHeader inverted eyebrow="08 · DEVELOPMENT PATH" title="Progress, without invented milestones." /><Link href="/roadmap">Full roadmap <ArrowRight size={15} /></Link></div></Reveal>
          <div className="timeline-list">{roadmap.slice(0, 9).map((item, i) => <Reveal key={item.title} className="timeline-item" delay={Math.min(i * .025, .15)}><span>{item.era}</span><i>{String(i + 1).padStart(2, "0")}</i><h3>{item.title}</h3><StatusLabel status={item.status} /></Reveal>)}</div>
        </div>
      </section>

      <section className="section log-section">
        <div className="page-width"><Reveal><div className="timeline-heading light"><SectionHeader eyebrow="09 · FIELD NOTES" title="Development log" copy="Architecture decisions, safety boundaries, experiments, and the path from simulation to hardware." /><Link href="/development">View all entries <ArrowRight size={15} /></Link></div></Reveal>
          <div className="log-grid">{developmentEntries.slice(0, 3).map((entry, i) => <Reveal key={entry.slug} className="log-card" delay={i * .07}><div><span>{entry.date}</span><StatusLabel status={entry.status} /></div><small>{entry.category} / {entry.stage}</small><h3>{entry.title}</h3><p>{entry.summary}</p><Link href={`/development/${entry.slug}`}>Read project note <ArrowUpRight size={14} /></Link></Reveal>)}</div>
          <Reveal className="home-journal-rail"><div><span>NEW / ENGINEERING JOURNAL</span><h3>Technical studies with visible evidence boundaries.</h3><p>Read the Rev A flight-computer schematic record, SITL telemetry retrospective, airframe trade studies, and sourced disaster-response assessment.</p></div><div>{engineeringArticles.slice(0, 3).map((article) => <Link key={article.slug} href={`/engineering-log/${article.slug}`}><ArticleStatusBadge status={article.status} /><b>{article.title}</b><ArrowUpRight size={15} /></Link>)}</div><Link className="button button-dark" href="/engineering-log">Open Engineering Log <ArrowRight size={15} /></Link></Reveal>
        </div>
      </section>

      <section className="contact-section">
        <div className="contact-orbit" aria-hidden="true"><i /><i /><span /></div>
        <div className="page-width contact-grid"><Reveal><p className="eyebrow eyebrow-light"><span>10 · CONTINUE THE MISSION</span></p><h2>Follow the development of ARES ReFlight.</h2></Reveal><Reveal className="contact-links"><a href={PUBLIC_REPOSITORY} target="_blank" rel="noreferrer">GitHub <ArrowUpRight /></a><a href="https://instagram.com/ares.reflight" target="_blank" rel="noreferrer">Instagram <span>@ares.reflight</span><ArrowUpRight /></a><Link href="/engineering-log">Engineering Log <ArrowUpRight /></Link><Link href="/contribute">Technical Feedback <ArrowUpRight /></Link></Reveal></div>
      </section>
    </main>
  );
}
