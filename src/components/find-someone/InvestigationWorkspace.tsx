import { useState } from "react";
import { InvestigationTabs, type TabType } from "./InvestigationTabs";
import { InvestigationOverview } from "./InvestigationOverview";
import { SourcePanel } from "./SourcePanel";
import { RelationshipGraph } from "./RelationshipGraph";
import { TimelineView } from "./TimelineView";
import { EvidenceChain } from "./EvidenceChain";
import { ConflictAlert } from "./ConflictAlert";
import { CompanyView } from "./CompanyView";
import { WebsiteView } from "./WebsiteView";
import { DocumentView } from "./DocumentView";
import { ImageView } from "./ImageView";
import { IdentityCard } from "./IdentityCard";
import { ReportGenerator } from "./ReportGenerator";
import {
  DEMO_COMPANY,
  DEMO_WEBSITE,
  DEMO_DOCUMENT,
  DEMO_IMAGE,
} from "@/content/demo-investigation";
import {
  ExternalLink,
  Building2,
  User,
  Globe,
  Shield,
  MapPin,
  Newspaper,
  FileText,
  Download,
} from "lucide-react";
import type { Investigation, PersonEntity, SearchIntent } from "@/lib/find-someone/types";

interface InvestigationWorkspaceProps {
  investigation: Investigation;
  currentIntent: SearchIntent;
}

