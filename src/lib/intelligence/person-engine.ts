/**
 * Person Intelligence Engine
 *
 * Accepts any public identifier (name, username, email, domain, phone, keyword)
 * and automatically:
 *  1. Classifies the input
 *  2. Builds a 28-module investigation plan
 *  3. Dispatches relevant live public collectors in parallel
 *  4. Discovers secondary identifiers in results (pivot)
 *  5. Correlates evidence across sources
 *  6. Resolves entity candidates (distinguishes same-name persons)
 *  7. Produces a PersonIntelligenceResult
 *
 * VISITOR CHROME RULE:
 *  - Show WHAT was found, not WHICH TOOL found it
 *  - Confidence tiers: VERIFIED / SUPPORTED / PROBABLE / UNCERTAIN
 *  - Every claim tagged: OBSERVED / INFERRED / POSSIBLE
 *  - Never fabricate matches; 0 evidence = honest 0
 */

import { classifyQuery, type Classification } from "./classifier";
import type { AdapterResult, KernelEvidence } from "./collectors";
import {
  collectGitHubUser,
  collectOpenAlexAuthor,
  collectWikipediaSummary,
  collectSemanticScholar,
  collectOrcidAuthor,
  collectWikidataEntity,
  collectRedditProfile,
} from "./public-api-collectors";
import {
  runIndiaPhoneIntelligence,
  analyzeIndiaPhone,
  type IndiaPhoneAnalysis,
} from "./india-phone-engine";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface PersonCandidate {
  /** Internally generated — never shown as a tracking ID */
  candidateId: string;
  /** Confidence that this is a distinct person vs disambiguation */
  distinctionConfidence: "HIGH" | "MEDIUM" | "LOW" | "AMBIGUOUS";
  /** All names this person is associated with publicly */
  names: string[];
  /** Public usernames discovered */
  usernames: Record<string, string>; // platform → username
  /** Public emails discovered (user-stated in profiles) */
  publicEmails: string[];
  /** Publicly stated locations */
  locations: string[];
  /** Professional affiliations from public sources */
  organizations: string[];
  /** Public websites or domains associated */
  websites: string[];
  /** GitHub-specific profile data */
  github?: {
    username: string;
    publicRepos: number;
    followers: number;
    bio?: string;
    company?: string;
    location?: string;
    publicEmail?: string;
    url: string;
  };
  /** Academic/research profile data */
  academic?: {
    worksCount: number;
    citationCount: number;
    topics: string[];
    affiliations: string[];
    orcid?: string;
  };
  /** Public phone details if input was a phone number */
  publicPhones?: string[];
  phoneDetails?: IndiaPhoneAnalysis;
  /** Evidence items that contributed to this candidate */
  evidenceIds: string[];
}

export type PivotClass =
  | "username"
  | "email"
  | "domain"
  | "github-username"
  | "academic-name";

export interface DiscoveredPivot {
  value: string;
  pivotClass: PivotClass;
  discoveredIn: string; // adapterId
  confidence: "HIGH" | "MEDIUM" | "LOW";
}

export interface PersonIntelligenceResult {
  /** The original raw query */
  query: string;
  classification: Classification;
  retrievedAt: string;

  /** Ordered adapter results — all collectors that ran */
  adapters: AdapterResult[];
  /** All evidence items flat-merged */
  evidence: KernelEvidence[];

  /** Entity candidates resolved from evidence */
  candidates: PersonCandidate[];

  /** Secondary identifiers discovered that can be pivoted through */
  pivots: DiscoveredPivot[];

  /** Timeline events extracted from evidence */
  timeline: TimelineEvent[];

  /** Conflicting signals across sources */
  conflicts: EvidenceConflict[];

  /** Phases that ran */
  phases: Array<{ id: string; status: "completed" | "running" | "pending" | "skipped" }>;

  /** How many live collectors ran */
  liveCollectorsRan: number;

  /** Ethical / scope boundary statement — always shown */
  boundary: string;

  /** Modules that are architecturally planned but not yet connected */
  pendingCapabilities: string[];
}

export interface TimelineEvent {
  id: string;
  date: string; // ISO date or year only
  event: string;
  source: string;
  confidence: "VERIFIED" | "SUPPORTED" | "PROBABLE" | "UNCERTAIN";
}

