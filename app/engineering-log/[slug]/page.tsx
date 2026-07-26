import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/ArticlePage";
import { engineeringArticles, getEngineeringArticle } from "@/content/articles";
import { createPageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return engineeringArticles.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = getEngineeringArticle(slug);
  if (!article) return {};
  return createPageMetadata({
    title: article.title,
    description: article.summary,
    path: `/engineering-log/${article.slug}`,
    type: "article",
    publishedTime: article.published,
    modifiedTime: article.updated,
    image: article.heroImage ? {
      url: article.heroImage.src,
      width: article.heroImage.width,
      height: article.heroImage.height,
      alt: article.heroImage.alt,
    } : undefined,
  });
}

export default async function EngineeringArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getEngineeringArticle(slug);
  if (!article) notFound();
  return <ArticlePage article={article} />;
}
