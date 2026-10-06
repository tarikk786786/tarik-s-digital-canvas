/**
 * Chemical Safety & Toxicology Engine (PRD §4, §5, §6, §7, §8, §9, §10, §11, §12, §13, §14, §15, §57)
 *
 * NON-NEGOTIABLE SAFETY POLICY:
 * This module is strictly an "Information, Prevention & Emergency Safety System" (PRD §57).
 * It provides:
 *  - Identification, GHS hazard classification, exposure routes, symptoms, first-aid principles,
 *    antidote references, "DO NOT MIX" household matrix, and AIIMS NPIC / NCDC helpline directories.
 * It strictly PROHIBITS:
 *  - Any instructions, recipes, or methods for synthesizing, extracting, concentrating,
 *    administering, or optimizing poisons or toxic substances.
 */

// ── Types ─────────────────────────────────────────────────────────────────────

export type HazardClass =
  | "Acute Toxic (GHS06)"
  | "Corrosive (GHS05)"
  | "Health Hazard / Carcinogen (GHS08)"
  | "Flammable (GHS02)"
  | "Oxidizer (GHS03)"
  | "Harmful / Irritant (GHS07)"
  | "Environmental (GHS09)"
  | "Biological / Venomous";

export type SubstanceCategory =
  | "Household Chemical"
  | "Agricultural Chemical"
  | "Medicine / Pharmaceutical"
  | "Toxic Gas"
  | "Heavy Metal"
  | "Poisonous Plant"
  | "Poisonous Mushroom"
  | "Venom / Envenomation"
  | "Industrial Chemical";

export interface ToxicSubstance {
  id: string;
  preferredName: string;
  synonyms: string[];
  casNumber?: string;
  unNumber?: string;
  formula?: string;
  category: SubstanceCategory;
  hazardClass: HazardClass[];
  ghsPictograms: string[]; // e.g. "☠️ Skull & Crossbones", "⚠️ Exclamation", "🔥 Flame", "🧪 Corrosion"
  physicalForm: string;
  commonProducts: string[];
  exposureRoutes: ("Ingestion" | "Inhalation" | "Dermal (Skin)" | "Ocular (Eye)" | "Injection / Bite")[];
  toxicityOverview: string;
  symptoms: string[];
  dangerSigns: string[]; // Severe / critical manifestations
  firstAidPrinciples: string[];
  medicalManagementOverview: string; // High-level clinical concept (NOT home dosing)
  antidote?: string; // Antidote name if one exists
  antidoteHospitalOnly: boolean;
  storageAndHandling: string[];
  disposalOverview: string;
  authoritativeSources: string[];
  pubchemCid?: number;
  lastVerified: string;
}

export interface PoisonCentre {
  id: string;
  name: string;
  institution: string;
  city: string;
  state: string;
  helpline: string;
  alternatePhones?: string[];
  hours: string;
  website?: string;
  source: string;
  isNationalTollFree: boolean;
}

export interface AntidoteRecord {
  id: string;
  antidote: string;
  indication: string;
  targetPoison: string;
  clinicalUseOverview: string;
  hospitalOnly: boolean;
  contraindications: string[];
  monitoringRequirements: string[];
  source: string;
}

export interface IncompatibleMixingHazard {
  id: string;
  substanceA: string;
  substanceB: string;
  chemicalReactionOverview: string;
  hazardousProduct: string; // The gas/hazard generated
  riskSeverity: "EXTREME" | "HIGH" | "MODERATE";
  dangerSigns: string[];
  immediateAction: string[];
}

export interface ToxidromePattern {
  id: string;
  name: string;
  description: string;
  classicSigns: string[];
  commonCauses: string[];
  antidoteOrReversal: string;
  urgency: "CRITICAL" | "HIGH" | "URGENT";
  vitalSignTendencies: {
    pupils: "Miosis (Constricted)" | "Mydriasis (Dilated)" | "Normal / Variable";
    heartRate: "Bradycardia (Slow)" | "Tachycardia (Fast)" | "Variable";
    skin: "Diaphoretic (Wet/Sweaty)" | "Anhidrotic (Dry/Hot)" | "Normal / Flushed" | "Normal / Variable";
    bowelSounds: "Hyperactive" | "Decreased / Absent" | "Normal";
    mentalStatus: "Depressed / Coma" | "Agitated / Delirious" | "Seizures / Variable";
  };
}

// ── India Poison Information Centres Directory (PRD §9) ───────────────────────

export const INDIA_POISON_CENTRES: PoisonCentre[] = [
  {
    id: "aiims-npic",
    name: "National Poisons Information Centre (NPIC)",
    institution: "All India Institute of Medical Sciences (AIIMS)",
    city: "New Delhi",
    state: "Delhi",
    helpline: "1800-116-117",
    alternatePhones: ["011-26589391", "011-26593677"],
    hours: "24 Hours x 365 Days",
    website: "https://www.aiims.edu/index.php/en/npic_intro",
    source: "AIIMS Department of Pharmacology / MoHFW",
    isNationalTollFree: true,
  },
  {
    id: "nioh-ahmedabad",
    name: "Poison Information Centre (NIOH)",
    institution: "National Institute of Occupational Health (ICMR)",
    city: "Ahmedabad",
    state: "Gujarat",
    helpline: "079-22686330",
    alternatePhones: ["079-22688700"],
    hours: "24 Hours Emergency Support",
    website: "https://nioh.org",
    source: "ICMR-NIOH Ahmedabad",
    isNationalTollFree: false,
  },
  {
    id: "mmc-chennai",
    name: "Poison Control, Training & Research Centre",
    institution: "Madras Medical College & Rajiv Gandhi Government General Hospital",
    city: "Chennai",
    state: "Tamil Nadu",
    helpline: "044-25305139",
    alternatePhones: ["044-25305000"],
    hours: "24/7 Clinical & Poison Advice",
    website: "http://www.mmc.tn.gov.in",
    source: "Directorate of Medical Education, Tamil Nadu",
    isNationalTollFree: false,
  },
  {
    id: "amrita-kochi",
    name: "Amrita Poison Information Centre",
    institution: "Amrita Institute of Medical Sciences",
    city: "Kochi",
    state: "Kerala",
    helpline: "0484-2856180",
    alternatePhones: ["0484-2851234"],
    hours: "24 Hours Assistance",
    website: "https://www.amritahospitals.org",
    source: "Amrita Institute of Medical Sciences",
    isNationalTollFree: false,
  },
  {
    id: "pgimer-chandigarh",
    name: "Department of Pharmacology & Clinical Toxicology",
    institution: "Postgraduate Institute of Medical Education and Research (PGIMER)",
    city: "Chandigarh",
    state: "Chandigarh / Punjab",
    helpline: "0172-2755236",
    alternatePhones: ["0172-2746018"],
    hours: "Hospital Hours & On-Call Emergency",
    website: "https://pgimer.edu.in",
    source: "PGIMER Department of Pharmacology",
    isNationalTollFree: false,
  },
  {
    id: "cmc-vellore",
    name: "Clinical Toxicology & Poison Information Desk",
    institution: "Christian Medical College & Hospital",
    city: "Vellore",
    state: "Tamil Nadu",
    helpline: "0416-2282030",
    hours: "24/7 Casualty & Triage",
    website: "https://www.cmch-vellore.edu",
    source: "CMC Vellore Emergency Medicine",
    isNationalTollFree: false,
  },
];

