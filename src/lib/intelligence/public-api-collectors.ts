/**
 * Public API Collectors — Person Intelligence Engine
 *
 * All functions are server-safe (no CORS issues, no auth needed for public endpoints).
 * Each returns AdapterResult — never raw errors in visitor chrome.
 *
 * ETHICAL CONSTRAINTS (enforced here, not toggleable via UI):
 * - No subscriber identity from phone numbers
 * - No credential display from breach data
 * - No private profile access
 * - No live-location inference from image metadata
 * - All geolocation is POSSIBLE / SUPPORTED — never VERIFIED
 */

import type { AdapterResult, KernelEvidence } from "./collectors";

const UA = "TarikDigitalCanvas/1.0 (portfolio research platform; contact tarik@tarikislam.in)";

function safeText(v: unknown): string {
  if (typeof v === "string") return v.trim().slice(0, 500);
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  return "";
}

// ── GitHub Public API ─────────────────────────────────────────────────────────

export async function collectGitHubUser(username: string): Promise<AdapterResult> {
  const retrievedAt = new Date().toISOString();
  const adapterId = "github-user";
  const categoryLabel = "Developer profile & repository intelligence";

  try {
    const [userRes, reposRes] = await Promise.allSettled([
      fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
        headers: { Accept: "application/vnd.github+json", "User-Agent": UA },
        signal: AbortSignal.timeout(12000),
      }),
      fetch(
        `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=10&sort=updated`,
        {
          headers: { Accept: "application/vnd.github+json", "User-Agent": UA },
          signal: AbortSignal.timeout(12000),
        },
      ),
    ]);

    if (userRes.status === "rejected" || !userRes.value.ok) {
      const status =
        userRes.status === "fulfilled" ? userRes.value.status : 0;
      if (status === 404) {
        return {
          adapterId,
          categoryLabel,
          health: "AVAILABLE",
          statusLabel: "No public GitHub profile found for this username",
          evidence: [],
        };
      }
      return {
        adapterId,
        categoryLabel,
        health: "DEGRADED",
        statusLabel: "Developer profile lookup temporarily unavailable",
        evidence: [],
        error: `HTTP ${status}`,
      };
    }

    const user = (await userRes.value.json()) as {
      login?: string;
      name?: string;
      bio?: string;
      company?: string;
      blog?: string;
      location?: string;
      email?: string;
      public_repos?: number;
      followers?: number;
      following?: number;
      created_at?: string;
      html_url?: string;
      avatar_url?: string;
      hireable?: boolean;
    };

    const repos: Array<{
      name?: string;
      description?: string;
      html_url?: string;
      language?: string;
      stargazers_count?: number;
      topics?: string[];
    }> =
      reposRes.status === "fulfilled" && reposRes.value.ok
        ? ((await reposRes.value.json()) as typeof repos)
        : [];

    const evidence: KernelEvidence[] = [];

    // Main profile evidence
    if (user.login) {
      evidence.push({
        id: `github-profile-${user.login}`,
        title: `GitHub profile · ${user.name || user.login}`,
        summary: [
          user.name ? `Name: ${user.name}` : null,
          user.bio ? `Bio: ${user.bio.slice(0, 200)}` : null,
          user.company ? `Company: ${user.company}` : null,
          user.location ? `Location (publicly stated): ${user.location}` : null,
          user.email ? `Public email: ${user.email}` : null,
          user.blog ? `Website: ${user.blog}` : null,
          `Repos: ${user.public_repos ?? 0} · Followers: ${user.followers ?? 0}`,
          user.created_at ? `Account created: ${user.created_at.slice(0, 10)}` : null,
        ]
          .filter(Boolean)
          .join(" · "),
        confidence: "SUPPORTED",
        freshness: "LIVE",
        observedAt: retrievedAt,
        provenance: {
          sourceLabel: "GitHub public profile",
          method: "GitHub REST API v3 — public user endpoint",
          retrievedAt,
          whyVisible: "Username-class or person-class query triggered developer profile lookup.",
          limitations: [
            "GitHub profile data is user-stated — not independently verified.",
            "Location and employer are self-reported.",
            "Email shown only if user made it public.",
          ],
        },
        url: user.html_url,
      });
    }

    // Repository evidence
    for (const repo of repos.slice(0, 5)) {
      if (!repo.name) continue;
      evidence.push({
        id: `github-repo-${user.login}-${repo.name}`,
        title: `Repository · ${repo.name}`,
        summary: [
          repo.description ? repo.description.slice(0, 200) : "No description",
          repo.language ? `Language: ${repo.language}` : null,
          repo.stargazers_count != null ? `Stars: ${repo.stargazers_count}` : null,
          repo.topics?.length ? `Topics: ${repo.topics.slice(0, 5).join(", ")}` : null,
        ]
          .filter(Boolean)
          .join(" · "),
        confidence: "VERIFIED",
        freshness: "LIVE",
        observedAt: retrievedAt,
        provenance: {
          sourceLabel: "GitHub public repository",
          method: "GitHub REST API v3 — public repos endpoint",
          retrievedAt,
          whyVisible: "Public repository discovered on this developer's profile.",
          limitations: ["Commit authorship does not guarantee repository ownership."],
        },
        url: repo.html_url,
      });
    }

    return {
      adapterId,
      categoryLabel,
      health: "AVAILABLE",
      statusLabel: `GitHub profile found · ${repos.length} public repos`,
      evidence,
    };
  } catch (e) {
    return {
      adapterId,
      categoryLabel,
      health: "OFFLINE",
      statusLabel: "Developer profile lookup unavailable",
      evidence: [],
      error: e instanceof Error ? e.message : "GitHub API failed",
    };
  }
}

