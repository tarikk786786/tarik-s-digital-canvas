// Server function: approximate location from Cloudflare request headers.
// No IP is stored, logged, or returned. Country/region only.

import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";

// Minimal ISO-3166 → English name map for the countries we care to greet by
// name. Unknown codes fall through to the code itself; UI hides unknowns.
const COUNTRY_NAMES: Record<string, string> = {
  IN: "India",
  BD: "Bangladesh",
  US: "the United States",
  GB: "the United Kingdom",
  CA: "Canada",
  AU: "Australia",
  DE: "Germany",
  FR: "France",
  NL: "the Netherlands",
  AE: "the UAE",
  SG: "Singapore",
  JP: "Japan",
  BR: "Brazil",
  ZA: "South Africa",
  PK: "Pakistan",
  NP: "Nepal",
  LK: "Sri Lanka",
  ID: "Indonesia",
  PH: "the Philippines",
  MY: "Malaysia",
  SA: "Saudi Arabia",
  QA: "Qatar",
  KW: "Kuwait",
  IE: "Ireland",
  ES: "Spain",
  IT: "Italy",
  SE: "Sweden",
  NO: "Norway",
  FI: "Finland",
  DK: "Denmark",
  CH: "Switzerland",
  PL: "Poland",
};

export interface ApproxGeo {
  country: string | null;
  countryName: string | null;
  region: string | null;
  city: string | null;
  approximate: true;
}

export const getApproxGeo = createServerFn({ method: "GET" }).handler(
  async (): Promise<ApproxGeo> => {
    // Cloudflare Workers inject these on every request.
    const country =
      getRequestHeader("cf-ipcountry") ??
      getRequestHeader("x-vercel-ip-country") ??
      null;
    const region =
      getRequestHeader("cf-region") ??
      getRequestHeader("x-vercel-ip-country-region") ??
      null;
    const city =
      getRequestHeader("cf-ipcity") ??
      getRequestHeader("x-vercel-ip-city") ??
      null;

    const cc = country && country !== "XX" && country !== "T1" ? country.toUpperCase() : null;

    return {
      country: cc,
      countryName: cc ? COUNTRY_NAMES[cc] ?? null : null,
      region: region || null,
      city: city || null,
      approximate: true,
    };
  },
);
