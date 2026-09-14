/**
 * WORLD OS source adapters — honest health only.
 * Never invent LIVE counters. Provider names stay in provenance, not chrome.
 */

export type WorldDimension =
  | "SPACE"
  | "AIR"
  | "SEA"
  | "EARTH"
  | "WEATHER"
  | "GEO"
  | "INFRA"
  | "SIGNALS"
  | "DIGITAL";

export type AdapterHealth =
  | "ONLINE"
  | "DEGRADED"
  | "OFFLINE"
  | "AUTH_DEPENDENT";

export interface WorldObject {
  id: string;
  dimension: WorldDimension;
  title: string;
  summary: string;
  lat?: number;
  lng?: number;
  magnitude?: string;
  observedAt: string;
  provenance: {
    sourceId: string;
    sourceLabel: string;
    license: string;
    retrievedAt: string;
    confidence: "VERIFIED" | "SUPPORTED" | "PROBABLE" | "UNCERTAIN";
    whyVisible: string;
    limitations: string[];
  };
}

export interface SourceAdapter {
  id: string;
  name: string;
  dimension: WorldDimension;
  license: string;
  /** When true, dimension is architecture-only until a feed is wired. */
  stub?: boolean;
  healthCheck: () => Promise<{ health: AdapterHealth; detail: string }>;
  fetch: (opts: { indiaMode: boolean }) => Promise<WorldObject[]>;
  getTimestamp: () => string | null;
}

/** Honest non-live slot — never invents objects or decorative counters. */
function capabilityStub(opts: {
  id: string;
  name: string;
  dimension: WorldDimension;
  health: "OFFLINE" | "AUTH_DEPENDENT";
  detail: string;
  license?: string;
}): SourceAdapter {
  return {
    id: opts.id,
    name: opts.name,
    dimension: opts.dimension,
    license: opts.license ?? "n/a — feed not wired",
    stub: true,
    async healthCheck() {
      return { health: opts.health, detail: opts.detail };
    },
    async fetch() {
      return [];
    },
    getTimestamp() {
      return null;
    },
  };
}

const timestamps = new Map<string, string>();

function setTs(id: string) {
  const t = new Date().toISOString();
  timestamps.set(id, t);
  return t;
}

/** USGS significant earthquakes — public GeoJSON, CORS-friendly */
export const usgsEarthquakeAdapter: SourceAdapter = {
  id: "usgs-quakes",
  name: "Public seismic bulletin",
  dimension: "EARTH",
  license: "USGS public domain",
  async healthCheck() {
    try {
      // GET (not HEAD) — USGS/CDN often mishandle HEAD and false-negatives health
      const res = await fetch(
        "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson",
        { signal: AbortSignal.timeout(10000) },
      );
      if (!res.ok) {
        return { health: "DEGRADED" as const, detail: `HTTP ${res.status}` };
      }
      return { health: "ONLINE" as const, detail: "M2.5+ day feed reachable" };
    } catch (e) {
      return {
        health: "OFFLINE" as const,
        detail: e instanceof Error ? e.message : "Unreachable",
      };
    }
  },
  async fetch({ indiaMode }) {
    // Prefer day feed; if India Mode yields empty, widen to week (still real events only)
    const dayUrl =
      "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson";
    const weekUrl =
      "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson";

    const loadFeatures = async (url: string) => {
      const res = await fetch(url, { signal: AbortSignal.timeout(12000) });
      if (!res.ok) throw new Error(`Seismic feed HTTP ${res.status}`);
      const json = (await res.json()) as {
        features?: Array<{
          id: string;
          properties: {
            mag: number;
            place: string;
            time: number;
            title: string;
          };
          geometry: { coordinates: [number, number, number] };
        }>;
      };
      return json.features ?? [];
    };

    const inIndia = (
      f: { geometry: { coordinates: [number, number, number] } },
    ) => {
      const [lng, lat] = f.geometry.coordinates;
      return lat >= 5 && lat <= 38 && lng >= 65 && lng <= 100;
    };

    const retrievedAt = setTs(this.id);
    let features = await loadFeatures(dayUrl);
    let windowLabel = "past day";
    if (indiaMode) {
      features = features.filter(inIndia);
      if (features.length === 0) {
        const week = await loadFeatures(weekUrl);
        features = week.filter(inIndia);
        windowLabel = "past week (day window empty in bbox)";
      }
    }
    return features.slice(0, 24).map((f) => {
      const [lng, lat] = f.geometry.coordinates;
      return {
        id: f.id,
        dimension: "EARTH" as const,
        title: f.properties.title || `M ${f.properties.mag}`,
        summary: f.properties.place,
        lat,
        lng,
        magnitude: `M ${f.properties.mag}`,
        observedAt: new Date(f.properties.time).toISOString(),
        provenance: {
          sourceId: this.id,
          sourceLabel: this.name,
          license: this.license,
          retrievedAt,
          confidence: "VERIFIED" as const,
          whyVisible: `Public seismic bulletin (${windowLabel}). Shown because EARTH dimension is active.`,
          limitations: [
            "Magnitude and location are agency-reported estimates.",
            indiaMode
              ? "India Mode filters to South-Asia bbox — events outside are hidden, not absent from Earth."
              : "Global feed; density is not fabricated.",
          ],
        },
      };
    });
  },
  getTimestamp() {
    return timestamps.get(this.id) ?? null;
  },
};

