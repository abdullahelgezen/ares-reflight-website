export function SectionHeader({ eyebrow, title, copy, inverted = false }: { eyebrow: string; title: string; copy?: string; inverted?: boolean }) {
  return (
    <div className={`section-header ${inverted ? "section-header-inverted" : ""}`}>
      <p className="eyebrow"><span>{eyebrow}</span></p>
      <h2>{title}</h2>
      {copy && <p className="section-intro">{copy}</p>}
    </div>
  );
}
