/**
 * ForensicAdapter — isolated worker contract (§30).
 * Visitors never see internal engine names in chrome.
 */

import type {
  DeploymentClass,
  ForensicAnalysisOutput,
  ForensicDiscipline,
  WorkerHealth,
  WorkerRuntime,
} from "./types";

export interface ForensicAdapterContext {
  caseId: string;
  evidenceId: string;
  bytes?: ArrayBuffer;
  text?: string;
  synthetic?: boolean;
}

export interface ForensicAdapter {
  id: string;
  /** Visitor-facing category only */
  publicLabel: string;
  discipline: ForensicDiscipline;
  capability: string;
  runtime: WorkerRuntime;
  deployment: DeploymentClass;
  health: WorkerHealth;
  healthDetail: string;
  licenseNote: string;
  pinnedVersion?: string;
  /** Internal engineering id — never render in visitor chrome */
  internalEngine?: string;
  analyze?: (ctx: ForensicAdapterContext) => Promise<ForensicAnalysisOutput>;
}

export function normalizeToAnalysis(
  partial: Omit<ForensicAnalysisOutput, "methodVersion"> & { methodVersion?: string },
): ForensicAnalysisOutput {
  return {
    ...partial,
    methodVersion: partial.methodVersion || "1.0.0",
    quarantine: partial.quarantine ?? {
      status: "SANDBOX_ONLY",
      note: "Untrusted artifacts stay quarantined — never execute in the main web process.",
    },
  };
}
