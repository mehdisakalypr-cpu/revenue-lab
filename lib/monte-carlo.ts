/**
 * Monte Carlo SaaS revenue simulation engine — pure TypeScript, no deps.
 *
 * Models monthly MRR over 36 months given baseline financial parameters,
 * applying Gaussian (Box-Muller) noise to each input across N runs.
 *
 * Output: confidence bands p10/p50/p90, LTV:CAC distribution, runway estimate.
 */

export interface SimulationParams {
  initialMrr: number; // €/mo at month 0
  arpu: number; // €/mo per customer
  monthlyAcquisitions: number; // new customers per month (baseline)
  cac: number; // € customer acquisition cost
  churnRatePct: number; // monthly % (e.g. 4 = 4%/mo)
  expansionRevenuePct: number; // monthly % expansion (e.g. 1.5)
  startingCash: number; // € cash on hand
  monthlyBurn: number; // € fixed costs/mo (excl. CAC)
  noiseSigmaPct?: number; // gaussian σ as % of mean (default 15%)
}

export interface SimulationResult {
  monthlyMrr: { p10: number[]; p50: number[]; p90: number[] }; // length 36
  finalMrrDistribution: number[]; // sorted, length = nRuns
  ltvCac: { p10: number; p50: number; p90: number };
  runwayMonths: { p10: number; p50: number; p90: number };
  cumulativeCustomers: { p10: number[]; p50: number[]; p90: number[] };
  meta: { nRuns: number; horizonMonths: number };
}

const HORIZON_MONTHS = 36;

// Box-Muller transform: produce standard normal N(0,1) sample
function gaussian(): number {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

// Apply gaussian noise around mean with given sigma fraction; clamped >= 0
function noisy(mean: number, sigmaPct: number): number {
  const v = mean * (1 + (gaussian() * sigmaPct) / 100);
  return v < 0 ? 0 : v;
}

function percentile(sortedAsc: number[], p: number): number {
  if (sortedAsc.length === 0) return 0;
  const idx = Math.min(sortedAsc.length - 1, Math.max(0, Math.floor((p / 100) * sortedAsc.length)));
  return sortedAsc[idx];
}

export function simulate(params: SimulationParams, nRuns = 1000): SimulationResult {
  const sigma = params.noiseSigmaPct ?? 15;
  const horizon = HORIZON_MONTHS;

  // mrr[run][month] and customers[run][month]
  const mrrRuns: number[][] = Array.from({ length: nRuns }, () => new Array(horizon).fill(0));
  const custRuns: number[][] = Array.from({ length: nRuns }, () => new Array(horizon).fill(0));
  const ltvCacRuns: number[] = new Array(nRuns).fill(0);
  const runwayRuns: number[] = new Array(nRuns).fill(0);

  for (let r = 0; r < nRuns; r++) {
    let mrr = params.initialMrr;
    let customers = params.arpu > 0 ? params.initialMrr / params.arpu : 0;
    let cash = params.startingCash;
    let runwayHit = -1;

    // Per-run noisy parameters (drawn once per run)
    const arpuRun = noisy(params.arpu, sigma);
    const cacRun = noisy(params.cac, sigma);
    const baseChurn = noisy(params.churnRatePct, sigma);
    const baseExpansion = noisy(params.expansionRevenuePct, sigma);
    const baseAcquisitions = noisy(params.monthlyAcquisitions, sigma);

    // Per-month process: new acquisitions, churn, expansion, cash
    for (let m = 0; m < horizon; m++) {
      const newCustomers = noisy(baseAcquisitions, sigma / 2); // smaller intra-month noise
      const churnedCustomers = customers * (baseChurn / 100);
      customers = customers + newCustomers - churnedCustomers;
      if (customers < 0) customers = 0;

      const baseRevenue = customers * arpuRun;
      const expansion = baseRevenue * (baseExpansion / 100);
      mrr = baseRevenue + expansion;

      const cacSpend = newCustomers * cacRun;
      const monthBurn = noisy(params.monthlyBurn, sigma / 2);
      cash = cash + mrr - cacSpend - monthBurn;
      if (cash < 0 && runwayHit === -1) runwayHit = m + 1; // months until cash hits 0

      mrrRuns[r][m] = mrr;
      custRuns[r][m] = customers;
    }

    // LTV:CAC : LTV = ARPU / monthly churn rate; CAC as drawn
    const ltv = baseChurn > 0 ? arpuRun / (baseChurn / 100) : arpuRun * 100;
    ltvCacRuns[r] = cacRun > 0 ? ltv / cacRun : 0;
    runwayRuns[r] = runwayHit === -1 ? horizon : runwayHit;
  }

  // Aggregate per-month percentiles
  function bandsForMonth(month: number, runs: number[][]): { p10: number; p50: number; p90: number } {
    const sorted = runs.map((r) => r[month]).sort((a, b) => a - b);
    return { p10: percentile(sorted, 10), p50: percentile(sorted, 50), p90: percentile(sorted, 90) };
  }

  const mrrP10 = new Array(horizon).fill(0);
  const mrrP50 = new Array(horizon).fill(0);
  const mrrP90 = new Array(horizon).fill(0);
  const custP10 = new Array(horizon).fill(0);
  const custP50 = new Array(horizon).fill(0);
  const custP90 = new Array(horizon).fill(0);

  for (let m = 0; m < horizon; m++) {
    const mrrBand = bandsForMonth(m, mrrRuns);
    mrrP10[m] = mrrBand.p10;
    mrrP50[m] = mrrBand.p50;
    mrrP90[m] = mrrBand.p90;
    const custBand = bandsForMonth(m, custRuns);
    custP10[m] = custBand.p10;
    custP50[m] = custBand.p50;
    custP90[m] = custBand.p90;
  }

  const finalMrrSorted = mrrRuns.map((r) => r[horizon - 1]).sort((a, b) => a - b);
  const ltvCacSorted = [...ltvCacRuns].sort((a, b) => a - b);
  const runwaySorted = [...runwayRuns].sort((a, b) => a - b);

  return {
    monthlyMrr: { p10: mrrP10, p50: mrrP50, p90: mrrP90 },
    finalMrrDistribution: finalMrrSorted,
    ltvCac: {
      p10: percentile(ltvCacSorted, 10),
      p50: percentile(ltvCacSorted, 50),
      p90: percentile(ltvCacSorted, 90),
    },
    runwayMonths: {
      p10: percentile(runwaySorted, 10),
      p50: percentile(runwaySorted, 50),
      p90: percentile(runwaySorted, 90),
    },
    cumulativeCustomers: { p10: custP10, p50: custP50, p90: custP90 },
    meta: { nRuns, horizonMonths: horizon },
  };
}
