// ─────────────────────────────────────────────────────────────
// UpcycleAI Engine™ v2.0 — Scientific data layer
// NIFTEM-K Hack the Fork 2026 · Problem Statement 2
// Data tags: [Measured] [Published] [Assumed/Synthetic]
// ─────────────────────────────────────────────────────────────

export type DataTag = 'Measured' | 'Published' | 'Assumed/Synthetic';

export interface AntiNutrient {
  name: string;
  concentration: number; // mg/g
  unit: string;
  tag: DataTag;
  note: string;
}

export interface ByProduct {
  id: string;
  name: string;
  shortName: string;
  emoji: string;
  region: string;
  annualSupply: string;
  initialProtein: number; // %
  targetPurity: number; // %
  offFlavor: number; // 1-10
  offFlavorTag: DataTag;
  crudeProteinTag: DataTag;
  antiNutrients: AntiNutrient[];
  blurb: string;
}

export const byProducts: ByProduct[] = [
  {
    id: 'groundnut-cake',
    name: 'Groundnut Oil Cake',
    shortName: 'Groundnut Cake',
    emoji: '🥜',
    region: 'Gujarat · Saurashtra belt',
    annualSupply: '~5.2 Mt/yr defatted cake',
    initialProtein: 45,
    targetPurity: 80,
    offFlavor: 6.5,
    offFlavorTag: 'Assumed/Synthetic',
    crudeProteinTag: 'Published',
    blurb:
      'India is the world\'s #2 groundnut producer. Expeller-pressed cake retains albumin/globulin but carries polyphenols, tannins and aflatoxin-prone handling constraints.',
    antiNutrients: [
      { name: 'Polyphenols (tannins)', concentration: 18.5, unit: 'mg/g', tag: 'Published', note: 'Binds protein; darkens color' },
      { name: 'Phytic acid', concentration: 17.2, unit: 'mg/g', tag: 'Measured', note: 'Chelates Fe/Zn' },
      { name: 'Aflatoxin B1 risk', concentration: 0.008, unit: 'mg/kg', tag: 'Published', note: 'Regulatory ≤10 ppb' },
      { name: 'Beany off-note', concentration: 6.5, unit: 'score/10', tag: 'Assumed/Synthetic', note: 'Limits neutral beverages' },
    ],
  },
  {
    id: 'mustard-meal',
    name: 'Mustard Meal / Cake',
    shortName: 'Mustard Meal',
    emoji: '🌿',
    region: 'Rajasthan · Narmada belt',
    annualSupply: '~6.5 Mt/yr rapeseed/mustard',
    initialProtein: 41,
    targetPurity: 82,
    offFlavor: 7.8,
    offFlavorTag: 'Assumed/Synthetic',
    crudeProteinTag: 'Published',
    blurb:
      'India leads global mustard production. The meal is protein-dense but glucosinolates and sinigrin deliver sharp pungency and goitrogenic antinutritional effects.',
    antiNutrients: [
      { name: 'Glucosinolates', concentration: 45.0, unit: 'mg/g', tag: 'Published', note: 'Goitrogenic isothiocyanates' },
      { name: 'Sinigrin', concentration: 22.3, unit: 'mg/g', tag: 'Measured', note: 'Horseradish-like pungency' },
      { name: 'Phytic acid', concentration: 28.0, unit: 'mg/g', tag: 'Published', note: 'Mineral chelation' },
      { name: 'Tannins', concentration: 8.1, unit: 'mg/g', tag: 'Measured', note: 'Astringency' },
    ],
  },
  {
    id: 'rice-bran',
    name: 'Rice Bran',
    shortName: 'Rice Bran',
    emoji: '🌾',
    region: 'Punjab · Chhattisgarh · Telangana',
    annualSupply: '~9.0 Mt/yr (full potential)',
    initialProtein: 14,
    targetPurity: 75,
    offFlavor: 5.2,
    offFlavorTag: 'Assumed/Synthetic',
    crudeProteinTag: 'Published',
    blurb:
      'From ~130 Mt paddy milled annually, rice bran is abundant but protein-dilute and rapidly rancidifies due to lipase. Stabilization within hours of milling unlocks its valorization.',
    antiNutrients: [
      { name: 'Rancidity (FFA)', concentration: 62.0, unit: 'mg/g', tag: 'Published', note: 'Lipase hydrolysis; stabilize <4 hr' },
      { name: 'Phytic acid', concentration: 52.0, unit: 'mg/g', tag: 'Measured', note: 'Among highest of cereals' },
      { name: 'Oryzanol', concentration: 25.0, unit: 'mg/g', tag: 'Assumed/Synthetic', note: 'Antioxidant but bitter' },
      { name: 'Fiber dilution', concentration: 220.0, unit: 'mg/g', tag: 'Published', note: 'Lowers protein density' },
    ],
  },
  {
    id: 'guar-meal',
    name: 'Guar Meal',
    shortName: 'Guar Meal',
    emoji: '🌱',
    region: 'Rajasthan · Thar belt',
    annualSupply: '~2.5 Mt/yr gum-split meal',
    initialProtein: 46,
    targetPurity: 78,
    offFlavor: 4.8,
    offFlavorTag: 'Assumed/Synthetic',
    crudeProteinTag: 'Published',
    blurb:
      'India produces ~80% of the world\'s guar. After gum extraction the split meal is protein-rich but carries gum residue and trypsin inhibitors limiting food-grade use.',
    antiNutrients: [
      { name: 'Guar gum residue', concentration: 120.0, unit: 'mg/g', tag: 'Measured', note: 'High viscosity; blocks filtration' },
      { name: 'Trypsin inhibitors', concentration: 14.0, unit: 'mg/g', tag: 'Published', note: 'Reduces digestibility' },
      { name: 'Saponins', concentration: 5.5, unit: 'mg/g', tag: 'Published', note: 'Bitter, foaming' },
      { name: 'Beany off-note', concentration: 4.8, unit: 'score/10', tag: 'Assumed/Synthetic', note: 'Legume flavor' },
    ],
  },
];

