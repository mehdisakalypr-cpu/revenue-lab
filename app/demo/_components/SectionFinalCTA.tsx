// SectionFinalCTA — appel à l'action final
export default function SectionFinalCTA() {
  return (
    <section
      style={{
        padding: "100px 24px",
        background:
          "linear-gradient(135deg, #1F1535 0%, #2D1F4D 50%, #1F1535 100%)",
        borderTop: "1px solid rgba(201,168,76,.2)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -60,
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          height: 300,
          background: "radial-gradient(ellipse, rgba(201,168,76,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
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
          🎲 Lance ton premier Monte Carlo
        </div>
        <h2
          style={{
            fontSize: 48,
            fontWeight: 900,
            margin: "0 0 18px",
            letterSpacing: -1,
            lineHeight: 1.05,
            color: "#fff",
          }}
        >
          €39/mois pour <span style={{ color: "#C9A84C" }}>décider en data</span>
          <br />
          au lieu de €5-15k pour <span style={{ color: "#9ca3af" }}>décider au feeling</span>
        </h2>
        <p
          style={{
            fontSize: 17,
            color: "#cfd2dc",
            maxWidth: 660,
            margin: "0 auto 32px",
            lineHeight: 1.6,
          }}
        >
          Connecte Stripe en 5 minutes. Lance ton premier Monte Carlo en 8 secondes. Reçois ton dossier
          BPI/CIR/Banque/VC audit-ready dans la foulée. Re-run mensuel automatique pour ne plus jamais te
          laisser surprendre par tes propres data.
        </p>

        <div
          style={{
            display: "flex",
            gap: 14,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: 24,
          }}
        >
          <a
            href="https://hub.gapup.io/checkout?plan=single&slug=revenue-lab"
            style={{
              background: "#C9A84C",
              color: "#1F1535",
              padding: "18px 38px",
              borderRadius: 12,
              fontWeight: 800,
              fontSize: 16,
              textDecoration: "none",
              boxShadow: "0 12px 32px rgba(201,168,76,.4)",
            }}
          >
            🚀 Souscrire RevenueLab — €39/mo →
          </a>
          <a
            href="https://hub.gapup.io/bundle/leve-serie"
            style={{
              background: "rgba(255,255,255,.06)",
              color: "#fff",
              padding: "18px 38px",
              borderRadius: 12,
              fontWeight: 700,
              fontSize: 16,
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,.15)",
            }}
          >
            Bundle Levée Series A/B — €299/mo
          </a>
        </div>

        <div
          style={{
            display: "inline-flex",
            gap: 18,
            fontSize: 13,
            color: "#9ca3af",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <span>✓ Stripe SCA</span>
          <span>✓ Désabonnement par décocher</span>
          <span>✓ Hébergement EU (RGPD)</span>
          <span>✓ Support 48h ouvrées</span>
        </div>
      </div>
    </section>
  );
}
