"use client";

import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { navLinks } from "@/content/project";
import { PUBLIC_REPOSITORY } from "@/content/site";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 1180) setOpen(false);
    };

    document.body.classList.toggle("mobile-menu-active", open);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      document.body.classList.remove("mobile-menu-active");
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className={`nav-shell ${scrolled ? "nav-scrolled" : ""}`}>
      <nav className="nav-inner" aria-label="Primary navigation">
        <Link href="/" className="brand" aria-label="ARES ReFlight home">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
          <span><b>ARES</b><small>REFLIGHT</small></span>
        </Link>
        <div className="desktop-nav">
          {navLinks.map((link) => <Link key={link.label} href={link.href}>{link.label}</Link>)}
        </div>
        <a className="github-link" href={PUBLIC_REPOSITORY} target="_blank" rel="noreferrer">View GitHub <ArrowUpRight size={14} /></a>
        <button type="button" className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close menu" : "Open menu"}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      <div id="mobile-navigation" className={`mobile-nav ${open ? "mobile-nav-open" : ""}`} aria-hidden={!open}>
        {navLinks.map((link, index) => <Link key={link.label} href={link.href} onClick={() => setOpen(false)}><span>0{index + 1}</span>{link.label}</Link>)}
        <a href={PUBLIC_REPOSITORY} target="_blank" rel="noreferrer">View GitHub <ArrowUpRight size={16} /></a>
      </div>
    </header>
  );
}
