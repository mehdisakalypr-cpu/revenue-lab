// SectionFAQ — 8 questions / réponses détaillées
import { FAQ_ITEMS } from "./data";

export default function SectionFAQ() {
  return (
    <section
      style={{
        padding: "80px 24px",
        background: "#0F0A1F",
        borderTop: "1px solid rgba(255,255,255,.04)",
      }}
    >
      <div style={{ maxWidth: 920, margin: "0 auto" }}>
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
            ❓ FAQ
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
            Questions <span style={{ color: "#A78BFA" }}>fréquentes</span>
          </h2>
          <p
            style={{
              color: "#cfd2dc",
              fontSize: 16,
              maxWidth: 680,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Onboarding, comparaison vs Causal/Excel, méthodo LTV, sources data — toutes les questions
            qu'on nous a posées en discovery calls les 6 derniers mois.
          </p>
        </div>

        <div style={{ display: "grid", gap: 12 }}>
          {FAQ_ITEMS.map((item, i) => (
            <details
              key={i}
              style={{
                background: "rgba(255,255,255,.03)",
                border: "1px solid rgba(255,255,255,.08)",
                borderRadius: 12,
                padding: "20px 24px",
                transition: "all .2s",
              }}
            >
              <summary
                style={{
                  cursor: "pointer",
                  fontWeight: 700,
                  color: "#fff",
                  fontSize: 15,
                  lineHeight: 1.4,
                  listStyle: "none",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <span>{item.q}</span>
                <span style={{ color: "#A78BFA", fontSize: 18, fontWeight: 800, flexShrink: 0 }}>+</span>
              </summary>
              <p
                style={{
                  color: "#cfd2dc",
                  fontSize: 14,
                  lineHeight: 1.7,
                  marginTop: 14,
                  marginBottom: 0,
                }}
              >
                {item.a}
              </p>
            </details>
          ))}
        </div>

        <div
          style={{
            marginTop: 32,
            textAlign: "center",
            padding: 20,
            background: "rgba(167,139,250,.06)",
            border: "1px solid rgba(167,139,250,.2)",
            borderRadius: 12,
          }}
        >
          <p style={{ fontSize: 14, color: "#cfd2dc", margin: 0, lineHeight: 1.6 }}>
            Une question pas couverte ?{" "}
            <a
              href="mailto:hello@gapup.io"
              style={{ color: "#A78BFA", textDecoration: "none", fontWeight: 700 }}
            >
              hello@gapup.io
            </a>{" "}
            — réponse sous 24h ouvrées.
          </p>
        </div>
      </div>
    </section>
  );
}
