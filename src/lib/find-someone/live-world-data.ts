/**
 * WORLD LAYER — Demo geospatial & telemetry dataset for FIND DETAILS.
 * All entities are simulated for the portfolio lab. Not live OpenSky / AIS / camera feeds.
 */

export type LiveWorldLayer =
  "all" | "satellites" | "aircraft" | "ships" | "cells" | "cameras" | "events";

export interface LatLng {
  lat: number;
  lng: number;
  alt?: number; // km or ft
}

export interface SatelliteEntity {
  id: string;
  name: string;
  noradId: number;
  type: "earth_observation" | "navigation" | "communication" | "scientific" | "station";
  lat: number;
  lng: number;
  altitudeKm: number;
  velocityKmS: number;
  inclinationDeg: number;
  periodMin: number;
  operator: string;
  launchYear: number;
  status: "ACTIVE" | "OPERATIONAL";
  footprintRadiusKm: number;
  tleEpoch: string;
}

export interface AircraftEntity {
  id: string;
  callsign: string;
  icao24: string;
  operator: string;
  aircraftType: string;
  origin: string;
  destination: string;
  lat: number;
  lng: number;
  altitudeFt: number;
  velocityKts: number;
  headingDeg: number;
  verticalRateFpm: number;
  squawk: string;
  lastSeenSecAgo: number;
  source: "Demo simulation (not a live feed)";
}

export interface ShipEntity {
  id: string;
  name: string;
  mmsi: string;
  imo: string;
  vesselType:
    "Crude Oil Tanker" | "Container Ship" | "Oceanographic Research" | "Bulk Carrier" | "Cargo";
  flag: string;
  lat: number;
  lng: number;
  speedKts: number;
  headingDeg: number;
  draughtM: number;
  destination: string;
  eta: string;
  source: "Demo simulation (not a live feed)";
}

export interface CellTowerEntity {
  id: string;
  mcc: number; // Mobile Country Code (404 = India)
  mnc: number; // Mobile Network Code (45 = Airtel, 86 = Jio)
  operator: string;
  technology: "LTE-B3 (1800MHz)" | "LTE-B40 (2300MHz)" | "5G NR-n78 (3500MHz)" | "LTE-B1 (2100MHz)";
  lac: number;
  cellId: number;
  lat: number;
  lng: number;
  rangeM: number;
  signalDbm: number;
  source: "Demo cell-infra registry (not device tracking)";
}

export interface PublicCameraEntity {
  id: string;
  locationName: string;
  city: string;
  authority: string;
  lat: number;
  lng: number;
  status: "ONLINE" | "SIMULATION";
  resolution: string;
  fps: number;
  streamProtocol: "HLS / WebRTC Public Relay";
  previewUrl: string;
  cameraType: "Traffic Monitoring" | "Port Operations" | "Public Square";
}

export interface RealtimeEventEntity {
  id: string;
  title: string;
  type: "seismic" | "weather" | "cyclone" | "wildfire";
  severity: "LOW" | "MODERATE" | "SEVERE" | "CRITICAL";
  lat: number;
  lng: number;
  magnitudeOrValue: string;
  depthKm?: number;
  timestamp: string;
  source: "Demo event (not a live bulletin)";
}

export interface LiveWorldSnapshot {
  targetLocation: {
    label: string;
    city: string;
    country: string;
    lat: number;
    lng: number;
    confidence: number;
  };
  satellites: SatelliteEntity[];
  aircraft: AircraftEntity[];
  ships: ShipEntity[];
  cells: CellTowerEntity[];
  cameras: PublicCameraEntity[];
  events: RealtimeEventEntity[];
}

/** Convert Latitude & Longitude to 3D Cartesian coordinates on a sphere of radius R */
export function latLngToVector3(
  lat: number,
  lng: number,
  radius: number = 2.0,
): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return [x, y, z];
}

