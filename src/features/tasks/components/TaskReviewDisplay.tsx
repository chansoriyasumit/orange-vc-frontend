"use client";

import { Star } from "lucide-react";
import { TaskReview } from "../types";
import { format } from "date-fns";
import { cn } from "@/src/lib/utils/utils";

interface TaskReviewDisplayProps {
  review: TaskReview;
}

export function TaskReviewDisplay({ review }: TaskReviewDisplayProps) {
  if (!review) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div
        key={review.id}
        className="p-4 bg-gray-50 border border-gray-200 rounded-lg"
      >
        {/* Review Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={cn(
                      "w-4 h-4",
                      star <= review.rating
                        ? "text-amber-400 fill-current"
                        : "text-gray-300"
                    )}
                  />
                ))}
              </div>
            </div>
            <p className="text-xs text-rich-black/60">
              {format(new Date(review.createdAt), "MMMM dd, yyyy • h:mm a")}
            </p>
          </div>
        </div>

        {/* Review Text */}
        <p className="text-sm text-rich-black/80 whitespace-pre-wrap leading-relaxed">
          {review.review}
        </p>
      </div>
    </div>
  );
}
