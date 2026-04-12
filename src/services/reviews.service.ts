import { api } from "@/lib/api";
import { Review } from "@/types";

interface CreateReview {
  tutorId?: string | null;
  rating: number;
  comment: string;
}

export const reviewsService = {
  getReviewsByTutor: (tutorId: string) =>
    api.get<{ data: Review[] }>(`/api/reviews/${tutorId}`),

  getPlatformReviews: () =>
    api.get<{ data: Review[] }>("/api/reviews/platform"),

  createReview: (data: CreateReview) => api.post<Review>("/api/reviews", data),
};
