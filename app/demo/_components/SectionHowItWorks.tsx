// SectionHowItWorks — 5 steps du flow RevenueLab
import { HOW_IT_WORKS_STEPS } from "./data";

export default function SectionHowItWorks() {
  return (
    <section
      style={{
        padding: "80px 24px",
        background: "#0F0A1F",
        borderTop: "1px solid rgba(255,255,255,.04)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div
            style={{
              fontSize: 11,
              color: "#06B6D4",
              letterSpacing: ".2em",
              textTransform: "uppercase",
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            ⚙️ Comment ça marche
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
            5 étapes, <span style={{ color: "#06B6D4" }}>5 minutes onboarding</span>, run-and-forget après
          </h2>
          <p
            style={{
              color: "#cfd2dc",
              fontSize: 16,
              maxWidth: 720,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Connecte tes data sources (Stripe / Chargebee / Recurly), configure tes hypothèses via sliders
            intuitifs, lance Monte Carlo, reçois ton dossier prêt en 8 secondes. Re-run mensuel auto avec
            data fraîches.
          </p>
        </div>

        <div style={{ display: "grid", gap: 20 }}>
          {HOW_IT_WORKS_STEPS.map((step, i) => (
            <div
              key={step.step}
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr auto",
                gap: 24,
                alignItems: "center",
                background: "rgba(255,255,255,.03)",
                border: "1px solid rgba(255,255,255,.08)",
                borderRadius: 16,
                padding: "24px 28px",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  background:
                    "linear-gradient(135deg, rgba(6,182,212,.2), rgba(6,182,212,.05))",
                  border: "1px solid rgba(6,182,212,.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                  flexShrink: 0,
                }}
              >
                {step.icon}
              </div>
              <div>
                <div
                  style={{
                    fontSize: 11,
                    color: "#06B6D4",
                    letterSpacing: ".15em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    marginBottom: 6,
                  }}
                >
                  Étape {step.step} · {step.duration}
                </div>
                <h3
                  style={{
                    fontSize: 19,
                    fontWeight: 800,
                    margin: "0 0 8px",
                    color: "#fff",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    color: "#cfd2dc",
                    fontSize: 14,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {step.description}
                </p>
              </div>
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 900,
                  color: "rgba(6,182,212,.18)",
                  lineHeight: 1,
                  fontFamily: "ui-monospace, monospace",
                }}
              >
                0{i + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