// ── Antidote Reference Database (PRD §11) ─────────────────────────────────────

export const ANTIDOTE_DATABASE: AntidoteRecord[] = [
  {
    id: "naloxone",
    antidote: "Naloxone (Narcan)",
    indication: "Acute Opioid Toxicity / Overdose",
    targetPoison: "Morphine, Heroin, Codeine, Fentanyl, Oxycodone, Methadone",
    clinicalUseOverview:
      "Competitive mu-opioid receptor antagonist. Rapidly reverses respiratory depression and sedation. Professional hospital/EMS titration required to avoid acute withdrawal precipitation.",
    hospitalOnly: false, // Available to trained first responders
    contraindications: ["Known hypersensitivity to naloxone hydrochloride"],
    monitoringRequirements: ["Continuous respiratory rate", "Recurrent sedation (naloxone half-life is shorter than many opioids)"],
    source: "WHO Model List of Essential Medicines / AHFS Drug Information",
  },
  {
    id: "acetylcysteine",
    antidote: "N-Acetylcysteine (NAC)",
    indication: "Acetaminophen (Paracetamol) Hepatotoxicity",
    targetPoison: "Acetaminophen / Paracetamol overdose (toxic NAPQI metabolite)",
    clinicalUseOverview:
      "Replenishes hepatic glutathione stores and acts as an alternative substrate for toxic NAPQI conjugation. Most effective within 8 hours of acute ingestion based on Rumack-Matthew nomogram.",
    hospitalOnly: true,
    contraindications: ["Hypersensitivity (anaphylactoid reactions can occur with IV administration; treat with antihistamines)"],
    monitoringRequirements: ["Serum acetaminophen levels", "Liver function enzymes (ALT/AST)", "Prothrombin time / INR"],
    source: "FDA / Rumack-Matthew Nomogram Standards",
  },
  {
    id: "atropine-pralidoxime",
    antidote: "Atropine Sulfate + Pralidoxime (2-PAM)",
    indication: "Organophosphate & Carbamate Insecticide Poisoning",
    targetPoison: "Chlorpyrifos, Malathion, Monocrotophos, Diazinon, Phorate",
    clinicalUseOverview:
      "Atropine competes competitively at muscarinic acetylcholine receptors to reverse cholinergic crisis (bronchorrhea, bronchospasm, bradycardia). Pralidoxime reactivates phosphorylated acetylcholinesterase if administered before enzyme 'aging'.",
    hospitalOnly: true,
    contraindications: ["Do NOT use pralidoxime alone without atropine", "Relative: Myasthenia gravis (dose adjustment)"],
    monitoringRequirements: ["Lung fields for clearance of secretions (atropinization endpoint)", "Heart rate (>80 bpm)", "Pupillary size"],
    source: "WHO / Indian National Guidelines on Organophosphate Poisoning Management",
  },
  {
    id: "fomepizole",
    antidote: "Fomepizole (4-Methylpyrazole) or IV Ethanol",
    indication: "Toxic Alcohol Poisoning (Methanol & Ethylene Glycol)",
    targetPoison: "Methanol (wood alcohol / illicit liquor), Ethylene glycol (antifreeze)",
    clinicalUseOverview:
      "Potent competitive inhibitor of alcohol dehydrogenase (ADH). Prevents enzymatic conversion of toxic alcohols into toxic metabolites (formic acid, glycolic/oxalic acid). Hemodialysis is often adjunct.",
    hospitalOnly: true,
    contraindications: ["Known allergy to fomepizole or pyrazoles"],
    monitoringRequirements: ["Arterial blood gas (anion gap metabolic acidosis)", "Osmolal gap", "Serum methanol/ethylene glycol concentrations"],
    source: "Goldfrank's Toxicologic Emergencies / AACT Practice Guidelines",
  },
  {
    id: "hydroxocobalamin",
    antidote: "Hydroxocobalamin (Cyanokit)",
    indication: "Acute Cyanide Poisoning & Smoke Inhalation",
    targetPoison: "Cyanide salts, Hydrogen cyanide gas, Smoke from synthetic fires",
    clinicalUseOverview:
      "Coordinates with cyanide ions to form cyanocobalamin (Vitamin B12), which is safely excreted in urine without compromising oxygen-carrying hemoglobin (unlike older methemoglobin-forming nitrites).",
    hospitalOnly: true,
    contraindications: ["Severe anaphylactic reactions to hydroxocobalamin (rare emergency override)"],
    monitoringRequirements: ["Blood pressure (transient hypertension is common)", "Skin and urine chromaturia (red coloration)"],
    source: "US FDA / European Medicines Agency (EMA)",
  },
  {
    id: "deferoxamine",
    antidote: "Deferoxamine Mesylate",
    indication: "Acute Severe Iron Intoxication",
    targetPoison: "Ferrous sulfate, Ferrous gluconate, High-dose elemental iron tablets",
    clinicalUseOverview:
      "Chelates free ferric iron (Fe3+) in systemic circulation to form water-soluble ferrioxamine, which is eliminated renally (producing classic 'vin rose' rose-colored urine).",
    hospitalOnly: true,
    contraindications: ["Severe renal disease / anuria (unless accompanied by hemodialysis)"],
    monitoringRequirements: ["Serum iron and TIBC", "Renal function", "Blood pressure (rapid IV infusion causes hypotension)"],
    source: "AAPCC Guidelines on Iron Poisoning",
  },
  {
    id: "digoxin-fab",
    antidote: "Digoxin-Specific Antibody Fragments (DigiFab)",
    indication: "Life-Threatening Digitalis Toxicity",
    targetPoison: "Digoxin, Digitoxin, Yellow Oleander (Thevetin/Thevetoxin)",
    clinicalUseOverview:
      "Equimolar Fab fragments bind free intravascular glycosides, reversing refractory hyperkalemia and life-threatening ventricular arrhythmias. Cross-reacts and neutralizes plant cardenolides.",
    hospitalOnly: true,
    contraindications: ["Allergy to ovine (sheep) proteins (evaluate risk vs life-saving benefit)"],
    monitoringRequirements: ["Serum potassium (rapid hypokalemia can occur)", "Continuous ECG rhythm tracking"],
    source: "AHA Guidelines for Cardiotoxicity Management",
  },
  {
    id: "polyvalent-asv",
    antidote: "Polyvalent Anti-Snake Venom Serum (ASV - Indian Big Four)",
    indication: "Systemic Envenomation from Indian Venomous Snakes",
    targetPoison: "Spectacled Cobra (Naja naja), Common Krait (Bungarus caeruleus), Russell's Viper (Daboia russelii), Saw-Scaled Viper (Echis carinatus)",
    clinicalUseOverview:
      "Equine-derived purified immunoglobulin fragments neutralizes circulating venoms. Administered immediately upon systemic signs (neurotoxicity ptosis/paralysis, coagulopathy 20WBCT >20 min, swelling progression).",
    hospitalOnly: true,
    contraindications: ["No absolute contraindications in severe systemic envenomation; pre-treat with adrenaline/antihistamine if anaphylactoid risk"],
    monitoringRequirements: ["20-Minute Whole Blood Clotting Test (20WBCT)", "Neuromuscular single-breath count / respiration", "Urine output & renal function"],
    source: "National Snakebite Treatment Protocol (Ministry of Health & Family Welfare, India)",
  },
];