export const DEMO_LIVE_WORLD: LiveWorldSnapshot = {
  targetLocation: {
    label: "Investigation Focus: Primary Regional Footprint",
    city: "Bhubaneswar, Odisha",
    country: "India",
    lat: 20.2961,
    lng: 85.8245,
    confidence: 94,
  },
  satellites: [
    {
      id: "sat-iss",
      name: "International Space Station (ISS / ZARYA)",
      noradId: 25544,
      type: "station",
      lat: 19.85,
      lng: 86.45,
      altitudeKm: 418.2,
      velocityKmS: 7.66,
      inclinationDeg: 51.64,
      periodMin: 92.9,
      operator: "International Consortium / NASA / ESA / JAXA",
      launchYear: 1998,
      status: "OPERATIONAL",
      footprintRadiusKm: 2200,
      tleEpoch: "2026-09-12T16:22:18.000Z",
    },
    {
      id: "sat-cartosat3",
      name: "Cartosat-3 (High-Res Earth Observation)",
      noradId: 44804,
      type: "earth_observation",
      lat: 21.15,
      lng: 85.12,
      altitudeKm: 505.0,
      velocityKmS: 7.61,
      inclinationDeg: 97.5,
      periodMin: 94.7,
      operator: "ISRO (Indian Space Research Organisation)",
      launchYear: 2019,
      status: "OPERATIONAL",
      footprintRadiusKm: 850,
      tleEpoch: "2026-09-12T15:40:02.000Z",
    },
    {
      id: "sat-sentinel2a",
      name: "Sentinel-2A (Copernicus Multispectral)",
      noradId: 40697,
      type: "earth_observation",
      lat: 24.3,
      lng: 88.2,
      altitudeKm: 786.0,
      velocityKmS: 7.45,
      inclinationDeg: 98.62,
      periodMin: 100.6,
      operator: "European Space Agency (ESA)",
      launchYear: 2015,
      status: "OPERATIONAL",
      footprintRadiusKm: 1400,
      tleEpoch: "2026-09-12T14:11:45.000Z",
    },
    {
      id: "sat-starlink3112",
      name: "Starlink-3112 (LEO Constellation)",
      noradId: 49214,
      type: "communication",
      lat: 17.5,
      lng: 83.9,
      altitudeKm: 550.4,
      velocityKmS: 7.59,
      inclinationDeg: 53.05,
      periodMin: 95.6,
      operator: "SpaceX",
      launchYear: 2021,
      status: "ACTIVE",
      footprintRadiusKm: 620,
      tleEpoch: "2026-09-12T16:05:30.000Z",
    },
    {
      id: "sat-risat2b",
      name: "RISAT-2B (Radar Imaging Satellite)",
      noradId: 44258,
      type: "earth_observation",
      lat: 22.8,
      lng: 84.1,
      altitudeKm: 555.0,
      velocityKmS: 7.58,
      inclinationDeg: 37.0,
      periodMin: 95.7,
      operator: "ISRO (Indian Space Research Organisation)",
      launchYear: 2019,
      status: "OPERATIONAL",
      footprintRadiusKm: 980,
      tleEpoch: "2026-09-12T15:18:12.000Z",
    },
  ],
  aircraft: [
    {
      id: "ac-igo542",
      callsign: "IGO542",
      icao24: "8008a1",
      operator: "IndiGo",
      aircraftType: "Airbus A320-271N (A20N)",
      origin: "CCU (Kolkata NSCBI)",
      destination: "BBI (Bhubaneswar BPI)",
      lat: 20.85,
      lng: 86.1,
      altitudeFt: 18450,
      velocityKts: 395,
      headingDeg: 215,
      verticalRateFpm: -1250,
      squawk: "4312",
      lastSeenSecAgo: 3,
      source: "Demo simulation (not a live feed)",
    },
    {
      id: "ac-aic102",
      callsign: "AIC102",
      icao24: "80053a",
      operator: "Air India",
      aircraftType: "Boeing 787-8 Dreamliner",
      origin: "DEL (Delhi Indira Gandhi)",
      destination: "LHR (London Heathrow)",
      lat: 28.56,
      lng: 77.1,
      altitudeFt: 34000,
      velocityKts: 478,
      headingDeg: 310,
      verticalRateFpm: 0,
      squawk: "2104",
      lastSeenSecAgo: 1,
      source: "Demo simulation (not a live feed)",
    },
    {
      id: "ac-sej8192",
      callsign: "SEJ8192",
      icao24: "8007bf",
      operator: "SpiceJet",
      aircraftType: "Boeing 737-800",
      origin: "BOM (Mumbai Chhatrapati Shivaji)",
      destination: "BLR (Bengaluru Kempegowda)",
      lat: 14.8,
      lng: 75.9,
      altitudeFt: 29000,
      velocityKts: 430,
      headingDeg: 145,
      verticalRateFpm: -800,
      squawk: "3351",
      lastSeenSecAgo: 5,
      source: "Demo simulation (not a live feed)",
    },
    {
      id: "ac-afr226",
      callsign: "AFR226",
      icao24: "3920c5",
      operator: "Air France",
      aircraftType: "Boeing 777-228ER",
      origin: "CDG (Paris Charles de Gaulle)",
      destination: "DEL (Delhi Indira Gandhi)",
      lat: 27.8,
      lng: 76.4,
      altitudeFt: 12200,
      velocityKts: 310,
      headingDeg: 110,
      verticalRateFpm: -1400,
      squawk: "6210",
      lastSeenSecAgo: 2,
      source: "Demo simulation (not a live feed)",
    },
    {
      id: "ac-vti601",
      callsign: "VTI601",
      icao24: "8009df",
      operator: "Vistara / Air India",
      aircraftType: "Airbus A321-251NX",
      origin: "DEL (Delhi)",
      destination: "BBI (Bhubaneswar)",
      lat: 21.6,
      lng: 84.8,
      altitudeFt: 22000,
      velocityKts: 412,
      headingDeg: 135,
      verticalRateFpm: -1100,
      squawk: "5524",
      lastSeenSecAgo: 4,
      source: "Demo simulation (not a live feed)",
    },
  ],
  ships: [
    {
      id: "ship-swarnamala",
      name: "MT Swarna Mala",
      mmsi: "419001284",
      imo: "9414802",
      vesselType: "Crude Oil Tanker",
      flag: "India [IN]",
      lat: 20.15,
      lng: 86.85,
      speedKts: 11.4,
      headingDeg: 78,
      draughtM: 14.8,
      destination: "PARADIP PORT (ODISHA)",
      eta: "2026-09-12 23:30 UTC",
      source: "Demo simulation (not a live feed)",
    },
    {
      id: "ship-sagarkanya",
      name: "ORV Sagar Kanya",
      mmsi: "419000076",
      imo: "8105052",
      vesselType: "Oceanographic Research",
      flag: "India [IN]",
      lat: 18.9,
      lng: 87.2,
      speedKts: 7.2,
      headingDeg: 190,
      draughtM: 5.6,
      destination: "BAY OF BENGAL SURVEY TRANSECT",
      eta: "2026-09-15 06:00 UTC",
      source: "Demo simulation (not a live feed)",
    },
    {
      id: "ship-sslbrahma",
      name: "MV SSL Brahmaputra",
      mmsi: "419001552",
      imo: "9378618",
      vesselType: "Container Ship",
      flag: "India [IN]",
      lat: 18.95,
      lng: 72.8,
      speedKts: 14.8,
      headingDeg: 240,
      draughtM: 11.2,
      destination: "JNPT MUMBAI",
      eta: "2026-09-13 04:15 UTC",
      source: "Demo simulation (not a live feed)",
    },
    {
      id: "ship-cmacgm",
      name: "CMA CGM Mumbai",
      mmsi: "228392900",
      imo: "9778131",
      vesselType: "Container Ship",
      flag: "France [FR]",
      lat: 13.1,
      lng: 80.35,
      speedKts: 16.1,
      headingDeg: 165,
      draughtM: 13.5,
      destination: "CHENNAI PORT",
      eta: "2026-09-13 01:00 UTC",
      source: "Demo simulation (not a live feed)",
    },
  ],
  cells: [
    {
      id: "cell-bbsr-infocity",
      mcc: 404,
      mnc: 45,
      operator: "Bharti Airtel India",
      technology: "5G NR-n78 (3500MHz)",
      lac: 1204,
      cellId: 48912,
      lat: 20.3541,
      lng: 85.8152,
      rangeM: 1800,
      signalDbm: -78,
      source: "Demo cell-infra registry (not device tracking)",
    },
    {
      id: "cell-bbsr-patia",
      mcc: 405,
      mnc: 86,
      operator: "Reliance Jio Infocomm",
      technology: "LTE-B40 (2300MHz)",
      lac: 1204,
      cellId: 74219,
      lat: 20.3589,
      lng: 85.8291,
      rangeM: 2200,
      signalDbm: -72,
      source: "Demo cell-infra registry (not device tracking)",
    },
    {
      id: "cell-bbsr-mastercanteen",
      mcc: 404,
      mnc: 45,
      operator: "Bharti Airtel India",
      technology: "LTE-B3 (1800MHz)",
      lac: 1204,
      cellId: 31908,
      lat: 20.2652,
      lng: 85.8398,
      rangeM: 1400,
      signalDbm: -68,
      source: "Demo cell-infra registry (not device tracking)",
    },
    {
      id: "cell-blr-indiranagar",
      mcc: 404,
      mnc: 45,
      operator: "Bharti Airtel India",
      technology: "5G NR-n78 (3500MHz)",
      lac: 8401,
      cellId: 91042,
      lat: 12.9784,
      lng: 77.6408,
      rangeM: 1600,
      signalDbm: -74,
      source: "Demo cell-infra registry (not device tracking)",
    },
    {
      id: "cell-del-cp",
      mcc: 405,
      mnc: 86,
      operator: "Reliance Jio Infocomm",
      technology: "5G NR-n78 (3500MHz)",
      lac: 5502,
      cellId: 88124,
      lat: 28.6328,
      lng: 77.2197,
      rangeM: 1500,
      signalDbm: -65,
      source: "Demo cell-infra registry (not device tracking)",
    },
  ],
  cameras: [
    {
      id: "cam-bbsr-smartcity",
      locationName: "Master Canteen Sq Traffic Node",
      city: "Bhubaneswar",
      authority: "Bhubaneswar Smart City Limited (BSCL)",
      lat: 20.265,
      lng: 85.8395,
      status: "SIMULATION",
      resolution: "1920x1080 @ 30fps",
      fps: 30,
      streamProtocol: "HLS / WebRTC Public Relay",
      previewUrl:
        "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=600&auto=format&fit=crop&q=80",
      cameraType: "Traffic Monitoring",
    },
    {
      id: "cam-blr-silkboard",
      locationName: "Central Silk Board Interjunction",
      city: "Bengaluru",
      authority: "Bengaluru Traffic Police / BBMP Command Center",
      lat: 12.9175,
      lng: 77.6238,
      status: "ONLINE",
      resolution: "1920x1080 @ 25fps",
      fps: 25,
      streamProtocol: "HLS / WebRTC Public Relay",
      previewUrl:
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&auto=format&fit=crop&q=80",
      cameraType: "Traffic Monitoring",
    },
    {
      id: "cam-mum-marinedrive",
      locationName: "Marine Drive Promenade - Nariman Point",
      city: "Mumbai",
      authority: "Mumbai Municipal Corporation & Traffic Police",
      lat: 18.924,
      lng: 72.822,
      status: "SIMULATION",
      resolution: "1920x1080 @ 30fps",
      fps: 30,
      streamProtocol: "HLS / WebRTC Public Relay",
      previewUrl:
        "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=600&auto=format&fit=crop&q=80",
      cameraType: "Port Operations",
    },
    {
      id: "cam-del-cp",
      locationName: "Inner Circle Radial 1 - Connaught Place",
      city: "New Delhi",
      authority: "NDMC Smart Integrated Surveillance Feed",
      lat: 28.6315,
      lng: 77.2185,
      status: "ONLINE",
      resolution: "1920x1080 @ 30fps",
      fps: 30,
      streamProtocol: "HLS / WebRTC Public Relay",
      previewUrl:
        "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&auto=format&fit=crop&q=80",
      cameraType: "Public Square",
    },
  ],
  events: [
    {
      id: "evt-eq-bayofbengal",
      title: "M 4.2 Seismic Event — Central Bay of Bengal",
      type: "seismic",
      severity: "MODERATE",
      lat: 16.4,
      lng: 88.5,
      magnitudeOrValue: "M 4.2 Richter",
      depthKm: 18.4,
      timestamp: "2026-09-12 11:42:09 UTC",
      source: "Demo event (not a live bulletin)",
    },
    {
      id: "evt-cyclone-alert",
      title: "Depression Warning: East-Central Bay of Bengal",
      type: "cyclone",
      severity: "SEVERE",
      lat: 18.1,
      lng: 89.2,
      magnitudeOrValue: "Sustained Wind 45-55 km/h",
      timestamp: "2026-09-12 14:00:00 UTC",
      source: "Demo event (not a live bulletin)",
    },
    {
      id: "evt-air-quality",
      title: "High Particulate Concentration Notice",
      type: "weather",
      severity: "MODERATE",
      lat: 20.3,
      lng: 85.8,
      magnitudeOrValue: "AQI 142 (Moderate)",
      timestamp: "2026-09-12 15:30:00 UTC",
      source: "Demo event (not a live bulletin)",
    },
  ],
};
