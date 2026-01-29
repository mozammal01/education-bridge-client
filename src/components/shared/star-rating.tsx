"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  showValue = true,
  className,
}: StarRatingProps) {
  const sizeMap = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const textSize = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex">
        {Array.from({ length: maxRating }).map((_, i) => {
          const filled = i < Math.floor(rating);
          const partial = !filled && i < rating;
          
          return (
            <Star
              key={i}
              className={cn(
                sizeMap[size],
                filled ? "text-amber-400 fill-amber-400" : 
                partial ? "text-amber-400 fill-amber-400/50" : 
                "text-muted-foreground/30"
              )}
            />
          );
        })}
      </div>
      {showValue && (
        <span className={cn("font-medium text-foreground", textSize[size])}>
          {rating?.toFixed(1)}
        </span>
      )}
    </div>
  );
}
