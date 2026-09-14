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
    health: "AUTH_DEPENDENT",
    detail: "Format/country only planned — no subscriber identity",
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
