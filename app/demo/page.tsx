"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { simulate, type SimulationResult } from "@/lib/monte-carlo";
import MrrChart from "@/components/MrrChart";
import HistogramChart from "@/components/HistogramChart";

const EXAMPLES = {
  meetsync: {
    label: "MeetSync — B2B SaaS meeting recorder (Pre-Series A)",
    initialMrr: 18000,
    arpu: 120,
    monthlyAcquisitions: 25,
    cac: 450,
    churnRatePct: 4,
    expansionRevenuePct: 1.5,
    startingCash: 750000,
    monthlyBurn: 65000,
  },
  enterprise: {
    label: "EntScale — Enterprise SaaS (€1M+ ARR)",
    initialMrr: 95000,
    arpu: 4500,
    monthlyAcquisitions: 4,
    cac: 12000,
    churnRatePct: 1.2,
    expansionRevenuePct: 3.5,
    startingCash: 2500000,
    monthlyBurn: 180000,
  },
  bootstrap: {
    label: "BootSaaS — Solo founder bootstrap",
    initialMrr: 4500,
    arpu: 39,
    monthlyAcquisitions: 35,
    cac: 18,
    churnRatePct: 6,
    expansionRevenuePct: 0.5,
    startingCash: 35000,
    monthlyBurn: 4500,
  },
};

type ExampleKey = keyof typeof EXAMPLES;

