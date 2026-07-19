// Server-only news aggregator.
// Primary:  NewsData.io               (pub_...)
// Backup:   GNews                     (32-char hex key)
// Mirror:   saurav.tech/NewsAPI       (keyless, JSON snapshot of newsapi.org)
//
// Never returns keys to browser. Keys are only read inside handler().
// - 5s per-provider timeout
// - 20 min in-memory cache
// - Serves STALE cache on provider outage
// - Subject allowlist + block-list (topic filter)
// - Zod validates each provider payload
// - IP-less token-bucket rate limit (~30 req / 10 min / worker instance)

import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import type { NewsArticle, NewsCategory, NewsResponse } from "@/lib/news-types";

/* ------------------------------------------------------------------ */
/* Topic filter                                                        */
/* ------------------------------------------------------------------ */

const ALLOWED_TERMS: Array<[RegExp, NewsCategory, number]> = [
  [/\bransomware|malware|trojan|botnet|worm|apt[- ]?\d*\b/i, "Threat Intelligence", 9],
  [/\bdata breach|leaked (?:data|records|db)|exfiltrat/i, "Data Breach", 9],
  [/\bcve[- ]?\d{4}|zero[- ]?day|exploit|rce|sql[- ]?inject|xss|csrf\b/i, "Cybersecurity", 9],
  [/\bpen[- ]?test|ethical hack|red team|bug bounty|hackerone|bugcrowd\b/i, "Ethical Hacking", 8],
  [/\bcyber(security|attack|crime|espionage)|infosec|threat actor\b/i, "Cybersecurity", 8],
  [/\bcybercrime|online fraud|phishing|smishing|vishing|scam network\b/i, "Cybercrime", 8],
  [/\bweb security|owasp|waf|http|tls|ssl|https|browser security\b/i, "Web Security", 7],
  [/\bdigital forensic|forensic (?:science|analysis|lab|investigat)|dna analysis\b/i, "Forensics", 9],
  [/\bcrime scene|homicide|investigation|criminal (?:case|justice|court)|police probe\b/i, "Crime", 7],
  [/\breact\b|\bnext\.?js\b|\btypescript\b|\bnode\.?js\b|\bjavascript\b|\bfront[- ]?end\b|\bbackend\b/i, "Web Development", 6],
  [/\bdevsecops\b|\bsupply[- ]chain (attack|security)\b/i, "Web Security", 8],
  [/\b(ai|llm|gpt|model) (?:security|safety|vulnerabilit|jailbreak|prompt injection)\b/i, "Cybersecurity", 8],
];

// Reject entertainment/sport/celebrity/gambling/adult/crypto-speculation/how-to-hack tutorials.
const BLOCK_TERMS =
  /\b(celebrity|kardashian|hollywood|bollywood|box office|nba|nfl|cricket score|premier league|casino|betting odds|onlyfans|porn|nsfw|memecoin|shitcoin|price prediction|to the moon|how to hack (?:facebook|instagram|whatsapp|snapchat|gmail|wifi))\b/i;

function classify(text: string): { category: NewsCategory; score: number } | null {
  if (BLOCK_TERMS.test(text)) return null;
  let best: { category: NewsCategory; score: number } | null = null;
  for (const [re, cat, score] of ALLOWED_TERMS) {
    if (re.test(text) && (!best || score > best.score)) best = { category: cat, score };
  }
  return best;
}

/* ------------------------------------------------------------------ */
/* Sanitization                                                        */
/* ------------------------------------------------------------------ */

function sanitizeText(input: unknown, max: number): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/<[^>]*>/g, " ")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

const ALLOWED_URL_PROTOCOLS = new Set(["https:", "http:"]);
function safeUrl(input: unknown): string | null {
  if (typeof input !== "string" || input.length > 2048) return null;
  try {
    const u = new URL(input);
    if (!ALLOWED_URL_PROTOCOLS.has(u.protocol)) return null;
    // Block internal metadata targets defensively.
    const host = u.hostname.toLowerCase();
    if (
      host === "localhost" ||
      host.startsWith("127.") ||
      host.startsWith("10.") ||
      host.startsWith("192.168.") ||
      host === "169.254.169.254"
    ) {
      return null;
    }
    return u.toString();
  } catch {
    return null;
  }
}

function hashId(url: string): string {
  let h = 5381;
  for (let i = 0; i < url.length; i++) h = ((h << 5) + h + url.charCodeAt(i)) | 0;
  return `n_${(h >>> 0).toString(36)}`;
}