// ── "DO NOT MIX" Incompatible Household Matrix (PRD §14) ──────────────────────

export const INCOMPATIBLE_HOUSEHOLD_MIXES: IncompatibleMixingHazard[] = [
  {
    id: "bleach-ammonia",
    substanceA: "Bleach (Sodium Hypochlorite)",
    substanceB: "Ammonia / Ammonia-Based Cleaners (Glass/Window Cleaners)",
    chemicalReactionOverview:
      "Mixing hypochlorite with ammonia releases volatile, toxic chloramine fumes (NH2Cl and NHCl2), which severely damage bronchial and alveolar tissue upon inhalation.",
    hazardousProduct: "Toxic Chloramine Gas Fumes",
    riskSeverity: "EXTREME",
    dangerSigns: [
      "Immediate coughing, throat burning, and choking sensation",
      "Shortness of breath, chest tightness, and wheezing",
      "Chemical pneumonitis or pulmonary edema with delayed onset",
    ],
    immediateAction: [
      "Evacuate immediately to outdoor fresh air.",
      "Do NOT re-enter the enclosed room or space to clean it up.",
      "Open exterior windows ONLY if safe and possible while exiting.",
      "If breathing difficulties persist, dial 112 / 108 or contact AIIMS NPIC at 1800-116-117.",
    ],
  },
  {
    id: "bleach-acid",
    substanceA: "Bleach (Sodium Hypochlorite)",
    substanceB: "Acids (Vinegar, Toilet Bowl Cleaners, Descalers, Lemon Juice)",
    chemicalReactionOverview:
      "Acidification of sodium hypochlorite drives rapid release of elemental chlorine gas (Cl2). Chlorine reacts with moisture on mucosal surfaces to produce hydrochloric and hypochlorous acids.",
    hazardousProduct: "Toxic Chlorine Gas (Cl2)",
    riskSeverity: "EXTREME",
    dangerSigns: [
      "Intense burning in eyes, nose, and respiratory tract",
      "Violent coughing spasms and lacrimation (excessive tearing)",
      "Severe respiratory distress and chemical pulmonary edema",
    ],
    immediateAction: [
      "Evacuate the area immediately into open fresh air.",
      "Remove contaminated clothing if it absorbed the fumes.",
      "Flush irritated eyes or skin with plenty of clean water for 15 minutes.",
      "Seek emergency medical evaluation; call 112 / 108 or AIIMS NPIC 1800-116-117.",
    ],
  },
  {
    id: "bleach-alcohol",
    substanceA: "Bleach (Sodium Hypochlorite)",
    substanceB: "Rubbing Alcohol (Isopropyl Alcohol / Ethanol) or Hand Sanitizers",
    chemicalReactionOverview:
      "The haloform reaction converts secondary alcohols in the presence of hypochlorite into chloroform (CHCl3) and chloroacetone, which act as potent central nervous system depressants and hepatotoxins.",
    hazardousProduct: "Chloroform & Toxic Chlorinated Byproducts",
    riskSeverity: "HIGH",
    dangerSigns: [
      "Dizziness, lightheadedness, nausea, and headache",
      "Eye and respiratory irritation",
      "Loss of consciousness and CNS depression",
    ],
    immediateAction: [
      "Leave the area immediately and breathe fresh air.",
      "Ventilate the room from an outdoor or safe vantage point.",
      "If unconsciousness or dizziness occurs, call emergency services immediately.",
    ],
  },
  {
    id: "peroxide-vinegar",
    substanceA: "Hydrogen Peroxide",
    substanceB: "Vinegar (Acetic Acid)",
    chemicalReactionOverview:
      "Combining hydrogen peroxide and acetic acid generates peracetic acid (CH3COOOH), an unstable organic peroxide that is highly corrosive to skin, eyes, and lungs.",
    hazardousProduct: "Corrosive Peracetic Acid",
    riskSeverity: "HIGH",
    dangerSigns: [
      "Severe chemical burns to skin and mucous membranes",
      "Permanent corneal injury upon eye contact",
      "Severe throat burning upon inhaling vapors",
    ],
    immediateAction: [
      "Do NOT store mixed solutions in sealed containers (gas buildup may rupture container).",
      "Flush exposed skin or eyes immediately with copious running water.",
      "Seek immediate medical attention for burns or persistent eye pain.",
    ],
  },
  {
    id: "drain-cleaner-cross",
    substanceA: "Acidic Drain Cleaner (Sulfuric Acid based)",
    substanceB: "Alkaline Drain Cleaner (Sodium Hydroxide / Lye based)",
    chemicalReactionOverview:
      "Acid-base neutralization between concentrated sulfuric acid and sodium hydroxide is violently exothermic. The sudden boiling of water causes explosive boiling, acid splattering, and violent ejection from the pipe.",
    hazardousProduct: "Explosive Exothermic Boiling & Caustic Thermal Splatter",
    riskSeverity: "EXTREME",
    dangerSigns: [
      "Violent bubbling, boiling, and aerosolized caustic mist",
      "Immediate full-thickness thermal and chemical eye/skin burns",
    ],
    immediateAction: [
      "Step back immediately; do NOT look down into the drain.",
      "If splashed on skin or eyes, begin continuous emergency irrigation with water immediately.",
      "Call emergency medical services immediately for chemical eye burns.",
    ],
  },
];

// ── Toxidrome Recognition Engine (PRD §12) ────────────────────────────────────

