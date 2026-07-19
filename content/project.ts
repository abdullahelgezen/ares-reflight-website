export type ProjectStatus = "COMPLETED" | "SIMULATED" | "IN DEVELOPMENT" | "PLANNED" | "NOT STARTED";

export type SystemModule = {
  id: string;
  index: string;
  name: string;
  shortName: string;
  status: ProjectStatus;
  purpose: string;
  functions: string[];
  stage: string;
};

export const systemModules: SystemModule[] = [
  {
    id: "air-vehicle",
    index: "01",
    name: "ARES Air Vehicle",
    shortName: "AIR VEHICLE",
    status: "IN DEVELOPMENT",
    purpose: "A modular fixed-wing platform conceived for mapping, observation, and low-cost engineering research.",
    functions: ["Modular fuselage", "Swappable payload bay", "Repairable structure"],
    stage: "Concept configuration and structural planning",
  },
  {
    id: "software",
    index: "02",
    name: "ARES-01 Software",
    shortName: "ARES-01",
    status: "COMPLETED",
    purpose: "The software foundation for telemetry, mission planning, simulation control, replay, and engineering analysis.",
    functions: ["MAVLink telemetry", "SITL integration", "Replay and diagnostics"],
    stage: "Initial stable desktop release — v1.3.0",
  },
  {
    id: "ground-station",
    index: "03",
    name: "ARES Ground Station",
    shortName: "GROUND STATION",
    status: "IN DEVELOPMENT",
    purpose: "A portable field concept integrating ARES-01, telemetry hardware, power, and independent control support.",
    functions: ["Portable computing", "Telemetry link", "Field power"],
    stage: "Hardware architecture and component planning",
  },
  {
    id: "tracker",
    index: "04",
    name: "Automated Antenna Tracker",
    shortName: "TRACKER",
    status: "PLANNED",
    purpose: "A pan-tilt directional antenna concept driven by aircraft GPS telemetry and calculated line-of-sight angles.",
    functions: ["Azimuth calculation", "Elevation calculation", "Tracking-error monitoring"],
    stage: "Software architecture in development; hardware planned",
  },
];

export const softwareFeatures = [
  "Live MAVLink Telemetry",
  "ArduPilot SITL Integration",
  "Flight Display",
  "Artificial Horizon",
  "Mission Mapping",
  "CSV Logging",
  "Replay Analysis",
  "Diagnostics",
  "Safety-Gated Simulation Controls",
  "Portable Windows Release",
];

export const roadmap = [
  { era: "2026", title: "Concept definition", status: "COMPLETED" as ProjectStatus },
  { era: "2026", title: "ARES-01 software architecture", status: "COMPLETED" as ProjectStatus },
  { era: "2026", title: "SITL and MAVLink integration", status: "SIMULATED" as ProjectStatus },
  { era: "2026", title: "Telemetry, replay, and diagnostics", status: "COMPLETED" as ProjectStatus },
  { era: "2026", title: "Initial stable Windows release", status: "COMPLETED" as ProjectStatus },
  { era: "NEXT", title: "Aircraft structure prototype", status: "PLANNED" as ProjectStatus },
  { era: "NEXT", title: "Avionics bench testing", status: "PLANNED" as ProjectStatus },
  { era: "NEXT", title: "Ground station hardware", status: "PLANNED" as ProjectStatus },
  { era: "NEXT", title: "Antenna tracker prototype", status: "PLANNED" as ProjectStatus },
  { era: "FUTURE", title: "Taxi and manual flight validation", status: "NOT STARTED" as ProjectStatus },
  { era: "FUTURE", title: "Autonomous mapping tests", status: "PLANNED" as ProjectStatus },
];

export const developmentEntries = [
  { slug: "initial-ares-01-release", date: "JUL 2026", stage: "SOFTWARE", category: "RELEASE", title: "Initial ARES-01 Desktop Release", summary: "A stable Windows-native foundation for telemetry, simulation, replay, diagnostics, and technical reporting.", status: "COMPLETED" as ProjectStatus },
  { slug: "safety-gated-control", date: "JUL 2026", stage: "SIMULATION", category: "SAFETY", title: "Building a Safety-Gated Simulation Control Layer", summary: "Designing explicit local-SITL verification and operator gates before any simulation command can be issued.", status: "COMPLETED" as ProjectStatus },
  { slug: "modular-air-vehicle", date: "DATE TBD", stage: "AIRFRAME", category: "DESIGN", title: "Designing the Modular Air Vehicle Architecture", summary: "Exploring repairable structures, replaceable sections, and payload integration without inventing unvalidated performance claims.", status: "IN DEVELOPMENT" as ProjectStatus },
  { slug: "antenna-tracker", date: "DATE TBD", stage: "GROUND", category: "SYSTEMS", title: "Planning the Automated Antenna Tracker", summary: "Defining telemetry-to-angle calculations and a future pan-tilt hardware interface.", status: "PLANNED" as ProjectStatus },
  { slug: "sitl-to-hardware", date: "DATE TBD", stage: "VALIDATION", category: "TESTING", title: "Preparing the Transition from SITL to Hardware", summary: "Sequencing bench tests, independent safety checks, and evidence capture before flight validation begins.", status: "PLANNED" as ProjectStatus },
];

export const documentation = [
  ["SYS-001", "System Architecture", "Boundaries, modules, signal paths, and integration responsibilities.", "IN DEVELOPMENT"],
  ["SWE-001", "Software Architecture", "Windows-native services, UI shell, logging, replay, and command safety.", "COMPLETED"],
  ["COM-001", "MAVLink Integration", "Connection lifecycle, normalized telemetry, and ArduPilot SITL integration.", "SIMULATED"],
  ["SIM-001", "Simulation Environment", "Local SITL setup, safety boundary, mock data, and diagnostics.", "COMPLETED"],
  ["HW-001", "Hardware Concept", "Airframe, avionics, ground station, and tracker concept definition.", "IN DEVELOPMENT"],
  ["SAF-001", "Safety Philosophy", "Simulation-only command restrictions and the planned path to hardware validation.", "COMPLETED"],
  ["TST-001", "Testing Strategy", "Automated verification, mock scenarios, bench gates, and future flight evidence.", "IN DEVELOPMENT"],
  ["REL-001", "Version History", "Release notes and semantic version records for each system layer.", "COMPLETED"],
  ["RDM-001", "Roadmap", "Current, next, and future engineering milestones.", "IN DEVELOPMENT"],
] as const;

export const navLinks = [
  { label: "Overview", href: "/#overview" },
  { label: "Mission", href: "/#mission" },
  { label: "System", href: "/#system" },
  { label: "Software", href: "/#software" },
  { label: "Air Vehicle", href: "/#air-vehicle" },
  { label: "Development", href: "/development" },
  { label: "Documentation", href: "/documentation" },
  { label: "About", href: "/about" },
];
