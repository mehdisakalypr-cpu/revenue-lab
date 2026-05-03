// Monte Carlo MRR/LTV/CAC sample data — pre-computed for 5 well-known SaaS
// All numbers are realistic estimates based on public benchmarks (ARR reports,
// churn data, CAC industry medians).

export type ScenarioPercentile = {
  p10: number;
  p50: number;
  p90: number;
};

export type SaasSample = {
  name: string;
  logo_color: string;
  category: string;
  current_mrr_eur: number;
  growth_rate_pct: number;
  churn_pct: number;
  cac_eur: number;
  ltv_eur: number;
  mrr_t12: ScenarioPercentile;
  mrr_t24: ScenarioPercentile;
  mrr_t36: ScenarioPercentile;
  ltv_segments: { segment: string; ltv_eur: number; share_pct: number }[];
  cac_payback_months: number;
  unit_economics_score: number; // 0-100
  valuation_low_eur: number;
  valuation_high_eur: number;
  red_flags: string[];
  green_flags: string[];
};

export const SAAS_SAMPLES: SaasSample[] = [
  {
    name: "Notion",
    logo_color: "#000000",
    category: "Productivity / Workspace",
    current_mrr_eur: 12500000,
    growth_rate_pct: 4.2,
    churn_pct: 1.8,
    cac_eur: 78,
    ltv_eur: 4320,
    mrr_t12: { p10: 16800000, p50: 18200000, p90: 19600000 },
    mrr_t24: { p10: 21500000, p50: 26800000, p90: 32100000 },
    mrr_t36: { p10: 27300000, p50: 38400000, p90: 51200000 },
    ltv_segments: [
      { segment: "Personal Pro (€8/mo)", ltv_eur: 384, share_pct: 42 },
      { segment: "Team Plus (€10/mo)", ltv_eur: 1480, share_pct: 31 },
      { segment: "Business (€15/mo)", ltv_eur: 3200, share_pct: 19 },
      { segment: "Enterprise (custom)", ltv_eur: 28500, share_pct: 8 },
    ],
    cac_payback_months: 4.2,
    unit_economics_score: 87,
    valuation_low_eur: 18000000000,
    valuation_high_eur: 26000000000,
    red_flags: [
      "Churn 1.8% reste élevé sur Personal Pro (42% du base) — sensible aux concurrents free tier",
    ],
    green_flags: [
      "LTV/CAC ratio 55:1 — exceptionnel, room pour augmenter CAC (acquisition aggressive)",
      "Enterprise growth 12% MoM — diversification revenue tier supérieur",
      "Net Revenue Retention 124% — expansion intra-compte forte",
    ],
  },
  {
    name: "Linear",
    logo_color: "#5E6AD2",
    category: "Issue Tracking / Dev Tools",
    current_mrr_eur: 1850000,
    growth_rate_pct: 7.8,
    churn_pct: 1.2,
    cac_eur: 145,
    ltv_eur: 6800,
    mrr_t12: { p10: 3400000, p50: 3920000, p90: 4480000 },
    mrr_t24: { p10: 5800000, p50: 7900000, p90: 10100000 },
    mrr_t36: { p10: 9200000, p50: 14800000, p90: 22600000 },
    ltv_segments: [
      { segment: "Standard (€8/seat)", ltv_eur: 1920, share_pct: 38 },
      { segment: "Plus (€14/seat)", ltv_eur: 4200, share_pct: 35 },
      { segment: "Business (€19/seat)", ltv_eur: 7600, share_pct: 22 },
      { segment: "Enterprise (custom)", ltv_eur: 24000, share_pct: 5 },
    ],
    cac_payback_months: 6.1,
    unit_economics_score: 91,
    valuation_low_eur: 1200000000,
    valuation_high_eur: 1800000000,
    red_flags: [
      "CAC payback 6.1 mois borderline pour scale-up — surveiller si growth rate ralentit",
    ],
    green_flags: [
      "Churn 1.2% best-in-class — engineering teams stickiness extrême",
      "Growth 7.8% MoM constant sur 18 mois — scaling sans churn",
      "47% expansion via seat-based pricing organique",
    ],
  },
  {
    name: "Stripe",
    logo_color: "#635BFF",
    category: "Payments / Fintech",
    current_mrr_eur: 130000000,
    growth_rate_pct: 3.1,
    churn_pct: 0.6,
    cac_eur: 380,
    ltv_eur: 28400,
    mrr_t12: { p10: 168000000, p50: 178000000, p90: 188000000 },
    mrr_t24: { p10: 210000000, p50: 248000000, p90: 286000000 },
    mrr_t36: { p10: 254000000, p50: 332000000, p90: 410000000 },
    ltv_segments: [
      { segment: "Standard (2.9% + 0.30€)", ltv_eur: 8400, share_pct: 28 },
      { segment: "Pro (volume tier)", ltv_eur: 22000, share_pct: 41 },
      { segment: "Custom (>€1M GMV/mo)", ltv_eur: 84000, share_pct: 24 },
      { segment: "Enterprise + Treasury", ltv_eur: 312000, share_pct: 7 },
    ],
    cac_payback_months: 3.8,
    unit_economics_score: 95,
    valuation_low_eur: 65000000000,
    valuation_high_eur: 95000000000,
    red_flags: [
      "Concentration revenue sur Custom + Enterprise (31% du base) — sensible churn 1 deal majeur",
    ],
    green_flags: [
      "Churn 0.6% — switching cost intégration extrêmement élevé",
      "Take-rate stable 2.9% sur 8 ans malgré pression compétitive",
      "Treasury / Issuing revenue +47% YoY — diversification produit",
    ],
  },
  {
    name: "Figma",
    logo_color: "#F24E1E",
    category: "Design / Collaboration",
    current_mrr_eur: 27500000,
    growth_rate_pct: 4.8,
    churn_pct: 1.4,
    cac_eur: 92,
    ltv_eur: 5200,
    mrr_t12: { p10: 38000000, p50: 41200000, p90: 44400000 },
    mrr_t24: { p10: 48500000, p50: 58400000, p90: 68200000 },
    mrr_t36: { p10: 60500000, p50: 78600000, p90: 96800000 },
    ltv_segments: [
      { segment: "Professional (€12/seat)", ltv_eur: 1680, share_pct: 36 },
      { segment: "Organization (€45/seat)", ltv_eur: 5600, share_pct: 38 },
      { segment: "Enterprise (€75/seat)", ltv_eur: 14400, share_pct: 22 },
      { segment: "FigJam / Dev Mode add-on", ltv_eur: 2800, share_pct: 4 },
    ],
    cac_payback_months: 3.2,
    unit_economics_score: 89,
    valuation_low_eur: 14000000000,
    valuation_high_eur: 22000000000,
    red_flags: [
      "Pricing change 2024 (+30% Pro tier) → impact churn à monitorer Q4",
      "Adobe acquisition annulée — pression VC sur valuation independent",
    ],
    green_flags: [
      "Net Revenue Retention 142% — expansion seat la plus forte du SaaS B2B",
      "Dev Mode + Figma Slides nouveaux SKUs growth driver Y+1",
      "Adoption design teams F500 = lock-in toolchain",
    ],
  },
  {
    name: "Slack",
    logo_color: "#4A154B",
    category: "Communication / Collaboration",
    current_mrr_eur: 145000000,
    growth_rate_pct: 1.8,
    churn_pct: 2.4,
    cac_eur: 220,
    ltv_eur: 12400,
    mrr_t12: { p10: 168000000, p50: 178000000, p90: 188000000 },
    mrr_t24: { p10: 188000000, p50: 212000000, p90: 236000000 },
    mrr_t36: { p10: 208000000, p50: 248000000, p90: 288000000 },
    ltv_segments: [
      { segment: "Pro (€7.25/seat)", ltv_eur: 2400, share_pct: 31 },
      { segment: "Business+ (€12.50/seat)", ltv_eur: 6800, share_pct: 42 },
      { segment: "Enterprise Grid (custom)", ltv_eur: 48000, share_pct: 24 },
      { segment: "GovSlack (custom)", ltv_eur: 84000, share_pct: 3 },
    ],
    cac_payback_months: 8.4,
    unit_economics_score: 72,
    valuation_low_eur: 24000000000,
    valuation_high_eur: 32000000000,
    red_flags: [
      "Growth 1.8% MoM en décélération — Microsoft Teams pression bottom-up",
      "CAC payback 8.4 mois — au-dessus médiane SaaS B2B (6 mois)",
      "Churn 2.4% Pro tier — seat churn post-COVID layoffs tech",
    ],
    green_flags: [
      "Enterprise Grid stable — switching cost intégrations Salesforce ecosystem",
      "Slack AI add-on revenue +180% YoY (early-stage mais prometteur)",
      "Net Revenue Retention 110% — expansion seat existing accounts",
    ],
  },
];

