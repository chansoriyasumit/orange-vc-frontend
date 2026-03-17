'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Star, Loader2 } from 'lucide-react';
import { useCreateReview } from '../hooks/useReview';
import { useToast } from '@/src/shared/hooks/use-toast';
import { cn } from '@/src/lib/utils/utils';

interface TaskReviewFormProps {
  taskId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReviewSubmitted?: () => void;
}

export function TaskReviewForm({ taskId, open, onOpenChange, onReviewSubmitted }: TaskReviewFormProps) {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [review, setReview] = useState('');
  const { createReview, isCreating, error } = useCreateReview();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast({
        title: 'Rating Required',
        description: 'Please select a rating before submitting your review.',
        variant: 'destructive',
      });
      return;
    }

    if (!review.trim()) {
      toast({
        title: 'Review Required',
        description: 'Please write a review before submitting.',
        variant: 'destructive',
      });
      return;
    }

    try {
      await createReview({
        taskId,
        rating,
        review: review.trim(),
      });

      toast({
        title: 'Review Submitted',
        description: 'Thank you for your feedback!',
      });

      // Reset form
      setRating(0);
      setReview('');
      setHoveredRating(0);

      // Close dialog
      onOpenChange(false);

      // Notify parent to refresh task data
      onReviewSubmitted?.();
    } catch (err) {
      // Error is already handled by the hook
      console.error('Failed to submit review:', err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
          <DialogDescription>
            Share your experience with this completed task.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
      {/* Rating Stars */}
      <div>
        <label className="text-sm font-medium text-rich-black mb-2 block">
          Rating *
        </label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => {
            const isActive = hoveredRating >= star || (!hoveredRating && rating >= star);
            return (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className={cn(
                  'transition-colors focus:outline-none',
                  isActive ? 'text-amber-400' : 'text-gray-300'
                )}
              >
                <Star
                  className={cn(
                    'w-6 h-6',
                    isActive && 'fill-current'
                  )}
                />
              </button>
            );
          })}
          {rating > 0 && (
            <span className="ml-2 text-sm text-rich-black/60">
              {rating} {rating === 1 ? 'star' : 'stars'}
            </span>
          )}
        </div>
      </div>

      {/* Review Text */}
      <div>
        <label htmlFor="review-text" className="text-sm font-medium text-rich-black mb-2 block">
          Your Review *
        </label>
        <Textarea
          id="review-text"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Share your experience with this task..."
          className="min-h-[100px] resize-none"
          disabled={isCreating}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

          {/* Submit Button */}
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isCreating}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isCreating || rating === 0 || !review.trim()}
              className="bg-tomato hover:bg-tomato-600"
            >
              {isCreating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Review'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