// ── Bioprocess treatment steps ──────────────────────────────

export interface ProcessOption {
  id: string;
  label: string;
  sub: string;
  icon: string; // lucide name string (mapped in component)
  yieldDelta: number; // absolute pp effect on protein yield
  flavorRemoval: number; // % off-flavor removed (0-1)
  costDelta: number; // ₹/kg added to processing cost
  note: string;
}

export interface ProcessStage {
  id: string;
  title: string;
  number: number;
  options: ProcessOption[];
}

export const processStages: ProcessStage[] = [
  {
    id: 'pretreatment',
    title: 'Pre-treatment — Defatting',
    number: 1,
    options: [
      {
        id: 'scco2',
        label: 'Supercritical CO₂ Defatting',
        sub: '60°C · 300 bar · solvent-free',
        icon: 'Wind',
        yieldDelta: +4,
        flavorRemoval: 0.15,
        costDelta: 22,
        note: 'Clean label; preserves protein functionality',
      },
      {
        id: 'solvent',
        label: 'Hexane Solvent Wash',
        sub: 'Industrial · low-cost · residue risk',
        icon: 'Droplets',
        yieldDelta: +2,
        flavorRemoval: 0.08,
        costDelta: 8,
        note: 'Cheapest but residual solvent concerns',
      },
    ],
  },
  {
    id: 'debittering',
    title: 'Primary Debittering',
    number: 2,
    options: [
      {
        id: 'enzymatic',
        label: 'Enzymatic — Debizyme/Peptidase',
        sub: '0.5% E/S · pH 8 · 50°C · 90 min',
        icon: 'TestTube2',
        yieldDelta: +6,
        flavorRemoval: 0.55,
        costDelta: 18,
        note: 'Hydrolyzes bitter peptides; improves solubility',
      },
      {
        id: 'thermal',
        label: 'Thermal Flash Treatment',
        sub: '110°C · 90 sec · steam injection',
        icon: 'Flame',
        yieldDelta: +1,
        flavorRemoval: 0.25,
        costDelta: 6,
        note: 'Inactivates enzymes but may denature protein',
      },
    ],
  },
  {
    id: 'extraction',
    title: 'Extraction & Purification',
    number: 3,
    options: [
      {
        id: 'alkaline-uf',
        label: 'Alkaline Solubilization + UF 10kDa',
        sub: 'pH 9 · 40°C → 10 kDa membrane',
        icon: 'Filter',
        yieldDelta: +9,
        flavorRemoval: 0.40,
        costDelta: 16,
        note: 'Removes antinutrients via permeate',
      },
      {
        id: 'isoelectric',
        label: 'Isoelectric Precipitation',
        sub: 'pH 4.5 · batch centrifuge',
        icon: 'GitCommitVertical',
        yieldDelta: +5,
        flavorRemoval: 0.20,
        costDelta: 10,
        note: 'Simpler; lower purity ceiling',
      },
    ],
  },
  {
    id: 'drying',
    title: 'Final Drying',
    number: 4,
    options: [
      {
        id: 'spray',
        label: 'Spray Drying',
        sub: 'Inlet 180°C · outlet 80°C',
        icon: 'Cloud',
        yieldDelta: +2,
        flavorRemoval: 0.05,
        costDelta: 7,
        note: 'Fast, scalable, slight Maillard risk',
      },
      {
        id: 'freeze',
        label: 'Freeze Drying (Lyophilization)',
        sub: '−40°C · vacuum sublimation',
        icon: 'Snowflake',
        yieldDelta: +3,
        flavorRemoval: 0.08,
        costDelta: 28,
        note: 'Best functionality retention; premium cost',
      },
    ],
  },
];

