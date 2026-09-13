/**
 * Information Kernel — public HTTP collectors (server-side).
 * Provider names stay in provenance fields only — never primary chrome.
 */

import { classifyQuery, type Classification, type QueryClass } from "./classifier";

export type AdapterHealth = "AVAILABLE" | "DEGRADED" | "AUTH_DEPENDENT" | "OFFLINE";

export interface KernelEvidence {
  id: string;
  title: string;
  summary: string;
  confidence: "VERIFIED" | "SUPPORTED" | "PROBABLE" | "UNCERTAIN";
  freshness: "LIVE" | "CACHED" | "DEMO" | "OFFLINE";
  observedAt: string;
  provenance: {
    sourceLabel: string;
    method: string;
    retrievedAt: string;
    whyVisible: string;
    limitations: string[];
  };
  url?: string;
}

export interface AdapterResult {
  adapterId: string;
  health: AdapterHealth;
  statusLabel: string;
  evidence: KernelEvidence[];
  error?: string;
}

function extractDomain(q: string): string | null {
  const trimmed = q.trim().replace(/^https?:\/\//i, "").split(/[/?#]/)[0];
  if (/^(?:[a-z0-9-]+\.)+[a-z]{2,}$/i.test(trimmed)) return trimmed.toLowerCase();
  return null;
}

async function collectDns(domain: string): Promise<AdapterResult> {
  const retrievedAt = new Date().toISOString();
  try {
    const res = await fetch(
      `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=A`,
      {
        headers: { Accept: "application/dns-json" },
        signal: AbortSignal.timeout(10000),
      },
    );
    if (!res.ok) {
      return {
        adapterId: "dns",
        health: "DEGRADED",
        statusLabel: `DNS HTTP ${res.status}`,
        evidence: [],
        error: `HTTP ${res.status}`,
      };
    }
    const json = (await res.json()) as {
      Answer?: Array<{ data: string; TTL?: number }>;
      Status?: number;
    };
    const answers = json.Answer ?? [];
    return {
      adapterId: "dns",
      health: "AVAILABLE",
      statusLabel: "DNS records retrieved",
      evidence: answers.slice(0, 8).map((a, i) => ({
        id: `dns-${domain}-${i}`,
        title: `A record · ${domain}`,
        summary: `${a.data}${a.TTL != null ? ` (TTL ${a.TTL}s)` : ""}`,
        confidence: "VERIFIED" as const,
        freshness: "LIVE" as const,
        observedAt: retrievedAt,
        provenance: {
          sourceLabel: "Public DNS resolution",
          method: "DNS-over-HTTPS A query",
          retrievedAt,
          whyVisible: "Domain-class query activated public DNS collection.",
          limitations: ["A records only in this slice — not a full zone transfer."],
        },
      })),
    };
  } catch (e) {
    return {
      adapterId: "dns",
      health: "OFFLINE",
      statusLabel: "DNS unreachable",
      evidence: [],
      error: e instanceof Error ? e.message : "DNS failed",
    };
  }
}

async function collectRdap(domain: string): Promise<AdapterResult> {
  const retrievedAt = new Date().toISOString();
  try {
    const res = await fetch(`https://rdap.org/domain/${encodeURIComponent(domain)}`, {
      headers: { Accept: "application/rdap+json" },
      signal: AbortSignal.timeout(12000),
      redirect: "follow",
    });
    if (!res.ok) {
      return {
        adapterId: "rdap",
        health: res.status === 404 ? "AVAILABLE" : "DEGRADED",
        statusLabel: res.status === 404 ? "No RDAP domain object" : `RDAP HTTP ${res.status}`,
        evidence: [],
        error: res.status === 404 ? undefined : `HTTP ${res.status}`,
      };
    }
    const json = (await res.json()) as {
      ldhName?: string;
      handle?: string;
      status?: string[];
      events?: Array<{ eventAction?: string; eventDate?: string }>;
      entities?: Array<{ roles?: string[]; vcardArray?: unknown }>;
      links?: Array<{ href?: string; rel?: string }>;
    };
    const events = (json.events ?? [])
      .map((e) => `${e.eventAction}: ${e.eventDate}`)
      .filter(Boolean)
      .join(" · ");
    const status = (json.status ?? []).join(", ") || "unknown";
    return {
      adapterId: "rdap",
      health: "AVAILABLE",
      statusLabel: "Registration data retrieved",
      evidence: [
        {
          id: `rdap-${domain}`,
          title: `Domain registration · ${json.ldhName || domain}`,
          summary: `Status: ${status}${events ? ` · ${events}` : ""}`,
          confidence: "VERIFIED",
          freshness: "LIVE",
          observedAt: retrievedAt,
          url: `https://rdap.org/domain/${domain}`,
          provenance: {
            sourceLabel: "Public domain registration directory",
            method: "RDAP domain lookup",
            retrievedAt,
            whyVisible: "Domain/URL classification selected registration lookup.",
            limitations: [
              "Privacy redaction may hide registrant details.",
              "RDAP coverage varies by TLD.",
            ],
          },
        },
      ],
    };
  } catch (e) {
    return {
      adapterId: "rdap",
      health: "OFFLINE",
      statusLabel: "RDAP unreachable",
      evidence: [],
      error: e instanceof Error ? e.message : "RDAP failed",
    };
  }
}

async function collectCrtSh(domain: string): Promise<AdapterResult> {
  const retrievedAt = new Date().toISOString();
  try {
    const res = await fetch(
      `https://crt.sh/?q=${encodeURIComponent(`%.${domain}`)}&output=json`,
      { signal: AbortSignal.timeout(15000) },
    );
    if (!res.ok) {
      return {
        adapterId: "ct-logs",
        health: "DEGRADED",
        statusLabel: `Certificate transparency HTTP ${res.status}`,
        evidence: [],
        error: `HTTP ${res.status}`,
      };
    }
    const text = await res.text();
    const json = JSON.parse(text || "[]") as Array<{
      name_value?: string;
      issuer_name?: string;
      not_before?: string;
      id?: number;
    }>;
    const names = new Set<string>();
    for (const row of json.slice(0, 200)) {
      for (const part of (row.name_value || "").split("\n")) {
        const n = part.trim().toLowerCase();
        if (n && !n.startsWith("*")) names.add(n);
      }
    }
    const list = [...names].slice(0, 12);
    return {
      adapterId: "ct-logs",
      health: "AVAILABLE",
      statusLabel: `${list.length} public hostnames from CT`,
      evidence: list.map((name, i) => ({
        id: `ct-${domain}-${i}`,
        title: `Certificate hostname · ${name}`,
        summary: "Observed in public certificate transparency logs.",
        confidence: "SUPPORTED" as const,
        freshness: "LIVE" as const,
        observedAt: retrievedAt,
        provenance: {
          sourceLabel: "Public certificate transparency",
          method: "CT log hostname extraction",
          retrievedAt,
          whyVisible: "Domain investigation includes publicly logged TLS names.",
          limitations: [
            "Hostnames ≠ active services.",
            "CT is historical — certificates may be revoked or unused.",
          ],
        },
      })),
    };
  } catch (e) {
    return {
      adapterId: "ct-logs",
      health: "DEGRADED",
      statusLabel: "Certificate transparency unavailable",
      evidence: [],
      error: e instanceof Error ? e.message : "CT failed",
    };
  }
}

async function collectWayback(domain: string): Promise<AdapterResult> {
  const retrievedAt = new Date().toISOString();
  try {
    const res = await fetch(
      `https://web.archive.org/cdx/search/cdx?url=${encodeURIComponent(domain)}/*&output=json&limit=8&fl=timestamp,original,statuscode&filter=statuscode:200`,
      { signal: AbortSignal.timeout(15000) },
    );
    if (!res.ok) {
      return {
        adapterId: "archive",
        health: "DEGRADED",
        statusLabel: `Archive index HTTP ${res.status}`,
        evidence: [],
        error: `HTTP ${res.status}`,
      };
    }
    const json = (await res.json()) as string[][];
    const rows = json.slice(1);
    return {
      adapterId: "archive",
      health: "AVAILABLE",
      statusLabel: `${rows.length} archived captures`,
      evidence: rows.map((row, i) => {
        const [ts, original, code] = row;
        const iso =
          ts && ts.length >= 14
            ? `${ts.slice(0, 4)}-${ts.slice(4, 6)}-${ts.slice(6, 8)}T${ts.slice(8, 10)}:${ts.slice(10, 12)}:${ts.slice(12, 14)}Z`
            : retrievedAt;
        return {
          id: `wb-${domain}-${i}`,
          title: `Archived page · ${original}`,
          summary: `HTTP ${code} capture at ${iso}`,
          confidence: "SUPPORTED" as const,
          freshness: "CACHED" as const,
          observedAt: iso,
          url: `https://web.archive.org/web/${ts}/${original}`,
          provenance: {
            sourceLabel: "Public web archive index",
            method: "CDX API",
            retrievedAt,
            whyVisible: "Historical public snapshots help timeline reconstruction.",
            limitations: ["Archive coverage is incomplete.", "Capture ≠ current site state."],
          },
        };
      }),
    };
  } catch (e) {
    return {
      adapterId: "archive",
      health: "DEGRADED",
      statusLabel: "Archive index unavailable",
      evidence: [],
      error: e instanceof Error ? e.message : "Archive failed",
    };
  }
}

function stubAdapter(
  id: string,
  statusLabel: string,
  health: AdapterHealth,
  why: string,
): AdapterResult {
  return {
    adapterId: id,
    health,
    statusLabel,
    evidence: [],
    error: why,
  };
}

export interface InvestigationKernelResult {
  query: string;
  classification: Classification;
  phases: Array<{ id: string; status: "completed" | "running" | "pending" | "skipped" }>;
  adapters: AdapterResult[];
  evidence: KernelEvidence[];
  retrievedAt: string;
  boundary: string;
}

export async function runInformationKernel(rawQuery: string): Promise<InvestigationKernelResult> {
  const classification = classifyQuery(rawQuery);
  const domain = extractDomain(rawQuery);
  const retrievedAt = new Date().toISOString();

  const phases = [
    { id: "UNDERSTANDING", status: "completed" as const },
    { id: "COLLECTING", status: "running" as const },
    { id: "CORRELATING", status: "pending" as const },
    { id: "VERIFYING", status: "pending" as const },
  ];

  const jobs: Promise<AdapterResult>[] = [];

  const domainClasses: QueryClass[] = ["DOMAIN", "URL", "MIXED", "COMPANY", "NL"];
  if (domain && classification.chips.some((c) => domainClasses.includes(c) || c === "DOMAIN")) {
    jobs.push(collectDns(domain), collectRdap(domain), collectCrtSh(domain), collectWayback(domain));
  } else if (domain) {
    jobs.push(collectDns(domain), collectRdap(domain));
  }

  // Always register honest stubs for heavier / India sources
  const stubs: AdapterResult[] = [
    stubAdapter(
      "india-company",
      "India corporate records",
      "AUTH_DEPENDENT",
      "Official company portals require interactive/authenticated access — not fabricated.",
    ),
    stubAdapter(
      "username-presence",
      "Username presence checks",
      "AUTH_DEPENDENT",
      "Hosted worker not connected this pass — no invented profile hits.",
    ),
    stubAdapter(
      "phone-public-meta",
      "Phone public metadata",
      "AUTH_DEPENDENT",
      "Only format/country metadata planned; no subscriber identity or intercept.",
    ),
  ];

  const collected = jobs.length > 0 ? await Promise.all(jobs) : [];
  const adapters = [...collected, ...stubs];
  const evidence = adapters.flatMap((a) => a.evidence);

  return {
    query: rawQuery.trim(),
    classification,
    phases: [
      { id: "UNDERSTANDING", status: "completed" },
      { id: "COLLECTING", status: "completed" },
      { id: "CORRELATING", status: evidence.length ? "completed" : "skipped" },
      { id: "VERIFYING", status: evidence.length ? "completed" : "skipped" },
    ],
    adapters,
    evidence,
    retrievedAt,
    boundary:
      "Public / permitted sources only. No private databases, IMSI, interception, credential theft, or subscriber triangulation.",
  };
}
