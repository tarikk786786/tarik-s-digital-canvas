// Comprehensive forensic science specialties and origin narrative for Tarik Islam.
// Highlighting deep mastery across physical, chemical, and biological forensic domains
// alongside the core philosophical journey: Why I Chose Tech.

export interface ForensicSpecialty {
  id: string;
  title: string;
  subtitle: string;
  category: "chemical" | "physical" | "biological" | "pattern" | "digital";
  iconName: string;
  accent: string;
  summary: string;
  instrumentation: string[];
  coreCompetencies: string[];
  scientificPrinciple: string;
  legalEvidentiaryStandard: string;
}

export const FORENSIC_SPECIALTIES: ForensicSpecialty[] = [
  {
    id: "toxicology",
    title: "Forensic Toxicology",
    subtitle: "Chemical & Metabolic Xenobiotic Identification",
    category: "chemical",
    iconName: "FlaskConical",
    accent: "#62E6FF",
    summary:
      "Specialized in the extraction, isolation, and quantitative identification of poisons, illicit narcotics, pharmaceutical metabolites, heavy metals, and industrial volatiles across biological viscera and non-biological chemical matrices.",
    instrumentation: [
      "Gas Chromatography-Mass Spectrometry (GC-MS / GC-FID)",
      "High-Performance Liquid Chromatography (HPLC / LC-MS)",
      "Thin Layer Chromatography (TLC)",
      "Fourier Transform Infrared Spectrophotometry (FTIR)",
      "UV-Visible Spectrophotometry",
    ],
    coreCompetencies: [
      "Post-Mortem Toxicological Triage & Volatiles Screening",
      "Qualitative & Quantitative Mass Spectrum Interpretation",
      "Liquid-Liquid & Solid-Phase Extraction (SPE) Protocols",
      "Therapeutic Drug Monitoring & Lethal Dose (LD50) Calculation",
      "Screening for Synthetic Designer Drugs & Novel Psychoactive Substances",
      "Enzyme-Linked Immunosorbent Assay (ELISA) Presumptive Testing",
    ],
    scientificPrinciple:
      "Paracelsus Principle: 'All things are poison, and nothing is without poison; the dosage alone makes it so.' Verified by retention times and mass-to-charge (m/z) fragmentation fingerprints.",
    legalEvidentiaryStandard:
      "SWGTOX (Scientific Working Group for Forensic Toxicology) validation standards & ISO/IEC 17025 testing requirements.",
  },
  {
    id: "dactyloscopy",
    title: "Forensic Dactyloscopy & Friction Ridge Analysis",
    subtitle: "Biometric Ridge Classification & Minutiae Mapping",
    category: "pattern",
    iconName: "Fingerprint",
    accent: "#6EE7B7",
    summary:
      "Rigorous physical and chemical identification, visualization, and comparison of human friction ridge patterns (fingerprints, palm prints, and footprints) to establish infallible individualization.",
    instrumentation: [
      "Cyanoacrylate (Super Glue) Fuming Chambers",
      "Alternate Light Sources (ALS) & UV Optical Imaging",
      "Electrostatic Dust Print Lifters (EDPL)",
      "Automated Fingerprint Identification Systems (AFIS)",
      "High-Resolution Ridge Comparison Microscopes",
    ],
    coreCompetencies: [
      "Henry Classification System & Ridge Pattern Geometry (Loops, Whorls, Arches)",
      "Level 1, 2, and 3 Minutiae Analysis (Bifurcations, Ridge Endings, Island Pores)",
      "Chemical Reagent Development (Ninhydrin, DFO, Silver Nitrate, Amido Black)",
      "Fluorescent Magnetic Powder Application on Porous & Non-Porous Surfaces",
      "ACE-V Scientific Protocol (Analysis, Comparison, Evaluation, Verification)",
      "Automated Coordinate Extraction for Biometric Database Ingestion",
    ],
    scientificPrinciple:
      "Biological Uniqueness & Permanence (Sir Francis Galton & Sir William Herschel): Friction ridge morphology forms in utero and remains invariant throughout life unless deep dermal scarring occurs.",
    legalEvidentiaryStandard:
      "Daubert standard compliance via verifiable Galton minutiae thresholds and blind peer-verification under SWGFAST / OSAC guidelines.",
  },
  {
    id: "serology-dna",
    title: "Forensic Serology & Biological Evidence (DNA)",
    subtitle: "Physiological Fluid Screening & Genetic Integrity",
    category: "biological",
    iconName: "Dna",
    accent: "#9B8CFF",
    summary:
      "Biochemical identification of human physiological fluids, bloodstain pattern dynamics (BPA), and the empirical preservation of biological evidentiary material for molecular genetic profiling.",
    instrumentation: [
      "Alternate Light Source (450nm Blue / UV Luminescence)",
      "Stereoscopic & Compound Biological Microscopes",
      "Thermal Cyclers for Polymerase Chain Reaction (PCR)",
      "Capillary Electrophoresis DNA Analyzers",
      "Spectrophotometers for Hemoglobin Assays",
    ],
    coreCompetencies: [
      "Presumptive Catalytic Blood Testing (Kastle-Meyer Phenolphthalein, Luminol)",
      "Confirmatory Microcrystalline Assays (Takayama & Teichmann Crystals)",
      "Acid Phosphatase & Prostate-Specific Antigen (PSA) Assays for Seminal Fluid",
      "Bloodstain Pattern Analysis: Trigonometric Impact Angle (sin θ = W/L)",
      "Point of Convergence & 3D Point of Origin Trajectory Reconstruction",
      "STR (Short Tandem Repeat) Profile Loci Interpretation & Anti-Contamination Controls",
    ],
    scientificPrinciple:
      "Fluid mechanics and enzymatic catalytic oxidation combined with the Mendelian genetic uniqueness of polymorphic non-coding DNA loci.",
    legalEvidentiaryStandard:
      "SWGDAM (Scientific Working Group on DNA Analysis Methods) protocols & strict biological cold-chain evidence storage.",
  },
  {
    id: "questioned-documents",
    title: "Questioned Document Examination (QDE)",
    subtitle: "Handwriting Biomechanics & Forensic Document Authentication",
    category: "pattern",
    iconName: "FileSearch",
    accent: "#F6C85F",
    summary:
      "Scientific examination of contested written, printed, and electronic documents to determine genuineness, authorship, mechanical production origins, and physical or chemical alterations.",
    instrumentation: [
      "Video Spectral Comparator (VSC) with Infrared Luminescence",
      "Electrostatic Detection Apparatus (ESDA) for Indented Writing",
      "Stereoscopic Zoom Examination Microscopes",
      "High-Resolution Digital Micrometers",
      "Thin-Layer Chromatography (TLC) for Solvent Ink Separation",
    ],
    coreCompetencies: [
      "Handwriting Kinematics & Individual Habitual Characteristics",
      "Detection of Disguised, Simulated, Traced, and Freehand Forgeries",
      "Visualization of Indented Writing on Multiple Subjacent Paper Pages",
      "Ink Differentiation via Infrared Reflection & Absorption Spectra",
      "Paper Fiber Composition, Watermark Radiography & Machine Printing Artifacts",
      "Physical Eradication, Chemical Obliteration & Mechanical Alteration Carving",
    ],
    scientificPrinciple:
      "Neuromuscular Habituation: Handwriting is an individualized neuromuscular motor reflex exhibiting natural variation within predictable parametric limits.",
    legalEvidentiaryStandard:
      "SWGDOC standards for examination of questioned documents and ASTM E2290 test methodologies.",
  },
  {
    id: "ballistics",
    title: "Forensic Ballistics & Toolmark Impression",
    subtitle: "Striation Micro-Analysis & Firearm Mechanics",
    category: "physical",
    iconName: "ShieldAlert",
    accent: "#FF7070",
    summary:
      "Comparative microscopy of mechanical striations and impressions left by firearm barrels, breech faces, firing pins, and cutting tools, coupled with terminal trajectory physics.",
    instrumentation: [
      "Split-Screen Comparison Optical Microscopes",
      "Scanning Electron Microscopy with Energy Dispersive X-Ray (SEM-EDX)",
      "Ballistic Chronographs & Trajectory Laser Alignment Rods",
      "Water Recovery Deceleration Tanks",
      "Stereo Zoom Measuring Microscopes",
    ],
    coreCompetencies: [
      "Comparison of Rifling Striations (Lands & Grooves) on Fired Projectiles",
      "Breech Face, Firing Pin Indentation & Ejector Mark Matching on Cartridge Cases",
      "Gunshot Residue (GSR) Primer Particle Morphological Analysis (Pb, Ba, Sb)",
      "Chemical Colorimetric Testing (Sodium Rhodizonate & Modified Griess Test)",
      "Internal, External, and Terminal Ballistics Physics & Range of Fire Determination",
      "Toolmark Striation Casting (Silicone Elastomer Replication) for Tool Matching",
    ],
    scientificPrinciple:
      "Manufacturing Imprecision & Tool Wear: Cutting, drilling, and finishing processes impart microscopic, non-reproducible imperfections onto metal surfaces transferred via friction.",
    legalEvidentiaryStandard:
      "AFTE (Association of Firearm and Tool Mark Examiners) theory of identification and Daubert judicial reliability criteria.",
  },
  {
    id: "crime-scene",
    title: "Crime Scene Reconstruction & Evidentiary Methodology",
    subtitle: "Spatial Geometry & Unbroken Chain of Custody",
    category: "physical",
    iconName: "Scale",
    accent: "#62E6FF",
    summary:
      "Systematic physical evidence documentation, scene geometry surveying, physical trajectory calculation, and strict ISO/IEC 27037 chain-of-custody protocols for court-ready evidence admissibility.",
    instrumentation: [
      "Total Station 3D Spatial Theodolites & Laser Scanners",
      "Forensic Photogrammetry Rulers & Scaled Calibrated L-Markers",
      "Tamper-Evident Security Seals & Faraday Evidence Enclosures",
      "Crime Scene Survey Systems & Trajectory Rods",
      "Forensic Macro-Photography Systems",
    ],
    coreCompetencies: [
      "Physical Scene Zoning, Secure Perimeter Establishment & Evidence Search Grids",
      "Spatial 3D Trajectory Vectoring & Impact Angle Calculation",
      "Forensic Evidence Packaging to Prevent Microbial, Volatile, or Cross-Contamination",
      "Cryptographic Hash Sealing & Chain of Custody Documentation",
      "Multi-Disciplinary Synthesis of Chemical, Biological & Impression Findings",
      "Court-Ready Expert Witness Testimony & Demonstrative Evidence Exhibits",
    ],
    scientificPrinciple:
      "Locard's Exchange Principle: 'Every contact leaves a trace.' The perpetrator of a crime will bring something into the crime scene and leave with something from it.",
    legalEvidentiaryStandard:
      "ISO/IEC 27037 (Digital Evidence Handling) & ISO 17020 (Requirements for the Operation of Various Types of Bodies Performing Inspection).",
  },
  {
    id: "digital-forensics",
    title: "Digital Forensics & Incident Response (DFIR)",
    subtitle: "The Bridge to Computing: Bitstream Integrity & Cyber Investigation",
    category: "digital",
    iconName: "Terminal",
    accent: "#62E6FF",
    summary:
      "The ultimate bridge between empirical physical investigation and computer systems — bit-for-bit verifiable acquisition, memory volatile extraction, file system metadata carving, and adversarial intrusion telemetry.",
    instrumentation: [
      "Hardware Write-Blockers (Tableau / WiebeTech)",
      "Volatility 3 Memory Analysis Framework",
      "The Sleuth Kit (TSK) & Autopsy Digital Forensic Suite",
      "Wireshark / TShark Network Packet Dissectors",
      "Eric Zimmerman's Forensic Suite (MFTECmd, PECmd, Registry Explorer)",
    ],
    coreCompetencies: [
      "Bitstream Physical Disk Imaging (dd, E01, Raw) with SHA-256 / Blake3 Verification",
      "NTFS File System Artifact Carving ($MFT, $LogFile, $UsnJrnl, VSS Shadow Copies)",
      "Execution Artifact Analysis (Windows Prefetch, Shimcache, Amcache, Shellbags)",
      "Volatile Memory Triage (Kernel Pools, Process Hollows, Injected DLLs, LSASS)",
      "Network Protocol PCAP Decoding, JA3/JA4 TLS Fingerprinting & Beacon Detection",
      "Mobile Device Forensic Extractions (iOS Sysdiagnose, Android ADB, SQLite WAL Carving)",
    ],
    scientificPrinciple:
      "Mathematical Determinism: Digital data is discrete and verifiable. Cryptographic hashing creates unique mathematical fingerprints confirming absolute zero modification.",
    legalEvidentiaryStandard:
      "NIST Special Publication 800-86 & Federal Rules of Evidence (FRE Rule 902(13) & (14)) for self-authenticating digital records.",
  },
];

