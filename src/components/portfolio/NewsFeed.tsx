import { useEffect, useMemo, useState } from "react";
import type { NewsArticle, NewsCategory, NewsResponse } from "@/lib/news-types";
import { NEWS_CATEGORIES } from "@/lib/news-types";

const BREAKING_TERMS = /\b(breach|zero[- ]?day|exploited in the wild|ransomware attack|actively exploited|urgent|critical (?:cve|vulnerability))\b/i;

function relTime(iso: string): string {
  const t = Date.parse(iso);
  if (!t) return "recently";
  const diff = Date.now() - t;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return new Date(t).toLocaleDateString();
}

function readingTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

function ArticleCard({ a }: { a: NewsArticle }) {
  const breaking = BREAKING_TERMS.test(`${a.title} ${a.description}`);
  const [imgOk, setImgOk] = useState(Boolean(a.imageUrl));

  return (
    <article className="group flex flex-col overflow-hidden border border-border/60 bg-background/40 backdrop-blur transition-colors hover:border-accent/60">
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        {a.imageUrl && imgOk ? (
          <img
            src={a.imageUrl}
            alt=""
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgOk(false)}
            className="size-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
          />
        ) : (
          <div className="grid size-full place-items-center text-muted-foreground">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em]">No image</span>
          </div>
        )}
        <div className="absolute left-2 top-2 flex gap-1.5">
          <span className="border border-accent/40 bg-background/80 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.25em] text-accent">
            {a.category}
          </span>
          {breaking && (
            <span className="animate-pulse border border-destructive/60 bg-destructive/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.25em] text-destructive">
              Breaking
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-3 text-base font-semibold leading-snug text-foreground">
          <a
            href={a.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="hover:text-accent"
          >
            {a.title}
          </a>
        </h3>
        <p className="line-clamp-3 text-sm text-muted-foreground">{a.description}</p>
        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <span className="text-foreground/80">{a.source}</span>
          <span>· {relTime(a.publishedAt)}</span>
          <span>· {readingTime(a.description)}</span>
        </div>
      </div>
    </article>
  );
}

function Skeleton() {
  return (
    <div className="flex flex-col overflow-hidden border border-border/60 bg-background/40">
      <div className="aspect-[16/9] animate-pulse bg-muted/50" />
      <div className="space-y-2 p-4">
        <div className="h-4 w-3/4 animate-pulse bg-muted/50" />
        <div className="h-3 w-full animate-pulse bg-muted/40" />
        <div className="h-3 w-5/6 animate-pulse bg-muted/40" />
      </div>
    </div>
  );
}

export function NewsFeed({ limit }: { limit?: number } = {}) {
  const [data, setData] = useState<NewsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<NewsCategory | "All">("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/news", { headers: { accept: "application/json" } })
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return (await r.json()) as NewsResponse;
      })
      .then((d) => {
        if (!cancelled) setData(d);
      })
      .catch((e) => {
        if (!cancelled) setError((e as Error).message);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    if (!data) return [];
    const q = query.trim().toLowerCase();
    let list = data.articles;
    if (category !== "All") list = list.filter((a) => a.category === category);
    if (q) list = list.filter((a) => a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q));
    return typeof limit === "number" ? list.slice(0, limit) : list;
  }, [data, category, query, limit]);

  return (
    <section
      id="news"
      aria-label="Crime, Forensics and Technology Intelligence"
      className="relative mx-auto max-w-7xl px-6 py-24 md:px-10"
    >
      <header className="flex flex-col gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent">
          Intelligence feed · updated every 20 min
        </p>
        <h2 className="text-balance text-3xl font-bold leading-tight md:text-5xl">
          Crime, Forensics <span className="text-muted-foreground">&amp;</span> Technology Intelligence
        </h2>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Aggregated from two independent providers, filtered to the disciplines Tarik practises.
          Headlines link back to the original publisher — no articles are reproduced here.
          {data?.stale && (
            <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
              · Serving cached feed
            </span>
          )}
        </p>
      </header>

      <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {(["All", ...NEWS_CATEGORIES] as const).map((c) => {
            const selected = c === category;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                aria-pressed={selected}
                className={`border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
                  selected
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-muted-foreground hover:border-accent/60 hover:text-foreground"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
        <label className="relative w-full md:w-64">
          <span className="sr-only">Search headlines</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search headlines…"
            className="w-full border border-border bg-background/60 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-accent focus:outline-none"
          />
        </label>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {!data && !error &&
          Array.from({ length: limit ?? 6 }).map((_, i) => <Skeleton key={i} />)}
        {error && (
          <p className="col-span-full font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Feed unavailable · {error}
          </p>
        )}
        {data && filtered.length === 0 && !error && (
          <p className="col-span-full font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            No stories matched this filter.
          </p>
        )}
        {filtered.map((a) => (
          <ArticleCard key={a.id} a={a} />
        ))}
      </div>
    </section>
  );
}
