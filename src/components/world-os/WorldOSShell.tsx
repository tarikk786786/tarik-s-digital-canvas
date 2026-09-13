import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Globe2,
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

interface HealthRow {
  id: string;
  dimension: WorldDimension;
  health: AdapterHealth;
  detail: string;
  lastUpdate: string | null;
}

function healthColor(h: AdapterHealth) {
  if (h === "ONLINE") return "text-emerald-400 border-emerald-500/40 bg-emerald-500/10";
  if (h === "DEGRADED") return "text-amber-300 border-amber-500/40 bg-amber-500/10";
  return "text-slate-400 border-white/10 bg-white/5";
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

  useEffect(() => {
    const tick = () => setUtc(new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC");
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const load = async (dim: WorldDimension, india: boolean) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/intelligence?kind=world&dimension=${dim}&india=${india ? "1" : "0"}`,
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "World kernel failed");
      setHealth(json.health || []);
      setObjects(json.objects || []);
      setSelected((json.objects || [])[0] || null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "World kernel offline");
      setObjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load(dimension, indiaMode);
  }, [dimension, indiaMode]);

  const dimHealth = useMemo(() => {
    const map = new Map<WorldDimension, AdapterHealth>();
    for (const d of DIMENSIONS) {
      const rows = health.filter((h) => h.dimension === d.id);
      if (d.stub && rows.length === 0) {
        map.set(d.id, "OFFLINE");
        continue;
      }
      if (rows.some((r) => r.health === "ONLINE")) map.set(d.id, "ONLINE");
      else if (rows.some((r) => r.health === "DEGRADED")) map.set(d.id, "DEGRADED");
      else map.set(d.id, "OFFLINE");
    }
    return map;
  }, [health]);

  return (
    <div className="min-h-screen bg-[#050608] text-foreground">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050608]/95 backdrop-blur-xl">
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
              <p className="font-display text-sm font-bold tracking-tight">
                TARIK ISLAM // WORLD OS
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Public data grid · source-derived only
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-wider">
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-emerald-300">
              System online
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

      <main className="mx-auto grid max-w-[1600px] gap-6 px-4 py-8 sm:px-8 lg:grid-cols-12">
        <section className="lg:col-span-7 space-y-4">
          <div className="rounded-2xl border border-white/10 bg-[#0A0D12] p-6">
            <div className="flex items-center gap-2 mb-4">
              <Globe2 className="size-4 text-[#62E6FF]" />
              <h1 className="font-display text-2xl font-bold tracking-tight">
                {dimension} dimension
              </h1>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Live objects below are pulled from public feeds when ONLINE. Stub dimensions
              stay OFFLINE — never padded with fake aircraft, ships, or cameras.
            </p>
            {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
            <div className="mt-6 space-y-2 max-h-[28rem] overflow-y-auto">
              {loading && (
                <p className="font-mono text-xs text-muted-foreground">Retrieving public layer…</p>
              )}
              {!loading && objects.length === 0 && (
                <div className="rounded-xl border border-dashed border-white/10 p-6 text-sm text-muted-foreground">
                  No source-derived objects for {dimension}. Kernel health is shown honestly —
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
                  className={`w-full rounded-xl border px-4 py-3 text-left transition-colors ${
                    selected?.id === obj.id
                      ? "border-[#62E6FF]/40 bg-[#62E6FF]/10"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-sm text-foreground">{obj.title}</p>
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
          </div>
        </section>

        <aside className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-white/10 bg-[#0A0D12] p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="size-4 text-[#62E6FF]" />
              <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                World kernel status
              </h2>
            </div>
            <ul className="space-y-2">
              {health.map((h) => (
                <li
                  key={h.id}
                  className="flex items-start justify-between gap-3 rounded-lg border border-white/5 px-3 py-2 text-xs"
                >
                  <div>
                    <p className="text-foreground">{h.dimension}</p>
                    <p className="text-muted-foreground mt-0.5">{h.detail}</p>
                  </div>
                  <span className={`shrink-0 rounded border px-1.5 py-0.5 font-mono text-[9px] ${healthColor(h.health)}`}>
                    {h.health}
                  </span>
                </li>
              ))}
              {DIMENSIONS.filter((d) => d.stub).map((d) => (
                <li
                  key={`stub-${d.id}`}
                  className="flex items-start justify-between gap-3 rounded-lg border border-white/5 px-3 py-2 text-xs"
                >
                  <div>
                    <p className="text-foreground">{d.id}</p>
                    <p className="text-muted-foreground mt-0.5">Architecture stub — feed not wired</p>
                  </div>
                  <span className={`shrink-0 rounded border px-1.5 py-0.5 font-mono text-[9px] ${healthColor("OFFLINE")}`}>
                    OFFLINE
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0A0D12] p-6">
            <div className="flex items-center gap-2 mb-4">
              <Info className="size-4 text-[#62E6FF]" />
              <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                Provenance
              </h2>
            </div>
            {selected ? (
              <dl className="space-y-3 font-mono text-[11px]">
                <div>
                  <dt className="text-muted-foreground">SOURCE</dt>
                  <dd className="text-foreground mt-0.5">{selected.provenance.sourceLabel}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">RETRIEVED</dt>
                  <dd className="text-foreground mt-0.5">{selected.provenance.retrievedAt}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">LAST UPDATE</dt>
                  <dd className="text-foreground mt-0.5">{selected.observedAt}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">CONFIDENCE</dt>
                  <dd className="text-[#62E6FF] mt-0.5">{selected.provenance.confidence}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">WHY AM I SEEING THIS?</dt>
                  <dd className="text-foreground mt-0.5 leading-relaxed">
                    {selected.provenance.whyVisible}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">LIMITATIONS</dt>
                  <dd className="text-muted-foreground mt-0.5 space-y-1">
                    {selected.provenance.limitations.map((l) => (
                      <p key={l}>• {l}</p>
                    ))}
                  </dd>
                </div>
              </dl>
            ) : (
              <p className="text-sm text-muted-foreground">Select an object to inspect provenance.</p>
            )}
          </div>
        </aside>
      </main>
    </div>
  );
}
