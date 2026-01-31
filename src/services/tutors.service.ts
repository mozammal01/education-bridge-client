import { api } from "@/lib/api";
import { TutorProfile } from "@/types";

interface Filters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  search?: string;
}

export interface TutorProfileData {
  id: string;
  userId: string;
  bio: string;
  headline?: string;
  hourlyRate: number;
  experience: number;
  education?: string;
  subjects?: string[];
  languages?: string[];
  categoryId?: string;
  category?: { id: string; name: string; slug: string };
  user?: { id: string; name: string; email: string; image?: string };
  availability?: { dayOfWeek: number; startTime: string; endTime: string }[];
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
    return api.get<{ tutors: TutorProfile[] }>(`/api/tutors${query ? `?${query}` : ""}`);
  },

  getTutorById: (id: string) => api.get<TutorProfile>(`/api/tutors/${id}`),

  getMyProfile: () => api.get<TutorProfileData>("/api/tutor/profile"),

  updateProfile: (data: Partial<TutorProfileData>) => api.put<TutorProfileData>("/api/tutor/profile", data),
};
