/**
 * Shared evidence language across WORLD / INFORMATION / FORENSIC engines.
 * Canonical types live in `@/lib/kernel/model` — this module re-exports + stage copy.
 * Observation → Analysis → Interpretation → Conclusion — never skip steps.
 */

export type {
  Confidence as EvidenceStatus,
  Freshness,
  Provenance,
  Evidence,
  Observation,
  Analysis,
} from "@/lib/kernel/model";

export type EvidenceStage =
  | "OBSERVATION"
  | "ANALYSIS"
  | "INTERPRETATION"
  | "CONCLUSION";

export const EVIDENCE_STAGE_COPY: Record<EvidenceStage, string> = {
  OBSERVATION: "What was measured or retrieved — no judgment yet.",
  ANALYSIS: "How the observation was processed (method, instrument, hash).",
  INTERPRETATION: "What the analysis may mean — provisional, with alternatives.",
  CONCLUSION: "Only when evidence supports it; otherwise remain UNCERTAIN.",
};
