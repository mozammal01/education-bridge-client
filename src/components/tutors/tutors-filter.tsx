"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CATEGORIES, LANGUAGES, PRICE_RANGES, RATING_OPTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface TutorsFilterProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  search: string;
  category: string;
  priceRange: { min: number; max: number } | null;
  minRating: number | null;
  language: string;
}

export function TutorsFilter({ onFilterChange }: TutorsFilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "",
    priceRange: null,
    minRating: null,
    language: "",
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const cleared: FilterState = {
      search: "",
      category: "",
      priceRange: null,
      minRating: null,
      language: "",
    };
    setFilters(cleared);
    onFilterChange(cleared);
  };

  const activeFilterCount = [
    filters.category,
    filters.priceRange,
    filters.minRating,
    filters.language,
  ].filter(Boolean).length;

  const filterContent = (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h4 className="font-medium mb-3">Category</h4>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.slice(0, 6).map((cat) => (
            <Badge
              key={cat.id}
              variant={filters.category === cat.slug ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => updateFilter("category", filters.category === cat.slug ? "" : cat.slug)}
            >
              {cat.name}
            </Badge>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-medium mb-3">Price Range</h4>
        <div className="space-y-2">
          {PRICE_RANGES.map((range) => (
            <button
              key={range.label}
              onClick={() =>
                updateFilter(
                  "priceRange",
                  filters.priceRange?.min === range.min ? null : { min: range.min, max: range.max }
                )
              }
              className={cn(
                "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                filters.priceRange?.min === range.min
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h4 className="font-medium mb-3">Minimum Rating</h4>
        <div className="space-y-2">
          {RATING_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() =>
                updateFilter("minRating", filters.minRating === opt.value ? null : opt.value)
              }
              className={cn(
                "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                filters.minRating === opt.value
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Language */}
      <div>
        <h4 className="font-medium mb-3">Language</h4>
        <div className="flex flex-wrap gap-2">
          {LANGUAGES.slice(0, 6).map((lang) => (
            <Badge
              key={lang}
              variant={filters.language === lang ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => updateFilter("language", filters.language === lang ? "" : lang)}
            >
              {lang}
            </Badge>
          ))}
        </div>
      </div>

      {activeFilterCount > 0 && (
        <Button variant="outline" className="w-full" onClick={clearFilters}>
          <X className="mr-2 h-4 w-4" />
          Clear all filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      {/* search + mobile filter */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, subject..."
            className="pl-10"
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
          />
        </div>

        {/* mobile filter btn */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="lg:hidden relative">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
              {activeFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              {filterContent}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* desktop sidebar filter */}
      <div className="hidden lg:block">
        {filterContent}
      </div>
    </div>
  );
}
