/**
 * Internal OSINT Tool Registry — 28 tools across all intelligence categories.
 *
 * ARCHITECTURE RULE: This file is implementation detail only.
 * Visitor chrome shows CAPABILITY LABELS, never tool names or counts.
 * e.g. visitor sees "Username presence check" not "Sherlock + Maigret"
 */

export type ToolLicense = "Open Source" | "Free API" | "Free Tier" | "Commercial";
export type ToolInputType =
  | "username"
  | "email"
  | "phone"
  | "domain"
  | "ip"
  | "person-name"
  | "organization"
  | "url"
  | "image"
  | "document"
  | "keyword"
  | "github-username";

export type ToolOutputCategory =
  | "profiles"
  | "emails"
  | "domains"
  | "subdomains"
  | "certificates"
  | "dns"
  | "whois"
  | "archive"
  | "social-links"
  | "metadata"
  | "ocr-text"
  | "breach-indicators"
  | "network-intel"
  | "publications"
  | "news"
  | "company-intel"
  | "github-intel"
  | "patent-intel"
  | "ip-reputation"
  | "technology-detection"
  | "phone-metadata";

export type ToolDeploymentClass =
  | "SERVER_LIVE" // Can run as a server-side HTTP call, no auth
  | "SERVER_AUTH" // Needs API key on server
  | "WORKER_PENDING" // Architecture-planned, not yet deployed
  | "CLIENT_HINT"; // Directs user to a public web resource

export interface OsintTool {
  id: string;
  /** Internal engineering name — never shown to visitors */
  internalName: string;
  /** Visitor-facing capability label */
  capabilityLabel: string;
  /** Short description of what it does */
  description: string;
  inputs: ToolInputType[];
  outputs: ToolOutputCategory[];
  license: ToolLicense;
  /** Public URL for the tool itself */
  sourceUrl: string;
  /** If SERVER_LIVE: the API base URL used in our collectors */
  apiBase?: string;
  deployment: ToolDeploymentClass;
  /** Hard limits / ethical constraints for this tool */
  constraints: string[];
  /** What it CANNOT do — keep honest */
  cannotDo: string[];
  /** Is it currently wired into our backend collectors? */
  implemented: boolean;
}

