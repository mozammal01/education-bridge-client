import { api } from "@/lib/api";
import { Review } from "@/types";

interface CreateReview {
  tutorId: string;
  bookingId?: string;
  rating: number;
  comment: string;
}

export const reviewsService = {
  getReviewsByTutor: (tutorId: string) =>
    api.get<{ reviews: Review[] }>(`/api/reviews/tutor/${tutorId}`),

  createReview: (data: CreateReview) => api.post<Review>("/api/reviews", data),
};
