// Personalization engine. Consent-gated. Pure client.
// Reads saved intent + returning flag and returns a reordering
// hint for homepage sections. Never changes factual claims — only
// which section leads.

import { getConsent } from "./consent";
import { getSavedPath, type VisitorPath } from "./visitor-context";

export type SectionId =
  | "projects"
  | "capabilities"
  | "forensic"
  | "skills"
  | "tech-certs"
  | "dezo"
  | "contact";

const DEFAULT_ORDER: SectionId[] = [
  "projects",
  "capabilities",
  "forensic",
  "skills",
  "tech-certs",
  "dezo",
  "contact",
];

const INTENT_PRIORITY: Record<VisitorPath, SectionId[]> = {
  hiring: ["skills", "tech-certs", "projects", "capabilities", "forensic", "dezo", "contact"],
  product: ["projects", "dezo", "capabilities", "skills", "tech-certs", "forensic", "contact"],
  ai: ["projects", "capabilities", "skills", "tech-certs", "dezo", "forensic", "contact"],
  automation: ["projects", "capabilities", "skills", "dezo", "tech-certs", "forensic", "contact"],
  cyber: ["tech-certs", "capabilities", "skills", "projects", "forensic", "dezo", "contact"],
  forensics: ["forensic", "capabilities", "skills", "projects", "tech-certs", "dezo", "contact"],
  dezo: ["dezo", "projects", "capabilities", "skills", "tech-certs", "forensic", "contact"],
  collaborate: ["projects", "dezo", "capabilities", "skills", "forensic", "tech-certs", "contact"],
  exploring: DEFAULT_ORDER,
};

export interface Personalization {
  order: SectionId[];
  leadIntent: VisitorPath | null;
  personalized: boolean;
}

export function getPersonalization(): Personalization {
  if (typeof window === "undefined") {
    return { order: DEFAULT_ORDER, leadIntent: null, personalized: false };
  }
  const consent = getConsent();
  if (!consent.personalization) {
    return { order: DEFAULT_ORDER, leadIntent: null, personalized: false };
  }
  const intent = getSavedPath();
  if (!intent) {
    return { order: DEFAULT_ORDER, leadIntent: null, personalized: false };
  }
  return {
    order: INTENT_PRIORITY[intent] ?? DEFAULT_ORDER,
    leadIntent: intent,
    personalized: true,
  };
}

export function clearPersonalizationState() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem("ti.path.v1");
  } catch {
    // ignore
  }
}
