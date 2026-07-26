import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { StatusLabel } from "@/components/StatusLabel";
import { FLIGHT_COMPUTER_STAGE5C_IMAGE } from "@/content/articles";
import { developmentEntries } from "@/content/project";
import { createPageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return developmentEntries.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = developmentEntries.find((item) => item.slug === slug);
  return entry ? createPageMetadata({
    title: entry.title,
    description: entry.summary,
    path: `/development/${entry.slug}`,
    image: entry.slug === "ares-flight-computer-rev-a-schematic-closure" ? {
      url: FLIGHT_COMPUTER_STAGE5C_IMAGE.src,
      width: FLIGHT_COMPUTER_STAGE5C_IMAGE.width,
      height: FLIGHT_COMPUTER_STAGE5C_IMAGE.height,
      alt: FLIGHT_COMPUTER_STAGE5C_IMAGE.alt,
    } : undefined,
  }) : {};
}

export default async function DevelopmentEntryPage({ params }: Props) {
  const { slug } = await params;
  const entry = developmentEntries.find((item) => item.slug === slug);
  if (!entry) notFound();
  const isFlightComputerMilestone = entry.slug === "ares-flight-computer-rev-a-schematic-closure";
  return <main id="main-content"><PageHero index="06" eyebrow={`${entry.category} / ${entry.stage}`} title={entry.title} copy={entry.summary} aside={<><span>ENTRY STATUS</span><StatusLabel status={entry.status} /><small>{entry.date}</small></>} />
    <article className="section project-note"><div className="page-width"><Link href="/development"><ArrowLeft size={15} /> Back to development log</Link>{isFlightComputerMilestone ? <div><p className="eyebrow"><span>VERIFIED MILESTONE</span></p><h2>Stage 5C schematic closure</h2><figure className="project-note-visual"><Image src={FLIGHT_COMPUTER_STAGE5C_IMAGE.src} alt={FLIGHT_COMPUTER_STAGE5C_IMAGE.alt} width={FLIGHT_COMPUTER_STAGE5C_IMAGE.width} height={FLIGHT_COMPUTER_STAGE5C_IMAGE.height} sizes="(max-width: 900px) calc(100vw - 36px), 760px" /><figcaption>CONCEPT VISUAL — The rendered board is not a manufactured PCB. Stage 5C confirms schematic closure only; placement, routing, fabrication, and physical power-up verification remain pending.</figcaption></figure><p>ARES-FC-REV-A-SCH-5C.0 closes with 69 populated components, zero DNP items, zero ERC errors, zero ERC warnings, zero ERC exclusions, complete exact MPN and footprint coverage, and zero symbol-to-pad mismatches.</p><p>This is a bench/HIL prototype and is not flight approved. PCB placement and routing have not started, no manufacturing files have been generated, and physical sample plus 1:1 footprint sign-off remain required.</p><Link className="project-note-link" href="/engineering-log/ares-flight-computer-rev-a-schematic-closure">Read the complete engineering record <ArrowUpRight size={15} /></Link></div> : <div><p className="eyebrow"><span>PROJECT NOTE</span></p><h2>Documentation placeholder</h2><p>This route is ready for a full engineering note when verified source material, figures, and evidence are available. It intentionally does not invent test results, dates, or hardware performance.</p><p>The development log separates completed software, simulation evidence, work in development, and planned physical validation. Future posts can be added through the centralized project content file without restructuring the site.</p></div>}</div></article>
  </main>;
}
