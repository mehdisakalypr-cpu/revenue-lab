// KpiStrip — affiche les 6 KPIs hero de RevenueLab
import { HERO_KPIS } from "./data";

export default function KpiStrip() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: 14,
        margin: "32px auto 0",
        maxWidth: 1100,
      }}
    >
      {HERO_KPIS.map((k) => (
        <div
          key={k.label}
          style={{
            background: "rgba(255,255,255,.04)",
            border: "1px solid rgba(201,168,76,.2)",
            borderRadius: 12,
            padding: "16px 18px",
            transition: "all .2s",
          }}
        >
          <div
            style={{
              fontSize: 10,
              color: "#C9A84C",
              letterSpacing: ".15em",
              textTransform: "uppercase",
              fontWeight: 700,
              marginBottom: 6,
            }}
          >
            {k.label}
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1,
              marginBottom: 4,
            }}
          >
            {k.value}
          </div>
          <div style={{ fontSize: 11, color: "#9ca3af", lineHeight: 1.4 }}>{k.sub}</div>
        </div>
      ))}
    </div>
  );
}