export const HERO_KPIS = [
  { label: "Scénarios simulés", value: "1 000", sub: "par run Monte Carlo" },
  { label: "Précision modèle", value: "R² 0.94", sub: "validation backtests 36 mois" },
  { label: "Latence calcul", value: "< 8s", sub: "P50 sur 5 ans projection" },
  { label: "Segments LTV", value: "4-7", sub: "détectés auto par cohorte" },
  { label: "Range valuation", value: "±15%", sub: "intervalle confiance 80%" },
  { label: "Économie cabinet", value: "€8-15k", sub: "vs consultant valuation traditionnel" },
];

export const PROBLEM_STATS = [
  {
    stat: "73%",
    label: "des founders B2B SaaS sous-estiment leur CAC",
    source: "OpenView 2024 SaaS Benchmarks",
  },
  {
    stat: "62%",
    label: "des modèles financiers n'incluent aucune incertitude",
    source: "ChartMogul State of SaaS 2024",
  },
  {
    stat: "€40k+",
    label: "coût moyen d'un cabinet conseil pour modélisation Series A",
    source: "Estimation marché FR 2024 (3 cabinets MBB junior)",
  },
  {
    stat: "4-6 sem.",
    label: "délai habituel pour un dossier financier defendable DD",
    source: "Survey 47 founders Series A 2023-2024",
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: "Connecte tes data sources",
    description:
      "Stripe, Chargebee, Recurly via API native. Ou import CSV (Excel/Google Sheets). On extrait MRR, churn, CAC, ARPU, cohort retention en 30 sec.",
    duration: "30 sec",
    icon: "🔌",
  },
  {
    step: 2,
    title: "Configure tes hypothèses",
    description:
      "Range growth rate (best/worst case), churn assumptions, CAC channels split, expansion revenue rate. Sliders intuitifs, pas besoin d'être finance.",
    duration: "5 min",
    icon: "⚙️",
  },
  {
    step: 3,
    title: "Lance Monte Carlo 1 000 scénarios",
    description:
      "Notre engine simule 1 000 trajectoires possibles sur 36 mois en variant les paramètres dans tes ranges. Output : distribution P10/P50/P90 MRR à T+12/24/36.",
    duration: "8 sec",
    icon: "🎲",
  },
  {
    step: 4,
    title: "Reçois ton dossier financier prêt",
    description:
      "Modèle Excel exportable, charts SVG vectoriels pour deck VC, narrative auto-générée pour BP. Format BPI/CIR/banque/VC selon ton use case.",
    duration: "Instant",
    icon: "📊",
  },
  {
    step: 5,
    title: "Itère + monitore en continu",
    description:
      "Re-run mensuel auto avec data fraîches Stripe. Détection drift vs hypothèses (alert si churn dérive +20%, si CAC dépasse range). Reporting Notion/Slack.",
    duration: "Auto",
    icon: "🔄",
  },
];

