// Empty BDD-SMES baseline — used as the fallback dataset wired into
// `app/poc-template/page.tsx` so the template builds before real BICB
// research is injected.
//
// REPLACEMENT FLOW (run by `scripts/rollout-saas-bdd.sh`):
//   1. Copy this file to <target-saas>/app/bdd/_components/_bdd-data-empty.ts
//   2. Replace `revenue-lab` with the actual SaaS slug
//   3. Replace `EMPTY_BDD_BASELINE` body once the structured baseline.md
//      from `/tmp/bicb-deep/<slug>/bicb-baseline.md` has been parsed.

import {
  BICBSaaSBaseline,
  BICBCategoryScore,
  SMES_CATEGORIES_26,
} from "./_bdd-types";

/** Build 26 placeholder category scores so the radar/grid have valid axes
 *  even before real research data lands. */
function buildEmptyCategoryScores(): BICBCategoryScore[] {
  return SMES_CATEGORIES_26.map((cat) => ({
    id: cat.id,
    name: cat.name,
    group: cat.group,
    ourScore: 0,
    bicbAvg: 0,
    bicbTop: 0,
    gap: 0,
  }));
}

export const EMPTY_BDD_BASELINE: BICBSaaSBaseline = {
  slug: "revenue-lab",
  metier: "À renseigner depuis bicb-baseline.md",
  generatedAt: new Date().toISOString().slice(0, 10),
  competitors: [],
  categoryScores: buildEmptyCategoryScores(),
  bestOf: [],
  roadmap: [],
  ourScoreOverall: 0,
  bicbAverage: 0,
  bicbTop: 0,
  relativeScore: 0,
};
