/**
 * TARIK ISLAM — VERIFIED PERSONAL KNOWLEDGE GRAPH (PRD §22)
 *
 * Grounded strictly in verified facts:
 * Root: Tarik Islam
 * Nodes: Education, Certifications, Forensic Science, Toxicology, Digital Forensics, Cybersecurity, AI, Software, Dezo.in, Research.
 * Relationships:
 *   LEARNED | CERTIFIED | BUILT | RESEARCHED | APPLIED | FOUNDED | INVESTIGATED | DOCUMENTED
 *
 * Strictly NO fabricated relationships, clients, or awards.
 */

export type KnowledgeNodeType =
  | "PERSON"
  | "EDUCATION"
  | "CERTIFICATION"
  | "DISCIPLINE"
  | "SPECIALTY"
  | "PROJECT"
  | "BUSINESS"
  | "FRAMEWORK"
  | "RESEARCH";

export type KnowledgeEdgeType =
  | "LEARNED"
  | "CERTIFIED"
  | "BUILT"
  | "RESEARCHED"
  | "APPLIED"
  | "FOUNDED"
  | "INVESTIGATED"
  | "DOCUMENTED";

export interface KnowledgeNode {
  id: string;
  label: string;
  type: KnowledgeNodeType;
  category: string;
  description: string;
  evidence: string;
  verified: boolean;
}

export interface KnowledgeEdge {
  id: string;
  source: string;
  target: string;
  relationship: KnowledgeEdgeType;
  label: string;
  evidence: string;
}

export const KNOWLEDGE_NODES: KnowledgeNode[] = [
  {
    id: "tarik-islam",
    label: "Tarik Islam",
    type: "PERSON",
    category: "Identity",
    description:
      "Forensic Science Specialist (Investigation & Toxicology), Cyber Defense & AI Engineer, Founder of Dezo.in.",
    evidence: "Verified Identity & Academic Credentials",
    verified: true,
  },
  // Education
  {
    id: "edu-bsc",
    label: "B.Sc Forensic Science",
    type: "EDUCATION",
    category: "Academic Foundation",
    description:
      "Crime-scene methods, ridge analysis (dactyloscopy), ballistics, questioned documents, physical evidence handling.",
    evidence: "Bachelor of Science in Forensic Science",
    verified: true,
  },
  {
    id: "edu-msc",
    label: "M.Sc Forensic Science (Investigation & Toxicology)",
    type: "EDUCATION",
    category: "Academic Specialization",
    description:
      "Postgraduate specialization in forensic toxicology, chromatography (GC-MS, HPLC), biological evidence, and chain-of-custody protocols.",
    evidence: "Master of Science in Forensic Science",
    verified: true,
  },
  {
    id: "edu-mca",
    label: "MCA (Computer Applications)",
    type: "EDUCATION",
    category: "Computer Science",
    description:
      "Software engineering, distributed database design, and algorithmic systems architecture bridging forensics to computer science.",
    evidence: "Master of Computer Applications",
    verified: true,
  },
  {
    id: "edu-mtech",
    label: "M.Tech Cyber Security & AI / Digital Forensics",
    type: "EDUCATION",
    category: "Advanced Engineering",
    description:
      "Postgraduate engineering in digital evidence integrity, memory analysis, zero-trust network defense, and AI reasoning systems.",
    evidence: "Postgraduate Engineering Degree",
    verified: true,
  },
  // Specialties
  {
    id: "spec-toxicology",
    label: "Forensic Toxicology & Analytical Chemistry",
    type: "SPECIALTY",
    category: "Forensic Science",
    description:
      "Screening, confirmation, and quantitation of xenobiotics, poisons, and metabolites using GC-MS and spectrophotometry principles.",
    evidence: "M.Sc Specialization & Laboratory Practice",
    verified: true,
  },
  {
    id: "spec-digital-forensics",
    label: "Digital Forensics & Incident Response (DFIR)",
    type: "SPECIALTY",
    category: "Forensic Science",
    description:
      "Bitstream preservation (ISO/IEC 27037), volatile RAM triage (RFC 3227), MFT filesystem carving, and timeline reconstruction.",
    evidence: "M.Tech Engineering & DFIR Lab Implementations",
    verified: true,
  },
  {
    id: "spec-cybersecurity",
    label: "Cybersecurity & Zero-Trust Defense",
    type: "DISCIPLINE",
    category: "Security",
    description:
      "Defensive telemetry, STRIDE threat modeling, protocol dissection, and application security hardening.",
    evidence: "Verified Curriculum & Professional Training",
    verified: true,
  },
  {
    id: "spec-ai-reasoning",
    label: "AI Reasoning & Autonomous Systems",
    type: "DISCIPLINE",
    category: "Artificial Intelligence",
    description:
      "Deterministic retrieval-augmented generation (RAG), tool calling, context management, and source-grounded inference.",
    evidence: "Production AI Architectures & Portfolio Engines",
    verified: true,
  },
  // Business & Projects
  {
    id: "biz-dezo",
    label: "Dezo.in",
    type: "BUSINESS",
    category: "Product Studio",
    description:
      "AI-native product studio founded by Tarik, translating investigative rigor into scalable, human-centered digital software.",
    evidence: "Founder-Led Operating Venture (https://dezo.in)",
    verified: true,
  },
  {
    id: "proj-digital-canvas",
    label: "Tarik Digital Canvas",
    type: "PROJECT",
    category: "Digital Platform",
    description:
      "Evidence-first digital portfolio and research platform built with TanStack Start, React 19, Nitro, and Three.js.",
    evidence: "Production Deployment (tarikislam.in)",
    verified: true,
  },
  {
    id: "proj-find-details",
    label: "Find Details Universal Intelligence Engine",
    type: "PROJECT",
    category: "Intelligence System",
    description:
      "Single-input lawful public-records research system with automated query classification and 3D geospatial graph correlation.",
    evidence: "Integrated System (/find-someone)",
    verified: true,
  },
  {
    id: "proj-forensic-lab",
    label: "Forensic Intelligence Lab",
    type: "PROJECT",
    category: "Forensic Platform",
    description:
      "Synthetic case analysis platform with interactive DFIR pipeline, toxicology workflow, and cryptographic evidence hashing.",
    evidence: "Integrated Lab (/forensic-lab)",
    verified: true,
  },
  // Certifications
  {
    id: "cert-ceh",
    label: "Certified Ethical Hacker (CEH)",
    type: "CERTIFICATION",
    category: "Cybersecurity Credential",
    description:
      "Authorized offensive security testing methodologies and penetration testing countermeasures.",
    evidence: "EC-Council Credential Registry",
    verified: true,
  },
  {
    id: "cert-chfi",
    label: "Computer Hacking Forensic Investigator (CHFI)",
    type: "CERTIFICATION",
    category: "Digital Forensics Credential",
    description:
      "Digital evidence recovery, chain-of-custody documentation, and cybercrime investigation procedures.",
    evidence: "EC-Council Credential Registry",
    verified: true,
  },
  {
    id: "cert-oscp",
    label: "Offensive Security Certified Professional (OSCP)",
    type: "CERTIFICATION",
    category: "Hands-on Security Credential",
    description:
      "Practical hands-on penetration testing and vulnerability exploitation in simulated lab networks.",
    evidence: "Offensive Security Credential Registry",
    verified: true,
  },
];