/** Open-Meteo current weather for a region — free, CORS-friendly */
export const openMeteoAdapter: SourceAdapter = {
  id: "open-meteo-current",
  name: "Regional weather sample",
  dimension: "WEATHER",
  license: "Open-Meteo (CC BY 4.0 attribution)",
  async healthCheck() {
    try {
      const res = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=20.3&longitude=85.8&current=temperature_2m",
        { signal: AbortSignal.timeout(8000) },
      );
      if (!res.ok) return { health: "DEGRADED" as const, detail: `HTTP ${res.status}` };
      return { health: "ONLINE" as const, detail: "Forecast API reachable" };
    } catch (e) {
      return {
        health: "OFFLINE" as const,
        detail: e instanceof Error ? e.message : "Unreachable",
      };
    }
  },
  async fetch({ indiaMode }) {
    const points = indiaMode
      ? [
          { label: "Bhubaneswar", lat: 20.2961, lng: 85.8245 },
          { label: "Delhi", lat: 28.6139, lng: 77.209 },
          { label: "Mumbai", lat: 19.076, lng: 72.8777 },
        ]
      : [
          { label: "Bhubaneswar", lat: 20.2961, lng: 85.8245 },
          { label: "Singapore", lat: 1.3521, lng: 103.8198 },
          { label: "London", lat: 51.5074, lng: -0.1278 },
        ];

    const retrievedAt = setTs(this.id);
    const out: WorldObject[] = [];
    for (const p of points) {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${p.lat}&longitude=${p.lng}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`,
        { signal: AbortSignal.timeout(10000) },
      );
      if (!res.ok) continue;
      const json = (await res.json()) as {
        current?: {
          time: string;
          temperature_2m: number;
          relative_humidity_2m: number;
          weather_code: number;
          wind_speed_10m: number;
        };
      };
      const c = json.current;
      if (!c) continue;
      out.push({
        id: `wx-${p.label.toLowerCase()}`,
        dimension: "WEATHER",
        title: `${p.label} — ${c.temperature_2m}°C`,
        summary: `Humidity ${c.relative_humidity_2m}% · Wind ${c.wind_speed_10m} km/h · code ${c.weather_code}`,
        lat: p.lat,
        lng: p.lng,
        magnitude: `${c.temperature_2m}°C`,
        observedAt: c.time,
        provenance: {
          sourceId: this.id,
          sourceLabel: this.name,
          license: this.license,
          retrievedAt,
          confidence: "VERIFIED",
          whyVisible:
            "Sampled current conditions for World OS WEATHER dimension. Point locations are fixed samples, not a densified fake grid.",
          limitations: [
            "Point forecast only — not a national radar mosaic.",
            "Weather codes are WMO numeric; interpretation is approximate.",
          ],
        },
      });
    }
    return out;
  },
  getTimestamp() {
    return timestamps.get(this.id) ?? null;
  },
};

/**
 * OpenSky Network state vectors — fetched server-side (browser CORS blocks direct calls).
 * Anonymous API is rate-limited; we sample a bbox and never invent flights.
 */
export const airTrafficAdapter: SourceAdapter = {
  id: "opensky-states",
  name: "Public air-traffic state",
  dimension: "AIR",
  license: "OpenSky Network (CC BY-SA / terms of use)",
  async healthCheck() {
    try {
      // Tight India corridor — faster probe than a wide bbox
      const res = await fetch(
        "https://opensky-network.org/api/states/all?lamin=18&lomin=72&lamax=23&lomax=78",
        {
          signal: AbortSignal.timeout(8000),
          headers: { Accept: "application/json" },
        },
      );
      if (res.status === 429) {
        return { health: "DEGRADED" as const, detail: "Rate limited (429)" };
      }
      if (!res.ok) {
        return { health: "DEGRADED" as const, detail: `HTTP ${res.status}` };
      }
      return { health: "ONLINE" as const, detail: "OpenSky reachable via server proxy" };
    } catch (e) {
      return {
        health: "DEGRADED" as const,
        detail: e instanceof Error ? e.message : "Probe timed out",
      };
    }
  },
  async fetch({ indiaMode }) {
    // One primary bbox first (timeout-friendly). Never invent flights.
    const regions = indiaMode
      ? [{ lamin: 8, lomin: 68, lamax: 35, lomax: 97 }]
      : [
          { lamin: 8, lomin: 68, lamax: 35, lomax: 97 },
          { lamin: 35, lomin: -10, lamax: 55, lomax: 20 },
        ];

    const retrievedAt = setTs(this.id);
    let observedAt = retrievedAt;
    const states: Array<Array<string | number | boolean | null>> = [];
    let sawOk = false;
    let lastErr: string | null = null;

    for (const bbox of regions) {
      const qs = new URLSearchParams({
        lamin: String(bbox.lamin),
        lomin: String(bbox.lomin),
        lamax: String(bbox.lamax),
        lomax: String(bbox.lomax),
      });
      try {
        const res = await fetch(`https://opensky-network.org/api/states/all?${qs}`, {
          signal: AbortSignal.timeout(9000),
          headers: { Accept: "application/json" },
        });
        if (res.status === 429) {
          lastErr = "OpenSky rate limited";
          continue;
        }
        if (!res.ok) {
          lastErr = `OpenSky HTTP ${res.status}`;
          continue;
        }
        const json = (await res.json()) as {
          time?: number;
          states?: Array<Array<string | number | boolean | null>>;
        };
        sawOk = true;
        if (json.time) observedAt = new Date(json.time * 1000).toISOString();
        states.push(...(json.states ?? []));
        if (states.length >= 20) break;
      } catch (e) {
        lastErr = e instanceof Error ? e.message : "Fetch failed";
      }
    }

    if (!sawOk) throw new Error(lastErr || "OpenSky unreachable");

    // Prefer airborne with position; cap so UI stays readable
    const withPos = states.filter((s) => {
      const lng = s[5];
      const lat = s[6];
      const onGround = s[8];
      return typeof lng === "number" && typeof lat === "number" && onGround !== true;
    });
    const sample = withPos.slice(0, 40);
    return sample.map((s) => {
      const icao24 = String(s[0] ?? "unknown");
      const callsign = String(s[1] ?? "").trim() || icao24.toUpperCase();
      const country = String(s[2] ?? "—");
      const lng = s[5] as number;
      const lat = s[6] as number;
      const alt = typeof s[7] === "number" ? s[7] : null;
      const vel = typeof s[9] === "number" ? s[9] : null;
      return {
        id: `air-${icao24}`,
        dimension: "AIR" as const,
        title: callsign,
        summary: `${country}${alt != null ? ` · ${Math.round(alt)} m` : ""}${
          vel != null ? ` · ${Math.round(vel)} m/s` : ""
        }`,
        lat,
        lng,
        magnitude: alt != null ? `${Math.round(alt)} m` : undefined,
        observedAt,
        provenance: {
          sourceId: this.id,
          sourceLabel: this.name,
          license: this.license,
          retrievedAt,
          confidence: "SUPPORTED" as const,
          whyVisible:
            "Airborne state vector from the public ADS-B aggregate for the active AIR dimension and India Mode bbox.",
          limitations: [
            "Coverage depends on volunteer receivers — empty sky is not proof of no flights.",
            "Anonymous OpenSky access is rate-limited; DEGRADED/OFFLINE means the feed, not your network alone.",
            indiaMode
              ? "India Mode restricts to South-Asia bbox."
              : "Global bbox sample capped — not a complete world fleet dump.",
          ],
        },
      };
    });
  },
  getTimestamp() {
    return timestamps.get(this.id) ?? null;
  },
};

