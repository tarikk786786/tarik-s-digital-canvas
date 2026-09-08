// Programming, Software Development & Cybersecurity certification learning roadmap.
// Status: "planned" = on learning roadmap, "in-progress" = actively studying, "earned" = completed.
// Verification links attached per-entry as credentials are obtained.

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
const cert = (name: string, issuer: string, skills: string[] = []): TechCert => ({
  name,
  issuer,
  status: "planned",
  skills,
});

export const TECH_CERT_CATEGORIES: CertCategory[] = [
  {
    id: "programming",
    title: "Programming & Software Development",
    blurb: "Languages, platforms, and engineering practice.",
    items: [
      cert("PCEP — Certified Entry-Level Python Programmer", "Python Institute", ["Python", "Fundamentals"]),
      cert("PCAP — Certified Associate in Python Programming", "Python Institute", ["Python", "OOP"]),
      cert("PCPP1 — Certified Professional in Python (Level 1)", "Python Institute", ["Python", "GUI", "PEP"]),
      cert("PCPP2 — Certified Professional in Python (Level 2)", "Python Institute", ["Python", "Design Patterns"]),
      cert("Oracle Certified Foundations Associate — Java", "Oracle", ["Java"]),
      cert("Oracle Certified Professional — Java Developer", "Oracle", ["Java", "JVM"]),
      cert("Oracle Java SE Developer", "Oracle", ["Java SE"]),
      cert("CLA — C Programming Language Certified Associate", "C++ Institute", ["C"]),
      cert("CPA — C++ Certified Associate Programmer", "C++ Institute", ["C++"]),
      cert("CPP — C++ Certified Professional Programmer", "C++ Institute", ["C++"]),
      cert("Microsoft C# Certification", "Microsoft", ["C#"]),
      cert("Microsoft .NET Certification", "Microsoft", [".NET"]),
      cert("JavaScript Algorithms & Data Structures", "freeCodeCamp", ["JavaScript", "DSA"]),
      cert("Meta Front-End Developer Professional Certificate", "Meta / Coursera", ["React", "HTML", "CSS"]),
      cert("Meta Back-End Developer Professional Certificate", "Meta / Coursera", ["Django", "APIs"]),
      cert("IBM Full Stack Software Developer", "IBM", ["Cloud", "React", "Node"]),
      cert("Google IT Automation with Python", "Google", ["Python", "Automation"]),
      cert("GitHub Foundations", "GitHub", ["Git", "GitHub"]),
      cert("GitHub Actions", "GitHub", ["CI/CD"]),
      cert("GitHub Advanced Security", "GitHub", ["SAST", "Secret Scanning"]),
      cert("GitLab Certified Associate", "GitLab", ["GitLab CI"]),
      cert("Professional Scrum Master I", "Scrum.org", ["Scrum", "Agile"]),
      cert("Professional Scrum Developer", "Scrum.org", ["Scrum"]),
      cert("Certified Agile Developer", "Scrum Alliance", ["Agile"]),
      cert("Software Architecture Fundamentals", "O'Reilly / DDD", ["Architecture"]),
    ],
  },
  {
    id: "web",
    title: "Web Development",
    blurb: "Front-end, back-end, and modern web frameworks.",
    items: [
      cert("HTML5 Certification", "W3C / freeCodeCamp", ["HTML5"]),
      cert("CSS3 Certification", "W3C / freeCodeCamp", ["CSS3"]),
      cert("JavaScript Certification", "freeCodeCamp", ["JavaScript"]),
      cert("TypeScript Certification", "Microsoft", ["TypeScript"]),
      cert("React Developer Certification", "Meta", ["React"]),
      cert("Next.js Developer Certification", "Vercel", ["Next.js"]),
      cert("Node.js Application Developer", "OpenJS Foundation", ["Node.js"]),
      cert("Express.js Certification", "OpenJS", ["Express"]),
      cert("Vue.js Certification", "Vue School", ["Vue"]),
      cert("Angular Certification", "Google", ["Angular"]),
      cert("Tailwind CSS Certification", "Tailwind Labs", ["Tailwind"]),
      cert("Bootstrap Certification", "Bootstrap", ["Bootstrap"]),
    ],
  },
  {
    id: "databases",
    title: "Databases",
    blurb: "Relational, document, and realtime data platforms.",
    items: [
      cert("Oracle Database SQL", "Oracle", ["SQL"]),
      cert("Oracle Database Administration", "Oracle", ["DBA"]),
      cert("Microsoft SQL Server", "Microsoft", ["T-SQL"]),
      cert("PostgreSQL Associate", "EDB", ["PostgreSQL"]),
      cert("MySQL Database Administrator", "Oracle", ["MySQL"]),
      cert("MongoDB Associate Developer", "MongoDB", ["MongoDB"]),
      cert("MongoDB Database Administrator", "MongoDB", ["MongoDB"]),
      cert("Redis Associate", "Redis", ["Redis"]),
      cert("Firebase Developer", "Google", ["Firebase"]),
      cert("Supabase Fundamentals", "Supabase", ["Supabase", "Postgres"]),
    ],
  },
  {
    id: "cybersecurity",
    title: "Cyber Security",
    blurb: "Defense, blue-team, and enterprise security programs.",
    items: [
      cert("CompTIA Security+", "CompTIA", ["Security Fundamentals"]),
      cert("CompTIA CySA+", "CompTIA", ["SOC", "Threat Detection"]),
      cert("CompTIA PenTest+", "CompTIA", ["Pentesting"]),
      cert("CompTIA CASP+", "CompTIA", ["Advanced Security"]),
      cert("Certified in Cybersecurity (CC)", "ISC2", ["Fundamentals"]),
      cert("CISSP", "ISC2", ["Security Management"]),
      cert("SSCP", "ISC2", ["Systems Security"]),
      cert("CCSP", "ISC2", ["Cloud Security"]),
      cert("CCSK", "Cloud Security Alliance", ["Cloud Security"]),
      cert("Cisco CyberOps Associate", "Cisco", ["SOC"]),
      cert("Cisco CyberOps Professional", "Cisco", ["SOC"]),
      cert("Microsoft Security Engineer (SC-200)", "Microsoft", ["Sentinel", "Defender"]),
      cert("Microsoft Cybersecurity Architect (SC-100)", "Microsoft", ["Zero Trust"]),
      cert("Google Cybersecurity Professional Certificate", "Google", ["SOC", "Linux"]),
    ],
  },
  {
    id: "ethical-hacking",
    title: "Ethical Hacking & Penetration Testing",
    blurb: "Offensive security across web, network, AD, and red team.",
    items: [
      cert("CEH — Certified Ethical Hacker", "EC-Council", ["Pentesting"]),
      cert("Practical Ethical Hacking (PEH)", "TCM Security", ["Pentesting"]),
      cert("eJPT — Junior Penetration Tester", "INE / eLearnSecurity", ["Network Pentest"]),
      cert("eCPPT", "INE / eLearnSecurity", ["Pentesting"]),
      cert("eWPT", "INE", ["Web Pentest"]),
      cert("eWPTX", "INE", ["Advanced Web"]),
      cert("PNPT — Practical Network Penetration Tester", "TCM Security", ["AD", "Network"]),
      cert("OSCP", "Offensive Security", ["Pentesting"]),
      cert("OSWE", "Offensive Security", ["Web Exploitation"]),
      cert("OSEP", "Offensive Security", ["Evasion"]),
      cert("OSWP", "Offensive Security", ["Wireless"]),
      cert("CRTO — Certified Red Team Operator", "Zero-Point Security", ["Red Team", "C2"]),
      cert("CRTP — Certified Red Team Professional", "Altered Security", ["Active Directory"]),
      cert("CARTP — Certified Azure Red Team Professional", "Altered Security", ["Azure Red Team"]),
    ],
  },
  {
    id: "bugbounty",
    title: "Bug Bounty & Application Security",
    blurb: "Web app security, API testing, and public bounty platforms.",
    items: [
      cert("Burp Suite Certified Practitioner", "PortSwigger", ["Burp", "Web"]),
      cert("Web Security Academy — All Labs", "PortSwigger", ["OWASP", "Web"]),
      cert("OWASP Web Security", "OWASP", ["OWASP Top 10"]),
      cert("API Security Certification", "APIsec University", ["API Security"]),
      cert("HackerOne Bug Bounty Program", "HackerOne", ["Bug Bounty"]),
      cert("Bugcrowd Bug Bounty Program", "Bugcrowd", ["Bug Bounty"]),
      cert("Intigriti Bug Bounty Program", "Intigriti", ["Bug Bounty"]),
      cert("Synack Red Team", "Synack", ["Red Team"]),
      cert("YesWeHack", "YesWeHack", ["Bug Bounty"]),
      cert("Open Bug Bounty", "Open Bug Bounty", ["Responsible Disclosure"]),
    ],
  },
  {
    id: "forensics",
    title: "Digital Forensics",
    blurb: "Host, mobile, and advanced forensic analysis.",
    items: [
      cert("CHFI — Computer Hacking Forensic Investigator", "EC-Council", ["Forensics"]),
      cert("GCFA — Forensic Analyst", "GIAC", ["DFIR"]),
      cert("GCFE — Forensic Examiner", "GIAC", ["Windows Forensics"]),
      cert("GASF — Advanced Smartphone Forensics", "GIAC", ["Mobile"]),
      cert("CCFP — Certified Cyber Forensics Professional", "ISC2", ["Forensics"]),
    ],
  },
  {
    id: "networking",
    title: "Networking",
    blurb: "Routing, switching, and carrier-grade networks.",
    items: [
      cert("CCNA", "Cisco", ["Routing", "Switching"]),
      cert("CCNP Enterprise", "Cisco", ["Enterprise Networks"]),
      cert("CCIE", "Cisco", ["Expert Networking"]),
      cert("JNCIA", "Juniper", ["JunOS"]),
      cert("MTCNA", "MikroTik", ["MikroTik"]),
    ],
  },
  {
    id: "linux",
    title: "Linux",
    blurb: "System administration and engineering on Linux.",
    items: [
      cert("RHCSA", "Red Hat", ["Linux Sysadmin"]),
      cert("RHCE", "Red Hat", ["Ansible", "Linux"]),
      cert("LFCS", "Linux Foundation", ["Sysadmin"]),
      cert("LFCE", "Linux Foundation", ["Engineering"]),
      cert("LPIC-1", "LPI", ["Linux"]),
      cert("LPIC-2", "LPI", ["Advanced Linux"]),
    ],
  },
  {
    id: "devops-cloud",
    title: "DevOps & Cloud",
    blurb: "Containers, orchestration, IaC, and hyperscaler clouds.",
    items: [
      cert("Docker Certified Associate", "Docker", ["Containers"]),
      cert("Certified Kubernetes Administrator (CKA)", "CNCF", ["Kubernetes"]),
      cert("Certified Kubernetes Application Developer (CKAD)", "CNCF", ["Kubernetes"]),
      cert("HashiCorp Terraform Associate", "HashiCorp", ["Terraform", "IaC"]),
      cert("AWS Cloud Practitioner", "AWS", ["AWS"]),
      cert("AWS Solutions Architect — Associate", "AWS", ["Architecture"]),
      cert("AWS Security Specialty", "AWS", ["Cloud Security"]),
      cert("Azure Fundamentals (AZ-900)", "Microsoft", ["Azure"]),
      cert("Azure Administrator (AZ-104)", "Microsoft", ["Azure"]),
      cert("Azure Security Engineer (AZ-500)", "Microsoft", ["Azure Security"]),
      cert("Azure AI Engineer (AI-102)", "Microsoft", ["Azure AI"]),
      cert("Google Associate Cloud Engineer", "Google", ["GCP"]),
      cert("Google Professional Cloud Security Engineer", "Google", ["GCP Security"]),
    ],
  },
  {
    id: "ai",
    title: "Artificial Intelligence",
    blurb: "Applied AI, ML engineering, and deep learning.",
    items: [
      cert("Google AI Essentials", "Google", ["AI Literacy"]),
      cert("Google Generative AI", "Google", ["GenAI"]),
      cert("Microsoft AI-900", "Microsoft", ["Azure AI"]),
      cert("Microsoft AI Engineer (AI-102)", "Microsoft", ["Azure AI"]),
      cert("AWS Machine Learning Specialty", "AWS", ["ML"]),
      cert("IBM AI Engineering Professional Certificate", "IBM", ["Deep Learning"]),
      cert("IBM Machine Learning Professional Certificate", "IBM", ["ML"]),
      cert("TensorFlow Developer Certificate", "Google", ["TensorFlow"]),
      cert("NVIDIA Deep Learning Institute", "NVIDIA", ["CUDA", "DL"]),
      cert("DeepLearning.AI Professional Programs", "DeepLearning.AI", ["ML", "DL"]),
    ],
  },
];

export const CERT_STATUS_LABEL: Record<CertStatus, string> = {
  earned: "Earned",
  "in-progress": "Learning Path",
  planned: "Planned",
};
