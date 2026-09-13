/**
 * InsForge SDK client for Tarik Digital Canvas.
 * Public anon key only in browser. Admin API key stays server-side via createAdminClient.
 */
import { createClient, type InsForgeClient } from "@insforge/sdk";

/** Public project URL (safe to expose). */
export const INSFORGE_PUBLIC_URL = "https://dwctb4hp.ap-southeast.insforge.app";

function readUrl(): string {
  const fromVite =
    typeof import.meta !== "undefined" ? import.meta.env?.VITE_INSFORGE_URL : undefined;
  const fromNode =
    typeof process !== "undefined" ? process.env?.INSFORGE_URL : undefined;
  return (fromVite || fromNode || INSFORGE_PUBLIC_URL).trim();
}

function readAnonKey(): string {
  const fromVite =
    typeof import.meta !== "undefined"
      ? import.meta.env?.VITE_INSFORGE_ANON_KEY
      : undefined;
  const fromNode =
    typeof process !== "undefined" ? process.env?.INSFORGE_ANON_KEY : undefined;
  return (fromVite || fromNode || "").trim();
}

export const INSFORGE_CONFIGURED = Boolean(readAnonKey());

let cached: InsForgeClient | null = null;

/** Lazy client — throws a clear error if anon key is missing. */
export function getInsforge(): InsForgeClient {
  if (cached) return cached;
  const anonKey = readAnonKey();
  if (!anonKey) {
    throw new Error(
      "InsForge anon key missing. Copy .env.example → .env.local and run: npx -y @insforge/cli secrets get ANON_KEY",
    );
  }
  cached = createClient({ baseUrl: readUrl(), anonKey });
  return cached;
}

export function getInsforgeStatus() {
  return {
    configured: INSFORGE_CONFIGURED,
    baseUrl: readUrl(),
    project: "tarik-digital-canvas",
    region: "ap-southeast",
  };
}
