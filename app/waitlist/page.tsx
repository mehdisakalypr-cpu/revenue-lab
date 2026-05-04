// REVENUE-LAB waitlist landing — pre-launch page for Founder's Club signups (stage 5.5).
// Captures email + niche + audience size, persists to revenue-lab.waitlist table,
// triggers welcome email via Resend (TODO once SMTP is wired). Mandatory before
// Stripe-live (post-LLC) so we can warm up an audience pre-launch.

"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [niche, setNiche] = useState("");
  const [audience, setAudience] = useState<string>("");
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, niche, audience: audience ? Number(audience) : null }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || `HTTP ${res.status}`);
      }
      setState("success");
    } catch (err: unknown) {
      const m = err instanceof Error ? err.message : "Erreur inconnue";
      setErrorMsg(m);
      setState("error");
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0F0A1F 0%, #1F1535 100%)",
        color: "#FFFFFF",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        padding: "80px 24px",
      }}
    >
      <section style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
        <h1 style={{ fontSize: 44, fontWeight: 700, marginBottom: 16, lineHeight: 1.15 }}>
          Rejoins la <span style={{ color: "#C9A84C" }}>Founder&apos;s Club</span> REVENUE-LAB
        </h1>
        <p style={{ fontSize: 18, color: "#D1D5DB", marginBottom: 40, lineHeight: 1.6 }}>
          SaaS — refine tagline per-slug
          Lancement réservé aux 200 premiers inscrits avec accès gratuit Pro pendant 3 mois.
        </p>

        {state === "success" ? (
          <div
            style={{
              background: "rgba(16, 185, 129, 0.12)",
              border: "1px solid rgba(16, 185, 129, 0.45)",
              borderRadius: 12,
              padding: "24px 20px",
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>✓ Tu es sur la waitlist</div>
            <div style={{ color: "#D1D5DB" }}>
              On t&apos;envoie un email avant le lancement avec ton accès Founder&apos;s Club.
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <input
              type="email"
              required
              placeholder="ton@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />
            <input
              type="text"
              required
              placeholder="Ta niche (vins, fintech B2B, proptech, RH…)"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              style={inputStyle}
            />
            <input
              type="number"
              min={0}
              placeholder="Taille audience actuelle (optionnel)"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              style={inputStyle}
            />
            <button
              type="submit"
              disabled={state === "submitting"}
              style={{
                background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)",
                color: "#FFFFFF",
                border: "none",
                borderRadius: 10,
                padding: "16px 24px",
                fontSize: 17,
                fontWeight: 600,
                cursor: state === "submitting" ? "wait" : "pointer",
                opacity: state === "submitting" ? 0.6 : 1,
                marginTop: 6,
              }}
            >
              {state === "submitting" ? "Inscription…" : "Rejoindre la waitlist"}
            </button>
            {state === "error" && (
              <div style={{ color: "#EF4444", fontSize: 14, marginTop: 8 }}>{errorMsg}</div>
            )}
          </form>
        )}

        <div style={{ marginTop: 32, fontSize: 13, color: "#9CA3AF" }}>
          Aucune carte requise · GDPR · opt-out 1 clic à tout moment.
        </div>
      </section>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  background: "#1F1535",
  border: "1px solid #374151",
  borderRadius: 10,
  padding: "14px 16px",
  fontSize: 16,
  color: "#FFFFFF",
  fontFamily: "inherit",
};
