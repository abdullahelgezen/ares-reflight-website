"use client";

import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks } from "@/content/project";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        <a className="github-link" href="https://github.com/" target="_blank" rel="noreferrer">View GitHub <ArrowUpRight size={14} /></a>
        <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close menu" : "Open menu"}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      <div id="mobile-navigation" className={`mobile-nav ${open ? "mobile-nav-open" : ""}`}>
        {navLinks.map((link, index) => <Link key={link.label} href={link.href} onClick={() => setOpen(false)}><span>0{index + 1}</span>{link.label}</Link>)}
        <a href="https://github.com/" target="_blank" rel="noreferrer">View GitHub <ArrowUpRight size={16} /></a>
      </div>
    </header>
  );
}
