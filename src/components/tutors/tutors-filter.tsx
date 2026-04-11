"use client";

import { useState, useEffect } from "react";
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
import { LANGUAGES, PRICE_RANGES, RATING_OPTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { categoriesService } from "@/services/categories.service";
import { Category } from "@/types";

interface TutorsFilterProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  search: string;
  category: string;
  priceRange: { min: number; max: number } | null;
  minRating: number | null;
  language: string;
  location: string;
  dayOfWeek: number | null;
}

export function TutorsFilter({ filters, onFilterChange }: TutorsFilterProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await categoriesService.getCategories();
        if (res.data && Array.isArray(res.data)) {
          // De-duplicate categories by name and remove misspelled 'Mathmatics'
          const uniqueCats = res.data.filter((cat, index, self) =>
            index === self.findIndex((c) => c.name === cat.name) && 
            cat.name !== "Mathmatics"
          );
          setCategories(uniqueCats);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFilterChange({
      search: "",
      category: "",
      priceRange: null,
      minRating: null,
      language: "",
      location: "",
      dayOfWeek: null,
    });
  };

  const activeFilterCount = [
    filters.category,
    filters.priceRange,
    filters.minRating,
    filters.language,
    filters.location,
    filters.dayOfWeek !== null,
  ].filter(Boolean).length;

  const filterContent = (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium mb-3">Category</h4>
        <div className="flex flex-wrap gap-2">
          {categories.length > 0 ? (
            categories.map((cat) => {
              const displayName = cat.name === "Information and Communication Technology" ? "ICT" : cat.name;
              return (
                <Badge
                  key={cat.id}
                  variant={filters.category === cat.slug ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => updateFilter("category", filters.category === cat.slug ? "" : cat.slug)}
                >
                  {displayName}
                </Badge>
              );
            })
          ) : (
            <span className="text-sm text-muted-foreground">Loading categories...</span>
          )}
        </div>
      </div>

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

      <div>
        <h4 className="font-medium mb-3">Location</h4>
        <Input
          placeholder="e.g. Dhaka, Remote"
          value={filters.location}
          onChange={(e) => updateFilter("location", e.target.value)}
          className="bg-card"
        />
      </div>

      <div>
        <h4 className="font-medium mb-3">Availability</h4>
        <div className="grid grid-cols-4 gap-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => (
            <Badge
              key={day}
              variant={filters.dayOfWeek === idx ? "default" : "outline"}
              className="cursor-pointer justify-center py-1.5"
              onClick={() => updateFilter("dayOfWeek", filters.dayOfWeek === idx ? null : idx)}
            >
              {day}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3">Language</h4>
        <div className="flex flex-wrap gap-2">
          {LANGUAGES.map((lang) => (
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

      <div className="hidden lg:block">
        {filterContent}
      </div>
    </div>
  );
}
