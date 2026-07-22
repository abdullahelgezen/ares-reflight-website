import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { PROJECT_LEAD, PROJECT_LEAD_TITLE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/content/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "ARES ReFlight — Modular Fixed-Wing UAS Research", template: `%s — ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  keywords: ["ARES ReFlight", "fixed-wing UAV", "ground control software", "MAVLink", "ArduPilot SITL", "aerospace engineering"],
  authors: [{ name: "Abdullah Mert Elgezen" }],
  alternates: { canonical: SITE_URL },
  openGraph: { title: "ARES ReFlight — Modular Fixed-Wing UAS Research", description: "An independent student-led project built step by step—from validated simulation software to conceptual air-vehicle and ground-station research.", url: SITE_URL, type: "website", locale: "en_US", siteName: SITE_NAME, images: [{ url: "/og.png", width: 1733, height: 907, alt: "ARES ReFlight Engineering Log social card with a conceptual white uncrewed research aircraft and the statement Evidence before confidence" }] },
  twitter: { card: "summary_large_image", title: SITE_NAME, description: "Software-validated simulation research and conceptual fixed-wing system development, with claims kept proportional to evidence.", images: ["/og.png"] },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#07111d" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = [
    { "@context": "https://schema.org", "@type": "WebSite", name: SITE_NAME, url: SITE_URL, description: SITE_DESCRIPTION, publisher: { "@id": `${SITE_URL}/#organization` }, inLanguage: "en" },
    { "@context": "https://schema.org", "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: SITE_NAME, url: SITE_URL, description: "An independent student-led aerospace engineering initiative. It is not a certified aircraft manufacturer or operational emergency-response organization." },
    { "@context": "https://schema.org", "@type": "Person", "@id": `${SITE_URL}/about#abdullah-mert-elgezen`, name: PROJECT_LEAD, url: `${SITE_URL}/about`, jobTitle: PROJECT_LEAD_TITLE },
    { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "ARES-01", url: `${SITE_URL}/#software`, description: "A Windows-native software-in-the-loop research environment for fixed-wing UAV telemetry, local simulation control, replay, diagnostics, and engineering analysis.", applicationCategory: "EngineeringApplication", operatingSystem: "Windows 11", softwareVersion: "1.3.0", author: { "@id": `${SITE_URL}/about#abdullah-mert-elgezen` }, isPartOf: { "@id": `${SITE_URL}/#organization` } },
  ];
  return <html lang="en" className={`${inter.variable} ${space.variable} ${mono.variable}`}><body><JsonLd data={structuredData} /><a className="skip-link" href="#main-content">Skip to content</a><Navigation />{children}<Footer /></body></html>;
}
