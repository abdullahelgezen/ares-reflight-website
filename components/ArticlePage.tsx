import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock3 } from "lucide-react";
import type { EngineeringArticle } from "@/content/articles";
import { engineeringArticles } from "@/content/articles";
import { PROJECT_LEAD, PROJECT_LEAD_TITLE, SITE_URL } from "@/content/site";
import { ArticleStatusBadge } from "@/components/ArticleStatusBadge";
import { JsonLd } from "@/components/JsonLd";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${value}T00:00:00Z`),
  );
}

export function ArticlePage({ article }: { article: EngineeringArticle }) {
  const related = article.related
    .map((slug) => engineeringArticles.find((candidate) => candidate.slug === slug))
    .filter((candidate): candidate is EngineeringArticle => Boolean(candidate));
  const canonical = `${SITE_URL}/engineering-log/${article.slug}`;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: article.title,
      alternativeHeadline: article.subtitle,
      description: article.summary,
      datePublished: article.published,
      dateModified: article.updated,
      mainEntityOfPage: canonical,
      url: canonical,
      author: { "@type": "Person", name: PROJECT_LEAD, url: `${SITE_URL}/about` },
      publisher: { "@type": "Organization", name: "ARES ReFlight", url: SITE_URL },
      about: article.topics,
      articleSection: article.status,
      isAccessibleForFree: true,
      image: article.socialImage
        ? `${SITE_URL}${article.socialImage.src}`
        : article.heroImage
          ? `${SITE_URL}${article.heroImage.src}`
          : `${SITE_URL}/og.png`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Engineering Log", item: `${SITE_URL}/engineering-log` },
        { "@type": "ListItem", position: 3, name: article.title, item: canonical },
      ],
    },
  ];

  return (
    <main id="main-content">
      <JsonLd data={structuredData} />
      <header className="article-hero">
        <div className="article-hero-grid" aria-hidden="true" />
        <div className="page-width article-hero-inner">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/engineering-log">Engineering Log</Link><span aria-hidden="true">/</span><span>Article</span>
          </nav>
          <ArticleStatusBadge status={article.status} />
          <h1>{article.title}</h1>
          <p className="article-subtitle">{article.subtitle}</p>
          <div className="article-meta">
            <span>By <Link href="/about">{PROJECT_LEAD}</Link></span>
            <time dateTime={article.published}>Published {formatDate(article.published)}</time>
            <time dateTime={article.updated}>Updated {formatDate(article.updated)}</time>
            <span><Clock3 size={14} aria-hidden="true" /> {article.readingMinutes} min read</span>
          </div>
        </div>
        {article.heroImage && (
          <figure className="article-hero-media">
            <Image
              src={article.heroImage.src}
              alt={article.heroImage.alt}
              width={article.heroImage.width}
              height={article.heroImage.height}
              sizes="(max-width: 768px) calc(100vw - 32px), 1050px"
              unoptimized={article.heroImage.src.endsWith(".svg")}
              priority
            />
            <figcaption>
              {article.slug === "ares-flight-computer-rev-a-stage-6-placement"
                ? "DIGITAL PLACEMENT VIEW — Generated from the KiCad board database. This is not a photograph of manufactured hardware; routing and fabrication have not started."
                : "CONCEPT VISUAL — The rendered board is not a manufactured PCB. At Stage 5C, placement and routing were pending; Stage 6 placement is now complete while routing, fabrication, and physical power-up verification remain pending."}
            </figcaption>
          </figure>
        )}
      </header>

      <article className="article-shell page-width">
        <aside className="article-toc" aria-label="Table of contents">
          <span>IN THIS ARTICLE</span>
          <ol>{article.sections.map((section, index) => <li key={section.id}><a href={`#${section.id}`}><b>{String(index + 1).padStart(2, "0")}</b>{section.title}</a></li>)}</ol>
          <Link href="/corrections">Corrections log <ArrowUpRight size={13} /></Link>
        </aside>

        <div className="article-content">
          <div className="article-disclaimer" role="note"><b>EVIDENCE NOTE</b><p>{article.disclaimer}</p></div>
          {article.sections.map((section) => (
            <section id={section.id} key={section.id} className="article-section">
              <h2>{section.title}</h2>
              {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets && <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}
              {section.table && <div className="article-table-wrap"><table><thead><tr>{section.table.headers.map((header) => <th key={header} scope="col">{header}</th>)}</tr></thead><tbody>{section.table.rows.map((row) => <tr key={row.join("|")}>{row.map((cell, index) => index === 0 ? <th key={cell} scope="row">{cell}</th> : <td key={`${cell}-${index}`}>{cell}</td>)}</tr>)}</tbody></table></div>}
              {section.callout && <blockquote>{section.callout}</blockquote>}
            </section>
          ))}

          {article.sources && article.sources.length > 0 && (
            <section id="sources" className="article-section article-sources">
              <h2>Sources and claim support</h2>
              <p>Documented facts are separated from proposed ARES applications and engineering inference. Access dates reflect the research review for this article.</p>
              <ol>{article.sources.map((source) => <li key={source.url}><a href={source.url} target={source.url.startsWith("http") ? "_blank" : undefined} rel={source.url.startsWith("http") ? "noreferrer" : undefined}>{source.organization} · {source.title} <ArrowUpRight size={13} /></a><span>Published {source.publicationDate} · Accessed {source.accessedDate}</span><p>{source.supports}</p></li>)}</ol>
            </section>
          )}

          {article.gallery && article.gallery.length > 0 && (
            <section className="article-evidence" aria-labelledby="placement-evidence-gallery">
              <div className="article-evidence-heading">
                <small>GENERATED REVIEW ARTIFACTS</small>
                <h2 id="placement-evidence-gallery">Placement evidence gallery</h2>
                <p>These are direct KiCad outputs. They document the digital placement state and do not represent manufactured or physically validated hardware.</p>
              </div>
              <div className="article-evidence-grid">
                {article.gallery.map((visual) => (
                  <figure key={visual.src}>
                    <a href={visual.src} target="_blank" rel="noreferrer" aria-label={`Open full-size evidence image: ${visual.caption}`}>
                      <Image
                        src={visual.src}
                        alt={visual.alt}
                        width={visual.width}
                        height={visual.height}
                        sizes="(max-width: 768px) calc(100vw - 32px), 410px"
                        unoptimized={visual.src.endsWith(".svg")}
                      />
                    </a>
                    <figcaption>{visual.caption}</figcaption>
                  </figure>
                ))}
              </div>
              {article.evidenceLinks && article.evidenceLinks.length > 0 && (
                <div className="article-evidence-downloads">
                  {article.evidenceLinks.map((item) => (
                    <a key={item.href} href={item.href} target="_blank" rel="noreferrer">
                      <span><b>{item.label}</b><small>{item.detail}</small></span>
                      <ArrowUpRight size={18} aria-hidden="true" />
                    </a>
                  ))}
                </div>
              )}
            </section>
          )}

          {article.internalLinks && article.internalLinks.length > 0 && (
            <nav className="article-internal-links" aria-label="Related ARES ReFlight pages">
              <span>PROJECT CONNECTIONS</span>
              <div>{article.internalLinks.map((item) => <Link key={item.href} href={item.href}>{item.label}<ArrowUpRight size={14} /></Link>)}</div>
            </nav>
          )}

          {article.nextMilestone && (
            <Link className="article-next-milestone" href={article.nextMilestone.href}>
              <span>NEXT MILESTONE</span>
              <b>{article.nextMilestone.label}</b>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          )}

          <section className="article-author" aria-label="About the author">
            <span className="author-monogram" aria-hidden="true">AME</span>
            <div><small>AUTHOR</small><h2>{PROJECT_LEAD}</h2><b>{PROJECT_LEAD_TITLE}</b><p>Abdullah Mert Elgezen leads the engineering direction of ARES ReFlight, coordinating software architecture, telemetry integration, fixed-wing concept development, and system-level testing. The project remains an independent student-led aerospace engineering initiative.</p><Link href="/about">Project leadership <ArrowRight size={14} /></Link></div>
          </section>

          <section className="article-review-cta">
            <div><small>RADICAL TECHNICAL TRANSPARENCY</small><h2>Challenge the assumptions.</h2><p>{article.reviewCallToAction ?? "If a claim is unsupported, incomplete, misleading, or technically incorrect, identify it. Agreement is not required. Well-supported criticism is valuable."}</p></div>
            <div><Link className="button button-light" href="/contribute">Share feedback <ArrowRight size={15} /></Link><Link className="button button-dark-outline" href="/corrections">View corrections <ArrowUpRight size={15} /></Link></div>
          </section>
        </div>
      </article>

      {related.length > 0 && <section className="related-section"><div className="page-width"><div className="related-heading"><span>CONTINUE READING</span><h2>Related engineering notes</h2></div><div className="related-grid">{related.map((item) => <Link key={item.slug} href={`/engineering-log/${item.slug}`}><ArticleStatusBadge status={item.status} /><h3>{item.title}</h3><p>{item.summary}</p><span>Read article <ArrowUpRight size={14} /></span></Link>)}</div><Link className="back-to-journal" href="/engineering-log"><ArrowLeft size={14} /> Back to Engineering Log</Link></div></section>}
    </main>
  );
}
