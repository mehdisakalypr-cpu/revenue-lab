import Link from "next/link";

export default function HubFooter() {
  const cur = new Date().getFullYear();
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "32px 24px", background: "#0A0716" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 13, color: "#9CA3AF" }}>
          © {cur} RevenueLab by{" "}
          <a href="https://gapup.io" style={{ color: "#06B6D4", textDecoration: "none" }}>gapup.io</a>
          {" · "}
          <Link href="/cgu" style={{ color: "#9CA3AF", textDecoration: "none" }}>CGU</Link>
          {" · "}
          <Link href="/cgv" style={{ color: "#9CA3AF", textDecoration: "none" }}>CGV</Link>
          {" · "}
          <Link href="/mentions" style={{ color: "#9CA3AF", textDecoration: "none" }}>Mentions légales</Link>
          {" · "}
          <Link href="/privacy" style={{ color: "#9CA3AF", textDecoration: "none" }}>Privacy</Link>
        </div>
        <div style={{ fontSize: 12, color: "#6B7280" }}>
          1 SaaS du portfolio Gapup · 49 SaaS · Un compte. Une carte. Une facture.
        </div>
      </div>
    </footer>
  );
}
