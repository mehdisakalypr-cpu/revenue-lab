import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RevenueLab — Modélise tes revenus SaaS en 1000 scénarios",
  description: "Monte Carlo financier pour B2B SaaS. ARPU/CAC/churn/LTV en 36 mois avec intervalles de confiance. Économise 1 CFO senior pour €299/mo.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body
        style={{
          margin: 0,
          fontFamily: "Inter, system-ui, -apple-system, sans-serif",
          background: "#0A0716",
          color: "#FFFFFF",
          minHeight: "100vh",
        }}
      >
        {children}
      </body>
    </html>
  );
}
