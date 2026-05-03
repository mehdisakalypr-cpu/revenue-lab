// SectionUseCases — 5 use cases ciblés
import { USE_CASES } from "./data";

export default function SectionUseCases() {
  return (
    <section
      style={{
        padding: "80px 24px",
        background: "#0F0A1F",
        borderTop: "1px solid rgba(255,255,255,.04)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div
            style={{
              fontSize: 11,
              color: "#A78BFA",
              letterSpacing: ".2em",
              textTransform: "uppercase",
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            🎯 5 use cases
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
            Pour qui RevenueLab change tout
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
            Du founder pre-Series A qui prépare son dossier VC au CFO scale-up qui pilote €200k MRR sans
            embauche, RevenueLab couvre les moments charnières où chaque décision financière compte.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
            gap: 18,
          }}
        >
          {USE_CASES.map((uc, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,.03)",
                border: "1px solid rgba(167,139,250,.2)",
                borderRadius: 14,
                padding: 26,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: "#A78BFA",
                  letterSpacing: ".15em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  marginBottom: 8,
                }}
              >
                {uc.persona}
              </div>
              <h3
                style={{
                  fontSize: 19,
                  fontWeight: 800,
                  margin: "0 0 14px",
                  color: "#fff",
                  lineHeight: 1.3,
                }}
              >
                {uc.title}
              </h3>

              <div style={{ marginBottom: 14 }}>
                <div
                  style={{
                    fontSize: 10,
                    color: "#fbbf24",
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    marginBottom: 6,
                  }}
                >
                  Pain
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: "#cfd2dc",
                    margin: 0,
                    lineHeight: 1.55,
                  }}
                >
                  {uc.pain}
                </p>
              </div>

              <div style={{ marginBottom: 14 }}>
                <div
                  style={{
                    fontSize: 10,
                    color: "#34d399",
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    marginBottom: 6,
                  }}
                >
                  Outcome
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: "#cfd2dc",
                    margin: 0,
                    lineHeight: 1.55,
                  }}
                >
                  {uc.outcome}
                </p>
              </div>

              <div style={{ marginTop: "auto" }}>
                <div
                  style={{
                    fontSize: 10,
                    color: "#06B6D4",
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    marginBottom: 8,
                  }}
                >
                  Stack utilisée
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                  {uc.stack.map((s, si) => (
                    <span
                      key={si}
                      style={{
                        padding: "4px 10px",
                        background: "rgba(6,182,212,.1)",
                        border: "1px solid rgba(6,182,212,.3)",
                        borderRadius: 999,
                        fontSize: 11,
                        color: "#67E8F9",
                        fontWeight: 600,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div
                  style={{
                    paddingTop: 14,
                    borderTop: "1px solid rgba(255,255,255,.06)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: 12, color: "#9ca3af" }}>Économie estimée</span>
                  <span style={{ fontSize: 18, fontWeight: 900, color: "#34d399" }}>
                    €{uc.saved_eur.toLocaleString("fr-FR")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
