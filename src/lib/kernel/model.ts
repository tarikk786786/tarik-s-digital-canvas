/**
 * Shared kernel data model — WORLD / INFORMATION / FORENSIC.
 */

export type Confidence =
  | "VERIFIED"
  | "SUPPORTED"
  | "PROBABLE"
  | "UNCERTAIN"
  | "CONFLICTING"
  | "UNVERIFIED";

export type Freshness = "LIVE" | "CACHED" | "DEMO" | "SYNTHETIC" | "OFFLINE" | "DEGRADED" | "UNKNOWN";

export type SystemHealth =
  | "ONLINE"
  | "PROCESSING"
  | "DEGRADED"
  | "AUTH_REQUIRED"
  | "OFFLINE"
  | "WORKER_PENDING";

export interface Provenance {
  sourceLabel: string;
  method: string;
  methodVersion?: string;
  retrievedAt: string;
  whyVisible: string;
  limitations: string[];
}

export interface Observation {
  id: string;
  description: string;
  observedAt: string;
  instrument?: string;
}

export interface Entity {
  id: string;
  type: string;
  label: string;
  attributes?: Record<string, string>;
}

export interface Evidence {
  id: string;
  title: string;
  summary: string;
  confidence: Confidence;
  freshness: Freshness;
  observations?: Observation[];
  provenance: Provenance;
  url?: string;
}

export interface Source {
  id: string;
  categoryLabel: string;
  health: SystemHealth;
  detail: string;
}

export interface TimelineEvent {
  id: string;
  at: string;
  label: string;
  actor?: string;
}

export interface CaseRecord {
  id: string;
  title: string;
  status: string;
  synthetic: boolean;
}

export interface Analysis {
  caseId: string;
  evidenceId: string;
  method: string;
  methodVersion: string;
  observations: string[];
  results: Record<string, unknown>;
  interpretation: string;
  confidence: Confidence;
  uncertainty: string;
  limitations: string[];
  provenance: Provenance;
}

export interface Conflict {
  id: string;
  description: string;
  evidenceIds: string[];
}

export interface InvestigationJob {
  id: string;
  query: string;
  status: SystemHealth | "COMPLETED" | "FAILED";
  createdAt: string;
}
