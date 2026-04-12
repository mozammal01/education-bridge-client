"use client";

import { useState } from "react";
import { Star, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { reviewsService } from "@/services";
import { toast } from "sonner";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  tutorId?: string | null;
  tutorName?: string | null;
  onSuccess?: () => void;
}

export function ReviewModal({ isOpen, onClose, tutorId, tutorName, onSuccess }: Props) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const ratingLabels = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

  const handleSubmit = async () => {
    if (!rating) {
      toast.error("Please select a rating");
      return;
    }
    if (!comment.trim()) {
      toast.error("Please write a review");
      return;
    }

    setLoading(true);
    try {
      await reviewsService.createReview({ tutorId, rating, comment: comment.trim() });
      toast.success("Review submitted!");
      onSuccess?.();
      handleClose();
    } catch {
      toast.error("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setRating(0);
    setHover(0);
    setComment("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{tutorId ? "Review Your Session" : "Rate Your Experience"}</DialogTitle>
          <DialogDescription>
            {tutorId 
              ? `Share your experience with ${tutorName}` 
              : "Help us improve EduBridge by sharing your feedback"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="text-center">
            <p className="text-sm font-medium mb-3">How would you rate this session?</p>
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className="p-1"
                >
                  <Star
                    className={cn(
                      "w-8 h-8",
                      (hover || rating) >= star
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    )}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-muted-foreground mt-2">{ratingLabels[rating]}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Your Review</label>
            <Textarea
              placeholder="Share your experience..."
              value={comment}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
              rows={4}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={handleClose} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading || !rating || !comment.trim()}
            className="flex-1"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Review"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
