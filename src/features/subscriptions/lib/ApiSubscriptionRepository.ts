/**
 * API Subscription Repository
 * Handles subscription data operations and Razorpay integration
 */

import { apiClient } from '@/src/lib/api';
import { API_ENDPOINTS } from '@/src/lib/api/config';
import { buildPaginationQuery, PaginationInfo } from '@/src/shared/types/pagination';
import {
  Subscription,
  CreateSubscriptionData,
  SubscriptionSearchParams,
  CreateSubscriptionApiResponse,
  SubscriptionSearchResponse,
  ActiveSubscriptionResponse,
  SubscriptionByIdResponse,
  ISubscriptionRepository,
  SubscriptionSearchResult,
} from '../types';

export class ApiSubscriptionRepository implements ISubscriptionRepository {
  /**
   * Search subscriptions with optional filters and pagination
   */
  async searchSubscriptions(params: SubscriptionSearchParams = {}): Promise<SubscriptionSearchResult> {
    const queryString = buildPaginationQuery(params as any);
    const response = await apiClient.get<SubscriptionSearchResponse>(
      `${API_ENDPOINTS.SUBSCRIPTIONS.SEARCH}${queryString}`
    );

    // API returns array directly in data
    const subscriptions = Array.isArray(response.data) ? response.data : [];
    
    // If pagination info is not in response, create default pagination
    const pagination: PaginationInfo = {
      currentPage: params.page || 1,
      limit: params.limit || subscriptions.length || 10,
      totalDocs: subscriptions.length,
      totalPages: 1,
      hasNextPage: false,
      hasPrevPage: (params.page || 1) > 1,
    };

    return {
      subscriptions,
      pagination,
    };
  }

  /**
   * Get active subscription for current user
   */
  async getActiveSubscription(): Promise<Subscription | null> {
    try {
      const response = await apiClient.get<ActiveSubscriptionResponse>(
        API_ENDPOINTS.SUBSCRIPTIONS.ACTIVE
      );
      return response.data || null;
    } catch (error) {
      console.error('Error fetching active subscription:', error);
      return null;
    }
  }

  /**
   * Get a single subscription by ID
   */
  async getSubscriptionById(id: string): Promise<Subscription | null> {
    try {
      const response = await apiClient.get<SubscriptionByIdResponse>(
        API_ENDPOINTS.SUBSCRIPTIONS.BY_ID(id)
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching subscription:', error);
      return null;
    }
  }

  /**
   * Create a new subscription
   * Returns subscription with Razorpay details for authentication transaction
   */
  async createSubscription(data: CreateSubscriptionData): Promise<Subscription> {
    const response = await apiClient.post<CreateSubscriptionApiResponse>(
      API_ENDPOINTS.SUBSCRIPTIONS.CREATE,
      data
    );

    return response.data;
  }
}

// Export singleton instance
export const apiSubscriptionRepository = new ApiSubscriptionRepository();

