// Verified profile details for Tarik Islam.
// Highlighting multidisciplinary expertise across Forensic Science, Cybersecurity, and AI Systems.

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
  primaryRole: "Founder & CEO, Dezo.in",
  identity: "Forensic Scientist × Cybersecurity Engineer × AI Developer",
  headline:
    "Investigating evidence. Defending systems. Engineering intelligence.",
  professionalSummary:
    "A multidisciplinary technologist driven by relentless scientific curiosity and investigative rigor. Expert in Forensic Science disciplines (toxicology, dactyloscopy, serology, ballistics), Cybersecurity, and AI Systems Engineering. Passionate about researching underlying systems, uncovering anomalies, and building audit-grade software platforms.",
  location: "Bhubaneswar, Odisha, India",
  timezone: "UTC+05:30 (IST)",
  email: "princetarikislam@gmail.com",
  phone: "+91 8984473230",
  availability: "Available for selected high-stakes collaborations & architecture audits",
  focus: "Forensics · Cybersecurity · AI Systems · Full Stack",

  // Academic Degrees & Scientific Qualifications (Chronological Progression: B.Sc -> M.Sc -> MCA -> M.Tech)
  education: [
    {
      degree: "B.Sc",
      field: "Forensic Science",
      level: "Bachelor of Science",
      status: "completed",
      highlights:
        "Rigorous foundation in empirical scientific investigation, dactyloscopy minutiae, forensic ballistics, questioned document examination, and crime scene reconstruction.",
      competencies: [
        "Dactyloscopy & Ridge Analysis",
        "Forensic Ballistics & Toolmarks",
        "Questioned Documents & ESDA",
        "Physical Evidence Preservation",
      ],
    },
    {
      degree: "M.Sc",
      field: "Forensic Science",
      level: "Master of Science",
      status: "completed",
      highlights:
        "Specialized in advanced forensic toxicology, analytical chemistry (GC-MS / HPLC), biological evidence (serology & DNA), and evidentiary chain-of-custody protocols.",
      competencies: [
        "Forensic Toxicology & GC-MS",
        "Serology & DNA Analysis",
        "Chemical Extraction Protocols",
        "Courtroom Admissibility (ISO/IEC 17025)",
      ],
    },
    {
      degree: "MCA",
      field: "Computer Applications & Software Systems",
      level: "Master of Computer Applications",
      status: "completed",
      highlights:
        "Specialized in distributed software architectures, database internals, algorithmic optimization, and enterprise software engineering.",
      competencies: [
        "Distributed Systems",
        "Full-Stack Architecture",
        "Database Optimization",
        "Object-Oriented & Functional Design",
      ],
    },
    {
      degree: "M.Tech",
      field: "Cybersecurity & Artificial Intelligence",
      level: "Postgraduate Engineering",
      status: "completed",
      highlights:
        "Specialized in advanced defensive cyber architecture, neural inference, autonomous agent reasoning, and zero-trust engineering.",
      competencies: [
        "AI Reasoning Architectures",
        "Threat Modeling & Mitigation",
        "Applied Cryptography",
        "Kernel-Level Telemetry",
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
    "Deep curiosity for scientific research, anomaly detection, and empirical investigation",
    "Rare hybrid profile combining natural forensic science with full-stack software and AI",
    "Uncompromising attention to detail, evidence integrity, and chain-of-custody discipline",
    "Rapid technical adaptability in complex, high-stakes environments",
  ],
} as const;

export type VerificationStatus =
  | "verified"
  | "self-reported"
  | "academic"
  | "prototype";
