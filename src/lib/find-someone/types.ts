/**
 * Find Someone — OSINT Research Engine Type System
 * All entity, source, evidence, and investigation types.
 */

// ── Entity Types ──────────────────────────────────────────────────────────────

export type EntityType =
  | "person"
  | "organization"
  | "company"
  | "website"
  | "document"
  | "news"
  | "location"
  | "username"
  | "email"
  | "phone";

export type ConfidenceStatus =
  "confirmed" | "high_confidence" | "likely" | "possible" | "unverified" | "conflicting";

export interface Entity {
  id: string;
  type: EntityType;
  name: string;
  aliases: string[];
  metadata: Record<string, string>;
  sources: string[]; // source IDs
  confidence: number; // 0–100
  status: ConfidenceStatus;
  createdAt: string;
  updatedAt: string;
}

export interface PersonEntity extends Entity {
  type: "person";
  profileImage?: string;
  publicProfiles: PublicProfile[];
  organizations: string[]; // entity IDs
  websites: string[];
  locations: string[];
  publicFootprint: PublicFootprint;
}

export interface OrganizationEntity extends Entity {
  type: "organization" | "company";
  website?: string;
  domain?: string;
  industry?: string;
  location?: string;
  members: string[]; // person entity IDs
}

export interface PublicProfile {
  platform: string;
  url: string;
  username: string;
  confidence: number;
  verified: boolean;
  lastChecked: string;
  metadata: Record<string, string>;
}

export interface PublicFootprint {
  profiles: number;
  organizations: number;
  websites: number;
  publications: number;
  documents: number;
  newsMentions: number;
}

// ── Source & Evidence Types ────────────────────────────────────────────────────

export type SourceQualityTier =
  | "official" // ★★★★★
  | "government" // ★★★★★
  | "regulatory" // ★★★★★
  | "primary" // ★★★★★
  | "established" // ★★★★☆
  | "known" // ★★★★☆
  | "secondary" // ★★★☆☆
  | "unknown" // ★★☆☆☆
  | "unverified"; // ★☆☆☆☆

export const SOURCE_QUALITY_STARS: Record<SourceQualityTier, number> = {
  official: 5,
  government: 5,
  regulatory: 5,
  primary: 5,
  established: 4,
  known: 4,
  secondary: 3,
  unknown: 2,
  unverified: 1,
};

export interface Source {
  id: string;
  name: string;
  url: string;
  domain: string;
  qualityTier: SourceQualityTier;
  qualityScore: number; // 1–5
  type: "webpage" | "document" | "news" | "profile" | "government" | "database" | "api";
  retrievedAt: string;
  lastVerified: string;
  publisher?: string;
  author?: string;
}

export interface Evidence {
  id: string;
  sourceId: string;
  extractedText: string;
  context: string;
  extractedAt: string;
  confidence: number;
}

export interface Claim {
  id: string;
  subject: string; // entity name
  predicate: string; // "works_for", "founded", "located_in", etc.
  object: string; // target entity/value
  confidence: number;
  status: ConfidenceStatus;
  sourceId: string;
  evidenceId: string;
  extractedAt: string;
  evidenceText: string;
}

export interface Conflict {
  id: string;
  claimA: Claim;
  claimB: Claim;
  field: string;
  description: string;
}

// ── Timeline Types ────────────────────────────────────────────────────────────

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  sourceId: string;
  evidenceId: string;
  entityIds: string[];
  type: "publication" | "affiliation" | "founding" | "event" | "mention" | "role" | "other";
  confidence: number;
}

// ── Relationship Graph Types ──────────────────────────────────────────────────

export type RelationshipType =
  | "works_for"
  | "founded"
  | "authored"
  | "mentioned_in"
  | "affiliated_with"
  | "published_by"
  | "located_in"
  | "linked_to"
  | "member_of"
  | "owns";

export interface Relationship {
  id: string;
  sourceEntityId: string;
  targetEntityId: string;
  type: RelationshipType;
  evidenceIds: string[];
  confidence: number;
  label: string;
}

// ── Identity Resolution Types ─────────────────────────────────────────────────

export interface IdentityMatch {
  entityId: string;
  overallConfidence: number;
  signals: IdentitySignal[];
  conflicts: IdentityConflict[];
  conclusion: string;
}

export interface IdentitySignal {
  type:
    | "name"
    | "username"
    | "organization"
    | "website"
    | "publication"
    | "biography"
    | "location"
    | "email"
    | "document";
  description: string;
  confidence: number;
  matching: boolean;
}

export interface IdentityConflict {
  type: string;
  description: string;
  severity: "low" | "medium" | "high";
}

// ── Investigation Types ───────────────────────────────────────────────────────

export type InvestigationStatus = "created" | "searching" | "processing" | "completed" | "error";