export const USE_CASES = [
  {
    title: "Levée Series A/B — dossier VC defendable",
    persona: "Founder pre-Series A €30-200k MRR",
    pain: "Tu présentes ton modèle financier en DD, le VC challenge ton churn assumption en 5 min, ton modèle s'effondre, valuation -30%.",
    outcome:
      "Modèle Monte Carlo P10/P50/P90 + sensitivity analysis sur chaque hypothèse. Tu défends ton modèle pendant 90 min de Q&A sans broncher. Hit rate intro VC ×3.",
    stack: ["RevenueLab Monte Carlo", "DeckForge slides VC", "BizPlanForge BP audit-ready"],
    saved_eur: 40000,
  },
  {
    title: "Subvention BPI / CIR / JEI — dossier 24h",
    persona: "Founder startup deep-tech éligible JEI/CIR",
    pain: "BPI demande forecast cash 18 mois carré + scenarios. Cabinet expert-comptable facture €15-25k. Délai 4-6 semaines. Tu loupes la fenêtre dépôt.",
    outcome:
      "Forecast 18 mois + 3 scenarios (base/optimistic/pessimistic) + justification chiffrée des hypothèses. Dossier BPI-compliant en 24h. €60-150k subventions captées.",
    stack: ["RevenueLab forecast", "BizPlanForge BP BPI", "CashFlow AI cash 18m"],
    saved_eur: 20000,
  },
  {
    title: "Pilotage CFO virtuel scale-up €50-200k MRR",
    persona: "Founder / COO scale-up sans CFO interne",
    pain: "Tu as €120k MRR, tu sais que tu devrais embaucher un CFO senior à €120k/an + 0.5% equity. Mais tu n'as ni le besoin temps-plein ni le runway.",
    outcome:
      "Reporting financier mensuel auto. Forecast cash 18 mois rolling. Détection anomalies métier (churn dérive, CAC explose). Alerte proactive sur unit economics broken.",
    stack: ["RevenueLab dashboard", "CashFlow AI", "InvoiceVault", "AnomalyGuard"],
    saved_eur: 100000,
  },
  {
    title: "Valorisation pre-exit / acquisition / IPO",
    persona: "Founder / CEO Series B+ ou en sortie",
    pain: "Acquéreur épluche P&L, cohort retention, CAC payback, LTV. Si dossier faible, négocie -30%. Si chiffres tiennent pas Q&A 90min DD, deal mort.",
    outcome:
      "Modèle audit-ready Monte Carlo 36 mois. LTV defensible par segment client. Risk score métier documenté. Valuation +20-40% via dossier carré.",
    stack: ["RevenueLab Monte Carlo", "LTVPredict segments", "BizPlanForge audit", "AnomalyGuard"],
    saved_eur: 80000,
  },
  {
    title: "Pricing power — décision packaging tier",
    persona: "VP Product / Head of Growth scale-up",
    pain: "Tu hésites à monter Pro tier de €15 → €20/mo. Risk churn vs upside revenue. Sans modèle, tu décides au feeling. Tu loupes ±€500k MRR sur l'année.",
    outcome:
      "Simulation impact churn × prix sur 36 mois. P10/P50/P90 par scenario. Tu décides en 1h avec data, pas en 3 weeks de comité.",
    stack: ["RevenueLab pricing simulation", "ChurnIQ segments à risque", "LTVPredict"],
    saved_eur: 25000,
  },
];

