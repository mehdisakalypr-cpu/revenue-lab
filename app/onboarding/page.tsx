'use client'

import type { CSSProperties } from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const ACCENT = '#8B5CF6'
const BRAND = 'revenue-lab'
const TAGLINE = 'Auto-generated placeholder — refine in spec.md'
const SECTOR_DEFAULT = 'B2B SaaS'
const CLUSTER = 'rapport-analyse'

type Step = 'welcome' | 'sector' | 'brief' | 'ready'
const STEPS: Step[] = ['welcome', 'sector', 'brief', 'ready']

const SECTORS = [
  'B2B SaaS', 'E-commerce', 'Fintech', 'Health & Pharma', 'Industry & Manufacturing',
  'Energy & Utilities', 'Agriculture & Food', 'Retail', 'Real Estate', 'Education',
  'Media & Entertainment', 'Logistics & Supply Chain', 'Legal & Compliance',
  'Construction', 'Telecom', 'Public sector', 'Non-profit', 'Other',
]

const BRIEF_PROMPT: Record<string, string> = {
  'rapport-analyse':       'Quels sont les 3-5 concurrents ou marques que tu veux suivre ?',
  'newsletter-email':      'Quels sont les 3-5 thèmes ou audiences cibles de ta newsletter ?',
  'pitch-deck':            'Quel est le contexte de la levée (montant, stade, deal type) ?',
  'business-plan':         'Quelle est la nature du dossier (BPI / Banque / VC / CIR) et l’objectif financement ?',
  'compliance':            'Quels référentiels veux-tu couvrir (RGPD / DORA / EU-AI / NIS2 / ESRS ...) ?',
  'audit-legal':           'Quelles juridictions et périmètres juridiques (FR / EU / US / autre) ?',
  'forecast':              'Quels KPI veux-tu projeter (revenu, churn, runway, trésorerie ...) ?',
  'classification':        'Quel est le type de données ou contenus à classifier ?',
  'video':                 'Décris le format cible (durée, plateforme, ton, langues) ?',
  'glossaire':             'Quel est le domaine technique du glossaire et les langues cibles ?',
}

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('welcome')
  const [form, setForm] = useState({
    sector: SECTOR_DEFAULT || '',
    brief: '',
    name: '',
    company: '',
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const raw = window.localStorage.getItem('revenue_lab_onboarding')
    if (raw) try { setForm({ ...form, ...JSON.parse(raw) }) } catch {}
  }, []) // eslint-disable-line

  function persist(next: typeof form) {
    setForm(next)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('revenue_lab_onboarding', JSON.stringify(next))
    }
  }

  function finish() {
    setSaving(true)
    persist(form)
    router.push('/service/setup')
  }

  const briefPrompt = BRIEF_PROMPT[CLUSTER] || 'Décris en 1-2 phrases ton besoin principal.'
  const stepIdx = STEPS.indexOf(step)

  return (
    <div style={{ minHeight: '100vh', background: '#0A0E1A', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ width: '100%', maxWidth: 560 }}>
        {/* progress dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 24 }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{
              width: 10, height: 10, borderRadius: '50%',
              background: stepIdx === i ? ACCENT : (i < stepIdx ? '#22C55E' : '#1F2937'),
              transition: 'background 200ms',
            }} />
          ))}
        </div>

        <div style={{ background: '#0F172A', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 28 }}>

          {step === 'welcome' && (
            <>
              <div style={{ fontSize: 12, letterSpacing: 1, color: ACCENT, textTransform: 'uppercase', marginBottom: 8 }}>Bienvenue</div>
              <h1 style={{ fontSize: 26, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{BRAND}</h1>
              <p style={{ fontSize: 15, color: '#94A3B8', marginBottom: 20, lineHeight: 1.5 }}>{TAGLINE}</p>
              <p style={{ fontSize: 14, color: '#CBD5E1', marginBottom: 24 }}>
                4 étapes pour configurer ton compte et générer ton premier livrable.
              </p>
              <button onClick={() => setStep('sector')} style={btn(ACCENT)}>Commencer →</button>
            </>
          )}

          {step === 'sector' && (
            <>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Ton secteur</h1>
              <p style={{ fontSize: 14, color: '#94A3B8', marginBottom: 20 }}>On adapte le ton et les références à ton industrie.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
                {SECTORS.map(s => (
                  <button key={s} onClick={() => persist({ ...form, sector: s })}
                    style={chip(form.sector === s, ACCENT)}>{s}</button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => setStep('welcome')} style={btnGhost()}>← Retour</button>
                <button onClick={() => setStep('brief')} disabled={!form.sector} style={{ ...btn(ACCENT), flex: 1, opacity: form.sector ? 1 : 0.4 }}>Continuer →</button>
              </div>
            </>
          )}

          {step === 'brief' && (
            <>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Ton brief</h1>
              <p style={{ fontSize: 14, color: '#94A3B8', marginBottom: 20 }}>{briefPrompt}</p>
              <textarea value={form.brief}
                onChange={e => persist({ ...form, brief: e.target.value })}
                rows={4}
                placeholder="Tape librement — tu pourras affiner ensuite."
                style={{ width: '100%', background: '#1E293B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 12, color: '#fff', fontSize: 14, marginBottom: 16, resize: 'vertical' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20 }}>
                <input value={form.name} onChange={e => persist({ ...form, name: e.target.value })}
                  placeholder="Prénom" style={inputStyle()} />
                <input value={form.company} onChange={e => persist({ ...form, company: e.target.value })}
                  placeholder="Société" style={inputStyle()} />
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => setStep('sector')} style={btnGhost()}>← Retour</button>
                <button onClick={() => setStep('ready')} disabled={form.brief.trim().length < 5} style={{ ...btn(ACCENT), flex: 1, opacity: form.brief.trim().length >= 5 ? 1 : 0.4 }}>Continuer →</button>
              </div>
            </>
          )}

          {step === 'ready' && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🚀</div>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Prêt !</h1>
              <p style={{ fontSize: 14, color: '#94A3B8', marginBottom: 24, lineHeight: 1.6 }}>
                Configuration enregistrée. On t'emmène vers le setup pour générer ton premier livrable.
              </p>
              <button onClick={finish} disabled={saving} style={btn(ACCENT)}>
                {saving ? 'Redirection…' : 'Aller au setup →'}
              </button>
              <button onClick={() => router.push('/dashboard')}
                style={{ marginTop: 12, fontSize: 12, color: '#64748B', background: 'transparent', border: 0, cursor: 'pointer', width: '100%' }}>
                Sauter — aller au dashboard
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

function btn(accent: string): CSSProperties {
  return { width: '100%', padding: '14px 16px', borderRadius: 12, border: 0, background: accent, color: '#0A0E1A', fontWeight: 600, fontSize: 14, cursor: 'pointer' }
}
function btnGhost(): CSSProperties {
  return { padding: '14px 18px', borderRadius: 12, background: 'transparent', color: '#94A3B8', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', fontSize: 13 }
}
function chip(active: boolean, accent: string): CSSProperties {
  return { padding: '8px 14px', borderRadius: 999, fontSize: 13, fontWeight: 500, cursor: 'pointer',
    background: active ? `${accent}22` : '#1E293B',
    color: active ? accent : '#94A3B8',
    border: `1px solid ${active ? `${accent}66` : 'transparent'}` }
}
function inputStyle(): CSSProperties {
  return { background: '#1E293B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 12px', color: '#fff', fontSize: 13, outline: 'none' }
}