export const KNOWLEDGE_EDGES: KnowledgeEdge[] = [
  // Tarik → Education
  {
    id: "e1",
    source: "tarik-islam",
    target: "edu-bsc",
    relationship: "LEARNED",
    label: "Completed B.Sc",
    evidence: "Academic records",
  },
  {
    id: "e2",
    source: "tarik-islam",
    target: "edu-msc",
    relationship: "LEARNED",
    label: "Completed M.Sc Specialization",
    evidence: "Academic records",
  },
  {
    id: "e3",
    source: "tarik-islam",
    target: "edu-mca",
    relationship: "LEARNED",
    label: "Completed MCA",
    evidence: "Academic records",
  },
  {
    id: "e4",
    source: "tarik-islam",
    target: "edu-mtech",
    relationship: "LEARNED",
    label: "Completed M.Tech",
    evidence: "Academic records",
  },

  // Education → Specialties
  {
    id: "e5",
    source: "edu-msc",
    target: "spec-toxicology",
    relationship: "RESEARCHED",
    label: "Specialized in Toxicology",
    evidence: "Postgraduate thesis & lab",
  },
  {
    id: "e6",
    source: "edu-mtech",
    target: "spec-digital-forensics",
    relationship: "RESEARCHED",
    label: "Engineered DFIR Frameworks",
    evidence: "M.Tech curriculum",
  },
  {
    id: "e7",
    source: "edu-mtech",
    target: "spec-cybersecurity",
    relationship: "APPLIED",
    label: "Applied Zero-Trust Models",
    evidence: "Curriculum & lab work",
  },
  {
    id: "e8",
    source: "edu-mca",
    target: "spec-ai-reasoning",
    relationship: "BUILT",
    label: "Engineered Software & AI",
    evidence: "Computer applications study",
  },

  // Tarik → Ventures & Projects
  {
    id: "e9",
    source: "tarik-islam",
    target: "biz-dezo",
    relationship: "FOUNDED",
    label: "Founded Studio",
    evidence: "Founder role at dezo.in",
  },
  {
    id: "e10",
    source: "tarik-islam",
    target: "proj-digital-canvas",
    relationship: "BUILT",
    label: "Architected Platform",
    evidence: "Live codebase at tarikislam.in",
  },
  {
    id: "e11",
    source: "tarik-islam",
    target: "proj-find-details",
    relationship: "BUILT",
    label: "Engineered OSINT Kernel",
    evidence: "Live component in portfolio",
  },
  {
    id: "e12",
    source: "tarik-islam",
    target: "proj-forensic-lab",
    relationship: "BUILT",
    label: "Created Synthetic Lab",
    evidence: "Live laboratory in portfolio",
  },

  // Tarik → Certifications
  {
    id: "e13",
    source: "tarik-islam",
    target: "cert-ceh",
    relationship: "CERTIFIED",
    label: "Certified",
    evidence: "EC-Council",
  },
  {
    id: "e14",
    source: "tarik-islam",
    target: "cert-chfi",
    relationship: "CERTIFIED",
    label: "Certified",
    evidence: "EC-Council",
  },
  {
    id: "e15",
    source: "tarik-islam",
    target: "cert-oscp",
    relationship: "CERTIFIED",
    label: "Certified",
    evidence: "Offensive Security",
  },

  // Cross-linkages
  {
    id: "e16",
    source: "spec-toxicology",
    target: "proj-forensic-lab",
    relationship: "DOCUMENTED",
    label: "Demonstrated in Lab",
    evidence: "CASE 0001 Tox workflow",
  },
  {
    id: "e17",
    source: "spec-digital-forensics",
    target: "proj-forensic-lab",
    relationship: "APPLIED",
    label: "DFIR 8-Stage Pipeline",
    evidence: "ForensicToolboxExplorer",
  },
  {
    id: "e18",
    source: "spec-ai-reasoning",
    target: "proj-find-details",
    relationship: "APPLIED",
    label: "Automated Intent Classifier",
    evidence: "Query classifier algorithm",
  },
];
