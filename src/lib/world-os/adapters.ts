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

export type AdapterHealth = "ONLINE" | "DEGRADED" | "OFFLINE";

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
  healthCheck: () => Promise<{ health: AdapterHealth; detail: string }>;
  fetch: (opts: { indiaMode: boolean }) => Promise<WorldObject[]>;
  getTimestamp: () => string | null;
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
      const res = await fetch(
        "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson",
        { method: "HEAD", signal: AbortSignal.timeout(8000) },
      );
      if (!res.ok) {
        return { health: "DEGRADED" as const, detail: `HTTP ${res.status}` };
      }
      return { health: "ONLINE" as const, detail: "Feed reachable" };
    } catch (e) {
      return {
        health: "OFFLINE" as const,
        detail: e instanceof Error ? e.message : "Unreachable",
      };
    }
  },
  async fetch({ indiaMode }) {
    const url =
      "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson";
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
    const retrievedAt = setTs(this.id);
    let features = json.features ?? [];
    if (indiaMode) {
      features = features.filter((f) => {
        const [lng, lat] = f.geometry.coordinates;
        return lat >= 5 && lat <= 38 && lng >= 65 && lng <= 100;
      });
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
          whyVisible:
            "Public seismic bulletin for the selected time window. Shown because EARTH dimension is active.",
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

/** ADS-B public network — typically blocked in browsers without a proxy */
export const airTrafficAdapter: SourceAdapter = {
  id: "public-adsb",
  name: "Public air-traffic state",
  dimension: "AIR",
  license: "Public ADS-B aggregates (when reachable)",
  async healthCheck() {
    return {
      health: "OFFLINE" as const,
      detail:
        "Browser CORS / auth required. No proxy wired yet — AIR stays OFFLINE rather than inventing flights.",
    };
  },
  async fetch() {
    return [];
  },
  getTimestamp() {
    return null;
  },
};

export const WORLD_ADAPTERS: SourceAdapter[] = [
  usgsEarthquakeAdapter,
  openMeteoAdapter,
  airTrafficAdapter,
];

export const DIMENSIONS: {
  id: WorldDimension;
  label: string;
  stub?: boolean;
}[] = [
  { id: "SPACE", label: "SPACE", stub: true },
  { id: "AIR", label: "AIR" },
  { id: "SEA", label: "SEA", stub: true },
  { id: "EARTH", label: "EARTH" },
  { id: "WEATHER", label: "WEATHER" },
  { id: "GEO", label: "GEO", stub: true },
  { id: "INFRA", label: "INFRA", stub: true },
  { id: "SIGNALS", label: "SIGNALS", stub: true },
  { id: "DIGITAL", label: "DIGITAL", stub: true },
];
