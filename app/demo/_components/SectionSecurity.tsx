// SectionSecurity — RGPD, encryption, audits
import { SECURITY_ITEMS } from "./data";

export default function SectionSecurity() {
  return (
    <section
      style={{
        padding: "80px 24px",
        background: "linear-gradient(180deg, #0F0A1F 0%, #14102A 50%, #0F0A1F 100%)",
        borderTop: "1px solid rgba(255,255,255,.04)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
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
            🛡️ Security & compliance
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
            Tes data financières <span style={{ color: "#34d399" }}>n'ont rien à craindre</span>
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
            Hébergement EU, encryption AES-256, RLS Supabase auditée, connecteurs Stripe read-only —
            on a designé RevenueLab pour passer une DD security d'un VC sans broncher.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 18,
          }}
        >
          {SECURITY_ITEMS.map((item, i) => (
            <div
              key={i}
              style={{
                background: "rgba(52,211,153,.05)",
                border: "1px solid rgba(52,211,153,.2)",
                borderRadius: 14,
                padding: 22,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div
                style={{
                  fontSize: 32,
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  background: "rgba(52,211,153,.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(52,211,153,.3)",
                }}
              >
                {item.icon}
              </div>
              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  margin: 0,
                  color: "#fff",
                  lineHeight: 1.3,
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontSize: 13,
                  color: "#cfd2dc",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 36,
            background: "rgba(52,211,153,.06)",
            border: "1px solid rgba(52,211,153,.25)",
            borderRadius: 12,
            padding: 24,
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: 14, color: "#cfd2dc", lineHeight: 1.6, margin: 0 }}>
            🔒 <strong style={{ color: "#34d399" }}>Audit RLS Supabase 2026-05-03 PASSED</strong> — 80
            tables auditées, 0 cross-tenant leak, policies service_role only sur sensitive data
            (hub_users, auth_site_passwords, financial_snapshots). Rapport complet disponible sur demande
            (security@gapup.io).
          </p>
        </div>
      </div>
    </section>
  );
}