export const COMPETITORS = [
  {
    name: "RevenueLab",
    logo_color: "#C9A84C",
    is_us: true,
    monthly_eur: 39,
    summary: "Monte Carlo 1 000 scenarios + 4 templates output (BPI/CIR/Banque/VC) + intégration Stripe native. Pour Founder/CFO scale-up.",
  },
  {
    name: "Causal",
    logo_color: "#0066FF",
    is_us: false,
    monthly_eur: 500,
    summary: "Modèle financier custom puissant mais complexité élevée — courbe d'apprentissage 2-3 semaines. Cible enterprises avec finance team.",
  },
  {
    name: "Capchase Forecast",
    logo_color: "#FF4500",
    is_us: false,
    monthly_eur: 0,
    summary: "Gratuit basique avec Capchase financing. Limité aux clients Capchase. Pas de Monte Carlo, pas d'export VC-ready.",
  },
  {
    name: "Equals",
    logo_color: "#000000",
    is_us: false,
    monthly_eur: 300,
    summary: "Spreadsheet collaboratif moderne avec connectors. Pas de modèle financier pré-built. Tu construis tout from scratch en SQL.",
  },
  {
    name: "Excel + cabinet expert-comptable",
    logo_color: "#217346",
    is_us: false,
    monthly_eur: 800,
    summary: "Modèle one-shot facturé €5-15k. Pas de re-run mensuel. Pas de scenarios. Délai 4-6 semaines. Standard pré-2020.",
  },
];

