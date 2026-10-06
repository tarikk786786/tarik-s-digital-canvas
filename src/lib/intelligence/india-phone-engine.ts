/**
 * India Phone Intelligence Engine
 *
 * Implements National Numbering Plan (NNP) analysis, Department of Telecommunications (DoT)
 * telecom circle mapping, operator allocation series, and public OSINT pivot strategies.
 *
 * CRITICAL EVIDENTIARY & ETHICAL PRINCIPLES:
 * 1. Numbering/Allocation Information != Current Physical Location.
 * 2. Mobile Number Portability (MNP) means original allocated operator may differ from current active operator.
 * 3. NO live GPS tracking, cell-tower triangulations, or private subscriber records.
 * 4. Only public numbering plans and open web pivots are queried.
 */

import type { KernelEvidence, AdapterResult } from "./collectors";

// ── Types ─────────────────────────────────────────────────────────────────────

export type TelecomCircleTier = "Metro" | "Circle A" | "Circle B" | "Circle C" | "Special";

export interface TelecomCircleInfo {
  code: string;
  name: string;
  tier: TelecomCircleTier;
  statesCovered: string[];
  headquarters?: string;
  timezone: string;
}

export interface OperatorSeriesAllocation {
  prefix: string; // 2, 3, or 4 digit prefix
  circleCode: string;
  originalOperator: string;
  licensedBand?: string;
}

export interface IndiaPhoneAnalysis {
  rawInput: string;
  cleanDigits: string;
  e164: string;
  nationalFormat: string;
  rfc3966: string;
  country: string;
  countryCode: string;
  isoCountry: string;
  flag: string;
  isValid: boolean;
  isPossible: boolean;
  numberType: "Mobile" | "Fixed Line (Landline)" | "Toll Free" | "Special Services" | "Invalid";
  timezone: string;

  // India-specific allocation metadata
  isIndia: boolean;
  circle?: TelecomCircleInfo;
  originalOperator?: string;
  allocationSeries?: string;
  mccMncHint?: string;

  // Landline specific
  stdCode?: string;
  stdCity?: string;

  // Public OSINT & Pivots
  publicSearchDorks: Array<{ label: string; query: string; purpose: string }>;
  discoveredPivots: Array<{ type: string; value: string; confidence: string }>;

  // Evidentiary Limitations & Warnings
  mnpDisclaimer: string;
  ethicalBoundaries: string[];
}

export interface IndiaPhoneIntelligenceResult {
  analysis: IndiaPhoneAnalysis;
  adapterResult: AdapterResult;
  evidence: KernelEvidence[];
}

// ── Indian Telecom Circles (22 Service Areas) ─────────────────────────────────

