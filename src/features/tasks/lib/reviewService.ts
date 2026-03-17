/**
 * Review Service
 * Handles review API calls
 */

import { apiClient } from '@/src/lib/api';
import { API_ENDPOINTS } from '@/src/lib/api/config';
import { CreateReviewData, CreateReviewResponse } from '../types/api';

export class ReviewService {
  /**
   * Create a review for a completed task
   */
  async createReview(data: CreateReviewData): Promise<void> {
    await apiClient.post<CreateReviewResponse>(
      API_ENDPOINTS.USERS.REVIEWS,
      data
    );
  }
}

// Export singleton instance
export const reviewService = new ReviewService();

