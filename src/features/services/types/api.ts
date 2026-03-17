/**
 * Service API Types
 * Types matching the server API response structure
 */

import { PaginationInfo } from '@/src/shared/types';

// Category reference embedded in service response
export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
}

// Media/Asset reference (for icon and banner)
export interface MediaAsset {
  id: string;
  absolutePath?: string;
  absoluteLink?: string;
  url?: string; // Legacy support
  name?: string;
  thumbAbsolutePath?: string;
  thumbAbsoluteLink?: string;
  thumbName?: string;
  mimeType?: string | null;
  size?: number | null;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
  taskMediaIds?: string[];
  taskSubmissionMediaIds?: string[];
}

// API Service entity
export interface ApiService {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  tags: string[];
  differentiator?: string; // Service differentiator text from API
  isActive: boolean;
  sortOrder: number;
  categoryIds: string[];
  iconId: string | null;
  bannerId: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  categories: ServiceCategory[];
  icon: MediaAsset | null;
  banner: MediaAsset | null;
}

// Service Search API Response
export interface ServiceSearchResponse {
  data: {
    services: ApiService[];
    pagination: PaginationInfo;
  };
  message: string;
}

// Service By ID API Response
export interface ServiceByIdResponse {
  data: ApiService;
  message: string;
}

// Service Search Parameters
export interface ServiceSearchParams {
  page?: number;
  limit?: number;
  categoryId?: string;
  search?: string;
  isActive?: boolean;
  [key: string]: string | number | boolean | undefined;
}

