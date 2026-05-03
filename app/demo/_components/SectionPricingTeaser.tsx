// SectionPricingTeaser — 3 plans (Single / Bundle / All-Access)
import { PRICING_PLANS } from "./data";
import { IconCheck } from "./Icons";

export default function SectionPricingTeaser() {
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
              color: "#C9A84C",
              letterSpacing: ".2em",
              textTransform: "uppercase",
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            💰 Pricing
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
            <span style={{ color: "#C9A84C" }}>3 façons</span> de souscrire RevenueLab
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
            Single si tu veux juste RevenueLab. Bundle Levée Series A/B si tu prépares ta levée (combo
            DeckForge + BizPlanForge + LTVPredict). All-Access early bird pour les 49 SaaS Gapup.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 18,
          }}
        >
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.name}
              style={{
                background: plan.highlight
                  ? "linear-gradient(135deg, rgba(6,182,212,.1), rgba(6,182,212,.02))"
                  : "rgba(255,255,255,.03)",
                border: plan.highlight ? "1.5px solid #06B6D4" : "1px solid rgba(255,255,255,.1)",
                borderRadius: 16,
                padding: 28,
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              {plan.highlight && (
                <div
                  style={{
                    position: "absolute",
                    top: -12,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "#06B6D4",
                    color: "#0F0A1F",
                    padding: "4px 14px",
                    borderRadius: 999,
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                  }}
                >
                  ⭐ Recommandé
                </div>
              )}
              <div
                style={{
                  fontSize: 11,
                  color: plan.highlight ? "#67E8F9" : "#9ca3af",
                  letterSpacing: ".15em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  marginBottom: 10,
                }}
              >
                {plan.name}
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 14 }}>
                <span style={{ fontSize: 42, fontWeight: 900, color: "#fff" }}>€{plan.price_eur}</span>
                <span style={{ fontSize: 14, color: "#9ca3af" }}>{plan.duration}</span>
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: "#cfd2dc",
                  lineHeight: 1.55,
                  margin: "0 0 22px",
                }}
              >
                {plan.description}
              </p>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 24px",
                  display: "grid",
                  gap: 10,
                  flexGrow: 1,
                }}
              >
                {plan.features.map((f, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      fontSize: 13,
                      color: "#cfd2dc",
                      lineHeight: 1.5,
                    }}
                  >
                    <IconCheck
                      size={16}
                      style={{
                        color: plan.highlight ? "#06B6D4" : "#34d399",
                        marginTop: 2,
                        flexShrink: 0,
                      }}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.cta_href}
                style={{
                  display: "block",
                  textAlign: "center",
                  background: plan.highlight ? "#06B6D4" : "rgba(255,255,255,.08)",
                  color: plan.highlight ? "#0F0A1F" : "#fff",
                  padding: "14px 18px",
                  borderRadius: 10,
                  fontWeight: 800,
                  fontSize: 14,
                  textDecoration: "none",
                  boxShadow: plan.highlight ? "0 6px 20px rgba(6,182,212,.3)" : "none",
                }}
              >
                {plan.cta} →
              </a>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 32,
            display: "flex",
            justifyContent: "center",
            gap: 18,
            flexWrap: "wrap",
            fontSize: 13,
            color: "#6b7280",
          }}
        >
          <span>✓ Stripe SCA · 4 durées (mensuel · 12 · 24 · 36 mois)</span>
          <span>✓ Désabonnement par décocher</span>
          <span>✓ Pas d'essai gratuit / pas de remboursement (transparence pricing)</span>
        </div>
      </div>
    </section>
  );
}