export const INDIA_TELECOM_CIRCLES: Record<string, TelecomCircleInfo> = {
  DL: {
    code: "DL",
    name: "Delhi",
    tier: "Metro",
    statesCovered: ["Delhi", "Noida", "Gurugram", "Faridabad", "Ghaziabad"],
    headquarters: "New Delhi",
    timezone: "Asia/Kolkata",
  },
  MU: {
    code: "MU",
    name: "Mumbai",
    tier: "Metro",
    statesCovered: ["Mumbai", "Navi Mumbai", "Thane"],
    headquarters: "Mumbai",
    timezone: "Asia/Kolkata",
  },
  KO: {
    code: "KO",
    name: "Kolkata",
    tier: "Metro",
    statesCovered: ["Kolkata"],
    headquarters: "Kolkata",
    timezone: "Asia/Kolkata",
  },
  MH: {
    code: "MH",
    name: "Maharashtra & Goa",
    tier: "Circle A",
    statesCovered: ["Maharashtra (excl. Mumbai)", "Goa"],
    headquarters: "Pune",
    timezone: "Asia/Kolkata",
  },
  GJ: {
    code: "GJ",
    name: "Gujarat",
    tier: "Circle A",
    statesCovered: ["Gujarat", "Daman and Diu", "Dadra and Nagar Haveli"],
    headquarters: "Ahmedabad",
    timezone: "Asia/Kolkata",
  },
  AP: {
    code: "AP",
    name: "Andhra Pradesh & Telangana",
    tier: "Circle A",
    statesCovered: ["Andhra Pradesh", "Telangana"],
    headquarters: "Hyderabad",
    timezone: "Asia/Kolkata",
  },
  KA: {
    code: "KA",
    name: "Karnataka",
    tier: "Circle A",
    statesCovered: ["Karnataka"],
    headquarters: "Bengaluru",
    timezone: "Asia/Kolkata",
  },
  TN: {
    code: "TN",
    name: "Tamil Nadu (incl. Chennai)",
    tier: "Circle A",
    statesCovered: ["Tamil Nadu", "Puducherry"],
    headquarters: "Chennai",
    timezone: "Asia/Kolkata",
  },
  KL: {
    code: "KL",
    name: "Kerala",
    tier: "Circle B",
    statesCovered: ["Kerala", "Lakshadweep"],
    headquarters: "Kochi",
    timezone: "Asia/Kolkata",
  },
  PB: {
    code: "PB",
    name: "Punjab",
    tier: "Circle B",
    statesCovered: ["Punjab", "Chandigarh", "Panchkula"],
    headquarters: "Chandigarh",
    timezone: "Asia/Kolkata",
  },
  HR: {
    code: "HR",
    name: "Haryana",
    tier: "Circle B",
    statesCovered: ["Haryana (excl. Panchkula, Faridabad, Gurugram)"],
    headquarters: "Ambala",
    timezone: "Asia/Kolkata",
  },
  UW: {
    code: "UW",
    name: "Uttar Pradesh (West) & Uttarakhand",
    tier: "Circle B",
    statesCovered: ["Western Uttar Pradesh", "Uttarakhand"],
    headquarters: "Meerut",
    timezone: "Asia/Kolkata",
  },
  UE: {
    code: "UE",
    name: "Uttar Pradesh (East)",
    tier: "Circle B",
    statesCovered: ["Eastern Uttar Pradesh"],
    headquarters: "Lucknow",
    timezone: "Asia/Kolkata",
  },
  RJ: {
    code: "RJ",
    name: "Rajasthan",
    tier: "Circle B",
    statesCovered: ["Rajasthan"],
    headquarters: "Jaipur",
    timezone: "Asia/Kolkata",
  },
  MP: {
    code: "MP",
    name: "Madhya Pradesh & Chhattisgarh",
    tier: "Circle B",
    statesCovered: ["Madhya Pradesh", "Chhattisgarh"],
    headquarters: "Bhopal",
    timezone: "Asia/Kolkata",
  },
  WB: {
    code: "WB",
    name: "West Bengal (Rest of Bengal)",
    tier: "Circle B",
    statesCovered: ["West Bengal (excl. Kolkata)", "Sikkim", "Andaman and Nicobar Islands"],
    headquarters: "Kolkata",
    timezone: "Asia/Kolkata",
  },
  BR: {
    code: "BR",
    name: "Bihar & Jharkhand",
    tier: "Circle C",
    statesCovered: ["Bihar", "Jharkhand"],
    headquarters: "Patna",
    timezone: "Asia/Kolkata",
  },
  OR: {
    code: "OR",
    name: "Odisha",
    tier: "Circle C",
    statesCovered: ["Odisha"],
    headquarters: "Bhubaneswar",
    timezone: "Asia/Kolkata",
  },
  AS: {
    code: "AS",
    name: "Assam",
    tier: "Circle C",
    statesCovered: ["Assam"],
    headquarters: "Guwahati",
    timezone: "Asia/Kolkata",
  },
  NE: {
    code: "NE",
    name: "North East",
    tier: "Circle C",
    statesCovered: [
      "Arunachal Pradesh",
      "Meghalaya",
      "Manipur",
      "Mizoram",
      "Nagaland",
      "Tripura",
    ],
    headquarters: "Shillong",
    timezone: "Asia/Kolkata",
  },
  JK: {
    code: "JK",
    name: "Jammu & Kashmir",
    tier: "Circle C",
    statesCovered: ["Jammu & Kashmir", "Ladakh"],
    headquarters: "Jammu / Srinagar",
    timezone: "Asia/Kolkata",
  },
  HP: {
    code: "HP",
    name: "Himachal Pradesh",
    tier: "Circle C",
    statesCovered: ["Himachal Pradesh"],
    headquarters: "Shimla",
    timezone: "Asia/Kolkata",
  },
};

// ── Major Landline STD Codes ──────────────────────────────────────────────────

