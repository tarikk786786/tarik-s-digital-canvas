/**
 * E2E Information Kernel — domain + URL + location (live HTTP collectors).
 * Run: node --experimental-strip-types scripts/e2e-intelligence-kernel.ts
 *   or: npx tsx scripts/e2e-intelligence-kernel.ts
 */
import {
  buildInvestigationPlan,
  classifyQuery,
} from "../src/lib/intelligence/classifier";
import { runInformationKernel } from "../src/lib/intelligence/collectors";

const BRAND_LEAK =
  /\b(sherlock|amass|subfinder|opensky|cesium|nominatim|ipwho\.?is|crt\.sh|haveibeenpwned|maltego|shodan|hunter\.io)\b/i;

type CaseResult = {
  label: string;
  query: string;
  ok: boolean;
  detail: string;
  liveAdapters: string[];
  authAdapters: string[];
  evidenceCount: number;
};

async function runCase(
  label: string,
  query: string,
  expect: {
    chipsInclude: string[];
    liveMinEvidence: number;
    requireLiveAdapters?: string[];
  },
): Promise<CaseResult> {
  const classification = classifyQuery(query);
  const plan = buildInvestigationPlan(classification);
  const result = await runInformationKernel(query);

  const missingChip = expect.chipsInclude.find((c) => !classification.chips.includes(c as never));
  if (missingChip) {
    return {
      label,
      query,
      ok: false,
      detail: `classification missing chip ${missingChip}; got ${classification.chips.join(",")}`,
      liveAdapters: [],
      authAdapters: [],
      evidenceCount: 0,
    };
  }

  if (!result.plan?.steps?.length) {
    return {
      label,
      query,
      ok: false,
      detail: "missing investigation plan",
      liveAdapters: [],
      authAdapters: [],
      evidenceCount: 0,
    };
  }

  if (!Array.isArray(result.conflicts)) {
    return {
      label,
      query,
      ok: false,
      detail: "missing conflicts array on kernel result",
      liveAdapters: [],
      authAdapters: [],
      evidenceCount: 0,
    };
  }

  for (const a of result.adapters) {
    if (!a.categoryLabel || BRAND_LEAK.test(a.categoryLabel)) {
      return {
        label,
        query,
        ok: false,
        detail: `adapter ${a.adapterId} missing/leaky categoryLabel`,
        liveAdapters: [],
        authAdapters: [],
        evidenceCount: result.evidence.length,
      };
    }
  }

  const liveAdapters = result.adapters
    .filter((a) => a.health === "AVAILABLE")
    .map((a) => a.adapterId);
  const authAdapters = result.adapters
    .filter((a) => a.health === "AUTH_DEPENDENT")
    .map((a) => a.adapterId);

  if (!authAdapters.includes("india-company")) {
    return {
      label,
      query,
      ok: false,
      detail: "india-company must stay AUTH_DEPENDENT",
      liveAdapters,
      authAdapters,
      evidenceCount: result.evidence.length,
    };
  }

  for (const id of expect.requireLiveAdapters ?? []) {
    const adapter = result.adapters.find((a) => a.adapterId === id);
    if (!adapter || adapter.health === "OFFLINE") {
      return {
        label,
        query,
        ok: false,
        detail: `expected live-capable adapter ${id}; health=${adapter?.health ?? "missing"}`,
        liveAdapters,
        authAdapters,
        evidenceCount: result.evidence.length,
      };
    }
  }

  if (result.evidence.length < expect.liveMinEvidence) {
    return {
      label,
      query,
      ok: false,
      detail: `expected ≥${expect.liveMinEvidence} evidence, got ${result.evidence.length}`,
      liveAdapters,
      authAdapters,
      evidenceCount: result.evidence.length,
    };
  }

  for (const ev of result.evidence) {
    const blob = [
      ev.title,
      ev.summary,
      ev.provenance.sourceLabel,
      ev.provenance.method,
      ev.provenance.whyVisible,
      ...ev.provenance.limitations,
    ].join(" ");
    if (BRAND_LEAK.test(blob)) {
      return {
        label,
        query,
        ok: false,
        detail: `brand leak in evidence provenance: ${blob.slice(0, 120)}`,
        liveAdapters,
        authAdapters,
        evidenceCount: result.evidence.length,
      };
    }
    if (!ev.confidence || !ev.freshness || !ev.provenance?.sourceLabel) {
      return {
        label,
        query,
        ok: false,
        detail: `evidence missing confidence/freshness/provenance: ${ev.id}`,
        liveAdapters,
        authAdapters,
        evidenceCount: result.evidence.length,
      };
    }
  }

  for (const step of plan.steps) {
    if (BRAND_LEAK.test(step.categoryLabel) || BRAND_LEAK.test(step.reason)) {
      return {
        label,
        query,
        ok: false,
        detail: `brand leak in plan: ${step.categoryLabel}`,
        liveAdapters,
        authAdapters,
        evidenceCount: result.evidence.length,
      };
    }
  }

  return {
    label,
    query,
    ok: true,
    detail: `${result.evidence.length} evidence · plan ${plan.summary}`,
    liveAdapters,
    authAdapters,
    evidenceCount: result.evidence.length,
  };
}