/** CelesTrak GP JSON — public stations group (ISS + crewed) for SPACE dimension */
export const spaceStationsAdapter: SourceAdapter = {
  id: "celestrak-stations",
  name: "Public space-station catalog",
  dimension: "SPACE",
  license: "CelesTrak / NORAD GP (public catalog)",
  async healthCheck() {
    try {
      const res = await fetch(
        "https://celestrak.org/NORAD/elements/gp.php?GROUP=stations&FORMAT=json",
        { signal: AbortSignal.timeout(10000), headers: { Accept: "application/json" } },
      );
      if (!res.ok) return { health: "DEGRADED" as const, detail: `HTTP ${res.status}` };
      return { health: "ONLINE" as const, detail: "CelesTrak stations reachable" };
    } catch (e) {
      return {
        health: "OFFLINE" as const,
        detail: e instanceof Error ? e.message : "Unreachable",
      };
    }
  },
  async fetch() {
    const res = await fetch(
      "https://celestrak.org/NORAD/elements/gp.php?GROUP=stations&FORMAT=json",
      { signal: AbortSignal.timeout(12000), headers: { Accept: "application/json" } },
    );
    if (!res.ok) throw new Error(`CelesTrak HTTP ${res.status}`);
    const rows = (await res.json()) as Array<{
      OBJECT_NAME?: string;
      NORAD_CAT_ID?: number;
      EPOCH?: string;
      MEAN_MOTION?: number;
      INCLINATION?: number;
    }>;
    const retrievedAt = setTs(this.id);
    return (rows ?? []).slice(0, 16).map((r, i) => {
      const name = r.OBJECT_NAME?.trim() || `Object ${r.NORAD_CAT_ID ?? i}`;
      const periodMin =
        r.MEAN_MOTION && r.MEAN_MOTION > 0 ? 1440 / r.MEAN_MOTION : undefined;
      return {
        id: `space-${r.NORAD_CAT_ID ?? i}`,
        dimension: "SPACE" as const,
        title: name,
        summary: [
          r.NORAD_CAT_ID != null ? `NORAD ${r.NORAD_CAT_ID}` : null,
          r.INCLINATION != null ? `inc ${r.INCLINATION.toFixed(1)}°` : null,
          periodMin != null ? `period ~${periodMin.toFixed(0)} min` : null,
        ]
          .filter(Boolean)
          .join(" · "),
        // Catalog entries are orbital elements, not live lat/lng — no fake ground track.
        observedAt: r.EPOCH
          ? new Date(/Z$/i.test(r.EPOCH) ? r.EPOCH : `${r.EPOCH}Z`).toISOString()
          : retrievedAt,
        provenance: {
          sourceId: this.id,
          sourceLabel: this.name,
          license: this.license,
          retrievedAt,
          confidence: "VERIFIED" as const,
          whyVisible:
            "Public GP catalog for crewed/station objects. Shown because SPACE is active — orbital elements, not invented positions.",
          limitations: [
            "No live ground track computed in this slice — globe markers omit objects without lat/lng.",
            "Epoch is element set age, not a real-time telemetry ping.",
          ],
        },
      };
    });
  },
  getTimestamp() {
    return timestamps.get(this.id) ?? null;
  },
};