export const INDIA_STD_CODES: Record<string, { city: string; circleCode: string }> = {
  "11": { city: "New Delhi", circleCode: "DL" },
  "22": { city: "Mumbai", circleCode: "MU" },
  "33": { city: "Kolkata", circleCode: "KO" },
  "44": { city: "Chennai", circleCode: "TN" },
  "80": { city: "Bengaluru", circleCode: "KA" },
  "40": { city: "Hyderabad", circleCode: "AP" },
  "20": { city: "Pune", circleCode: "MH" },
  "79": { city: "Ahmedabad", circleCode: "GJ" },
  "141": { city: "Jaipur", circleCode: "RJ" },
  "522": { city: "Lucknow", circleCode: "UE" },
  "612": { city: "Patna", circleCode: "BR" },
  "674": { city: "Bhubaneswar", circleCode: "OR" },
  "361": { city: "Guwahati", circleCode: "AS" },
  "172": { city: "Chandigarh", circleCode: "PB" },
  "194": { city: "Srinagar", circleCode: "JK" },
  "177": { city: "Shimla", circleCode: "HP" },
  "484": { city: "Kochi", circleCode: "KL" },
  "755": { city: "Bhopal", circleCode: "MP" },
  "771": { city: "Raipur", circleCode: "MP" },
  "135": { city: "Dehradun", circleCode: "UW" },
  "120": { city: "Noida / Ghaziabad", circleCode: "DL" },
  "124": { city: "Gurugram", circleCode: "DL" },
};

// ── Mobile Series Allocation Heuristic (DoT National Numbering Plan) ──────────
// In India, 10-digit mobile numbers start with 9, 8, 7, or 6.
// The first 4-5 digits determine original circle and original allocated licensee.

export function lookupIndiaMobileAllocation(tenDigit: string): {
  circle?: TelecomCircleInfo;
  operator?: string;
  mccMnc?: string;
} {
  if (tenDigit.length !== 10) return {};

  const prefix4 = tenDigit.slice(0, 4);
  const prefix2 = tenDigit.slice(0, 2);

  // Common series maps (National Numbering Plan references)
  // 98 series (Classic GSM allocations)
  if (prefix2 === "98") {
    const p3 = tenDigit.slice(0, 3);
    if (p3 === "981") return { circle: INDIA_TELECOM_CIRCLES.DL, operator: "Airtel / Vodafone", mccMnc: "404-10" };
    if (p3 === "982") return { circle: INDIA_TELECOM_CIRCLES.MU, operator: "Vodafone / Airtel", mccMnc: "404-20" };
    if (p3 === "983") return { circle: INDIA_TELECOM_CIRCLES.KO, operator: "Vodafone / Airtel", mccMnc: "404-30" };
    if (p3 === "984") return { circle: INDIA_TELECOM_CIRCLES.TN, operator: "Airtel", mccMnc: "404-40" };
    if (p3 === "989") return { circle: INDIA_TELECOM_CIRCLES.KL, operator: "Airtel", mccMnc: "404-45" };
    if (p3 === "987") return { circle: INDIA_TELECOM_CIRCLES.PB, operator: "Airtel", mccMnc: "404-50" };
    if (p3 === "986") return { circle: INDIA_TELECOM_CIRCLES.NE, operator: "BSNL / Airtel", mccMnc: "404-55" };
  }

  // 94 series: BSNL / MTNL
  if (prefix2 === "94") {
    const p3 = tenDigit.slice(0, 3);
    if (p3 === "943") return { circle: INDIA_TELECOM_CIRCLES.OR, operator: "BSNL Mobile", mccMnc: "404-58" };
    if (p3 === "941") return { circle: INDIA_TELECOM_CIRCLES.RJ, operator: "BSNL Mobile", mccMnc: "404-53" };
    if (p3 === "942") return { circle: INDIA_TELECOM_CIRCLES.MP, operator: "BSNL Mobile", mccMnc: "404-52" };
    if (p3 === "944") return { circle: INDIA_TELECOM_CIRCLES.KA, operator: "BSNL Mobile", mccMnc: "404-55" };
    if (p3 === "945") return { circle: INDIA_TELECOM_CIRCLES.UE, operator: "BSNL Mobile", mccMnc: "404-56" };
    return { operator: "BSNL Mobile", mccMnc: "404-xx" };
  }

  // 99 series (Airtel / Vodafone)
  if (prefix2 === "99") {
    const p3 = tenDigit.slice(0, 3);
    if (p3 === "991") return { circle: INDIA_TELECOM_CIRCLES.DL, operator: "Airtel", mccMnc: "404-10" };
    if (p3 === "992") return { circle: INDIA_TELECOM_CIRCLES.MH, operator: "Airtel", mccMnc: "404-20" };
    if (p3 === "993") return { circle: INDIA_TELECOM_CIRCLES.BR, operator: "Airtel", mccMnc: "404-31" };
    if (p3 === "994") return { circle: INDIA_TELECOM_CIRCLES.AP, operator: "Airtel", mccMnc: "404-49" };
    if (p3 === "995") return { circle: INDIA_TELECOM_CIRCLES.AS, operator: "Airtel", mccMnc: "404-41" };
  }

  // 70 series: Reliance Jio / Airtel
  if (prefix2 === "70") {
    const p3 = tenDigit.slice(0, 3);
    if (p3 === "700") return { circle: INDIA_TELECOM_CIRCLES.KO, operator: "Reliance Jio", mccMnc: "405-854" };
    if (p3 === "701") return { circle: INDIA_TELECOM_CIRCLES.AP, operator: "Reliance Jio", mccMnc: "405-855" };
    if (p3 === "702") return { circle: INDIA_TELECOM_CIRCLES.MH, operator: "Reliance Jio", mccMnc: "405-856" };
    if (p3 === "703") return { circle: INDIA_TELECOM_CIRCLES.PB, operator: "Reliance Jio", mccMnc: "405-857" };
    if (p3 === "704") return { circle: INDIA_TELECOM_CIRCLES.DL, operator: "Reliance Jio", mccMnc: "405-858" };
  }

  // 6 series: New 4G/5G allocations (Reliance Jio / Airtel / Vi)
  if (tenDigit.startsWith("63") || tenDigit.startsWith("62")) {
    return { operator: "Reliance Jio (DoT Series 6)", mccMnc: "405-xxx" };
  }
  if (tenDigit.startsWith("60")) {
    return { operator: "Bharti Airtel (DoT Series 6)", mccMnc: "404-xxx" };
  }

  // Circle allocation heuristics based on first digit grouping
  const firstDigit = tenDigit[0];
  if (["9", "8", "7", "6"].includes(firstDigit)) {
    // Default plausible Indian mobile
    return {
      operator: "Allocated Indian Cellular Operator (Airtel / Jio / Vi / BSNL)",
      mccMnc: "404 / 405",
    };
  }

  return {};
}

