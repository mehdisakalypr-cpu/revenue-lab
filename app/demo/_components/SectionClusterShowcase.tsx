// Cluster showcase — rapport-analyse — KPI strip + comparison preview

const KPIS = [
  { label: "Score global",      value: "82",     unit: "/ 100", delta: "+4",  good: true },
  { label: "Signaux P0",        value: "3",      unit: "actifs", delta: "+1", good: false },
  { label: "Pricing leader",    value: "€89",    unit: "/mo",   delta: "−€10", good: true },
  { label: "Fenêtre stratégique", value: "14",   unit: "j",     delta: "−2",  good: false },
];

const COMP_ROWS = [
  { name: "Concurrent A",  us: 82, them: 64, delta: 18 },
  { name: "Concurrent B",  us: 82, them: 71, delta: 11 },
  { name: "Concurrent C",  us: 82, them: 79, delta: 3 },
  { name: "Concurrent D",  us: 82, them: 86, delta: -4 },
];

export default function SectionClusterShowcase() {
  return (
    <section style={{ padding: "80px 24px", background: "#0F0822", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "#8B5CF6", marginBottom: 8 }}>Aperçu livrable</div>
        <h2 style={{ fontSize: 32, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Rapport généré — B2B SaaS</h2>
        <p style={{ fontSize: 15, color: "#A1A1AA", marginBottom: 32, maxWidth: 720 }}>
          revenue-lab produit un rapport multi-sources avec KPI strip, signaux priorisés et comparaison concurrentielle.
        </p>

        {/* KPI strip */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, marginBottom: 24 }}>
          {KPIS.map(k => (
            <div key={k.label} style={{ background: "#1A0F2E", borderRadius: 12, padding: "16px 18px", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontSize: 11, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{k.label}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                <span style={{ fontSize: 26, fontWeight: 800, color: "#fff" }}>{k.value}</span>
                <span style={{ fontSize: 12, color: "#71717A" }}>{k.unit}</span>
                <span style={{ marginLeft: "auto", fontSize: 12, color: k.good ? "#22C55E" : "#F87171", fontWeight: 600 }}>{k.delta}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div style={{ background: "#1A0F2E", borderRadius: 16, padding: 0, border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>
          <div style={{ padding: "16px 22px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ fontSize: 13, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: 1 }}>Comparaison concurrentielle</div>
          </div>
          {COMP_ROWS.map(r => (
            <div key={r.name} style={{ padding: "16px 22px", borderTop: "1px solid rgba(255,255,255,0.04)", display: "grid", gridTemplateColumns: "200px 1fr 80px", gap: 18, alignItems: "center" }}>
              <span style={{ fontSize: 14, color: "#E4E4E7", fontWeight: 500 }}>{r.name}</span>
              <div style={{ position: "relative", height: 22, background: "rgba(255,255,255,0.04)", borderRadius: 4 }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${r.us}%`, background: "#8B5CF6", borderRadius: 4, opacity: 0.85 }} />
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${r.them}%`, background: "rgba(255,255,255,0.18)", borderRadius: 4, borderRight: "2px solid #fff" }} />
                <span style={{ position: "absolute", left: 8, top: 3, fontSize: 11, color: "#fff", fontWeight: 600 }}>{r.us}</span>
                <span style={{ position: "absolute", right: 8, top: 3, fontSize: 11, color: "#9CA3AF" }}>{r.them}</span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: r.delta > 0 ? "#22C55E" : "#F87171", textAlign: "right" }}>{r.delta > 0 ? "+" : ""}{r.delta}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
