/**
 * Review Hook
 * Manages review creation
 */

import { useState, useCallback } from 'react';
import { CreateReviewData } from '../types/api';
import { reviewService } from '../lib/reviewService';

export function useCreateReview() {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createReview = useCallback(async (data: CreateReviewData): Promise<void> => {
    setIsCreating(true);
    setError(null);

    try {
      await reviewService.createReview(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create review';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsCreating(false);
    }
  }, []);

  return {
    createReview,
    isCreating,
    error,
  };
}