export function InvestigationWorkspace({
  investigation,
  currentIntent,
}: InvestigationWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [selectedPerson, setSelectedPerson] = useState<PersonEntity>(investigation.persons[0]);
  const [showReportModal, setShowReportModal] = useState(false);

  // If specialized intent mode is explicitly selected by user:
  if (currentIntent === "company") {
    return <CompanyView company={DEMO_COMPANY} />;
  }

  if (currentIntent === "website") {
    return <WebsiteView website={DEMO_WEBSITE} />;
  }

  if (currentIntent === "document") {
    return <DocumentView document={DEMO_DOCUMENT} />;
  }

  if (currentIntent === "image") {
    return <ImageView image={DEMO_IMAGE} />;
  }

  return (
    <div className="space-y-6">
      {/* Top Controls: 12 Tabs & Report Generator Trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-2">
        <div className="flex-1 min-w-0">
          <InvestigationTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            sourcesCount={investigation.sources.length}
            profilesCount={selectedPerson.publicProfiles.length}
            conflictsCount={investigation.conflicts.length}
          />
        </div>

        <button
          type="button"
          onClick={() => setShowReportModal(!showReportModal)}
          className="flex items-center gap-1.5 rounded-lg border border-[#62E6FF]/30 bg-[#62E6FF]/10 px-3 py-1.5 font-mono text-xs text-[#62E6FF] hover:bg-[#62E6FF]/20 transition-all shrink-0 cursor-pointer"
        >
          <Download className="size-3.5" />
          <span>Export Dossier</span>
        </button>
      </div>

      {/* Report Modal / Slide */}
      {showReportModal && (
        <div className="p-4 rounded-xl border border-white/10 bg-[#0A0D12]">
          <ReportGenerator investigation={investigation} />
        </div>
      )}

      {/* Main Tab Views */}
      <div className="min-h-[500px]">
        {/* 1. OVERVIEW */}
        {activeTab === "overview" && (
          <InvestigationOverview
            investigation={investigation}
            selectedPerson={selectedPerson}
            onSelectPerson={setSelectedPerson}
            onNavigateTab={setActiveTab}
          />
        )}

        {/* 2. PEOPLE */}
        {activeTab === "people" && (
          <div className="space-y-4">
            <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4 font-mono text-xs text-muted-foreground">
              <span className="text-[#62E6FF] font-bold block uppercase tracking-wider mb-1">
                DISAMBIGUATED PUBLIC CANDIDATES
              </span>
              Multiple individuals matching the search query are distinguished across academic and
              industry registries.
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {investigation.persons.map((person) => (
                <IdentityCard
                  key={person.id}
                  person={person}
                  isSelected={person.id === selectedPerson.id}
                  onSelect={() => setSelectedPerson(person)}
                />
              ))}
            </div>
          </div>
        )}

        {/* 3. PROFILES */}
        {activeTab === "profiles" && (
          <div className="space-y-4">
            <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4 font-mono text-xs text-muted-foreground">
              <span className="text-[#62E6FF] font-bold block uppercase tracking-wider mb-1">
                DISCOVERED PUBLIC PROFILES
              </span>
              Public profiles discovered across verified developer registries, social hubs, and
              scientific platforms.
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {selectedPerson.publicProfiles.map((prof) => (
                <div
                  key={prof.platform}
                  className="rounded-xl border border-white/10 bg-white/[0.025] p-4.5 backdrop-blur-xl space-y-3 hover:border-white/20 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-foreground">
                      {prof.platform}
                    </span>
                    <span className="rounded bg-[#6EE7B7]/10 px-2 py-0.5 font-mono text-[9.5px] text-[#6EE7B7] border border-[#6EE7B7]/20">
                      {prof.confidence}% CONF.
                    </span>
                  </div>

                  <a
                    href={prof.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-mono text-xs text-[#62E6FF] hover:underline truncate"
                  >
                    <span>{prof.username}</span>
                    <ExternalLink className="size-3 shrink-0" />
                  </a>

                  <div className="space-y-1 pt-2 border-t border-white/5 font-mono text-[10.5px] text-muted-foreground">
                    {Object.entries(prof.metadata).map(([k, v]) => (
                      <div key={k} className="flex justify-between">
                        <span className="capitalize">{k}:</span>
                        <span className="text-foreground/80 font-semibold">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. ORGANIZATIONS */}
        {activeTab === "organizations" && (
          <div className="space-y-4">
            <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4 font-mono text-xs text-muted-foreground">
              <span className="text-[#62E6FF] font-bold block uppercase tracking-wider mb-1">
                PUBLICLY ASSOCIATED ORGANIZATIONS
              </span>
              Entities officially linked via statutory documentation, shareholding records, or
              published research affiliations.
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {investigation.organizations.map((org) => (
                <div
                  key={org.id}
                  className="rounded-xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-xl space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="grid size-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-[#9B8CFF]">
                        <Building2 className="size-4" />
                      </div>
                      <div>
                        <h4 className="font-display text-base font-bold text-foreground">
                          {org.name}
                        </h4>
                        <span className="font-mono text-[10.5px] text-[#6EE7B7]">
                          Status: {org.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <span className="rounded bg-white/5 px-2 py-0.5 font-mono text-[10px] text-muted-foreground border border-white/10">
                      {org.type.toUpperCase()}
                    </span>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-white/5 font-mono text-xs text-muted-foreground">
                    {org.metadata.incorporationNumber && (
                      <div className="flex justify-between">
                        <span>CIN / Registration:</span>
                        <span className="text-foreground">{org.metadata.incorporationNumber}</span>
                      </div>
                    )}
                    {org.metadata.industry && (
                      <div className="flex justify-between">
                        <span>Domain:</span>
                        <span className="text-foreground">{org.metadata.industry}</span>
                      </div>
                    )}
                    {org.location && (
                      <div className="flex justify-between">
                        <span>Location:</span>
                        <span className="text-foreground">{org.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. COMPANIES */}
        {activeTab === "companies" && <CompanyView company={DEMO_COMPANY} />}

        {/* 6. WEBSITES */}
        {activeTab === "websites" && <WebsiteView website={DEMO_WEBSITE} />}

        {/* 7. DOCUMENTS */}
        {activeTab === "documents" && <DocumentView document={DEMO_DOCUMENT} />}

        {/* 8. NEWS */}
        {activeTab === "news" && (
          <div className="space-y-4">
            <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4 font-mono text-xs text-muted-foreground">
              <span className="text-[#62E6FF] font-bold block uppercase tracking-wider mb-1">
                PUBLIC NEWS & MEDIA MENTIONS
              </span>
              Corroborated news reports and editorial publications referencing the subject entity.
            </div>

            <div className="grid gap-3">
              {investigation.sources
                .filter((s) => s.type === "news")
                .map((news) => (
                  <div
                    key={news.id}
                    className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-display text-sm font-bold text-foreground">
                        {news.name}
                      </h4>
                      <a
                        href={news.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 font-mono text-xs text-[#62E6FF] hover:underline"
                      >
                        <span>Open Article</span>
                        <ExternalLink className="size-3" />
                      </a>
                    </div>
                    <p className="font-mono text-xs text-muted-foreground">
                      Publisher: {news.publisher} · Retrieved: {news.retrievedAt}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* 9. TIMELINE */}
        {activeTab === "timeline" && (
          <TimelineView events={investigation.timeline} sources={investigation.sources} />
        )}

        {/* 10. CONNECTIONS */}
        {activeTab === "connections" && <RelationshipGraph />}

        {/* 11. LOCATIONS */}
        {activeTab === "locations" && (
          <div className="space-y-4">
            <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4 font-mono text-xs text-muted-foreground">
              <span className="text-[#62E6FF] font-bold block uppercase tracking-wider mb-1">
                PUBLIC LOCATION ANCHORS
              </span>
              Geographic coordinates and metropolitan hubs established through statutory corporate
              filings and verified academic publications.
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/[0.025] p-5 space-y-2">
                <div className="flex items-center gap-2 font-display text-base font-bold text-foreground">
                  <MapPin className="size-4 text-[#6EE7B7]" />
                  <span>Bhubaneswar, Odisha, India</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Statutory Registered Headquarters of Dezo Systems Pvt Ltd (MCA ROC Cuttack) &
                  Startup Odisha Innovation Hub.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.025] p-5 space-y-2">
                <div className="flex items-center gap-2 font-display text-base font-bold text-foreground">
                  <MapPin className="size-4 text-[#62E6FF]" />
                  <span>Bengaluru, Karnataka, India</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Cloud engineering and research collaboration nexus verified through IEEE
                  publications.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 12. EVIDENCE */}
        {activeTab === "evidence" && (
          <div className="space-y-6">
            <EvidenceChain
              claims={investigation.claims}
              sources={investigation.sources}
              evidenceList={investigation.evidence}
            />

            {investigation.conflicts.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-white/10">
                <span className="font-mono text-xs uppercase tracking-wider text-amber-400 font-bold block">
                  DISCREPANCY AUDIT // CONFLICTS DETECTED
                </span>
                <ConflictAlert conflicts={investigation.conflicts} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