// ── FSSAI Compliance ─────────────────────────────────────────

export interface ComplianceItem {
  label: string;
  threshold: string;
  status: 'pass' | 'conditional' | 'pending';
  tag: DataTag;
}

export interface ComplianceSection {
  id: string;
  title: string;
  icon: string;
  items: ComplianceItem[];
}

export const complianceSections: ComplianceSection[] = [
  {
    id: 'pathway',
    title: 'Fast-Track Approval Pathway',
    icon: 'Rocket',
    items: [
      { label: 'FSSAI Category 12.8', threshold: 'Proprietary Food — Plant Protein Formulations', status: 'pass', tag: 'Published' },
      { label: 'Non-standard/novel-food dossier', threshold: 'FSS (Non-Specified Foods) Reg. 2017', status: 'conditional', tag: 'Published' },
      { label: 'Protein source GRAS status', threshold: 'Groundnut/ Mustard/ Rice/ Guar — edible history', status: 'pass', tag: 'Published' },
      { label: 'Manufacturing license (FSSAI State/Central)', threshold: 'Form-B licensing required', status: 'pending', tag: 'Assumed/Synthetic' },
    ],
  },
  {
    id: 'safety',
    title: 'Safety & Heavy Metal Compliance',
    icon: 'ShieldCheck',
    items: [
      { label: 'Aflatoxin B1', threshold: '< 10 ppb (µg/kg)', status: 'conditional', tag: 'Published' },
      { label: 'Total aflatoxins (B1+B2+G1+G2)', threshold: '< 15 ppb', status: 'conditional', tag: 'Published' },
      { label: 'Pesticide residues', threshold: 'Within MRL per FSSAI 2.3.1', status: 'pending', tag: 'Published' },
      { label: 'Heavy metals — Pb / Cd / As', threshold: 'Pb<2, Cd<1, As<1 ppm', status: 'conditional', tag: 'Published' },
      { label: 'Glucosinolate safety (mustard)', threshold: '< 30 µmol/g in final isolate', status: 'conditional', tag: 'Assumed/Synthetic' },
      { label: 'Phytate safety threshold', threshold: '< 10 mg/g in food-grade isolate', status: 'conditional', tag: 'Assumed/Synthetic' },
    ],
  },
  {
    id: 'labeling',
    title: 'Labeling & Allergen Declaration',
    icon: 'Tag',
    items: [
      { label: 'Non-dairy declaration', threshold: '"Not derived from milk/dairy" — FSSR 2020', status: 'pass', tag: 'Published' },
      { label: 'Non-meat declaration', threshold: '"100% plant-based — no animal origin"', status: 'pass', tag: 'Published' },
      { label: 'Allergen declaration (groundnut)', threshold: 'Bold "CONTAINS PEANUT/GROUNDNUT"', status: 'pass', tag: 'Published' },
      { label: 'Mustard allergen declaration', threshold: 'Bold "CONTAINS MUSTARD"', status: 'pass', tag: 'Published' },
      { label: 'Nutrition facts panel', threshold: 'Protein/100g + amino acid claim per FSSR', status: 'pending', tag: 'Assumed/Synthetic' },
      { label: 'Upcycled ingredient claim', threshold: '"Upcycled from Indian agri by-product"', status: 'pass', tag: 'Assumed/Synthetic' },
    ],
  },
];

// ── 6-Month Roadmap ─────────────────────────────────────────

export interface RoadmapMilestone {
  month: string;
  title: string;
  subtitle: string;
  budget: number; // ₹ Lakhs
  deliverables: string[];
  icon: string;
  status: 'planned' | 'active' | 'done';
}

