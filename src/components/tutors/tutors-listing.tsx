"use client";

import { useState, useMemo } from "react";
import { TutorCard } from "@/components/shared";
import { TutorsFilter, type FilterState } from "./tutors-filter";
import { MOCK_TUTORS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/utils";

export function TutorsListing() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "",
    priceRange: null,
    minRating: null,
    language: "",
  });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredTutors = useMemo(() => {
    return MOCK_TUTORS.filter((tutor) => {
      // search
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          tutor.user.name.toLowerCase().includes(searchLower) ||
          tutor.subjects.some((s) => s.toLowerCase().includes(searchLower)) ||
          tutor.headline.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // category
      if (filters.category) {
        const matchesCat = tutor.categories.some((c) => c.slug === filters.category);
        if (!matchesCat) return false;
      }

      // price
      if (filters.priceRange) {
        if (tutor.hourlyRate < filters.priceRange.min || tutor.hourlyRate > filters.priceRange.max) {
          return false;
        }
      }

      // rating
      if (filters.minRating && tutor.rating < filters.minRating) {
        return false;
      }

      // language
      if (filters.language && !tutor.languages.includes(filters.language)) {
        return false;
      }

      return true;
    });
  }, [filters]);

  return (
    <div className="grid lg:grid-cols-[280px_1fr] gap-8">
      {/* sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-24 bg-card border rounded-xl p-5">
          <TutorsFilter onFilterChange={setFilters} />
        </div>
      </aside>

      {/* main content */}
      <div>
        {/* top bar */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            <span className="font-medium text-foreground">{filteredTutors.length}</span> tutors found
          </p>
          
          <div className="flex items-center gap-2">
            {/* mobile filter - shows on mobile only via TutorsFilter */}
            <div className="lg:hidden">
              <TutorsFilter onFilterChange={setFilters} />
            </div>

            {/* view toggle */}
            <div className="hidden sm:flex border rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="icon-sm"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="icon-sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* tutors grid/list */}
        {filteredTutors.length > 0 ? (
          <div
            className={cn(
              viewMode === "grid"
                ? "grid sm:grid-cols-2 xl:grid-cols-3 gap-6"
                : "space-y-4"
            )}
          >
            {filteredTutors.map((tutor) => (
              <TutorCard
                key={tutor.id}
                tutor={tutor}
                className={viewMode === "list" ? "sm:flex-row" : ""}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-muted/30 rounded-xl">
            <p className="text-muted-foreground mb-2">No tutors found matching your criteria</p>
            <Button variant="link" onClick={() => setFilters({
              search: "",
              category: "",
              priceRange: null,
              minRating: null,
              language: "",
            })}>
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
