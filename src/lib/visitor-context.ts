// Client-side approximate visitor context. Everything here is inferred and
// labeled as approximate. No fingerprinting, no persistent identifiers beyond
// a simple "visited before" flag.

export type ReferrerFamily =
  | "github"
  | "linkedin"
  | "instagram"
  | "search"
  | "direct"
  | "other";

export type DeviceCategory = "mobile" | "tablet" | "desktop";
export type TimeOfDay = "morning" | "afternoon" | "evening" | "night";

export interface VisitorContext {
  timezone: string | null;
  language: string;
  device: DeviceCategory;
  referrer: ReferrerFamily;
  referrerHost: string | null;
  returning: boolean;
  timeOfDay: TimeOfDay;
  reducedMotion: boolean;
  dataSaver: boolean;
}

const RETURNING_KEY = "ti.returning.v1";
const PATH_KEY = "ti.path.v1";

function classifyReferrer(ref: string): { family: ReferrerFamily; host: string | null } {
  if (!ref) return { family: "direct", host: null };
  try {
    const url = new URL(ref);
    if (url.origin === window.location.origin) return { family: "direct", host: null };
    const h = url.hostname.toLowerCase();
    if (h.includes("github")) return { family: "github", host: h };
    if (h.includes("linkedin")) return { family: "linkedin", host: h };
    if (h.includes("instagram")) return { family: "instagram", host: h };
    if (/google\.|bing\.|duckduckgo|yandex|baidu|kagi|brave\.com\/search/.test(h))
      return { family: "search", host: h };
    return { family: "other", host: h };
  } catch {
    return { family: "direct", host: null };
  }
}

function classifyDevice(ua: string, width: number): DeviceCategory {
  const s = ua.toLowerCase();
  if (/ipad|tablet|kindle|playbook|silk/.test(s) || (width >= 600 && width <= 1024 && /mobi|android/.test(s)))
    return "tablet";
  if (/mobi|android|iphone|ipod|blackberry|iemobile|opera mini/.test(s)) return "mobile";
  return "desktop";
}

function timeOfDayFrom(date: Date): TimeOfDay {
  const h = date.getHours();
  if (h < 5) return "night";
  if (h < 12) return "morning";
  if (h < 17) return "afternoon";
  if (h < 22) return "evening";
  return "night";
}

export function readVisitorContext(): VisitorContext {
  if (typeof window === "undefined") {
    return {
      timezone: null,
      language: "en",
      device: "desktop",
      referrer: "direct",
      referrerHost: null,
      returning: false,
      timeOfDay: "afternoon",
      reducedMotion: false,
      dataSaver: false,
    };
  }
  const tz = (() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone ?? null;
    } catch {
      return null;
    }
  })();
  const lang = (navigator.language || "en").split("-")[0];
  const { family, host } = classifyReferrer(document.referrer);
  const returning = window.localStorage.getItem(RETURNING_KEY) === "1";
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  // @ts-expect-error non-standard
  const dataSaver = Boolean(navigator.connection?.saveData);

  return {
    timezone: tz,
    language: lang,
    device: classifyDevice(navigator.userAgent, window.innerWidth),
    referrer: family,
    referrerHost: host,
    returning,
    timeOfDay: timeOfDayFrom(new Date()),
    reducedMotion,
    dataSaver,
  };
}

export function markVisited() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(RETURNING_KEY, "1");
}

export type VisitorPath =
  | "hiring"
  | "product"
  | "ai"
  | "automation"
  | "cyber"
  | "forensics"
  | "dezo"
  | "collaborate"
  | "exploring";

export function getSavedPath(): VisitorPath | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(PATH_KEY);
  return (v as VisitorPath) || null;
}

export function savePath(p: VisitorPath) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PATH_KEY, p);
}
