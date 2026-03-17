/**
 * API Service Repository
 * Implements service data fetching from the backend API
 */

import { apiClient } from '@/src/lib/api';
import { API_ENDPOINTS } from '@/src/lib/api/config';
import { PaginationInfo, buildPaginationQuery } from '@/src/shared/types';
import {
  ApiService,
  ServiceSearchResponse,
  ServiceByIdResponse,
  ServiceSearchParams,
} from '../types/api';

export interface ServiceSearchResult {
  services: ApiService[];
  pagination: PaginationInfo;
}

export class ApiServiceRepository {
  /**
   * Search services with optional filters and pagination
   */
  async searchServices(params: ServiceSearchParams = {}): Promise<ServiceSearchResult> {
    const queryString = buildPaginationQuery(params);
    const response = await apiClient.get<ServiceSearchResponse>(
      `${API_ENDPOINTS.SERVICES.SEARCH}${queryString}`,
      { skipAuth: true }
    );

    return {
      services: response.data.services,
      pagination: response.data.pagination,
    };
  }

  /**
   * Get a single service by ID
   */
  async getServiceById(id: string): Promise<ApiService | null> {
    try {
      const response = await apiClient.get<ServiceByIdResponse>(
        API_ENDPOINTS.SERVICES.BY_ID(id),
        { skipAuth: true }
      );
      return response.data;
    } catch (error) {
      // Return null if service not found
      console.error('Error fetching service:', error);
      return null;
    }
  }

  /**
   * Get a single service by slug
   */
  async getServiceBySlug(slug: string): Promise<ApiService | null> {
    try {
      const response = await apiClient.get<ServiceByIdResponse>(
        API_ENDPOINTS.SERVICES.BY_SLUG(slug),
        { skipAuth: true }
      );
      return response.data;
    } catch (error) {
      // Return null if service not found
      console.error('Error fetching service by slug:', error);
      return null;
    }
  }

  /**
   * Get services by category ID
   */
  async getServicesByCategory(
    categoryId: string,
    params: Omit<ServiceSearchParams, 'categoryId'> = {}
  ): Promise<ServiceSearchResult> {
    return this.searchServices({ ...params, categoryId });
  }

  /**
   * Get all services (fetches all pages)
   * Use with caution - prefer paginated results for large datasets
   */
  async getAllServices(): Promise<ApiService[]> {
    const allServices: ApiService[] = [];
    let currentPage = 1;
    let hasMore = true;

    while (hasMore) {
      const result = await this.searchServices({ page: currentPage, limit: 50 });
      allServices.push(...result.services);
      hasMore = result.pagination.hasNextPage;
      currentPage++;
    }

    return allServices;
  }
}

// Export singleton instance
export const apiServiceRepository = new ApiServiceRepository();