/* ------------------------------------------------------------------ */
/* Zod: provider payloads                                              */
/* ------------------------------------------------------------------ */

const NewsDataItem = z
  .object({
    article_id: z.string().optional(),
    title: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    link: z.string().nullable().optional(),
    image_url: z.string().nullable().optional(),
    source_id: z.string().nullable().optional(),
    source_name: z.string().nullable().optional(),
    pubDate: z.string().nullable().optional(),
  })
  .passthrough();

const NewsDataResp = z
  .object({
    status: z.string().optional(),
    results: z.array(NewsDataItem).optional().default([]),
  })
  .passthrough();

const GNewsItem = z
  .object({
    title: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    url: z.string().nullable().optional(),
    image: z.string().nullable().optional(),
    publishedAt: z.string().nullable().optional(),
    source: z.object({ name: z.string().nullable().optional() }).passthrough().optional(),
  })
  .passthrough();

const GNewsResp = z
  .object({
    articles: z.array(GNewsItem).optional().default([]),
  })
  .passthrough();

/* ------------------------------------------------------------------ */
/* Fetch helpers                                                       */
/* ------------------------------------------------------------------ */

async function fetchWithTimeout(url: string, ms: number): Promise<Response> {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), ms);
  try {
    return await fetch(url, {
      signal: ac.signal,
      headers: { "user-agent": "tarikislam.in/1.0" },
    });
  } finally {
    clearTimeout(t);
  }
}

const PRIMARY_QUERY =
  '(cybersecurity OR "digital forensics" OR forensic OR cybercrime OR malware OR ransomware OR "data breach" OR vulnerability OR javascript OR typescript OR react OR "next.js")';

async function callPrimary(key: string): Promise<NewsArticle[]> {
  const u = new URL("https://newsdata.io/api/1/latest");
  u.searchParams.set("apikey", key);
  u.searchParams.set("language", "en");
  u.searchParams.set("q", PRIMARY_QUERY);
  u.searchParams.set("size", "10");

  const res = await fetchWithTimeout(u.toString(), 5000);
  if (!res.ok) throw new Error(`primary_http_${res.status}`);
  const raw = await res.json();
  const parsed = NewsDataResp.safeParse(raw);
  if (!parsed.success) throw new Error("primary_bad_shape");

  const out: NewsArticle[] = [];
  for (const it of parsed.data.results ?? []) {
    const url = safeUrl(it.link);
    const title = sanitizeText(it.title, 200);
    const description = sanitizeText(it.description, 400);
    if (!url || !title) continue;
    const cls = classify(`${title} ${description}`);
    if (!cls) continue;
    out.push({
      id: it.article_id ? `n_${it.article_id.slice(0, 24)}` : hashId(url),
      title,
      description,
      url,
      imageUrl: safeUrl(it.image_url) ?? undefined,
      source: sanitizeText(it.source_name ?? it.source_id ?? "Unknown", 80),
      publishedAt: sanitizeText(it.pubDate, 40) || new Date().toISOString(),
      category: cls.category,
      relevanceScore: cls.score,
      provider: "primary",
    });
  }
  return out;
}

async function callBackup(key: string): Promise<NewsArticle[]> {
  const u = new URL("https://gnews.io/api/v4/search");
  u.searchParams.set("apikey", key);
  u.searchParams.set("lang", "en");
  u.searchParams.set("max", "10");
  u.searchParams.set(
    "q",
    'cybersecurity OR "digital forensics" OR cybercrime OR ransomware OR "data breach" OR javascript OR react',
  );

  const res = await fetchWithTimeout(u.toString(), 5000);
  if (!res.ok) throw new Error(`backup_http_${res.status}`);
  const raw = await res.json();
  const parsed = GNewsResp.safeParse(raw);
  if (!parsed.success) throw new Error("backup_bad_shape");

  const out: NewsArticle[] = [];
  for (const it of parsed.data.articles ?? []) {
    const url = safeUrl(it.url);
    const title = sanitizeText(it.title, 200);
    const description = sanitizeText(it.description, 400);
    if (!url || !title) continue;
    const cls = classify(`${title} ${description}`);
    if (!cls) continue;
    out.push({
      id: hashId(url),
      title,
      description,
      url,
      imageUrl: safeUrl(it.image) ?? undefined,
      source: sanitizeText(it.source?.name ?? "Unknown", 80),
      publishedAt: sanitizeText(it.publishedAt, 40) || new Date().toISOString(),
      category: cls.category,
      relevanceScore: cls.score,
      provider: "backup",
    });
  }
  return out;
}

