// Recognized forensic science disciplines. These are areas of knowledge and
// domains of practice — not personal certifications or achievements.

export type ForensicCategoryId =
  | "core"
  | "crime-scene"
  | "pattern"
  | "documents"
  | "trace"
  | "digital"
  | "specialized";

export interface ForensicCategory {
  id: ForensicCategoryId;
  label: string;
  short: string;
  blurb: string;
  items: string[];
}

export const FORENSIC_CATEGORIES: ForensicCategory[] = [
  {
    id: "core",
    label: "Core Forensic Sciences",
    short: "Core",
    blurb:
      "Foundational scientific disciplines applied to legal investigation — biology, chemistry, medicine, and human identification.",
    items: [
      "Forensic Biology",
      "Forensic Chemistry",
      "Forensic Physics",
      "Forensic Toxicology",
      "Forensic Medicine",
      "Forensic Pathology",
      "Forensic Anthropology",
      "Forensic Archaeology",
      "Forensic Odontology",
      "Forensic Serology",
      "Forensic Genetics",
      "DNA Analysis",
      "DNA Profiling",
      "Human Identification",
    ],
  },
  {
    id: "crime-scene",
    label: "Crime Scene Sciences",
    short: "Crime Scene",
    blurb:
      "Documenting, preserving, and reconstructing scenes of interest while maintaining evidentiary integrity.",
    items: [
      "Crime Scene Investigation",
      "Crime Scene Management",
      "Crime Scene Documentation",
      "Crime Scene Reconstruction",
      "Forensic Photography",
      "Evidence Collection",
      "Evidence Preservation",
      "Chain of Custody",
      "Trace Evidence Examination",
    ],
  },
  {
    id: "pattern",
    label: "Pattern & Impression Evidence",
    short: "Patterns",
    blurb:
      "Comparative analysis of marks, impressions, and biological patterns left at scenes.",
    items: [
      "Fingerprint Examination (Dactyloscopy)",
      "Palm Print Examination",
      "Footwear Impression Examination",
      "Tire Track Examination",
      "Bloodstain Pattern Analysis",
      "Toolmark Examination",
      "Firearms Identification",
      "Ballistics Examination",
      "Gunshot Residue Analysis",
      "Bite Mark Analysis",
    ],
  },
  {
    id: "documents",
    label: "Questioned Documents",
    short: "Documents",
    blurb:
      "Authenticity, authorship, and alteration analysis for written and printed material.",
    items: [
      "Questioned Document Examination",
      "Handwriting Examination",
      "Signature Verification",
      "Ink Analysis",
      "Paper Examination",
      "Counterfeit Document Examination",
    ],
  },
  {
    id: "trace",
    label: "Trace & Material Analysis",
    short: "Trace",
    blurb:
      "Microscopic and chemical examination of transferred materials and biological trace.",
    items: [
      "Hair Examination",
      "Fiber Examination",
      "Glass Examination",
      "Paint Examination",
      "Soil Analysis",
      "Pollen Analysis (Forensic Palynology)",
      "Botanical Evidence",
      "Entomological Evidence",
    ],
  },
  {
    id: "digital",
    label: "Digital & Cyber Forensics",
    short: "Digital",
    blurb:
      "Acquisition, preservation, and analysis of digital evidence across devices, networks, and cloud systems.",
    items: [
      "Digital Forensics",
      "Computer Forensics",
      "Mobile Device Forensics",
      "Network Forensics",
      "Cloud Forensics",
      "Memory Forensics",
      "Database Forensics",
      "Email Forensics",
      "Multimedia Forensics",
      "Audio Forensics",
      "Video Forensics",
      "Malware Analysis",
      "Cyber Forensics",
      "Incident Response",
      "Digital Evidence Analysis",
    ],
  },
  {
    id: "specialized",
    label: "Specialized Forensic Disciplines",
    short: "Specialized",
    blurb:
      "Domain-specific applications spanning environment, finance, behavior, and courtroom practice.",
    items: [
      "Wildlife Forensics",
      "Environmental Forensics",
      "Financial Forensics",
      "Forensic Accounting",
      "Explosives Investigation",
      "Fire & Arson Investigation",
      "Disaster Victim Identification (DVI)",
      "Forensic Intelligence",
      "Behavioral Forensics",
      "Forensic Psychology",
      "Forensic Psychiatry",
      "Laboratory Quality Assurance",
      "Scientific Report Writing",
      "Expert Witness Testimony",
    ],
  },
];

export const TOTAL_DOMAINS = FORENSIC_CATEGORIES.reduce(
  (n, c) => n + c.items.length,
  0,
);
