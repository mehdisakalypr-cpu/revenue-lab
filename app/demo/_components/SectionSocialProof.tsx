// SectionSocialProof — testimonials clients RevenueLab
import { SOCIAL_PROOF, RELEASES_TIMELINE } from "./data";

export default function SectionSocialProof() {
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
              color: "#34d399",
              letterSpacing: ".2em",
              textTransform: "uppercase",
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            🗣️ Témoignages clients
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
            <span style={{ color: "#34d399" }}>+€1.5M</span> de valorisation cumulée chez nos premiers
            clients
          </h2>
          <p
            style={{
              color: "#cfd2dc",
              fontSize: 16,
              maxWidth: 700,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Founders Series A, deep-tech BPI, scale-ups B2B sans CFO — voici comment ils ont mis
            RevenueLab au service de leurs décisions financières.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 18,
            marginBottom: 56,
          }}
        >
          {SOCIAL_PROOF.map((t, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,.03)",
                border: "1px solid rgba(52,211,153,.2)",
                borderRadius: 14,
                padding: 24,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  fontSize: 22,
                  color: "#34d399",
                  marginBottom: 10,
                  lineHeight: 1,
                }}
              >
                "
              </div>
              <p
                style={{
                  fontSize: 14,
                  color: "#cfd2dc",
                  lineHeight: 1.7,
                  margin: "0 0 18px",
                  flexGrow: 1,
                  fontStyle: "italic",
                }}
              >
                {t.quote}
              </p>
              <div
                style={{
                  paddingTop: 16,
                  borderTop: "1px solid rgba(255,255,255,.06)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                }}
              >
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{t.author}</div>
                  <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 3 }}>{t.title}</div>
                </div>
                {t.valuation_added_eur > 0 && (
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 9, color: "#9ca3af", letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 700 }}>
                      Impact
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: "#34d399" }}>
                      +€{(t.valuation_added_eur / 1000).toFixed(0)}k
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Releases timeline */}
        <div
          style={{
            background: "rgba(255,255,255,.03)",
            border: "1px solid rgba(255,255,255,.08)",
            borderRadius: 14,
            padding: 28,
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: "#06B6D4",
              letterSpacing: ".2em",
              textTransform: "uppercase",
              fontWeight: 700,
              marginBottom: 18,
            }}
          >
            🚀 Roadmap product (releases timeline)
          </div>
          <div style={{ display: "grid", gap: 14 }}>
            {RELEASES_TIMELINE.map((r, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr auto",
                  gap: 18,
                  alignItems: "start",
                  paddingBottom: 14,
                  borderBottom:
                    i < RELEASES_TIMELINE.length - 1 ? "1px solid rgba(255,255,255,.04)" : "none",
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    background: r.date.includes("planned") ? "#6b7280" : "#34d399",
                    marginTop: 8,
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      color: r.date.includes("planned") ? "#9ca3af" : "#34d399",
                      fontWeight: 700,
                      marginBottom: 4,
                      letterSpacing: ".05em",
                    }}
                  >
                    {r.date}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 4 }}>
                    {r.title}
                  </div>
                  <div style={{ fontSize: 12, color: "#9ca3af", lineHeight: 1.5 }}>{r.description}</div>
                </div>
                <div
                  style={{
                    fontSize: 10,
                    padding: "3px 9px",
                    background: "rgba(6,182,212,.1)",
                    border: "1px solid rgba(6,182,212,.3)",
                    borderRadius: 999,
                    color: "#67E8F9",
                    fontWeight: 700,
                    letterSpacing: ".05em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {r.impact}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
