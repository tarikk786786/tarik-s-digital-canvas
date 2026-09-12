import { detectQueryType } from "./scoring";

export type InvestigationMode = "demo" | "live";

export interface CreatedInvestigation {
  id: string;
  query: string;
  status: "created";
  classification: string[];
  mode: InvestigationMode;
}

export function classifyInput(query: string): string[] {
  const type = detectQueryType(query);
  const tags = [type.toUpperCase()];
  if (/\b(from|at|in)\b/i.test(query) && type === "person") {
    tags.push("RELATIONSHIP");
  }
  return tags;
}

export function workspacePath(id: string, mode: InvestigationMode, query: string) {
  const params = new URLSearchParams({ id, mode, q: query });
  return `/find-someone?${params.toString()}`;
}

export async function startInvestigation(
  query: string,
  mode: InvestigationMode,
): Promise<CreatedInvestigation> {
  const response = await fetch("/api/investigations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, mode }),
  });

  if (!response.ok) {
    throw new Error("Investigation could not be created.");
  }

  return (await response.json()) as CreatedInvestigation;
}
