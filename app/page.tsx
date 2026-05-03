import Link from "next/link";
import HubFooter from "@/components/HubFooter";

export default function HomePage() {
  return (
    <main style={{ minHeight: "100vh", background: "#0A0716" }}>
      <Header />

      {/* HERO */}
      <section style={{ padding: "72px 24px 48px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 36, alignItems: "center" }}>
          <div>
            <span
              style={{
                display: "inline-block",
                padding: "5px 14px",
                background: "rgba(124,58,237,0.18)",
                border: "1px solid rgba(124,58,237,0.5)",
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 1,
                color: "#C4B5FD",
                marginBottom: 18,
              }}
            >
              MONTE CARLO · 1000 SCÉNARIOS · TOUT EN TS
            </span>
            <h1 style={{ fontSize: 50, fontWeight: 800, lineHeight: 1.05, margin: "0 0 16px", letterSpacing: -1 }}>
              Modélise tes revenus SaaS en <span style={{ color: "#A78BFA" }}>1000 scénarios</span>.
            </h1>
            <p style={{ fontSize: 17, color: "#D1D5DB", lineHeight: 1.55, margin: "0 0 28px" }}>
              ARPU, CAC, churn, expansion, runway. RevenueLab simule 36 mois de MRR avec intervalles de confiance p10/p50/p90,
              sensitivity analysis et runway probabiliste. <strong style={{ color: "#FFFFFF" }}>Pas de spreadsheet. Pas de CFO. €299/mo.</strong>
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link
                href="/demo"
                style={{
                  padding: "14px 26px",
                  background: "#A78BFA",
                  color: "#0A0716",
                  textDecoration: "none",
                  borderRadius: 10,
                  fontWeight: 800,
                  fontSize: 15,
                }}
              >
                Voir la démo live →
              </Link>
              <Link
                href="https://hub.gapup.io/bundle/pilote-finance"
                style={{
                  padding: "14px 26px",
                  background: "transparent",
                  color: "#A78BFA",
                  textDecoration: "none",
                  borderRadius: 10,
                  border: "1px solid #A78BFA",
                  fontWeight: 700,
                  fontSize: 15,
                }}
              >
                Bundle Pilote Finance · €299/mo
              </Link>
            </div>
          </div>

          <div>
            <img
              src="https://image.pollinations.ai/prompt/financial%20charts%20monte%20carlo%20simulation%20dashboard%20dark%20purple?width=900&height=600&model=flux"
              alt="RevenueLab dashboard"
              style={{ width: "100%", maxWidth: 540, borderRadius: 16, display: "block", marginLeft: "auto", boxShadow: "0 20px 60px rgba(167,139,250,0.25)" }}
            />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "60px 24px", background: "#0F0A1F" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, margin: "0 0 28px", letterSpacing: -0.5 }}>Ce que tu fais avec RevenueLab</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {[
              { icon: "🎲", title: "Monte Carlo 1000 runs", desc: "Box-Muller Gaussian noise sur ARPU/CAC/churn/expansion. Pas de pseudo-random qui converge en 50 runs." },
              { icon: "📊", title: "Bandes p10/p50/p90", desc: "MRR M0→M36 avec intervalle de confiance 80%. Tu vois le scénario médian + le pire 10% + le meilleur 10%." },
              { icon: "💰", title: "LTV:CAC distribué", desc: "Pas un ratio plat — une distribution. Médiane + intervalles. Sain si médiane ≥ 3, mauvais si p10 < 1." },
              { icon: "⏱", title: "Runway probabiliste", desc: "Combien de mois avant cash 0 dans 80% des scénarios ? Date d'alerte au lieu d'estimation pifométrique." },
              { icon: "🎯", title: "Sensitivity analysis", desc: "Quelle variable bouge le plus ton MRR M36 ? Ajuste σ par variable pour stress-test." },
              { icon: "📈", title: "Export modèle", desc: "PDF rapport board-ready ou Excel modèle interactif (Q3 2026). API JSON pour intégration BI." },
            ].map((s) => (
              <div key={s.title} style={{ background: "#14102A", border: "1px solid #2D1F4D", borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 800, margin: "0 0 6px" }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: "#9CA3AF", margin: 0, lineHeight: 1.5 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFFRES */}
      <section id="offres" style={{ padding: "60px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, margin: "0 0 8px", letterSpacing: -0.5 }}>Offres</h2>
          <p style={{ fontSize: 14, color: "#9CA3AF", margin: "0 0 28px" }}>4 tiers · pas d&apos;essai gratuit · pas de remboursement · cancel anytime.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
            {[
              { name: "Single", price: 39, scope: "RevenueLab seul", cta: "/auth/register?plan=single", color: "#9CA3AF" },
              { name: "Bundle Pilote Finance", price: 299, scope: "+ CashFlow AI + InvoiceVault + AnomalyGuard + LTVPredict", cta: "https://hub.gapup.io/bundle/pilote-finance", color: "#67E8F9", highlight: "recommandé" },
              { name: "Macro Operations & CS", price: 499, scope: "17 SaaS département complet", cta: "https://hub.gapup.io/macro/operations-cs", color: "#5EEAD4" },
              { name: "All-Access Y1", price: 999, scope: "49 SaaS + futurs lancés (300 places)", cta: "https://hub.gapup.io/#all-access", color: "#FBBF24" },
            ].map((p) => (
              <div
                key={p.name}
                style={{
                  position: "relative",
                  padding: 22,
                  background: p.highlight ? "#1F1535" : "#14102A",
                  border: `${p.highlight ? 2 : 1}px solid ${p.highlight ? p.color : "#2D1F4D"}`,
                  borderRadius: 12,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {p.highlight && (
                  <div
                    style={{
                      position: "absolute",
                      top: -10,
                      left: 16,
                      padding: "3px 10px",
                      background: p.color,
                      color: "#0A0716",
                      borderRadius: 999,
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: 0.6,
                      textTransform: "uppercase",
                    }}
                  >
                    {p.highlight}
                  </div>
                )}
                <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 4, fontWeight: 600 }}>{p.name}</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: p.color, marginBottom: 4 }}>
                  €{p.price}<span style={{ fontSize: 12, color: "#9CA3AF" }}>/mo</span>
                </div>
                <div style={{ fontSize: 12, color: "#D1D5DB", marginBottom: 14, lineHeight: 1.4, flex: 1 }}>{p.scope}</div>
                <Link
                  href={p.cta}
                  style={{
                    display: "block",
                    padding: "10px 14px",
                    background: p.highlight ? p.color : "transparent",
                    border: `1px solid ${p.color}`,
                    color: p.highlight ? "#0A0716" : p.color,
                    textAlign: "center",
                    textDecoration: "none",
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  Choisir →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "60px 24px", background: "#0F0A1F" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, margin: "0 0 24px", letterSpacing: -0.5 }}>FAQ</h2>
          {[
            { q: "Pourquoi Monte Carlo et pas un modèle Excel ?", a: "Excel donne 1 chiffre. Monte Carlo donne une distribution. Tu vois ton MRR M36 médian + le scénario à 10% (le pire) et 90% (le meilleur). Les VCs et bankers veulent voir des intervalles de confiance, pas des prévisions plates." },
            { q: "Combien de temps prend une simulation ?", a: "1000 runs sur 36 mois = ~150ms en client-side TypeScript. Pure math, pas d'API call. Tu peux itérer instantanément en changeant les inputs." },
            { q: "Quelles variables je peux noiser ?", a: "ARPU, CAC, churn rate, expansion revenue, monthly acquisitions, monthly burn, starting cash. Sigma configurable par variable (default 15%)." },
            { q: "Y a-t-il une intégration BI/Notion ?", a: "Q3 2026 : export Notion + intégration Cube/Looker via API JSON. Pour l'instant : PDF rapport + JSON dump." },
            { q: "Prix bundle vs single ?", a: "Single €39/mo te donne RevenueLab seul. Bundle Pilote Finance €299/mo ajoute 4 SaaS finance complémentaires (CashFlow AI, InvoiceVault, AnomalyGuard, LTVPredict). Économie ~€60/mo vs à la carte." },
          ].map((f, i) => (
            <details key={i} style={{ background: "#14102A", border: "1px solid #2D1F4D", borderRadius: 10, padding: "14px 18px", marginBottom: 8 }}>
              <summary style={{ cursor: "pointer", fontSize: 15, fontWeight: 700, color: "#FFFFFF", listStyle: "none" }}>{f.q}</summary>
              <p style={{ fontSize: 14, color: "#D1D5DB", lineHeight: 1.6, margin: "10px 0 0" }}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "60px 24px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, margin: "0 0 14px", letterSpacing: -0.5 }}>Une question ?</h2>
          <p style={{ color: "#D1D5DB", fontSize: 16, margin: "0 0 24px", lineHeight: 1.6 }}>
            Écris-nous à{" "}
            <a href="mailto:contact.revenuelab@gapup.io" style={{ color: "#A78BFA" }}>
              contact.revenuelab@gapup.io
            </a>
            . On répond sous 24h ouvré.
          </p>
        </div>
      </section>

      <HubFooter />
    </main>
  );
}

function Header() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        background: "rgba(10,7,22,0.85)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ fontSize: 20, fontWeight: 800, color: "#FFFFFF", textDecoration: "none" }}>
          <span style={{ color: "#A78BFA" }}>revenue</span>
          <span style={{ color: "#06B6D4" }}>.lab</span>
        </Link>
        <nav style={{ display: "flex", gap: 18, alignItems: "center", fontSize: 14 }}>
          <Link href="/demo" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Démo</Link>
          <Link href="/#services" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Services</Link>
          <Link href="/#offres" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Offres</Link>
          <Link href="/#faq" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>FAQ</Link>
          <Link
            href="https://hub.gapup.io/auth/login"
            style={{
              padding: "8px 16px",
              color: "#FFFFFF",
              textDecoration: "none",
              borderRadius: 6,
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            Se connecter
          </Link>
        </nav>
      </div>
    </header>
  );
}
