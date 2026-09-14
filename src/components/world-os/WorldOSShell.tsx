import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  RefreshCw,
  MapPin,
  Info,
  Shield,
  Globe2,
} from "lucide-react";
import {
  DIMENSIONS,
  type AdapterHealth,
  type WorldDimension,
  type WorldObject,
} from "@/lib/world-os/adapters";
import { soundEngine } from "@/lib/sound-engine";
import { SystemIndicator, TechnicalLabel } from "@/components/system";

const WorldGlobe = lazy(() =>
  import("@/components/world-os/WorldGlobe").then((m) => ({ default: m.WorldGlobe })),
);

interface HealthRow {
  id: string;
  dimension: WorldDimension;
  health: AdapterHealth;
  detail: string;
  lastUpdate: string | null;
  stub?: boolean;
  license?: string;
}

function healthTone(h: AdapterHealth) {
  if (h === "ONLINE") return "text-emerald-400 border-emerald-500/35 bg-emerald-500/10";
  if (h === "DEGRADED") return "text-amber-300 border-amber-500/35 bg-amber-500/10";
  if (h === "AUTH_DEPENDENT") return "text-violet-200 border-violet-500/35 bg-violet-500/10";
  return "text-slate-400 border-white/10 bg-white/[0.03]";
}

function aggregateHealth(rows: HealthRow[]): AdapterHealth {
  const live = rows.filter((r) => !r.stub);
  if (live.some((r) => r.health === "ONLINE")) {
    if (live.some((r) => r.health === "OFFLINE" || r.health === "DEGRADED")) {
      return "DEGRADED";
    }
    return "ONLINE";
  }
  if (live.some((r) => r.health === "DEGRADED")) return "DEGRADED";
  if (rows.some((r) => r.health === "AUTH_DEPENDENT")) return "AUTH_DEPENDENT";
  return "OFFLINE";
}

function layerHealth(rows: HealthRow[]): AdapterHealth {
  if (rows.length === 0) return "OFFLINE";
  if (rows.some((r) => r.health === "ONLINE")) return "ONLINE";
  if (rows.some((r) => r.health === "DEGRADED")) return "DEGRADED";
  if (rows.some((r) => r.health === "AUTH_DEPENDENT")) return "AUTH_DEPENDENT";
  return "OFFLINE";
}

const DIMENSION_COPY: Partial<
  Record<WorldDimension, { title: string; blurb: string }>
> = {
  EARTH: {
    title: "Seismic Earth",
    blurb: "Public earthquake bulletin — positions only when the feed returns events.",
  },
  WEATHER: {
    title: "Weather samples",
    blurb: "Point forecasts at fixed cities — not a densified radar mosaic.",
  },
  AIR: {
    title: "Airborne state",
    blurb: "ADS-B aggregate sample. Empty sky means coverage or rate-limit, not invented flights.",
  },
  SPACE: {
    title: "Orbital catalog",
    blurb: "Public GP station elements. No fake ground tracks — globe plots only true lat/lng.",
  },
  SEA: {
    title: "Maritime AIS",
    blurb: "Authenticated AIS provider required — architecture slot only.",
  },
  GEO: {
    title: "Geospatial imagery",
    blurb: "Keyed basemap / imagery providers not wired.",
  },
  INFRA: {
    title: "Infrastructure",
    blurb: "No public camera mosaic in this slice.",
  },
  SIGNALS: {
    title: "RF / spectrum",
    blurb: "Licensed receivers / API keys required.",
  },
  DIGITAL: {
    title: "Digital surface",
    blurb: "No public digital-surface feed in this slice.",
  },
};

