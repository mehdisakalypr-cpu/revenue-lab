"use client";

// CompetitorReferenceList — grid of BICB competitor cards.
// Each card: initials avatar + name + country/HQ + founded year + score badge
// + expandable list of typed deliverables (whitepaper / demo / pricing / etc.).

import { useState } from "react";
import {
  BRAND,
  BICBCompetitor,
  BICBSaaSBaseline,
  DeliverableType,
} from "./_bdd-types";

interface Props {
  baseline: BICBSaaSBaseline;
}

const TYPE_LABELS: Record<DeliverableType, string> = {
  whitepaper: "Whitepaper",
  demo: "Démo",
  pricing: "Pricing",
  dashboard: "Dashboard",
  "case-study": "Case study",
};

const TYPE_COLOR: Record<DeliverableType, string> = {
  whitepaper: BRAND.info,
  demo: BRAND.gold,
  pricing: BRAND.success,
  dashboard: BRAND.primary,
  "case-study": BRAND.warning,
};

function nameToHue(name: string): number {
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = (h * 31 + name.charCodeAt(i)) % 360;
  }
  return h;
}

function competitorAverage(c: BICBCompetitor): number {
  if (!c.score26.length) return 0;
  return c.score26.reduce((s, v) => s + v, 0) / c.score26.length;
}

function CompetitorCard({ competitor }: { competitor: BICBCompetitor }) {
  const [open, setOpen] = useState(false);
  const hue = nameToHue(competitor.name);
  const avg = competitorAverage(competitor);
  const avgRounded = avg.toFixed(2);

  return (
    <article
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
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          aria-hidden="true"
          style={{
            width: 44,
            height: 44,
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
          {competitor.logoPlaceholder}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 15,
              color: BRAND.text,
              fontWeight: 700,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {competitor.name}
          </div>
          <a
            href={competitor.website}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 11,
              color: BRAND.info,
              textDecoration: "none",
              wordBreak: "break-all",
            }}
          >
            {competitor.website.replace(/^https?:\/\//, "")}
          </a>
        </div>
        <div
          style={{
            background: BRAND.surfaceAlt,
            color: BRAND.gold,
            padding: "4px 10px",
            borderRadius: 999,
            fontWeight: 700,
            fontSize: 12,
            fontVariantNumeric: "tabular-nums",
          }}
          title="Score moyen sur les 26 dimensions SMES"
        >
          {avgRounded}/3
        </div>
      </div>

      <dl
        style={{
          margin: 0,
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: "4px 12px",
          fontSize: 11,
          color: BRAND.textDim,
        }}
      >
        <dt style={{ color: BRAND.textSecondary }}>Pays</dt>
        <dd style={{ margin: 0 }}>{competitor.country || "—"}</dd>
        {competitor.hq ? (
          <>
            <dt style={{ color: BRAND.textSecondary }}>HQ</dt>
            <dd style={{ margin: 0 }}>{competitor.hq}</dd>
          </>
        ) : null}
        {competitor.founded ? (
          <>
            <dt style={{ color: BRAND.textSecondary }}>Fondée</dt>
            <dd style={{ margin: 0 }}>{competitor.founded}</dd>
          </>
        ) : null}
      </dl>

      <button
        type="button"
        onClick={() => setOpen((o: boolean) => !o)}
        aria-expanded={open}
        aria-controls={`deliverables-${competitor.id}`}
        style={{
          background: BRAND.surfaceAlt,
          color: BRAND.text,
          border: `1px solid ${BRAND.border}`,
          borderRadius: 8,
          padding: "8px 12px",
          fontSize: 12,
          fontWeight: 600,
          cursor: "pointer",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span>Voir leurs livrables ({competitor.sampleDeliverables.length})</span>
        <span aria-hidden="true">{open ? "▾" : "▸"}</span>
      </button>

      {open ? (
        <ul
          id={`deliverables-${competitor.id}`}
          style={{
            margin: 0,
            padding: 0,
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          {competitor.sampleDeliverables.length === 0 ? (
            <li style={{ fontSize: 11, color: BRAND.textSecondary, fontStyle: "italic" }}>
              Aucun livrable référencé — recherche à compléter.
            </li>
          ) : (
            competitor.sampleDeliverables.map((d, i) => (
              <li
                key={`${competitor.id}-${i}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 11,
                }}
              >
                <span
                  style={{
                    fontSize: 9,
                    background: TYPE_COLOR[d.type],
                    color: BRAND.bg,
                    padding: "2px 6px",
                    borderRadius: 4,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                    flexShrink: 0,
                  }}
                >
                  {TYPE_LABELS[d.type]}
                </span>
                <a
                  href={d.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: BRAND.info,
                    textDecoration: "none",
                    wordBreak: "break-all",
                  }}
                >
                  {d.label} ↗
                </a>
              </li>
            ))
          )}
        </ul>
      ) : null}
    </article>
  );
}

export default function CompetitorReferenceList({ baseline }: Props) {
  const competitors = baseline.competitors;

  return (
    <section
      aria-labelledby="competitors-title"
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
          id="competitors-title"
          style={{ margin: 0, fontSize: 18, color: BRAND.text, fontWeight: 700 }}
        >
          Concurrents BICB référencés ({competitors.length})
        </h2>
        <p style={{ margin: "6px 0 0", fontSize: 12, color: BRAND.textSecondary }}>
          Cliquer &laquo;&nbsp;Voir leurs livrables&nbsp;&raquo; pour ouvrir la
          liste typée des sources publiques utilisées dans le scoring.
        </p>
      </header>

      {competitors.length === 0 ? (
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
          Aucun concurrent référencé pour l&apos;instant.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          {competitors.map((c) => (
            <CompetitorCard key={c.id} competitor={c} />
          ))}
        </div>
      )}
    </section>
  );
}
