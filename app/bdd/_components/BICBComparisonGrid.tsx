"use client";

// BICBComparisonGrid — heatmap table.
// Columns = 26 SMES categories. Rows = each BICB competitor + "Notre SaaS"
// (highlighted, sticky-pinned at the top of the body).

import {
  BRAND,
  BICBSaaSBaseline,
  SMES_CATEGORIES_26,
  scoreToCellBg,
  scoreToColor,
} from "./_bdd-types";

interface Props {
  baseline: BICBSaaSBaseline;
}

interface Row {
  id: string;
  name: string;
  isOurs: boolean;
  scores: number[]; // length 26
}

function buildRows(baseline: BICBSaaSBaseline): Row[] {
  const oursRow: Row = {
    id: "__ours__",
    name: "Notre SaaS",
    isOurs: true,
    scores: baseline.categoryScores.map((c) => c.ourScore),
  };
  const competitorRows: Row[] = baseline.competitors.map((c) => ({
    id: c.id,
    name: c.name,
    isOurs: false,
    scores: c.score26,
  }));
  return [oursRow, ...competitorRows];
}

function rowAverage(scores: number[]): number {
  if (!scores.length) return 0;
  const sum = scores.reduce((s, v) => s + v, 0);
  return sum / scores.length;
}

export default function BICBComparisonGrid({ baseline }: Props) {
  const rows = buildRows(baseline);

  return (
    <section
      aria-labelledby="bicb-grid-title"
      style={{
        background: BRAND.surface,
        border: `1px solid ${BRAND.border}`,
        borderRadius: 12,
        padding: 24,
        marginTop: 24,
        fontFamily: BRAND.fontFamily,
      }}
    >
      <header style={{ marginBottom: 16 }}>
        <h2
          id="bicb-grid-title"
          style={{ margin: 0, fontSize: 18, color: BRAND.text, fontWeight: 700 }}
        >
          Heatmap comparative — 26 dimensions × {rows.length} acteurs
        </h2>
        <p style={{ margin: "6px 0 0", fontSize: 12, color: BRAND.textSecondary }}>
          Scores par cellule : 0 (rouge) → 3 (vert). La ligne &laquo;&nbsp;Notre
          SaaS&nbsp;&raquo; est épinglée et surlignée or.
        </p>
      </header>

      <div role="region" aria-label="Heatmap BICB" style={{ overflowX: "auto" }}>
        <table
          role="table"
          style={{
            width: "100%",
            borderCollapse: "separate",
            borderSpacing: 0,
            fontSize: 11,
            color: BRAND.textDim,
            minWidth: 1100,
          }}
        >
          <thead>
            <tr>
              <th
                scope="col"
                style={{
                  position: "sticky",
                  left: 0,
                  background: BRAND.surfaceAlt,
                  color: BRAND.gold,
                  textAlign: "left",
                  padding: "10px 12px",
                  borderBottom: `1px solid ${BRAND.border}`,
                  fontWeight: 700,
                  zIndex: 2,
                  minWidth: 200,
                }}
              >
                Acteur
              </th>
              {SMES_CATEGORIES_26.map((cat) => (
                <th
                  key={cat.id}
                  scope="col"
                  style={{
                    background: BRAND.surfaceAlt,
                    color: BRAND.textDim,
                    padding: "8px 4px",
                    borderBottom: `1px solid ${BRAND.border}`,
                    fontWeight: 600,
                    fontSize: 10,
                    textAlign: "center",
                    minWidth: 36,
                    maxWidth: 60,
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    whiteSpace: "nowrap",
                    height: 110,
                  }}
                  title={`#${cat.id} ${cat.name} (${cat.group})`}
                >
                  {cat.id}. {cat.name}
                </th>
              ))}
              <th
                scope="col"
                style={{
                  background: BRAND.surfaceAlt,
                  color: BRAND.gold,
                  padding: "8px 8px",
                  borderBottom: `1px solid ${BRAND.border}`,
                  fontWeight: 700,
                  textAlign: "center",
                  position: "sticky",
                  right: 0,
                  zIndex: 2,
                }}
              >
                Moy.
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const avg = rowAverage(row.scores);
              return (
                <tr key={row.id}>
                  <th
                    scope="row"
                    style={{
                      position: "sticky",
                      left: 0,
                      background: row.isOurs ? BRAND.surfaceAlt : BRAND.surface,
                      color: row.isOurs ? BRAND.gold : BRAND.text,
                      textAlign: "left",
                      padding: "8px 12px",
                      borderBottom: `1px solid ${BRAND.border}`,
                      fontWeight: row.isOurs ? 700 : 600,
                      zIndex: 1,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {row.name}
                    {row.isOurs && (
                      <span
                        style={{
                          marginLeft: 6,
                          fontSize: 9,
                          color: BRAND.bg,
                          background: BRAND.gold,
                          padding: "2px 5px",
                          borderRadius: 4,
                          fontWeight: 700,
                        }}
                      >
                        NOUS
                      </span>
                    )}
                  </th>
                  {row.scores.map((score, i) => (
                    <td
                      key={SMES_CATEGORIES_26[i].id}
                      style={{
                        textAlign: "center",
                        padding: "8px 4px",
                        borderBottom: `1px solid ${BRAND.border}`,
                        background: scoreToCellBg(score),
                        color: scoreToColor(score),
                        fontWeight: 700,
                        fontVariantNumeric: "tabular-nums",
                      }}
                      title={`${row.name} · ${SMES_CATEGORIES_26[i].name} = ${score}/3`}
                    >
                      {score.toFixed(score % 1 === 0 ? 0 : 1)}
                    </td>
                  ))}
                  <td
                    style={{
                      position: "sticky",
                      right: 0,
                      background: row.isOurs
                        ? "rgba(201,168,76,0.18)"
                        : "rgba(201,168,76,0.08)",
                      color: BRAND.gold,
                      fontWeight: 700,
                      textAlign: "center",
                      padding: "8px 8px",
                      borderBottom: `1px solid ${BRAND.border}`,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {avg.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <footer
        style={{
          marginTop: 12,
          fontSize: 11,
          color: BRAND.textSecondary,
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          alignItems: "center",
        }}
        aria-label="Légende couleur"
      >
        <span>Légende :</span>
        {[0, 1, 2, 3].map((s) => (
          <span
            key={s}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "2px 8px",
              borderRadius: 4,
              background: scoreToCellBg(s),
              color: scoreToColor(s),
              fontWeight: 700,
            }}
          >
            {s}
          </span>
        ))}
        <span>· 0 = absent · 3 = best-in-class</span>
      </footer>
    </section>
  );
}
