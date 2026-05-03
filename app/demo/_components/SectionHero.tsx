// SectionHero — Hero principal RevenueLab
import KpiStrip from "./KpiStrip";
import { GlobalKeyframes } from "./MotionHelpers";

export default function SectionHero() {
  return (
    <section
      style={{
        position: "relative",
        padding: "80px 24px 48px",
        background:
          "radial-gradient(circle at 30% 0%, rgba(201,168,76,0.18) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(6,182,212,0.12) 0%, transparent 60%), #0F0A1F",
        overflow: "hidden",
      }}
    >
      <GlobalKeyframes />
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "6px 14px",
            background: "rgba(201,168,76,0.15)",
            border: "1px solid #C9A84C",
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 800,
            color: "#C9A84C",
            letterSpacing: 1.2,
            marginBottom: 20,
            textTransform: "uppercase",
          }}
        >
          🎲 DÉMO LIVE · MONTE CARLO 1 000 SCENARIOS
        </div>
        <h1
          style={{
            fontSize: 56,
            fontWeight: 900,
            margin: "0 0 18px",
            letterSpacing: -1.5,
            lineHeight: 1.05,
            color: "#fff",
          }}
        >
          Décide en <span style={{ color: "#C9A84C" }}>data</span>, pas en feeling.
          <br />
          <span style={{ fontSize: 36, fontWeight: 700, color: "#9ca3af" }}>
            Monte Carlo financier MRR/LTV/CAC sur 36 mois
          </span>
        </h1>
        <p
          style={{
            fontSize: 18,
            color: "#cfd2dc",
            maxWidth: 720,
            margin: "0 auto 28px",
            lineHeight: 1.6,
          }}
        >
          Connecte Stripe, lance 1 000 simulations en 8 secondes, exporte un dossier{" "}
          <strong style={{ color: "#fff" }}>BPI / CIR / Banque / VC</strong> audit-ready. Le tout pour
          <strong style={{ color: "#C9A84C" }}> €39/mo</strong> au lieu de{" "}
          <strong style={{ color: "#fbbf24" }}>€5-15k</strong> de cabinet expert-comptable.
        </p>
        <div
          style={{
            display: "flex",
            gap: 14,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: 16,
          }}
        >
          <a
            href="#live-example"
            style={{
              background: "#C9A84C",
              color: "#1F1535",
              padding: "16px 32px",
              borderRadius: 10,
              fontWeight: 800,
              fontSize: 15,
              textDecoration: "none",
              boxShadow: "0 8px 24px rgba(201,168,76,.3)",
            }}
          >
            🎯 Voir le sample live (5 SaaS) →
          </a>
          <a
            href="https://hub.gapup.io/checkout?plan=single&slug=revenue-lab"
            style={{
              background: "rgba(255,255,255,.06)",
              color: "#fff",
              padding: "16px 32px",
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 15,
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,.15)",
            }}
          >
            Souscrire — €39/mo
          </a>
        </div>
        <div
          style={{
            display: "inline-flex",
            gap: 16,
            fontSize: 13,
            color: "#6b7280",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <span>✓ Stripe / Chargebee / Recurly natif</span>
          <span>✓ Output 4 formats</span>
          <span>✓ Re-run mensuel auto</span>
        </div>
        <KpiStrip />
      </div>
    </section>
  );
}
