# ARES ReFlight Website

Editorial website for the independent ARES ReFlight student engineering project. It documents the validated ARES-01 SITL software boundary, conceptual fixed-wing and ground-station studies, public corrections, and development evidence. The web application is intentionally isolated from the Windows desktop simulation application in the repository root.

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

The canonical production domain is `https://aresreflight.com`. Domain deployment and the `hello@aresreflight.com` mailbox must be configured and verified separately. The feedback form only prepares a draft in the visitor's email application; it does not store or submit messages on the website.

## Content model

Project statuses, modules, software capabilities, roadmap items, documentation records, and development posts are centralized in `content/project.ts`. Long-form articles and their source records live in `content/articles.ts`. New entries generate static detail routes under `/development/[slug]` and `/engineering-log/[slug]`.

## Asset provenance

- `public/images/ares-uav-hero.png` is an original AI-generated conceptual aircraft render. It represents no tested physical aircraft and is labeled accordingly in the interface.
- `public/images/ares-01-operations.png` is a project-local screenshot of the real ARES-01 software operating with simulated telemetry.
- `public/og.png` is an original AI-generated social card depicting a conceptual uncrewed research aircraft. It is not a photograph of validated hardware.

## Truth and safety

The site deliberately distinguishes `COMPLETED`, `SIMULATED`, `IN DEVELOPMENT`, `PLANNED`, and `NOT STARTED`. Simulation values are labeled, and no hardware performance or flight validation is claimed.

Public source availability does not imply an open-source license. No license has been selected for this repository at the time of this review.
