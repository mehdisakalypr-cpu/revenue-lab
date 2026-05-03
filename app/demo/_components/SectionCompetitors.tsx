// SectionCompetitors — table comparison vs Causal/Capchase/Equals/Excel
import { COMPETITORS, COMPARISON_DIMENSIONS } from "./data";
import { IconCheck, IconX } from "./Icons";

export default function SectionCompetitors() {
  return (
    <section
      style={{
        padding: "80px 24px",
        background: "linear-gradient(180deg, #0F0A1F 0%, #14102A 50%, #0F0A1F 100%)",
        borderTop: "1px solid rgba(255,255,255,.04)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div
            style={{
              fontSize: 11,
              color: "#67E8F9",
              letterSpacing: ".2em",
              textTransform: "uppercase",
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            ⚔️ Competitors comparison
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
            RevenueLab vs <span style={{ color: "#67E8F9" }}>Causal · Capchase · Equals · Excel</span>
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
            On a comparé sur 10 dimensions clés : Monte Carlo, templates output, intégrations, latence,
            sensitivity analysis, drift detection, et coût mensuel. Verdict ci-dessous.
          </p>
        </div>

        {/* Cards summary */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 14,
            marginBottom: 40,
          }}
        >
          {COMPETITORS.map((c) => (
            <div
              key={c.name}
              style={{
                background: c.is_us
                  ? "linear-gradient(135deg, rgba(201,168,76,.12), rgba(201,168,76,.04))"
                  : "rgba(255,255,255,.03)",
                border: c.is_us ? "1.5px solid #C9A84C" : "1px solid rgba(255,255,255,.08)",
                borderRadius: 12,
                padding: 18,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: c.logo_color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: 900,
                    fontSize: 13,
                  }}
                >
                  {c.name[0]}
                </div>
                <div style={{ fontWeight: 800, color: "#fff", fontSize: 14 }}>{c.name}</div>
                {c.is_us && (
                  <span
                    style={{
                      fontSize: 9,
                      padding: "2px 6px",
                      background: "#C9A84C",
                      color: "#1F1535",
                      borderRadius: 999,
                      fontWeight: 800,
                      letterSpacing: 0.5,
                    }}
                  >
                    US
                  </span>
                )}
              </div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 900,
                  color: c.is_us ? "#C9A84C" : "#fff",
                  marginBottom: 8,
                }}
              >
                {c.monthly_eur > 0 ? `€${c.monthly_eur}/mo` : "Gratuit*"}
              </div>
              <p style={{ fontSize: 12, color: "#9ca3af", lineHeight: 1.5, margin: 0 }}>{c.summary}</p>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div
          style={{
            background: "rgba(255,255,255,.03)",
            border: "1px solid rgba(255,255,255,.08)",
            borderRadius: 14,
            overflow: "hidden",
            overflowX: "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 13,
              minWidth: 700,
            }}
          >
            <thead>
              <tr style={{ background: "rgba(0,0,0,.3)" }}>
                <th
                  style={{
                    textAlign: "left",
                    padding: "14px 18px",
                    color: "#9ca3af",
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                  }}
                >
                  Dimension
                </th>
                <th
                  style={{
                    textAlign: "center",
                    padding: "14px 12px",
                    color: "#C9A84C",
                    fontWeight: 800,
                  }}
                >
                  RevenueLab
                </th>
                <th style={{ textAlign: "center", padding: "14px 12px", color: "#9ca3af", fontWeight: 700 }}>
                  Causal
                </th>
                <th style={{ textAlign: "center", padding: "14px 12px", color: "#9ca3af", fontWeight: 700 }}>
                  Capchase
                </th>
                <th style={{ textAlign: "center", padding: "14px 12px", color: "#9ca3af", fontWeight: 700 }}>
                  Equals
                </th>
                <th style={{ textAlign: "center", padding: "14px 12px", color: "#9ca3af", fontWeight: 700 }}>
                  Excel
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_DIMENSIONS.map((d, i) => (
                <tr key={i} style={{ borderTop: "1px solid rgba(255,255,255,.04)" }}>
                  <td style={{ padding: "12px 18px", color: "#cfd2dc" }}>{d.dim}</td>
                  <Cell value={d.revenuelab} highlight />
                  <Cell value={d.causal} />
                  <Cell value={d.capchase} />
                  <Cell value={d.equals} />
                  <Cell value={d.excel} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          style={{
            marginTop: 32,
            padding: 20,
            background: "rgba(201,168,76,.08)",
            border: "1px solid rgba(201,168,76,.25)",
            borderRadius: 12,
            textAlign: "center",
          }}
        >
          <strong style={{ color: "#C9A84C", fontSize: 14, letterSpacing: 0.5 }}>🔄 Dogfood callout</strong>
          <p
            style={{
              fontSize: 13,
              color: "#cfd2dc",
              margin: "10px 0 0",
              lineHeight: 1.6,
            }}
          >
            Cette comparison a été générée par RevenueLab lui-même : on a modélisé chaque concurrent comme
            si c'était un SaaS de notre portfolio à analyser. Les positions de prix, les latences, les
            features observées sont issues de notre propre engine + scraping public docs (G2, Capterra,
            websites officiels).
          </p>
        </div>
      </div>
    </section>
  );
}

function Cell({ value, highlight }: { value: boolean | string; highlight?: boolean }) {
  if (typeof value === "boolean") {
    return (
      <td style={{ textAlign: "center", padding: "12px 12px" }}>
        {value ? (
          <IconCheck size={18} style={{ color: highlight ? "#C9A84C" : "#34d399" }} />
        ) : (
          <IconX size={18} style={{ color: "#6b7280" }} />
        )}
      </td>
    );
  }
  return (
    <td
      style={{
        textAlign: "center",
        padding: "12px 12px",
        color: highlight ? "#C9A84C" : "#cfd2dc",
        fontWeight: highlight ? 700 : 500,
      }}
    >
      {value}
    </td>
  );
}