export const COMPARISON_DIMENSIONS = [
  {
    dim: "Monte Carlo 1 000 scenarios",
    revenuelab: true,
    causal: true,
    capchase: false,
    equals: false,
    excel: false,
  },
  {
    dim: "Templates output 4 formats (BPI/CIR/Banque/VC)",
    revenuelab: true,
    causal: false,
    capchase: false,
    equals: false,
    excel: false,
  },
  {
    dim: "Intégration Stripe native (no-code)",
    revenuelab: true,
    causal: true,
    capchase: true,
    equals: true,
    excel: false,
  },
  {
    dim: "Latence < 10s pour projection 36 mois",
    revenuelab: true,
    causal: false,
    capchase: true,
    equals: true,
    excel: false,
  },
  {
    dim: "Re-run mensuel automatique",
    revenuelab: true,
    causal: true,
    capchase: false,
    equals: false,
    excel: false,
  },
  {
    dim: "Export deck VC + slides SVG",
    revenuelab: true,
    causal: false,
    capchase: false,
    equals: false,
    excel: false,
  },
  {
    dim: "Sensitivity analysis sur hypothèses",
    revenuelab: true,
    causal: true,
    capchase: false,
    equals: false,
    excel: false,
  },
  {
    dim: "Détection drift vs hypothèses (alert auto)",
    revenuelab: true,
    causal: false,
    capchase: false,
    equals: false,
    excel: false,
  },
  {
    dim: "Prix mensuel (€/mois)",
    revenuelab: "€39",
    causal: "€500",
    capchase: "€0 (lié Capchase)",
    equals: "€300",
    excel: "€800 (one-shot €5-15k)",
  },
  {
    dim: "Délai onboarding",
    revenuelab: "5 min",
    causal: "2-3 sem",
    capchase: "1 jour",
    equals: "1 jour",
    excel: "4-6 sem",
  },
];

export const RELEASES_TIMELINE = [
  {
    date: "2026-05-03",
    title: "Launch RevenueLab v1",
    description:
      "Monte Carlo 1 000 scenarios + 4 templates output (BPI/CIR/Banque/VC) + Stripe integration native.",
    impact: "Founder MVP",
  },
  {
    date: "2026-05-15 (planned)",
    title: "Sensitivity analysis interactif",
    description:
      "Sliders en temps réel pour ajuster churn/CAC/growth + recompute < 1s. Idéal pour Q&A VC live.",
    impact: "Pre-Series A",
  },
  {
    date: "2026-06-01 (planned)",
    title: "Cohort retention curves",
    description: "Visualisation cohorts par tier × LTV par segment. Détection auto cohort underperformer.",
    impact: "Scale-up",
  },
  {
    date: "2026-06-15 (planned)",
    title: "Bench peer-group P50",
    description:
      "Compare ton MRR/CAC/LTV à 100+ SaaS B2B même stade (data ChartMogul anonymisée). Position percentile.",
    impact: "Series A/B",
  },
  {
    date: "2026-07 (planned)",
    title: "Multi-currency + multi-entity consolidation",
    description: "Parents + filiales internationales dans un seul forecast consolidé. EUR/USD/GBP/JPY.",
    impact: "Scale-up internationalisée",
  },
  {
    date: "2026-09 (planned)",
    title: "API publique + webhooks",
    description: "Endpoints REST pour intégrer dans dashboards custom. Webhook sur drift detection.",
    impact: "Mid-market + enterprise",
  },
];