/** Maritime AIS — commercial / token streams; no anonymous public dump in this slice. */
export const seaAisStub = capabilityStub({
  id: "ais-stream",
  name: "Maritime AIS stream",
  dimension: "SEA",
  health: "AUTH_DEPENDENT",
  detail: "Requires authenticated AIS provider credentials — not wired",
  license: "Provider ToS (when configured)",
});

export const geoImageryStub = capabilityStub({
  id: "geo-imagery",
  name: "Geospatial imagery layer",
  dimension: "GEO",
  health: "AUTH_DEPENDENT",
  detail: "Satellite / basemap tiles need keyed providers — not wired",
});

export const infraCamerasStub = capabilityStub({
  id: "infra-cameras",
  name: "Infrastructure camera grid",
  dimension: "INFRA",
  health: "OFFLINE",
  detail: "No public camera mosaic wired — architecture stub only",
});

export const signalsSpectrumStub = capabilityStub({
  id: "signals-spectrum",
  name: "RF / spectrum observation",
  dimension: "SIGNALS",
  health: "AUTH_DEPENDENT",
  detail: "Spectrum feeds require licensed receivers / API keys — not wired",
});

export const digitalSurfaceStub = capabilityStub({
  id: "digital-surface",
  name: "Digital surface telemetry",
  dimension: "DIGITAL",
  health: "OFFLINE",
  detail: "No public digital-surface feed in this slice — architecture stub only",
});

export const WORLD_ADAPTERS: SourceAdapter[] = [
  spaceStationsAdapter,
  airTrafficAdapter,
  seaAisStub,
  usgsEarthquakeAdapter,
  openMeteoAdapter,
  geoImageryStub,
  infraCamerasStub,
  signalsSpectrumStub,
  digitalSurfaceStub,
];

export const DIMENSIONS: {
  id: WorldDimension;
  label: string;
  stub?: boolean;
}[] = [
  { id: "SPACE", label: "SPACE" },
  { id: "AIR", label: "AIR" },
  { id: "SEA", label: "SEA", stub: true },
  { id: "EARTH", label: "EARTH" },
  { id: "WEATHER", label: "WEATHER" },
  { id: "GEO", label: "GEO", stub: true },
  { id: "INFRA", label: "INFRA", stub: true },
  { id: "SIGNALS", label: "SIGNALS", stub: true },
  { id: "DIGITAL", label: "DIGITAL", stub: true },
];
