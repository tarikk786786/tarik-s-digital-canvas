/**
 * CASE 0001 — synthetic training case for Forensic Intelligence Lab.
 * Label: SYNTHETIC TRAINING CASE — NOT REAL EVIDENCE
 * TOX content is educational identity/interpretation only — no synthesis recipes.
 */

export const CASE_0001 = {
  id: "CASE-0001",
  title: "Bay of Bengal Transit — Mixed Physical / Digital Training Pack",
  status: "ANALYSIS" as const,
  banner: "SYNTHETIC TRAINING CASE — NOT REAL EVIDENCE",
  summary:
    "Educational dossier combining a sealed toxicology specimen stream with a seized digital image of a shipping document. Built for method practice: observation → analysis → interpretation → conclusion.",
  disciplines: ["TOX", "DIGITAL", "DOCUMENT", "TRACE"] as const,
  chainOfCustody: [
    {
      at: "2026-03-11T06:10:00Z",
      event: "Synthetic intake logged",
      actor: "Training Lab Desk",
      hash: "sha256:intake_synthetic_case0001",
    },
    {
      at: "2026-03-11T07:02:00Z",
      event: "Specimen vial sealed (training seal)",
      actor: "TOX Bench",
      hash: "sha256:tox_seal_case0001",
    },
    {
      at: "2026-03-11T08:40:00Z",
      event: "Digital exhibit hashed (write-blocker simulation)",
      actor: "Digital Bench",
      hash: "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    },
    {
      at: "2026-03-12T11:15:00Z",
      event: "Case board opened for analysis",
      actor: "Lead Examiner (training)",
      hash: "sha256:caseboard_open_0001",
    },
  ],
  evidence: [
    {
      id: "EX-TOX-01",
      label: "Whole blood specimen (training)",
      type: "TOX",
      stage: "ANALYSIS" as const,
      observation: "Amber glass vial, training barcode TB-0001, volume marked 5 mL.",
      analysis: "Screening panel (simulated GC-MS peaks). Confirmation deferred in training mode.",
      interpretation:
        "Peaks consistent with a common therapeutic-class profile in the educational database — not a case conclusion.",
      conclusion: "UNCERTAIN — training dataset; do not treat as real toxicology finding.",
      limitations: [
        "Synthetic chromatogram — not patient data.",
        "No lethal-dose optimization or synthesis guidance.",
      ],
    },
    {
      id: "EX-DIG-01",
      label: "Shipping document photograph",
      type: "DIGITAL",
      stage: "ANALYSIS" as const,
      observation: "JPEG exhibit with EXIF stripped in training pack.",
      analysis:
        "SHA-256 of synthetic byte payload verified against intake seal (match demonstration).",
      interpretation: "Integrity check supports unbroken training chain for this exhibit.",
      conclusion: "SUPPORTED for hash continuity in the synthetic pack only.",
      limitations: ["Bytes are synthetic.", "No real consignee PII."],
    },
    {
      id: "EX-DOC-01",
      label: "Bill of lading excerpt (training)",
      type: "DOCUMENT",
      stage: "OBSERVATION" as const,
      observation: "Printed fields for vessel name, port, and cargo class — fictional.",
      analysis: "Pending OCR workflow in training UI.",
      interpretation: "Not interpreted.",
      conclusion: "UNVERIFIED",
      limitations: ["Fictional document."],
    },
  ],
  toxCard: {
    identity: "Caffeine (educational reference)",
    category: "Methylxanthine stimulant — common therapeutic / dietary xenobiotic",
    specimenRelevance: "Often detectable in blood/urine; useful for method teaching.",
    interpretationConsiderations: [
      "Therapeutic vs elevated ranges depend on matrix and validated method.",
      "Co-ingestants and post-mortem redistribution can confound interpretation.",
      "Never infer intent or cause of death from a single educational peak set.",
    ],
    references: [
      "SWGTOX / OSAC toxicology guidance (curated snapshot — not live-polled).",
      "ISO/IEC 17025 method validation concepts (educational).",
    ],
  },
  digitalHashDemo: {
    label: "Synthetic empty payload (demo)",
    algorithm: "SHA-256",
    expected: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    bytesNote: "Hash of empty byte string — classic test vector for integrity demos.",
  },
  askLabFaq: [
    {
      q: "Is this a real case?",
      a: "No. CASE 0001 is a SYNTHETIC TRAINING CASE — NOT REAL EVIDENCE.",
    },
    {
      q: "What does the tox card allow?",
      a: "Educational identity, specimen relevance, and interpretation considerations only. No synthesis, concealment, or poisoning instructions.",
    },
    {
      q: "Did the digital hash match?",
      a: "In the training pack, the SHA-256 of the synthetic empty payload matches the sealed expected value — a demonstration of integrity checking, not a real seizure.",
    },
  ],
  standardsWatch: [
    { body: "NIST", topic: "Digital evidence / measurement science", lastChecked: "Not live-polled yet", note: "Curated placeholder" },
    { body: "OSAC", topic: "Forensic science standards", lastChecked: "Not live-polled yet", note: "Curated placeholder" },
    { body: "NIJ", topic: "Forensic R&D / guidance", lastChecked: "Not live-polled yet", note: "Curated placeholder" },
  ],
} as const;
