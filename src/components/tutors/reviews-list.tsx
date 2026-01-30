import Image from "next/image";
import { StarRating } from "@/components/shared";
import type { Review } from "@/types";
import { getImageUrl } from "@/lib/utils";

interface ReviewsListProps {
  reviews: Review[];
}

export function ReviewsList({ reviews }: ReviewsListProps) {
  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="flex gap-4">
          <div className="shrink-0">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
              {review.student.image ? (
                <Image
                  src={getImageUrl(review.student.image)}
                  alt={review.student.name}
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm font-medium">
                  {review.student.name.split(" ").map((n) => n[0]).join("")}
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <span className="font-medium">{review.student.name}</span>
              <StarRating rating={review.rating} size="sm" showValue={false} />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {review.comment}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {new Date(review.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
