// Privacy consent store. Client-side only. localStorage-backed.
// Categories are independent; essential is always on.

export type ConsentCategory =
  | "essential"
  | "analytics"
  | "personalization"
  | "replay"
  | "communication";

export type ConsentState = Record<ConsentCategory, boolean>;

const STORAGE_KEY = "ti.consent.v1";
const DECIDED_KEY = "ti.consent.decided.v1";

export const DEFAULT_CONSENT: ConsentState = {
  essential: true,
  analytics: false,
  personalization: false,
  replay: false,
  communication: false,
};

type Listener = (state: ConsentState) => void;
const listeners = new Set<Listener>();

function isBrowser() {
  return typeof window !== "undefined";
}

export function getConsent(): ConsentState {
  if (!isBrowser()) return DEFAULT_CONSENT;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONSENT;
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    return { ...DEFAULT_CONSENT, ...parsed, essential: true };
  } catch {
    return DEFAULT_CONSENT;
  }
}

export function hasDecided(): boolean {
  if (!isBrowser()) return false;
  return window.localStorage.getItem(DECIDED_KEY) === "1";
}

export function setConsent(next: Partial<ConsentState>) {
  if (!isBrowser()) return;
  const merged: ConsentState = { ...getConsent(), ...next, essential: true };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  window.localStorage.setItem(DECIDED_KEY, "1");
  listeners.forEach((l) => l(merged));
}

export function acceptAll() {
  setConsent({
    analytics: true,
    personalization: true,
    replay: false, // replay stays off unless explicitly requested
    communication: true,
  });
}

export function rejectAll() {
  setConsent({
    analytics: false,
    personalization: false,
    replay: false,
    communication: false,
  });
}

export function clearPersonalization() {
  if (!isBrowser()) return;
  const keep = new Set([STORAGE_KEY, DECIDED_KEY]);
  const toDelete: string[] = [];
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i);
    if (key && key.startsWith("ti.") && !keep.has(key)) toDelete.push(key);
  }
  toDelete.forEach((k) => window.localStorage.removeItem(k));
}

export function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