async function main() {
  const cases = await Promise.all([
    runCase("DOMAIN", "example.com", {
      chipsInclude: ["DOMAIN"],
      liveMinEvidence: 1,
      requireLiveAdapters: ["dns"],
    }),
    runCase("URL", "https://tarikislam.in", {
      chipsInclude: ["URL"],
      liveMinEvidence: 1,
      requireLiveAdapters: ["dns"],
    }),
    runCase("LOCATION", "Mumbai", {
      chipsInclude: ["LOCATION"],
      liveMinEvidence: 1,
      requireLiveAdapters: ["geocode"],
    }),
    runCase("EMAIL", "hello@example.com", {
      chipsInclude: ["EMAIL"],
      liveMinEvidence: 1,
      requireLiveAdapters: ["dns"],
    }),
    runCase("IP", "8.8.8.8", {
      chipsInclude: ["IP"],
      liveMinEvidence: 1,
      requireLiveAdapters: ["ip-asn"],
    }),
    runCase("PHONE", "+919876543210", {
      chipsInclude: ["PHONE"],
      liveMinEvidence: 1,
      requireLiveAdapters: ["phone-public-meta"],
    }),
    runCase("USERNAME", "@public_handle", {
      chipsInclude: ["USERNAME"],
      liveMinEvidence: 0,
      requireLiveAdapters: [],
    }),
  ]);

  // Extra honesty checks for AUTH_DEPENDENT classes
  const username = cases.find((c) => c.label === "USERNAME");
  if (username?.ok && !username.authAdapters.includes("username-presence")) {
    username.ok = false;
    username.detail = "username-presence must be AUTH_DEPENDENT with zero invented hits";
  }
  const email = cases.find((c) => c.label === "EMAIL");
  if (email?.ok && !email.authAdapters.includes("email-identity")) {
    email.ok = false;
    email.detail = "email-identity must stay AUTH_DEPENDENT (no breach invention)";
  }

  console.log("\n=== Information Kernel E2E ===\n");
  for (const c of cases) {
    const mark = c.ok ? "PASS" : "FAIL";
    console.log(`[${mark}] ${c.label} · ${c.query}`);
    console.log(`       ${c.detail}`);
    console.log(`       LIVE adapters: ${c.liveAdapters.join(", ") || "(none)"}`);
    console.log(`       AUTH_DEPENDENT: ${c.authAdapters.join(", ") || "(none)"}`);
  }

  const failed = cases.filter((c) => !c.ok);
  if (failed.length) {
    console.error(`\n${failed.length} case(s) failed.`);
    process.exit(1);
  }
  console.log("\nAll Information Kernel cases passed.\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
