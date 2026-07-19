import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://ares-reflight.vercel.app"),
  title: { default: "ARES ReFlight — Modular Fixed-Wing UAV Ecosystem", template: "%s — ARES ReFlight" },
  description: "ARES ReFlight is a student-led aerospace engineering project developing custom ground-control software, a modular fixed-wing UAV, telemetry systems, and an automated antenna-tracking ground station.",
  keywords: ["ARES ReFlight", "fixed-wing UAV", "ground control software", "MAVLink", "ArduPilot SITL", "aerospace engineering"],
  authors: [{ name: "Abdullah Mert Elgezen" }],
  openGraph: { title: "ARES ReFlight — Modular Fixed-Wing UAV Ecosystem", description: "A student-led aerospace engineering project built step by step—from simulation software to future hardware validation.", type: "website", locale: "en_US", siteName: "ARES ReFlight", images: [{ url: "/images/ares-uav-hero.png", width: 1672, height: 941, alt: "Conceptual white ARES fixed-wing research UAV" }] },
  twitter: { card: "summary_large_image", title: "ARES ReFlight", description: "Modular fixed-wing UAV ecosystem for reconnaissance, mapping, and engineering research.", images: ["/images/ares-uav-hero.png"] },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#07111d" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${inter.variable} ${space.variable} ${mono.variable}`}><body><a className="skip-link" href="#main-content">Skip to content</a><Navigation />{children}<Footer /></body></html>;
}
