/**
 * API Category Repository
 * Implements category data fetching from the backend API
 */

import { apiClient } from '@/src/lib/api';
import { API_ENDPOINTS } from '@/src/lib/api/config';
import { PaginationInfo, buildPaginationQuery } from '@/src/shared/types';
import {
  ApiCategory,
  CategorySearchResponse,
  CategorySearchParams,
} from '../types/api';

export interface CategorySearchResult {
  categories: ApiCategory[];
  pagination: PaginationInfo;
}

export class ApiCategoryRepository {
  /**
   * Search categories with optional filters and pagination
   */
  async searchCategories(params: CategorySearchParams = {}): Promise<CategorySearchResult> {
    const queryString = buildPaginationQuery(params);
    const response = await apiClient.get<CategorySearchResponse>(
      `${API_ENDPOINTS.CATEGORIES.SEARCH}${queryString}`,
      { skipAuth: true }
    );

    return {
      categories: response.data.categories,
      pagination: response.data.pagination,
    };
  }

  /**
   * Get all categories (for dropdown/filter usage)
   * Most apps have few categories, so fetching all is typically fine
   */
  async getAllCategories(): Promise<ApiCategory[]> {
    const allCategories: ApiCategory[] = [];
    let currentPage = 1;
    let hasMore = true;

    while (hasMore) {
      const result = await this.searchCategories({ page: currentPage, limit: 50 });
      allCategories.push(...result.categories);
      hasMore = result.pagination.hasNextPage;
      currentPage++;
    }

    // Sort by sortOrder
    return allCategories.sort((a, b) => a.sortOrder - b.sortOrder);
  }
}

// Export singleton instance
export const apiCategoryRepository = new ApiCategoryRepository();

