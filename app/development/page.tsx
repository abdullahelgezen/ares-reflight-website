import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { StatusLabel } from "@/components/StatusLabel";
import { developmentEntries } from "@/content/project";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({ title: "Development Log", description: "Follow verified ARES ReFlight software milestones, architecture decisions, and planned hardware development.", path: "/development" });

export default function DevelopmentPage() {
  return <main id="main-content"><PageHero index="06" eyebrow="DEVELOPMENT LOG" title="Engineering in the open." copy="A record of what has been built, what has only been simulated, and what still needs physical validation." aside={<><span>ACTIVE PHASE</span><b>AIR VEHICLE CONCEPT</b><small>SOFTWARE FOUNDATION COMPLETE</small></>} />
    <section className="section subpage-section"><div className="page-width"><div className="filter-row"><span>ALL ENTRIES / {String(developmentEntries.length).padStart(2, "0")}</span><div><button className="active">ALL</button><button>SOFTWARE</button><button>HARDWARE</button><button>TESTING</button></div></div>
      <div className="development-list">{developmentEntries.map((entry, i) => <Reveal className="development-entry" key={entry.slug}><span className="entry-index">{String(i + 1).padStart(2, "0")}</span><div className="entry-meta"><span>{entry.date}</span><small>{entry.category} / {entry.stage}</small></div><div className="entry-body"><StatusLabel status={entry.status} /><h2>{entry.title}</h2><p>{entry.summary}</p></div><Link href={`/development/${entry.slug}`} aria-label={`Open ${entry.title}`}><ArrowUpRight /></Link></Reveal>)}</div>
      <div className="truth-note"><b>PUBLICATION PRINCIPLE</b><p>Future dates remain placeholders until work begins. Planned entries do not imply completed tests or validated performance. Long-form technical studies are published in the <Link href="/engineering-log">Engineering Log</Link>.</p></div>
    </div></section></main>;
}
