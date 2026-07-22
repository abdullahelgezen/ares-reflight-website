import type { ArticleStatus } from "@/content/articles";

export function ArticleStatusBadge({ status }: { status: ArticleStatus }) {
  const tone = status.toLowerCase().replaceAll(" ", "-");
  return <span className={`article-status article-status-${tone}`}>{status}</span>;
}
