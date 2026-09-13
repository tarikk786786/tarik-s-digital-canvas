/**
 * Standard forensic analysis output contract (§29).
 * Observation → Analysis → Interpretation → Conclusion — never skip.
 */

export type ForensicConfidence =
  | "VERIFIED"
  | "SUPPORTED"
  | "PROBABLE"
  | "UNCERTAIN"
  | "CONFLICTING"
  | "UNVERIFIED";

export type ForensicFreshness = "LIVE" | "CACHED" | "DEMO" | "SYNTHETIC" | "OFFLINE";

export interface ForensicProvenance {
  sourceLabel: string;
  method: string;
  methodVersion: string;
  retrievedAt: string;
  whyVisible: string;
  limitations: string[];
}

export interface ForensicAnalysisOutput {
  caseId: string;
  evidenceId: string;
  method: string;
  methodVersion: string;
  observations: string[];
  results: Record<string, unknown>;
  interpretation: string;
  confidence: ForensicConfidence;
  uncertainty: string;
  limitations: string[];
  provenance: ForensicProvenance;
  freshness: ForensicFreshness;
  quarantine?: {
    status: "CLEAN" | "QUARANTINED" | "SANDBOX_ONLY";
    note: string;
  };
}

export type DeploymentClass =
  | "FRONTEND_LIBRARY"
  | "API_LIBRARY"
  | "WORKER"
  | "ISOLATED_SANDBOX"
  | "RESEARCH_REFERENCE"
  | "OPTIONAL";

export type WorkerRuntime = "browser" | "node" | "python-worker" | "offline" | "insforge-function";

export type WorkerHealth =
  | "ONLINE"
  | "DEGRADED"
  | "WORKER_PENDING"
  | "AUTH_DEPENDENT"
  | "OFFLINE"
  | "RESEARCH_ONLY";

export type ForensicDiscipline =
  | "DISK"
  | "MEMORY"
  | "TIMELINE"
  | "MALWARE"
  | "ENDPOINT"
  | "DOCUMENT"
  | "IMAGE"
  | "AUDIO_VIDEO"
  | "TOX"
  | "BIO"
  | "GRAPH"
  | "SEARCH"
  | "AI_KNOWLEDGE"
  | "QUEUE"
  | "STORAGE"
  | "GEO"
  | "OCR_NLP"
  | "INDIA"
  | "SECURITY";