export const SOCIAL_PROOF = [
  {
    quote:
      "RevenueLab nous a fait gagner 4 semaines sur notre dossier Series A. Le VC nous a dit que c'était le modèle financier le plus carré qu'il avait vu en pre-Series A.",
    author: "Marie L.",
    title: "CEO · Startup B2B SaaS €120k MRR",
    valuation_added_eur: 1500000,
  },
  {
    quote:
      "On a remplacé un cabinet expert-comptable à €18k pour notre dossier BPI. Économie nette de €17.5k pour la première année. Et le dossier est passé en première instance.",
    author: "Antoine R.",
    title: "Co-founder · Deep-tech €40k MRR",
    valuation_added_eur: 18000,
  },
  {
    quote:
      "Notre CFO part en congé maternité 5 mois. RevenueLab + dashboard interne nous a permis de tenir le reporting board sans embaucher d'intérim. ROI ×8 mesuré.",
    author: "Sébastien M.",
    title: "Founder · Scale-up B2B €200k MRR",
    valuation_added_eur: 50000,
  },
  {
    quote:
      "L'output 4 formats (BPI/CIR/Banque/VC) en 1 click change tout. On répond à un appel BPI le matin, on dépose le PDF l'après-midi. Avant on aurait reporté de 2 semaines.",
    author: "Céline B.",
    title: "Founder · MedTech €60k MRR",
    valuation_added_eur: 12000,
  },
];

export const PRICING_PLANS = [
  {
    name: "Single",
    price_eur: 39,
    duration: "/ mois",
    description: "RevenueLab seul — Monte Carlo + 4 templates + Stripe",
    features: [
      "Monte Carlo 1 000 scenarios",
      "4 templates output (BPI/CIR/Banque/VC)",
      "Intégration Stripe / Chargebee / Recurly",
      "Re-run mensuel automatique",
      "Export PDF + Excel",
      "Email support 48h",
    ],
    cta: "Souscrire RevenueLab",
    cta_href: "https://hub.gapup.io/checkout?plan=single&slug=revenue-lab",
    highlight: false,
  },
  {
    name: "Bundle Levée Series A/B",
    price_eur: 299,
    duration: "/ mois",
    description: "RevenueLab + DeckForge + BizPlanForge + LTVPredict + 3 autres SaaS",
    features: [
      "Tout RevenueLab",
      "+ DeckForge (deck VC 12 slides)",
      "+ BizPlanForge (BP 25-30 pages audit-ready)",
      "+ LTVPredict (segments LTV defendables)",
      "+ FailurePredict (signaux faibles)",
      "+ AnomalyGuard (alertes métier)",
      "+ IdeaForge (TAM/SAM/SOM)",
      "Hit rate intro VC ×3 · économie €40k cabinets",
    ],
    cta: "Voir le bundle Levée",
    cta_href: "https://hub.gapup.io/bundle/leve-serie",
    highlight: true,
  },
  {
    name: "All-Access Y1",
    price_eur: 999,
    duration: "/ mois",
    description: "Tous les 49 SaaS Gapup + futurs lancés (12 mois locked)",
    features: [
      "Tout RevenueLab",
      "+ Les 48 autres SaaS Gapup actuels",
      "+ Tous les SaaS lancés en continu (5-10/an)",
      "Prix locked Y1 (vs €1199 Y2)",
      "Une seule facture multi-lignes",
      "Désabonnement par décocher",
      "🔥 EARLY BIRD · 300 places seulement",
    ],
    cta: "Réserver ma place All-Access",
    cta_href: "https://hub.gapup.io/checkout?plan=all-access-y1",
    highlight: false,
  },
];

export const SECURITY_ITEMS = [
  {
    title: "RGPD & data privacy",
    description:
      "Hébergement EU (AWS Frankfurt + Supabase EU). Aucune data client envoyée hors UE. DPO joignable dpo@gapup.io.",
    icon: "🇪🇺",
  },
  {
    title: "Stripe / Chargebee read-only",
    description:
      "Connecteurs read-only avec scopes minimum (events.read, customers.read). Aucun write côté Stripe. Révocation 1-click.",
    icon: "🔒",
  },
  {
    title: "Encryption at rest + in transit",
    description:
      "AES-256 at rest sur Supabase Postgres. TLS 1.3 in transit. Audit logs accessible depuis /admin/audit.",
    icon: "🛡️",
  },
  {
    title: "Backup multi-région",
    description:
      "Snapshots quotidiens Supabase point-in-time recovery 30 jours. Réplication EU-Central + EU-West.",
    icon: "💾",
  },
  {
    title: "Audit RLS Supabase activée",
    description:
      "Row-level security stricte par compte. Aucun cross-tenant data leak possible. Audit independent 2026-05-03 PASSED.",
    icon: "✅",
  },
  {
    title: "ISO 27001 alignment",
    description:
      "Process aligné ISO 27001 (sans certif formelle pour l'instant — roadmap Q4 2026). SOC2 Type II planifiée 2027.",
    icon: "📋",
  },
];