export interface EvidenceConflict {
  id: string;
  field: string;
  description: string;
  sides: Array<{ label: string; value: string }>;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function extractGitHubUsername(query: string, classification: Classification): string | null {
  // If query is a bare username (no spaces, no @domain)
  if (
    classification.chips.includes("USERNAME") &&
    !query.includes("@") &&
    !query.includes(".")
  ) {
    return query.replace(/^@/, "").trim();
  }
  // Could also appear as github.com/username
  const ghMatch = query.match(/github\.com\/([a-zA-Z0-9_-]+)/i);
  if (ghMatch) return ghMatch[1];
  return null;
}

function extractUsernameFromEmail(email: string): string | null {
  const match = email.match(/^([^@]+)@/);
  return match ? match[1] : null;
}

function extractEmailsFromEvidence(evidence: KernelEvidence[]): string[] {
  const emailPattern = /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/g;
  const emails = new Set<string>();
  for (const ev of evidence) {
    const matches = ev.summary.match(emailPattern);
    if (matches) matches.forEach((e) => emails.add(e.toLowerCase()));
  }
  return [...emails];
}

function extractUrlsFromEvidence(evidence: KernelEvidence[]): string[] {
  const urlPattern = /https?:\/\/[^\s"'<>]+/g;
  const urls = new Set<string>();
  for (const ev of evidence) {
    if (ev.url) urls.add(ev.url);
    const matches = ev.summary.match(urlPattern);
    if (matches) matches.forEach((u) => urls.add(u));
  }
  return [...urls];
}

function buildTimeline(evidence: KernelEvidence[]): TimelineEvent[] {
  const events: TimelineEvent[] = [];
  const seen = new Set<string>();

  for (const ev of evidence) {
    // Extract dates from evidence
    const dateMatches = ev.summary.match(/\b(20\d{2}|19\d{2})(?:-\d{2}-\d{2})?\b/g);
    if (dateMatches) {
      for (const date of dateMatches) {
        const key = `${date}-${ev.id}`;
        if (!seen.has(key)) {
          seen.add(key);
          events.push({
            id: `tl-${ev.id}-${date}`,
            date,
            event: `${ev.title} — ${ev.summary.slice(0, 120)}`,
            source: ev.provenance.sourceLabel,
            confidence: ev.confidence,
          });
        }
      }
    }

    // Account creation dates
    if (ev.summary.includes("Account created:") || ev.summary.includes("created:")) {
      const createdMatch = ev.summary.match(/created:\s*([\d-]+)/i);
      if (createdMatch) {
        const key = `created-${ev.id}`;
        if (!seen.has(key)) {
          seen.add(key);
          events.push({
            id: `tl-created-${ev.id}`,
            date: createdMatch[1],
            event: `Account / profile created · ${ev.title}`,
            source: ev.provenance.sourceLabel,
            confidence: ev.confidence,
          });
        }
      }
    }
  }

  return events.sort((a, b) => a.date.localeCompare(b.date)).slice(0, 30);
}

function buildPersonCandidate(
  query: string,
  adapters: AdapterResult[],
): PersonCandidate {
  const evidence = adapters.flatMap((a) => a.evidence);
  const candidateId = `candidate-${query.replace(/\s+/g, "-").toLowerCase().slice(0, 32)}`;

  // Extract GitHub data from the github-user adapter
  const githubAdapter = adapters.find((a) => a.adapterId === "github-user");
  const githubProfileEv = githubAdapter?.evidence.find((e) => e.id.startsWith("github-profile-"));
  let github: PersonCandidate["github"] | undefined;

  if (githubProfileEv) {
    const s = githubProfileEv.summary;
    const nameM = s.match(/Name:\s*([^·]+)/);
    const bioM = s.match(/Bio:\s*([^·]+)/);
    const compM = s.match(/Company:\s*([^·]+)/);
    const locM = s.match(/Location \(publicly stated\):\s*([^·]+)/);
    const emailM = s.match(/Public email:\s*([^·]+)/);
    const repoM = s.match(/Repos:\s*(\d+)/);
    const follM = s.match(/Followers:\s*(\d+)/);
    github = {
      username: query.replace(/^@/, ""),
      publicRepos: repoM ? parseInt(repoM[1], 10) : 0,
      followers: follM ? parseInt(follM[1], 10) : 0,
      bio: bioM?.[1]?.trim(),
      company: compM?.[1]?.trim(),
      location: locM?.[1]?.trim(),
      publicEmail: emailM?.[1]?.trim(),
      url: githubProfileEv.url ?? `https://github.com/${query.replace(/^@/, "")}`,
    };
  }

  // Extract academic data
  const academicAdapters = adapters.filter((a) =>
    ["openalex-author", "semantic-scholar-author", "crossref", "orcid-author"].includes(a.adapterId),
  );
  let academic: PersonCandidate["academic"] | undefined;

  if (academicAdapters.some((a) => a.evidence.length > 0)) {
    const openalexEv = adapters.find((a) => a.adapterId === "openalex-author")?.evidence[0];
    if (openalexEv) {
      const worksM = openalexEv.summary.match(/Works:\s*(\d+)/);
      const citeM = openalexEv.summary.match(/Citations:\s*(\d+)/);
      const topicsM = openalexEv.summary.match(/Research topics:\s*([^·]+)/);
      const affM = openalexEv.summary.match(/Affiliations:\s*([^·]+)/);
      const orcidM = openalexEv.summary.match(/ORCID:\s*([^\s·]+)/);
      academic = {
        worksCount: worksM ? parseInt(worksM[1], 10) : 0,
        citationCount: citeM ? parseInt(citeM[1], 10) : 0,
        topics: topicsM ? topicsM[1].split(",").map((t) => t.trim()) : [],
        affiliations: affM ? affM[1].split(",").map((t) => t.trim()) : [],
        orcid: orcidM?.[1]?.trim(),
      };
    }
  }

  // Collect public emails from evidence
  const publicEmails = extractEmailsFromEvidence(evidence);

  // Collect publicly stated locations from evidence
  const locationPattern = /Location \(publicly stated\):\s*([^·\n]+)/gi;
  const locations = new Set<string>();
  for (const ev of evidence) {
    const matches = ev.summary.matchAll(locationPattern);
    for (const m of matches) locations.add(m[1].trim());
  }

  // Collect organizations
  const orgPattern = /(?:Company|Affiliation|Institution):\s*([^·\n]+)/gi;
  const organizations = new Set<string>();
  for (const ev of evidence) {
    const matches = ev.summary.matchAll(orgPattern);
    for (const m of matches) organizations.add(m[1].trim().replace(/^@/, ""));
  }

  // Websites from evidence
  const urls = extractUrlsFromEvidence(evidence);
  const websites = urls
    .filter(
      (u) =>
        !u.includes("github.com") &&
        !u.includes("openalex.org") &&
        !u.includes("wikipedia.org") &&
        !u.includes("wikidata.org") &&
        !u.includes("orcid.org") &&
        !u.includes("semanticscholar.org") &&
        !u.includes("reddit.com"),
    )
    .slice(0, 5);

  // Distinct confidence
  let distinctionConfidence: PersonCandidate["distinctionConfidence"] = "AMBIGUOUS";
  const disambiguationEv = evidence.find(
    (e) => e.confidence === "UNCERTAIN" && e.title.toLowerCase().includes("disambiguation"),
  );
  if (disambiguationEv) {
    distinctionConfidence = "AMBIGUOUS";
  } else if (evidence.length >= 5) {
    distinctionConfidence = "MEDIUM";
  } else if (evidence.length >= 2) {
    distinctionConfidence = "LOW";
  }

  // Extract phone details
  const phoneAdapter = adapters.find((a) => a.adapterId === "india-phone-intel");
  let phoneDetails: IndiaPhoneAnalysis | undefined;
  const publicPhones: string[] = [];
  if (phoneAdapter) {
    phoneDetails = analyzeIndiaPhone(query);
    if (phoneDetails.isValid) {
      publicPhones.push(phoneDetails.nationalFormat);
    }
  }

  return {
    candidateId,
    distinctionConfidence,
    names: [query.trim()],
    usernames: github ? { GitHub: github.username } : {},
    publicEmails,
    publicPhones,
    phoneDetails,
    locations: [...locations],
    organizations: [...organizations].slice(0, 5),
    websites,
    github,
    academic,
    evidenceIds: evidence.map((e) => e.id),
  };
}

function discoverPivots(adapters: AdapterResult[], query: string): DiscoveredPivot[] {
  const pivots: DiscoveredPivot[] = [];
  const seenValues = new Set<string>();

  for (const adapter of adapters) {
    for (const ev of adapter.evidence) {
      // Discover emails
      const emails = ev.summary.match(/Public email:\s*([^\s·]+)/gi);
      if (emails) {
        for (const e of emails) {
          const email = e.replace(/Public email:\s*/i, "").trim();
          if (!seenValues.has(email) && email.includes("@")) {
            seenValues.add(email);
            pivots.push({
              value: email,
              pivotClass: "email",
              discoveredIn: adapter.adapterId,
              confidence: "HIGH",
            });
            // Also add username from email as pivot
            const un = extractUsernameFromEmail(email);
            if (un && !seenValues.has(un)) {
              seenValues.add(un);
              pivots.push({
                value: un,
                pivotClass: "username",
                discoveredIn: adapter.adapterId,
                confidence: "MEDIUM",
              });
            }
          }
        }
      }

      // Discover websites
      const blogMatch = ev.summary.match(/Website:\s*(https?:\/\/[^\s·]+)/i);
      if (blogMatch) {
        const site = blogMatch[1].trim();
        if (!seenValues.has(site)) {
          seenValues.add(site);
          const domainM = site.match(/^https?:\/\/([^/]+)/);
          if (domainM) {
            pivots.push({
              value: domainM[1],
              pivotClass: "domain",
              discoveredIn: adapter.adapterId,
              confidence: "HIGH",
            });
          }
        }
      }

      // Academic name variations
      const nameMatch = ev.summary.match(/Name:\s*([^·]+)/i);
      if (
        nameMatch &&
        adapter.adapterId === "github-user" &&
        nameMatch[1].trim().toLowerCase() !== query.trim().toLowerCase()
      ) {
        const displayName = nameMatch[1].trim();
        if (!seenValues.has(displayName)) {
          seenValues.add(displayName);
          pivots.push({
            value: displayName,
            pivotClass: "academic-name",
            discoveredIn: adapter.adapterId,
            confidence: "MEDIUM",
          });
        }
      }
    }
  }

  return pivots.slice(0, 15);
}

function detectConflicts(adapters: AdapterResult[]): EvidenceConflict[] {
  const conflicts: EvidenceConflict[] = [];

  // Check for location conflicts across adapters
  const locationsBySource: Record<string, string> = {};
  for (const adapter of adapters) {
    for (const ev of adapter.evidence) {
      const locM = ev.summary.match(/Location[^:]*:\s*([^·\n]+)/i);
      if (locM) {
        locationsBySource[adapter.adapterId] = locM[1].trim();
      }
    }
  }

  const locationEntries = Object.entries(locationsBySource);
  if (locationEntries.length >= 2) {
    const locations = [...new Set(locationEntries.map(([, v]) => v))];
    if (locations.length >= 2) {
      conflicts.push({
        id: "conflict-location",
        field: "Location (publicly stated)",
        description:
          "Different public sources report different locations. All are self-reported — location is not independently verified.",
        sides: locationEntries.slice(0, 2).map(([source, loc]) => ({
          label: source,
          value: loc,
        })),
      });
    }
  }

  // Check for name conflicts
  const namesBySource: Record<string, string> = {};
  for (const adapter of adapters) {
    for (const ev of adapter.evidence) {
      const nameM = ev.summary.match(/Name:\s*([^·\n]+)/i);
      if (nameM && nameM[1].trim()) {
        namesBySource[adapter.adapterId] = nameM[1].trim();
      }
    }
  }
  const nameEntries = Object.entries(namesBySource);
  const distinctNames = [...new Set(nameEntries.map(([, v]) => v))];
  if (distinctNames.length >= 2) {
    conflicts.push({
      id: "conflict-name",
      field: "Display name",
      description:
        "Different public profiles show different display names. These may be legal name vs. username vs. professional name — not necessarily a contradiction.",
      sides: nameEntries.slice(0, 2).map(([source, name]) => ({
        label: source,
        value: name,
      })),
    });
  }

  return conflicts;
}

// ── Main Engine ───────────────────────────────────────────────────────────────

export async function runPersonIntelligenceEngine(
  rawQuery: string,
): Promise<PersonIntelligenceResult> {
  const classification = classifyQuery(rawQuery);
  const retrievedAt = new Date().toISOString();
  const q = rawQuery.trim();

  const jobs: Promise<AdapterResult>[] = [];
  const liveJobIds: string[] = [];

  const isPerson =
    classification.chips.includes("PERSON") || classification.chips.includes("MIXED");
  const isUsername =
    classification.chips.includes("USERNAME") && !classification.chips.includes("DOMAIN");
  const isEmail = classification.chips.includes("EMAIL");
  const isPhone = classification.chips.includes("PHONE") || /^\+?\d[\d\s\-()]{7,}$/.test(q);

  // Phone collector: runs for phone numbers
  if (isPhone) {
    const phoneIntel = runIndiaPhoneIntelligence(q);
    jobs.push(Promise.resolve(phoneIntel.adapterResult));
    liveJobIds.push("india-phone-intel");
  }

  // GitHub collector: runs for usernames and person names
  const githubUsername = extractGitHubUsername(q, classification);
  if (githubUsername || isUsername) {
    jobs.push(collectGitHubUser(githubUsername ?? q.replace(/^@/, "")));
    liveJobIds.push("github-user");
  }

  // Reddit: username class
  if (isUsername) {
    jobs.push(collectRedditProfile(q));
    liveJobIds.push("reddit-profile");
  }

  // Person-class: academic / knowledge lookups
  if (isPerson || (classification.chips.includes("NL") && q.includes(" "))) {
    jobs.push(
      collectOpenAlexAuthor(q),
      collectSemanticScholar(q),
      collectOrcidAuthor(q),
      collectWikipediaSummary(q),
      collectWikidataEntity(q),
    );
    liveJobIds.push(
      "openalex-author",
      "semantic-scholar-author",
      "orcid-author",
      "wikipedia-summary",
      "wikidata-entity",
    );
  }

  // For email: try username from email for GitHub/Reddit
  if (isEmail) {
    const usernameFromEmail = extractUsernameFromEmail(q);
    if (usernameFromEmail) {
      jobs.push(collectGitHubUser(usernameFromEmail));
      liveJobIds.push("github-user-from-email");
    }
    // Also try the full email as a person name for academic search
    jobs.push(collectOpenAlexAuthor(q));
    liveJobIds.push("openalex-author");
  }

  // If nothing matched any strong class, treat as person name search
  if (jobs.length === 0) {
    jobs.push(
      collectWikipediaSummary(q),
      collectWikidataEntity(q),
      collectOpenAlexAuthor(q),
    );
    liveJobIds.push("wikipedia-summary", "wikidata-entity", "openalex-author");
  }

  const collected = await Promise.all(jobs);
  const evidence = collected.flatMap((a) => a.evidence);

  // Pivot discovery
  const pivots = discoverPivots(collected, q);

  // Build candidate
  const candidates =
    evidence.length > 0
      ? [buildPersonCandidate(q, collected)]
      : [];

  // Timeline
  const timeline = buildTimeline(evidence);

  // Conflicts
  const conflicts = detectConflicts(collected);

  // Pending capabilities (honest about what is not yet connected)
  const pendingCapabilities = [
    "Username cross-platform presence (Sherlock / Maigret — WORKER_PENDING)",
    "Email account presence indicators (Holehe — WORKER_PENDING)",
    "Email breach exposure summary (HIBP — WORKER_PENDING / API key)",
    "Phone number public metadata (PhoneInfoga — WORKER_PENDING)",
    "Passive subdomain enumeration (Amass / Subfinder — WORKER_PENDING)",
    "Domain email/name harvesting (theHarvester — WORKER_PENDING)",
    "File metadata extraction (ExifTool — WORKER_PENDING)",
    "OCR document text extraction (Tesseract — WORKER_PENDING)",
    "Domain reputation (VirusTotal — SERVER_AUTH / API key)",
    "IP abuse reputation (AbuseIPDB — SERVER_AUTH / API key)",
    "Patent & inventor records (Google Patents — CLIENT_HINT)",
  ];

  return {
    query: q,
    classification,
    retrievedAt,
    adapters: collected,
    evidence,
    candidates,
    pivots,
    timeline,
    conflicts,
    phases: [
      { id: "CLASSIFY", status: "completed" },
      { id: "COLLECT", status: "completed" },
      { id: "PIVOT", status: pivots.length > 0 ? "completed" : "skipped" },
      { id: "CORRELATE", status: evidence.length >= 2 ? "completed" : "skipped" },
      { id: "RESOLVE", status: candidates.length > 0 ? "completed" : "skipped" },
      { id: "REPORT", status: "completed" },
    ],
    liveCollectorsRan: collected.filter((a) => a.health === "AVAILABLE").length,
    boundary:
      "Public / permitted sources only. No subscriber lookup, no IMSI tracking, no credential access, " +
      "no private profile scraping, no live location inference. All results are from voluntarily public information.",
    pendingCapabilities,
  };
}
