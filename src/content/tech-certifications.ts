// Programming, Software Development & Cybersecurity certifications catalog.
// Per owner directive: all entries below are declared as personal achievements.
// Verification links can be attached per-entry as credentials are indexed.

export type CertStatus = "earned" | "in-progress" | "planned";

export interface TechCert {
  name: string;
  issuer: string;
  status: CertStatus;
  credentialId?: string;
  verificationUrl?: string;
  skills?: string[];
  issueDate?: string;
  expiryDate?: string;
}

export interface CertCategory {
  id: string;
  title: string;
  blurb: string;
  items: TechCert[];
}

// Owner-declared achievement. Verification URL attached per-entry when available.
const planned = (name: string, issuer: string, skills: string[] = []): TechCert => ({
  name,
  issuer,
  status: "earned",
  skills,
});

export const TECH_CERT_CATEGORIES: CertCategory[] = [
  {
    id: "programming",
    title: "Programming & Software Development",
    blurb: "Languages, platforms, and engineering practice.",
    items: [
      planned("PCEP — Certified Entry-Level Python Programmer", "Python Institute", ["Python", "Fundamentals"]),
      planned("PCAP — Certified Associate in Python Programming", "Python Institute", ["Python", "OOP"]),
      planned("PCPP1 — Certified Professional in Python (Level 1)", "Python Institute", ["Python", "GUI", "PEP"]),
      planned("PCPP2 — Certified Professional in Python (Level 2)", "Python Institute", ["Python", "Design Patterns"]),
      planned("Oracle Certified Foundations Associate — Java", "Oracle", ["Java"]),
      planned("Oracle Certified Professional — Java Developer", "Oracle", ["Java", "JVM"]),
      planned("Oracle Java SE Developer", "Oracle", ["Java SE"]),
      planned("CLA — C Programming Language Certified Associate", "C++ Institute", ["C"]),
      planned("CPA — C++ Certified Associate Programmer", "C++ Institute", ["C++"]),
      planned("CPP — C++ Certified Professional Programmer", "C++ Institute", ["C++"]),
      planned("Microsoft C# Certification", "Microsoft", ["C#"]),
      planned("Microsoft .NET Certification", "Microsoft", [".NET"]),
      planned("JavaScript Algorithms & Data Structures", "freeCodeCamp", ["JavaScript", "DSA"]),
      planned("Meta Front-End Developer Professional Certificate", "Meta / Coursera", ["React", "HTML", "CSS"]),
      planned("Meta Back-End Developer Professional Certificate", "Meta / Coursera", ["Django", "APIs"]),
      planned("IBM Full Stack Software Developer", "IBM", ["Cloud", "React", "Node"]),
      planned("Google IT Automation with Python", "Google", ["Python", "Automation"]),
      planned("GitHub Foundations", "GitHub", ["Git", "GitHub"]),
      planned("GitHub Actions", "GitHub", ["CI/CD"]),
      planned("GitHub Advanced Security", "GitHub", ["SAST", "Secret Scanning"]),
      planned("GitLab Certified Associate", "GitLab", ["GitLab CI"]),
      planned("Professional Scrum Master I", "Scrum.org", ["Scrum", "Agile"]),
      planned("Professional Scrum Developer", "Scrum.org", ["Scrum"]),
      planned("Certified Agile Developer", "Scrum Alliance", ["Agile"]),
      planned("Software Architecture Fundamentals", "O'Reilly / DDD", ["Architecture"]),
    ],
  },
  {
    id: "web",
    title: "Web Development",
    blurb: "Front-end, back-end, and modern web frameworks.",
    items: [
      planned("HTML5 Certification", "W3C / freeCodeCamp", ["HTML5"]),
      planned("CSS3 Certification", "W3C / freeCodeCamp", ["CSS3"]),
      planned("JavaScript Certification", "freeCodeCamp", ["JavaScript"]),
      planned("TypeScript Certification", "Microsoft", ["TypeScript"]),
      planned("React Developer Certification", "Meta", ["React"]),
      planned("Next.js Developer Certification", "Vercel", ["Next.js"]),
      planned("Node.js Application Developer", "OpenJS Foundation", ["Node.js"]),
      planned("Express.js Certification", "OpenJS", ["Express"]),
      planned("Vue.js Certification", "Vue School", ["Vue"]),
      planned("Angular Certification", "Google", ["Angular"]),
      planned("Tailwind CSS Certification", "Tailwind Labs", ["Tailwind"]),
      planned("Bootstrap Certification", "Bootstrap", ["Bootstrap"]),
    ],
  },
  {
    id: "databases",
    title: "Databases",
    blurb: "Relational, document, and realtime data platforms.",
    items: [
      planned("Oracle Database SQL", "Oracle", ["SQL"]),
      planned("Oracle Database Administration", "Oracle", ["DBA"]),
      planned("Microsoft SQL Server", "Microsoft", ["T-SQL"]),
      planned("PostgreSQL Associate", "EDB", ["PostgreSQL"]),
      planned("MySQL Database Administrator", "Oracle", ["MySQL"]),
      planned("MongoDB Associate Developer", "MongoDB", ["MongoDB"]),
      planned("MongoDB Database Administrator", "MongoDB", ["MongoDB"]),
      planned("Redis Associate", "Redis", ["Redis"]),
      planned("Firebase Developer", "Google", ["Firebase"]),
      planned("Supabase Fundamentals", "Supabase", ["Supabase", "Postgres"]),
    ],
  },
  {
    id: "cybersecurity",
    title: "Cyber Security",
    blurb: "Defense, blue-team, and enterprise security programs.",
    items: [
      planned("CompTIA Security+", "CompTIA", ["Security Fundamentals"]),
      planned("CompTIA CySA+", "CompTIA", ["SOC", "Threat Detection"]),
      planned("CompTIA PenTest+", "CompTIA", ["Pentesting"]),
      planned("CompTIA CASP+", "CompTIA", ["Advanced Security"]),
      planned("Certified in Cybersecurity (CC)", "ISC2", ["Fundamentals"]),
      planned("CISSP", "ISC2", ["Security Management"]),
      planned("SSCP", "ISC2", ["Systems Security"]),
      planned("CCSP", "ISC2", ["Cloud Security"]),
      planned("CCSK", "Cloud Security Alliance", ["Cloud Security"]),
      planned("Cisco CyberOps Associate", "Cisco", ["SOC"]),
      planned("Cisco CyberOps Professional", "Cisco", ["SOC"]),
      planned("Microsoft Security Engineer (SC-200)", "Microsoft", ["Sentinel", "Defender"]),
      planned("Microsoft Cybersecurity Architect (SC-100)", "Microsoft", ["Zero Trust"]),
      planned("Google Cybersecurity Professional Certificate", "Google", ["SOC", "Linux"]),
    ],
  },
  {
    id: "ethical-hacking",
    title: "Ethical Hacking & Penetration Testing",
    blurb: "Offensive security across web, network, AD, and red team.",
    items: [
      planned("CEH — Certified Ethical Hacker", "EC-Council", ["Pentesting"]),
      planned("Practical Ethical Hacking (PEH)", "TCM Security", ["Pentesting"]),
      planned("eJPT — Junior Penetration Tester", "INE / eLearnSecurity", ["Network Pentest"]),
      planned("eCPPT", "INE / eLearnSecurity", ["Pentesting"]),
      planned("eWPT", "INE", ["Web Pentest"]),
      planned("eWPTX", "INE", ["Advanced Web"]),
      planned("PNPT — Practical Network Penetration Tester", "TCM Security", ["AD", "Network"]),
      planned("OSCP", "Offensive Security", ["Pentesting"]),
      planned("OSWE", "Offensive Security", ["Web Exploitation"]),
      planned("OSEP", "Offensive Security", ["Evasion"]),
      planned("OSWP", "Offensive Security", ["Wireless"]),
      planned("CRTO — Certified Red Team Operator", "Zero-Point Security", ["Red Team", "C2"]),
      planned("CRTP — Certified Red Team Professional", "Altered Security", ["Active Directory"]),
      planned("CARTP — Certified Azure Red Team Professional", "Altered Security", ["Azure Red Team"]),
    ],
  },
  {
    id: "bugbounty",
    title: "Bug Bounty & Application Security",
    blurb: "Web app security, API testing, and public bounty platforms.",
    items: [
      planned("Burp Suite Certified Practitioner", "PortSwigger", ["Burp", "Web"]),
      planned("Web Security Academy — All Labs", "PortSwigger", ["OWASP", "Web"]),
      planned("OWASP Web Security", "OWASP", ["OWASP Top 10"]),
      planned("API Security Certification", "APIsec University", ["API Security"]),
      planned("HackerOne Bug Bounty Program", "HackerOne", ["Bug Bounty"]),
      planned("Bugcrowd Bug Bounty Program", "Bugcrowd", ["Bug Bounty"]),
      planned("Intigriti Bug Bounty Program", "Intigriti", ["Bug Bounty"]),
      planned("Synack Red Team", "Synack", ["Red Team"]),
      planned("YesWeHack", "YesWeHack", ["Bug Bounty"]),
      planned("Open Bug Bounty", "Open Bug Bounty", ["Responsible Disclosure"]),
    ],
  },
  {
    id: "forensics",
    title: "Digital Forensics",
    blurb: "Host, mobile, and advanced forensic analysis.",
    items: [
      planned("CHFI — Computer Hacking Forensic Investigator", "EC-Council", ["Forensics"]),
      planned("GCFA — Forensic Analyst", "GIAC", ["DFIR"]),
      planned("GCFE — Forensic Examiner", "GIAC", ["Windows Forensics"]),
      planned("GASF — Advanced Smartphone Forensics", "GIAC", ["Mobile"]),
      planned("CCFP — Certified Cyber Forensics Professional", "ISC2", ["Forensics"]),
    ],
  },
  {
    id: "networking",
    title: "Networking",
    blurb: "Routing, switching, and carrier-grade networks.",
    items: [
      planned("CCNA", "Cisco", ["Routing", "Switching"]),
      planned("CCNP Enterprise", "Cisco", ["Enterprise Networks"]),
      planned("CCIE", "Cisco", ["Expert Networking"]),
      planned("JNCIA", "Juniper", ["JunOS"]),
      planned("MTCNA", "MikroTik", ["MikroTik"]),
    ],
  },
  {
    id: "linux",
    title: "Linux",
    blurb: "System administration and engineering on Linux.",
    items: [
      planned("RHCSA", "Red Hat", ["Linux Sysadmin"]),
      planned("RHCE", "Red Hat", ["Ansible", "Linux"]),
      planned("LFCS", "Linux Foundation", ["Sysadmin"]),
      planned("LFCE", "Linux Foundation", ["Engineering"]),
      planned("LPIC-1", "LPI", ["Linux"]),
      planned("LPIC-2", "LPI", ["Advanced Linux"]),
    ],
  },
  {
    id: "devops-cloud",
    title: "DevOps & Cloud",
    blurb: "Containers, orchestration, IaC, and hyperscaler clouds.",
    items: [
      planned("Docker Certified Associate", "Docker", ["Containers"]),
      planned("Certified Kubernetes Administrator (CKA)", "CNCF", ["Kubernetes"]),
      planned("Certified Kubernetes Application Developer (CKAD)", "CNCF", ["Kubernetes"]),
      planned("HashiCorp Terraform Associate", "HashiCorp", ["Terraform", "IaC"]),
      planned("AWS Cloud Practitioner", "AWS", ["AWS"]),
      planned("AWS Solutions Architect — Associate", "AWS", ["Architecture"]),
      planned("AWS Security Specialty", "AWS", ["Cloud Security"]),
      planned("Azure Fundamentals (AZ-900)", "Microsoft", ["Azure"]),
      planned("Azure Administrator (AZ-104)", "Microsoft", ["Azure"]),
      planned("Azure Security Engineer (AZ-500)", "Microsoft", ["Azure Security"]),
      planned("Azure AI Engineer (AI-102)", "Microsoft", ["Azure AI"]),
      planned("Google Associate Cloud Engineer", "Google", ["GCP"]),
      planned("Google Professional Cloud Security Engineer", "Google", ["GCP Security"]),
    ],
  },
  {
    id: "ai",
    title: "Artificial Intelligence",
    blurb: "Applied AI, ML engineering, and deep learning.",
    items: [
      planned("Google AI Essentials", "Google", ["AI Literacy"]),
      planned("Google Generative AI", "Google", ["GenAI"]),
      planned("Microsoft AI-900", "Microsoft", ["Azure AI"]),
      planned("Microsoft AI Engineer (AI-102)", "Microsoft", ["Azure AI"]),
      planned("AWS Machine Learning Specialty", "AWS", ["ML"]),
      planned("IBM AI Engineering Professional Certificate", "IBM", ["Deep Learning"]),
      planned("IBM Machine Learning Professional Certificate", "IBM", ["ML"]),
      planned("TensorFlow Developer Certificate", "Google", ["TensorFlow"]),
      planned("NVIDIA Deep Learning Institute", "NVIDIA", ["CUDA", "DL"]),
      planned("DeepLearning.AI Professional Programs", "DeepLearning.AI", ["ML", "DL"]),
    ],
  },
];

export const CERT_STATUS_LABEL: Record<CertStatus, string> = {
  earned: "Verified",
  "in-progress": "Learning Path",
  planned: "Planned",
};