export const TOXIDROME_PATTERNS: ToxidromePattern[] = [
  {
    id: "cholinergic",
    name: "Cholinergic Toxidrome (SLUDGE / DUMBELS)",
    description:
      "Caused by excessive acetylcholine at muscarinic and nicotinic receptors, typically due to acetylcholinesterase inhibition.",
    classicSigns: [
      "D - Diarrhea & Diaphoresis (profuse sweating)",
      "U - Urination (incontinence)",
      "M - Miosis (pinpoint pupils)",
      "B - Bradycardia, Bronchospasm & Bronchorrhea (copious lung secretions)",
      "E - Emesis (vomiting)",
      "L - Lacrimation (excessive tearing)",
      "S - Salivation (drooling)",
      "Fasciculations and muscle weakness (nicotinic effects)",
    ],
    commonCauses: [
      "Organophosphate insecticides (Chlorpyrifos, Malathion)",
      "Carbamate insecticides (Carbaryl, Propoxur)",
      "Nerve agents (Sarin, VX)",
      "Cholinergic medications (Donepezil, Pyridostigmine, Pilocarpine)",
    ],
    antidoteOrReversal: "Atropine Sulfate (titrated to dry secretions) + Pralidoxime (2-PAM)",
    urgency: "CRITICAL",
    vitalSignTendencies: {
      pupils: "Miosis (Constricted)",
      heartRate: "Bradycardia (Slow)",
      skin: "Diaphoretic (Wet/Sweaty)",
      bowelSounds: "Hyperactive",
      mentalStatus: "Depressed / Coma",
    },
  },
  {
    id: "anticholinergic",
    name: "Anticholinergic Toxidrome",
    description:
      "Competitive blockade of muscarinic acetylcholine receptors. Classic clinical mnemonic: 'Blind as a bat, mad as a hatter, red as a beet, hot as a hare, dry as a bone, bowel and bladder lose their tone.'",
    classicSigns: [
      "Mydriasis (markedly dilated pupils with sluggish light reaction)",
      "Hyperthermia and hot, flushed, bone-dry skin",
      "Dry mucous membranes and absence of axillary sweat",
      "Urinary retention and decreased/absent bowel sounds",
      "Tachycardia",
      "Agitated delirium, visual hallucinations, and picking at imaginary objects",
    ],
    commonCauses: [
      "Antihistamines (Diphenhydramine, Chlorpheniramine)",
      "Tricyclic Antidepressants (Amitriptyline)",
      "Antispasmodics & Antipsychotics (Hyoscine, Olanzapine)",
      "Plants: Datura stramonium (Jimson weed / Dhatura), Atropa belladonna",
    ],
    antidoteOrReversal: "Physostigmine salicylate (hospital telemetry setting only; contraindicated in TCA overdose)",
    urgency: "HIGH",
    vitalSignTendencies: {
      pupils: "Mydriasis (Dilated)",
      heartRate: "Tachycardia (Fast)",
      skin: "Anhidrotic (Dry/Hot)",
      bowelSounds: "Decreased / Absent",
      mentalStatus: "Agitated / Delirious",
    },
  },
  {
    id: "opioid",
    name: "Opioid Toxidrome (The Opioid Triad)",
    description:
      "Overstimulation of central mu-opioid receptors resulting in life-threatening central hypoventilation.",
    classicSigns: [
      "1. Severe respiratory depression (low respiratory rate <8-10 breaths/min, shallow breathing)",
      "2. Pinpoint pupils (Miosis - can be normal with Meperidine or severe anoxia)",
      "3. Central Nervous System depression (lethargy, stupor, coma)",
      "Hypothermia, bradycardia, and hypotension",
    ],
    commonCauses: [
      "Morphine, Codeine, Heroin, Buprenorphine, Methadone",
      "Synthetic opioids: Fentanyl, Tramadol, Tapentadol",
    ],
    antidoteOrReversal: "Naloxone (titrated to adequate spontaneous ventilation)",
    urgency: "CRITICAL",
    vitalSignTendencies: {
      pupils: "Miosis (Constricted)",
      heartRate: "Bradycardia (Slow)",
      skin: "Normal / Variable",
      bowelSounds: "Decreased / Absent",
      mentalStatus: "Depressed / Coma",
    },
  },
  {
    id: "sympathomimetic",
    name: "Sympathomimetic Toxidrome",
    description:
      "Excessive adrenergic stimulation resulting from increased release, reuptake inhibition, or direct stimulation of alpha and beta receptors.",
    classicSigns: [
      "Mydriasis (dilated pupils) with DIAPHORETIC (profuse sweating) skin (distinguishes from anticholinergic dry skin)",
      "Severe hypertension and marked tachycardia",
      "Hyperthermia and agitation",
      "Tremors, hyperreflexia, and risk of seizures or cardiac dysrhythmias",
    ],
    commonCauses: [
      "Amphetamines, Methamphetamine, MDMA (Ecstasy)",
      "Cocaine",
      "Decongestants: Pseudoephedrine, Ephedrine",
      "Synthetic cathinones ('Bath salts')",
    ],
    antidoteOrReversal: "Benzodiazepines (Diazepam, Lorazepam) for sedation and vascular relaxation; active cooling",
    urgency: "HIGH",
    vitalSignTendencies: {
      pupils: "Mydriasis (Dilated)",
      heartRate: "Tachycardia (Fast)",
      skin: "Diaphoretic (Wet/Sweaty)",
      bowelSounds: "Hyperactive",
      mentalStatus: "Agitated / Delirious",
    },
  },
  {
    id: "sedative-hypnotic",
    name: "Sedative-Hypnotic Toxidrome",
    description:
      "Enhancement of central inhibitory neurotransmission (primarily GABA-A receptors), causing generalized nervous system depression.",
    classicSigns: [
      "Profound CNS depression: sedation, slurred speech, ataxia, stupor, or coma",
      "Normal or mid-range pupils",
      "Normal or mildly depressed vital signs (bradycardia, hypotension, hypothermia)",
      "Decreased deep tendon reflexes",
    ],
    commonCauses: [
      "Benzodiazepines (Diazepam, Alprazolam, Clonazepam)",
      "Barbiturates (Phenobarbital)",
      "Z-drugs (Zolpidem, Zopiclone)",
      "Ethanol (Alcohol intoxication)",
    ],
    antidoteOrReversal: "Airway protection and supportive care; Flumazenil (extremely restricted due to seizure risk in chronic users)",
    urgency: "URGENT",
    vitalSignTendencies: {
      pupils: "Normal / Variable",
      heartRate: "Variable",
      skin: "Normal / Variable",
      bowelSounds: "Decreased / Absent",
      mentalStatus: "Depressed / Coma",
    },
  },
];

// ── Normalized Substance Database (PRD §5 & §6) ────────────────────────────────

