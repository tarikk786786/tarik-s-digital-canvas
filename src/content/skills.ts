// Skills & Certifications content system.
// Public site only renders entries with `verified: true` (see SHOW_UNVERIFIED
// in src/lib/profile.ts). No level, years, or evidence links are invented.

export type SkillLevel = "foundational" | "working" | "advanced" | "specialist";
export type ExperienceType =
  | "academic"
  | "laboratory"
  | "professional"
  | "project"
  | "research"
  | "self-directed";

export type Skill = {
  name: string;
  category: SkillCategoryId;
  subcategory?: string;
  level?: SkillLevel;
  experienceType?: ExperienceType;
  yearsUsed?: number;
  lastUsed?: string;
  description?: string;
  relatedProjects?: string[];
  relatedCredentials?: string[];
  evidenceUrls?: string[];
  verified: boolean;
  visible: boolean;
};

export type CertificationStatus =
  | "verified"
  | "pending"
  | "expired"
  | "in-progress"
  | "hidden";

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  category: string;
  issueDate?: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  certificateFile?: string;
  skills?: string[];
  description?: string;
  status: CertificationStatus;
  visible: boolean;
};

export type SkillCategoryId =
  | "forensics"
  | "ai"
  | "cybersecurity"
  | "languages"
  | "frontend"
  | "backend"
  | "data"
  | "cloud"
  | "automation"
  | "product"
  | "research"
  | "tools";

export const SKILL_CATEGORIES: {
  id: SkillCategoryId;
  label: string;
  short: string;
  intent: string;
}[] = [
  { id: "forensics", label: "Forensic Science", short: "Forensics", intent: "Crime-scene method, digital & pattern evidence, reporting." },
  { id: "ai", label: "Artificial Intelligence", short: "AI", intent: "LLMs, agents, retrieval, evaluation, applied ML." },
  { id: "cybersecurity", label: "Cybersecurity", short: "Security", intent: "AppSec, network, cloud, SOC, OSINT — defensive first." },
  { id: "languages", label: "Programming Languages", short: "Languages", intent: "Grouped by real familiarity, not vanity levels." },
  { id: "frontend", label: "Frontend & Creative Dev", short: "Frontend", intent: "React, TS, motion, WebGL, design systems, a11y." },
  { id: "backend", label: "Backend Engineering", short: "Backend", intent: "APIs, auth, queues, integrations, hardening." },
  { id: "data", label: "Databases & Data", short: "Data", intent: "Modelling, SQL, RLS, vector search, ETL." },
  { id: "cloud", label: "Cloud & DevOps", short: "DevOps", intent: "Git, CI, containers, edge, deploy pipelines." },
  { id: "automation", label: "Automation & Integration", short: "Automation", intent: "Workflow, webhooks, orchestration — lawful only." },
  { id: "product", label: "Product & Founder Craft", short: "Product", intent: "Discovery, roadmap, MVP, founder-led delivery." },
  { id: "research", label: "Research & Method", short: "Research", intent: "Methodology, writing, analytical reasoning." },
  { id: "tools", label: "Software & Tools", short: "Tools", intent: "Only tools genuinely used, not name-dropped." },
];

// -----------------------------------------------------------------------------
// TAXONOMY — the full canonical vocabulary from the master spec.
// This is the shape the /skills explorer knows how to render.
// Each individual entry only publishes on the site after Tarik marks it
// verified with evidence (project, coursework, certification, etc.).
// -----------------------------------------------------------------------------