export const WHY_I_CHOSE_TECH = {
  headline: "Why I Chose Tech: From Physical Crime Labs to Digital Frontiers",
  subheadline:
    "An investigative journey driven by relentless scientific curiosity — transforming post-mortem observation into active engineering.",
  narrative: [
    {
      title: "The Inborn Spark: A Relentless Need to Investigate",
      blurb:
        "Ever since my earliest scientific training, I was never satisfied with surface-level explanations. I wanted to know what was happening underneath. In chemistry, that meant isolating a single toxic metabolite in a mass spectrometer. In biology, it meant tracing a microscopic drop of blood through trigonometric angles. In dactyloscopy, it meant finding the unique bifurcations that individualize a human being. Investigation is not just a skill for me — it is how my mind processes the world.",
      icon: "Search",
      tag: "CURIOSITY & RESEARCH",
    },
    {
      title: "From Physical Atoms to Digital Bits",
      blurb:
        "In physical forensics, I learned the paramount importance of Locard's Exchange Principle: every contact leaves a trace. But as our society digitized, I realized that the greatest investigative frontier was no longer confined to physical rooms and chemical beakers. The world's most critical assets, financial systems, communications, and adversarial conflicts had migrated into silicon, fiber-optic packets, and distributed algorithms. The traces were now memory dumps, file system journals, and encrypted TLS handshakes.",
      icon: "Layers",
      tag: "THE PARADIGM SHIFT",
    },
    {
      title: "From Post-Mortem Inspection to Active Engineering",
      blurb:
        "In traditional forensics, the investigator arrives after the crime has occurred. You analyze what is already broken, poisoned, or altered. But in technology, investigation transforms into creation. You don't just inspect the aftermath; you engineer the architecture. You can design zero-trust networks, build AI agents that verify their own reasoning, audit kernel-level telemetry, and build tools that prevent catastrophes before they happen.",
      icon: "Cpu",
      tag: "ACTIVE CREATION",
    },
    {
      title: "Building Intelligent Systems That See The Invisible",
      blurb:
        "Entering computer applications, cybersecurity, and artificial intelligence allowed me to unite two worlds: the empirical rigor of a forensic scientist and the scalable power of a software engineer. Today, I don't see coding as just syntax — I treat software as an investigative instrument. Whether building Dezo.in's AI studio, deploying threat detection pipelines, or engineering full-stack platforms, my goal remains constant: building intelligent technology that sees what others miss.",
      icon: "Sparkles",
      tag: "THE MISSION",
    },
  ],
  quote: {
    text: "“My transition into tech was never an abandonment of forensics — it was its natural evolution. Software and artificial intelligence are the ultimate investigative frontiers.”",
    author: "Tarik Islam",
    role: "Forensic Scientist · Cyber Engineer · Founder, Dezo.in",
  },
};
