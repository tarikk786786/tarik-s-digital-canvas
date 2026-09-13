/**
 * Source adapter contract — Information / World / Forensic engines.
 * Implementations live server-side; visitor chrome sees category + health only.
 */

import type { SystemHealth } from "@/lib/kernel/model";

export interface SourceAdapterMeta {
  id: string;
  categoryLabel: string;
  health: SystemHealth;
  detail: string;
}

export interface SourceAdapterContext {
  query: string;
  indiaMode?: boolean;
  signal?: AbortSignal;
}

export interface SourceAdapter<TResult = unknown> {
  meta: SourceAdapterMeta;
  healthCheck(): Promise<{ health: SystemHealth; detail: string }>;
  collect?(ctx: SourceAdapterContext): Promise<TResult>;
}