// ── OpenAlex Author Search ────────────────────────────────────────────────────

export async function collectOpenAlexAuthor(personName: string): Promise<AdapterResult> {
  const retrievedAt = new Date().toISOString();
  const adapterId = "openalex-author";
  const categoryLabel = "Open scholarly index — authors & works";

  try {
    const url = `https://api.openalex.org/authors?search=${encodeURIComponent(personName)}&per_page=5&mailto=tarik@tarikislam.in`;
    const res = await fetch(url, {
      headers: { "User-Agent": UA },
      signal: AbortSignal.timeout(12000),
    });

    if (!res.ok) {
      return {
        adapterId,
        categoryLabel,
        health: "DEGRADED",
        statusLabel: "Open scholarly index temporarily unavailable",
        evidence: [],
        error: `HTTP ${res.status}`,
      };
    }

    const json = (await res.json()) as {
      results?: Array<{
        id?: string;
        display_name?: string;
        works_count?: number;
        cited_by_count?: number;
        last_known_institutions?: Array<{ display_name?: string; country_code?: string }>;
        topics?: Array<{ display_name?: string }>;
        orcid?: string;
      }>;
      meta?: { count?: number };
    };

    const results = json.results ?? [];
    if (results.length === 0) {
      return {
        adapterId,
        categoryLabel,
        health: "AVAILABLE",
        statusLabel: "No matching authors in open scholarly index",
        evidence: [],
      };
    }

    const evidence: KernelEvidence[] = results.slice(0, 3).map((author, i) => {
      const institutions =
        author.last_known_institutions?.map((inst) => inst.display_name).filter(Boolean) ?? [];
      const topTopics =
        author.topics?.slice(0, 3).map((t) => t.display_name).filter(Boolean) ?? [];
      const openAlexId = author.id?.replace("https://openalex.org/", "") ?? "";

      return {
        id: `openalex-author-${openAlexId || i}`,
        title: `Scholar · ${author.display_name || "Unknown"}`,
        summary: [
          `Works: ${author.works_count ?? 0}`,
          `Citations: ${author.cited_by_count ?? 0}`,
          institutions.length ? `Affiliations: ${institutions.join(", ")}` : null,
          topTopics.length ? `Research topics: ${topTopics.join(", ")}` : null,
          author.orcid ? `ORCID: ${author.orcid}` : null,
        ]
          .filter(Boolean)
          .join(" · "),
        confidence: "PROBABLE" as const,
        freshness: "LIVE" as const,
        observedAt: retrievedAt,
        provenance: {
          sourceLabel: "Open scholarly index",
          method: "OpenAlex author search API",
          retrievedAt,
          whyVisible: "Person-class query triggered open publication index search.",
          limitations: [
            "Author disambiguation: multiple researchers may share the same name.",
            "This result may not refer to the specific person searched.",
            "Affiliation data reflects last known institution, not current employment.",
          ],
        },
        url: author.id,
      };
    });

    return {
      adapterId,
      categoryLabel,
      health: "AVAILABLE",
      statusLabel: `${results.length} matching scholar(s) found in open index`,
      evidence,
    };
  } catch (e) {
    return {
      adapterId,
      categoryLabel,
      health: "OFFLINE",
      statusLabel: "Open scholarly index unavailable",
      evidence: [],
      error: e instanceof Error ? e.message : "OpenAlex failed",
    };
  }
}