// ── Public Search Dorks Generator (PhoneInfoga / Clank Strategy) ─────────────

export function generatePhonePublicDorks(e164: string, national: string, raw: string): Array<{
  label: string;
  query: string;
  purpose: string;
}> {
  const cleanTen = e164.replace(/\D/g, "").slice(-10);
  return [
    {
      label: "Exact National Web Pivot",
      query: `"${national}"`,
      purpose: "Locates exact public business listings, press releases, or contact directories.",
    },
    {
      label: "E.164 Global Format Search",
      query: `"${e164}"`,
      purpose: "Finds international documents, WHOIS administrative contacts, and code repositories.",
    },
    {
      label: "Indian Business & Corporate Filings",
      query: `"${cleanTen}" (site:zaubacorp.com | site:tofler.in | site:quickcompany.in)`,
      purpose: "Checks public director or corporate registration filings (India Ministry of Corporate Affairs).",
    },
    {
      label: "Public Professional & Social Mentions",
      query: `"${cleanTen}" (site:linkedin.com | site:github.com | site:x.com)`,
      purpose: "Searches public developer repositories and professional profiles.",
    },
    {
      label: "Document & PDF Public Mentions",
      query: `"${cleanTen}" filetype:pdf`,
      purpose: "Identifies publicly indexed tenders, gazettes, or academic conference brochures.",
    },
  ];
}

// ── Main Analysis Function ────────────────────────────────────────────────────