function mergeDedupe(a: NewsArticle[], b: NewsArticle[]): NewsArticle[] {
  const seenUrl = new Set<string>();
  const seenTitle = new Set<string>();
  const merged = [...a, ...b];
  const out: NewsArticle[] = [];
  for (const item of merged) {
    const uKey = item.url.toLowerCase().replace(/[?#].*$/, "");
    const tKey = item.title.toLowerCase().slice(0, 60);
    if (seenUrl.has(uKey) || seenTitle.has(tKey)) continue;
    seenUrl.add(uKey);
    seenTitle.add(tKey);
    out.push(item);
  }
  return out.sort((x, y) => {
    if (y.relevanceScore !== x.relevanceScore) return y.relevanceScore - x.relevanceScore;
    return (Date.parse(y.publishedAt) || 0) - (Date.parse(x.publishedAt) || 0);
  });
}

/* ------------------------------------------------------------------ */
/* Cache + rate limit (in-memory, per worker instance)                 */
/* ------------------------------------------------------------------ */

const CACHE_TTL_MS = 20 * 60 * 1000;
const STALE_MAX_MS = 6 * 60 * 60 * 1000;

interface CacheEntry {
  at: number;
  data: NewsResponse;
}
const cache: { entry: CacheEntry | null } = { entry: null };

const rate = { count: 0, windowStart: 0 };
const RATE_MAX = 30;
const RATE_WINDOW = 10 * 60 * 1000;

function rateOk(): boolean {
  const now = Date.now();
  if (now - rate.windowStart > RATE_WINDOW) {
    rate.windowStart = now;
    rate.count = 0;
  }
  rate.count++;
  return rate.count <= RATE_MAX;
}

/* ------------------------------------------------------------------ */
/* Route                                                               */
/* ------------------------------------------------------------------ */

const CORS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Cache-Control": "public, max-age=60, s-maxage=1200",
};

export const Route = createFileRoute("/api/news")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: CORS }),
      GET: async () => {
        // Serve fresh cache immediately
        const now = Date.now();
        if (cache.entry && now - cache.entry.at < CACHE_TTL_MS) {
          return Response.json(cache.entry.data, { headers: CORS });
        }

        if (!rateOk()) {
          if (cache.entry) {
            const stale: NewsResponse = { ...cache.entry.data, stale: true };
            return Response.json(stale, { headers: CORS });
          }
          return Response.json(
            { articles: [], stale: false, generatedAt: new Date().toISOString(), providersUsed: [] },
            { status: 429, headers: CORS },
          );
        }

        const primaryKey = process.env.NEWS_PROVIDER_PRIMARY_KEY;
        const backupKey = process.env.NEWS_PROVIDER_BACKUP_KEY;
        const used: Array<"primary" | "backup"> = [];

        let primaryArticles: NewsArticle[] = [];
        let backupArticles: NewsArticle[] = [];

        if (primaryKey) {
          try {
            primaryArticles = await callPrimary(primaryKey);
            if (primaryArticles.length > 0) used.push("primary");
          } catch (err) {
            console.warn("[news] primary failed:", (err as Error).message);
          }
        }

        // Trigger backup if primary failed OR returned too few relevant stories
        if (backupKey && primaryArticles.length < 5) {
          try {
            backupArticles = await callBackup(backupKey);
            if (backupArticles.length > 0) used.push("backup");
          } catch (err) {
            console.warn("[news] backup failed:", (err as Error).message);
          }
        }

        const articles = mergeDedupe(primaryArticles, backupArticles);

        // If both providers failed and we have a stale cache within 6h, serve it.
        if (articles.length === 0 && cache.entry && now - cache.entry.at < STALE_MAX_MS) {
          const stale: NewsResponse = { ...cache.entry.data, stale: true };
          return Response.json(stale, { headers: CORS });
        }

        const payload: NewsResponse = {
          articles,
          stale: false,
          generatedAt: new Date().toISOString(),
          providersUsed: used,
        };

        if (articles.length > 0) {
          cache.entry = { at: now, data: payload };
        }

        return Response.json(payload, { headers: CORS });
      },
    },
  },
});
