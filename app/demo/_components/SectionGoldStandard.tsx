import {
  EXECUTIVE_BRIEF,
  STRATEGIC_SCENARIOS,
  MARKET_SOURCES,
  POSITIONING_2X2,
  WIN_LOSS_DECODER,
} from "./data";

export default function SectionGoldStandard() {
  return (
    <section style={{ background: "linear-gradient(180deg, #0A0716 0%, #120920 100%)", padding: "96px 0 120px", color: "#FFFFFF", position: "relative" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 12, letterSpacing: ".2em", color: "#F59E0B", textTransform: "uppercase", marginBottom: 8 }}>
            Niveau Gold Standard · Layer 2 BICB
          </div>
          <h2 style={{ fontSize: 40, fontWeight: 800, marginBottom: 16, lineHeight: 1.15 }}>
            Le brief stratégique qui accompagne le rapport
          </h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,.7)", maxWidth: 720, lineHeight: 1.55 }}>
            Au-delà des KPI, executive brief 300 mots avec sources canoniques (McKinsey, Gartner, FRED, SEC EDGAR, OECD), 3 scénarios stratégiques chiffrés (bear / base / bull), matrice de positionnement 2×2, et décoder win/loss du marché — exactement ce qu'un cabinet à €15-25k livre, en 90 secondes.
          </p>
        </div>

        <div style={{ background: "rgba(124, 58, 237, 0.05)", border: "1px solid rgba(124, 58, 237, 0.3)", borderRadius: 16, padding: 32, marginBottom: 48 }}>
          <div style={{ fontSize: 11, letterSpacing: ".15em", color: "#7C3AED", textTransform: "uppercase", marginBottom: 12 }}>
            Executive Brief · {EXECUTIVE_BRIEF.subject}
          </div>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: "rgba(255,255,255,.92)", marginBottom: 24 }}>
            {EXECUTIVE_BRIEF.summary}
          </p>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#F59E0B", marginBottom: 12, textTransform: "uppercase", letterSpacing: ".1em" }}>
              {EXECUTIVE_BRIEF.keyClaims.length} claims chiffrés sourcés
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 12 }}>
              {EXECUTIVE_BRIEF.keyClaims.map((c, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,.04)", borderRadius: 8, padding: 14, borderLeft: "3px solid #F59E0B" }}>
                  <div style={{ fontSize: 14, marginBottom: 6, color: "#FFFFFF", fontWeight: 500 }}>{c.claim}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,.55)", fontStyle: "italic" }}>Source : {c.source}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 48 }}>
          <h3 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>3 scénarios stratégiques 18 mois</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
            {STRATEGIC_SCENARIOS.map((s) => {
              const colors: Record<string, string> = { bear: "#EF4444", base: "#06B6D4", bull: "#10B981" };
              const labels: Record<string, string> = { bear: "BEAR", base: "BASE", bull: "BULL" };
              return (
                <div key={s.name} style={{ background: "rgba(255,255,255,.03)", border: `1px solid ${colors[s.name]}40`, borderRadius: 12, padding: 24, position: "relative" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: colors[s.name], letterSpacing: ".15em" }}>{labels[s.name]}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,.5)" }}>P({Math.round(s.probability * 100)}%)</div>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, lineHeight: 1.3 }}>{s.title}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,.7)", lineHeight: 1.55, marginBottom: 14 }}>{s.positioningChange}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,.5)", marginBottom: 8, textTransform: "uppercase", letterSpacing: ".08em" }}>ARR Y3 cible</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: colors[s.name], marginBottom: 14 }}>€{(s.arrYr3Eur / 1000).toLocaleString("fr-FR")}k</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,.5)", marginBottom: 6, textTransform: "uppercase", letterSpacing: ".08em" }}>Drivers</div>
                  <ul style={{ paddingLeft: 16, margin: "0 0 14px", fontSize: 12, color: "rgba(255,255,255,.7)", lineHeight: 1.55 }}>
                    {s.competitiveDrivers.map((d, i) => <li key={i}>{d}</li>)}
                  </ul>
                  <div style={{ background: `${colors[s.name]}10`, border: `1px solid ${colors[s.name]}30`, borderRadius: 6, padding: 10 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: colors[s.name], marginBottom: 4, textTransform: "uppercase", letterSpacing: ".08em" }}>Notre play</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,.85)", lineHeight: 1.5 }}>{s.ourPlay}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ marginBottom: 48 }}>
          <h3 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Matrice de positionnement 2×2</h3>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,.6)", marginBottom: 24 }}>Axes : {POSITIONING_2X2.axes.x} × {POSITIONING_2X2.axes.y}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {POSITIONING_2X2.quadrants.map((q, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10, padding: 20, minHeight: 140 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#F59E0B", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 10 }}>{q.quadrant}</div>
                <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{q.players.join(" · ")}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,.65)", lineHeight: 1.5 }}>{q.shareNote}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "rgba(16, 185, 129, 0.04)", border: "1px solid rgba(16, 185, 129, 0.25)", borderRadius: 16, padding: 28, marginBottom: 48 }}>
          <h3 style={{ fontSize: 26, fontWeight: 700, marginBottom: 8 }}>Win / Loss decoder</h3>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,.55)", marginBottom: 20 }}>
            Win rate : <strong style={{ color: "#10B981" }}>{Math.round(WIN_LOSS_DECODER.winRate * 100)}%</strong> · cadence : {WIN_LOSS_DECODER.cadence}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#10B981", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 12 }}>Top win reasons</div>
              {WIN_LOSS_DECODER.topWinReasons.map((w, i) => (
                <div key={i} style={{ marginBottom: 10, fontSize: 13, color: "rgba(255,255,255,.85)" }}>
                  <span style={{ color: "#10B981", fontWeight: 700 }}>+{w.deltaPct}%</span> {w.reason}
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#EF4444", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 12 }}>Top loss reasons</div>
              {WIN_LOSS_DECODER.topLossReasons.map((l, i) => (
                <div key={i} style={{ marginBottom: 10, fontSize: 13, color: "rgba(255,255,255,.85)" }}>
                  <span style={{ color: "#EF4444", fontWeight: 700 }}>-{l.deltaPct}%</span> {l.reason}
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 20, paddingTop: 18, borderTop: "1px solid rgba(255,255,255,.08)" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#F59E0B", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 12 }}>Actions correctives</div>
            {WIN_LOSS_DECODER.actions.map((a, i) => (
              <div key={i} style={{ marginBottom: 8, fontSize: 13, color: "rgba(255,255,255,.85)" }}>
                <strong>{a.reason}</strong> → {a.fix}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Sources canoniques citées ({MARKET_SOURCES.length})</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
            {MARKET_SOURCES.map((s, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,.03)", borderLeft: "3px solid #06B6D4", padding: "10px 14px", fontSize: 12 }}>
                <div style={{ color: "#06B6D4", fontWeight: 700, marginBottom: 4, fontSize: 11, textTransform: "uppercase", letterSpacing: ".05em" }}>
                  {s.type} · {s.year}
                </div>
                <div style={{ color: "#FFFFFF", fontWeight: 500, marginBottom: 6 }}>{s.label}</div>
                <div style={{ color: "rgba(255,255,255,.6)", lineHeight: 1.45, fontStyle: "italic" }}>{s.excerpt}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
