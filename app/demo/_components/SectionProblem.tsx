// SectionProblem — Le problème que résout RevenueLab
import { PROBLEM_STATS } from "./data";

export default function SectionProblem() {
  return (
    <section
      style={{
        padding: "80px 24px",
        background: "#0F0A1F",
        borderTop: "1px solid rgba(255,255,255,.04)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div
            style={{
              fontSize: 11,
              color: "#fbbf24",
              letterSpacing: ".2em",
              textTransform: "uppercase",
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            ⚠️ Le problème
          </div>
          <h2
            style={{
              fontSize: 40,
              fontWeight: 800,
              margin: "0 0 16px",
              letterSpacing: -0.5,
              color: "#fff",
            }}
          >
            Modéliser sa finance est trop coûteux,{" "}
            <span style={{ color: "#fbbf24" }}>trop lent, trop fragile</span>
          </h2>
          <p
            style={{
              color: "#cfd2dc",
              fontSize: 16,
              maxWidth: 760,
              margin: "0 auto",
              lineHeight: 1.65,
            }}
          >
            Tu prépares ta levée Series A, ton dossier BPI, ton pitch banque. Tu paies €5-25k de cabinet,
            tu attends 4-6 semaines, tu obtiens un Excel statique qui ne tient pas un Q&A 90 min de DD. Tes
            VCs détectent les failles en 30 min et négocient -30%.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 18,
            marginBottom: 48,
          }}
        >
          {PROBLEM_STATS.map((p, i) => (
            <div
              key={i}
              style={{
                background: "rgba(251,191,36,.06)",
                border: "1px solid rgba(251,191,36,.25)",
                borderRadius: 14,
                padding: 24,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 42,
                  fontWeight: 900,
                  color: "#fbbf24",
                  lineHeight: 1,
                  marginBottom: 10,
                }}
              >
                {p.stat}
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: "#cfd2dc",
                  lineHeight: 1.5,
                  marginBottom: 12,
                }}
              >
                {p.label}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "#6b7280",
                  fontStyle: "italic",
                }}
              >
                {p.source}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            background: "linear-gradient(135deg, rgba(201,168,76,.08), rgba(201,168,76,.02))",
            border: "1px solid rgba(201,168,76,.3)",
            borderRadius: 16,
            padding: 32,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: "#C9A84C",
              letterSpacing: ".2em",
              textTransform: "uppercase",
              fontWeight: 700,
              marginBottom: 14,
            }}
          >
            ✨ La solution RevenueLab
          </div>
          <h3
            style={{
              fontSize: 26,
              fontWeight: 800,
              margin: "0 0 12px",
              color: "#fff",
              lineHeight: 1.3,
            }}
          >
            Monte Carlo 1 000 scenarios + 4 templates output (BPI/CIR/Banque/VC)
            <br />
            en <span style={{ color: "#C9A84C" }}>8 secondes pour €39/mois</span>
          </h3>
          <p style={{ color: "#cfd2dc", fontSize: 15, maxWidth: 680, margin: "0 auto", lineHeight: 1.6 }}>
            Modèle audit-ready, sensitivity analysis live pour répondre aux Q&A VC, drift detection
            mensuelle pour ne plus se laisser surprendre. Ton cabinet expert-comptable devient un
            consultant stratégique, pas un fabriquant de PDF.
          </p>
        </div>
      </div>
    </section>
  );
}