export const SKILL_TAXONOMY: Record<SkillCategoryId, string[]> = {
  forensics: [
    "Crime Scene Investigation",
    "Evidence Collection & Preservation",
    "Chain of Custody",
    "Fingerprint Examination",
    "Biological Evidence Handling",
    "Forensic Toxicology (Fundamentals)",
    "Digital Evidence Preservation",
    "Forensic Imaging & Hashing",
    "File-System Analysis",
    "Memory Forensics",
    "Mobile Device Forensics",
    "Network Forensics",
    "Log & Timeline Analysis",
    "Forensic Report Writing",
  ],
  ai: [
    "Large Language Models",
    "Prompt Engineering",
    "Structured Output & Tool Calling",
    "AI Agents & Orchestration",
    "Retrieval-Augmented Generation",
    "Vector Databases & Embeddings",
    "Semantic & Hybrid Search",
    "Evaluation & Guardrails",
    "AI API Integration",
    "Applied ML Fundamentals",
    "Computer Vision Fundamentals",
    "NLP Fundamentals",
    "AI Product Architecture",
  ],
  cybersecurity: [
    "Web Application Security",
    "OWASP Top 10",
    "API Security",
    "AuthN / AuthZ",
    "Input Validation & Hardening",
    "Secrets Management",
    "Vulnerability Assessment",
    "Static & Dynamic Analysis",
    "Network Security Fundamentals",
    "Cloud Security & IAM",
    "SOC / SIEM Fundamentals",
    "Incident Response",
    "OSINT",
    "Responsible Disclosure",
  ],
  languages: [
    "TypeScript",
    "JavaScript",
    "Python",
    "SQL",
    "Bash",
    "HTML5",
    "CSS3",
    "JSON",
    "YAML",
    "Markdown",
    "Java",
    "C",
    "C++",
    "Go",
    "Rust",
    "PHP",
    "PowerShell",
  ],
  frontend: [
    "React",
    "Next.js / TanStack",
    "TypeScript",
    "Tailwind CSS",
    "Design Systems",
    "Accessibility (WCAG 2.2)",
    "Web Performance",
    "Framer Motion / Motion",
    "GSAP & ScrollTrigger",
    "Three.js / R3F",
    "PixiJS",
    "SVG & Lottie",
    "Shader Fundamentals",
    "SEO Fundamentals",
    "PWA",
  ],
  backend: [
    "Node.js",
    "Express / Nest",
    "FastAPI / Flask",
    "REST APIs",
    "GraphQL Fundamentals",
    "WebSockets & SSE",
    "Auth (OAuth, JWT, RBAC)",
    "Rate Limiting",
    "Background Jobs / Queues",
    "Webhook Integration",
    "Payment Integrations",
    "Backend Security & Hardening",
  ],
  data: [
    "PostgreSQL",
    "SQLite",
    "MongoDB",
    "Redis",
    "Supabase / Firebase",
    "Data Modelling",
    "Indexing & Query Optimization",
    "Migrations",
    "Row-Level Security",
    "Vector Databases",
    "ETL Fundamentals",
    "Data Validation & Cleaning",
  ],
  cloud: [
    "Git & GitHub",
    "GitHub Actions / CI/CD",
    "Docker",
    "Linux",
    "Cloudflare / Edge",
    "Vercel",
    "AWS Fundamentals",
    "Domain, DNS & TLS",
    "Monitoring & Logging",
    "Error Tracking",
    "Infrastructure Security",
  ],
  automation: [
    "Workflow Automation",
    "n8n",
    "Webhook Orchestration",
    "Scheduled Tasks",
    "ETL Pipelines",
    "Notification Systems",
    "AI Workflow Automation",
    "Data Synchronization",
    "Third-Party Integrations",
  ],
  product: [
    "Product Discovery",
    "Requirement Analysis",
    "MVP Delivery",
    "Founder-Led Product",
    "Technical Architecture",
    "Client Communication",
    "Roadmapping",
    "Analytics",
    "Conversion Optimization",
    "Agile Fundamentals",
  ],
  research: [
    "Research Methodology",
    "Literature Review",
    "Scientific Writing",
    "Technical Writing",
    "Analytical Reasoning",
    "Root-Cause Analysis",
    "Documentation",
    "Ethical Decision-Making",
    "Privacy Awareness",
  ],
  tools: [
    "VS Code",
    "GitHub",
    "Postman",
    "Docker Desktop",
    "Figma",
    "Wireshark",
    "Nmap",
    "Burp Suite",
    "OWASP ZAP",
    "Autopsy",
    "Volatility",
    "FTK Imager",
    "ExifTool",
    "CyberChef",
    "OpenAI / Anthropic / Google AI",
    "Hugging Face",
    "LangChain / LangGraph",
  ],
};

// -----------------------------------------------------------------------------
// VERIFIED INVENTORY — intentionally empty until Tarik confirms each entry.
// The public /skills page filters by `verified === true && visible === true`.
// Do NOT push placeholders here; use the taxonomy above for the neutral map.
// -----------------------------------------------------------------------------

export const SKILLS: Skill[] = [];

export const CERTIFICATIONS: Certification[] = [];

// Optional issuer catalog — used only as a filter label until real credentials
// are provided. Never rendered as an owned credential.
export const CERT_ISSUERS = [
  "Coursera", "edX", "NPTEL", "SWAYAM", "Google", "Microsoft", "AWS", "IBM",
  "Cisco", "Meta", "GitHub", "CompTIA", "EC-Council", "ISC2", "OffSec",
  "TryHackMe", "Hack The Box", "SANS", "NVIDIA", "DeepLearning.AI",
  "Hugging Face", "OpenAI", "MongoDB University", "Linux Foundation",
  "freeCodeCamp",
] as const;