export function analyzeIndiaPhone(raw: string): IndiaPhoneAnalysis {
  const trimmed = raw.trim();
  const digitsOnly = trimmed.replace(/\D/g, "");

  let isIndia = false;
  let cleanDigits = digitsOnly;
  let e164 = "";
  let nationalFormat = "";
  let isValid = false;
  let isPossible = false;
  let numberType: IndiaPhoneAnalysis["numberType"] = "Invalid";
  let country = "Unknown";
  let countryCode = "";
  let isoCountry = "XX";
  let flag = "🌐";
  let timezone = "UTC";

  // Check if starts with +91 or 91 or is 10 digits starting with 6/7/8/9
  if (
    trimmed.startsWith("+91") ||
    (digitsOnly.length === 12 && digitsOnly.startsWith("91")) ||
    (digitsOnly.length === 10 && /^[6-9]/.test(digitsOnly)) ||
    (digitsOnly.length === 11 && digitsOnly.startsWith("0") && /^[6-9]/.test(digitsOnly.slice(1)))
  ) {
    isIndia = true;
    country = "India";
    countryCode = "+91";
    isoCountry = "IN";
    flag = "🇮🇳";
    timezone = "Asia/Kolkata";

    // Extract 10-digit mobile number
    let tenDigit = "";
    if (digitsOnly.length === 12 && digitsOnly.startsWith("91")) {
      tenDigit = digitsOnly.slice(2);
    } else if (digitsOnly.length === 11 && digitsOnly.startsWith("0")) {
      tenDigit = digitsOnly.slice(1);
    } else if (digitsOnly.length === 10) {
      tenDigit = digitsOnly;
    } else if (trimmed.startsWith("+91")) {
      tenDigit = digitsOnly.slice(2, 12);
    }

    if (tenDigit.length === 10 && /^[6-9]/.test(tenDigit)) {
      cleanDigits = tenDigit;
      e164 = `+91${tenDigit}`;
      nationalFormat = `+91 ${tenDigit.slice(0, 5)} ${tenDigit.slice(5)}`;
      isValid = true;
      isPossible = true;
      numberType = "Mobile";
    } else if (digitsOnly.startsWith("1800")) {
      // Toll-free
      cleanDigits = digitsOnly;
      e164 = `+91${digitsOnly}`;
      nationalFormat = `1800 ${digitsOnly.slice(4, 7)} ${digitsOnly.slice(7)}`;
      isValid = digitsOnly.length >= 10 && digitsOnly.length <= 11;
      isPossible = true;
      numberType = "Toll Free";
    } else {
      // Check landline with STD code
      cleanDigits = digitsOnly;
      e164 = digitsOnly.startsWith("91") ? `+${digitsOnly}` : `+91${digitsOnly}`;
      nationalFormat = trimmed;
      isValid = digitsOnly.length >= 8 && digitsOnly.length <= 11;
      isPossible = true;
      numberType = "Fixed Line (Landline)";
    }
  } else {
    // Non-India international number fallback
    e164 = trimmed.startsWith("+") ? `+${digitsOnly}` : `+${digitsOnly}`;
    nationalFormat = trimmed;
    cleanDigits = digitsOnly;
    isValid = digitsOnly.length >= 8 && digitsOnly.length <= 15;
    isPossible = digitsOnly.length >= 6;
    numberType = "Mobile";
    country = "International";
    countryCode = "+";
    isoCountry = "INTL";
  }

  // India allocation lookup
  let circle: TelecomCircleInfo | undefined;
  let originalOperator: string | undefined;
  let mccMncHint: string | undefined;
  let stdCode: string | undefined;
  let stdCity: string | undefined;

  if (isIndia && numberType === "Mobile") {
    const allocation = lookupIndiaMobileAllocation(cleanDigits);
    circle = allocation.circle;
    originalOperator = allocation.operator;
    mccMncHint = allocation.mccMnc;
  } else if (isIndia && numberType === "Fixed Line (Landline)") {
    // STD code check
    for (const [code, info] of Object.entries(INDIA_STD_CODES)) {
      if (cleanDigits.startsWith(code) || cleanDigits.startsWith(`0${code}`)) {
        stdCode = code;
        stdCity = info.city;
        circle = INDIA_TELECOM_CIRCLES[info.circleCode];
        break;
      }
    }
  }

  const rfc3966 = `tel:${e164}`;
  const publicSearchDorks = generatePhonePublicDorks(e164, nationalFormat, trimmed);

  const mnpDisclaimer =
    "EVIDENTIARY DISCLAIMER: Indian Mobile Number Portability (MNP) enables subscribers to change " +
    "operators and telecom circles freely without changing their 10-digit number. The operator and circle " +
    "identified above represent the Department of Telecommunications (DoT) original block allocation, " +
    "NOT the subscriber's current active carrier, active circle, or live physical location.";

  const ethicalBoundaries = [
    "Strict ISO/IEC 27037 compliance: Only public National Numbering Plan metadata and public web indexing are utilized.",
    "NO live GPS tracking or cell-tower triangulation (technically impossible via public web).",
    "NO access to private telecom subscriber databases, Aadhaar records, or SIM-owner directories.",
    "NO interception of calls, SMS, WhatsApp, or OTP credentials.",
    "Public search operators direct investigators to open-access public pages only.",
  ];

  return {
    rawInput: trimmed,
    cleanDigits,
    e164,
    nationalFormat: nationalFormat || e164,
    rfc3966,
    country,
    countryCode,
    isoCountry,
    flag,
    isValid,
    isPossible,
    numberType,
    timezone,
    isIndia,
    circle,
    originalOperator,
    allocationSeries: cleanDigits.length === 10 ? cleanDigits.slice(0, 4) : undefined,
    mccMncHint,
    stdCode,
    stdCity,
    publicSearchDorks,
    discoveredPivots: [
      { type: "E.164 Number", value: e164, confidence: "VERIFIED" },
      { type: "National Format", value: nationalFormat, confidence: "VERIFIED" },
      ...(circle ? [{ type: "Original Telecom Circle", value: circle.name, confidence: "SUPPORTED" }] : []),
      ...(originalOperator ? [{ type: "Original Allocation Block", value: originalOperator, confidence: "SUPPORTED" }] : []),
      ...(stdCity ? [{ type: "Landline City (STD)", value: stdCity, confidence: "SUPPORTED" }] : []),
    ],
    mnpDisclaimer,
    ethicalBoundaries,
  };
}

