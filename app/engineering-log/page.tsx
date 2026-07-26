import Link from "next/link";
import { ArrowUpRight, BookOpen, Clock3 } from "lucide-react";
import { engineeringArticles } from "@/content/articles";
import { createPageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/PageHero";
import { ArticleStatusBadge } from "@/components/ArticleStatusBadge";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/content/site";

export const metadata = createPageMetadata({
  title: "Engineering Log",
  description: "Technical articles, concept studies, SITL evidence, design trade-offs, and transparent development records for ARES ReFlight.",
  path: "/engineering-log",
});

function formatArticleDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" })
    .format(new Date(`${value}T12:00:00Z`))
    .toUpperCase();
}

export default function EngineeringLogPage() {
  const featured = engineeringArticles.find((article) => article.slug === "where-uas-could-help-after-earthquakes-and-extreme-rainfall")!;
  const remaining = engineeringArticles.filter((article) => article.slug !== featured.slug);
  return (
    <main id="main-content">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Engineering Log", item: `${SITE_URL}/engineering-log` }] }} />
      <PageHero index="06" eyebrow="ENGINEERING LOG" title="Evidence before confidence." copy="Technical notes, architecture studies, development history, and explicit validation limits. Every article is dated when published—not backdated to make the project appear older." aside={<><span>PUBLIC ARTICLES</span><b>{String(engineeringArticles.length).padStart(2, "0")} ENTRIES</b><small>UPDATED 26 JULY 2026</small></>} />
      <section className="section journal-section"><div className="page-width">
        <Link className="journal-featured" href={`/engineering-log/${featured.slug}`}>
          <div><span>FEATURED SCENARIO STUDY</span><h2>{featured.title}</h2><p>{featured.summary}</p><div><ArticleStatusBadge status={featured.status} /><span><Clock3 size={13} /> {featured.readingMinutes} min</span></div></div>
          <div className="journal-feature-index"><BookOpen aria-hidden="true" /><b>ARES / HUMANITARIAN ENGINEERING</b><span>CASE STUDY · LIMITATIONS · SOURCES</span><i>READ THE ASSESSMENT <ArrowUpRight size={15} /></i></div>
        </Link>
        <div className="journal-intro"><div><span>PUBLICATION PRINCIPLE</span><h2>Simulation is labeled. Concepts are labeled. Revisions remain visible.</h2></div><p>The journal distinguishes project evidence from engineering inference. Hardware that has not flown is never presented as flight validated, and reconstructed history is identified as retrospective documentation.</p></div>
        <div className="journal-grid">{remaining.map((article, index) => <article className="journal-card" key={article.slug}><div className="journal-card-top"><span>{String(index + 1).padStart(2, "0")}</span><ArticleStatusBadge status={article.status} /></div><small>{article.topics.join(" · ")}</small><h2><Link href={`/engineering-log/${article.slug}`}>{article.title}</Link></h2><p>{article.summary}</p><div className="journal-card-meta"><time dateTime={article.published}>{formatArticleDate(article.published)}</time><span>{article.readingMinutes} MIN READ</span></div><Link className="journal-card-link" href={`/engineering-log/${article.slug}`}>Read article <ArrowUpRight size={15} /></Link></article>)}</div>
        <div className="journal-links"><Link href="/transparency">Engineering transparency <ArrowUpRight size={14} /></Link><Link href="/open-knowledge">Open-knowledge policy <ArrowUpRight size={14} /></Link><Link href="/contribute">Share technical feedback <ArrowUpRight size={14} /></Link><Link href="/corrections">Corrections log <ArrowUpRight size={14} /></Link></div>
      </div></section>
    </main>
  );
}
