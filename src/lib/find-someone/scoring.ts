/**
 * Find Someone — Confidence & Quality Scoring Utilities
 */

import type { ConfidenceStatus, SourceQualityTier, SOURCE_QUALITY_STARS } from "./types";

/** Map confidence percentage to human-readable status */
export function getConfidenceStatus(confidence: number): ConfidenceStatus {
  if (confidence >= 95) return "confirmed";
  if (confidence >= 80) return "high_confidence";
  if (confidence >= 60) return "likely";
  if (confidence >= 40) return "possible";
  return "unverified";
}

/** Map confidence status to display label */
export function getConfidenceLabel(status: ConfidenceStatus): string {
  const labels: Record<ConfidenceStatus, string> = {
    confirmed: "Confirmed by Source",
    high_confidence: "High Confidence",
    likely: "Likely",
    possible: "Possible",
    unverified: "Unverified",
    conflicting: "Conflicting",
  };
  return labels[status];
}

/** Map confidence to color token */
export function getConfidenceColor(confidence: number): string {
  if (confidence >= 80) return "#6EE7B7"; // success green
  if (confidence >= 50) return "#F6C85F"; // warning amber
  return "#FF7070"; // error red
}

/** Map confidence status to border/accent color */
export function getStatusColor(status: ConfidenceStatus): string {
  const colors: Record<ConfidenceStatus, string> = {
    confirmed: "#6EE7B7",
    high_confidence: "#62E6FF",
    likely: "#9B8CFF",
    possible: "#F6C85F",
    unverified: "#6B7280",
    conflicting: "#FF7070",
  };
  return colors[status];
}

/** Get star count for a source quality tier */
export function getSourceStars(tier: SourceQualityTier): number {
  const stars: Record<SourceQualityTier, number> = {
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
  return stars[tier];
}

/** Get display label for source quality tier */
export function getSourceQualityLabel(tier: SourceQualityTier): string {
  const labels: Record<SourceQualityTier, string> = {
    official: "Official Source",
    government: "Government Source",
    regulatory: "Regulatory Source",
    primary: "Primary Document",
    established: "Established Publisher",
    known: "Known Organization",
    secondary: "Secondary Website",
    unknown: "Unknown Site",
    unverified: "Unverified Source",
  };
  return labels[tier];
}

/** Detect query type from raw input string */
export function detectQueryType(
  raw: string,
): "person" | "username" | "domain" | "email" | "phone" | "company" | "general" {
  const trimmed = raw.trim();

  // Email
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return "email";

  // Phone (starts with + or contains mostly digits)
  if (/^\+?\d[\d\s\-()]{6,}$/.test(trimmed)) return "phone";

  // Domain (contains dot, no spaces, looks like a URL)
  if (/^(https?:\/\/)?[\w.-]+\.\w{2,}(\/.*)?$/.test(trimmed) && !trimmed.includes(" "))
    return "domain";

  // Username (starts with @, or single word with underscores/dots)
  if (/^@?\w[\w._-]{2,}$/.test(trimmed) && !trimmed.includes(" ")) return "username";

  // Company (contains Corp, Inc, Ltd, LLC, Pvt, etc.)
  if (/\b(corp|inc|ltd|llc|pvt|limited|company|technologies|solutions|group)\b/i.test(trimmed))
    return "company";

  // Default: person (contains spaces, looks like a name)
  if (/^[A-Za-z\s.'-]{2,}$/.test(trimmed) && trimmed.includes(" ")) return "person";

  return "general";
}

/** Format a timestamp for display */
export function formatTimestamp(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

/** Generate a deterministic ID from string */
export function generateId(prefix: string, seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return `${prefix}_${Math.abs(hash).toString(36)}`;
}