// ── Wikipedia Summary ─────────────────────────────────────────────────────────

export async function collectWikipediaSummary(entityName: string): Promise<AdapterResult> {
  const retrievedAt = new Date().toISOString();
  const adapterId = "wikipedia-summary";
  const categoryLabel = "Public encyclopedia entry";

  try {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(entityName)}`;
    const res = await fetch(url, {
      headers: { "User-Agent": UA },
      signal: AbortSignal.timeout(10000),
    });

    if (res.status === 404) {
      return {
        adapterId,
        categoryLabel,
        health: "AVAILABLE",
        statusLabel: "No Wikipedia article found for this name",
        evidence: [],
      };
    }

    if (!res.ok) {
      return {
        adapterId,
        categoryLabel,
        health: "DEGRADED",
        statusLabel: "Encyclopedia lookup temporarily unavailable",
        evidence: [],
        error: `HTTP ${res.status}`,
      };
    }

    const json = (await res.json()) as {
      type?: string;
      title?: string;
      extract?: string;
      content_urls?: { desktop?: { page?: string } };
      description?: string;
    };

    if (json.type === "disambiguation") {
      return {
        adapterId,
        categoryLabel,
        health: "AVAILABLE",
        statusLabel: "Wikipedia disambiguation page — multiple matching entities",
        evidence: [
          {
            id: `wiki-disambiguation-${entityName}`,
            title: `Wikipedia disambiguation · ${entityName}`,
            summary:
              "Multiple people or entities share this name. Disambiguation required to narrow results.",
            confidence: "UNCERTAIN",
            freshness: "LIVE",
            observedAt: retrievedAt,
            provenance: {
              sourceLabel: "Wikipedia",
              method: "Wikipedia REST API — summary endpoint",
              retrievedAt,
              whyVisible: "Person-class query triggered encyclopedia lookup.",
              limitations: [
                "Disambiguation — this result does not identify a specific person.",
                "Human review needed to select correct entity.",
              ],
            },
            url: json.content_urls?.desktop?.page,
          },
        ],
      };
    }

    const extract = safeText(json.extract);
    if (!extract) {
      return {
        adapterId,
        categoryLabel,
        health: "AVAILABLE",
        statusLabel: "Wikipedia article exists but has no summary extract",
        evidence: [],
      };
    }

    return {
      adapterId,
      categoryLabel,
      health: "AVAILABLE",
      statusLabel: `Wikipedia article found: ${json.title}`,
      evidence: [
        {
          id: `wiki-${entityName.replace(/\s+/g, "-").toLowerCase()}`,
          title: `Encyclopedia · ${json.title}`,
          summary: `${json.description ? json.description + " — " : ""}${extract.slice(0, 400)}`,
          confidence: "SUPPORTED",
          freshness: "LIVE",
          observedAt: retrievedAt,
          provenance: {
            sourceLabel: "Wikipedia (public encyclopedia)",
            method: "Wikipedia REST API — summary endpoint",
            retrievedAt,
            whyVisible: "Person-class query triggered encyclopedia lookup.",
            limitations: [
              "Wikipedia reflects community consensus, not primary-source verification.",
              "Notable individuals only — no private individuals.",
              "Content may lag behind real-world changes.",
            ],
          },
          url: json.content_urls?.desktop?.page,
        },
      ],
    };
  } catch (e) {
    return {
      adapterId,
      categoryLabel,
      health: "OFFLINE",
      statusLabel: "Encyclopedia lookup unavailable",
      evidence: [],
      error: e instanceof Error ? e.message : "Wikipedia API failed",
    };
  }
}

// ── Semantic Scholar Author Search ────────────────────────────────────────────

export async function collectSemanticScholar(personName: string): Promise<AdapterResult> {
  const retrievedAt = new Date().toISOString();
  const adapterId = "semantic-scholar-author";
  const categoryLabel = "AI-indexed research publications";

  try {
    const url = `https://api.semanticscholar.org/graph/v1/author/search?query=${encodeURIComponent(personName)}&fields=name,affiliations,paperCount,citationCount,hIndex,homepage,url&limit=3`;
    const res = await fetch(url, {
      headers: { "User-Agent": UA },
      signal: AbortSignal.timeout(12000),
    });

    if (!res.ok) {
      return {
        adapterId,
        categoryLabel,
        health: "DEGRADED",
        statusLabel: "AI research index temporarily unavailable",
        evidence: [],
        error: `HTTP ${res.status}`,
      };
    }

    const json = (await res.json()) as {
      data?: Array<{
        authorId?: string;
        name?: string;
        affiliations?: string[];
        paperCount?: number;
        citationCount?: number;
        hIndex?: number;
        homepage?: string;
        url?: string;
      }>;
      total?: number;
    };

    const authors = json.data ?? [];
    if (authors.length === 0) {
      return {
        adapterId,
        categoryLabel,
        health: "AVAILABLE",
        statusLabel: "No matching authors in AI research index",
        evidence: [],
      };
    }

    const evidence: KernelEvidence[] = authors.map((author, i) => ({
      id: `s2-author-${author.authorId || i}`,
      title: `Researcher · ${author.name || "Unknown"}`,
      summary: [
        `Papers: ${author.paperCount ?? 0}`,
        `Citations: ${author.citationCount ?? 0}`,
        author.hIndex != null ? `h-index: ${author.hIndex}` : null,
        author.affiliations?.length ? `Affiliations: ${author.affiliations.slice(0, 2).join(", ")}` : null,
      ]
        .filter(Boolean)
        .join(" · "),
      confidence: "PROBABLE" as const,
      freshness: "LIVE" as const,
      observedAt: retrievedAt,
      provenance: {
        sourceLabel: "AI-indexed research database",
        method: "Semantic Scholar Graph API",
        retrievedAt,
        whyVisible: "Person-class query triggered research publication index search.",
        limitations: [
          "Name matching — may return different researchers with same name.",
          "Citation counts are aggregate estimates.",
          "Affiliation may not reflect current position.",
        ],
      },
      url: author.url ?? (author.authorId ? `https://www.semanticscholar.org/author/${author.authorId}` : undefined),
    }));

    return {
      adapterId,
      categoryLabel,
      health: "AVAILABLE",
      statusLabel: `${authors.length} researcher(s) found in AI research index`,
      evidence,
    };
  } catch (e) {
    return {
      adapterId,
      categoryLabel,
      health: "OFFLINE",
      statusLabel: "AI research index unavailable",
      evidence: [],
      error: e instanceof Error ? e.message : "Semantic Scholar failed",
    };
  }
}

