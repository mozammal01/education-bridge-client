"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { TutorCard } from "@/components/shared";
import { TutorsFilter, type FilterState } from "./tutors-filter";
import { Button } from "@/components/ui/button";
import { Loader2, UserX } from "lucide-react";
import { tutorsService } from "@/services";
import { TutorProfile } from "@/types";

export function TutorsListing() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: initialCategory,
    priceRange: null,
    minRating: null,
    language: "",
  });
  const [tutors, setTutors] = useState<TutorProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const category = searchParams.get("category");
    if (category && category !== filters.category) {
      setFilters(prev => ({ ...prev, category }));
    }
  }, [searchParams, filters.category]);

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
      } catch {
        setError("Failed to load tutors. Please try again.");
        setTutors([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTutors();
  }, [filters]);

  const filteredTutors = tutors.filter((tutor) => {
    // Language filter (client-side)
    if (filters.language) {
      const tutorLanguages = tutor.languages || [];
      if (!tutorLanguages.includes(filters.language)) {
        return false;
      }
    }
    return true;
  });

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <div className="grid lg:grid-cols-[280px_1fr] gap-8">
      <aside className="hidden lg:block">
        <div className="sticky top-24 bg-card border rounded-xl p-5">
          <TutorsFilter onFilterChange={handleFilterChange} initialCategory={filters.category} />
        </div>
      </aside>

      <div>
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

          <div className="lg:hidden">
            <TutorsFilter onFilterChange={handleFilterChange} initialCategory={filters.category} />
          </div>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {error && !isLoading && (
          <div className="text-center py-16 bg-red-50 rounded-xl">
            <p className="text-red-600 mb-2">{error}</p>
            <Button variant="link" onClick={() => window.location.reload()}>
              Try again
            </Button>
          </div>
        )}

        {!isLoading && !error && filteredTutors.length > 0 && (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTutors.map((tutor) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
        )}

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
