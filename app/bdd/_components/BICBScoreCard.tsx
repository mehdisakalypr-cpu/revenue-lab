"use client";

// BICBScoreCard — radar of the 26 SMES categories with three series:
//   - Notre SaaS (gold)
//   - BICB moyenne (primary)
//   - BICB top      (success)
//
// Uses Recharts' RadarChart. Recharts must be installed in the target SaaS
// (already standard across the portfolio).

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import {
  BRAND,
  BICBSaaSBaseline,
  relativeScoreToColor,
} from "./_bdd-types";

interface Props {
  baseline: BICBSaaSBaseline;
}

interface RadarPoint {
  category: string;
  ours: number;
  bicbAvg: number;
  bicbTop: number;
  fullName: string;
}

/** Abbreviate long category names so the radar axis stays legible. */
function abbreviate(name: string, max = 14): string {
  if (name.length <= max) return name;
  return `${name.slice(0, max - 1)}…`;
}

export default function BICBScoreCard({ baseline }: Props) {
  const data: RadarPoint[] = baseline.categoryScores.map((c) => ({
    category: abbreviate(c.name),
    fullName: c.name,
    ours: c.ourScore,
    bicbAvg: Number(c.bicbAvg.toFixed(2)),
    bicbTop: Number(c.bicbTop.toFixed(2)),
  }));

  const relativeColor = relativeScoreToColor(baseline.relativeScore);
  const relativeLabel =
    baseline.relativeScore >= 100
      ? "à parité ou au-dessus de la BICB"
      : baseline.relativeScore >= 90
        ? "dans la zone gold (≥90%)"
        : baseline.relativeScore >= 70
          ? "à rattraper (70-90%)"
          : "loin de la BICB (<70%)";

  return (
    <section
      aria-labelledby="bicb-score-title"
      style={{
        background: BRAND.surface,
        border: `1px solid ${BRAND.border}`,
        borderRadius: 16,
        padding: 24,
        fontFamily: BRAND.fontFamily,
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: 12,
        }}
      >
        <div>
          <h2
            id="bicb-score-title"
            style={{ margin: 0, fontSize: 22, fontWeight: 700, color: BRAND.text }}
          >
            Score SMES 26 dimensions{" "}
            <span style={{ color: BRAND.gold }}>vs Best-In-Class</span>
          </h2>
          <p style={{ margin: "6px 0 0", fontSize: 13, color: BRAND.textDim }}>
            Notre SaaS face à {baseline.competitors.length || 0} concurrents
            BICB · mis à jour le {baseline.generatedAt}
          </p>
        </div>
        <div
          style={{
            background: BRAND.bg,
            border: `1px solid ${relativeColor}`,
            borderRadius: 12,
            padding: "10px 16px",
            textAlign: "right",
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: BRAND.textSecondary,
              textTransform: "uppercase",
              letterSpacing: 1,
              fontWeight: 600,
            }}
          >
            Score relatif
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: relativeColor,
              lineHeight: 1,
              marginTop: 4,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {Math.round(baseline.relativeScore)}%
          </div>
          <div style={{ fontSize: 11, color: BRAND.textDim, marginTop: 4 }}>
            {relativeLabel}
          </div>
        </div>
      </header>

      <div style={{ width: "100%", height: 460 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            cx="50%"
            cy="50%"
            outerRadius="75%"
            data={data}
          >
            <PolarGrid stroke={BRAND.border} />
            <PolarAngleAxis
              dataKey="category"
              tick={{ fill: BRAND.textDim, fontSize: 10 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 3]}
              tick={{ fill: BRAND.textSecondary, fontSize: 10 }}
              stroke={BRAND.border}
            />
            <Tooltip
              contentStyle={{
                background: BRAND.bg,
                border: `1px solid ${BRAND.border}`,
                color: BRAND.text,
                fontSize: 12,
                borderRadius: 8,
              }}
              labelFormatter={(_label: unknown, payload: ReadonlyArray<{ payload?: RadarPoint }>) => {
                const p = payload?.[0]?.payload;
                return p ? p.fullName : "";
              }}
            />
            <Legend
              wrapperStyle={{
                color: BRAND.textDim,
                fontSize: 12,
              }}
            />
            <Radar
              name="BICB top"
              dataKey="bicbTop"
              stroke={BRAND.success}
              fill={BRAND.success}
              fillOpacity={0.15}
            />
            <Radar
              name="BICB moyenne"
              dataKey="bicbAvg"
              stroke={BRAND.primary}
              fill={BRAND.primary}
              fillOpacity={0.20}
            />
            <Radar
              name="Notre SaaS"
              dataKey="ours"
              stroke={BRAND.gold}
              fill={BRAND.gold}
              fillOpacity={0.30}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <footer
        style={{
          marginTop: 8,
          fontSize: 11,
          color: BRAND.textSecondary,
        }}
      >
        Échelle : 0 = absent · 1 = partiel · 2 = solide · 3 = best-in-class.
      </footer>
    </section>
  );
}
