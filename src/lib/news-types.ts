// Browser-safe types for the news feature. NEVER import provider keys here.

export type NewsCategory =
  | "Crime"
  | "Forensics"
  | "Cybercrime"
  | "Cybersecurity"
  | "Ethical Hacking"
  | "Threat Intelligence"
  | "Data Breach"
  | "Web Security"
  | "Web Development"
  | "Technology";

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  source: string;
  publishedAt: string;
  category: NewsCategory;
  relevanceScore: number;
  provider: "primary" | "backup";
}

export interface NewsResponse {
  articles: NewsArticle[];
  stale: boolean;
  generatedAt: string;
  providersUsed: Array<"primary" | "backup">;
}

export const NEWS_CATEGORIES: readonly NewsCategory[] = [
  "Crime",
  "Forensics",
  "Cybercrime",
  "Cybersecurity",
  "Ethical Hacking",
  "Threat Intelligence",
  "Data Breach",
  "Web Security",
  "Web Development",
  "Technology",
] as const;
