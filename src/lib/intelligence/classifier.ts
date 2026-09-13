/**
 * Information Kernel — query classifier.
 * Visitors never pick engines by name; the kernel routes silently.
 */

export type QueryClass =
  | "PERSON"
  | "USERNAME"
  | "EMAIL"
  | "PHONE"
  | "COMPANY"
  | "DOMAIN"
  | "URL"
  | "IP"
  | "LOCATION"
  | "DOCUMENT"
  | "MIXED"
  | "NL";

export interface Classification {
  primary: QueryClass;
  chips: QueryClass[];
  normalized: string;
}

export function classifyQuery(raw: string): Classification {
  const q = raw.trim();
  const chips: QueryClass[] = [];

  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(q)) chips.push("EMAIL");
  if (/^\+?\d[\d\s\-()]{7,}$/.test(q)) chips.push("PHONE");
  if (/^(\d{1,3}\.){3}\d{1,3}$/.test(q)) chips.push("IP");
  if (/^https?:\/\//i.test(q)) chips.push("URL");
  else if (/^(?:[a-z0-9-]+\.)+[a-z]{2,}(?:\/\S*)?$/i.test(q) && !q.includes(" "))
    chips.push("DOMAIN");
  if (/^@?[a-z0-9._-]{3,}$/i.test(q) && !q.includes(" ") && !chips.includes("DOMAIN"))
    chips.push("USERNAME");
  if (/\b(pvt|ltd|llc|inc|corp|company|technologies|solutions)\b/i.test(q))
    chips.push("COMPANY");
  if (/\b(pdf|docx?|xlsx?|passport|aadhaar|invoice)\b/i.test(q)) chips.push("DOCUMENT");
  if (/\b(in|at|near|district|odisha|delhi|mumbai|bengaluru)\b/i.test(q))
    chips.push("LOCATION");
  if (/^[A-Za-z][A-Za-z.'\-\s]{2,}$/.test(q) && q.includes(" ") && chips.length === 0)
    chips.push("PERSON");

  if (chips.length === 0) chips.push("NL");
  if (chips.length > 1) {
    return { primary: "MIXED", chips: ["MIXED", ...chips], normalized: q };
  }
  return { primary: chips[0], chips, normalized: q };
}

export const PLANNER_PHASES = [
  "UNDERSTANDING",
  "COLLECTING",
  "CORRELATING",
  "VERIFYING",
] as const;

export type PlannerPhase = (typeof PLANNER_PHASES)[number];
