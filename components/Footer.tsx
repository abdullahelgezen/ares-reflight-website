import Link from "next/link";
import { PROJECT_LEAD, PROJECT_LEAD_TITLE, PUBLIC_REPOSITORY } from "@/content/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div><span className="footer-wordmark">ARES <i>REFLIGHT</i></span><p>Student-Led Aerospace Engineering Project</p></div>
        <div className="footer-links"><Link href="/engineering-log">Engineering Log</Link><Link href="/documentation">Documentation</Link><Link href="/roadmap">Roadmap</Link><Link href="/transparency">Transparency</Link><Link href="/open-knowledge">Open Knowledge</Link><Link href="/corrections">Corrections</Link><Link href="/contribute">Feedback</Link><a href="/feed.xml">RSS</a><a href={PUBLIC_REPOSITORY} target="_blank" rel="noreferrer">GitHub</a></div>
      </div>
      <div className="footer-bottom"><span>© 2026 ARES ReFlight</span><span>{PROJECT_LEAD} · {PROJECT_LEAD_TITLE}</span><p>ARES ReFlight is an independent student engineering project. The air vehicle is conceptual and has not yet been flight validated.</p></div>
    </footer>
  );
}