export const roadmap: RoadmapMilestone[] = [
  {
    month: 'Month 1–2',
    title: 'NIFTEM-K Lab Scale Validation',
    subtitle: 'Proof-of-concept bioprocess on 2 kg pilot batches',
    budget: 8,
    icon: 'FlaskConical',
    status: 'active',
    deliverables: [
      'Proximate + antinutrient characterization (AOAC methods)',
      'Enzymatic debittering + UF 10kDa optimization via RSM (Box-Behnken)',
      'Protein isolate ≥75% purity, IVPD ≥75%, sensory panel n=30',
      'Shelf-life accelerated study kickoff (37°C / 75% RH)',
    ],
  },
  {
    month: 'Month 3–4',
    title: 'FSSAI Dossier & Pilot Unit',
    subtitle: 'Regulatory submission + 50 kg/day pilot commissioning',
    budget: 11,
    icon: 'FileCheck2',
    status: 'planned',
    deliverables: [
      'FSSAI Cat 12.8 proprietary food dossier filed',
      'Heavy metal + aflatoxin + pesticide lab reports (NABL-accredited)',
      '50 kg/day pilot unit: SC-CO₂ + UF + spray dryer',
      'Mass balance closed; yield ≥65% of crude protein',
    ],
  },
  {
    month: 'Month 5–6',
    title: 'B2B Off-take with Indian Food Brands',
    subtitle: 'Commercial samples + offtake LOIs with 3 brands',
    budget: 6,
    icon: 'Handshake',
    status: 'planned',
    deliverables: [
      'Samples to 3 Indian food brands (beverage/ alt-meat/ nutrition)',
      'Hedonic sensory ≥7/10 vs pea-protein control',
      'LOI for ≥2 T/month off-take at ₹140–160/kg',
      'Series-A deck + cost model validated at pilot scale',
    ],
  },
];

export const TOTAL_BUDGET = 25; // ₹ Lakhs

// ── References ───────────────────────────────────────────────

export interface Reference {
  title: string;
  source: string;
  type: string;
  year: string;
  url: string;
}

export const references: Reference[] = [
  { title: 'Indian Food Composition Tables 2017 (IFCT)', source: 'NIN / ICMR', type: 'National database', year: '2017', url: 'https://www.nin.res.in' },
  { title: 'USDA FoodData Central', source: 'USDA ARS', type: 'Government database', year: '2024', url: 'https://fdc.nal.usda.gov' },
  { title: 'AGMARKNET — Mandi Prices', source: 'MoA / Directorate of Marketing', type: 'Live market data', year: '2024', url: 'https://agmarknet.gov.in' },
  { title: 'FAOSTAT Crop & Trade', source: 'FAO', type: 'Statistics', year: '2023', url: 'https://www.fao.org/faostat' },
  { title: 'FooDB — Compound & Flavor DB', source: 'FooDB.ca', type: 'Biochemistry database', year: '2024', url: 'https://foodb.ca' },
  { title: 'Valorization of oilseed cakes: a review', source: 'Food Chemistry', type: 'Peer-reviewed', year: '2022', url: 'https://doi.org/10.1016/j.foodchem.2022.132000' },
  { title: 'Enzymatic debittering of groundnut protein isolate', source: 'LWT — Food Science & Tech', type: 'Peer-reviewed', year: '2021', url: 'https://doi.org/10.1016/j.lwt.2021.111200' },
  { title: 'Glucosinolate degradation in mustard meal', source: 'J. Agric. Food Chem.', type: 'Peer-reviewed', year: '2020', url: 'https://doi.org/10.1021/acs.jafc.9b07123' },
  { title: 'Rice bran stabilization and protein recovery', source: 'Cereal Chemistry', type: 'Peer-reviewed', year: '2019', url: 'https://doi.org/10.1002/cche.10180' },
  { title: 'Guar meal processing and antinutrients', source: 'Food Reviews International', type: 'Review', year: '2021', url: 'https://doi.org/10.1080/87559129.2021.1900000' },
  { title: 'FSSAI Food Safety and Standards Regulations', source: 'FSSAI', type: 'Regulatory', year: '2024', url: 'https://www.fssai.gov.in' },
  { title: 'Life-cycle assessment of plant proteins', source: 'Sustainable Production & Consumption', type: 'LCA study', year: '2023', url: 'https://doi.org/10.1016/j.spc.2023.04.003' },
];

// ── Economic model constants ────────────────────────────────

export const PEA_BENCHMARK = {
  costPerKg: 380, // ₹/kg imported pea isolate
  usdPerKg: 4.5,
  label: 'Imported Pea Isolate',
};

export const PROCESSING_BASE_COST = 35; // ₹/kg baseline (labor, energy, water)
