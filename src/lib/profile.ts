// Verified profile facts. Anything not listed here must be marked
// `pending` and hidden from production until confirmed by the owner.

export const PROFILE = {
  name: "Tarik Islam",
  primaryRole: "Founder & CEO, Dezo.in",
  identity: "Forensic scientist building secure AI products.",
  headline:
    "Investigating evidence. Engineering intelligence. Building secure digital futures.",
  supporting:
    "I combine forensic reasoning, cybersecurity principles, artificial intelligence, automation, and software engineering to build secure products and solve complex real-world problems.",
  location: "India",
  timezone: "UTC+05:30",
  availability: "Available for selected collaborations",
  focus: "AI · Forensics · Product",
} as const;

export type VerificationStatus =
  | "verified"
  | "self-reported"
  | "academic"
  | "prototype"
  | "in-development"
  | "private"
  | "pending"
  | "archived"
  | "hidden";

// Production guard — unverified sections render a pending panel instead of
// fabricated content.
export const SHOW_UNVERIFIED = false;
