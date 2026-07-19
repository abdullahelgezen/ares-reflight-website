# ARES ReFlight Website

Production-ready editorial website for the ARES ReFlight modular fixed-wing UAV ecosystem. The web application is intentionally isolated from the Windows desktop simulation application in the repository root.

## Run locally

Requirements: Node.js 20.9 or newer and pnpm (recommended) or npm.

```powershell
cd website
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Production build

```powershell
pnpm lint
pnpm build
pnpm start
```

## Deploy to Vercel

1. Import the repository into Vercel.
2. Set **Root Directory** to `website`.
3. Keep the detected framework preset as **Next.js**.
4. Deploy. No environment variables or paid services are required.

Before publishing, replace generic GitHub, LinkedIn, and email destinations with verified project accounts, and update `metadataBase`, `sitemap.ts`, and `robots.ts` if the production domain differs from `ares-reflight.vercel.app`.

## Content model

Project statuses, modules, software capabilities, roadmap items, documentation records, and development posts are centralized in `content/project.ts`. New development entries automatically generate static detail routes under `/development/[slug]`.

## Asset provenance

- `public/images/ares-uav-hero.png` is an original AI-generated conceptual aircraft render. It represents no tested physical aircraft and is labeled accordingly in the interface.
- `public/images/ares-01-operations.png` is a project-local screenshot of the real ARES-01 software operating with simulated telemetry.

## Truth and safety

The site deliberately distinguishes `COMPLETED`, `SIMULATED`, `IN DEVELOPMENT`, `PLANNED`, and `NOT STARTED`. Simulation values are labeled, and no hardware performance or flight validation is claimed.