export const TOXIC_SUBSTANCES: ToxicSubstance[] = [
  // ── Household Cleaners & Chemicals ──────────────────────────────────────────
  {
    id: "sub-sodium-hypochlorite",
    preferredName: "Sodium Hypochlorite (Household Bleach)",
    synonyms: ["Bleach", "Liquid Bleach", "Soda bleach", "Javel water"],
    casNumber: "7681-52-9",
    unNumber: "UN 1791",
    formula: "NaOCl",
    category: "Household Chemical",
    hazardClass: ["Corrosive (GHS05)", "Environmental (GHS09)", "Harmful / Irritant (GHS07)"],
    ghsPictograms: ["🧪 Corrosion", "⚠️ Irritant", "🐟 Environmental"],
    physicalForm: "Clear, pale greenish-yellow liquid with characteristic pungent chlorine odor",
    commonProducts: ["Domestic laundry bleach", "Disinfectant sprays", "Mildew cleaners", "Water chlorination solutions"],
    exposureRoutes: ["Ingestion", "Inhalation", "Dermal (Skin)", "Ocular (Eye)"],
    toxicityOverview:
      "Household concentrations (3-6%) act as irritants causing local mucosal inflammation. Industrial concentrations (>10%) are alkaline corrosives causing liquefactive necrosis of esophageal mucosa. Inhalation of fumes causes chemical tracheobronchitis.",
    symptoms: [
      "Burning pain in mouth, throat, and retrosternal area",
      "Nausea, vomiting, and hypersalivation",
      "Severe eye redness, tearing, and chemosis upon contact",
      "Coughing, wheezing, and throat tightness upon inhaling vapors",
    ],
    dangerSigns: [
      "Stridor, hoarseness, or respiratory distress (laryngeal edema)",
      "Hematemesis (vomiting blood) or severe epigastric guarding",
      "Hypotension and perforation signs (with concentrated industrial bleach)",
    ],
    firstAidPrinciples: [
      "DO NOT induce vomiting (prevents re-exposure and aspiration into lungs).",
      "DO NOT attempt chemical neutralization with acids or vinegar (creates toxic chlorine gas and exothermic heat).",
      "For ingestion: If conscious, offer small sips of water or milk to dilute.",
      "For eye contact: Irrigate immediately with copious clean water for at least 15 minutes.",
      "For skin contact: Remove contaminated clothing and rinse thoroughly.",
      "Contact AIIMS NPIC at 1800-116-117 or local emergency hospital immediately.",
    ],
    medicalManagementOverview:
      "Supportive care. Early flexible endoscopy if ingestion of concentrated solution (>10%) or presence of stridor/oral ulcerations. Airway management for laryngeal edema.",
    antidote: undefined,
    antidoteHospitalOnly: false,
    storageAndHandling: [
      "Store in tightly closed original containers in cool, ventilated areas away from sunlight.",
      "NEVER mix with ammonia, toilet cleaners, or acids.",
    ],
    disposalOverview: "Dilute heavily with water for municipal sewer where permitted by local regulations.",
    authoritativeSources: ["PubChem CID 23665760", "AIIMS NPIC Monographs", "WHO IPCS INCHEM"],
    pubchemCid: 23665760,
    lastVerified: "2026-10-06",
  },
  {
    id: "sub-ammonia",
    preferredName: "Ammonia Solution (Household Ammonia)",
    synonyms: ["Ammonium hydroxide", "Ammonia water", "Aqua ammonia"],
    casNumber: "1336-21-6",
    unNumber: "UN 2672",
    formula: "NH4OH (NH3 in H2O)",
    category: "Household Chemical",
    hazardClass: ["Corrosive (GHS05)", "Harmful / Irritant (GHS07)", "Environmental (GHS09)"],
    ghsPictograms: ["🧪 Corrosion", "⚠️ Irritant", "🐟 Environmental"],
    physicalForm: "Colorless liquid with a sharp, intensely suffocating, pungent odor",
    commonProducts: ["Window and glass cleaners", "Oven cleaners", "Floor stripping agents", "Industrial refrigerants"],
    exposureRoutes: ["Inhalation", "Ocular (Eye)", "Ingestion", "Dermal (Skin)"],
    toxicityOverview:
      "Highly alkaline solution that releases free ammonia gas. Ammonia is extremely water-soluble and rapidly hydrolyzes upon contact with moist mucosal membranes, causing severe liquefactive necrosis.",
    symptoms: [
      "Severe eye burning, blepharospasm, and lacrimation",
      "Suffocating sensation, violent coughing, and pharyngitis",
      "Oral and esophageal mucosal burns upon ingestion",
      "Skin erythema and blistering with concentrated solutions",
    ],
    dangerSigns: [
      "Laryngeal edema and acute airway obstruction",
      "Pulmonary edema and severe chemical pneumonitis",
      "Corneal ulceration and full-thickness ocular penetration",
    ],
    firstAidPrinciples: [
      "Move to fresh air immediately.",
      "For eye contact: Continuous flush with water for a minimum of 20-30 minutes.",
      "DO NOT induce vomiting.",
      "Call emergency services immediately if stridor, wheezing, or eye exposure occurs.",
    ],
    medicalManagementOverview:
      "Aggressive airway control and early intubation if laryngeal edema is suspected. Ophthalmology consult for caustic ocular burns. Bronchodilators for bronchospasm.",
    antidote: undefined,
    antidoteHospitalOnly: false,
    storageAndHandling: ["Store in well-ventilated cool spaces. Never mix with bleach (chloramine risk)."],
    disposalOverview: "Neutralize carefully under controlled professional conditions or dispose via certified hazmat handlers.",
    authoritativeSources: ["PubChem CID 222", "NIOSH Pocket Guide to Chemical Hazards"],
    pubchemCid: 222,
    lastVerified: "2026-10-06",
  },
  {
    id: "sub-caustic-soda",
    preferredName: "Sodium Hydroxide (Caustic Soda / Lye)",
    synonyms: ["Lye", "Caustic soda", "Sodium hydrate"],
    casNumber: "1310-73-2",
    unNumber: "UN 1823",
    formula: "NaOH",
    category: "Household Chemical",
    hazardClass: ["Corrosive (GHS05)", "Harmful / Irritant (GHS07)"],
    ghsPictograms: ["🧪 Corrosion"],
    physicalForm: "White deliquescent pellets, flakes, or concentrated dense liquid",
    commonProducts: ["Heavy-duty drain openers", "Oven cleaners", "Soap making chemicals", "Industrial degreasers"],
    exposureRoutes: ["Ingestion", "Ocular (Eye)", "Dermal (Skin)", "Inhalation"],
    toxicityOverview:
      "A potent caustic alkali that causes liquefactive necrosis by saponifying fats and solubilizing proteins. Penetrates deep into esophageal and gastric tissue layers, carrying high perforation risk.",
    symptoms: [
      "Immediate excruciating pain in mouth, throat, and retrosternal area",
      "Inability to swallow (dysphagia) and drooling",
      "Severe chemical burns to lips and oral cavity (grayish-white mucosal sloughing)",
      "Skin burns with soapy, slippery sensation",
    ],
    dangerSigns: [
      "Severe abdominal rigidity or guarding (visceral perforation)",
      "Subcutaneous emphysema in neck (esophageal rupture)",
      "Stridor and airway compromise",
    ],
    firstAidPrinciples: [
      "DO NOT induce vomiting (re-exposes esophagus and pharynx to deep caustic burn).",
      "DO NOT administer neutralizing acids (neutralization generates intense exothermic heat causing thermal burn).",
      "For skin/eyes: Immediately flush with running water for 30 minutes continuous.",
      "Transfer to emergency trauma/surgical facility immediately; call 112 / 108 or AIIMS NPIC 1800-116-117.",
    ],
    medicalManagementOverview:
      "Emergency ABC stabilization. Nil per oral (NPO). Early upper gastrointestinal endoscopy (within 12-24 hours) by experienced team to grade mucosal injury (Zargar classification). CT scan for suspected perforation.",
    antidote: undefined,
    antidoteHospitalOnly: false,
    storageAndHandling: ["Keep locked in childproof containers away from moisture and acids."],
    disposalOverview: "Hazardous chemical waste; do not discard into standard drains without neutralization.",
    authoritativeSources: ["PubChem CID 14798", "Zargar Caustic Injury Classification", "AIIMS NPIC Guidelines"],
    pubchemCid: 14798,
    lastVerified: "2026-10-06",
  },

  // ── Agricultural Chemicals & Pesticides ─────────────────────────────────────
  {
    id: "sub-chlorpyrifos",
    preferredName: "Chlorpyrifos (Organophosphate Insecticide)",
    synonyms: ["Dursban", "Lorsban", "Chlorpyriphos-ethyl"],
    casNumber: "2921-88-2",
    unNumber: "UN 2783",
    formula: "C9H11Cl3NO3PS",
    category: "Agricultural Chemical",
    hazardClass: ["Acute Toxic (GHS06)", "Health Hazard / Carcinogen (GHS08)", "Environmental (GHS09)"],
    ghsPictograms: ["☠️ Skull & Crossbones", "⚠️ Health Hazard", "🐟 Environmental"],
    physicalForm: "White or colorless crystalline solid with mild mercaptan / garlic-like sulfurous odor",
    commonProducts: ["Agricultural termiticides", "Crop insecticides", "Soil pest sprays"],
    exposureRoutes: ["Ingestion", "Inhalation", "Dermal (Skin)", "Ocular (Eye)"],
    toxicityOverview:
      "Irreversibly inhibits acetylcholinesterase (AChE) by phosphorylation. Accumulation of acetylcholine causes massive overstimulation of muscarinic and nicotinic receptors, culminating in acute cholinergic crisis and central respiratory depression.",
    symptoms: [
      "Excessive salivation, lacrimation, urination, and diarrhea (SLUDGE)",
      "Pinpoint pupils (miosis) with blurred vision",
      "Bronchorrhea (excessive wet secretions in lungs) and wheezing",
      "Muscle fasciculations, cramping, and progressive weakness",
      "Bradycardia and diaphoresis (cold sweats)",
    ],
    dangerSigns: [
      "Severe respiratory failure due to bronchorrhea and diaphragm paralysis",
      "Seizures, loss of consciousness, and coma",
      "Ventricular dysrhythmias and profound bradycardia",
      "Intermediate Syndrome (cranial nerve and neck flexor paralysis 24-96 hrs post-exposure)",
    ],
    firstAidPrinciples: [
      "Rescuer safety FIRST: Wear protective gloves and avoid contact with patient's vomitus or skin.",
      "Remove all contaminated clothing immediately and wash skin with soap and copious water.",
      "DO NOT induce vomiting (organophosphate solvents carry high hydrocarbon aspiration risk).",
      "Keep airway clear; position unconscious patient on their side (recovery position).",
      "Transport to emergency hospital immediately; call AIIMS NPIC at 1800-116-117.",
    ],
    medicalManagementOverview:
      "Airway clearance and high-flow oxygen. Prompt administration of IV Atropine sulfate titrated until pulmonary secretions are dry (endpoint: clear chest on auscultation, HR >80, dry axillae). Pralidoxime (2-PAM) IV infusion as enzyme reactivator. ICU telemetry.",
    antidote: "Atropine Sulfate + Pralidoxime (2-PAM)",
    antidoteHospitalOnly: true,
    storageAndHandling: ["Store in locked pesticide sheds away from human dwellings, grain storage, and water sources."],
    disposalOverview: "Follow statutory agricultural pesticide disposal protocols; never reuse empty containers.",
    authoritativeSources: ["PubChem CID 2730", "WHO Poisoning Prevention Guidelines", "AIIMS NPIC Antidote Protocols"],
    pubchemCid: 2730,
    lastVerified: "2026-10-06",
  },
  {
    id: "sub-aluminum-phosphide",
    preferredName: "Aluminum Phosphide (Celphos / QuickPhos)",
    synonyms: ["Celphos", "QuickPhos", "Grain preservative pesticide", "Rice tablet"],
    casNumber: "20859-73-8",
    unNumber: "UN 1397",
    formula: "AlP",
    category: "Agricultural Chemical",
    hazardClass: ["Acute Toxic (GHS06)", "Flammable (GHS02)", "Environmental (GHS09)"],
    ghsPictograms: ["☠️ Skull & Crossbones", "🔥 Flammable", "🐟 Environmental"],
    physicalForm: "Dark grey or greenish-brown tablets with characteristic decaying fish or garlic odor",
    commonProducts: ["Agricultural grain fumigant tablets", "Warehouse rodenticidal fumigants"],
    exposureRoutes: ["Ingestion", "Inhalation"],
    toxicityOverview:
      "Reacts rapidly with moisture or gastric acid to release phosphine gas (PH3). Phosphine is a potent protoplasmic poison that inhibits cytochrome c oxidase in cellular mitochondria, blocking cellular respiration and causing catastrophic multiorgan failure, profound myocardial depression, and refractory shock.",
    symptoms: [
      "Immediate retrosternal epigastric burning pain",
      "Garlic-like or rotten fish odor on breath",
      "Persistent vomiting and thirst",
      "Profound restlessness, tachycardia, and early tachypnea",
    ],
    dangerSigns: [
      "Severe refractory hypotension and cardiogenic shock within 1-3 hours",
      "Refractory metabolic acidosis with high lactate",
      "Malignant ventricular arrhythmias (ventricular tachycardia, ventricular fibrillation)",
      "Acute pulmonary edema and acute kidney injury",
    ],
    firstAidPrinciples: [
      "NO SPECIFIC ANTIDOTE EXISTS — Hospital ICU transport is an absolute clinical emergency.",
      "DO NOT induce vomiting with plain water (water accelerates phosphine gas generation in stomach).",
      "Rescuer warning: Patient's breath and vomitus emit toxic phosphine gas; maintain high room ventilation.",
      "Transport immediately to tertiary care hospital with ICU capabilities. Contact AIIMS NPIC: 1800-116-117.",
    ],
    medicalManagementOverview:
      "Strict intensive care. Immediate gastric lavage with mineral/coconut oil or potassium permanganate (KMnO4 1:10,000) under airway protection to absorb/oxidize unreacted phosphine. Aggressive hemodynamic support (norepinephrine, vasopressin). IV Magnesium sulfate, IV N-acetylcysteine, and ECMO/mechanical circulatory support in specialized centers.",
    antidote: undefined,
    antidoteHospitalOnly: true,
    storageAndHandling: ["A hermetically sealed flask only; strictly restricted pesticide under Indian law."],
    disposalOverview: "Specialized agricultural hazmat incineration only.",
    authoritativeSources: ["PubChem CID 29774", "AIIMS Protocol on Aluminum Phosphide Poisoning", "NCDC Guidelines"],
    pubchemCid: 29774,
    lastVerified: "2026-10-06",
  },

  // ── Medicines & Pharmaceuticals ─────────────────────────────────────────────
  {
    id: "sub-acetaminophen",
    preferredName: "Acetaminophen (Paracetamol)",
    synonyms: ["Paracetamol", "APAP", "N-acetyl-p-aminophenol", "Tylenol", "Calpol", "Dolo"],
    casNumber: "103-90-2",
    formula: "C8H9NO2",
    category: "Medicine / Pharmaceutical",
    hazardClass: ["Harmful / Irritant (GHS07)", "Health Hazard / Carcinogen (GHS08)"],
    ghsPictograms: ["⚠️ Irritant", "⚠️ Health Hazard"],
    physicalForm: "White crystalline odorless powder or pharmaceutical tablets/suspensions",
    commonProducts: ["Over-the-counter antipyretic tablets", "Cold & flu combination preparations", "Pediatric drops"],
    exposureRoutes: ["Ingestion"],
    toxicityOverview:
      "At therapeutic doses, metabolized by hepatic sulfation and glucuronidation. In overdose, pathways saturate and excess is oxidized via CYP2E1 into reactive, toxic NAPQI. When glutathione is depleted (>70%), NAPQI binds covalently to hepatic proteins causing acute centrilobular hepatic necrosis and potential acute liver failure.",
    symptoms: [
      "Stage 1 (0-24 hrs): Often asymptomatic or mild nausea, vomiting, anorexia, and malaise",
      "Stage 2 (24-72 hrs): Clinical latency; onset of right upper quadrant liver tenderness, elevated ALT/AST",
      "Stage 3 (72-96 hrs): Severe jaundice, coagulopathy (elevated INR), encephalopathy, and renal failure",
    ],
    dangerSigns: [
      "Hepatic encephalopathy (confusion, asterixis, coma)",
      "Profound metabolic acidosis (pH <7.30) and renal failure",
      "Marked coagulopathy (INR >6.5)",
    ],
    firstAidPrinciples: [
      "DO NOT wait for symptoms to appear before seeking hospital evaluation.",
      "Check packaging to estimate total grams ingested and exact time of ingestion.",
      "Take all remaining medication containers and blister packs to the emergency room.",
      "Call AIIMS NPIC toll-free at 1800-116-117 immediately for nomogram triage.",
    ],
    medicalManagementOverview:
      "Activated charcoal if within 1-2 hours of acute ingestion. Obtain 4-hour serum paracetamol concentration plotted on Rumack-Matthew nomogram. Prompt administration of N-Acetylcysteine (IV or Oral) within 8 hours prevents hepatic necrosis. Liver transplant evaluation (King's College Criteria) if severe liver failure develops.",
    antidote: "N-Acetylcysteine (NAC)",
    antidoteHospitalOnly: true,
    storageAndHandling: ["Keep locked out of reach of children in original blister packs."],
    disposalOverview: "Do not flush down household drain; return to pharmacy take-back kiosks.",
    authoritativeSources: ["PubChem CID 1983", "Rumack-Matthew Nomogram", "AIIMS NPIC Treatment Protocol"],
    pubchemCid: 1983,
    lastVerified: "2026-10-06",
  },

  // ── Toxic Gases ─────────────────────────────────────────────────────────────
  {
    id: "sub-carbon-monoxide",
    preferredName: "Carbon Monoxide (CO)",
    synonyms: ["Carbon oxide", "Flue gas", "Silent killer"],
    casNumber: "630-08-0",
    unNumber: "UN 1016",
    formula: "CO",
    category: "Toxic Gas",
    hazardClass: ["Acute Toxic (GHS06)", "Flammable (GHS02)", "Health Hazard / Carcinogen (GHS08)"],
    ghsPictograms: ["☠️ Skull & Crossbones", "🔥 Flammable", "⚠️ Health Hazard"],
    physicalForm: "Colorless, odorless, tasteless, non-irritating gas",
    commonProducts: ["Faulty gas geysers / water heaters", "Charcoal angithi / unvented indoor heaters", "Vehicle exhaust in closed garages", "Generators in unvented rooms"],
    exposureRoutes: ["Inhalation"],
    toxicityOverview:
      "Binds to hemoglobin with an affinity >200-250 times greater than oxygen, forming carboxyhemoglobin (COHb). Shifts the oxyhemoglobin dissociation curve to the left, drastically reducing oxygen delivery to vital tissues. Also binds to myoglobin and inhibits mitochondrial cytochrome oxidase.",
    symptoms: [
      "Tension-type throbbing headache, dizziness, and lightheadedness",
      "Nausea, vomiting, and fatigue (frequently misdiagnosed as viral flu/gastroenteritis)",
      "Visual disturbances and confusion",
      "Chest tightness and dyspnea",
    ],
    dangerSigns: [
      "Syncope (fainting / loss of consciousness)",
      "Seizures, coma, and myocardial ischemia / arrhythmias",
      "Classic 'cherry-red' skin color (rare post-mortem sign, unreliable clinically)",
      "Delayed Neuropsychiatric Sequelae (DNS) appearing weeks later",
    ],
    firstAidPrinciples: [
      "Evacuate everyone from the building into fresh outdoor air immediately.",
      "Shut off heating sources or vehicles ONLY if it can be done instantly without personal risk.",
      "Call emergency medical services immediately (112 / 108).",
      "Administer 100% high-flow normobaric oxygen via non-rebreather mask immediately upon EMS arrival.",
    ],
    medicalManagementOverview:
      "Continuous 100% normobaric oxygen (reduces COHb half-life from 300 minutes to ~90 minutes). Serial blood gas for carboxyhemoglobin percentage. Hyperbaric Oxygen Therapy (HBOT at 2.5-3.0 ATA reduces half-life to ~30 mins) indicated for syncope, neurological deficits, pregnancy with COHb >15-20%, or cardiac ischemia.",
    antidote: "100% Normobaric / Hyperbaric Oxygen",
    antidoteHospitalOnly: true,
    storageAndHandling: ["Install certified carbon monoxide detectors near bedrooms and gas geysers."],
    disposalOverview: "Not applicable (atmospheric ventilation of source).",
    authoritativeSources: ["PubChem CID 281", "CDC Clinical Guidance on CO Poisoning", "AIIMS NPIC Emergency Guidance"],
    pubchemCid: 281,
    lastVerified: "2026-10-06",
  },

  // ── Heavy Metals ────────────────────────────────────────────────────────────
  {
    id: "sub-lead",
    preferredName: "Lead and Inorganic Lead Compounds",
    synonyms: ["Plumbum", "Metallic lead", "Lead oxide", "Sindoor / traditional herbal lead contaminants"],
    casNumber: "7439-92-1",
    formula: "Pb",
    category: "Heavy Metal",
    hazardClass: ["Health Hazard / Carcinogen (GHS08)", "Harmful / Irritant (GHS07)", "Environmental (GHS09)"],
    ghsPictograms: ["⚠️ Health Hazard", "🐟 Environmental"],
    physicalForm: "Bluish-white silvery heavy metal; soft and malleable, forms toxic dust/salts",
    commonProducts: ["Lead-acid vehicle batteries", "Traditional non-standardized ayurvedic/unani medicines", "Lead-based paints in older homes", "Lead solder and industrial plumbing"],
    exposureRoutes: ["Ingestion", "Inhalation"],
    toxicityOverview:
      "Mimics divalent calcium (Ca2+) and zinc (Zn2+). Inhibits sulfhydryl-containing enzymes including delta-aminolevulinic acid dehydratase (ALAD) and ferrochelatase, disrupting heme synthesis. Disrupts blood-brain barrier and causes progressive irreversible neurotoxicity, especially in developing pediatric brains.",
    symptoms: [
      "Chronic: Colicky abdominal pain ('lead colic'), constipation, anorexia",
      "Microcytic hypochromic anemia with basophilic stippling on peripheral blood smear",
      "Lead lines on gingival margins (Burton's line - blue-purple gum pigmentation)",
      "Pediatric: Developmental delay, cognitive regression, behavioral disturbances, and hyperactivity",
    ],
    dangerSigns: [
      "Acute Lead Encephalopathy (persistent vomiting, ataxia, seizures, altered mental status, cerebral edema)",
      "Peripheral neuropathy ('wrist drop' or 'foot drop' due to radial/peroneal motor nerve demyelination)",
    ],
    firstAidPrinciples: [
      "Identify and completely terminate exposure source (stop suspicious non-certified herbal powders or lead paints).",
      "Do NOT attempt home detox regimens.",
      "Obtain venipuncture Blood Lead Level (BLL) from accredited laboratory.",
      "Consult clinical toxicologist or AIIMS NPIC: 1800-116-117.",
    ],
    medicalManagementOverview:
      "Identify and remove environmental exposure source. Chelation therapy based on venous BLL: Oral Succimer (DMSA) for BLL 45-69 mcg/dL; IV Calcium Disodium Edetate (CaNa2-EDTA) and/or Dimercaprol (BAL) for severe encephalopathy or BLL ≥70 mcg/dL. Supportive cerebral edema management.",
    antidote: "Succimer (DMSA) / CaNa2-EDTA / Dimercaprol (BAL)",
    antidoteHospitalOnly: true,
    storageAndHandling: ["Use lead-free certified products and compliant battery recycling."],
    disposalOverview: "Statutory hazardous e-waste / battery collection rules.",
    authoritativeSources: ["PubChem CID 5352425", "CDC Blood Lead Reference Values", "WHO Lead Poisoning Guidelines"],
    pubchemCid: 5352425,
    lastVerified: "2026-10-06",
  },

  // ── Venomous Organisms (India Big Four & Red Scorpion) ──────────────────────
  {
    id: "sub-indian-snake-venom",
    preferredName: "Indian Big Four Snake Envenomation",
    synonyms: ["Cobra bite", "Krait bite", "Russell's viper bite", "Saw-scaled viper bite"],
    category: "Venom / Envenomation",
    hazardClass: ["Acute Toxic (GHS06)", "Biological / Venomous"],
    ghsPictograms: ["☠️ Skull & Crossbones", "⚠️ Health Hazard"],
    physicalForm: "Complex biological cocktail of enzymatic and non-enzymatic toxic proteins",
    commonProducts: ["Free-living venomous reptiles in Indian subcontinent"],
    exposureRoutes: ["Injection / Bite"],
    toxicityOverview:
      "Venoms encompass neurotoxins (post-synaptic alpha-neurotoxins in Cobras; pre-synaptic beta-bungarotoxins in Kraits causing neuromuscular paralysis), hemotoxins/coagulopathies (Russell's & Saw-scaled vipers causing consumption coagulopathy and hemorrhagins), and severe local cytotoxins.",
    symptoms: [
      "Viperine: Massive progressive local swelling, blistering, and continuous oozing from bite fangs",
      "Krait/Cobra: Early bilateral ptosis (drooping eyelids), diplopia, dysphagia, and descending paralysis",
      "Krait bites: Typically painless night bites during sleep; abdominal pain without local swelling",
    ],
    dangerSigns: [
      "Bilateral complete ptosis and inability to open eyes",
      "Inability to count to 20 in single breath (diaphragmatic paralysis / respiratory arrest)",
      "Unclotted blood on 20-Minute Whole Blood Clotting Test (20WBCT >20 min)",
      "Spontaneous bleeding from gums, venipuncture sites, or hematuria (kidney injury)",
    ],
    firstAidPrinciples: [
      "DO NOT use a tourniquet or tight ligature (causes gangrene and limb loss).",
      "DO NOT cut, incise, or attempt to suck venom from the wound (ineffective and dangerous).",
      "DO NOT apply ice, herbal pastes, potassium permanganate, or electric shocks.",
      "DO: Reassure the patient and keep the bitten limb completely immobilized (splint or sling).",
      "Transport immediately to nearest hospital equipped with Anti-Snake Venom (ASV) and ventilator.",
    ],
    medicalManagementOverview:
      "Continuous monitoring of 20WBCT, vital signs, and single-breath count. Prompt IV administration of reconstituted Polyvalent Anti-Snake Venom (ASV) according to National Snakebite Protocol. Neostigmine + Atropine challenge for cobra neurotoxicity. Mechanical ventilation for respiratory failure. Early renal replacement therapy for acute tubular necrosis.",
    antidote: "Polyvalent Anti-Snake Venom (ASV)",
    antidoteHospitalOnly: true,
    storageAndHandling: ["Not applicable; maintain snake avoidance precautions."],
    disposalOverview: "Not applicable.",
    authoritativeSources: [
      "National Snakebite Treatment Protocol (MoHFW India)",
      "WHO Guidelines for the Management of Snakebites in South-East Asia",
      "AIIMS NPIC Snakebite Protocols"
    ],
    lastVerified: "2026-10-06",
  },
  {
    id: "sub-red-scorpion",
    preferredName: "Indian Red Scorpion Venom (Mesobuthus tamulus)",
    synonyms: ["Red scorpion sting", "Mesobuthus tamulus sting"],
    category: "Venom / Envenomation",
    hazardClass: ["Acute Toxic (GHS06)", "Biological / Venomous"],
    ghsPictograms: ["☠️ Skull & Crossbones"],
    physicalForm: "Biological venom containing peptide neurotoxins targeting voltage-gated ion channels",
    commonProducts: ["Free-living arachnid across agricultural India"],
    exposureRoutes: ["Injection / Bite"],
    toxicityOverview:
      "Toxins slow the inactivation of voltage-gated sodium channels and block potassium channels, precipitating massive endogenous catecholamine release ('autonomic storm') with severe cardiovascular collapse and acute pulmonary edema.",
    symptoms: [
      "Intense, excruciating local burning pain at sting site without major swelling",
      "Diaphoresis (profuse sweating), salivation, and priapism in male children",
      "Hypertension and tachycardia followed by cold clammy extremities",
    ],
    dangerSigns: [
      "Pink frothy sputum and acute pulmonary edema (Bawaskar syndrome)",
      "Hypotension, cardiogenic shock, and left ventricular failure",
    ],
    firstAidPrinciples: [
      "Immobilize the affected limb and reassure the patient.",
      "Ice pack locally to reduce severe pain.",
      "Transfer urgently to emergency medical hospital.",
      "Call AIIMS NPIC helpline: 1800-116-117.",
    ],
    medicalManagementOverview:
      "Prazosin (oral alpha-1 adrenergic blocker) is the physiological drug of choice; reverses vasoconstriction and pulmonary edema. Scorpion antivenom where indicated. Dobutamine for refractory cardiogenic shock. Fluid management with extreme caution.",
    antidote: "Prazosin (Physiological Reversal) + Monovalent Scorpion Antivenom",
    antidoteHospitalOnly: true,
    storageAndHandling: ["Not applicable."],
    disposalOverview: "Not applicable.",
    authoritativeSources: ["Bawaskar HS et al. Lancet / Indian Heart Journal", "AIIMS NPIC Envenomation Protocols"],
    lastVerified: "2026-10-06",
  },
];

