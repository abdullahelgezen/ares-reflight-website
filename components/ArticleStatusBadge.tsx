import type { ArticleStatus } from "@/content/articles";

export function ArticleStatusBadge({ status }: { status: ArticleStatus }) {
  const tone = status.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return <span className={`article-status article-status-${tone}`}>{status}</span>;
}
