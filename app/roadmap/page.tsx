import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { StatusLabel } from "@/components/StatusLabel";
import { roadmap } from "@/content/project";

export const metadata: Metadata = { title: "Roadmap", description: "The evidence-led ARES ReFlight path from completed simulation software to planned hardware and flight validation." };

const versions = [["ARES-01 Software", "v1.3.0", "INITIAL STABLE RELEASE"], ["ARES Air Vehicle", "v0.1.0", "CONCEPT DEVELOPMENT"], ["ARES Ground Station", "v0.1.0", "HARDWARE PLANNING"], ["ARES Antenna Tracker", "v0.1.0", "ARCHITECTURE PLANNING"], ["ARES ReFlight Integrated System", "v0.1.0", "IN DEVELOPMENT"]];

export default function RoadmapPage() {
  return <main id="main-content"><PageHero index="08" eyebrow="SYSTEM ROADMAP" title="Build. Verify. Then claim." copy="Each phase closes with evidence before the system advances. Future milestones describe intent, not achieved capability." aside={<><span>VERSION MODEL</span><b>MAJOR.MINOR.PATCH</b><small>SEMANTIC VERSIONING</small></>} />
    <section className="section subpage-section"><div className="page-width roadmap-layout"><div className="roadmap-rail">{roadmap.map((item, i) => <Reveal className="roadmap-step" key={item.title}><div><span>{item.era}</span><i>{String(i + 1).padStart(2, "0")}</i></div><b /><article><StatusLabel status={item.status} /><h2>{item.title}</h2><p>{item.status === "COMPLETED" ? "Implemented in the current software foundation." : item.status === "SIMULATED" ? "Validated within the local software-in-the-loop boundary." : "Planned work; no completed physical validation is implied."}</p></article></Reveal>)}</div>
      <aside className="version-ledger"><p className="eyebrow"><span>SYSTEM VERSION LEDGER</span></p>{versions.map(([name, version, state]) => <div key={name}><span>{name}</span><b>{version}</b><small>{state}</small></div>)}<p><b>MAJOR</b> breaking system change · <b>MINOR</b> new compatible capability · <b>PATCH</b> compatible correction</p></aside>
    </div></section></main>;
}
