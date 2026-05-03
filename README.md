# RevenueLab

Monte Carlo financial modeling for B2B SaaS founders/CFOs. 1000-run simulations of MRR/LTV/CAC/runway with confidence bands.

Part of the [Gapup portfolio](https://gapup.io) — 49 SaaS, single sign-on, single billing.

## Features

- Pure-TypeScript Monte Carlo engine (Box-Muller Gaussian noise)
- 36-month MRR forecast with p10/p50/p90 confidence bands
- LTV:CAC distribution + probabilistic runway
- Live demo at `/demo` (no signup, runs client-side)

## Stack

- Next.js 16 (App Router) · React 19
- No chart library — pure SVG
- No backend deps for the math (lib/monte-carlo.ts is self-contained)

## Dev

```bash
npm install
npm run dev
```

## Deploy

Vercel project linked to `revenue-lab.gapup.io`. Push to `main` triggers prod deploy.