export const OSINT_TOOL_REGISTRY: OsintTool[] = [
  // ── Username Intelligence ─────────────────────────────────────────────────
  {
    id: "sherlock",
    internalName: "Sherlock",
    capabilityLabel: "Cross-platform username presence",
    description: "Fast cross-site username discovery across 400+ platforms",
    inputs: ["username"],
    outputs: ["profiles"],
    license: "Open Source",
    sourceUrl: "https://github.com/sherlock-project/sherlock",
    deployment: "WORKER_PENDING",
    constraints: [
      "Must not ping platforms at a rate exceeding reasonable ToS limits",
      "Results are presence indicators only — not profile ownership proof",
    ],
    cannotDo: [
      "Prove two accounts belong to the same person without corroborating evidence",
      "Access private profiles",
    ],
    implemented: false,
  },
  {
    id: "maigret",
    internalName: "Maigret",
    capabilityLabel: "Username dossier compilation",
    description:
      "Username presence + dossier building across thousands of sites with structured output",
    inputs: ["username"],
    outputs: ["profiles", "social-links"],
    license: "Open Source",
    sourceUrl: "https://github.com/soxoj/maigret",
    deployment: "WORKER_PENDING",
    constraints: [
      "Respect each platform's robots.txt and ToS",
      "Output is presence inference only",
    ],
    cannotDo: ["Determine account ownership without additional corroboration", "Access DMs"],
    implemented: false,
  },
  {
    id: "whatsmyname",
    internalName: "WhatsMyName",
    capabilityLabel: "Username presence database",
    description: "Community-maintained username site database for cross-platform checks",
    inputs: ["username"],
    outputs: ["profiles"],
    license: "Open Source",
    sourceUrl: "https://github.com/WebBreacher/WhatsMyName",
    deployment: "WORKER_PENDING",
    constraints: ["Evidence-level: presence indicator only"],
    cannotDo: ["Confirm ownership", "Access private data"],
    implemented: false,
  },

  // ── Email Intelligence ────────────────────────────────────────────────────
  {
    id: "holehe",
    internalName: "Holehe",
    capabilityLabel: "Email account presence indicators",
    description: "Checks whether an email appears to be associated with accounts on 120+ services",
    inputs: ["email"],
    outputs: ["profiles"],
    license: "Open Source",
    sourceUrl: "https://github.com/megadose/holehe",
    deployment: "WORKER_PENDING",
    constraints: [
      "Output is association indicator only — not ownership proof",
      "Never display credentials or breach content",
    ],
    cannotDo: [
      "Read inbox content",
      "Prove account ownership",
      "Display stolen credentials",
    ],
    implemented: false,
  },
  {
    id: "hibp",
    internalName: "Have I Been Pwned",
    capabilityLabel: "Email breach exposure indicators",
    description: "Checks whether an email appears in known public breach notification datasets",
    inputs: ["email"],
    outputs: ["breach-indicators"],
    license: "Free API",
    sourceUrl: "https://haveibeenpwned.com",
    apiBase: "https://haveibeenpwned.com/api/v3",
    deployment: "SERVER_AUTH",
    constraints: [
      "API key required",
      "Report only breach names + data categories — never passwords or raw stolen data",
      "Must comply with HIBP usage terms",
    ],
    cannotDo: ["Return passwords", "Return raw credential data", "Prove account ownership"],
    implemented: false,
  },

  // ── Phone Intelligence ────────────────────────────────────────────────────
  {
    id: "phoneinfoga",
    internalName: "PhoneInfoga",
    capabilityLabel: "Phone number public metadata",
    description:
      "Country, carrier/line-type metadata and public search references for phone numbers",
    inputs: ["phone"],
    outputs: ["phone-metadata"],
    license: "Open Source",
    sourceUrl: "https://github.com/sundowndev/phoneinfoga",
    deployment: "WORKER_PENDING",
    constraints: [
      "Numbering metadata only — no subscriber identity",
      "No live-location tracking",
      "No SS7 or IMSI lookups",
      "For publicly stated numbers only",
    ],
    cannotDo: [
      "Identify the subscriber by name",
      "Track physical location",
      "Intercept calls or SMS",
    ],
    implemented: false,
  },

  // ── Domain / Infrastructure Intelligence ─────────────────────────────────
  {
    id: "amass",
    internalName: "Amass",
    capabilityLabel: "Subdomain enumeration",
    description: "Passive subdomain discovery using DNS and certificate transparency",
    inputs: ["domain"],
    outputs: ["subdomains", "dns", "certificates"],
    license: "Open Source",
    sourceUrl: "https://github.com/owasp-amass/amass",
    deployment: "WORKER_PENDING",
    constraints: ["Passive mode only — no active probing unless target is owned/authorized"],
    cannotDo: ["Brute-force enumerate private servers without authorization"],
    implemented: false,
  },
  {
    id: "subfinder",
    internalName: "Subfinder",
    capabilityLabel: "Passive subdomain discovery",
    description: "Fast passive subdomain discovery using public sources",
    inputs: ["domain"],
    outputs: ["subdomains"],
    license: "Open Source",
    sourceUrl: "https://github.com/projectdiscovery/subfinder",
    deployment: "WORKER_PENDING",
    constraints: ["Passive discovery only"],
    cannotDo: ["Active probing without authorization"],
    implemented: false,
  },
  {
    id: "crtsh",
    internalName: "crt.sh",
    capabilityLabel: "Certificate transparency logs",
    description: "Public TLS certificate hostname extraction from CT logs",
    inputs: ["domain"],
    outputs: ["certificates", "subdomains"],
    license: "Free API",
    sourceUrl: "https://crt.sh",
    apiBase: "https://crt.sh",
    deployment: "SERVER_LIVE",
    constraints: ["Public logs only — cannot query private/internal CA logs"],
    cannotDo: ["Access private certificates", "Decrypt TLS traffic"],
    implemented: true,
  },
  {
    id: "rdap",
    internalName: "RDAP",
    capabilityLabel: "Domain registration directory",
    description: "Modern registration data access protocol for domain registration metadata",
    inputs: ["domain"],
    outputs: ["whois"],
    license: "Free API",
    sourceUrl: "https://rdap.org",
    apiBase: "https://rdap.org",
    deployment: "SERVER_LIVE",
    constraints: ["Public registration data only — no private WHOIS proxy bypass"],
    cannotDo: ["Reveal WHOIS-privacy-protected registrant details"],
    implemented: true,
  },
  {
    id: "theharvester",
    internalName: "theHarvester",
    capabilityLabel: "Domain email / name / host harvester",
    description: "Harvests emails, names, and hosts from public search engines and sources",
    inputs: ["domain", "organization"],
    outputs: ["emails", "domains", "social-links"],
    license: "Open Source",
    sourceUrl: "https://github.com/laramies/theHarvester",
    deployment: "WORKER_PENDING",
    constraints: ["Public sources only", "Respect API rate limits"],
    cannotDo: ["Access private email servers", "Retrieve inbox contents"],
    implemented: false,
  },

  // ── GitHub / Developer Intelligence ──────────────────────────────────────
  {
    id: "github-api",
    internalName: "GitHub Public API",
    capabilityLabel: "Developer profile & repository intelligence",
    description: "Public user profiles, repos, organizations, gists, public emails via GitHub API",
    inputs: ["username", "github-username", "email"],
    outputs: ["profiles", "github-intel", "social-links"],
    license: "Free API",
    sourceUrl: "https://api.github.com",
    apiBase: "https://api.github.com",
    deployment: "SERVER_LIVE",
    constraints: [
      "Public data only",
      "60 req/hr unauthenticated (500 with token)",
      "No private repo access",
    ],
    cannotDo: ["Access private repositories", "Read private profile data", "Enumerate followers privately"],
    implemented: true,
  },
  {
    id: "npm-registry",
    internalName: "npm Registry",
    capabilityLabel: "npm package authorship",
    description: "Public package author, maintainer, and repository references on npm",
    inputs: ["username", "person-name", "email"],
    outputs: ["profiles", "github-intel"],
    license: "Free API",
    sourceUrl: "https://registry.npmjs.org",
    apiBase: "https://registry.npmjs.org",
    deployment: "SERVER_LIVE",
    constraints: ["Public registry data only"],
    cannotDo: ["Access private packages", "See download credentials"],
    implemented: false,
  },
  {
    id: "pypi-registry",
    internalName: "PyPI",
    capabilityLabel: "Python package authorship",
    description: "Public package author and project references on PyPI",
    inputs: ["username", "person-name"],
    outputs: ["profiles", "github-intel"],
    license: "Free API",
    sourceUrl: "https://pypi.org",
    apiBase: "https://pypi.org",
    deployment: "SERVER_LIVE",
    constraints: ["Public registry data only"],
    cannotDo: ["Access private packages"],
    implemented: false,
  },
  {
    id: "reddit-public",
    internalName: "Reddit Public JSON API",
    capabilityLabel: "Public Reddit profile",
    description: "Public Reddit user profile, karma, post/comment history summary",
    inputs: ["username"],
    outputs: ["profiles", "social-links"],
    license: "Free API",
    sourceUrl: "https://www.reddit.com",
    apiBase: "https://www.reddit.com/user",
    deployment: "SERVER_LIVE",
    constraints: [
      "Public posts only",
      "Deleted posts unavailable",
      "No private messages",
      "Rate-limit compliant",
    ],
    cannotDo: ["Access private subreddits", "Read DMs", "View deleted posts"],
    implemented: false,
  },

  // ── Academic / Publication Intelligence ──────────────────────────────────
  {
    id: "crossref",
    internalName: "Crossref",
    capabilityLabel: "Open-access scientific publications",
    description: "Academic publications, authorship, DOIs, and affiliations from Crossref",
    inputs: ["person-name", "organization", "email"],
    outputs: ["publications"],
    license: "Free API",
    sourceUrl: "https://api.crossref.org",
    apiBase: "https://api.crossref.org",
    deployment: "SERVER_LIVE",
    constraints: ["Open-access metadata only"],
    cannotDo: ["Access paywalled full texts", "Confirm authorship without corroboration"],
    implemented: true,
  },
  {
    id: "openalex",
    internalName: "OpenAlex",
    capabilityLabel: "Open scholarly index — authors & works",
    description: "Open scholarly graph: authors, works, institutions, topics — no API key needed",
    inputs: ["person-name", "organization", "email"],
    outputs: ["publications"],
    license: "Free API",
    sourceUrl: "https://openalex.org",
    apiBase: "https://api.openalex.org",
    deployment: "SERVER_LIVE",
    constraints: ["Open metadata only", "Author disambiguation may not be perfect"],
    cannotDo: ["Confirm two authors are the same person without corroboration"],
    implemented: false,
  },
  {
    id: "semantic-scholar",
    internalName: "Semantic Scholar",
    capabilityLabel: "AI-indexed research publications",
    description:
      "AI-curated academic publication graph with citation counts and author pages",
    inputs: ["person-name", "keyword"],
    outputs: ["publications"],
    license: "Free API",
    sourceUrl: "https://www.semanticscholar.org",
    apiBase: "https://api.semanticscholar.org/graph/v1",
    deployment: "SERVER_LIVE",
    constraints: ["Public papers only", "Rate-limited at 100 req/5min unauthenticated"],
    cannotDo: ["Access embargoed papers", "Confirm authorship"],
    implemented: false,
  },
  {
    id: "orcid",
    internalName: "ORCID Public API",
    capabilityLabel: "Researcher ORCID profile",
    description: "Public researcher profile, works, education, employment from ORCID",
    inputs: ["person-name", "email"],
    outputs: ["publications", "profiles"],
    license: "Free API",
    sourceUrl: "https://orcid.org",
    apiBase: "https://pub.orcid.org/v3.0",
    deployment: "SERVER_LIVE",
    constraints: ["Public ORCID records only — researcher controls what is visible"],
    cannotDo: ["Access private ORCID fields", "Read unverified affiliations as fact"],
    implemented: false,
  },

  // ── Knowledge / Encyclopedia Intelligence ─────────────────────────────────
  {
    id: "wikipedia-api",
    internalName: "Wikipedia API",
    capabilityLabel: "Public encyclopedia entry",
    description: "Public Wikipedia summary, categories, and links for named entities",
    inputs: ["person-name", "organization", "keyword"],
    outputs: ["profiles", "social-links"],
    license: "Free API",
    sourceUrl: "https://en.wikipedia.org",
    apiBase: "https://en.wikipedia.org/api/rest_v1",
    deployment: "SERVER_LIVE",
    constraints: [
      "Wikipedia content reflects community consensus, not primary-source verification",
      "Must cite Wikipedia as source",
    ],
    cannotDo: ["Access deleted article history (without special rights)", "Guarantee factual accuracy"],
    implemented: false,
  },
  {
    id: "wikidata-api",
    internalName: "Wikidata",
    capabilityLabel: "Structured public knowledge entities",
    description: "Structured entity data: birth dates, occupations, affiliations from Wikidata",
    inputs: ["person-name", "organization"],
    outputs: ["profiles", "company-intel"],
    license: "Free API",
    sourceUrl: "https://www.wikidata.org",
    apiBase: "https://www.wikidata.org/w/api.php",
    deployment: "SERVER_LIVE",
    constraints: ["Community-maintained — requires source attribution"],
    cannotDo: ["Guarantee fact accuracy", "Access non-notable private individuals"],
    implemented: false,
  },

  // ── Historical Intelligence ───────────────────────────────────────────────
  {
    id: "wayback",
    internalName: "Internet Archive Wayback Machine",
    capabilityLabel: "Public web archive history",
    description: "Historical capture index for domains and URLs (CDX API)",
    inputs: ["domain", "url"],
    outputs: ["archive"],
    license: "Free API",
    sourceUrl: "https://archive.org",
    apiBase: "http://web.archive.org/cdx/search/cdx",
    deployment: "SERVER_LIVE",
    constraints: ["Indexed public pages only — private/robots-excluded pages not indexed"],
    cannotDo: ["Access pages blocked by robots.txt from archival", "Retrieve unarchived content"],
    implemented: true,
  },

  // ── Image / Document Intelligence ─────────────────────────────────────────
  {
    id: "exiftool",
    internalName: "ExifTool",
    capabilityLabel: "File metadata extraction",
    description: "EXIF, IPTC, XMP metadata from images and documents",
    inputs: ["image", "document"],
    outputs: ["metadata"],
    license: "Open Source",
    sourceUrl: "https://exiftool.org",
    deployment: "WORKER_PENDING",
    constraints: [
      "User-uploaded files only or files explicitly shared by subject",
      "GPS coordinates, if present, must be treated as POSSIBLE — never VERIFIED location of subject",
      "Must not infer live location from image metadata",
    ],
    cannotDo: [
      "Infer current location from old GPS data",
      "Identify face from image",
    ],
    implemented: false,
  },
  {
    id: "tesseract",
    internalName: "Tesseract OCR",
    capabilityLabel: "Document text extraction (OCR)",
    description: "Optical character recognition for images and scanned documents",
    inputs: ["image", "document"],
    outputs: ["ocr-text"],
    license: "Open Source",
    sourceUrl: "https://github.com/tesseract-ocr/tesseract",
    deployment: "WORKER_PENDING",
    constraints: ["User-provided documents only", "Output is raw OCR — may contain errors"],
    cannotDo: ["Guarantee OCR accuracy", "Process real-time video"],
    implemented: false,
  },

  // ── Infrastructure / Reputation Intelligence ──────────────────────────────
  {
    id: "virustotal",
    internalName: "VirusTotal",
    capabilityLabel: "Domain & IP reputation",
    description: "Public reputation, malware detection results, and scan history for domains/IPs",
    inputs: ["domain", "ip", "url"],
    outputs: ["ip-reputation", "network-intel"],
    license: "Free Tier",
    sourceUrl: "https://www.virustotal.com",
    apiBase: "https://www.virustotal.com/api/v3",
    deployment: "SERVER_AUTH",
    constraints: ["API key required", "Public report access only", "Rate limited"],
    cannotDo: [
      "Identify who controls an IP",
      "Guarantee a file is safe after scan",
    ],
    implemented: false,
  },
  {
    id: "abuseipdb",
    internalName: "AbuseIPDB",
    capabilityLabel: "IP abuse reputation",
    description: "Community-reported IP address abuse and reputation scores",
    inputs: ["ip"],
    outputs: ["ip-reputation"],
    license: "Free Tier",
    sourceUrl: "https://www.abuseipdb.com",
    apiBase: "https://api.abuseipdb.com/api/v2",
    deployment: "SERVER_AUTH",
    constraints: ["API key required", "Rate limited", "Community-submitted reports only"],
    cannotDo: ["Identify the end user behind an IP"],
    implemented: false,
  },

  // ── Broad Correlation ─────────────────────────────────────────────────────
  {
    id: "spiderfoot",
    internalName: "SpiderFoot",
    capabilityLabel: "Automated public data correlation",
    description: "Multi-source OSINT automation and correlation across 200+ data modules",
    inputs: ["domain", "ip", "email", "username", "person-name", "phone"],
    outputs: [
      "profiles",
      "emails",
      "domains",
      "subdomains",
      "certificates",
      "social-links",
      "network-intel",
    ],
    license: "Open Source",
    sourceUrl: "https://github.com/smicallef/spiderfoot",
    deployment: "WORKER_PENDING",
    constraints: [
      "Passive collection only by default",
      "Active modules require explicit authorization",
      "Do not enable modules that crawl third-party authenticated pages",
    ],
    cannotDo: [
      "Run without violating ToS if active scanning is enabled without authorization",
      "Guarantee no false positives in entity correlation",
    ],
    implemented: false,
  },

  // ── Patent Intelligence ───────────────────────────────────────────────────
  {
    id: "google-patents",
    internalName: "Google Patents / WIPO PATENTSCOPE",
    capabilityLabel: "Patent & inventor public records",
    description: "Public patent records, inventor names, assignees, and filing dates",
    inputs: ["person-name", "organization", "keyword"],
    outputs: ["patent-intel"],
    license: "Free API",
    sourceUrl: "https://patents.google.com",
    deployment: "CLIENT_HINT",
    constraints: ["Public patent records only"],
    cannotDo: ["Access unpublished patent applications"],
    implemented: false,
  },

  // ── IP / Network ──────────────────────────────────────────────────────────
  {
    id: "ip-asn",
    internalName: "ipwho.is / public IP geolocation",
    capabilityLabel: "IP & network metadata",
    description: "Country, city, ASN, ISP for a given public IP address",
    inputs: ["ip"],
    outputs: ["network-intel", "phone-metadata"],
    license: "Free API",
    sourceUrl: "https://ipwho.is",
    apiBase: "https://ipwho.is",
    deployment: "SERVER_LIVE",
    constraints: [
      "Geolocation is approximate — typically city or ISP level",
      "ASN ≠ end-user identity",
    ],
    cannotDo: [
      "Identify individual user behind an IP",
      "Provide real-time location of a person",
    ],
    implemented: true,
  },
];

