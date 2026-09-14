/**
 * Information Kernel — public HTTP collectors (server-side).
 * Provider names stay in provenance fields only — never primary chrome.
 */

import {
  buildInvestigationPlan,
  classifyQuery,
  type Classification,
  type InvestigationPlan,
} from "./classifier";

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

async function dnsQuery(
  domain: string,
  type: "A" | "AAAA" | "MX" | "TXT" | "NS",
): Promise<Array<{ type: string; data: string; TTL?: number }>> {
  const res = await fetch(
    `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=${type}`,
    {
      headers: { Accept: "application/dns-json" },
      signal: AbortSignal.timeout(10000),
    },
  );
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = (await res.json()) as {
    Answer?: Array<{ data: string; TTL?: number; type?: number }>;
  };
  return (json.Answer ?? []).map((a) => ({ type, data: a.data, TTL: a.TTL }));
}

async function collectDns(domain: string): Promise<AdapterResult> {
  const retrievedAt = new Date().toISOString();
  try {
    const batches = await Promise.allSettled([
      dnsQuery(domain, "A"),
      dnsQuery(domain, "AAAA"),
      dnsQuery(domain, "MX"),
      dnsQuery(domain, "TXT"),
      dnsQuery(domain, "NS"),
    ]);
    const answers = batches.flatMap((b) => (b.status === "fulfilled" ? b.value : []));
    if (answers.length === 0) {
      return {
        adapterId: "dns",
        health: "DEGRADED",
        statusLabel: "No DNS answers",
        evidence: [],
      };
    }
    return {
      adapterId: "dns",
      health: "AVAILABLE",
      statusLabel: `${answers.length} DNS records retrieved`,
      evidence: answers.slice(0, 16).map((a, i) => ({
        id: `dns-${domain}-${a.type}-${i}`,
        title: `${a.type} record · ${domain}`,
        summary: `${a.data}${a.TTL != null ? ` (TTL ${a.TTL}s)` : ""}`,
        confidence: "VERIFIED" as const,
        freshness: "LIVE" as const,
        observedAt: retrievedAt,
        provenance: {
          sourceLabel: "Public DNS resolution",
          method: `DNS-over-HTTPS ${a.type} query`,
          retrievedAt,
          whyVisible: "Domain-class query activated public DNS collection.",
          limitations: ["Public recursive answers only — not a full zone transfer."],
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

function extractIp(q: string): string | null {
  const m = q.trim().match(/^(\d{1,3}\.){3}\d{1,3}$/);
  return m ? q.trim() : null;
}

async function collectIpAsn(ip: string): Promise<AdapterResult> {
  const retrievedAt = new Date().toISOString();
  try {
    const res = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}`, {
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) {
      return {
        adapterId: "ip-asn",
        health: "DEGRADED",
        statusLabel: `IP metadata HTTP ${res.status}`,
        evidence: [],
        error: `HTTP ${res.status}`,
      };
    }
    const json = (await res.json()) as {
      success?: boolean;
      ip?: string;
      connection?: { asn?: number; org?: string; isp?: string };
      country?: string;
      city?: string;
      latitude?: number;
      longitude?: number;
      message?: string;
    };
    if (json.success === false) {
      return {
        adapterId: "ip-asn",
        health: "DEGRADED",
        statusLabel: json.message || "IP lookup failed",
        evidence: [],
        error: json.message,
      };
    }
    const asn = json.connection?.asn;
    const org = json.connection?.org || json.connection?.isp || "unknown org";
    return {
      adapterId: "ip-asn",
      health: "AVAILABLE",
      statusLabel: "IP / ASN metadata retrieved",
      evidence: [
        {
          id: `ip-${ip}`,
          title: `Network metadata · ${json.ip || ip}`,
          summary: `ASN ${asn ?? "n/a"} · ${org} · ${[json.city, json.country].filter(Boolean).join(", ") || "location unknown"}`,
          confidence: "SUPPORTED",
          freshness: "LIVE",
          observedAt: retrievedAt,
          provenance: {
            sourceLabel: "Public IP / network metadata",
            method: "Public IP / ASN JSON lookup",
            retrievedAt,
            whyVisible: "IP-class query activated network metadata collection.",
            limitations: [
              "Geolocation is approximate and often provider-level.",
              "ASN ownership ≠ end-user identity.",
            ],
          },
        },
      ],
    };
  } catch (e) {
    return {
      adapterId: "ip-asn",
      health: "OFFLINE",
      statusLabel: "IP metadata unreachable",
      evidence: [],
      error: e instanceof Error ? e.message : "IP lookup failed",
    };
  }
}

async function collectGeocode(query: string): Promise<AdapterResult> {
  const retrievedAt = new Date().toISOString();
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${encodeURIComponent(query)}`,
      {
        headers: {
          Accept: "application/json",
          "User-Agent": "TarikDigitalCanvas/1.0 (portfolio information-kernel; educational)",
        },
        signal: AbortSignal.timeout(12000),
      },
    );
    if (!res.ok) {
      return {
        adapterId: "geocode",
        health: "DEGRADED",
        statusLabel: `Geocode HTTP ${res.status}`,
        evidence: [],
        error: `HTTP ${res.status}`,
      };
    }
    const json = (await res.json()) as Array<{
      display_name?: string;
      lat?: string;
      lon?: string;
      type?: string;
      importance?: number;
    }>;
    return {
      adapterId: "geocode",
      health: "AVAILABLE",
      statusLabel: `${json.length} place candidates`,
      evidence: json.map((row, i) => ({
        id: `geo-${i}`,
        title: row.display_name || `Place candidate ${i + 1}`,
        summary: `lat ${row.lat}, lon ${row.lon}${row.type ? ` · ${row.type}` : ""}`,
        confidence: "PROBABLE" as const,
        freshness: "LIVE" as const,
        observedAt: retrievedAt,
        provenance: {
          sourceLabel: "Open place / location directory",
          method: "Public geocoding search",
          retrievedAt,
          whyVisible: "Location-class query activated public geocoding.",
          limitations: [
            "Ambiguous place names return multiple candidates.",
            "Coordinates are directory estimates — not device GPS.",
          ],
        },
      })),
    };
  } catch (e) {
    return {
      adapterId: "geocode",
      health: "OFFLINE",
      statusLabel: "Geocode unreachable",
      evidence: [],
      error: e instanceof Error ? e.message : "Geocode failed",
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
  plan: InvestigationPlan;
  phases: Array<{ id: string; status: "completed" | "running" | "pending" | "skipped" }>;
  adapters: AdapterResult[];
  evidence: KernelEvidence[];
  retrievedAt: string;
  boundary: string;
}

export async function runInformationKernel(rawQuery: string): Promise<InvestigationKernelResult> {
  const classification = classifyQuery(rawQuery);
  const plan = buildInvestigationPlan(classification);
  const domain = extractDomain(rawQuery);
  const retrievedAt = new Date().toISOString();

  const jobs: Promise<AdapterResult>[] = [];
  const ip = extractIp(rawQuery);
  const liveIds = new Set(plan.steps.filter((s) => s.mode === "LIVE").map((s) => s.id));

  if (domain) {
    if (liveIds.has("dns")) jobs.push(collectDns(domain));
    if (liveIds.has("rdap")) jobs.push(collectRdap(domain));
    if (liveIds.has("ct-logs")) jobs.push(collectCrtSh(domain));
    if (liveIds.has("archive")) jobs.push(collectWayback(domain));
  }

  if (liveIds.has("ip-asn")) {
    const targetIp = ip || extractIp(classification.normalized);
    if (targetIp) jobs.push(collectIpAsn(targetIp));
  }

  if (liveIds.has("geocode") && !domain && !ip) {
    jobs.push(collectGeocode(rawQuery.trim()));
  }

  const stubs: AdapterResult[] = plan.steps
    .filter((s) => s.mode === "AUTH_DEPENDENT")
    .map((s) => stubAdapter(s.id, s.categoryLabel, "AUTH_DEPENDENT", s.reason));

  const collected = jobs.length > 0 ? await Promise.all(jobs) : [];
  const adapters = [...collected, ...stubs];
  const evidence = adapters.flatMap((a) => a.evidence);

  return {
    query: rawQuery.trim(),
    classification,
    plan,
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
