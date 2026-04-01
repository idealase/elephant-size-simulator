# elephant-size-simulator

## Quick Reference
- **Build**: `npm run build` (`tsc -b && vite build`)
- **Test**: `npm test` (Vitest)
- **Test watch**: `npm run test:watch`
- **Lint**: `npm run lint` (ESLint)
- **Dev server**: `npm run dev` → http://localhost:5173
- **Deploy**: Push to `main` → GitHub Actions (`pages.yml`) builds, tests, and deploys to GitHub Pages

## Architecture
Elephant scaling simulator — biomechanical model exploring elephant size limits.

```
/src/
  /sim/                 → Pure simulation engine (no React imports)
    engine.ts           → Physics calculations (scaling laws, cardiovascular stress)
    engine.test.ts      → Unit tests for engine
    types.ts            → Type definitions
    failureModes.ts     → Failure condition definitions
    simDefaults.ts      → Default parameter values
    index.ts            → Barrel exports
  /components/          → React UI components
    ElephantCanvas.tsx  → Canvas-based elephant visualization
    Controls.tsx        → Parameter adjustment controls
    EatingIndicator.tsx → Feeding/metabolism display (unique to elephant sim)
    FailureReport.tsx   → Failure mode display
    FunFactsPanel.tsx   → Educational facts
    HeartPressureGauge.tsx → Cardiovascular pressure gauge (unique to elephant sim)
    StressChart.tsx     → Stress metrics chart
    ViabilityGauge.tsx  → Viability indicator
  /App.tsx              → Main app shell
  /main.tsx             → Entry point
```

## Key Conventions
- **React 19** + TypeScript 5.9 + Vite 7
- **Simulation purity**: All physics in `/sim/` — pure functions, no React imports
- **Canvas rendering**: `ElephantCanvas.tsx` uses HTML Canvas 2D
- **Unique components**: `EatingIndicator` and `HeartPressureGauge` — elephant-specific physiology
- **Test co-location**: `engine.test.ts` alongside `engine.ts` in `/sim/`
- **Vitest with jsdom**: Test environment configured in `vite.config.ts`
- **No README** — this CLAUDE.md is the primary documentation

## Deployment
- **URL**: GitHub Pages at `https://idealase.github.io/elephant-size-simulator/`
- **Base path**: Set dynamically via `VITE_BASE` env var in CI
- **CI**: `pages.yml` — Node 22, runs tests before build, deploys to GitHub Pages
- **Branch**: `main`

## Common Pitfalls
- Base path is set dynamically in CI only — local dev serves at root `/`
- Simulation engine must stay pure — no side effects or React dependencies in `/sim/`
- Canvas coordinate system: y-axis increases downward
- Node 22 in CI (not 20 like older repos)

## Sensitive Files
Do not read, log, or commit: any `.env` files, credentials, secrets.
