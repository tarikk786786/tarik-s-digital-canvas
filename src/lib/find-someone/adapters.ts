/**
 * Find Someone — Source Adapter Interface
 * Every data source implements this contract for extensibility.
 */

import type { SearchQuery, Source, Evidence, Entity } from "./types";

export interface RawResult {
  url: string;
  title: string;
  snippet: string;
  source: string;
  retrievedAt: string;
  rawData?: Record<string, unknown>;
}

export interface NormalizedResult {
  id: string;
  url: string;
  title: string;
  content: string;
  source: Source;
  entities: Entity[];
  evidence: Evidence[];
  timestamp: string;
}

export interface SearchResult {
  query: SearchQuery;
  results: NormalizedResult[];
  totalCount: number;
  duration: number;
  errors: string[];
}

/**
 * Every source adapter implements this interface.
 * This makes the platform extensible — new sources can be added
 * without modifying the core investigation engine.
 */
export interface SourceAdapter {
  /** Unique adapter identifier */
  name: string;

  /** Human-readable display name */
  displayName: string;

  /** Whether this adapter can handle the given query */
  supports(query: SearchQuery): boolean;

  /** Execute search against this source */
  search(query: SearchQuery): Promise<SearchResult>;

  /** Normalize a raw result into structured format */
  normalize(result: RawResult): NormalizedResult;

  /** Extract evidence from a normalized result */
  getEvidence(result: NormalizedResult): Evidence[];

  /** Check if the source is accessible */
  healthCheck(): Promise<boolean>;
}

/**
 * Source adapter manifest — metadata for each registered adapter.
 */
export interface AdapterManifest {
  name: string;
  displayName: string;
  category:
    | "web"
    | "news"
    | "github"
    | "government"
    | "india"
    | "maps"
    | "documents"
    | "usernames"
    | "organizations"
    | "companies";
  description: string;
  supportedQueryTypes: string[];
  rateLimit: {
    maxRequestsPerMinute: number;
    maxRequestsPerDay: number;
  };
  license: string;
  enabled: boolean;
}
