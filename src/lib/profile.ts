// Verified profile facts sourced directly from authentic academic records and resume.
// Sourced from official institutional documents (GIET Gandhi College, SOA University, Lakshay Institute).

export interface AcademicCredential {
  degree: string;
  field: string;
  institution: string;
  years: string;
  rollNo?: string;
  score?: string;
  status: "completed" | "in-progress";
}

export interface TrainingCredential {
  institution: string;
  focus: string;
  location?: string;
}

export const PROFILE = {
  name: "Tarik Islam",
  primaryRole: "Founder & CEO, Dezo.in",
  identity: "Forensic Scientist × Cybersecurity Engineer × AI Developer",
  headline:
    "Investigating evidence. Defending systems. Engineering intelligence.",
  professionalSummary:
    "A results-driven professional with expertise in Forensic Science, Cybersecurity, and Software Development. Skilled in cyber-crime investigation, ethical hacking, digital forensics, and full-stack systems with a passion for solving real-world challenges with scientific precision and analytical thinking.",
  location: "Bhubaneswar, Odisha, India",
  timezone: "UTC+05:30 (IST)",
  email: "princetarikislam@gmail.com",
  phone: "+91 8984473230",
  availability: "Available for selected high-stakes collaborations & architecture audits",
  focus: "Forensics · Cybersecurity · AI Systems · Full Stack",

  // Verified Academic Progression from Resume (Completed in 2024 / 2024-25)
  education: [
    {
      degree: "M.Tech",
      field: "Cybersecurity & Artificial Intelligence",
      institution: "GIET Gandhi College, Bhubaneswar",
      years: "2022 – 2024-25",
      status: "completed",
    },
    {
      degree: "MCA (Master of Computer Applications)",
      field: "Computer Applications & Software Systems",
      institution: "SOA University, Bhubaneswar",
      years: "2021 – 2023",
      rollNo: "SOA-MCA-2020-334781",
      status: "completed",
    },
    {
      degree: "M.Sc",
      field: "Forensic Science",
      institution: "Lakshay Institute",
      years: "2020 – 2021",
      rollNo: "MSC-FS-2021-559922",
      status: "completed",
    },
    {
      degree: "B.Sc",
      field: "Forensic Science",
      institution: "Forensic Science Academy",
      years: "2016 – 2019",
      rollNo: "MSC-FS-2021-665843",
      status: "completed",
    },
    {
      degree: "12th – Science",
      field: "Science Stream (CHSE)",
      institution: "Sagar College of Science",
      years: "2015",
      score: "67%",
      rollNo: "202305120",
      status: "completed",
    },
    {
      degree: "10th – Matriculation",
      field: "General Curriculum (CBSE)",
      institution: "Maharishi Vidya Mandir",
      years: "2013",
      score: "79%",
      rollNo: "610113",
      status: "completed",
    },
  ] as AcademicCredential[],

  // Additional Technical & Computing Training
  training: [
    {
      institution: "Lakshay Institute",
      focus: "Programming & Advanced Technical Systems Training",
    },
    {
      institution: "Seeree Institute, Bhubaneswar",
      focus: "Applied Software Engineering & Technology Training",
    },
    {
      institution: "AAC Institute, Bhubaneswar",
      focus: "Advanced Computing & Systems Architecture Training",
    },
  ] as TrainingCredential[],

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
    "Analytical & logical reasoning",
    "Strong attention to detail & chain-of-custody discipline",
    "Technical + forensic hybrid engineering profile",
    "Fast learner & highly adaptable in high-stakes environments",
  ],
} as const;

export type VerificationStatus =
  | "verified"
  | "self-reported"
  | "academic"
  | "prototype"
  | "in-development"
  | "private"
  | "pending"
  | "archived"
  | "hidden";

export const SHOW_UNVERIFIED = false;