// ── Registry Helpers ──────────────────────────────────────────────────────────

export function getImplementedTools(): OsintTool[] {
  return OSINT_TOOL_REGISTRY.filter((t) => t.implemented);
}

export function getToolsByInput(input: ToolInputType): OsintTool[] {
  return OSINT_TOOL_REGISTRY.filter((t) => t.inputs.includes(input));
}

export function getToolsByDeployment(deployment: ToolDeploymentClass): OsintTool[] {
  return OSINT_TOOL_REGISTRY.filter((t) => t.deployment === deployment);
}

export function getCapabilityLabelsForInput(input: ToolInputType): string[] {
  return [...new Set(getToolsByInput(input).map((t) => t.capabilityLabel))];
}

/** Public-safe summary for status display — no tool names, counts only */
export function getRegistryPublicSummary() {
  const total = OSINT_TOOL_REGISTRY.length;
  const live = OSINT_TOOL_REGISTRY.filter((t) => t.deployment === "SERVER_LIVE").length;
  const pending = OSINT_TOOL_REGISTRY.filter((t) => t.deployment === "WORKER_PENDING").length;
  const authRequired = OSINT_TOOL_REGISTRY.filter(
    (t) => t.deployment === "SERVER_AUTH" || t.deployment === "WORKER_PENDING",
  ).length;
  return { total, live, pending, authRequired };
}