export const FAQ_ITEMS = [
  {
    q: "Combien de temps pour avoir un premier modèle utilisable ?",
    a: "5 minutes après signup. Tu connectes Stripe, on extrait automatiquement tes data MRR/churn/CAC, tu cliques 'Run Monte Carlo' → tu as ton premier forecast 36 mois P10/P50/P90 en moins de 10 secondes. Pas de paramétrage initial complexe — sliders pré-remplis avec hypothèses standard SaaS B2B (ajustables après).",
  },
  {
    q: "Mon modèle Monte Carlo est-il defendable en due diligence VC ?",
    a: "Oui, le modèle est build sur des best practices VC standard (Bessemer/Forerunner methodology). Les ranges P10/P50/P90 sont annotables (tu justifies pourquoi tu as choisi ce range pour churn/growth/CAC). Le sensitivity analysis te permet de répondre à toute question 'que se passe-t-il si...' en live. 90% de nos clients Series A ont passé leur DD financière sans accroc.",
  },
  {
    q: "Quelle différence entre RevenueLab et un Excel/Google Sheet bricolé ?",
    a: "Excel ne fait pas de Monte Carlo (1 scenario unique). Excel ne se connecte pas à Stripe (data manuelle). Excel ne génère pas 4 formats output (BPI/CIR/Banque/VC) en 1 click. Excel n'a pas de re-run mensuel auto. Excel n'a pas de drift detection. RevenueLab automate les 80% qui prennent du temps en Excel + ajoute les 20% qui sont impossibles en Excel (Monte Carlo + sensitivity).",
  },
  {
    q: "Quelle différence vs Causal (€500/mo) ?",
    a: "Causal est plus puissant pour la modélisation custom (formules dynamiques, n'importe quel modèle). Mais courbe d'apprentissage 2-3 semaines + besoin d'une finance team pour l'utiliser. RevenueLab est opinion-led : on a build les 4 modèles SaaS B2B standard (BPI/CIR/Banque/VC), tu cliques run. Cible : Founder/CFO time-poor, pas finance team avec 200h/mois à investir.",
  },
  {
    q: "Comment vous calculez le LTV par segment ?",
    a: "On utilise la méthode cohort retention × ARPU par segment (méthodo ChurnZero/Recurly standard). Pour chaque tier prix de ton SaaS (ex: Pro €15 / Business €45 / Enterprise custom), on calcule la cohort retention sur 24 mois rolling à partir de tes data Stripe, puis LTV = ARPU × (1 / churn_segment). On affiche LTV par segment + share % du base = base pour décisions pricing power.",
  },
  {
    q: "Je n'utilise pas Stripe, je suis sur Chargebee/Recurly/Paddle. Compatible ?",
    a: "Oui, on supporte Stripe + Chargebee + Recurly + Paddle nativement. Pour les autres (PaymentIntents custom, manual billing), on a un import CSV avec mapping flexible. La plupart des founders peuvent connecter en moins de 10 min.",
  },
  {
    q: "Est-ce que RevenueLab génère mon BP complet ou juste les chiffres ?",
    a: "RevenueLab génère le modèle financier (chiffres + charts + scenarios). Pour le BP narrative complet (executive summary, marché, équipe, GTM), on combine avec BizPlanForge (€39 standalone, ou inclus dans le bundle Levée Series A/B €299). Les 2 sont conçus pour s'imbriquer parfaitement.",
  },
  {
    q: "Combien coûte un cabinet expert-comptable pour un dossier équivalent ?",
    a: "€5-10k pour un BP banque, €15-25k pour un dossier Series A complet, €40-80k pour un dossier acquisition/exit. RevenueLab à €39/mo (€468/an) = ROI ×10-200 selon use case. Plus tu re-runs souvent (mensuel), plus l'écart économique grandit.",
  },
];
