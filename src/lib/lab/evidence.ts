/**
 * Shared evidence language across WORLD / INFORMATION / FORENSIC engines.
 * Observation → Analysis → Interpretation → Conclusion — never skip steps.
 */

export type EvidenceStatus =
  | "VERIFIED"
  | "SUPPORTED"
  | "PROBABLE"
  | "UNCERTAIN"
  | "CONFLICTING"
  | "UNVERIFIED";

export type EvidenceStage =
  | "OBSERVATION"
  | "ANALYSIS"
  | "INTERPRETATION"
  | "CONCLUSION";

export type Freshness = "LIVE" | "CACHED" | "DEMO" | "OFFLINE" | "DEGRADED" | "UNKNOWN";

export interface Provenance {
  source: string;
  method: string;
  version: string;
  retrievedAt: string;
  whyVisible: string;
  limitations: string[];
  confidence: EvidenceStatus;
  freshness: Freshness;
}

export const EVIDENCE_STAGE_COPY: Record<EvidenceStage, string> = {
  OBSERVATION: "What was measured or retrieved — no judgment yet.",
  ANALYSIS: "How the observation was processed (method, instrument, hash).",
  INTERPRETATION: "What the analysis may mean — provisional, with alternatives.",
  CONCLUSION: "Only when evidence supports it; otherwise remain UNCERTAIN.",
};
