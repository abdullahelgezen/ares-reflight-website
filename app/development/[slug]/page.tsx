import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { StatusLabel } from "@/components/StatusLabel";
import { developmentEntries } from "@/content/project";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return developmentEntries.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = developmentEntries.find((item) => item.slug === slug);
  return entry ? { title: entry.title, description: entry.summary } : {};
}

export default async function DevelopmentEntryPage({ params }: Props) {
  const { slug } = await params;
  const entry = developmentEntries.find((item) => item.slug === slug);
  if (!entry) notFound();
  return <main id="main-content"><PageHero index="06" eyebrow={`${entry.category} / ${entry.stage}`} title={entry.title} copy={entry.summary} aside={<><span>ENTRY STATUS</span><StatusLabel status={entry.status} /><small>{entry.date}</small></>} />
    <article className="section project-note"><div className="page-width"><Link href="/development"><ArrowLeft size={15} /> Back to development log</Link><div><p className="eyebrow"><span>PROJECT NOTE</span></p><h2>Documentation placeholder</h2><p>This route is ready for a full engineering note when verified source material, figures, and evidence are available. It intentionally does not invent test results, dates, or hardware performance.</p><p>The development log separates completed software, simulation evidence, work in development, and planned physical validation. Future posts can be added through the centralized project content file without restructuring the site.</p></div></div></article>
  </main>;
}
