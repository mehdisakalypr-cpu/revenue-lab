'use client'

import type { CSSProperties } from 'react'
import { useEffect, useState } from 'react'

const ACCENT = '#8B5CF6'
const BRAND = 'revenue-lab'

type Snapshot = {
  llm_spend_mtd_eur: number
  infra_spend_mtd_eur: number
  mrr_eur: number
  reports_mtd: number
  budget_cap_eur: number
  guard: { paused: boolean; reason: string | null }
  infra_breakdown: { vercel_eur: number; supabase_eur: number; resend_eur: number; stripe_fees_eur: number }
  fetched_at: string | null
  source: 'live' | 'scaffold'
}

const SCAFFOLD: Snapshot = {
  llm_spend_mtd_eur: 0,
  infra_spend_mtd_eur: 0,
  mrr_eur: 0,
  reports_mtd: 0,
  budget_cap_eur: 0,
  guard: { paused: false, reason: null },
  infra_breakdown: { vercel_eur: 0, supabase_eur: 0, resend_eur: 0, stripe_fees_eur: 0 },
  fetched_at: null,
  source: 'scaffold',
}

export default function FinanceDashboard() {
  const [data, setData] = useState<Snapshot>(SCAFFOLD)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/finance', { cache: 'no-store' })
      .then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`)))
      .then((d: Partial<Snapshot>) => setData({ ...SCAFFOLD, ...d, source: 'live', fetched_at: new Date().toISOString() }))
      .catch(e => setErr(String(e?.message || e)))
  }, [])

  const total = data.llm_spend_mtd_eur + data.infra_spend_mtd_eur
  const pctMrr = data.mrr_eur > 0 ? (total / data.mrr_eur) * 100 : null
  const margin = data.mrr_eur > 0 ? ((data.mrr_eur - total) / data.mrr_eur) * 100 : null

  return (
    <div style={{ minHeight: '100vh', background: '#0A0E1A', color: '#fff', padding: 24 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <header style={{ marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ fontSize: 12, color: ACCENT, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>{BRAND} · admin</div>
            <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0 }}>Finance — Pilote dual-cost</h1>
            <p style={{ fontSize: 13, color: '#94A3B8', marginTop: 6 }}>LLM tokens × infra (Vercel/Supabase/Resend/Stripe-fees) en temps réel</p>
          </div>
          <span style={badge(data.source === 'live' ? '#22C55E' : '#F59E0B')}>{data.source === 'live' ? 'LIVE' : 'SCAFFOLD'}</span>
        </header>

        {data.source === 'scaffold' && (
          <div style={notice('#F59E0B')}>
            <strong>Scaffold non câblé.</strong> Cette page est rendue par le rollout factory pour passer le gate 7.7
            (mandate <code style={code()}>feedback_saas_economics_dual_pilot.md</code>). Wiring requis avant Stripe live :
            <ol style={{ marginTop: 8, paddingLeft: 20, lineHeight: 1.7, fontSize: 13 }}>
              <li>Endpoint <code style={code()}>/api/admin/finance</code> qui agrège LLM cost + infra spend MTD.</li>
              <li>Hard-cap unifié si <code style={code()}>(llm + infra) ≥ 50% MRR</code> → guard.paused=true.</li>
              <li>Auth founder-only (RLS ou middleware).</li>
            </ol>
          </div>
        )}

        {err && data.source === 'scaffold' && (
          <div style={notice('#64748B')}>
            <span style={{ fontSize: 12 }}>API <code style={code()}>/api/admin/finance</code> inexistant — affichage vide attendu : {err}</span>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginBottom: 16 }}>
          <Kpi label="LLM tokens MTD" value={fmtEur(data.llm_spend_mtd_eur)} accent={ACCENT} />
          <Kpi label="Infra MTD" value={fmtEur(data.infra_spend_mtd_eur)} />
          <Kpi label="Total MTD" value={fmtEur(total)} highlight />
          <Kpi label="MRR" value={fmtEur(data.mrr_eur)} />
          <Kpi label="% MRR" value={pctMrr === null ? '—' : `${pctMrr.toFixed(1)}%`}
               warn={pctMrr !== null && pctMrr >= 50} />
          <Kpi label="Marge brute" value={margin === null ? '—' : `${margin.toFixed(1)}%`}
               warn={margin !== null && margin < 50} />
        </div>

        <section style={card()}>
          <h2 style={h2()}>Infra breakdown</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 8 }}>
            <Line label="Vercel"          value={fmtEur(data.infra_breakdown.vercel_eur)} />
            <Line label="Supabase"        value={fmtEur(data.infra_breakdown.supabase_eur)} />
            <Line label="Resend"          value={fmtEur(data.infra_breakdown.resend_eur)} />
            <Line label="Stripe fees"     value={fmtEur(data.infra_breakdown.stripe_fees_eur)} />
          </div>
        </section>

        <section style={{ ...card(), marginTop: 12 }}>
          <h2 style={h2()}>Hard-cap guard</h2>
          {data.guard.paused
            ? <p style={{ color: '#F87171', fontSize: 14 }}>⛔ PAUSED · {data.guard.reason || 'no reason'}</p>
            : <p style={{ color: '#22C55E', fontSize: 14 }}>✓ Active — pas de hard-cap déclenché</p>}
          <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 8 }}>
            Cap budgétaire : <strong>{fmtEur(data.budget_cap_eur)}</strong> · rapports MTD : <strong>{data.reports_mtd}</strong>
          </p>
        </section>
      </div>
    </div>
  )
}

function Kpi({ label, value, accent, highlight, warn }: { label: string; value: string; accent?: string; highlight?: boolean; warn?: boolean }) {
  const color = warn ? '#F87171' : highlight ? '#fff' : '#E2E8F0'
  const border = accent ? `${accent}55` : warn ? '#F8717155' : 'rgba(255,255,255,0.08)'
  return (
    <div style={{ ...card(), padding: 14, borderColor: border, borderStyle: 'solid', borderWidth: 1 }}>
      <div style={{ fontSize: 11, color: '#94A3B8', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 700, color }}>{value}</div>
    </div>
  )
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: '#0F172A', borderRadius: 8, fontSize: 13 }}>
      <span style={{ color: '#94A3B8' }}>{label}</span>
      <span style={{ color: '#fff', fontWeight: 500 }}>{value}</span>
    </div>
  )
}

function fmtEur(n: number): string {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
}

function card(): CSSProperties {
  return { background: '#0F172A', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 18 }
}
function h2(): CSSProperties {
  return { fontSize: 14, fontWeight: 600, color: '#E2E8F0', margin: '0 0 12px 0' }
}
function badge(color: string): CSSProperties {
  return { fontSize: 11, fontWeight: 700, color, border: `1px solid ${color}55`, padding: '4px 10px', borderRadius: 999, letterSpacing: 0.5 }
}
function notice(color: string): CSSProperties {
  return { background: `${color}11`, border: `1px solid ${color}55`, borderRadius: 12, padding: 14, marginBottom: 16, color: '#E2E8F0', fontSize: 13, lineHeight: 1.5 }
}
function code(): CSSProperties {
  return { background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: 4, fontSize: 12, fontFamily: 'monospace' }
}
