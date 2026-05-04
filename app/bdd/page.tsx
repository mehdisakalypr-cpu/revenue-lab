"use client";

// BDD-SMES dashboard page.
//
// This file is the canonical TEMPLATE. The rollout script
// (`/var/www/template-bdd-smes/scripts/rollout-saas-bdd.sh`) copies it under
// `<target-saas>/app/bdd/page.tsx`, replacing the `revenue-lab` markers.
//
// Real BICB data is injected later by replacing `EMPTY_BDD_BASELINE` (or by
// editing `_components/_bdd-data-empty.ts`).

import { useMemo } from "react";

import {
  BRAND,
  BICBDeliverable,
} from "./_components/_bdd-types";
import { EMPTY_BDD_BASELINE } from "./_components/_bdd-data-empty";
import BICBScoreCard from "./_components/BICBScoreCard";
import BICBComparisonGrid from "./_components/BICBComparisonGrid";
import BestOfSynthesis from "./_components/BestOfSynthesis";
import CompetitorReferenceList from "./_components/CompetitorReferenceList";
import SMESScoreGauge from "./_components/SMESScoreGauge";
import RoadmapToBICB from "./_components/RoadmapToBICB";

const baseline = EMPTY_BDD_BASELINE;

interface BiblioItem extends BICBDeliverable {
  competitorName: string;
}

function flattenBibliography(): BiblioItem[] {
  const seen = new Set<string>();
  const out: BiblioItem[] = [];
  for (const c of baseline.competitors) {
    for (const d of c.sampleDeliverables) {
      if (!d.url || seen.has(d.url)) continue;
      seen.add(d.url);
      out.push({ ...d, competitorName: c.name });
    }
  }
  return out;
}

export default function BddSmesPage() {
  const biblio = useMemo(flattenBibliography, []);

  return (
    <main
      style={{
        background: BRAND.bg,
        color: BRAND.text,
        minHeight: "100vh",
        padding: "32px 24px 80px",
        fontFamily: BRAND.fontFamily,
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 24,
            marginBottom: 24,
          }}
        >
          <div style={{ flex: "1 1 300px", minWidth: 280 }}>
            <div
              style={{
                fontSize: 11,
                color: BRAND.gold,
                textTransform: "uppercase",
                letterSpacing: 2,
                fontWeight: 700,
              }}
            >
              BDD-SMES · Best-In-Class Benchmark
            </div>
            <h1
              style={{
                margin: "8px 0 6px",
                fontSize: 32,
                fontWeight: 800,
                color: BRAND.text,
                lineHeight: 1.1,
              }}
            >
              {baseline.slug}{" "}
              <span style={{ color: BRAND.gold, fontWeight: 700 }}>
                · {baseline.metier}
              </span>
            </h1>
            <p
              style={{
                margin: 0,
                fontSize: 13,
                color: BRAND.textDim,
                maxWidth: 720,
              }}
            >
              Benchmark BICB sur 26 dimensions SMES. Score relatif, heatmap
              comparée, synthèse best-of par catégorie, roadmap priorisée pour
              rattraper ou dépasser la moyenne marché.
            </p>
            <p
              style={{
                margin: "8px 0 0",
                fontSize: 11,
                color: BRAND.textSecondary,
              }}
            >
              Mis à jour le {baseline.generatedAt} · {baseline.competitors.length}{" "}
              concurrent
              {baseline.competitors.length > 1 ? "s" : ""} suivis ·{" "}
              {biblio.length} source{biblio.length > 1 ? "s" : ""} référencée
              {biblio.length > 1 ? "s" : ""}
            </p>
          </div>
          <div style={{ flexShrink: 0 }}>
            <SMESScoreGauge
              relativeScore={baseline.relativeScore}
              caption="vs BICB moyenne"
              size={200}
            />
          </div>
        </header>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <BICBScoreCard baseline={baseline} />
          <CompetitorReferenceList baseline={baseline} />
          <BICBComparisonGrid baseline={baseline} />
          <BestOfSynthesis baseline={baseline} />
          <RoadmapToBICB baseline={baseline} />

          <footer
            style={{
              background: BRAND.surface,
              border: `1px solid ${BRAND.border}`,
              borderRadius: 12,
              padding: 24,
              fontFamily: BRAND.fontFamily,
            }}
            aria-labelledby="biblio-title"
          >
            <h2
              id="biblio-title"
              style={{ margin: 0, fontSize: 16, color: BRAND.text, fontWeight: 700 }}
            >
              Bibliographie · {biblio.length} source
              {biblio.length > 1 ? "s" : ""} dédupliquée
              {biblio.length > 1 ? "s" : ""}
            </h2>
            {biblio.length === 0 ? (
              <p
                style={{
                  margin: "12px 0 0",
                  fontSize: 12,
                  color: BRAND.textSecondary,
                }}
              >
                Aucune source pour l&apos;instant. Les livrables des concurrents
                BICB seront automatiquement listés ici dès injection des
                données.
              </p>
            ) : (
              <ol
                style={{
                  margin: "12px 0 0",
                  paddingLeft: 20,
                  fontSize: 12,
                  color: BRAND.textDim,
                  lineHeight: 1.6,
                }}
              >
                {biblio.map((b: BiblioItem, i: number) => (
                  <li key={`${b.url}-${i}`} style={{ marginBottom: 4 }}>
                    <strong style={{ color: BRAND.text }}>{b.competitorName}</strong>
                    {" — "}
                    <span style={{ color: BRAND.textSecondary }}>[{b.type}]</span>{" "}
                    <a
                      href={b.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: BRAND.info, textDecoration: "none" }}
                    >
                      {b.label} ↗
                    </a>
                  </li>
                ))}
              </ol>
            )}
          </footer>
        </div>
      </div>
    </main>
  );
}