export function WorldOSShell() {
  const [utc, setUtc] = useState("");
  const [dimension, setDimension] = useState<WorldDimension>("EARTH");
  // Default OFF — India bbox often yields zero daily quakes and looks "broken"
  const [indiaMode, setIndiaMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [objects, setObjects] = useState<WorldObject[]>([]);
  const [health, setHealth] = useState<HealthRow[]>([]);
  const [selected, setSelected] = useState<WorldObject | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [retrievedAt, setRetrievedAt] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const objectsRef = useRef<WorldObject[]>([]);

  useEffect(() => {
    const tick = () =>
      setUtc(new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC");
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const load = useCallback(async (dim: WorldDimension, india: boolean) => {
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/intelligence?kind=world&dimension=${dim}&india=${india ? "1" : "0"}`,
        { signal: ac.signal },
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "World kernel failed");
      const nextObjects: WorldObject[] = json.objects || [];
      objectsRef.current = nextObjects;
      setHealth(json.health || []);
      setObjects(nextObjects);
      setRetrievedAt(json.retrievedAt || new Date().toISOString());
      setSelected((prev) => {
        if (prev && nextObjects.some((o) => o.id === prev.id)) {
          return nextObjects.find((o) => o.id === prev.id) || nextObjects[0] || null;
        }
        return nextObjects[0] || null;
      });
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") return;
      setError(e instanceof Error ? e.message : "World kernel offline");
      objectsRef.current = [];
      setObjects([]);
      setSelected(null);
    } finally {
      if (abortRef.current === ac) setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load(dimension, indiaMode);
    return () => abortRef.current?.abort();
  }, [dimension, indiaMode, load]);

  const handleSelect = useCallback((id: string) => {
    const obj = objectsRef.current.find((o) => o.id === id);
    if (obj) {
      soundEngine.playClick();
      setSelected(obj);
    }
  }, []);

  const dimHealth = useMemo(() => {
    const map = new Map<WorldDimension, AdapterHealth>();
    for (const d of DIMENSIONS) {
      map.set(d.id, layerHealth(health.filter((h) => h.dimension === d.id)));
    }
    return map;
  }, [health]);

  const systemHealth = aggregateHealth(health);
  const activeMeta = DIMENSIONS.find((d) => d.id === dimension);
  const copy = DIMENSION_COPY[dimension];
  const dimensionTitle = activeMeta?.stub
    ? `${copy?.title ?? dimension} — not wired`
    : copy?.title ?? `${dimension} dimension`;

  const positioned = objects.filter(
    (o) => typeof o.lat === "number" && typeof o.lng === "number",
  ).length;
  const catalogOnly = objects.length - positioned;
  const activeHealthRows = health.filter((h) => h.dimension === dimension);
  const wiredOnline = health.filter((h) => !h.stub && h.health === "ONLINE").length;
  const wiredDegraded = health.filter((h) => !h.stub && h.health === "DEGRADED").length;

  return (
    <div className="min-h-screen bg-[#050608] text-foreground">
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 50% -8%, rgba(98,230,255,0.08), transparent 55%), radial-gradient(ellipse 50% 35% at 90% 100%, rgba(18,40,55,0.35), transparent)",
        }}
      />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050608]/92 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-8">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              to="/lab"
              onClick={() => soundEngine.playClick()}
              className="inline-flex items-center gap-2 rounded-md border border-white/10 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground hover:text-[#62E6FF]"
            >
              <ArrowLeft className="size-3.5" /> Lab
            </Link>
            <div className="min-w-0">
              <p className="font-display text-sm font-bold tracking-tight sm:text-base truncate">
                WORLD OS
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground truncate">
                Tarik Digital Canvas · public data grid
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-wider">
            <span
              className={`inline-flex items-center gap-2 rounded-md border px-2.5 py-1 ${healthTone(systemHealth)}`}
            >
              <SystemIndicator health={systemHealth} />
              System {systemHealth}
            </span>
            <span className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-muted-foreground">
              Public data grid
            </span>
            <span className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-muted-foreground tabular-nums">
              {utc || "…"}
            </span>
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                setIndiaMode((v) => !v);
              }}
              className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 ${
                indiaMode
                  ? "border-[#62E6FF]/45 bg-[#62E6FF]/12 text-[#62E6FF]"
                  : "border-white/10 text-muted-foreground hover:text-foreground"
              }`}
              title="Filter positioned layers to South-Asia bbox where applicable"
            >
              <MapPin className="size-3" />
              India {indiaMode ? "on" : "off"}
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={() => {
                soundEngine.playClick();
                void load(dimension, indiaMode);
              }}
              className="inline-flex items-center gap-1.5 rounded-md border border-white/10 px-2.5 py-1 text-muted-foreground hover:text-foreground disabled:opacity-50"
            >
              <RefreshCw className={`size-3 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </div>

        <div className="mx-auto flex max-w-[1600px] items-center gap-2 overflow-x-auto px-4 pb-3 sm:px-8">
          {DIMENSIONS.map((d) => {
            const h = dimHealth.get(d.id) || "OFFLINE";
            const active = dimension === d.id;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setDimension(d.id);
                }}
                className={`shrink-0 rounded-md border px-3 py-2 text-left transition-colors ${
                  active
                    ? "border-[#62E6FF]/50 bg-[#62E6FF]/12"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <span
                  className={`block font-mono text-[10px] uppercase tracking-[0.18em] ${
                    active ? "text-[#62E6FF]" : "text-foreground"
                  }`}
                >
                  {d.label}
                </span>
                <span
                  className={`mt-1 inline-block rounded border px-1 py-px font-mono text-[8px] uppercase tracking-wider ${healthTone(h)}`}
                >
                  {h}
                </span>
              </button>
            );
          })}
        </div>
      </header>

      <main className="relative mx-auto max-w-[1600px] px-4 py-5 sm:px-8 sm:py-7">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <TechnicalLabel className="text-[#62E6FF]">{dimension}</TechnicalLabel>
            <h1 className="mt-1 font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {dimensionTitle}
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              {copy?.blurb}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            <span>
              Layer objects{" "}
              <strong className="text-foreground tabular-nums">{objects.length}</strong>
            </span>
            <span>
              Positioned{" "}
              <strong className="text-foreground tabular-nums">{positioned}</strong>
            </span>
            {catalogOnly > 0 && (
              <span>
                Catalog-only{" "}
                <strong className="text-foreground tabular-nums">{catalogOnly}</strong>
              </span>
            )}
            <span>
              Wired online{" "}
              <strong className="text-foreground tabular-nums">{wiredOnline}</strong>
              {wiredDegraded > 0 ? ` · ${wiredDegraded} degraded` : ""}
            </span>
          </div>
        </div>

        {error && (
          <p className="mb-4 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {error}
          </p>
        )}

        <section className="relative overflow-hidden border border-white/10 bg-[#070a10]">
          <Suspense
            fallback={
              <div className="flex h-[min(58vh,520px)] items-center justify-center font-mono text-xs text-muted-foreground">
                Initializing globe…
              </div>
            }
          >
            <WorldGlobe
              className="h-[min(58vh,520px)] w-full"
              objects={objects}
              indiaMode={indiaMode}
              selectedId={selected?.id}
              onSelect={handleSelect}
              loading={loading}
              dimension={dimension}
            />
          </Suspense>

          {!loading && objects.length === 0 && (
            <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-[#050608]/92 px-4 py-4 backdrop-blur-md sm:px-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#62E6FF]">
                    No source-derived objects
                  </p>
                  <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                    {activeMeta?.stub
                      ? "This dimension is an honest architecture stub — nothing is invented to fill the map."
                      : indiaMode
                        ? "India Mode filtered this layer to a South-Asia bbox. Zero events in-window is real — not a broken globe."
                        : "The public feed returned no plottable rows for this dimension right now."}
                  </p>
                </div>
                {indiaMode && !activeMeta?.stub && (
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      setIndiaMode(false);
                    }}
                    className="inline-flex items-center gap-2 rounded-md border border-[#62E6FF]/40 bg-[#62E6FF]/10 px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-[#62E6FF]"
                  >
                    <Globe2 className="size-3.5" />
                    Show global layer
                  </button>
                )}
              </div>
            </div>
          )}
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          <section className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <TechnicalLabel>Objects · {dimension}</TechnicalLabel>
              {retrievedAt && (
                <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                  Retrieved {retrievedAt}
                </span>
              )}
            </div>
            <div className="max-h-[24rem] space-y-1.5 overflow-y-auto border border-white/10 bg-[#070a10]/80 p-1">
              {loading && (
                <p className="px-3 py-6 font-mono text-xs text-muted-foreground">
                  Retrieving public layer…
                </p>
              )}
              {!loading && objects.length === 0 && (
                <div className="px-4 py-10 text-center text-sm text-muted-foreground">
                  Empty result set — health panel at right remains authoritative.
                </div>
              )}
              {objects.map((obj) => {
                const hasPos =
                  typeof obj.lat === "number" && typeof obj.lng === "number";
                return (
                  <button
                    key={obj.id}
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      setSelected(obj);
                    }}
                    className={`w-full px-3 py-2.5 text-left transition-colors ${
                      selected?.id === obj.id
                        ? "bg-[#62E6FF]/12"
                        : "hover:bg-white/[0.03]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">
                          {obj.title}
                        </p>
                        <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                          {obj.summary}
                        </p>
                        <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-muted-foreground/80">
                          {hasPos ? "Positioned" : "Catalog-only"} ·{" "}
                          {obj.provenance.confidence}
                        </p>
                      </div>
                      {obj.magnitude && (
                        <span className="shrink-0 font-mono text-[10px] text-[#62E6FF]">
                          {obj.magnitude}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          <aside className="lg:col-span-5 space-y-5">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Shield className="size-3.5 text-[#62E6FF]" />
                <TechnicalLabel>Source health</TechnicalLabel>
              </div>
              <ul className="divide-y divide-white/5 border border-white/10">
                {(activeHealthRows.length ? activeHealthRows : health).map((h) => (
                  <li
                    key={h.id}
                    className="flex items-start justify-between gap-3 px-3 py-2.5 text-xs"
                  >
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] uppercase tracking-wider text-foreground">
                        {h.dimension}
                        {h.stub ? " · stub" : ""}
                      </p>
                      <p className="mt-0.5 text-muted-foreground">{h.detail}</p>
                    </div>
                    <span
                      className={`shrink-0 rounded border px-1.5 py-0.5 font-mono text-[9px] ${healthTone(h.health)}`}
                    >
                      {h.health}
                    </span>
                  </li>
                ))}
              </ul>
              {activeHealthRows.length > 0 && health.length > activeHealthRows.length && (
                <details className="mt-2 group">
                  <summary className="cursor-pointer font-mono text-[10px] uppercase tracking-wider text-muted-foreground hover:text-[#62E6FF]">
                    All adapters ({health.length})
                  </summary>
                  <ul className="mt-2 divide-y divide-white/5 border border-white/10">
                    {health.map((h) => (
                      <li
                        key={`all-${h.id}`}
                        className="flex items-start justify-between gap-3 px-3 py-2 text-xs"
                      >
                        <p className="text-muted-foreground">
                          {h.dimension} · {h.detail}
                        </p>
                        <span
                          className={`shrink-0 rounded border px-1.5 py-0.5 font-mono text-[9px] ${healthTone(h.health)}`}
                        >
                          {h.health}
                        </span>
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2">
                <Info className="size-3.5 text-[#62E6FF]" />
                <TechnicalLabel>Provenance · Why</TechnicalLabel>
              </div>
              {selected ? (
                <dl className="space-y-3 border border-white/10 bg-[#070a10]/80 p-4 font-mono text-[11px]">
                  <div>
                    <dt className="text-muted-foreground">SOURCE</dt>
                    <dd className="mt-0.5 text-foreground">
                      {selected.provenance.sourceLabel}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">LICENSE</dt>
                    <dd className="mt-0.5 text-foreground">{selected.provenance.license}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">RETRIEVED</dt>
                    <dd className="mt-0.5 text-foreground">
                      {selected.provenance.retrievedAt}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">OBSERVED</dt>
                    <dd className="mt-0.5 text-foreground">{selected.observedAt}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">CONFIDENCE</dt>
                    <dd className="mt-0.5 text-[#62E6FF]">
                      {selected.provenance.confidence}
                    </dd>
                  </div>
                  {(typeof selected.lat === "number" && typeof selected.lng === "number") && (
                    <div>
                      <dt className="text-muted-foreground">COORDINATES</dt>
                      <dd className="mt-0.5 text-foreground">
                        {selected.lat.toFixed(3)}, {selected.lng.toFixed(3)}
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-muted-foreground">WHY AM I SEEING THIS?</dt>
                    <dd className="mt-0.5 leading-relaxed text-foreground">
                      {selected.provenance.whyVisible}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">LIMITATIONS</dt>
                    <dd className="mt-0.5 space-y-1 text-muted-foreground">
                      {selected.provenance.limitations.map((l) => (
                        <p key={l}>• {l}</p>
                      ))}
                    </dd>
                  </div>
                </dl>
              ) : (
                <p className="border border-dashed border-white/10 px-4 py-6 text-sm text-muted-foreground">
                  Select an object to inspect provenance.
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-wider">
              <Link
                to="/find-someone"
                search={{ mode: "live", id: undefined, q: undefined }}
                onClick={() => soundEngine.playClick()}
                className="rounded-md border border-white/10 px-2.5 py-1.5 text-muted-foreground hover:text-[#62E6FF]"
              >
                FIND DETAILS
              </Link>
              <Link
                to="/forensic-lab"
                onClick={() => soundEngine.playClick()}
                className="rounded-md border border-white/10 px-2.5 py-1.5 text-muted-foreground hover:text-[#62E6FF]"
              >
                FORENSIC LAB
              </Link>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
