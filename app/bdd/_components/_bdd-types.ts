// BDD-SMES (Best-In-Class Benchmark · 26-category SMES) — shared types & constants
// Brand tokens identical to /var/www/aici/app/poc-dataiku/_components/_shared.ts.
// Reused as a portable single file so each rolled-out SaaS keeps a self-contained bundle.

export const BRAND = {
  bg: "#0F0A1F",
  surface: "#1F1535",
  surfaceAlt: "#2A1E4A",
  text: "#FFFFFF",
  textDim: "#D1D5DB",
  textSecondary: "#9CA3AF",
  border: "#374151",
  gold: "#C9A84C",
  goldGradient: "linear-gradient(135deg, #C9A84C 0%, #B48E3A 100%)",
  primary: "#7C3AED",
  primaryGradient: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)",
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#06B6D4",
  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
} as const;

// ────────────────────────────────────────────────────────────────────────────
// 26-category SMES (Strategic & Marketing Excellence Score)
// 1-10  : Output / Technical / Product surface
// 11    : Analytics baseline
// 12-26 : McKinsey-style strategic dimensions
// ────────────────────────────────────────────────────────────────────────────

export type SMESGroup =
  | "UX"
  | "Output"
  | "Commercial"
  | "Technical"
  | "Support"
  | "International";

export interface SMESCategory {
  id: number; // 1-26
  name: string;
  group: SMESGroup;
}

export const SMES_CATEGORIES_26: readonly SMESCategory[] = [
  // 1-10 Technical / Output
  { id: 1, name: "UI custom", group: "UX" },
  { id: 2, name: "Data citée", group: "Output" },
  { id: 3, name: "Report", group: "Output" },
  { id: 4, name: "Multi-export", group: "Output" },
  { id: 5, name: "Notifications", group: "UX" },
  { id: 6, name: "i18n", group: "International" },
  { id: 7, name: "Onboarding", group: "UX" },
  { id: 8, name: "Integrations", group: "Technical" },
  { id: 9, name: "Quality", group: "Technical" },
  { id: 10, name: "Compliance", group: "Support" },
  // 11 Analytics baseline
  { id: 11, name: "Analytique base", group: "Technical" },
  // 12-26 McKinsey-style strategic dimensions
  { id: 12, name: "Customer / JTBD", group: "Commercial" },
  { id: 13, name: "Financial", group: "Commercial" },
  { id: 14, name: "Org / talent", group: "Support" },
  { id: 15, name: "Partnerships", group: "Commercial" },
  { id: 16, name: "Product", group: "Output" },
  { id: 17, name: "IP / moat", group: "Technical" },
  { id: 18, name: "Thought leadership", group: "Commercial" },
  { id: 19, name: "Frameworks", group: "Technical" },
  { id: 20, name: "Disruption / risks", group: "Support" },
  { id: 21, name: "Stock / analyst", group: "Commercial" },
  { id: 22, name: "Customer voice", group: "Commercial" },
  { id: 23, name: "M&A", group: "Commercial" },
  { id: 24, name: "Stakeholders", group: "Support" },
  { id: 25, name: "Scenarios", group: "Output" },
  { id: 26, name: "Recommendations", group: "Output" },
] as const;

// ────────────────────────────────────────────────────────────────────────────
// Domain types
// ────────────────────────────────────────────────────────────────────────────

export interface BICBCategoryScore {
  id: number; // 1-26
  name: string;
  group: SMESGroup;
  ourScore: 0 | 1 | 2 | 3;
  bicbAvg: number; // 0-3 with decimals
  bicbTop: number; // 0-3
  gap: number; // ourScore - bicbAvg (negative = behind)
}

export type DeliverableType =
  | "whitepaper"
  | "demo"
  | "pricing"
  | "dashboard"
  | "case-study";

export interface BICBDeliverable {
  label: string;
  url: string;
  type: DeliverableType;
}

export interface BICBCompetitor {
  id: string;
  name: string;
  website: string;
  country: string;
  founded?: number;
  hq?: string;
  /** 2-3 letter initials used by the placeholder logo circle. */
  logoPlaceholder: string;
  /** Length must equal 26; index i = SMES category id (i+1). */
  score26: number[];
  sampleDeliverables: BICBDeliverable[];
}

export interface BestOfEntry {
  categoryId: number; // 1-26
  championName: string;
  evidence: string;
  evidenceUrl: string;
  ourApproach: string;
}

export type RoadmapPriority = "P0" | "P1" | "P2";

export interface RoadmapAction {
  categoryId: number; // 1-26
  priority: RoadmapPriority;
  action: string;
  etaDays: number;
  owner: string;
}

export interface BICBSaaSBaseline {
  slug: string;
  metier: string;
  generatedAt: string; // ISO date
  competitors: BICBCompetitor[];
  categoryScores: BICBCategoryScore[]; // length 26
  bestOf: BestOfEntry[];
  roadmap: RoadmapAction[];
  ourScoreOverall: number; // 0-100
  bicbAverage: number; // 0-100
  bicbTop: number; // 0-100
  /** Convenience metric: ourScoreOverall / bicbAverage * 100. */
  relativeScore: number;
}

// ────────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────────

/** Lookup the SMES category metadata by 1-based id; throws on out-of-range ids
 *  to surface data quality issues at integration-time rather than at render. */
export function getSMESCategory(id: number): SMESCategory {
  const c = SMES_CATEGORIES_26.find((x) => x.id === id);
  if (!c) {
    throw new Error(
      `[bdd-smes] Unknown SMES category id ${id}. Expected 1..26.`,
    );
  }
  return c;
}

/** Map a 0-3 score (or its decimal proxy) to a brand colour for heatmap cells. */
export function scoreToColor(score: number): string {
  if (score <= 0.5) return BRAND.error;
  if (score <= 1.5) return BRAND.warning;
  if (score <= 2.4) return "#A3B635"; // yellow-green bridge
  return BRAND.success;
}

/** Map a 0-3 score to a translucent background usable behind the foreground colour. */
export function scoreToCellBg(score: number): string {
  if (score <= 0.5) return "rgba(239, 68, 68, 0.18)";
  if (score <= 1.5) return "rgba(245, 158, 11, 0.18)";
  if (score <= 2.4) return "rgba(163, 182, 53, 0.20)";
  return "rgba(16, 185, 129, 0.22)";
}

/** Convert a relative score (our/bicbAvg*100) to brand colour as per spec. */
export function relativeScoreToColor(relative: number): string {
  if (relative < 70) return BRAND.error;
  if (relative < 90) return BRAND.warning;
  if (relative <= 100) return BRAND.gold;
  return BRAND.success;
}
