import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  RefreshCw,
  MapPin,
  Info,
  Shield,
} from "lucide-react";
import {
  DIMENSIONS,
  type AdapterHealth,
  type WorldDimension,
  type WorldObject,
} from "@/lib/world-os/adapters";
import { soundEngine } from "@/lib/sound-engine";
import { SystemStatusBar } from "@/components/system/SystemStatusBar";
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
}

function healthColor(h: AdapterHealth) {
  if (h === "ONLINE") return "text-emerald-400 border-emerald-500/40 bg-emerald-500/10";
  if (h === "DEGRADED") return "text-amber-300 border-amber-500/40 bg-amber-500/10";
  if (h === "AUTH_DEPENDENT") return "text-violet-200 border-violet-500/40 bg-violet-500/10";
  return "text-slate-400 border-white/10 bg-white/5";
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

export function WorldOSShell() {
  const [utc, setUtc] = useState("");
  const [dimension, setDimension] = useState<WorldDimension>("EARTH");
  const [indiaMode, setIndiaMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [objects, setObjects] = useState<WorldObject[]>([]);
  const [health, setHealth] = useState<HealthRow[]>([]);
  const [selected, setSelected] = useState<WorldObject | null>(null);
  const [error, setError] = useState<string | null>(null);
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
      setSelected(nextObjects[0] || null);
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") return;
      setError(e instanceof Error ? e.message : "World kernel offline");
      objectsRef.current = [];
      setObjects([]);
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
  const dimensionTitle = activeMeta?.stub
    ? `${dimension} — not wired`
    : (
        {
          EARTH: "Seismic Earth",
          WEATHER: "Weather samples",
          AIR: "Airborne state",
          SPACE: "Orbital catalog",
        } as Partial<Record<WorldDimension, string>>
      )[dimension] ?? `${dimension} dimension`;

  return (
    <div className="min-h-screen bg-[#050608] text-foreground">
      <div
        className="pointer-events-none fixed inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(98,230,255,0.12), transparent 55%), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(20,60,80,0.25), transparent)",
        }}
      />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050608]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-8">
          <div className="flex items-center gap-3">
            <Link
              to="/lab"
              onClick={() => soundEngine.playClick()}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground hover:text-[#62E6FF]"
            >
              <ArrowLeft className="size-3.5" /> Lab
            </Link>
            <div>
              <p className="font-display text-sm font-bold tracking-tight sm:text-base">
                TARIK ISLAM // WORLD OS
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Public data grid · source-derived only
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-wider">
            <span className="rounded border border-[#62E6FF]/30 bg-[#62E6FF]/10 px-2.5 py-1 text-[#62E6FF]">
              Public data grid
            </span>
            <span
              className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 ${healthColor(systemHealth)}`}
            >
              <SystemIndicator health={systemHealth} />
              Kernel {systemHealth}
            </span>
            <span className="rounded border border-white/10 bg-white/5 px-2.5 py-1 text-muted-foreground">
              {utc || "…"}
            </span>
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                setIndiaMode((v) => !v);
              }}
              className={`rounded-full border px-2.5 py-1 ${
                indiaMode
                  ? "border-[#62E6FF]/50 bg-[#62E6FF]/15 text-[#62E6FF]"
                  : "border-white/10 text-muted-foreground"
              }`}
            >
              <MapPin className="mr-1 inline size-3" />
              India mode {indiaMode ? "on" : "off"}
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={() => {
                soundEngine.playClick();
                void load(dimension, indiaMode);
              }}
              className="rounded-full border border-white/10 px-2.5 py-1 text-muted-foreground hover:text-foreground"
            >
              <RefreshCw className={`mr-1 inline size-3 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </div>

        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-2 px-4 pb-2 sm:px-8">
          <Link
            to="/find-someone"
            search={{ mode: "live", id: undefined, q: undefined }}
            onClick={() => soundEngine.playClick()}
            className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground hover:text-[#62E6FF]"
          >
            Find Details
          </Link>
          <Link
            to="/forensic-lab"
            onClick={() => soundEngine.playClick()}
            className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground hover:text-[#62E6FF]"
          >
            Forensic Lab
          </Link>
        </div>

        <div className="mx-auto flex max-w-[1600px] gap-1.5 overflow-x-auto px-4 pb-3 sm:px-8">
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
                className={`shrink-0 rounded-lg border px-3 py-2 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                  active
                    ? "border-[#62E6FF]/50 bg-[#62E6FF]/15 text-[#62E6FF]"
                    : "border-white/10 text-muted-foreground hover:text-foreground"
                }`}
              >
                {d.label}
                <span className={`ml-2 rounded px-1 ${healthColor(h)}`}>{h}</span>
              </button>
            );
          })}
        </div>
      </header>

      <main className="relative mx-auto max-w-[1600px] px-4 py-6 sm:px-8 sm:py-8">
        <section className="relative overflow-hidden rounded-none border border-white/10 bg-[#070a10] sm:rounded-2xl">
          <div className="absolute inset-x-0 top-0 z-10 flex flex-wrap items-end justify-between gap-3 border-b border-white/5 bg-gradient-to-b from-[#050608]/90 to-transparent px-4 py-4 sm:px-6">
            <div>
              <TechnicalLabel className="text-[#62E6FF]">{dimension}</TechnicalLabel>
              <h1 className="mt-1 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                {dimensionTitle}
              </h1>
              <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                Objects appear only when a public feed answers. Stub layers stay OFFLINE or
                AUTH_DEPENDENT — never padded with fake ships, cameras, or counters.
              </p>
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
          </div>

          <Suspense
            fallback={
              <div className="flex h-[min(62vh,560px)] items-center justify-center font-mono text-xs text-muted-foreground">
                Loading globe…
              </div>
            }
          >
            <WorldGlobe
              className="h-[min(62vh,560px)] w-full"
              objects={objects}
              indiaMode={indiaMode}
              selectedId={selected?.id}
              onSelect={handleSelect}
            />
          </Suspense>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          <section className="lg:col-span-7 space-y-3">
            <TechnicalLabel>Objects · {dimension}</TechnicalLabel>
            <div className="max-h-[22rem] space-y-2 overflow-y-auto">
              {loading && (
                <p className="font-mono text-xs text-muted-foreground">Retrieving public layer…</p>
              )}
              {!loading && objects.length === 0 && (
                <div className="border border-dashed border-white/10 px-4 py-8 text-sm text-muted-foreground">
                  No source-derived objects for {dimension}. Health above is honest —
                  this is not an empty fake map.
                </div>
              )}
              {objects.map((obj) => (
                <button
                  key={obj.id}
                  type="button"
                  onClick={() => {
                    soundEngine.playClick();
                    setSelected(obj);
                  }}
                  className={`w-full border px-4 py-3 text-left transition-colors ${
                    selected?.id === obj.id
                      ? "border-[#62E6FF]/40 bg-[#62E6FF]/10"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">{obj.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{obj.summary}</p>
                    </div>
                    {obj.magnitude && (
                      <span className="shrink-0 font-mono text-[10px] text-[#62E6FF]">
                        {obj.magnitude}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </section>

          <aside className="lg:col-span-5 space-y-6">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <Shield className="size-4 text-[#62E6FF]" />
                <TechnicalLabel>World kernel status</TechnicalLabel>
              </div>
              <ul className="space-y-2">
                {health.map((h) => (
                  <li
                    key={h.id}
                    className="flex items-start justify-between gap-3 border border-white/5 px-3 py-2 text-xs"
                  >
                    <div>
                      <p className="text-foreground">{h.dimension}</p>
                      <p className="mt-0.5 text-muted-foreground">{h.detail}</p>
                    </div>
                    <span
                      className={`shrink-0 rounded border px-1.5 py-0.5 font-mono text-[9px] ${healthColor(h.health)}`}
                    >
                      {h.health}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="mb-3 flex items-center gap-2">
                <Info className="size-4 text-[#62E6FF]" />
                <TechnicalLabel>Provenance · Why</TechnicalLabel>
              </div>
              {selected ? (
                <dl className="space-y-3 font-mono text-[11px]">
                  <div>
                    <dt className="text-muted-foreground">SOURCE</dt>
                    <dd className="mt-0.5 text-foreground">{selected.provenance.sourceLabel}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">RETRIEVED</dt>
                    <dd className="mt-0.5 text-foreground">{selected.provenance.retrievedAt}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">LAST UPDATE</dt>
                    <dd className="mt-0.5 text-foreground">{selected.observedAt}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">CONFIDENCE</dt>
                    <dd className="mt-0.5 text-[#62E6FF]">{selected.provenance.confidence}</dd>
                  </div>
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
                <p className="text-sm text-muted-foreground">
                  Select an object to inspect provenance.
                </p>
              )}
            </div>
          </aside>
        </div>

        <SystemStatusBar className="mt-8" />
      </main>
    </div>
  );
}