// ── ORCID Public Author ───────────────────────────────────────────────────────

export async function collectOrcidAuthor(personName: string): Promise<AdapterResult> {
  const retrievedAt = new Date().toISOString();
  const adapterId = "orcid-author";
  const categoryLabel = "Researcher ORCID profile";

  try {
    const url = `https://pub.orcid.org/v3.0/search?q=${encodeURIComponent(`family-name:${personName.split(" ").pop() ?? personName}`)}&rows=3`;
    const res = await fetch(url, {
      headers: { Accept: "application/json", "User-Agent": UA },
      signal: AbortSignal.timeout(12000),
    });

    if (!res.ok) {
      return {
        adapterId,
        categoryLabel,
        health: "DEGRADED",
        statusLabel: "ORCID registry temporarily unavailable",
        evidence: [],
        error: `HTTP ${res.status}`,
      };
    }

    const json = (await res.json()) as {
      "expanded-result"?: Array<{
        "orcid-id"?: string;
        "given-names"?: string;
        "family-names"?: string;
        "current-institution-affiliation-name"?: string[];
        "email"?: string[];
      }>;
      "num-found"?: number;
    };

    const results = json["expanded-result"] ?? [];
    if (results.length === 0) {
      return {
        adapterId,
        categoryLabel,
        health: "AVAILABLE",
        statusLabel: "No ORCID profiles matched this name",
        evidence: [],
      };
    }

    const evidence: KernelEvidence[] = results.slice(0, 3).map((r, i) => {
      const orcidId = r["orcid-id"] ?? "";
      const fullName = [r["given-names"], r["family-names"]].filter(Boolean).join(" ");
      const affiliations = r["current-institution-affiliation-name"]?.slice(0, 2) ?? [];
      return {
        id: `orcid-${orcidId || i}`,
        title: `ORCID researcher · ${fullName || "Unknown"}`,
        summary: [
          orcidId ? `ORCID: ${orcidId}` : null,
          affiliations.length ? `Institution: ${affiliations.join(", ")}` : null,
        ]
          .filter(Boolean)
          .join(" · "),
        confidence: "PROBABLE" as const,
        freshness: "LIVE" as const,
        observedAt: retrievedAt,
        provenance: {
          sourceLabel: "ORCID researcher registry",
          method: "ORCID Public API search",
          retrievedAt,
          whyVisible: "Person-class query triggered ORCID researcher registry search.",
          limitations: [
            "ORCID registration is voluntary — not all researchers have profiles.",
            "Researcher controls what information is public on their ORCID profile.",
            "Name matching may return different researchers.",
          ],
        },
        url: orcidId ? `https://orcid.org/${orcidId}` : undefined,
      };
    });

    return {
      adapterId,
      categoryLabel,
      health: "AVAILABLE",
      statusLabel: `${results.length} ORCID profile(s) found`,
      evidence,
    };
  } catch (e) {
    return {
      adapterId,
      categoryLabel,
      health: "OFFLINE",
      statusLabel: "ORCID registry unavailable",
      evidence: [],
      error: e instanceof Error ? e.message : "ORCID API failed",
    };
  }
}

