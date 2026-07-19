// Skills & Certifications content system.
// The public site publishes ONLY what is verified. The taxonomy below is
// vocabulary — it is displayed as a knowledge map without proficiency levels,
// years, or credential claims until an evidence source is attached.

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

export type CurrentLearning = {
  topic: string;
  status: "currently-learning" | "practising" | "exploring" | "planned" | "paused";
  since?: string;
  evidenceUrl?: string;
  note?: string;
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
// FULL TAXONOMY — canonical vocabulary grouped by subcategory.
// This renders as a neutral knowledge map. Each item becomes a claimed skill
// only when moved into SKILLS with `verified: true` and evidence attached.
// -----------------------------------------------------------------------------

export type SubCluster = { name: string; items: string[] };

export const SKILL_MAP: Record<SkillCategoryId, SubCluster[]> = {
  forensics: [
    {
      name: "Crime-scene investigation",
      items: [
        "Crime Scene Investigation", "Scene Management", "Scene Documentation",
        "Scene Photography", "Evidence Recognition", "Evidence Collection",
        "Evidence Packaging", "Evidence Preservation", "Evidence Labelling",
        "Chain of Custody", "Scene Sketching", "Scene Reconstruction",
        "Contamination Prevention", "Laboratory Safety", "Evidence Submission",
      ],
    },
    {
      name: "Biological evidence",
      items: [
        "Biological Evidence Exam", "Blood Evidence Handling",
        "Bloodstain Pattern Fundamentals", "DNA Evidence Collection",
        "DNA Sample Preservation", "Serology Fundamentals", "Hair Examination",
        "Fibre Examination", "Body-Fluid Identification",
        "Biological Contamination Control",
      ],
    },
    {
      name: "Toxicology & chemistry",
      items: [
        "Forensic Toxicology", "Toxicological Sample Handling",
        "Poison Identification Fundamentals", "Drug Analysis Fundamentals",
        "Chemical Evidence Handling", "Analytical Chemistry",
        "Chromatography Fundamentals", "Spectroscopy Fundamentals",
        "Laboratory Instrumentation", "Chemical Safety",
        "Result Interpretation", "Toxicology Reporting",
      ],
    },
    {
      name: "Pattern & physical evidence",
      items: [
        "Fingerprint Examination", "Latent Print Development",
        "Fingerprint Classification", "Footwear Impressions",
        "Toolmark Examination", "Ballistics Fundamentals",
        "Firearm Evidence Handling", "Questioned Documents",
        "Handwriting Examination", "Trace Evidence",
        "Glass Evidence", "Soil Evidence", "Paint Evidence",
      ],
    },
    {
      name: "Digital forensics",
      items: [
        "Digital Evidence Identification", "Digital Evidence Preservation",
        "Forensic Imaging", "Hash Verification", "File-System Analysis",
        "Deleted File Recovery", "Metadata Analysis", "Timeline Analysis",
        "Memory Forensics", "Windows Forensics", "Linux Forensics",
        "Browser Forensics", "Email Forensics", "Log Analysis",
        "Cloud Forensics Fundamentals", "Database Forensics Fundamentals",
        "Anti-Forensics Awareness", "Digital Chain of Custody",
        "Forensic Report Writing",
      ],
    },
    {
      name: "Computer & mobile forensics",
      items: [
        "Computer Forensics", "Mobile Device Forensics", "Android Forensics",
        "iOS Forensics Fundamentals", "App Artifact Analysis",
        "Call Log Analysis", "SMS & Messaging Analysis", "Media File Analysis",
        "SIM & Storage Fundamentals", "Mobile Backup Analysis",
        "Device Acquisition Fundamentals",
      ],
    },
    {
      name: "Network & cyber forensics",
      items: [
        "Network Forensics", "Packet Analysis", "Traffic Analysis",
        "DNS Analysis", "HTTP/HTTPS Analysis", "Firewall Log Analysis",
        "Intrusion Investigation", "Malware Traffic Analysis",
        "Incident Timeline Reconstruction", "Network Evidence Preservation",
        "Threat Intelligence Fundamentals",
      ],
    },
    {
      name: "Investigation & reporting",
      items: [
        "Scientific Report Writing", "Forensic Documentation",
        "Technical Documentation", "Evidence Interpretation",
        "Investigation Planning", "Analytical Reasoning",
        "Root-Cause Analysis", "Hypothesis Testing", "Research Methodology",
        "Courtroom Documentation", "Expert Report Structure",
        "Ethical Evidence Handling",
      ],
    },
  ],

  ai: [
    {
      name: "Core AI",
      items: [
        "Artificial Intelligence", "Machine Learning", "Deep Learning",
        "Neural Networks", "Supervised Learning", "Unsupervised Learning",
        "Classification", "Regression", "Clustering", "Feature Engineering",
        "Model Evaluation", "Hyperparameter Tuning", "Data Preprocessing",
        "Model Deployment", "Inference Optimization",
      ],
    },
    {
      name: "Generative AI",
      items: [
        "Generative AI", "Large Language Models", "Prompt Engineering",
        "Prompt Evaluation", "Structured Output", "Tool Calling",
        "Function Calling", "AI Agents", "Multi-Agent Systems",
        "Agent Orchestration", "Memory Systems", "Context Management",
        "AI Workflow Automation", "Guardrails", "Model Routing",
        "Human-in-the-Loop",
      ],
    },
    {
      name: "Retrieval systems",
      items: [
        "Retrieval-Augmented Generation", "Vector Databases", "Embeddings",
        "Semantic Search", "Hybrid Search", "Document Chunking",
        "Reranking", "Knowledge Bases", "Knowledge Graph Fundamentals",
        "Citation-Aware Responses", "Document QA", "RAG Evaluation",
        "Retrieval Quality Testing",
      ],
    },
    {
      name: "Natural language processing",
      items: [
        "NLP", "Text Classification", "Named Entity Recognition",
        "Sentiment Analysis", "Information Extraction", "Summarization",
        "Question Answering", "Text Generation", "Intent Classification",
        "Conversational AI", "Multilingual AI",
        "Hindi Language Processing Fundamentals",
        "Speech-to-Text Integration", "Text-to-Speech Integration",
      ],
    },
    {
      name: "Computer vision",
      items: [
        "Computer Vision", "Image Classification", "Object Detection",
        "Image Segmentation", "OCR Integration", "Face Detection Fundamentals",
        "Image Preprocessing", "Visual Search", "Document Image Analysis",
        "Vision-Language Models", "Multimodal AI",
      ],
    },
    {
      name: "AI engineering",
      items: [
        "AI API Integration", "LLM Application Development",
        "Prompt Testing", "Dataset Preparation", "AI Observability",
        "Cost Optimization", "Latency Optimization", "Response Validation",
        "Safety Filtering", "Model Fallback Systems",
        "Local & Cloud Model Integration", "AI Product Architecture",
      ],
    },
  ],

  cybersecurity: [
    {
      name: "Security fundamentals",
      items: [
        "Cybersecurity Fundamentals", "Information Security",
        "Security Principles", "CIA Triad", "Risk Assessment",
        "Threat Modelling", "Security Controls", "Security Policies",
        "Secure Development Lifecycle", "Security Awareness",
      ],
    },
    {
      name: "Web & application security",
      items: [
        "Web Application Security", "OWASP Top 10", "API Security",
        "Authentication Security", "Authorization Security",
        "Session Security", "Input Validation", "Secure File Uploads",
        "XSS Prevention", "SQL Injection Prevention", "CSRF Prevention",
        "Security Headers", "Content Security Policy", "Secure Cookies",
        "Rate Limiting", "Secrets Management", "Dependency Security",
        "Secure Coding", "Application Hardening",
      ],
    },
    {
      name: "Vulnerability assessment",
      items: [
        "Vulnerability Assessment", "Vulnerability Management",
        "Security Testing", "Web Security Testing", "API Security Testing",
        "Configuration Review", "Dependency Auditing", "Static Analysis",
        "Dynamic Analysis", "Risk Prioritization",
        "Remediation Verification", "Security Reporting",
      ],
    },
    {
      name: "Ethical hacking (defensive framing)",
      items: [
        "Ethical Hacking Fundamentals", "Reconnaissance",
        "Authorized Security Testing", "Enumeration Fundamentals",
        "Web Testing Fundamentals", "Network Testing Fundamentals",
        "Reporting & Remediation", "Responsible Disclosure",
      ],
    },
    {
      name: "Network security",
      items: [
        "Network Security", "TCP/IP Fundamentals", "Firewall Fundamentals",
        "VPN Fundamentals", "IDS/IPS Fundamentals", "Network Segmentation",
        "Secure Network Design", "Packet Analysis",
        "Wireless Security Fundamentals", "DNS Security",
        "TLS Fundamentals", "Network Monitoring",
      ],
    },
    {
      name: "Cloud security",
      items: [
        "Cloud Security", "Identity & Access Management", "Least Privilege",
        "Cloud Configuration Review", "Storage Security",
        "Secrets Management", "Network Security Groups", "Cloud Logging",
        "Cloud Monitoring", "Shared Responsibility Model",
        "Container Security Fundamentals", "Serverless Security Fundamentals",
      ],
    },
    {
      name: "Security operations",
      items: [
        "Security Operations", "SOC Fundamentals", "SIEM Fundamentals",
        "Log Monitoring", "Alert Triage", "Threat Hunting",
        "Incident Response", "Incident Documentation",
        "Indicators of Compromise", "Threat Intelligence",
        "Malware Analysis Fundamentals", "Root-Cause Investigation",
        "Security Automation", "Detection Engineering Fundamentals",
      ],
    },
    {
      name: "OSINT",
      items: [
        "Open-Source Intelligence", "Search Techniques",
        "Public Record Research", "Domain Intelligence",
        "Email Intelligence", "Username Research",
        "Social Media Research", "Metadata Analysis",
        "Geolocation Fundamentals", "Source Validation",
        "Evidence Documentation", "Ethical OSINT",
      ],
    },
  ],

  languages: [
    { name: "Primary", items: ["TypeScript", "JavaScript", "Python"] },
    { name: "Regularly used", items: ["SQL", "Bash", "HTML5", "CSS3", "JSON", "YAML", "Markdown"] },
    { name: "Working knowledge", items: ["Java", "C", "C++", "PHP", "PowerShell"] },
    { name: "Learning", items: ["Rust", "Go", "C#"] },
  ],

  frontend: [
    {
      name: "Core frontend",
      items: [
        "React", "Next.js / TanStack Start", "TypeScript", "Tailwind CSS",
        "Bootstrap", "Responsive Design", "Mobile-First Development",
        "Component Architecture", "State Management", "Form Handling",
        "Design Systems", "Accessibility (WCAG 2.2)", "Semantic HTML",
        "SEO Fundamentals", "PWA", "Browser APIs", "Web Performance",
        "Image Optimization", "Server Components", "Client Components",
        "SSG", "SSR",
      ],
    },
    {
      name: "Animation & creative dev",
      items: [
        "Motion for React", "Framer Motion", "GSAP", "ScrollTrigger",
        "Three.js", "React Three Fiber", "Drei", "PixiJS", "SVG Animation",
        "Lottie", "CSS Animation", "WebGL Fundamentals",
        "Shader Fundamentals", "Parallax", "Scroll-Driven Animation",
        "Interactive Data Viz", "Micro-Interactions",
      ],
    },
  ],

  backend: [
    {
      name: "Runtimes & frameworks",
      items: ["Node.js", "Express", "NestJS", "FastAPI", "Flask", "Django"],
    },
    {
      name: "API surfaces",
      items: [
        "REST APIs", "GraphQL Fundamentals", "WebSockets",
        "Server-Sent Events", "Webhook Integration",
      ],
    },
    {
      name: "Auth & access",
      items: [
        "Authentication", "Authorization", "OAuth", "JWT",
        "Role-Based Access Control", "API Validation",
      ],
    },
    {
      name: "Operations & hardening",
      items: [
        "API Documentation", "Error Handling", "Logging", "Caching",
        "Background Jobs", "Queues", "File Upload Systems",
        "Email Integrations", "Payment Integrations", "Rate Limiting",
        "Backend Security", "Microservices Fundamentals",
        "Event-Driven Architecture",
      ],
    },
  ],

  data: [
    {
      name: "Relational",
      items: ["PostgreSQL", "MySQL", "SQLite", "SQL Queries", "Indexing", "Transactions", "Migrations", "Relationships", "Query Optimization"],
    },
    {
      name: "NoSQL & cache",
      items: ["MongoDB", "Redis", "Firebase", "Supabase"],
    },
    {
      name: "Design & governance",
      items: ["Database Design", "Data Modelling", "Backup Fundamentals", "Access Control", "Row-Level Security"],
    },
    {
      name: "Search & data pipelines",
      items: ["Vector Databases", "Search Indexes", "Data Validation", "Data Cleaning", "ETL Fundamentals"],
    },
  ],

  cloud: [
    {
      name: "Version control & CI/CD",
      items: ["Git", "GitHub", "GitHub Actions", "CI/CD"],
    },
    {
      name: "Containers & runtime",
      items: ["Docker", "Docker Compose", "Kubernetes Fundamentals", "Linux", "Shell Scripting"],
    },
    {
      name: "Edge & hosting",
      items: ["NGINX", "Reverse Proxy", "Cloudflare", "Vercel", "AWS", "Google Cloud", "Microsoft Azure"],
    },
    {
      name: "Operations",
      items: [
        "Deployment Automation", "Environment Management",
        "Domain Configuration", "DNS Management", "SSL/TLS",
        "Monitoring", "Logging", "Error Tracking", "Health Checks",
        "Backup Strategy", "Infrastructure Security",
        "Container Security", "Performance Monitoring",
      ],
    },
  ],

  automation: [
    {
      name: "Workflow & orchestration",
      items: [
        "Workflow Automation", "n8n", "Task Orchestration",
        "Scheduled Tasks", "Queue Processing",
        "No-Code / Low-Code Integration",
      ],
    },
    {
      name: "Integration surfaces",
      items: [
        "API Integration", "Webhooks", "Third-Party Service Integration",
        "Notification Systems", "Email Automation", "CRM Automation",
        "AI Workflow Automation",
      ],
    },
    {
      name: "Data movement",
      items: [
        "ETL Pipelines", "Data Synchronization", "Data Extraction",
        "Browser Automation (authorized)", "Automation Testing",
      ],
    },
  ],

  product: [
    {
      name: "Discovery & strategy",
      items: [
        "Product Strategy", "Product Discovery", "User Research",
        "Problem Definition", "Requirement Analysis",
        "Competitive Research", "Market Research",
      ],
    },
    {
      name: "Delivery",
      items: [
        "Product Roadmapping", "MVP Development", "Feature Prioritization",
        "SaaS Product Development", "Technical Architecture",
        "Product Documentation",
      ],
    },
    {
      name: "Growth & operations",
      items: [
        "User Experience", "Conversion Optimization", "Analytics",
      ],
    },
    {
      name: "Founder craft",
      items: [
        "Founder-Led Product Development", "Technical Decision-Making",
        "Team Coordination", "Client Communication", "Project Planning",
        "Agile Fundamentals", "Risk Management", "Business Automation",
        "Digital Entrepreneurship",
      ],
    },
  ],

  research: [
    {
      name: "Method",
      items: [
        "Research Methodology", "Literature Review", "Scientific Writing",
        "Technical Writing", "Report Writing", "Data Interpretation",
        "Critical Thinking", "Analytical Reasoning", "Problem Solving",
        "Root-Cause Analysis",
      ],
    },
    {
      name: "Communication",
      items: [
        "Documentation", "Presentation", "Communication",
        "Stakeholder Communication",
      ],
    },
    {
      name: "Professional",
      items: [
        "Time Management", "Project Management", "Independent Learning",
        "Cross-Disciplinary Research", "Ethical Decision-Making",
        "Privacy Awareness", "Security Awareness",
      ],
    },
  ],

  tools: [
    { name: "Development", items: ["VS Code", "GitHub", "Git", "Postman", "Swagger", "Docker Desktop", "Linux Terminal", "Chrome DevTools", "npm", "pnpm", "yarn"] },
    { name: "Design", items: ["Figma", "Canva", "Adobe Photoshop", "Adobe Illustrator", "Blender", "Spline"] },
    { name: "AI", items: ["OpenAI APIs", "Anthropic APIs", "Google AI APIs", "Hugging Face", "LangChain", "LangGraph", "LlamaIndex", "CrewAI", "AutoGen", "Vector DB tooling"] },
    { name: "Cybersecurity", items: ["Wireshark", "Nmap", "Burp Suite", "OWASP ZAP", "Metasploit Fundamentals", "Nuclei", "Nikto", "Semgrep", "Trivy", "Gitleaks"] },
    { name: "Digital forensics", items: ["Autopsy", "The Sleuth Kit", "Volatility", "FTK Imager", "ExifTool", "Binwalk", "Registry Explorer", "CyberChef"] },
  ],
};

// Flat helper for search / counts.
export const SKILL_TAXONOMY: Record<SkillCategoryId, string[]> =
  Object.fromEntries(
    (Object.entries(SKILL_MAP) as [SkillCategoryId, SubCluster[]][]).map(
      ([k, subs]) => [k, subs.flatMap((s) => s.items)],
    ),
  ) as Record<SkillCategoryId, string[]>;

// -----------------------------------------------------------------------------
// VERIFIED INVENTORY — intentionally empty until Tarik confirms each entry
// with an evidence source (project, coursework, credential, repo, article).
// -----------------------------------------------------------------------------

export const SKILLS: Skill[] = [];

export const CERTIFICATIONS: Certification[] = [];

export const CURRENT_LEARNING: CurrentLearning[] = [];

// Issuer catalog — used only as a filter vocabulary. Presence here is not
// an ownership claim.
export const CERT_ISSUERS = [
  "Coursera", "edX", "Udemy", "FutureLearn", "NPTEL", "SWAYAM",
  "Google", "Microsoft", "AWS", "IBM", "Cisco", "Oracle", "Meta",
  "GitHub", "CompTIA", "EC-Council", "ISC2", "OffSec", "INE",
  "TryHackMe", "Hack The Box", "Fortinet", "Palo Alto Networks",
  "Splunk", "SANS", "NVIDIA", "DeepLearning.AI", "Hugging Face",
  "OpenAI", "MongoDB University", "Linux Foundation", "freeCodeCamp",
] as const;

// Certification category vocabulary — used as filter chips only.
export const CERT_CATEGORIES = [
  "Forensic Science", "Cybersecurity", "Artificial Intelligence",
  "Programming & Software", "Cloud & DevOps", "Product & Business",
] as const;
