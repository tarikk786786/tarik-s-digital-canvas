import { useState } from "react";
import { Filter, X, SlidersHorizontal, MapPin, Calendar, Globe } from "lucide-react";
import type { SearchFilters as SearchFiltersType } from "@/lib/find-someone/types";

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onChange: (filters: SearchFiltersType) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function SearchFilters({ filters, onChange, isOpen, onClose }: SearchFiltersProps) {
  if (!isOpen) return null;

  return (
    <div className="rounded-xl border border-white/10 bg-[#0A0D12] p-5 shadow-[0_16px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl space-y-4 font-mono text-xs">
      <div className="flex items-center justify-between pb-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-4 text-[#62E6FF]" />
          <span className="font-bold uppercase tracking-wider text-foreground">
            ADVANCED RECONNAISSANCE FILTERS
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-white cursor-pointer p-1"
        >
          <X className="size-4" />
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Country */}
        <div className="space-y-1.5">
          <label className="text-[10.5px] uppercase text-muted-foreground tracking-wider block">
            Target Country
          </label>
          <select
            value={filters.country || "India"}
            onChange={(e) => onChange({ ...filters, country: e.target.value })}
            className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs text-foreground focus:border-[#62E6FF] focus:outline-none"
          >
            <option value="India">India (data.gov.in / MCA)</option>
            <option value="United States">United States (SEC / Edgar)</option>
            <option value="United Kingdom">United Kingdom (Companies House)</option>
            <option value="Global">Global / Multi-Jurisdiction</option>
          </select>
        </div>

        {/* State / Province */}
        <div className="space-y-1.5">
          <label className="text-[10.5px] uppercase text-muted-foreground tracking-wider block">
            Indian State / Region
          </label>
          <select
            value={filters.state || "Odisha"}
            onChange={(e) => onChange({ ...filters, state: e.target.value })}
            className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs text-foreground focus:border-[#62E6FF] focus:outline-none"
          >
            <option value="All">All States</option>
            <option value="Odisha">Odisha</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Delhi">Delhi NCR</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="West Bengal">West Bengal</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Telangana">Telangana</option>
          </select>
        </div>

        {/* Confidence Threshold */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[10.5px] uppercase text-muted-foreground">
            <span>Min. Confidence</span>
            <span className="text-[#62E6FF] font-bold">{filters.sourceConfidence || 70}%</span>
          </div>
          <input
            type="range"
            min="40"
            max="95"
            step="5"
            value={filters.sourceConfidence || 70}
            onChange={(e) => onChange({ ...filters, sourceConfidence: Number(e.target.value) })}
            className="w-full accent-[#62E6FF]"
          />
        </div>

        {/* Language Engine */}
        <div className="space-y-1.5">
          <label className="text-[10.5px] uppercase text-muted-foreground tracking-wider block">
            Indic Language Pipeline
          </label>
          <select
            value={filters.language || "auto"}
            onChange={(e) => onChange({ ...filters, language: e.target.value })}
            className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs text-foreground focus:border-[#62E6FF] focus:outline-none"
          >
            <option value="auto">Auto-Detect (IndicLID)</option>
            <option value="hi">Hindi (हिन्दी)</option>
            <option value="or">Odia (ଓଡ଼ିଆ)</option>
            <option value="bn">Bengali (বাংলা)</option>
            <option value="ta">Tamil (தமிழ்)</option>
            <option value="te">Telugu (తెలుగు)</option>
            <option value="mr">Marathi (मराठी)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