export type InvestigationMode = "quick" | "standard" | "deep";

export interface Investigation {
  id: string;
  query: SearchQuery;
  status: InvestigationStatus;
  mode: InvestigationMode;
  entities: Entity[];
  persons: PersonEntity[];
  organizations: OrganizationEntity[];
  sources: Source[];
  claims: Claim[];
  evidence: Evidence[];
  conflicts: Conflict[];
  timeline: TimelineEvent[];
  relationships: Relationship[];
  identityMatches: IdentityMatch[];
  progress: WorkerProgress[];
  createdAt: string;
  completedAt?: string;
}

export type SearchIntent =
  | "person" // Find Someone
  | "company" // Find a Company
  | "website" // Investigate a Website
  | "evidence" // Search Evidence
  | "connections" // Explore Connections
  | "document" // Analyze a Document
  | "image"; // Analyze an Image

export type QueryType =
  | "person"
  | "username"
  | "domain"
  | "company"
  | "organization"
  | "phone"
  | "email"
  | "document"
  | "news"
  | "location"
  | "general";

export interface CompanyIntelligence {
  name: string;
  legalName?: string;
  registrationNumber?: string;
  incorporationDate?: string;
  website: string;
  domain: string;
  industry: string;
  headquarters: string;
  publicLeadership: {
    name: string;
    role: string;
    confidence: number;
    source: string;
  }[];
  publicDocuments: {
    title: string;
    type: string;
    date: string;
    url: string;
  }[];
  products: string[];
  publicLocations: string[];
  newsHighlights: {
    title: string;
    publisher: string;
    date: string;
    url: string;
  }[];
  relationships: {
    entity: string;
    type: string;
    evidence: string;
  }[];
}

export interface WebsiteIntelligence {
  domain: string;
  title: string;
  description: string;
  organizationContext: string;
  technologyProfile: {
    category: string;
    technologies: string[];
  }[];
  publicPages: {
    path: string;
    title: string;
    status: number;
  }[];
  publicDocuments: {
    title: string;
    type: string;
    url: string;
  }[];
  publicOutboundLinks: string[];
  relatedDomains: string[];
  newsMentions: number;
  securityObservations: {
    title: string;
    status: "healthy" | "notice" | "observation";
    detail: string;
  }[];
}

export interface DocumentIntelligence {
  title: string;
  documentType: string;
  fileSize: string;
  pageCount: number;
  authorContext?: string;
  detectedLanguage: string;
  extractedEntities: {
    type: string;
    name: string;
    frequency: number;
  }[];
  organizationsMentioned: string[];
  importantDates: string[];
  keyFindings: string[];
  referencedSources: string[];
  timelineExcerpts: {
    date: string;
    event: string;
  }[];
}

export interface ImageIntelligence {
  fileName: string;
  fileSize: string;
  dimensions: string;
  cameraExif?: {
    make?: string;
    model?: string;
    software?: string;
    captureTime?: string;
    gpsCoordinates?: string;
  };
  visibleTextExtracted: string[];
  identifiedDocumentElements: string[];
  contextualClues: string[];
  potentialSourceContext: string;
  attributionCaveat: string;
}

export interface SearchQuery {
  raw: string;
  entityType: QueryType;
  name?: string;
  username?: string;
  domain?: string;
  company?: string;
  location?: string;
  language?: string;
  sources: string[];
  filters: SearchFilters;
}

export interface SearchFilters {
  country?: string;
  state?: string;
  city?: string;
  language?: string;
  dateAfter?: string;
  dateBefore?: string;
  sourceConfidence?: number;
  identityConfidence?: number;
  exactPhrase?: string;
  domain?: string;
}

// ── Worker Progress Types ─────────────────────────────────────────────────────

export type WorkerType =
  | "web"
  | "profiles"
  | "news"
  | "documents"
  | "india"
  | "language"
  | "entities"
  | "graph"
  | "identity"
  | "timeline";

export type WorkerStatus = "pending" | "running" | "completed" | "error";

export interface WorkerProgress {
  type: WorkerType;
  label: string;
  status: WorkerStatus;
  progress: number; // 0–100
  resultsCount: number;
  startedAt?: string;
  completedAt?: string;
  error?: string;
}

// ── Report Types ──────────────────────────────────────────────────────────────

export type ReportFormat = "html" | "markdown" | "json" | "pdf";

export interface ReportConfig {
  format: ReportFormat;
  sections: {
    executiveSummary: boolean;
    identityCandidates: boolean;
    publicProfiles: boolean;
    organizations: boolean;
    documents: boolean;
    news: boolean;
    timeline: boolean;
    relationships: boolean;
    evidence: boolean;
    conflicts: boolean;
    sourceList: boolean;
    confidenceAssessment: boolean;
  };
}
