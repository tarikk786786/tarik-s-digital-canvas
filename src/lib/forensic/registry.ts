/**
 * FORENSIC_REPOSITORY_REGISTRY — capability map (§31–32).
 * Internal engineering dependencies. UI shows publicLabel only.
 * DO NOT mass-install. Status reflects deployability on current stack.
 */

import type { ForensicAdapter } from "./adapter";
import { normalizeToAnalysis } from "./adapter";

async function sha256Hex(data: ArrayBuffer): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

const hashIntegrityAdapter: ForensicAdapter = {
  id: "integrity-hash",
  publicLabel: "Integrity / custody hashing",
  discipline: "DISK",
  capability: "SHA-256 seal verification on working copies",
  runtime: "browser",
  deployment: "FRONTEND_LIBRARY",
  health: "ONLINE",
  healthDetail: "Web Crypto available in-browser",
  licenseNote: "Platform Web Crypto",
  pinnedVersion: "subtle-crypto",
  async analyze(ctx) {
    const bytes = ctx.bytes ?? new Uint8Array(0).buffer;
    const hash = await sha256Hex(bytes);
    return normalizeToAnalysis({
      caseId: ctx.caseId,
      evidenceId: ctx.evidenceId,
      method: "SHA-256 integrity",
      observations: [`Byte length ${bytes.byteLength}`],
      results: { algorithm: "SHA-256", digest: hash },
      interpretation: ctx.synthetic
        ? "Synthetic training seal — not real seizure evidence."
        : "Hash computed on working copy only.",
      confidence: "VERIFIED",
      uncertainty: "Hash proves integrity of examined bytes, not authenticity of origin.",
      limitations: ["Never modify original evidence objects."],
      provenance: {
        sourceLabel: "Integrity / custody hashing",
        method: "Web Crypto SHA-256",
        methodVersion: "1.0.0",
        retrievedAt: new Date().toISOString(),
        whyVisible: "Digital evidence mini-flow requested integrity check.",
        limitations: ["Working-copy hashing only."],
      },
      freshness: ctx.synthetic ? "SYNTHETIC" : "LIVE",
    });
  },
};

const documentTextAdapter: ForensicAdapter = {
  id: "document-text",
  publicLabel: "Document text extraction",
  discipline: "DOCUMENT",
  capability: "Plain-text extract from uploaded text/markdown (browser)",
  runtime: "browser",
  deployment: "FRONTEND_LIBRARY",
  health: "ONLINE",
  healthDetail: "Text FileReader path online; PDF OCR workers pending",
  licenseNote: "Browser FileReader",
  pinnedVersion: "1.0.0",
  async analyze(ctx) {
    const text = (ctx.text || "").slice(0, 4000);
    return normalizeToAnalysis({
      caseId: ctx.caseId,
      evidenceId: ctx.evidenceId,
      method: "Plain text extraction",
      observations: [`Characters read: ${text.length}`],
      results: { preview: text.slice(0, 500) },
      interpretation: text
        ? "Text extracted from working copy for timeline indexing."
        : "No text payload provided.",
      confidence: text ? "SUPPORTED" : "UNCERTAIN",
      uncertainty: "Extraction ≠ semantic truth of document claims.",
      limitations: ["PDF/OCR workers are WORKER_PENDING on this host."],
      provenance: {
        sourceLabel: "Document text extraction",
        method: "FileReader / string payload",
        methodVersion: "1.0.0",
        retrievedAt: new Date().toISOString(),
        whyVisible: "Document discipline requested extraction.",
        limitations: ["Quarantine: do not execute embedded scripts."],
      },
      freshness: ctx.synthetic ? "SYNTHETIC" : "LIVE",
      quarantine: {
        status: "QUARANTINED",
        note: "Uploads stay quarantined; never run macros/scripts in the main web process.",
      },
    });
  },
};

const toxEducationalAdapter: ForensicAdapter = {
  id: "tox-educational",
  publicLabel: "Toxicology education module",
  discipline: "TOX",
  capability: "Screening→interpretation UI + synthetic peak simulation",
  runtime: "browser",
  deployment: "FRONTEND_LIBRARY",
  health: "ONLINE",
  healthDetail: "Educational UI online — no instrument attachment",
  licenseNote: "Internal educational content",
  pinnedVersion: "case-0001",
  internalEngine: "synthetic-ms-sim",
};

const evidenceGraphAdapter: ForensicAdapter = {
  id: "evidence-graph",
  publicLabel: "Evidence relationship graph",
  discipline: "GRAPH",
  capability: "Interactive evidence/entity graph in lab UI",
  runtime: "browser",
  deployment: "FRONTEND_LIBRARY",
  health: "ONLINE",
  healthDetail: "Graph renderer available (@xyflow)",
  licenseNote: "MIT graph library",
  pinnedVersion: "xyflow-12",
};

