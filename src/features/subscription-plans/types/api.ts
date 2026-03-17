/**
 * Subscription Plan API Types
 * Types matching the server API response structure
 */

import { PaginationInfo } from '@/src/shared/types';

// Feature included in a subscription plan
export interface PlanFeature {
  feature: string;
  description: string;
  included: boolean;
}

// Plan billing cycle
export type BillingCycle = 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';

// Plan type
export type PlanType = 'FIXED' | 'HOURLY' | 'CUSTOM';

// API Subscription Plan entity
export interface ApiSubscriptionPlan {
  id: string;
  name: string;
  slug: string;
  description: string;
  tagline: string;
  planType: PlanType;
  hoursPerMonth: number;
  additionalHourly: number | null;
  price: number;
  billingCycle: BillingCycle;
  currency: string;
  hasFreeTrial: boolean;
  freeTrialDays: number | null;
  isPopular: boolean;
  isFeatured: boolean;
  tasksIncluded: string[];
  categoryIds: string[];
  isActive: boolean;
  sortOrder: number;
  color: string | null;
  stripePriceId: string | null;
  stripeProductId: string | null;
  maxUsers: number | null;
  maxProjects: number | null;
  supportLevel: string | null;
  responseTime: string | null;
  metadata: Record<string, unknown> | null;
  features: PlanFeature[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

// Subscription Plan Search API Response
export interface SubscriptionPlanSearchResponse {
  data: {
    plans: ApiSubscriptionPlan[];
    pagination: PaginationInfo;
  };
  message: string;
}

// Subscription Plan Search Parameters
export interface SubscriptionPlanSearchParams {
  page?: number;
  limit?: number;
  isActive?: boolean;
  categoryId?: string;
  orderBy?: string;
  [key: string]: string | number | boolean | undefined;
}

