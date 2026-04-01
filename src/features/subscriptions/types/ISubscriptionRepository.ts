/**
 * Subscription Repository Interface
 */

import { Subscription } from './Subscription';
import {
  CreateSubscriptionData,
  SubscriptionSearchParams,
  VerifyPaymentData,
} from './api';
import { PaginationInfo } from '@/src/shared/types/pagination';

export interface SubscriptionSearchResult {
  subscriptions: Subscription[];
  pagination: PaginationInfo;
}

export interface ISubscriptionRepository {
  searchSubscriptions(params?: SubscriptionSearchParams): Promise<SubscriptionSearchResult>;
  getActiveSubscription(): Promise<Subscription | null>;
  getSubscriptionById(id: string): Promise<Subscription | null>;
  createSubscription(data: CreateSubscriptionData): Promise<Subscription>;
  verifyPayment(data: VerifyPaymentData): Promise<Subscription>;
}