// ── Search & Filter Helpers ───────────────────────────────────────────────────

export function searchToxicSubstances(query: string, categoryFilter?: SubstanceCategory | "All"): ToxicSubstance[] {
  const q = query.trim().toLowerCase();
  return TOXIC_SUBSTANCES.filter((item) => {
    if (categoryFilter && categoryFilter !== "All" && item.category !== categoryFilter) {
      return false;
    }
    if (!q) return true;
    return (
      item.preferredName.toLowerCase().includes(q) ||
      item.synonyms.some((s) => s.toLowerCase().includes(q)) ||
      (item.casNumber && item.casNumber.toLowerCase().includes(q)) ||
      (item.formula && item.formula.toLowerCase().includes(q)) ||
      item.category.toLowerCase().includes(q) ||
      item.symptoms.some((s) => s.toLowerCase().includes(q)) ||
      item.commonProducts.some((p) => p.toLowerCase().includes(q))
    );
  });
}

export function getSubstanceById(id: string): ToxicSubstance | undefined {
  return TOXIC_SUBSTANCES.find((s) => s.id === id);
}

export function getSubstanceByCas(cas: string): ToxicSubstance | undefined {
  const clean = cas.trim();
  return TOXIC_SUBSTANCES.find((s) => s.casNumber === clean);
}

export function checkHouseholdIncompatibility(substanceA: string, substanceB: string): IncompatibleMixingHazard | undefined {
  const a = substanceA.toLowerCase();
  const b = substanceB.toLowerCase();
  return INCOMPATIBLE_HOUSEHOLD_MIXES.find(
    (mix) =>
      (mix.substanceA.toLowerCase().includes(a) && mix.substanceB.toLowerCase().includes(b)) ||
      (mix.substanceA.toLowerCase().includes(b) && mix.substanceB.toLowerCase().includes(a)),
  );
}