export default function DemoPage() {
  const [exampleKey, setExampleKey] = useState<ExampleKey>("meetsync");
  const [params, setParams] = useState(EXAMPLES.meetsync);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [running, setRunning] = useState(false);

  function runSimulation() {
    setRunning(true);
    // Defer to next tick so loading state renders
    setTimeout(() => {
      const r = simulate(params, 1000);
      setResult(r);
      setRunning(false);
    }, 50);
  }

  useEffect(() => {
    runSimulation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function loadExample(k: ExampleKey) {
    setExampleKey(k);
    setParams(EXAMPLES[k]);
    setTimeout(() => {
      setRunning(true);
      setTimeout(() => {
        const r = simulate(EXAMPLES[k], 1000);
        setResult(r);
        setRunning(false);
      }, 30);
    }, 0);
  }

  const updateParam = (key: keyof typeof params, value: number) => {
    setParams({ ...params, [key]: value });
  };

  return (
    <main style={{ minHeight: "100vh", background: "#0A0716", color: "#FFFFFF" }}>
      <header style={{ background: "rgba(10,7,22,0.85)", backdropFilter: "blur(8px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/" style={{ fontSize: 20, fontWeight: 800, color: "#FFFFFF", textDecoration: "none" }}>
            <span style={{ color: "#A78BFA" }}>revenue</span><span style={{ color: "#06B6D4" }}>.lab</span>
          </Link>
          <Link href="/" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14 }}>← Retour home</Link>
        </div>
      </header>

      <section style={{ padding: "48px 24px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <span
          style={{
            display: "inline-block",
            padding: "5px 14px",
            background: "rgba(124,58,237,0.18)",
            border: "1px solid rgba(124,58,237,0.5)",
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 1,
            color: "#C4B5FD",
            marginBottom: 14,
          }}
        >
          DÉMO LIVE · 1000 RUNS · CALCULÉ EN CLIENT-SIDE TS
        </span>
        <h1 style={{ fontSize: 40, fontWeight: 800, margin: "0 0 12px", letterSpacing: -0.5 }}>
          Simulation Monte Carlo — joue avec les paramètres
        </h1>
        <p style={{ fontSize: 16, color: "#D1D5DB", lineHeight: 1.6, margin: "0 0 28px" }}>
          Choisis un profil, ajuste les paramètres, observe l&apos;impact sur le MRR M36. Tout en pure TypeScript dans ton navigateur, pas d&apos;API call.
        </p>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
          {(Object.keys(EXAMPLES) as ExampleKey[]).map((k) => (
            <button
              key={k}
              onClick={() => loadExample(k)}
              style={{
                padding: "8px 14px",
                background: exampleKey === k ? "#A78BFA" : "#1F1535",
                color: exampleKey === k ? "#0A0716" : "#D1D5DB",
                border: `1px solid ${exampleKey === k ? "#A78BFA" : "#2D1F4D"}`,
                borderRadius: 999,
                fontSize: 13,
                fontWeight: exampleKey === k ? 700 : 500,
                cursor: "pointer",
              }}
            >
              {EXAMPLES[k].label}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 18 }}>
          {/* PARAMS */}
          <div style={{ background: "#14102A", border: "1px solid #2D1F4D", borderRadius: 14, padding: 22 }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, margin: "0 0 16px", letterSpacing: 0.3 }}>Paramètres baseline</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Param label="MRR initial (€/mo)" value={params.initialMrr} onChange={(v) => updateParam("initialMrr", v)} />
              <Param label="ARPU (€/mo/client)" value={params.arpu} onChange={(v) => updateParam("arpu", v)} />
              <Param label="Acquisitions/mois" value={params.monthlyAcquisitions} onChange={(v) => updateParam("monthlyAcquisitions", v)} />
              <Param label="CAC (€)" value={params.cac} onChange={(v) => updateParam("cac", v)} />
              <Param label="Churn rate (%/mo)" value={params.churnRatePct} step={0.1} onChange={(v) => updateParam("churnRatePct", v)} />
              <Param label="Expansion rate (%/mo)" value={params.expansionRevenuePct} step={0.1} onChange={(v) => updateParam("expansionRevenuePct", v)} />
              <Param label="Cash de départ (€)" value={params.startingCash} onChange={(v) => updateParam("startingCash", v)} />
              <Param label="Burn fixe/mois (€)" value={params.monthlyBurn} onChange={(v) => updateParam("monthlyBurn", v)} />
            </div>
            <button
              onClick={runSimulation}
              disabled={running}
              style={{
                marginTop: 16,
                width: "100%",
                padding: "12px 20px",
                background: running ? "#5B21B6" : "#A78BFA",
                color: "#0A0716",
                border: "none",
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 800,
                cursor: running ? "wait" : "pointer",
              }}
            >
              {running ? "Simulation en cours…" : "🎲 Re-run 1000 simulations"}
            </button>
          </div>

          {/* KPI */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {result ? (
              <>
                <KpiBox
                  label="MRR M36 médian"
                  value={`€${Math.round(result.monthlyMrr.p50[35]).toLocaleString("fr-FR")}`}
                  sub={`p10 €${Math.round(result.monthlyMrr.p10[35]).toLocaleString("fr-FR")} · p90 €${Math.round(result.monthlyMrr.p90[35]).toLocaleString("fr-FR")}`}
                  color="#A78BFA"
                />
                <KpiBox
                  label="LTV : CAC médian"
                  value={`${result.ltvCac.p50.toFixed(1)} ×`}
                  sub={`p10 ${result.ltvCac.p10.toFixed(1)} · p90 ${result.ltvCac.p90.toFixed(1)} (sain ≥ 3)`}
                  color={result.ltvCac.p50 >= 3 ? "#10B981" : "#F87171"}
                />
                <KpiBox
                  label="Runway probabiliste"
                  value={`${Math.round(result.runwayMonths.p50)} mois (médian)`}
                  sub={`p10 ${Math.round(result.runwayMonths.p10)}mo (pessimiste) · p90 ${Math.round(result.runwayMonths.p90)}mo (optimiste)`}
                  color={result.runwayMonths.p50 >= 18 ? "#10B981" : "#FBBF24"}
                />
              </>
            ) : (
              <div style={{ background: "#14102A", border: "1px solid #2D1F4D", borderRadius: 14, padding: 22, color: "#9CA3AF", fontSize: 14 }}>
                Cliquez sur "Re-run" pour lancer la simulation.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CHARTS */}
      {result && (
        <>
          <section style={{ padding: "24px 24px", maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ background: "#14102A", border: "1px solid #2D1F4D", borderRadius: 14, padding: 22, marginBottom: 18 }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, margin: "0 0 4px" }}>MRR forecast 36 mois — bandes de confiance</h3>
              <p style={{ fontSize: 12, color: "#9CA3AF", margin: "0 0 14px" }}>
                Bande violette = 80% des scénarios (p10 → p90). Ligne pleine = médiane (p50).
              </p>
              <MrrChart p10={result.monthlyMrr.p10} p50={result.monthlyMrr.p50} p90={result.monthlyMrr.p90} />
            </div>

            <div style={{ background: "#14102A", border: "1px solid #2D1F4D", borderRadius: 14, padding: 22 }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, margin: "0 0 4px" }}>Distribution MRR final M36</h3>
              <p style={{ fontSize: 12, color: "#9CA3AF", margin: "0 0 14px" }}>
                Histogramme des 1000 résultats finaux. Plus la distribution est étalée, plus le risque est élevé.
              </p>
              <HistogramChart values={result.finalMrrDistribution} />
            </div>
          </section>

          <section style={{ padding: "24px 24px 60px", maxWidth: 1100, margin: "0 auto" }}>
            <div
              style={{
                background: "linear-gradient(135deg, #1F1535 0%, #14102A 100%)",
                border: "1px solid rgba(167,139,250,0.4)",
                borderRadius: 14,
                padding: 24,
                textAlign: "center",
              }}
            >
              <h3 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 10px" }}>Ces simulations sont en client-side (free).</h3>
              <p style={{ fontSize: 14, color: "#D1D5DB", margin: "0 0 18px", lineHeight: 1.5 }}>
                Les versions payantes débloquent : sensitivity analysis (impact relatif de chaque variable), export PDF rapport board-ready,
                modèle Excel interactif, intégration API JSON, monitoring continu (alerte si runway p10 &lt; 12 mois), et benchmarks sectoriels.
              </p>
              <Link
                href="/#offres"
                style={{
                  display: "inline-block",
                  padding: "12px 28px",
                  background: "#A78BFA",
                  color: "#0A0716",
                  textDecoration: "none",
                  borderRadius: 10,
                  fontWeight: 800,
                  fontSize: 14,
                }}
              >
                Voir les offres →
              </Link>
            </div>
          </section>
        </>
      )}
    </main>
  );
}

function Param({ label, value, onChange, step }: { label: string; value: number; onChange: (n: number) => void; step?: number }) {
  return (
    <div>
      <label style={{ display: "block", color: "#9CA3AF", fontSize: 11, fontWeight: 600, marginBottom: 4 }}>{label}</label>
      <input
        type="number"
        value={value}
        step={step ?? 1}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          width: "100%",
          padding: "8px 10px",
          background: "#0A0716",
          color: "#FFFFFF",
          borderRadius: 6,
          border: "1px solid #2D1F4D",
          fontSize: 13,
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

function KpiBox({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  return (
    <div style={{ background: "#14102A", border: `1px solid ${color}40`, borderRadius: 14, padding: 18 }}>
      <div style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 700, letterSpacing: 0.5, marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 800, color, marginBottom: 4 }}>{value}</div>
      <div style={{ fontSize: 11, color: "#9CA3AF" }}>{sub}</div>
    </div>
  );
}
