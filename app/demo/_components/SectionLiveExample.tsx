// SectionLiveExample — affiche les 5 SAAS_SAMPLES Monte Carlo pré-calculés
import { SAAS_SAMPLES } from "./data";

function fmtEur(n: number): string {
  if (n >= 1_000_000_000) return `€${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `€${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `€${(n / 1_000).toFixed(0)}k`;
  return `€${n}`;
}

export default function SectionLiveExample() {
  return (
    <section
      id="live-example"
      style={{
        padding: "80px 24px",
        background:
          "linear-gradient(180deg, #0F0A1F 0%, #14102A 50%, #0F0A1F 100%)",
        borderTop: "1px solid rgba(255,255,255,.04)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div
            style={{
              fontSize: 11,
              color: "#C9A84C",
              letterSpacing: ".2em",
              textTransform: "uppercase",
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            🎲 Sample live — 5 SaaS connus
          </div>
          <h2
            style={{
              fontSize: 40,
              fontWeight: 800,
              margin: "0 0 14px",
              letterSpacing: -0.5,
              color: "#fff",
            }}
          >
            Monte Carlo MRR/LTV/CAC sur{" "}
            <span style={{ color: "#C9A84C" }}>Notion · Linear · Stripe · Figma · Slack</span>
          </h2>
          <p
            style={{
              color: "#cfd2dc",
              fontSize: 16,
              maxWidth: 760,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Voici exactement le format de rapport que tu reçois pour ton propre SaaS — 1 000 simulations
            sur 36 mois, projections P10/P50/P90, segments LTV, valuation range, red/green flags. Tous les
            chiffres sont réalistes (sources publiques ARR reports + benchmarks ChartMogul).
          </p>
        </div>

        <div style={{ display: "grid", gap: 22 }}>
          {SAAS_SAMPLES.map((s) => (
            <SaasSampleCard key={s.name} sample={s} fmtEur={fmtEur} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SaasSampleCard({
  sample,
  fmtEur,
}: {
  sample: typeof SAAS_SAMPLES[number];
  fmtEur: (n: number) => string;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,.03)",
        border: `1px solid ${sample.logo_color}40`,
        borderRadius: 16,
        padding: 28,
        boxShadow: `0 8px 32px ${sample.logo_color}10`,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 24,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 4,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: sample.logo_color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 900,
                fontSize: 18,
              }}
            >
              {sample.name[0]}
            </div>
            <div>
              <h3 style={{ fontSize: 22, fontWeight: 800, margin: 0, color: "#fff" }}>
                {sample.name}
              </h3>
              <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>{sample.category}</div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 11, color: "#9ca3af", letterSpacing: ".1em", textTransform: "uppercase" }}>
            Valuation range estimée
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#C9A84C" }}>
            {fmtEur(sample.valuation_low_eur)} – {fmtEur(sample.valuation_high_eur)}
          </div>
        </div>
      </div>

      {/* KPI strip */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: 12,
          marginBottom: 24,
        }}
      >
        <KpiMini label="MRR actuel" value={fmtEur(sample.current_mrr_eur)} />
        <KpiMini label="Growth /mo" value={`${sample.growth_rate_pct}%`} />
        <KpiMini label="Churn" value={`${sample.churn_pct}%`} />
        <KpiMini label="CAC" value={fmtEur(sample.cac_eur)} />
        <KpiMini label="LTV" value={fmtEur(sample.ltv_eur)} />
        <KpiMini
          label="Score unit eco"
          value={`${sample.unit_economics_score}/100`}
          color={sample.unit_economics_score >= 85 ? "#34d399" : sample.unit_economics_score >= 70 ? "#fbbf24" : "#f87171"}
        />
      </div>

      {/* MRR projections */}
      <div
        style={{
          background: "rgba(0,0,0,.3)",
          borderRadius: 12,
          padding: 18,
          marginBottom: 18,
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: "#06B6D4",
            letterSpacing: ".15em",
            textTransform: "uppercase",
            fontWeight: 700,
            marginBottom: 12,
          }}
        >
          MRR projection Monte Carlo (1 000 scenarios)
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {[
            { label: "T+12", data: sample.mrr_t12 },
            { label: "T+24", data: sample.mrr_t24 },
            { label: "T+36", data: sample.mrr_t36 },
          ].map((t) => (
            <div
              key={t.label}
              style={{
                background: "rgba(255,255,255,.04)",
                borderRadius: 8,
                padding: 12,
                fontSize: 12,
              }}
            >
              <div style={{ color: "#9ca3af", fontWeight: 700, marginBottom: 6 }}>{t.label} mois</div>
              <div style={{ color: "#cfd2dc" }}>P10 : {fmtEur(t.data.p10)}</div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, margin: "2px 0" }}>
                P50 : {fmtEur(t.data.p50)}
              </div>
              <div style={{ color: "#9ca3af" }}>P90 : {fmtEur(t.data.p90)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* LTV segments */}
      <div style={{ marginBottom: 18 }}>
        <div
          style={{
            fontSize: 11,
            color: "#A78BFA",
            letterSpacing: ".15em",
            textTransform: "uppercase",
            fontWeight: 700,
            marginBottom: 10,
          }}
        >
          LTV par segment
        </div>
        <div style={{ display: "grid", gap: 6 }}>
          {sample.ltv_segments.map((seg, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto auto",
                gap: 12,
                padding: "8px 12px",
                background: "rgba(167,139,250,.06)",
                borderRadius: 6,
                fontSize: 13,
              }}
            >
              <span style={{ color: "#cfd2dc" }}>{seg.segment}</span>
              <span style={{ color: "#fff", fontWeight: 700 }}>{fmtEur(seg.ltv_eur)}</span>
              <span style={{ color: "#9ca3af", fontSize: 11 }}>{seg.share_pct}% base</span>
            </div>
          ))}
        </div>
      </div>

      {/* Flags */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <div
            style={{
              fontSize: 11,
              color: "#34d399",
              letterSpacing: ".15em",
              textTransform: "uppercase",
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            ✅ Green flags
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 6 }}>
            {sample.green_flags.map((f, i) => (
              <li key={i} style={{ fontSize: 12, color: "#cfd2dc", lineHeight: 1.5 }}>
                ✓ {f}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div
            style={{
              fontSize: 11,
              color: "#f87171",
              letterSpacing: ".15em",
              textTransform: "uppercase",
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            ⚠️ Red flags
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 6 }}>
            {sample.red_flags.map((f, i) => (
              <li key={i} style={{ fontSize: 12, color: "#cfd2dc", lineHeight: 1.5 }}>
                ⚠ {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        style={{
          marginTop: 20,
          padding: "12px 16px",
          background: "rgba(201,168,76,.08)",
          border: "1px solid rgba(201,168,76,.2)",
          borderRadius: 8,
          fontSize: 12,
          color: "#9ca3af",
          textAlign: "center",
        }}
      >
        CAC payback : <strong style={{ color: "#fff" }}>{sample.cac_payback_months} mois</strong> · LTV/CAC{" "}
        <strong style={{ color: "#fff" }}>{(sample.ltv_eur / sample.cac_eur).toFixed(1)}×</strong>
      </div>
    </div>
  );
}

function KpiMini({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,.03)",
        borderRadius: 8,
        padding: "10px 12px",
      }}
    >
      <div style={{ fontSize: 10, color: "#6b7280", letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 700 }}>
        {label}
      </div>
      <div style={{ fontSize: 16, fontWeight: 800, color: color ?? "#fff", marginTop: 4 }}>{value}</div>
    </div>
  );
}
