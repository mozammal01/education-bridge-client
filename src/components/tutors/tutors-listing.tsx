"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { TutorCard, TutorCardSkeleton } from "@/components/shared";
import { TutorsFilter, type FilterState } from "./tutors-filter";
import { Button } from "@/components/ui/button";
import { UserX, LayoutGrid, ListFilter, ArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { tutorsService } from "@/services";
import { TutorProfile } from "@/types";

type SortOption = "newest" | "price-asc" | "price-desc" | "rating-desc";

export function TutorsListing() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const initialSearch = searchParams.get("search") || "";

  const [filters, setFilters] = useState<FilterState>({
    search: initialSearch,
    category: initialCategory,
    priceRange: null,
    minRating: null,
    language: "",
  });
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [tutors, setTutors] = useState<TutorProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    setFilters(prev => ({
      ...prev,
      ...(category !== null && category !== prev.category ? { category } : {}),
      ...(search !== null && search !== prev.search ? { search } : {}),
    }));
  }, [searchParams]);

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

  // Client-side filtering & sorting
  const processedTutors = useMemo(() => {
    const result = tutors.filter((tutor) => {
      if (filters.language) {
        const tutorLanguages = tutor.languages || [];
        if (!tutorLanguages.includes(filters.language)) {
          return false;
        }
      }
      return true;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "price-asc") return (a.hourlyRate || 0) - (b.hourlyRate || 0);
      if (sortBy === "price-desc") return (b.hourlyRate || 0) - (a.hourlyRate || 0);
      if (sortBy === "rating-desc") return (b.averageRating || 0) - (a.averageRating || 0);
      return 0; // "newest" or default
    });

    return result;
  }, [tutors, filters.language, sortBy]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <div className="grid lg:grid-cols-[280px_1fr] gap-8">
      <aside className="hidden lg:block">
        <div className="sticky top-24 space-y-6">
          <div className="bg-card border rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-primary font-semibold">
              <ListFilter className="h-4 w-4" />
              <span>Filter Tutors</span>
            </div>
            <TutorsFilter
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>
          
          <div className="bg-primary/5 rounded-xl p-5 border border-primary/10">
            <h4 className="font-bold text-sm mb-2">Need Help?</h4>
            <p className="text-xs text-muted-foreground mb-4">Can&apos;t find the perfect tutor? Our support team can help you find a match.</p>
            <Button size="sm" variant="outline" className="w-full text-xs" asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </aside>

      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <p className="text-muted-foreground text-sm">
              {isLoading ? (
                "Searching tutors..."
              ) : (
                <>
                  Showing all <span className="font-bold text-foreground">{processedTutors.length}</span> tutors
                </>
              )}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-10 gap-2 px-4 shadow-sm border-border">
                  <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Sort by: {
                    sortBy === "newest" ? "Newest" : 
                    sortBy === "price-asc" ? "Price: Low to High" :
                    sortBy === "price-desc" ? "Price: High to Low" : "Top Rated"
                  }</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 p-1">
                <DropdownMenuItem onClick={() => setSortBy("newest")}>Newest</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("price-asc")}>Price: Low to High</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("price-desc")}>Price: High to Low</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("rating-desc")}>Top Rated</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="lg:hidden">
              <TutorsFilter
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <TutorCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16 bg-destructive/5 rounded-2xl border border-destructive/20">
            <p className="text-red-600 mb-4 font-medium">{error}</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Try again
            </Button>
          </div>
        ) : processedTutors.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {processedTutors.map((tutor) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-muted/20 rounded-2xl border border-dashed border-muted-foreground/20">
            <UserX className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-xl font-bold mb-2">No tutors found</p>
            <p className="text-muted-foreground max-w-sm mx-auto mb-8">
              We couldn&apos;t find any tutors matching your current filters. Try broadening your search.
            </p>
            {(filters.search || filters.category || filters.language) && (
              <Button
                className="rounded-full px-8"
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
                Clear all filters
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
