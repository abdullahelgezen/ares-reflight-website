import { CONTENT_REVIEW_DATE } from "@/content/site";

export type ArticleStatus =
  | "Engineering Note"
  | "Concept Study"
  | "Software Validated in SITL"
  | "Hardware Not Yet Validated"
  | "Retrospective Development Log";

export type ArticleTable = {
  headers: string[];
  rows: string[][];
};

export type ArticleSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: ArticleTable;
  callout?: string;
};

export type ArticleSource = {
  organization: string;
  title: string;
  publicationDate: string;
  accessedDate: string;
  url: string;
  supports: string;
};

export type EngineeringArticle = {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  status: ArticleStatus;
  published: string;
  updated: string;
  readingMinutes: number;
  disclaimer: string;
  topics: string[];
  sections: ArticleSection[];
  sources?: ArticleSource[];
  related: string[];
};

const publication = CONTENT_REVIEW_DATE;

export const engineeringArticles: EngineeringArticle[] = [
  {
    slug: "stabilizing-ares-01-telemetry-pipeline",
    title: "Stabilizing the ARES-01 Telemetry Pipeline",
    subtitle: "How connection discovery, port separation, diagnostics, and safety gating improved reliability during ArduPilot SITL testing.",
    summary: "A reconstruction of the software problems that made the first MAVLink connection difficult to interpret, and the controls added to make connection state and command authority explicit.",
    status: "Software Validated in SITL",
    published: publication,
    updated: publication,
    readingMinutes: 10,
    disclaimer: "This article describes software-in-the-loop testing. It does not demonstrate real-aircraft telemetry range, RF reliability, or flight-hardware validation.",
    topics: ["MAVLink", "ArduPilot SITL", "Telemetry", "Safety"],
    sections: [
      {
        id: "problem",
        title: "The problem was ambiguous ownership",
        paragraphs: [
          "The first ARES-01 telemetry prototype could wait indefinitely for a heartbeat while reporting only that it was connecting. The configured UDP endpoint was valid syntax, but it had no value unless another application was actually forwarding MAVLink packets to it. A second TCP endpoint could be open without carrying a configured MAVLink stream. The interface therefore needed to distinguish an open socket from a verified aircraft connection.",
          "Mission Planner commonly uses the primary ArduPlane SITL endpoint on TCP port 5760. Secondary simulated serial endpoints appear on 5762 and 5763. Treating those numbers as interchangeable obscures which process owns a connection and whether a heartbeat is present. ARES now avoids competing for 5760 during automatic discovery and reports the endpoint it is evaluating.",
        ],
        callout: "An open port is not the same as a healthy MAVLink link. A verified connection requires a current heartbeat and a recognized vehicle context.",
      },
      {
        id: "discovery",
        title: "Bounded connection discovery",
        paragraphs: [
          "The connection service evaluates a configurable candidate list with bounded timeouts, closes failed sockets, and moves to the next candidate instead of freezing the UI. Local UDP forwarding remains the preferred separation model when Mission Planner can provide it; secondary SITL TCP ports remain practical fallbacks for the local research environment.",
          "Diagnostics make the distinction visible: the active candidate, endpoint type, heartbeat timeout, system and component identifiers, detected vehicle type, reconnect attempt, and heartbeat age are reported independently. This turned connection troubleshooting from guesswork into an observable state machine.",
        ],
        bullets: [
          "TCP 5760: commonly owned by Mission Planner as the primary SITL connection.",
          "TCP 5762 and 5763: secondary local SITL endpoints that must still provide a valid heartbeat.",
          "UDP 14550: useful only when a MAVLink source forwards packets to the listener.",
          "Localhost-only resolution: automatic command authority is never broadened to a remote endpoint.",
        ],
      },
      {
        id: "validation",
        title: "Verify the aircraft before trusting the stream",
        paragraphs: [
          "ARES does not promote a socket to an operational connection solely because data arrives. It checks that the heartbeat identifies a fixed-wing vehicle and the ArduPilot autopilot family. Heartbeat age is monitored so a stale link cannot retain an apparently healthy status.",
          "Read-only telemetry and simulation command control are separated. Telemetry can be observed without enabling commands. Simulation commands remain unavailable unless the endpoint resolves to localhost, the port is on the approved SITL list, the heartbeat is current, the vehicle is fixed-wing, ArduPilot is detected, and the operator explicitly enables Simulation Control Mode. Replay is always command-disabled.",
        ],
      },
      {
        id: "threads",
        title: "Thread ownership and clean shutdown",
        paragraphs: [
          "Early dashboard closure exposed a Qt worker-lifecycle defect: the UI could be destroyed while a telemetry thread was still running. The corrected lifecycle uses cooperative cancellation, closes the MAVLink connection, signals completion, quits the thread, and waits for bounded shutdown. Telemetry acquisition remains outside the UI thread, while Qt signals carry normalized updates to visible widgets.",
          "CSV logging and replay further separate acquisition from presentation. Recorded telemetry can be inspected without a running simulator, and bounded graph buffers prevent long sessions from growing UI memory without limit.",
        ],
      },
      {
        id: "evidence",
        title: "What was actually validated",
        paragraphs: [
          "ARES received live MAVLink telemetry from local ArduPlane SITL on TCP 127.0.0.1:5762. The observed stream included position, relative and mean-sea-level altitude, airspeed, groundspeed, heading, throttle, attitude, vertical speed, battery state, GPS fix, satellites, mode, and armed state. A simple waypoint mission was also executed in Mission Planner during development. This was an operator-observed SITL milestone, not a formal real-aircraft flight test.",
          "The desktop application was also exercised at multiple supported screen resolutions, while later website work separately verified mobile and desktop layouts. These UI checks demonstrate presentation behavior, not flightworthiness.",
        ],
        callout: "The main lesson was that telemetry reliability depends less on adding more interfaces and more on making connection state, endpoint ownership, and command authority explicit.",
      },
    ],
    sources: [
      {
        organization: "ARES ReFlight",
        title: "Public software and simulation documentation index",
        publicationDate: "22 July 2026",
        accessedDate: "22 July 2026",
        url: "/documentation",
        supports: "Project status, simulation safety boundary, telemetry features, and stated validation limits.",
      },
    ],
    related: ["telemetry-centric-ares-variant", "ground-station-antenna-architecture", "2026-engineering-retrospective-january-july"],
  },
  {
    slug: "communications-resilience-coastal-observation",
    title: "Designing Communications Resilience for Coastal Observation Missions",
    subtitle: "A Coastal Observation Communications Resilience Strategy for ordinary interference, environmental exposure, and temporary link degradation.",
    summary: "A conservative concept for keeping command authority, telemetry evidence, and recovery behavior understandable when coastal communications degrade.",
    status: "Concept Study",
    published: publication,
    updated: publication,
    readingMinutes: 9,
    disclaimer: "This is a communications-resilience concept, not an RF-qualified system. It does not claim EMP immunity, resistance to military jamming, regulatory approval, or validated range.",
    topics: ["Coastal observation", "EMI", "Communications", "Failsafe"],
    sections: [
      {
        id: "objective",
        title: "A resilience objective, not an immunity claim",
        paragraphs: [
          "Coastal observation combines long sight lines with salt exposure, humidity, wind, rapidly changing weather, RF congestion near populated shorelines, and terrain that can interrupt line of sight. The engineering objective is to preserve safe, predictable behavior when a link becomes intermittent—not to promise uninterrupted control.",
        ],
        callout: "The objective is not to make the aircraft immune to electromagnetic attack. The objective is to reduce vulnerability to ordinary interference, wiring noise, environmental effects, and temporary link degradation.",
      },
      {
        id: "architecture",
        title: "Independent paths and explicit loss-of-link behavior",
        paragraphs: [
          "A proposed architecture separates flight-critical RC control from laptop-based telemetry. Redundant telemetry paths may improve observability, but they must not create ambiguous command authority. Each path needs a documented owner, health metric, and transition rule.",
          "Return-to-home behavior, local mission-continuation limits, and loss-of-link procedures must be configured conservatively and validated in simulation before bench and field testing. A degraded mode should reduce mission ambition rather than conceal uncertainty. A mission may continue only within pre-authorized limits; otherwise the safer response may be loiter, return, land, or abort depending on airspace, weather, energy, and launch-site conditions.",
        ],
        bullets: [
          "Keep RC control and telemetry failure domains separate where practical.",
          "Record signal strength, packet loss, heartbeat age, path selection, and failsafe transitions.",
          "Define a maximum duration for local mission continuation without a verified link.",
          "Make degraded operation visible to the operator and the post-flight record.",
        ],
      },
      {
        id: "emi",
        title: "Airborne EMI hygiene",
        paragraphs: [
          "Shielded signal wiring, filtered power distribution, careful grounding and bonding, and physical separation between noisy power electronics and sensitive receivers can reduce self-generated interference. Ferrites and common-mode filtering may help when selected from measurement rather than habit. Cable shields and grounds need a deliberate termination strategy; adding conductive material without a current-return plan can make noise paths harder to predict.",
          "Motor phases, ESC power leads, switching regulators, digital buses, GNSS receivers, and RF front ends should be laid out as a system. Antenna placement must consider polarization, airframe shadowing, carbon structures, propulsive hardware, payload transmitters, and cable loss. Salt and moisture protection must not trap heat or prevent inspection.",
        ],
      },
      {
        id: "validation",
        title: "Measure before field deployment",
        paragraphs: [
          "A pre-flight spectrum survey can reveal local occupancy but cannot guarantee an interference-free mission. Ground range checks, controlled power-on tests, packet-loss logging, conducted-noise measurements, and incremental flight envelopes are needed before any extended observation mission. Frequencies, power, and antennas must comply with the rules of the jurisdiction where testing occurs.",
          "The strategy remains a study until the complete aircraft, ground station, antenna system, and failsafe behavior have been measured together under representative coastal conditions.",
        ],
      },
    ],
    related: ["ground-station-antenna-architecture", "telemetry-centric-ares-variant", "modular-coastal-observation-airframe"],
  },
  {
    slug: "ground-station-antenna-architecture",
    title: "Ground-Station Antenna Architecture for ARES ReFlight",
    subtitle: "A dual-coverage, mast-mounted concept for launch, recovery, and directional telemetry research.",
    summary: "The proposed antenna system combines close-range omnidirectional coverage with a future tracked directional path, while retaining manual control and clear validation gates.",
    status: "Hardware Not Yet Validated",
    published: publication,
    updated: publication,
    readingMinutes: 7,
    disclaimer: "This architecture is conceptual. No antenna, tracker, RF path, frequency plan, link budget, or field range has been validated or approved.",
    topics: ["Ground station", "Antenna tracker", "RF", "GNSS"],
    sections: [
      {
        id: "proposal",
        title: "Proposed dual-coverage architecture",
        paragraphs: [
          "The concept uses a primary directional antenna for extended-range telemetry research and a secondary omnidirectional antenna for launch, landing, close-range coverage, and recovery from tracking uncertainty. A diversity receiver or deliberately selectable RF path would keep path choice explicit rather than blending unknown states.",
        ],
        bullets: [
          "Mast-mounted directional and omnidirectional antennas with consistent polarization.",
          "Low-loss coaxial cable sized to the selected frequency and cable run.",
          "Weather-resistant enclosure with service access, drainage, and thermal consideration.",
          "GNSS-assisted aircraft position input for future azimuth and elevation tracking.",
          "Manual override, mechanical limits, a park position, and an emergency stop.",
          "Clear line of sight as an operational requirement, not an assumed guarantee.",
        ],
      },
      {
        id: "tracking",
        title: "Tracking is a future development target",
        paragraphs: [
          "ARES-01 can already receive aircraft position in simulation. A future tracker would combine aircraft coordinates with a surveyed ground-station position and known mount orientation to calculate target azimuth and elevation. Encoder feedback would make pointing error observable. The first physical tests should use a walking GNSS target and no RF dependency before carrying an antenna or supporting flight operations.",
          "Cable wrapping, backlash, wind loading, mast stability, magnetic interference, and GNSS age all affect pointing. Continuous rotation may require a slip ring and RF rotary joint; an early prototype can instead use bounded rotation and a controlled unwind maneuver.",
        ],
      },
      {
        id: "validation",
        title: "Link-budget and spectrum gates",
        paragraphs: [
          "Antenna gain alone does not establish useful range. Transmit power, receiver sensitivity, cable loss, polarization mismatch, Fresnel clearance, terrain, interference, installation loss, data rate, packet overhead, and regulatory limits all belong in the link budget. The system should be tested first at low power and short distance, then expanded under an approved field plan.",
        ],
        callout: "Final frequencies, gain, power, and antenna geometry will depend on local spectrum regulations and field testing.",
      },
    ],
    related: ["communications-resilience-coastal-observation", "stabilizing-ares-01-telemetry-pipeline", "modular-coastal-observation-airframe"],
  },
  {
    slug: "embedded-compute-ares-variant",
    title: "Embedded-Compute ARES Variant: Advantages and Trade-Offs",
    subtitle: "What changes when a non-flight-critical companion computer moves image processing and decision support onboard.",
    summary: "A companion computer could reduce high-bandwidth dependence and enable local processing, but it adds mass, power, heat, software, cybersecurity, and integration burdens.",
    status: "Concept Study",
    published: publication,
    updated: publication,
    readingMinutes: 8,
    disclaimer: "No companion computer, onboard AI payload, or autonomous search function has been integrated or flight validated on ARES hardware.",
    topics: ["Companion computer", "Payload", "Sensor fusion", "Autonomy"],
    sections: [
      {
        id: "separation",
        title: "Two computers, two authorities",
        paragraphs: [
          "The flight controller and companion computer serve different roles. The flight controller owns stabilization, navigation, and failsafe authority. The companion computer may request mission-level actions or provide processed observations, but it must not become a single point of failure for basic aircraft control.",
          "If the companion computer freezes, reboots, overheats, produces invalid data, or loses its internal sensor link, the flight controller must retain safe authority. Interfaces need timeouts, validity flags, rate limits, and a defined degraded state.",
        ],
      },
      {
        id: "advantages",
        title: "Potential advantages",
        bullets: [
          "Onboard image processing and local object-detection research.",
          "Map generation and selective data compression before downlink.",
          "Reduced dependence on a continuous high-bandwidth connection.",
          "Local sensor fusion and decision support for mission operators.",
          "Potential mission adaptation and autonomous search-pattern evaluation within explicit limits.",
          "Storage of full-resolution data when only summaries can be transmitted.",
        ],
      },
      {
        id: "costs",
        title: "Integration costs",
        paragraphs: [
          "The embedded-compute variant increases electrical load, heat rejection, mass, boot time, software complexity, cybersecurity surface, and electromagnetic noise. Cooling that works on a bench may fail inside a sealed airframe in sunlight or humid air. More connectors and services create more failure modes and a larger test matrix.",
          "The aircraft needs a power budget that includes peak compute load, camera startup, storage writes, and thermal throttling. The architecture also needs a safe shutdown and filesystem strategy, update recovery, interface versioning, and evidence that payload faults cannot destabilize critical avionics.",
        ],
      },
      {
        id: "decision",
        title: "When the variant becomes justified",
        paragraphs: [
          "Embedded compute is justified when a mission genuinely benefits from local processing and the value exceeds the mass, power, thermal, and verification cost. It should not be added to make a prototype appear more advanced. Early ARES hardware can mature more safely with a telemetry-centric baseline before a companion-computer branch is evaluated.",
        ],
      },
    ],
    related: ["telemetry-centric-ares-variant", "modular-coastal-observation-airframe", "where-uas-could-help-after-earthquakes-and-extreme-rainfall"],
  },
  {
    slug: "telemetry-centric-ares-variant",
    title: "Telemetry-Centric ARES Variant: Advantages and Trade-Offs",
    subtitle: "A simpler aircraft architecture that keeps high-performance processing on the ground.",
    summary: "Lower mass and simpler integration can accelerate early validation, but the aircraft becomes more dependent on communication links and the ground station.",
    status: "Concept Study",
    published: publication,
    updated: publication,
    readingMinutes: 8,
    disclaimer: "This comparison is an architectural study. Neither variant has completed ARES flight-hardware validation.",
    topics: ["Telemetry", "Architecture", "Trade study", "Ground station"],
    sections: [
      {
        id: "baseline",
        title: "A deliberately simpler baseline",
        paragraphs: [
          "The telemetry-centric variant carries the flight controller, navigation sensors, safety link, telemetry modem, and mission payload without a high-performance companion computer. Heavy processing remains on the ground or after recovery. This reduces airborne complexity and creates more predictable early-stage failure modes.",
        ],
      },
      {
        id: "advantages",
        title: "Potential advantages",
        bullets: [
          "Lower mass, cost, and electrical consumption.",
          "Simpler thermal design and maintenance.",
          "Fewer software dependencies and startup sequences.",
          "Easier early bench testing and clearer fault isolation.",
          "More capacity for endurance, structure, or a mission sensor within the same mass budget.",
        ],
      },
      {
        id: "limitations",
        title: "Communications become more important",
        paragraphs: [
          "Without onboard processing, raw or lightly compressed sensor data may require more downlink bandwidth. Real-time image analysis is limited, autonomy during link degradation is reduced, and the ground station becomes more central to mission interpretation. A lost link can therefore interrupt the mission even while the flight controller remains capable of returning safely.",
        ],
      },
      {
        id: "comparison",
        title: "Architecture comparison",
        table: {
          headers: ["Category", "Embedded compute", "Telemetry-centric"],
          rows: [
            ["Mass", "Higher", "Lower"],
            ["Power", "Higher and more variable", "Lower and more predictable"],
            ["Onboard intelligence", "Potentially substantial", "Limited to autopilot and payload firmware"],
            ["Communications dependence", "Lower for local processing", "Higher for real-time mission interpretation"],
            ["Cost", "Higher", "Lower"],
            ["Thermal complexity", "High", "Low to moderate"],
            ["Maintenance", "More software and hardware layers", "Fewer airborne dependencies"],
            ["Mission flexibility", "High after validation", "High for simpler observation missions"],
            ["Failure isolation", "Requires strict interface boundaries", "Simpler initial isolation"],
            ["Development maturity", "Concept only", "Preferred early baseline; hardware still unvalidated"],
          ],
        },
        callout: "Neither architecture is universally superior. The correct choice depends on mission data, link availability, payload needs, energy budget, and the evidence required for safe operation.",
      },
    ],
    related: ["embedded-compute-ares-variant", "communications-resilience-coastal-observation", "stabilizing-ares-01-telemetry-pipeline"],
  },
  {
    slug: "twin-boom-twin-motor-fixed-wing-concept",
    title: "Twin-Boom Twin-Motor Fixed-Wing Concept",
    subtitle: "A central payload fuselage with wing-mounted electric propulsion and a twin-boom tail.",
    summary: "A design study examining payload access and propulsion redundancy alongside drag, wiring, structural, and asymmetric-thrust penalties.",
    status: "Hardware Not Yet Validated",
    published: publication,
    updated: publication,
    readingMinutes: 6,
    disclaimer: "Conceptual configuration only. It is not flight validated; dimensions and performance are not finalized and remain subject to aerodynamic, structural, and propulsion testing.",
    topics: ["Airframe", "Twin boom", "Propulsion", "Payload"],
    sections: [
      {
        id: "configuration",
        title: "Configuration",
        paragraphs: [
          "Two electric motors are mounted on the wing, leaving a central fuselage available for a modular nose sensor bay and payload volume. Twin tail booms carry the empennage behind the propeller planes. The layout could keep the forward field of view clear and make propulsion modules replaceable.",
        ],
      },
      {
        id: "advantages",
        title: "Potential advantages",
        bullets: [
          "Useful central payload volume and a clear modular nose.",
          "Propulsion redundancy at the hardware level, subject to controllability after a failure.",
          "Shorter power runs if batteries and controllers are integrated near the wing center section.",
          "Flexible sensor and landing-gear packaging around the central fuselage.",
        ],
      },
      {
        id: "penalties",
        title: "Penalties and validation questions",
        paragraphs: [
          "Two nacelles, booms, and their junctions add wetted area, interference drag, wiring, fasteners, and structural load paths. A motor failure creates asymmetric thrust that may demand substantial rudder authority and an immediate power-management strategy. Propeller slipstreams can interact with the wing and tail differently across the envelope.",
          "The concept needs low-speed controllability analysis, one-engine-inoperative simulation, structural testing at boom and wing joints, cooling checks, vibration measurement, and a mass comparison against a single-motor baseline before selection.",
        ],
      },
    ],
    related: ["conventional-single-fuselage-fixed-wing-concept", "centerline-push-pull-propulsion-study", "modular-coastal-observation-airframe"],
  },
  {
    slug: "conventional-single-fuselage-fixed-wing-concept",
    title: "Conventional Single-Fuselage Fixed-Wing Concept",
    subtitle: "A lower-complexity baseline for aerodynamic analysis, fabrication, and early flight validation.",
    summary: "The conventional layout reduces joints and manufacturing complexity but offers less room for large gimbals and modular payloads.",
    status: "Hardware Not Yet Validated",
    published: publication,
    updated: publication,
    readingMinutes: 5,
    disclaimer: "Conceptual configuration only. It is not flight validated; dimensions and performance are not finalized and remain subject to aerodynamic, structural, and propulsion testing.",
    topics: ["Airframe", "Baseline", "Manufacturing", "Aerodynamics"],
    sections: [
      {
        id: "configuration",
        title: "A reference architecture",
        paragraphs: [
          "A single fuselage, high wing, conventional tail, and one electric propulsion system create a useful reference configuration. The layout has fewer major junctions than a twin-boom airframe and is easier to represent in early aerodynamic and structural models.",
        ],
      },
      {
        id: "advantages",
        title: "Why it is attractive for a first prototype",
        bullets: [
          "Simpler structure and lower manufacturing complexity.",
          "Clearer center-of-gravity management and load paths.",
          "Easier aerodynamic analysis and comparison with established trainer geometries.",
          "Fewer propulsion components, power cables, and motor-out cases.",
          "Potentially lower empty mass and repair burden.",
        ],
      },
      {
        id: "limitations",
        title: "Payload limitations",
        paragraphs: [
          "A narrow fuselage may limit large gimbals, multiple cameras, or rapidly interchangeable payload modules. A front tractor can obstruct a forward sensor view, while a rear pusher can complicate cooling, launch, and propeller clearance. The airframe may need a deeper center section or detachable belly pod, which adds drag and integration work.",
          "The concept remains valuable as a controlled baseline even if a later mission justifies a more complex configuration.",
        ],
      },
    ],
    related: ["twin-boom-twin-motor-fixed-wing-concept", "centerline-push-pull-propulsion-study", "modular-coastal-observation-airframe"],
  },
  {
    slug: "centerline-push-pull-propulsion-study",
    title: "Centerline Push-Pull Propulsion Study",
    subtitle: "A front tractor and rear pusher intended to reduce lateral thrust imbalance after a single-motor failure.",
    summary: "Centerline propulsion reduces asymmetric thrust but creates rear-propeller inflow, cooling, clearance, structure, and integration challenges.",
    status: "Hardware Not Yet Validated",
    published: publication,
    updated: publication,
    readingMinutes: 6,
    disclaimer: "Conceptual configuration only. It is not flight validated; dimensions and performance are not finalized and remain subject to aerodynamic, structural, and propulsion testing.",
    topics: ["Propulsion", "Push-pull", "Failure modes", "Airframe"],
    sections: [
      {
        id: "rationale",
        title: "Why place both motors on the centerline",
        paragraphs: [
          "A front tractor and rear pusher create thrust close to the longitudinal centerline. If one motor fails, the yawing moment can be smaller than with widely spaced wing motors. This may simplify immediate controllability, but it does not guarantee safe continued flight: total available thrust, pitch moments, propeller drag, and electrical failure commonality still matter.",
        ],
      },
      {
        id: "integration",
        title: "Integration penalties",
        bullets: [
          "Rear propeller inflow can be disturbed by the fuselage and forward propeller wake.",
          "Rear motor and controller cooling are harder inside the fuselage wake.",
          "Tail geometry must avoid the rear propeller disk and retain stiffness.",
          "Landing clearance and safe ground handling become more demanding.",
          "Two powertrains increase wiring, controls, monitoring, and mass.",
          "A shared battery or power bus may defeat the intended redundancy.",
        ],
      },
      {
        id: "tests",
        title: "Required evidence",
        paragraphs: [
          "Selection requires propulsion bench testing, measured static and dynamic thrust, thermal testing, inflow analysis, vibration assessment, structural load cases around both motor mounts, and simulation of each motor-failure condition. A simpler single-motor aircraft remains the reference case until this evidence exists.",
        ],
      },
    ],
    related: ["twin-boom-twin-motor-fixed-wing-concept", "conventional-single-fuselage-fixed-wing-concept", "modular-coastal-observation-airframe"],
  },
  {
    slug: "modular-coastal-observation-airframe",
    title: "Modular Coastal Observation Airframe",
    subtitle: "A repair-oriented concept for humidity, salt exposure, payload changes, and constrained field maintenance.",
    summary: "A conceptual airframe architecture prioritizing corrosion-aware materials, protected avionics, replaceable non-critical panels, and inspectable payload interfaces.",
    status: "Hardware Not Yet Validated",
    published: publication,
    updated: publication,
    readingMinutes: 7,
    disclaimer: "Conceptual configuration only. It is not flight validated; dimensions and performance are not finalized and remain subject to aerodynamic, structural, environmental, and propulsion testing.",
    topics: ["Coastal observation", "Repairability", "Materials", "Payload"],
    sections: [
      {
        id: "environment",
        title: "The environment changes the design",
        paragraphs: [
          "Salt aerosol, humidity, spray, ultraviolet exposure, sand, and repeated assembly can degrade fasteners, connectors, conductive surfaces, adhesives, and bearings. A coastal airframe therefore needs corrosion-aware material pairs, drainage, inspectable seals, replaceable sacrificial parts, and maintenance intervals based on exposure.",
        ],
      },
      {
        id: "modularity",
        title: "Repairable by classification",
        bullets: [
          "Replaceable non-critical outer panels and access covers.",
          "A protected, ventilated avionics bay separated from wet payload interfaces.",
          "Keyed modular payload connectors with power limits and interface documentation.",
          "New or validated primary structural members and safety-critical avionics.",
          "Reclaimed material only where failure consequence and test evidence permit it.",
          "Field-replaceable landing, antenna, and sensor brackets that do not alter primary alignment.",
        ],
      },
      {
        id: "limits",
        title: "Realistic limitations",
        paragraphs: [
          "Environmental protection adds mass and can trap heat. Modular joints add tolerance, stiffness, and inspection problems. A part that is easy to replace may be harder to seal. Corrosion resistance does not make the aircraft suitable for rain or sea spray, and no weather envelope can be stated before material coupons, ingress tests, power-system tests, and flight trials are complete.",
        ],
      },
    ],
    related: ["communications-resilience-coastal-observation", "ground-station-antenna-architecture", "twin-boom-twin-motor-fixed-wing-concept"],
  },
  {
    slug: "2026-engineering-retrospective-january-july",
    title: "2026 Engineering Retrospective: January–July",
    subtitle: "A backfilled development log reconstructed from project files, software milestones, design iterations, and July 2026 engineering notes.",
    summary: "A transparent reconstruction of how ARES ReFlight moved from project scope and software experiments toward a public site and a broader technical research agenda.",
    status: "Retrospective Development Log",
    published: publication,
    updated: publication,
    readingMinutes: 9,
    disclaimer: "This retrospective was compiled in July 2026 from project files, software milestones, design iterations, and engineering notes. It should not be interpreted as proof that each entry was publicly published during the month shown.",
    topics: ["Retrospective", "Milestones", "Evidence", "Roadmap"],
    sections: [
      {
        id: "january",
        title: "January 2026 · Scope and workstreams",
        paragraphs: [
          "The reconstructed project narrative begins with a mission concept and the separation of software, ground-station, and air-vehicle workstreams. Early fixed-wing configurations were explored as concepts rather than selected designs.",
        ],
        callout: "Documentation reconstructed from July 2026 notes; no contemporaneous public January release record is claimed.",
      },
      {
        id: "february",
        title: "February 2026 · Telemetry interface concepts",
        paragraphs: [
          "Early dashboard architecture, MAVLink experiments, and data-display ideas form the second reconstructed period. The present repository confirms the resulting telemetry model, but not a public February publication date.",
        ],
      },
      {
        id: "march",
        title: "March 2026 · Discovery, mock data, and replay",
        paragraphs: [
          "Endpoint discovery, mock telemetry, replay, diagnostics, and visible connection-state work are grouped here as a reconstructed development phase. These capabilities are present in the current software record.",
        ],
      },
      {
        id: "april",
        title: "April 2026 · Simulation safety boundary",
        paragraphs: [
          "The command architecture evolved around local SITL only: approved ports, localhost resolution, a current heartbeat, fixed-wing and ArduPilot validation, and explicit Simulation Control Mode. Replay remained command-disabled.",
        ],
      },
      {
        id: "may",
        title: "May 2026 · Interface refinement",
        paragraphs: [
          "Navigation, telemetry, mission, simulation, settings, visual quality, and screen-resolution checks were separated and refined. Current project files document supported desktop sizes and bounded rendering behavior; the month assignment remains retrospective.",
        ],
      },
      {
        id: "june",
        title: "June 2026 · SITL mission and documentation",
        paragraphs: [
          "The development history records successful local SITL telemetry and an operator-observed waypoint mission, followed by stability improvements and technical documentation. Fixed-wing airframe concepts continued as studies, not completed hardware.",
        ],
        callout: "The SITL mission is simulation evidence. No physical aircraft flight is implied.",
      },
      {
        id: "july",
        title: "July 2026 · Public website and journal",
        paragraphs: [
          "The public website repository began on 19 July, mobile responsiveness was committed on 20 July, and this engineering journal was compiled on 22 July. July also records the expanded ground-station antenna concept, the embedded-compute versus telemetry-centric trade study, the coastal communications-resilience strategy, and the engineering-transparency policy.",
        ],
      },
      {
        id: "interpretation",
        title: "How to interpret the record",
        paragraphs: [
          "The monthly headings are organizational aids, not fabricated archive dates. Where the project lacks a timestamped contemporaneous record, the text states that the documentation was reconstructed. Future entries should be published with explicit creation and revision dates so later retrospectives can rely on primary evidence rather than memory.",
        ],
      },
    ],
    related: ["stabilizing-ares-01-telemetry-pipeline", "modular-coastal-observation-airframe", "where-uas-could-help-after-earthquakes-and-extreme-rainfall"],
  },
  {
    slug: "where-uas-could-help-after-earthquakes-and-extreme-rainfall",
    title: "Where an Uncrewed Aircraft System Could Help After Earthquakes and Extreme Rainfall",
    subtitle: "A scenario-based assessment inspired by the 6 February Türkiye–Syria earthquakes, the June 2026 Venezuela earthquakes, and July 2026 torrential rainfall and flooding in China.",
    summary: "An objective assessment of potential observation, mapping, and communications roles—alongside the operational, legal, weather, sensing, and humanitarian limits that could make deployment inappropriate.",
    status: "Concept Study",
    published: publication,
    updated: publication,
    readingMinutes: 22,
    disclaimer: "ARES ReFlight did not participate in the events discussed in this article. The following analysis is a scenario-based engineering study intended to identify possible applications, operational constraints, and research priorities.",
    topics: ["Disaster response", "Earthquakes", "Flooding", "Humanitarian engineering"],
    sections: [
      {
        id: "method",
        title: "Method: facts, proposals, and inferences are different",
        paragraphs: [
          "This study uses documented disaster conditions as scenario inputs. It does not use those events as evidence that ARES would have worked. Each proposed role remains an engineering inference until the aircraft, payload, operating procedure, legal approval, trained team, and field performance have been validated together.",
          "The analysis deliberately avoids casualty figures. It focuses on infrastructure disruption, access constraints, environmental hazards, and coordination needs supported by named sources. Communities affected by disasters are not marketing examples; they are people whose safety, privacy, and authority must shape any data-collection plan.",
        ],
      },
      {
        id: "turkiye-syria",
        title: "Case study: 6 February Türkiye–Syria earthquakes",
        paragraphs: [
          "USGS documents a magnitude 7.8 earthquake near the Türkiye–Syria border on 6 February 2023, followed by a magnitude 7.5 event about nine hours later. UNDP later described widespread building destruction, displacement, and disrupted essential services in southern Türkiye. United Nations reporting for northwest Syria documented damaged health facilities and constrained hospital capacity. These conditions illustrate how roads, communications, electrical infrastructure, hospitals, airports, residential buildings, and coordination networks can be affected at the same time.",
          "A fixed-wing observation system could potentially survey broad districts, identify visible road blockages, compare post-event imagery with prior maps, and flag access routes for review before ground movement. Repeated, georeferenced mapping might help planners track debris clearance and changes in temporary access. The output would remain a planning layer, not a structural safety determination.",
          "An airborne relay could extend line of sight between separated teams when terrestrial infrastructure is damaged, but it would require compatible radios, spectrum authority, coverage modeling, encryption and privacy decisions, trained operators, and measured link performance. ARES has none of that field evidence today.",
          "A thermal payload might identify heat sources under suitable conditions, but heat is not proof of a living person. Sun-warmed materials, fires, machinery, animals, insulation, dust, rain, smoke, depth, and viewing angle can confuse interpretation. Any thermal indication would require confirmation by trained ground teams.",
        ],
        bullets: [
          "Potential observation: blocked roads, isolated communities, damaged corridors, temporary camps, queues, and visible supply-route constraints.",
          "Potential mapping: post-event orthomosaics, change detection, visible collapse indicators, and debris distribution.",
          "Limits: dust, smoke, rain, darkness, thermal ambiguity, battery capacity, restricted airspace, launch-site access, and collision risk.",
          "Coordination: helicopters, crewed rescue aircraft, multiple drones, temporary flight restrictions, spectrum congestion, identification, and a single command authority.",
        ],
        callout: "A UAV can improve situational awareness, but it cannot replace trained urban search-and-rescue teams, structural engineers, medical responders, rescue dogs, heavy equipment, or local knowledge.",
      },
      {
        id: "venezuela",
        title: "Case study: June 2026 Venezuela earthquakes",
        paragraphs: [
          "USGS reports that magnitude 7.2 and 7.5 earthquakes occurred in northern Venezuela west of Caracas on 24 June 2026. Its preliminary remote assessment identified landslide impacts, possible road obstruction, potentially isolated communities, and areas where cloud cover or unavailable imagery prevented assessment. UNICEF issued an earthquake-response situation report the following day, confirming a developing humanitarian context without making ARES part of that response.",
          "For a scenario in northern Venezuela, potential ARES roles include surveying landslide corridors from a safe standoff, locating visible road blockage, and helping analysts compare alternative access routes. Coastal observation might cover piers, shoreline roads, port approaches, and settlements that are difficult to reach from inland routes. Repeated mapping could document aftershocks, secondary slope movement, road clearance, and recovery progress.",
          "A communications relay might connect separated field teams across a line-of-sight gap, but mountainous terrain can shadow radios and GNSS-assisted pointing cannot remove terrain blockage. Tropical weather, cloud, wind, and rain can reduce camera performance or ground the aircraft. Landslide zones may continue moving, and a safe launch or recovery site may not exist.",
        ],
        bullets: [
          "Potential infrastructure observation: bridges, utility corridors, transmission lines, public buildings, ports, and inaccessible mountain roads.",
          "Required coordination: local aviation approval, emergency command authority, spectrum management, and ground-team confirmation.",
          "External dependencies: satellite or terrestrial communications may still be required beyond the aircraft link.",
          "No claim: autonomous survivor detection is not an established ARES capability.",
        ],
      },
      {
        id: "china",
        title: "Case study: July 2026 torrential rains and flooding in China",
        paragraphs: [
          "Chinese government emergency reporting in July 2026 described rain-triggered floods, landslides, house damage, river and reservoir concerns, urban waterlogging, disrupted roads and public services, large-scale evacuations, and emergency responses across multiple regions. The environment was dynamic: rainfall, typhoons, flash-flood warnings, geological hazards, and changing river conditions affected wide areas at different times.",
          "After conditions become safe enough to fly, an observation aircraft might map flood extent, identify visibly inundated roads and neighborhoods, and repeat routes to document change. River-channel imagery could help analysts notice debris accumulation, overflow indicators, or erosion for professional review, but it cannot replace gauges, hydrological models, dam instrumentation, or on-site engineering inspection.",
          "Road and slope observation could support evacuation-route assessment by showing dry corridors, bridge approaches, and visible secondary movement. Any recommendation would remain with local authorities. An airborne relay or low-power position-broadcasting experiment would require separate authorization and validated coverage; an illumination payload would add energy, mass, glare, safety, and privacy issues and is not a current ARES capability.",
        ],
        bullets: [
          "Potential post-rain documentation: agricultural damage, road erosion, housing damage, and interrupted utility corridors.",
          "Critical limits: heavy rain, water ingress, low visibility, gusts, fog, spray, cloud, RF degradation, GNSS uncertainty, and unsafe recovery surfaces.",
          "Operational principle: a delayed flight can be safer and more informative than an aircraft launched into the peak hazard.",
        ],
        callout: "In the most severe part of a storm, the correct operational decision may be not to fly.",
      },
      {
        id: "capability-matrix",
        title: "Objective capability matrix",
        table: {
          headers: ["Task", "Potential value", "Required payload", "Main limitation", "Validation status"],
          rows: [
            ["Wide-area visual mapping", "High", "Georeferenced RGB camera", "Weather, airspace, accuracy, and processing", "Software simulated; hardware integration required"],
            ["Thermal observation", "Mission-dependent", "Validated thermal camera", "Ambiguous signatures and environmental effects", "Concept only"],
            ["Road-access assessment", "High", "RGB camera and mapping workflow", "Imagery cannot certify structural safety", "Field testing required"],
            ["Flood-boundary mapping", "High", "RGB camera, positioning, mapping tools", "Rapid change, rain, cloud, and recovery risk", "Hardware integration required"],
            ["Coastal observation", "Moderate", "RGB or mission-specific sensor", "Wind, corrosion, line of sight, and regulation", "Concept only"],
            ["Communications relay", "Mission-dependent", "Compatible authorized relay payload", "Unvalidated RF performance and spectrum coordination", "Not currently supported"],
            ["Repeated change detection", "High", "Repeatable route, calibrated imagery, processing", "Registration error and changing conditions", "Software simulated; field testing required"],
            ["Infrastructure inspection", "Moderate", "Task-specific camera or sensor", "Requires qualified human interpretation", "Hardware integration required"],
            ["Survivor localization", "Limited", "Validated multimodal sensors and trained operators", "Highly uncertain without context and ground confirmation", "Not currently supported"],
            ["Supply delivery", "Limited", "Validated payload and release system", "Release safety, performance, authorization, and ground risk", "Not currently supported"],
          ],
        },
        paragraphs: [
          "Survivor localization is limited and highly uncertain without validated sensors, trained operators, environmental context, and confirmation by ground teams.",
          "Supply delivery is not a current primary ARES capability unless payload, release safety, flight performance, and authorization are separately validated.",
        ],
      },
      {
        id: "cannot-solve",
        title: "What ARES Cannot Solve",
        paragraphs: [
          "Responsible engineering includes knowing when not to deploy a system. ARES cannot safely fly in every weather condition, see through all collapsed structures, confirm life from imagery alone, replace rescue teams, guarantee continuous communications, or operate without legal and airspace coordination.",
        ],
        bullets: [
          "It cannot provide unlimited endurance or guaranteed immunity to electromagnetic interference.",
          "It cannot remove debris, deliver medical treatment, or make humanitarian decisions independently.",
          "It cannot substitute for local knowledge or turn incomplete sensor data into certainty.",
          "It cannot make unsafe airspace, an unsuitable launch site, or severe weather acceptable through software alone.",
        ],
      },
      {
        id: "conclusion",
        title: "A narrower engineering question",
        paragraphs: [
          "ARES ReFlight is not presented as a completed answer to disasters. It is an evolving engineering effort built around a narrower question: can a carefully designed fixed-wing uncrewed system improve situational awareness and communications when conventional infrastructure is damaged?",
          "The answer cannot come from branding, simulation, or confidence alone. It must come from testing, cooperation with responders, regulatory approval, documented limitations, and evidence gathered under realistic conditions.",
          "Until then, the project will continue to publish both its ambitions and its uncertainties.",
        ],
        callout: "Review the concept. Challenge the assumptions. Suggest a better approach.",
      },
    ],
    sources: [
      {
        organization: "U.S. Geological Survey",
        title: "Frequently Asked Questions about 2023 Earthquakes in Türkiye",
        publicationDate: "6 March 2023",
        accessedDate: "22 July 2026",
        url: "https://www.usgs.gov/programs/earthquake-hazards/science/frequently-asked-questions-about-2023-earthquakes-turkiye",
        supports: "Magnitude, timing, sequence, and geographic context of the 6 February 2023 earthquakes.",
      },
      {
        organization: "United Nations Development Programme",
        title: "Six months after the earthquakes in Türkiye",
        publicationDate: "8 August 2023",
        accessedDate: "22 July 2026",
        url: "https://www.undp.org/turkiye/publications/Six-months-after-the-earthquakes-in-Turkiye",
        supports: "Building destruction, displacement, and disruption of essential services in southern Türkiye.",
      },
      {
        organization: "United Nations Office for the Coordination of Humanitarian Affairs",
        title: "2023 First Reserve Allocation - Strategy",
        publicationDate: "21 February 2023 (allocation launch date)",
        accessedDate: "22 July 2026",
        url: "https://onegms.unocha.org/pubdocs/Allocationsdocs/TUR-AllocDocs_2023_460_737.pdf",
        supports: "Damage to health facilities, constrained hospital capacity, power and service disruption in northwest Syria.",
      },
      {
        organization: "U.S. Geological Survey",
        title: "2026 Venezuela Sequence Earthquake-Triggered Landslide Hazards",
        publicationDate: "29 June 2026",
        accessedDate: "22 July 2026",
        url: "https://www.usgs.gov/programs/landslide-hazards/science/2026-venezuela-sequence-earthquake-triggered-landslide-hazards",
        supports: "Earthquake magnitudes and preliminary landslide, road-obstruction, isolated-community, terrain, and imagery constraints.",
      },
      {
        organization: "UNICEF",
        title: "Venezuela Humanitarian Situation Report No.1 (Earthquake Response)",
        publicationDate: "25 June 2026",
        accessedDate: "22 July 2026",
        url: "https://www.unicef.org/documents/venezuela-humanitarian-situation-report-no1-earthquake-response-25-june-2026",
        supports: "The developing humanitarian-response context following the June 2026 Venezuela earthquakes.",
      },
      {
        organization: "The State Council of the People's Republic of China",
        title: "China allocates 160 mln yuan for disaster relief",
        publicationDate: "7 July 2026",
        accessedDate: "22 July 2026",
        url: "https://english.www.gov.cn/news/202607/07/content_WS6a4c5f31c6d00ca5f9a0c0e9.html",
        supports: "Rain-triggered floods, house collapses, river flooding, geological hazards, urban waterlogging, and relief activity across multiple regions.",
      },
      {
        organization: "The State Council of the People's Republic of China",
        title: "China steps up flood control, disaster relief efforts as Typhoon Bavi moves inland",
        publicationDate: "13 July 2026",
        accessedDate: "22 July 2026",
        url: "https://english.www.gov.cn/news/202607/13/content_WS6a544dafc6d00ca5f9a0c25a.html",
        supports: "Heavy rainfall, evacuations, roads and public-service damage, reservoirs, flash floods, geological hazards, and urban waterlogging.",
      },
      {
        organization: "The State Council of the People's Republic of China",
        title: "China activates emergency response for rainstorm-hit Liaoning",
        publicationDate: "14 July 2026",
        accessedDate: "22 July 2026",
        url: "https://english.www.gov.cn/news/202607/14/content_WS6a561f02c6d00ca5f9a0c2e3.html",
        supports: "Rainstorm and flood emergency response, assessment teams, and large-scale precautionary relocation in Liaoning.",
      },
    ],
    related: ["communications-resilience-coastal-observation", "embedded-compute-ares-variant", "2026-engineering-retrospective-january-july"],
  },
];

export function getEngineeringArticle(slug: string) {
  return engineeringArticles.find((article) => article.slug === slug);
}

export function articleText(article: EngineeringArticle): string {
  const sections = article.sections.flatMap((section) => [
    section.title,
    ...(section.paragraphs ?? []),
    ...(section.bullets ?? []),
    ...(section.table?.rows.flat() ?? []),
    ...(section.callout ? [section.callout] : []),
  ]);
  return [article.title, article.subtitle, article.summary, article.disclaimer, ...sections].join("\n\n");
}
