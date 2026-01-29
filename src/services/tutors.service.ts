import { api } from "@/lib/api";
import { TutorProfile } from "@/types";

interface Filters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  search?: string;
}

export const tutorsService = {
  getTutors: (filters?: Filters) => {
    const params = new URLSearchParams();
    if (filters?.category) params.append("category", filters.category);
    if (filters?.minPrice) params.append("minPrice", String(filters.minPrice));
    if (filters?.maxPrice) params.append("maxPrice", String(filters.maxPrice));
    if (filters?.minRating) params.append("minRating", String(filters.minRating));
    if (filters?.search) params.append("search", filters.search);

    const query = params.toString();
    return api.get<{ tutors: TutorProfile[] }>(`/tutors${query ? `?${query}` : ""}`);
  },

  getTutorById: (id: string) => api.get<TutorProfile>(`/tutors/${id}`),
};
