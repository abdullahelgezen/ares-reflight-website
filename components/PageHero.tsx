import type { ReactNode } from "react";

export function PageHero({ index, eyebrow, title, copy, aside }: { index: string; eyebrow: string; title: string; copy: string; aside?: ReactNode }) {
  return <section className="page-hero"><div className="page-hero-grid" /><div className="page-width page-hero-inner"><div><p className="eyebrow eyebrow-light"><span>{index} · {eyebrow}</span></p><h1>{title}</h1><p>{copy}</p></div>{aside && <aside>{aside}</aside>}</div></section>;
}
