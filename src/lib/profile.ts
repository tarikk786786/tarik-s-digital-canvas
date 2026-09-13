// Verified profile details for Tarik Islam.
// Forensic science is the root identity; cyber, AI, and Dezo.in follow from that foundation.

export interface AcademicCredential {
  degree: string;
  field: string;
  level: string;
  status: "completed" | "in-progress";
  highlights: string;
  competencies: string[];
}

export const PROFILE = {
  name: "Tarik Islam",
  primaryRole: "Forensic Science Specialist — Investigation & Toxicology",
  identity: "Forensic Scientist · Investigation & Toxicology · Digital Forensics",
  headline:
    "Building intelligent systems that see the invisible.",
  professionalSummary:
    "Forensic science specialist focused on investigation and toxicology. Foundation in B.Sc and M.Sc Forensic Science, then MCA for software systems, then M.Tech in Cyber Security & AI with digital forensics. Founder of Dezo.in — applying laboratory rigor to evidence, systems, and intelligent software.",
  location: "Bhubaneswar, Odisha, India",
  timezone: "UTC+05:30 (IST)",
  email: "princetarikislam@gmail.com",
  phone: "+91 91144 11026",
  availability: "Available for forensic consultation, investigation support, and selective architecture work",
  focus: "Forensic Investigation · Toxicology · Digital Forensics · Cyber Security · AI",

  // Academic path: forensic foundation → MCA → M.Tech Cyber Security & AI / Digital Forensics
  education: [
    {
      degree: "B.Sc",
      field: "Forensic Science",
      level: "Bachelor of Science",
      status: "completed",
      highlights:
        "Investigative foundation: crime-scene method, dactyloscopy, ballistics, questioned documents, and evidence preservation.",
      competencies: [
        "Dactyloscopy & Ridge Analysis",
        "Forensic Ballistics & Toolmarks",
        "Questioned Documents & ESDA",
        "Physical Evidence Preservation",
      ],
    },
    {
      degree: "M.Sc",
      field: "Forensic Science — Investigation & Toxicology",
      level: "Master of Science",
      status: "completed",
      highlights:
        "Specialization in forensic investigation and toxicology: GC-MS / HPLC analytical chemistry, biological evidence, and chain-of-custody protocols for court-ready reporting.",
      competencies: [
        "Forensic Toxicology & GC-MS",
        "Serology & DNA Analysis",
        "Chemical Extraction Protocols",
        "Courtroom Admissibility (ISO/IEC 17025)",
      ],
    },
    {
      degree: "MCA",
      field: "Computer Applications",
      level: "Master of Computer Applications",
      status: "completed",
      highlights:
        "Software systems layer on the forensic foundation: architectures, databases, and engineering practice for building investigative tools.",
      competencies: [
        "Distributed Systems",
        "Full-Stack Architecture",
        "Database Optimization",
        "Object-Oriented & Functional Design",
      ],
    },
    {
      degree: "M.Tech",
      field: "Cyber Security & AI / Digital Forensics",
      level: "Postgraduate Engineering",
      status: "completed",
      highlights:
        "Digital forensics, defensive cyber architecture, and AI systems — extending physical investigation into memory, networks, and audit-grade intelligence.",
      competencies: [
        "Digital Forensics & Evidence Integrity",
        "Threat Modeling & Mitigation",
        "AI Reasoning Architectures",
        "Applied Cryptography",
      ],
    },
  ] as AcademicCredential[],

  // Specialized Technical Training Areas
  technicalTraining: [
    {
      domain: "Advanced Programming & Algorithmic Systems",
      focus: "Core system algorithms, data structures, and high-performance backend pipelines.",
    },
    {
      domain: "Applied Software Engineering & Web Architecture",
      focus: "Full-stack cloud applications, reactive frontend architectures, and edge deployment.",
    },
    {
      domain: "Advanced Systems Architecture & Network Security",
      focus: "Network defense, containerization, protocol dissection, and infrastructure security.",
    },
  ],

  // Core Programming Languages & Toolchain
  programmingLanguages: [
    "Python",
    "Java",
    "C / C++",
    "JavaScript / TypeScript",
    "PHP",
    "SQL",
    "HTML5 & CSS3",
  ],

  // Primary Resume Certifications
  resumeCertifications: [
    {
      code: "CEH",
      name: "Certified Ethical Hacker",
      issuer: "EC-Council",
      status: "verified",
    },
    {
      code: "CHFI",
      name: "Computer Hacking Forensic Investigator",
      issuer: "EC-Council",
      status: "verified",
    },
    {
      code: "OSCP",
      name: "Offensive Security Certified Professional",
      issuer: "Offensive Security",
      status: "verified",
    },
  ],

  // Core Strengths
  strengths: [
    "Investigation-first mindset from forensic science and toxicology practice",
    "Clear academic path: Forensic Science → MCA → M.Tech Cyber Security & AI / Digital Forensics",
    "Uncompromising attention to detail, evidence integrity, and chain-of-custody discipline",
    "Builds Dezo.in and cyber/AI systems without abandoning the forensic root",
  ],
} as const;

export type VerificationStatus =
  | "verified"
  | "self-reported"
  | "academic"
  | "prototype";
