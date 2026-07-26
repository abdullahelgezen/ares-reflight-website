import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Download } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { StatusLabel } from "@/components/StatusLabel";
import {
  FLIGHT_COMPUTER_STAGE5C_IMAGE,
  FLIGHT_COMPUTER_STAGE6_SOCIAL_IMAGE,
  FLIGHT_COMPUTER_STAGE6_TOP_IMAGE,
} from "@/content/articles";
import { developmentEntries } from "@/content/project";
import { createPageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return developmentEntries.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = developmentEntries.find((item) => item.slug === slug);
  if (!entry) return {};
  const image = entry.slug === "ares-flight-computer-rev-a-stage-6-placement"
    ? FLIGHT_COMPUTER_STAGE6_SOCIAL_IMAGE
    : entry.slug === "ares-flight-computer-rev-a-schematic-closure"
      ? FLIGHT_COMPUTER_STAGE5C_IMAGE
      : undefined;
  return createPageMetadata({
    title: entry.title,
    description: entry.summary,
    path: `/development/${entry.slug}`,
    image: image ? {
      url: image.src,
      width: image.width,
      height: image.height,
      alt: image.alt,
    } : undefined,
  });
}

function Stage5CNote() {
  return (
    <div>
      <p className="eyebrow"><span>VERIFIED MILESTONE</span></p>
      <h2>Stage 5C schematic closure</h2>
      <figure className="project-note-visual">
        <Image src={FLIGHT_COMPUTER_STAGE5C_IMAGE.src} alt={FLIGHT_COMPUTER_STAGE5C_IMAGE.alt} width={FLIGHT_COMPUTER_STAGE5C_IMAGE.width} height={FLIGHT_COMPUTER_STAGE5C_IMAGE.height} sizes="(max-width: 900px) calc(100vw - 36px), 760px" />
        <figcaption>CONCEPT VISUAL — The rendered board is not a manufactured PCB. Stage 5C confirms schematic closure only.</figcaption>
      </figure>
      <p>ARES-FC-REV-A-SCH-5C.0 closed with 69 populated components, zero DNP items, zero ERC errors, zero ERC warnings, zero ERC exclusions, complete exact MPN and footprint coverage, and zero symbol-to-pad mismatches.</p>
      <p>This remains a bench/HIL prototype and is not flight approved. Stage 6 digital placement is now complete, while routing, manufacturing output, fabrication, and physical validation remain pending.</p>
      <div className="project-note-actions">
        <Link className="project-note-link" href="/engineering-log/ares-flight-computer-rev-a-schematic-closure">Read the Stage 5C record <ArrowUpRight size={15} /></Link>
        <Link className="project-note-link" href="/engineering-log/ares-flight-computer-rev-a-stage-6-placement">Next milestone: Stage 6 placement <ArrowUpRight size={15} /></Link>
      </div>
    </div>
  );
}

function Stage6Note() {
  return (
    <div>
      <p className="eyebrow"><span>STAGE 6 PLACEMENT COMPLETE</span></p>
      <h2>Digital placement complete. Human review is the current gate.</h2>
      <figure className="project-note-visual project-note-visual-placement">
        <Image
          src={FLIGHT_COMPUTER_STAGE6_TOP_IMAGE.src}
          alt={FLIGHT_COMPUTER_STAGE6_TOP_IMAGE.alt}
          width={FLIGHT_COMPUTER_STAGE6_TOP_IMAGE.width}
          height={FLIGHT_COMPUTER_STAGE6_TOP_IMAGE.height}
          sizes="(max-width: 900px) calc(100vw - 36px), 760px"
          unoptimized
        />
        <figcaption>DIGITAL KICAD PLACEMENT VIEW — not a manufactured board. Routing and fabrication have not started.</figcaption>
      </figure>
      <p>All 69 populated components are placed on the preliminary 60 × 85 mm four-layer board. Placement validation passed 16 of 16 recorded checks, with zero unplaced populated components and zero placement DRC violations.</p>
      <p>The ratsnest remains intentionally unrouted: 54 multi-node nets and 218 connectivity items are visible. Rev A remains a BENCH/HIL PROTOTYPE and is NOT FLIGHT APPROVED. Physical footprint, connector, enclosure, sensor, and 1:1 print review remain required before routing.</p>
      <div className="project-note-actions">
        <Link className="project-note-link" href="/engineering-log/ares-flight-computer-rev-a-stage-6-placement">Read the complete Stage 6 record <ArrowUpRight size={15} /></Link>
        <a className="project-note-link" href="/engineering/flight-computer-stage6/stage6-placement-review.pdf" target="_blank" rel="noreferrer">Open the 1:1 review PDF <Download size={15} /></a>
      </div>
    </div>
  );
}

export default async function DevelopmentEntryPage({ params }: Props) {
  const { slug } = await params;
  const entry = developmentEntries.find((item) => item.slug === slug);
  if (!entry) notFound();
  const isStage5C = entry.slug === "ares-flight-computer-rev-a-schematic-closure";
  const isStage6 = entry.slug === "ares-flight-computer-rev-a-stage-6-placement";
  return (
    <main id="main-content">
      <PageHero index="06" eyebrow={`${entry.category} / ${entry.stage}`} title={entry.title} copy={entry.summary} aside={<><span>ENTRY STATUS</span><StatusLabel status={entry.status} /><small>{entry.date}</small></>} />
      <article className="section project-note">
        <div className="page-width">
          <Link href="/development"><ArrowLeft size={15} /> Back to development log</Link>
          {isStage6 ? <Stage6Note /> : isStage5C ? <Stage5CNote /> : (
            <div>
              <p className="eyebrow"><span>PROJECT NOTE</span></p>
              <h2>Documentation placeholder</h2>
              <p>This route is ready for a full engineering note when verified source material, figures, and evidence are available. It intentionally does not invent test results, dates, or hardware performance.</p>
              <p>The development log separates completed software, simulation evidence, work in development, and planned physical validation.</p>
            </div>
          )}
        </div>
      </article>
    </main>
  );
}
