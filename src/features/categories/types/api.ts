/**
 * Category API Types
 * Types matching the server API response structure
 */

import { PaginationInfo } from '@/src/shared/types';

// API Category entity
export interface ApiCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  isActive: boolean;
  sortOrder: number;
  iconId: string | null;
  bannerId: string | null;
  serviceIds: string[];
  subscriptionPlanIds: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  icon: {
    id: string;
    url: string;
  } | null;
  banner: {
    id: string;
    url: string;
  } | null;
  _count: {
    services: number;
  };
}

// Category Search API Response
export interface CategorySearchResponse {
  data: {
    categories: ApiCategory[];
    pagination: PaginationInfo;
  };
  message: string;
}

// Category Search Parameters
export interface CategorySearchParams {
  page?: number;
  limit?: number;
  isActive?: boolean;
  [key: string]: string | number | boolean | undefined;
}

