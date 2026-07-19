import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div><span className="footer-wordmark">ARES <i>REFLIGHT</i></span><p>Student-Led Aerospace Engineering Project</p></div>
        <div className="footer-links"><a href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a><a href="https://instagram.com/ares.reflight" target="_blank" rel="noreferrer">Instagram</a><Link href="/documentation">Documentation</Link><Link href="/development">Development Log</Link><Link href="/roadmap">Roadmap</Link></div>
      </div>
      <div className="footer-bottom"><span>© 2026 ARES ReFlight</span><span>Designed and developed by Abdullah Mert Elgezen</span><p>ARES ReFlight is an independent student engineering project currently under development. Hardware performance and flight capability have not yet been validated.</p></div>
    </footer>
  );
}
