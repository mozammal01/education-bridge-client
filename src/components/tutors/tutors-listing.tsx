"use client";

import { useState, useEffect } from "react";
import { TutorCard } from "@/components/shared";
import { TutorsFilter, type FilterState } from "./tutors-filter";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List, Loader2, UserX } from "lucide-react";
import { cn } from "@/lib/utils";
import { tutorsService } from "@/services";
import { TutorProfile } from "@/types";

export function TutorsListing() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "",
    priceRange: null,
    minRating: null,
    language: "",
  });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [tutors, setTutors] = useState<TutorProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTutors = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await tutorsService.getTutors({
          category: filters.category || undefined,
          minPrice: filters.priceRange?.min,
          maxPrice: filters.priceRange?.max,
          minRating: filters.minRating || undefined,
          search: filters.search || undefined,
        });

        if (response.data) {
          const tutorData = Array.isArray(response.data)
            ? response.data
            : (response.data as { tutors?: TutorProfile[] }).tutors || [];
          setTutors(tutorData);
        } else {
          setTutors([]);
        }
      } catch (err) {
        console.error("Failed to fetch tutors:", err);
        setError("Failed to load tutors. Please try again.");
        setTutors([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTutors();
  }, [filters]);

  // Client-side filtering for language (if API doesn't support it)
  const filteredTutors = tutors.filter((tutor) => {
    if (filters.language && tutor.languages && !tutor.languages.includes(filters.language)) {
      return false;
    }
    return true;
  });

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
            {isLoading ? (
              "Loading..."
            ) : (
              <>
                <span className="font-medium text-foreground">{filteredTutors.length}</span> tutors found
              </>
            )}
          </p>

          <div className="flex items-center gap-2">
            {/* mobile filter */}
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

        {/* loading state */}
        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {/* error state */}
        {error && !isLoading && (
          <div className="text-center py-16 bg-red-50 rounded-xl">
            <p className="text-red-600 mb-2">{error}</p>
            <Button variant="link" onClick={() => window.location.reload()}>
              Try again
            </Button>
          </div>
        )}

        {/* tutors grid/list */}
        {!isLoading && !error && filteredTutors.length > 0 && (
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
        )}

        {/* empty state */}
        {!isLoading && !error && filteredTutors.length === 0 && (
          <div className="text-center py-16 bg-muted/30 rounded-xl">
            <UserX className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-2">No tutors found</p>
            <p className="text-muted-foreground mb-4">
              {filters.search || filters.category || filters.language
                ? "Try adjusting your filters"
                : "No tutors have registered yet"}
            </p>
            {(filters.search || filters.category || filters.language) && (
              <Button
                variant="outline"
                onClick={() =>
                  setFilters({
                    search: "",
                    category: "",
                    priceRange: null,
                    minRating: null,
                    language: "",
                  })
                }
              >
                Clear filters
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
