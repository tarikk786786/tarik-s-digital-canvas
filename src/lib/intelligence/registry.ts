/**
 * Internal Information Kernel source registry.
 * Never render as a public tool catalogue — category + health only in visitor chrome.
 */

import type { SystemHealth } from "@/lib/kernel/model";

export interface KernelSourceEntry {
  id: string;
  /** Visitor-facing category label */
  categoryLabel: string;
  health: SystemHealth;
  detail: string;
  /** Engineering-only — never show in visitor chrome */
  internalNote?: string;
}

export const KERNEL_SOURCE_REGISTRY: KernelSourceEntry[] = [
  {
    id: "dns",
    categoryLabel: "Public DNS resolution",
    health: "ONLINE",
    detail: "DNS-over-HTTPS A/AAAA/MX/TXT queries",
  },
  {
    id: "rdap",
    categoryLabel: "Domain registration directory",
    health: "ONLINE",
    detail: "RDAP domain object lookup",
  },
  {
    id: "ct-logs",
    categoryLabel: "Certificate transparency",
    health: "ONLINE",
    detail: "Public CT hostname extraction",
  },
  {
    id: "archive",
    categoryLabel: "Public web archive index",
    health: "ONLINE",
    detail: "Historical capture index",
  },
  {
    id: "ip-asn",
    categoryLabel: "IP / network metadata",
    health: "ONLINE",
    detail: "Public IP geolocation & ASN (best-effort)",
  },
  {
    id: "geocode",
    categoryLabel: "Place / location lookup",
    health: "ONLINE",
    detail: "Open geocoding for place-class queries",
  },
  {
    id: "india-company",
    categoryLabel: "India corporate records",
    health: "AUTH_DEPENDENT",
    detail: "Official portals require interactive/authenticated access",
  },
  {
    id: "username-presence",
    categoryLabel: "Username presence checks",
    health: "AUTH_DEPENDENT",
    detail: "Hosted worker not connected — no invented profile hits",
  },
  {
    id: "phone-public-meta",
    categoryLabel: "Phone public metadata",
    health: "ONLINE",
    detail: "Local E.164 / dial-code format only — never subscriber identity",
  },
  {
    id: "academic-pubs",
    categoryLabel: "Open-access scientific publications",
    health: "ONLINE",
    detail: "Crossref and open scholarly repositories for academic/author queries",
  },
  {
    id: "email-identity",
    categoryLabel: "Email identity / breach checks",
    health: "AUTH_DEPENDENT",
    detail: "Mailbox ownership and breach corpora need provisioned workers",
  },
  // ── Person Intelligence Engine sources ─────────────────────────────────────
  {
    id: "github-user",
    categoryLabel: "Developer profile & repository intelligence",
    health: "ONLINE",
    detail: "GitHub public REST API — user profile, repos, organizations",
    internalNote: "60 req/hr unauthenticated; increase with token in env",
  },
  {
    id: "openalex-author",
    categoryLabel: "Open scholarly index — authors & works",
    health: "ONLINE",
    detail: "OpenAlex open scholarly graph — author search",
    internalNote: "No API key required for polite pool (mailto param)",
  },
  {
    id: "semantic-scholar-author",
    categoryLabel: "AI-indexed research publications",
    health: "ONLINE",
    detail: "Semantic Scholar Graph API — author search",
    internalNote: "100 req/5min unauthenticated",
  },
  {
    id: "orcid-author",
    categoryLabel: "Researcher ORCID profile",
    health: "ONLINE",
    detail: "ORCID Public API — researcher profile search",
    internalNote: "Rate limit: reasonable public access",
  },
  {
    id: "wikipedia-summary",
    categoryLabel: "Public encyclopedia entry",
    health: "ONLINE",
    detail: "Wikipedia REST API — page summary endpoint",
    internalNote: "Notable individuals only; disambiguation returned as UNCERTAIN",
  },
  {
    id: "wikidata-entity",
    categoryLabel: "Structured public knowledge entities",
    health: "ONLINE",
    detail: "Wikidata entity search API",
    internalNote: "Community-maintained; requires source attribution",
  },
  {
    id: "reddit-profile",
    categoryLabel: "Public Reddit profile",
    health: "ONLINE",
    detail: "Reddit public JSON API — user about endpoint",
    internalNote: "Public profile data only; no DMs or private subreddits",
  },
];

export function getKernelRegistryPublic() {
  return KERNEL_SOURCE_REGISTRY.map(({ id, categoryLabel, health, detail }) => ({
    id,
    categoryLabel,
    health,
    detail,
  }));
}
