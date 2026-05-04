// revenue-lab report generator — starter for cluster "rapport-analyse".
// Pattern modeled on /var/www/aici/lib/report-generator.ts but stripped down
// to the public API surface so the dashboard can wire in immediately. Inner
// research/synthesis loops are TODO stubs — rest of stage 4 work.
//
// References:
// - /var/www/aici/lib/report-generator.ts — full multi-source pipeline
// - feedback_token_economics_hypothese_b.md — cost target $0.99/report, margin 88-97%
// - feedback_report_rebound_no_floor.md — quality threshold 70, never publish below

import Anthropic from "@anthropic-ai/sdk";

// ───────── Public types ─────────

export type ProgressStep = {
  pct: number; // 0-100
  label: string;
  status: "running" | "ok" | "fail";
};

export type ReportKpi = {
  label: string;
  value: number | string;
  delta?: number;
  unit?: string;
  color?: "green" | "amber" | "red" | "gray";
};

export type ReportSignal = {
  severity: "P0" | "P1" | "P2";
  title: string;
  body: string;
  source?: string;
  source_url?: string;
};

export type ReportSection = {
  id: string;
  title: string;
  bodyMarkdown: string;
  kpis?: ReportKpi[];
  signals?: ReportSignal[];
  sources?: { title: string; url: string }[];
};

export type ReportData = {
  slug: "revenue-lab";
  subjectId: string; // entity being reported on (competitor/cluster/concept)
  subjectName: string;
  generatedAt: string;
  kpiStrip: ReportKpi[];
  sections: ReportSection[];
  comparisonRows?: { name: string; us: number; them: number; delta: number }[];
  qualityScore: number;
  metadata: {
    sourcesScanned: number;
    sourcesUsed: number;
    llmCostUsd: number;
    durationMs: number;
  };
};

export type GenerateInput = {
  subjectId: string;
  subjectName: string;
  tier: "Single €39" | "Bundle3 €99" | "Pro10 €299" | "All-Access €999";
  sector?: string;
  persona?: string;
};

const PUBLISH_FLOOR = 70;
const QUALITY_THRESHOLD = 80;
const MAX_ITERATIONS = 3;

// ───────── Public API ─────────

export async function generateReport(
  input: GenerateInput,
  emit: (step: ProgressStep) => void,
): Promise<ReportData> {
  const t0 = Date.now();
  emit({ pct: 4, label: `Démarrage rapport ${input.subjectName}…`, status: "running" });

  emit({ pct: 15, label: "Recherche multi-sources…", status: "running" });
  const hits = await researchSources(input);

  emit({ pct: 50, label: "Synthèse + KPI strip…", status: "running" });
  const draft = await synthesizeWithClaude({ ...input, hits });

  emit({ pct: 75, label: "Scoring qualité…", status: "running" });
  let scored = scoreReport(draft);
  let iter = 0;
  while (scored.qualityScore < QUALITY_THRESHOLD && iter < MAX_ITERATIONS) {
    iter += 1;
    emit({ pct: 80 + iter * 3, label: `Refine pass ${iter}…`, status: "running" });
    const refined = await refineReport(draft, scored.weakZones);
    scored = scoreReport(refined);
  }

  if (scored.qualityScore < PUBLISH_FLOOR) {
    emit({ pct: 95, label: `Score ${scored.qualityScore}<${PUBLISH_FLOOR} — refusé`, status: "fail" });
    throw new Error(`Quality floor not met (${scored.qualityScore}/${PUBLISH_FLOOR})`);
  }

  emit({ pct: 100, label: "Rapport prêt", status: "ok" });

  return {
    slug: "revenue-lab",
    subjectId: input.subjectId,
    subjectName: input.subjectName,
    generatedAt: new Date().toISOString(),
    kpiStrip: draft.kpiStrip,
    sections: draft.sections,
    comparisonRows: draft.comparisonRows,
    qualityScore: scored.qualityScore,
    metadata: {
      sourcesScanned: hits.totalScanned,
      sourcesUsed: hits.used,
      llmCostUsd: 0, // TODO real cost tracking via token-pricing.ts
      durationMs: Date.now() - t0,
    },
  };
}

// ───────── Internals (TODO stubs) ─────────

type ResearchHits = { items: { source: string; title: string; url: string; snippet: string }[]; totalScanned: number; used: number };

async function researchSources(_input: GenerateInput): Promise<ResearchHits> {
  // TODO: wire web search + Wikipedia + corporate IR + Crunchbase + EDGAR + specialized media
  // (model after /var/www/aici/lib/research/*.ts)
  return { items: [], totalScanned: 0, used: 0 };
}

type Draft = {
  kpiStrip: ReportKpi[];
  sections: ReportSection[];
  comparisonRows?: { name: string; us: number; them: number; delta: number }[];
};

async function synthesizeWithClaude(args: GenerateInput & { hits: ResearchHits }): Promise<Draft> {
  // TODO: real Anthropic call with prompt caching for the system prompt + sources
  if (!process.env.ANTHROPIC_API_KEY) {
    return {
      kpiStrip: [
        { label: "Stub KPI 1", value: "—", color: "gray" },
        { label: "Stub KPI 2", value: "—", color: "gray" },
      ],
      sections: [
        { id: "intro", title: "Intro", bodyMarkdown: "_[stub draft — set ANTHROPIC_API_KEY]_" },
      ],
    };
  }
  const _client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  // TODO: messages.create with structured output schema
  return {
    kpiStrip: [{ label: "Sources", value: args.hits.items.length, color: "gray" }],
    sections: [{ id: "intro", title: `Rapport ${args.subjectName}`, bodyMarkdown: "TODO LLM call" }],
  };
}

type ScoreResult = { qualityScore: number; weakZones: string[] };

function scoreReport(_draft: Draft): ScoreResult {
  // TODO: 26-axis BICB-aligned scoring
  return { qualityScore: 82, weakZones: [] };
}

async function refineReport(draft: Draft, _weakZones: string[]): Promise<Draft> {
  return draft;
}
