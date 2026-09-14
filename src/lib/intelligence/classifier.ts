/**
 * Information Kernel — query classifier + investigation plan.
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

/** Visitor-facing plan step — category labels only, never adapter brands. */
export interface InvestigationPlanStep {
  id: string;
  categoryLabel: string;
  mode: "LIVE" | "AUTH_DEPENDENT" | "SKIP";
  reason: string;
}

export interface InvestigationPlan {
  steps: InvestigationPlanStep[];
  summary: string;
}

const PLACE_HINT =
  /\b(in|at|near|district|odisha|delhi|mumbai|bengaluru|bangalore|chennai|kolkata|hyderabad|pune|jaipur|lucknow|ahmedabad|kochi|india|london|paris|tokyo|singapore|dubai|new\s+york|san\s+francisco)\b/i;

const STANDALONE_PLACE =
  /^(delhi|mumbai|bengaluru|bangalore|chennai|kolkata|hyderabad|pune|jaipur|lucknow|ahmedabad|kochi|odisha|india)$/i;

export function classifyQuery(raw: string): Classification {
  const q = raw.trim();
  const chips: QueryClass[] = [];

  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(q)) chips.push("EMAIL");
  if (/^\+?\d[\d\s\-()]{7,}$/.test(q)) chips.push("PHONE");
  if (/^(\d{1,3}\.){3}\d{1,3}$/.test(q)) chips.push("IP");
  if (/^https?:\/\//i.test(q)) chips.push("URL");
  else if (/^(?:[a-z0-9-]+\.)+[a-z]{2,}(?:\/\S*)?$/i.test(q) && !q.includes(" "))
    chips.push("DOMAIN");
  // Prefer place over bare username when both match (e.g. "Mumbai"); never tag IPs as usernames
  if (
    /^@?[a-z0-9._-]{3,}$/i.test(q) &&
    !q.includes(" ") &&
    !chips.includes("DOMAIN") &&
    !chips.includes("IP") &&
    !chips.includes("EMAIL") &&
    !chips.includes("PHONE")
  ) {
    const looksLikePlace = PLACE_HINT.test(q) || STANDALONE_PLACE.test(q);
    if (!looksLikePlace) chips.push("USERNAME");
  }
  if (/\b(pvt|ltd|llc|inc|corp|company|technologies|solutions)\b/i.test(q))
    chips.push("COMPANY");
  if (/\b(pdf|docx?|xlsx?|passport|aadhaar|invoice)\b/i.test(q)) chips.push("DOCUMENT");
  if (PLACE_HINT.test(q) || STANDALONE_PLACE.test(q)) chips.push("LOCATION");
  if (/^[A-Za-z][A-Za-z.'\-\s]{2,}$/.test(q) && q.includes(" ") && chips.length === 0)
    chips.push("PERSON");

  if (chips.length === 0) chips.push("NL");
  if (chips.length > 1) {
    return { primary: "MIXED", chips: ["MIXED", ...chips], normalized: q };
  }
  return { primary: chips[0], chips, normalized: q };
}

function hasDomainSignal(c: Classification): boolean {
  if (c.chips.some((x) => x === "DOMAIN" || x === "URL")) return true;
  const host = c.normalized.replace(/^https?:\/\//i, "").split(/[/?#]/)[0];
  return /^(?:[a-z0-9-]+\.)+[a-z]{2,}$/i.test(host);
}

export function extractMailHost(raw: string): string | null {
  const m = raw.trim().match(/^[^\s@]+@([^\s@]+\.[^\s@]+)$/);
  return m ? m[1].toLowerCase() : null;
}

/**
 * Build the investigation plan from classification.
 * LIVE steps map to public HTTP collectors; AUTH_DEPENDENT stay honest stubs.
 */
export function buildInvestigationPlan(classification: Classification): InvestigationPlan {
  const chips = new Set(classification.chips);
  const steps: InvestigationPlanStep[] = [];
  const mailHost = chips.has("EMAIL") ? extractMailHost(classification.normalized) : null;

  const domainLike =
    hasDomainSignal(classification) ||
    /^(?:[a-z0-9-]+\.)+[a-z]{2,}/i.test(
      classification.normalized.replace(/^https?:\/\//i, "").split(/[/?#]/)[0],
    );

  if (domainLike) {
    steps.push(
      {
        id: "dns",
        categoryLabel: "Public DNS resolution",
        mode: "LIVE",
        reason: "Domain / URL class activates public DNS collection.",
      },
      {
        id: "rdap",
        categoryLabel: "Domain registration directory",
        mode: "LIVE",
        reason: "Registration metadata for the extracted host.",
      },
      {
        id: "ct-logs",
        categoryLabel: "Certificate transparency",
        mode: "LIVE",
        reason: "Public TLS hostnames logged for this domain.",
      },
      {
        id: "archive",
        categoryLabel: "Public web archive index",
        mode: "LIVE",
        reason: "Historical public captures for timeline support.",
      },
    );
  } else if (mailHost) {
    // Email → public mail-host DNS/RDAP only (never mailbox contents / breach invention)
    steps.push(
      {
        id: "dns",
        categoryLabel: "Public DNS resolution",
        mode: "LIVE",
        reason: "Email class activates MX/TXT DNS for the mail host only.",
      },
      {
        id: "rdap",
        categoryLabel: "Domain registration directory",
        mode: "LIVE",
        reason: "Registration metadata for the mail host domain.",
      },
    );
  }

  if (chips.has("IP")) {
    steps.push({
      id: "ip-asn",
      categoryLabel: "IP / network metadata",
      mode: "LIVE",
      reason: "IP-class query activates public network metadata.",
    });
  }

  if (chips.has("LOCATION") && !domainLike && !chips.has("IP") && !mailHost) {
    steps.push({
      id: "geocode",
      categoryLabel: "Place / location lookup",
      mode: "LIVE",
      reason: "Location-class query activates open place directory search.",
    });
  }

  if (chips.has("PHONE")) {
    steps.push({
      id: "phone-public-meta",
      categoryLabel: "Phone public metadata",
      mode: "LIVE",
      reason: "Local E.164 / dial-code format only — never subscriber identity.",
    });
  }

  // Always surface honest non-live workers so chrome never invents hits
  steps.push(
    {
      id: "india-company",
      categoryLabel: "India corporate records",
      mode: "AUTH_DEPENDENT",
      reason: "Official portals need interactive / authenticated access — not fabricated.",
    },
    {
      id: "username-presence",
      categoryLabel: "Username presence checks",
      mode: chips.has("USERNAME") || chips.has("PERSON") ? "AUTH_DEPENDENT" : "SKIP",
      reason: "Hosted presence worker not connected — no invented profile hits.",
    },
    {
      id: "email-identity",
      categoryLabel: "Email identity / breach checks",
      mode: chips.has("EMAIL") ? "AUTH_DEPENDENT" : "SKIP",
      reason: "Mailbox ownership and breach corpora need provisioned workers — not invented.",
    },
  );

  const live = steps.filter((s) => s.mode === "LIVE").length;
  const auth = steps.filter((s) => s.mode === "AUTH_DEPENDENT").length;
  const summary =
    live > 0
      ? `Plan: ${live} live public collector(s), ${auth} AUTH_DEPENDENT worker(s).`
      : `Plan: no live public collectors for this class — ${auth} AUTH_DEPENDENT worker(s) only.`;

  return { steps: steps.filter((s) => s.mode !== "SKIP"), summary };
}

export const PLANNER_PHASES = [
  "UNDERSTANDING",
  "COLLECTING",
  "CORRELATING",
  "VERIFYING",
] as const;

export type PlannerPhase = (typeof PLANNER_PHASES)[number];
