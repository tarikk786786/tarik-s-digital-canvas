import {
  LayoutDashboard,
  User,
  UserCheck,
  Building2,
  Building,
  Globe,
  FileText,
  Newspaper,
  Calendar,
  GitFork,
  MapPin,
  ShieldAlert,
  AlertTriangle,
  Download,
} from "lucide-react";

export type TabType =
  | "overview"
  | "people"
  | "profiles"
  | "organizations"
  | "companies"
  | "websites"
  | "documents"
  | "news"
  | "timeline"
  | "connections"
  | "locations"
  | "evidence";

interface InvestigationTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  sourcesCount: number;
  profilesCount: number;
  conflictsCount: number;
}

export function InvestigationTabs({
  activeTab,
  onTabChange,
  sourcesCount,
  profilesCount,
  conflictsCount,
}: InvestigationTabsProps) {
  const tabs: { id: TabType; label: string; icon: React.ReactNode; badge?: boolean }[] = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard className="size-3.5" /> },
    { id: "people", label: "People", icon: <User className="size-3.5" /> },
    {
      id: "profiles",
      label: `Profiles (${profilesCount})`,
      icon: <UserCheck className="size-3.5" />,
    },
    { id: "organizations", label: "Organizations", icon: <Building2 className="size-3.5" /> },
    { id: "companies", label: "Companies", icon: <Building className="size-3.5" /> },
    { id: "websites", label: "Websites", icon: <Globe className="size-3.5" /> },
    { id: "documents", label: "Documents", icon: <FileText className="size-3.5" /> },
    { id: "news", label: "News", icon: <Newspaper className="size-3.5" /> },
    { id: "timeline", label: "Timeline", icon: <Calendar className="size-3.5" /> },
    { id: "connections", label: "Connections", icon: <GitFork className="size-3.5" /> },
    { id: "locations", label: "Locations", icon: <MapPin className="size-3.5" /> },
    {
      id: "evidence",
      label: "Evidence",
      icon: <ShieldAlert className="size-3.5" />,
      badge: conflictsCount > 0,
    },
  ];

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-white/10 no-scrollbar">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
              isActive
                ? "bg-[#62E6FF]/15 text-[#62E6FF] border border-[#62E6FF]/40 font-bold shadow-[0_0_12px_rgba(98,230,255,0.2)]"
                : "border border-transparent text-muted-foreground hover:bg-white/5 hover:text-foreground"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {tab.badge && <span className="size-1.5 rounded-full bg-amber-400 animate-pulse" />}
          </button>
        );
      })}
    </div>
  );
}
