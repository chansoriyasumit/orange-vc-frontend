/**
 * API Types for Subscriptions Feature
 */

import { Subscription } from './Subscription';
import { PaginationInfo, PaginationParams } from '@/src/shared/types/pagination';
import { ApiResponse } from '@/src/lib/api/apiClient';

// Create Subscription
export interface CreateSubscriptionData {
  planId: string;
}

export type CreateSubscriptionResponse = Subscription;

export type CreateSubscriptionApiResponse = ApiResponse<CreateSubscriptionResponse>;

// Search Subscriptions
export interface SubscriptionSearchParams extends PaginationParams {
  status?: string;
}

export interface SubscriptionSearchData {
  subscriptions: Subscription[];
  pagination: PaginationInfo;
}

// API returns array directly in data
export type SubscriptionSearchResponse = ApiResponse<Subscription[]>;

// Get Active Subscription
export type ActiveSubscriptionResponse = ApiResponse<Subscription | null>;

// Get Subscription by ID
export type SubscriptionByIdResponse = ApiResponse<Subscription>;

// Verify Payment
export interface VerifyPaymentData {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export type VerifyPaymentResponse = ApiResponse<{
  subscription: Subscription;
  verified: boolean;
}>;

