"use client";

// BestOfSynthesis — for each SMES category where a champion was identified,
// display: category, champion (with initials avatar), evidence quote + URL,
// and "Notre approche pour faire mieux".

import { BRAND, BICBSaaSBaseline, getSMESCategory } from "./_bdd-types";

interface Props {
  baseline: BICBSaaSBaseline;
}

/** Build deterministic colour for a champion's avatar from its name. */
function nameToHue(name: string): number {
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = (h * 31 + name.charCodeAt(i)) % 360;
  }
  return h;
}

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? "").join("") || "?";
}

export default function BestOfSynthesis({ baseline }: Props) {
  const items = [...baseline.bestOf].sort((a, b) => a.categoryId - b.categoryId);

  return (
    <section
      aria-labelledby="bestof-title"
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
          id="bestof-title"
          style={{ margin: 0, fontSize: 18, color: BRAND.text, fontWeight: 700 }}
        >
          Best-of par dimension — preuve & contre-attaque
        </h2>
        <p style={{ margin: "6px 0 0", fontSize: 12, color: BRAND.textSecondary }}>
          {items.length} catégorie{items.length > 1 ? "s" : ""} avec champion
          identifié sur {baseline.categoryScores.length}.
        </p>
      </header>

      {items.length === 0 ? (
        <div
          style={{
            padding: 24,
            textAlign: "center",
            color: BRAND.textSecondary,
            fontSize: 13,
            border: `1px dashed ${BRAND.border}`,
            borderRadius: 8,
          }}
        >
          Aucun champion best-of injecté pour l&apos;instant. Lancer la
          recherche BICB pour peupler cette section.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          {items.map((entry) => {
            let categoryName: string;
            try {
              categoryName = getSMESCategory(entry.categoryId).name;
            } catch {
              categoryName = `#${entry.categoryId}`;
            }
            const hue = nameToHue(entry.championName);
            return (
              <article
                key={`${entry.categoryId}-${entry.championName}`}
                style={{
                  background: BRAND.bg,
                  border: `1px solid ${BRAND.border}`,
                  borderRadius: 12,
                  padding: 16,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 8,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      color: BRAND.gold,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      fontWeight: 700,
                    }}
                  >
                    #{entry.categoryId} {categoryName}
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    aria-hidden="true"
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: `hsl(${hue} 60% 35%)`,
                      color: "#FFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: 14,
                      flexShrink: 0,
                    }}
                  >
                    {initialsOf(entry.championName)}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      color: BRAND.text,
                      fontWeight: 700,
                    }}
                  >
                    {entry.championName}
                  </div>
                </div>

                <blockquote
                  style={{
                    margin: 0,
                    padding: "8px 12px",
                    borderLeft: `3px solid ${BRAND.primary}`,
                    fontSize: 12,
                    color: BRAND.textDim,
                    fontStyle: "italic",
                    background: "rgba(124,58,237,0.06)",
                    borderRadius: 4,
                  }}
                >
                  &laquo; {entry.evidence} &raquo;
                </blockquote>

                {entry.evidenceUrl ? (
                  <a
                    href={entry.evidenceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: 11,
                      color: BRAND.info,
                      textDecoration: "none",
                      wordBreak: "break-all",
                    }}
                  >
                    Source ↗
                  </a>
                ) : null}

                <div
                  style={{
                    marginTop: 4,
                    padding: "10px 12px",
                    background: "rgba(201,168,76,0.08)",
                    border: `1px solid ${BRAND.gold}`,
                    borderRadius: 8,
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      color: BRAND.gold,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      fontWeight: 700,
                      marginBottom: 4,
                    }}
                  >
                    Notre approche pour faire mieux
                  </div>
                  <div style={{ fontSize: 12, color: BRAND.text, lineHeight: 1.4 }}>
                    {entry.ourApproach}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