// ── Wikidata Entity Search ────────────────────────────────────────────────────

export async function collectWikidataEntity(entityName: string): Promise<AdapterResult> {
  const retrievedAt = new Date().toISOString();
  const adapterId = "wikidata-entity";
  const categoryLabel = "Structured public knowledge entities";

  try {
    const url = `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(entityName)}&language=en&limit=3&format=json&origin=*`;
    const res = await fetch(url, {
      headers: { "User-Agent": UA },
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      return {
        adapterId,
        categoryLabel,
        health: "DEGRADED",
        statusLabel: "Structured knowledge base temporarily unavailable",
        evidence: [],
        error: `HTTP ${res.status}`,
      };
    }

    const json = (await res.json()) as {
      search?: Array<{
        id?: string;
        label?: string;
        description?: string;
        url?: string;
      }>;
    };

    const results = json.search ?? [];
    if (results.length === 0) {
      return {
        adapterId,
        categoryLabel,
        health: "AVAILABLE",
        statusLabel: "No structured entity records found",
        evidence: [],
      };
    }

    const evidence: KernelEvidence[] = results.slice(0, 3).map((r, i) => ({
      id: `wikidata-${r.id || i}`,
      title: `Structured entity · ${r.label || entityName}`,
      summary: r.description
        ? `${r.description.slice(0, 300)}`
        : "Structured public entity with no description.",
      confidence: "PROBABLE" as const,
      freshness: "LIVE" as const,
      observedAt: retrievedAt,
      provenance: {
        sourceLabel: "Wikidata (structured public knowledge base)",
        method: "Wikidata entity search API",
        retrievedAt,
        whyVisible: "Person or organization query triggered structured knowledge base lookup.",
        limitations: [
          "Wikidata is community-maintained — entries may be incomplete or inaccurate.",
          "Only notable public figures and entities typically have entries.",
        ],
      },
      url: r.url ?? (r.id ? `https://www.wikidata.org/wiki/${r.id}` : undefined),
    }));

    return {
      adapterId,
      categoryLabel,
      health: "AVAILABLE",
      statusLabel: `${results.length} structured knowledge entities found`,
      evidence,
    };
  } catch (e) {
    return {
      adapterId,
      categoryLabel,
      health: "OFFLINE",
      statusLabel: "Structured knowledge base unavailable",
      evidence: [],
      error: e instanceof Error ? e.message : "Wikidata API failed",
    };
  }
}

// ── Reddit Public Profile ─────────────────────────────────────────────────────

export async function collectRedditProfile(username: string): Promise<AdapterResult> {
  const retrievedAt = new Date().toISOString();
  const adapterId = "reddit-profile";
  const categoryLabel = "Public Reddit profile";

  // Strip leading u/ if present
  const cleanUsername = username.replace(/^u\//i, "").replace(/^@/, "");

  try {
    const res = await fetch(
      `https://www.reddit.com/user/${encodeURIComponent(cleanUsername)}/about.json`,
      {
        headers: {
          "User-Agent": UA,
          Accept: "application/json",
        },
        signal: AbortSignal.timeout(10000),
      },
    );

    if (res.status === 404) {
      return {
        adapterId,
        categoryLabel,
        health: "AVAILABLE",
        statusLabel: "No public Reddit profile found for this username",
        evidence: [],
      };
    }

    if (!res.ok) {
      return {
        adapterId,
        categoryLabel,
        health: "DEGRADED",
        statusLabel: "Reddit profile lookup temporarily unavailable",
        evidence: [],
        error: `HTTP ${res.status}`,
      };
    }

    const json = (await res.json()) as {
      data?: {
        name?: string;
        icon_img?: string;
        total_karma?: number;
        link_karma?: number;
        comment_karma?: number;
        created_utc?: number;
        is_suspended?: boolean;
        subreddit?: {
          display_name_prefixed?: string;
          public_description?: string;
        };
      };
    };

    const data = json.data;
    if (!data || data.is_suspended) {
      return {
        adapterId,
        categoryLabel,
        health: "AVAILABLE",
        statusLabel: data?.is_suspended ? "Reddit account is suspended" : "No profile data",
        evidence: [],
      };
    }

    const created = data.created_utc
      ? new Date(data.created_utc * 1000).toISOString().slice(0, 10)
      : null;

    return {
      adapterId,
      categoryLabel,
      health: "AVAILABLE",
      statusLabel: `Reddit profile found · u/${data.name ?? cleanUsername}`,
      evidence: [
        {
          id: `reddit-${cleanUsername}`,
          title: `Reddit profile · u/${data.name ?? cleanUsername}`,
          summary: [
            `Karma: ${(data.total_karma ?? 0).toLocaleString()}`,
            `Link karma: ${data.link_karma ?? 0} · Comment karma: ${data.comment_karma ?? 0}`,
            created ? `Account created: ${created}` : null,
            data.subreddit?.public_description
              ? `Bio: ${data.subreddit.public_description.slice(0, 200)}`
              : null,
          ]
            .filter(Boolean)
            .join(" · "),
          confidence: "VERIFIED" as const,
          freshness: "LIVE" as const,
          observedAt: retrievedAt,
          provenance: {
            sourceLabel: "Reddit public profile",
            method: "Reddit public JSON API",
            retrievedAt,
            whyVisible: "Username-class query triggered public social profile lookup.",
            limitations: [
              "Public posts only — private messages are not accessible.",
              "Deleted posts and private subreddit activity are not visible.",
            ],
          },
          url: `https://www.reddit.com/user/${data.name ?? cleanUsername}`,
        },
      ],
    };
  } catch (e) {
    return {
      adapterId,
      categoryLabel,
      health: "OFFLINE",
      statusLabel: "Reddit profile lookup unavailable",
      evidence: [],
      error: e instanceof Error ? e.message : "Reddit API failed",
    };
  }
}
