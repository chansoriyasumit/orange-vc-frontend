/**
 * API Subscription Plan Repository
 * Implements subscription plan data fetching from the backend API
 */

import { apiClient } from '@/src/lib/api';
import { API_ENDPOINTS } from '@/src/lib/api/config';
import { PaginationInfo, buildPaginationQuery } from '@/src/shared/types';
import {
  ApiSubscriptionPlan,
  SubscriptionPlanSearchResponse,
  SubscriptionPlanSearchParams,
} from '../types/api';

export interface SubscriptionPlanSearchResult {
  plans: ApiSubscriptionPlan[];
  pagination: PaginationInfo;
}

export class ApiSubscriptionPlanRepository {
  /**
   * Search subscription plans with optional filters and pagination
   */
  async searchPlans(params: SubscriptionPlanSearchParams = {}): Promise<SubscriptionPlanSearchResult> {
    const queryString = buildPaginationQuery(params);
    const response = await apiClient.get<SubscriptionPlanSearchResponse>(
      `${API_ENDPOINTS.SUBSCRIPTION_PLANS.SEARCH}${queryString}`,
      { skipAuth: true }
    );

    return {
      plans: response.data.plans,
      pagination: response.data.pagination,
    };
  }

  /**
   * Get all subscription plans ordered by sortOrder
   */
  async getAllPlans(): Promise<ApiSubscriptionPlan[]> {
    const allPlans: ApiSubscriptionPlan[] = [];
    let currentPage = 1;
    let hasMore = true;

    while (hasMore) {
      const result = await this.searchPlans({ 
        page: currentPage, 
        limit: 50,
        orderBy: 'sortOrder:asc'
      });
      allPlans.push(...result.plans);
      hasMore = result.pagination.hasNextPage;
      currentPage++;
    }

    return allPlans;
  }

  /**
   * Get the popular plan (for highlighting in UI)
   */
  async getPopularPlan(): Promise<ApiSubscriptionPlan | null> {
    const result = await this.searchPlans({ limit: 50 });
    return result.plans.find(plan => plan.isPopular) || null;
  }
}

// Export singleton instance
export const apiSubscriptionPlanRepository = new ApiSubscriptionPlanRepository();