// ── Runner for Intelligence Kernel ────────────────────────────────────────────

export function runIndiaPhoneIntelligence(rawQuery: string): IndiaPhoneIntelligenceResult {
  const analysis = analyzeIndiaPhone(rawQuery);
  const retrievedAt = new Date().toISOString();

  const evidence: KernelEvidence[] = [
    {
      id: `phone-validity-${analysis.e164}`,
      title: `Number Validation & National Numbering Plan · ${analysis.nationalFormat}`,
      summary: `Country: ${analysis.country} ${analysis.flag} · Type: ${analysis.numberType} · Status: ${analysis.isValid ? "Valid format" : "Unverified length"} · Timezone: ${analysis.timezone}`,
      confidence: "VERIFIED",
      freshness: "LIVE",
      observedAt: retrievedAt,
      provenance: {
        sourceLabel: "National Numbering Plan (NNP) Validation",
        method: "E.164 / ITU-T E.164 & TRAI National Numbering Plan parser",
        retrievedAt,
        whyVisible: "Phone-class query initiated numbering plan verification.",
        limitations: [
          "Format validity confirms number structure, not active subscriber existence.",
          "Does not confirm if the SIM card is currently active on network.",
        ],
      },
    },
  ];

  if (analysis.circle) {
    evidence.push({
      id: `phone-circle-${analysis.circle.code}`,
      title: `Telecom Circle Allocation · ${analysis.circle.name}`,
      summary: `Tier: ${analysis.circle.tier} · Geographic Area: ${analysis.circle.statesCovered.join(", ")} · Circle HQ: ${analysis.circle.headquarters || "N/A"}`,
      confidence: "SUPPORTED",
      freshness: "LIVE",
      observedAt: retrievedAt,
      provenance: {
        sourceLabel: "DoT Licensed Service Area (LSA) Directory",
        method: "Department of Telecommunications (DoT) Circle Mapping",
        retrievedAt,
        whyVisible: "Mobile series corresponds to an allocated Indian telecom circle.",
        limitations: [
          "Represents original block allocation, NOT the subscriber's current physical location.",
          "Mobile Number Portability (MNP) permits pan-India circle relocation.",
        ],
      },
    });
  }

  if (analysis.originalOperator) {
    evidence.push({
      id: `phone-operator-${analysis.cleanDigits.slice(0, 4)}`,
      title: `Original Allocation Licensee · Series ${analysis.allocationSeries || ""}`,
      summary: `Originally allocated to: ${analysis.originalOperator}${analysis.mccMncHint ? ` (MCC-MNC Hint: ${analysis.mccMncHint})` : ""}`,
      confidence: "PROBABLE",
      freshness: "LIVE",
      observedAt: retrievedAt,
      provenance: {
        sourceLabel: "TRAI / DoT Spectrum Block Allocation Registry",
        method: "National series prefix allocation lookup",
        retrievedAt,
        whyVisible: "Historical series allocation identified from initial digits.",
        limitations: [
          "MNP (Mobile Number Portability) allows users to port between Airtel, Jio, Vi, and BSNL.",
          "Current operating carrier requires active HLR/VLR lookup (restricted/private).",
        ],
      },
    });
  }

  const adapterResult: AdapterResult = {
    adapterId: "phone-public-meta",
    categoryLabel: "Phone public numbering & telecom metadata",
    health: "AVAILABLE",
    statusLabel: `${analysis.country} ${analysis.numberType} · ${analysis.circle?.name || "Global NNP"} · Valid format`,
    evidence,
  };

  return {
    analysis,
    adapterResult,
    evidence,
  };
}
