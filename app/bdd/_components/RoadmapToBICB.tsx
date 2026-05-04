"use client";

// RoadmapToBICB — split the roadmap actions into P0 / P1 / P2 sections,
// sort by priority then ETA. Each card shows: category, action, ETA days, owner.

import {
  BRAND,
  BICBSaaSBaseline,
  RoadmapAction,
  RoadmapPriority,
  getSMESCategory,
} from "./_bdd-types";

interface Props {
  baseline: BICBSaaSBaseline;
}

const PRIORITY_META: Record<
  RoadmapPriority,
  { label: string; color: string; tagline: string }
> = {
  P0: {
    label: "P0 — bloquant",
    color: BRAND.error,
    tagline: "À livrer en sprint courant.",
  },
  P1: {
    label: "P1 — prioritaire",
    color: BRAND.warning,
    tagline: "À planifier dans les 30 jours.",
  },
  P2: {
    label: "P2 — souhaitable",
    color: BRAND.info,
    tagline: "Backlog. À évaluer trimestriellement.",
  },
};

function categoryName(id: number): string {
  try {
    return getSMESCategory(id).name;
  } catch {
    return `#${id}`;
  }
}

function ActionCard({ action }: { action: RoadmapAction }) {
  const meta = PRIORITY_META[action.priority];
  return (
    <article
      style={{
        background: BRAND.bg,
        border: `1px solid ${BRAND.border}`,
        borderLeft: `3px solid ${meta.color}`,
        borderRadius: 8,
        padding: 14,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          style={{
            fontSize: 10,
            color: BRAND.gold,
            textTransform: "uppercase",
            letterSpacing: 1,
            fontWeight: 700,
          }}
        >
          #{action.categoryId} {categoryName(action.categoryId)}
        </span>
        <span
          style={{
            fontSize: 10,
            color: meta.color,
            fontWeight: 700,
          }}
        >
          {action.priority}
        </span>
      </div>
      <p
        style={{
          margin: 0,
          fontSize: 13,
          color: BRAND.text,
          lineHeight: 1.4,
        }}
      >
        {action.action}
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 11,
          color: BRAND.textDim,
        }}
      >
        <span>
          <span style={{ color: BRAND.textSecondary }}>ETA :</span>{" "}
          <span style={{ fontWeight: 700, color: BRAND.text }}>
            {action.etaDays} j
          </span>
        </span>
        <span
          style={{
            background: BRAND.surfaceAlt,
            padding: "2px 8px",
            borderRadius: 999,
            fontSize: 10,
            color: BRAND.textDim,
          }}
        >
          @{action.owner}
        </span>
      </div>
    </article>
  );
}

export default function RoadmapToBICB({ baseline }: Props) {
  const sorted = [...baseline.roadmap].sort((a, b) => {
    if (a.priority !== b.priority) {
      return a.priority < b.priority ? -1 : 1;
    }
    return a.etaDays - b.etaDays;
  });

  const groups: Record<RoadmapPriority, RoadmapAction[]> = {
    P0: sorted.filter((a) => a.priority === "P0"),
    P1: sorted.filter((a) => a.priority === "P1"),
    P2: sorted.filter((a) => a.priority === "P2"),
  };

  return (
    <section
      aria-labelledby="roadmap-title"
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
          id="roadmap-title"
          style={{ margin: 0, fontSize: 18, color: BRAND.text, fontWeight: 700 }}
        >
          Roadmap pour rejoindre la BICB
        </h2>
        <p style={{ margin: "6px 0 0", fontSize: 12, color: BRAND.textSecondary }}>
          {sorted.length} action{sorted.length > 1 ? "s" : ""} priorisée
          {sorted.length > 1 ? "s" : ""} P0 → P2.
        </p>
      </header>

      {sorted.length === 0 ? (
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
          Aucune action injectée pour l&apos;instant.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {(Object.keys(groups) as RoadmapPriority[]).map((p) => {
            const items = groups[p];
            if (items.length === 0) return null;
            const meta = PRIORITY_META[p];
            return (
              <div key={p}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 10,
                  }}
                >
                  <span
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: meta.color,
                    }}
                    aria-hidden="true"
                  />
                  <h3
                    style={{
                      margin: 0,
                      fontSize: 14,
                      color: meta.color,
                      fontWeight: 700,
                    }}
                  >
                    {meta.label} · {items.length}
                  </h3>
                  <span
                    style={{
                      fontSize: 11,
                      color: BRAND.textSecondary,
                    }}
                  >
                    {meta.tagline}
                  </span>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(260px, 1fr))",
                    gap: 12,
                  }}
                >
                  {items.map((a, i) => (
                    <ActionCard key={`${a.categoryId}-${a.priority}-${i}`} action={a} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