function pending(
  id: string,
  publicLabel: string,
  discipline: ForensicAdapter["discipline"],
  capability: string,
  internalEngine: string,
  deployment: ForensicAdapter["deployment"] = "WORKER",
): ForensicAdapter {
  return {
    id,
    publicLabel,
    discipline,
    capability,
    runtime: "python-worker",
    deployment,
    health: "WORKER_PENDING",
    healthDetail:
      "Not runnable on this serverless host. Registered for future isolated worker — no fabricated results.",
    licenseNote: "See internal registry; not exposed to visitors",
    pinnedVersion: "unpinned-pending",
    internalEngine,
  };
}

export const FORENSIC_REPOSITORY_REGISTRY: ForensicAdapter[] = [
  hashIntegrityAdapter,
  documentTextAdapter,
  toxEducationalAdapter,
  evidenceGraphAdapter,
  pending("disk-analysis", "Disk analysis worker", "DISK", "Disk / volume artifact recovery", "sleuthkit-family"),
  pending("forensic-platform", "Forensic platform worker", "DISK", "Full-disk case orchestration", "autopsy-family"),
  pending("timeline-super", "Timeline reconstruction worker", "TIMELINE", "Multi-source timeline generation", "plaso-family"),
  pending("timeline-collab", "Collaborative timeline workspace", "TIMELINE", "Shared timeline review", "timesketch-family", "RESEARCH_REFERENCE"),
  pending("memory-analysis", "Memory analysis worker", "MEMORY", "Volatile memory artifact analysis", "volatility3"),
  pending("endpoint-agent", "Endpoint collection (authorized)", "ENDPOINT", "Authorized endpoint triage", "velociraptor", "ISOLATED_SANDBOX"),
  pending("malware-rules", "Malware rule evaluation", "MALWARE", "YARA-X preferred evaluation path", "yara-x"),
  pending("chem-informatics", "Chemical informatics (education)", "TOX", "Reference structures only — never synthesis", "rdkit", "RESEARCH_REFERENCE"),
  pending("ms-analytics", "Mass-spec analytics worker", "TOX", "Spectra matching education/research", "openms-matchms", "RESEARCH_REFERENCE"),
  pending("bioinformatics", "Biological sequence tools", "BIO", "Educational sequence utilities", "biopython", "RESEARCH_REFERENCE"),
  pending("image-forensics", "Image forensics worker", "IMAGE", "Metadata + CV on working copies", "opencv-exif-imagemagick"),
  pending("av-transcription", "Audio/video processing", "AUDIO_VIDEO", "Transcode + speech-to-text workers", "ffmpeg-whisper"),
  pending("ocr-pipeline", "OCR / document structure", "OCR_NLP", "OCR and layout extraction", "ocr-docling-family"),
  pending("scientific-ml", "Scientific ML utilities", "AI_KNOWLEDGE", "Never automatic forensic ID", "sklearn-stack", "OPTIONAL"),
  pending("job-queue", "Analysis job queue", "QUEUE", "Background forensic jobs", "insforge-jobs", "OPTIONAL"),
  {
    id: "object-storage",
    publicLabel: "Evidence object storage",
    discipline: "STORAGE",
    capability: "S3-compatible artifact storage via InsForge",
    runtime: "insforge-function",
    deployment: "API_LIBRARY",
    health: "WORKER_PENDING",
    healthDetail: "InsForge storage linked at project level; app buckets not provisioned yet",
    licenseNote: "InsForge storage",
    pinnedVersion: "insforge",
    internalEngine: "insforge-storage",
  },
  {
    id: "case-db",
    publicLabel: "Case / evidence database",
    discipline: "SEARCH",
    capability: "Postgres persistence for cases & jobs (InsForge)",
    runtime: "insforge-function",
    deployment: "API_LIBRARY",
    health: "WORKER_PENDING",
    healthDetail: "InsForge Postgres online; forensic tables not migrated yet — using in-app synthetic case",
    licenseNote: "InsForge Postgres",
    pinnedVersion: "postgres-insforge",
    internalEngine: "insforge-postgres",
  },
];

export function getRegistryHealthSummary() {
  const counts: Record<string, number> = {};
  for (const a of FORENSIC_REPOSITORY_REGISTRY) {
    counts[a.health] = (counts[a.health] || 0) + 1;
  }
  return {
    total: FORENSIC_REPOSITORY_REGISTRY.length,
    counts,
    online: FORENSIC_REPOSITORY_REGISTRY.filter((a) => a.health === "ONLINE"),
    pending: FORENSIC_REPOSITORY_REGISTRY.filter((a) => a.health !== "ONLINE"),
  };
}

export function getPublicWorkerStatuses() {
  return FORENSIC_REPOSITORY_REGISTRY.map((a) => ({
    id: a.id,
    label: a.publicLabel,
    discipline: a.discipline,
    health: a.health,
    detail: a.healthDetail,
    capability: a.capability,
  }));
}
