/**
 * Subscription Data Fetching Hooks
 */

import { useState, useEffect, useCallback } from 'react';
import { Subscription, SubscriptionSearchParams } from '../types';
import { PaginationInfo } from '@/src/shared/types/pagination';
import { apiSubscriptionRepository } from '../lib';

export function useActiveSubscription() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscription = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await apiSubscriptionRepository.getActiveSubscription();
      setSubscription(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch subscription');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  const refetch = useCallback(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  return {
    subscription,
    isLoading,
    error,
    refetch,
    hasActiveSubscription: !!subscription && subscription.status === 'ACTIVE',
  };
}

export function useSubscriptions(params: SubscriptionSearchParams = {}) {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);

  const fetchSubscriptions = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await apiSubscriptionRepository.searchSubscriptions(params);
      setSubscriptions(result.subscriptions);
      setPagination(result.pagination);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch subscriptions';
      setError(errorMessage);
      console.error('Error fetching subscriptions:', err);
    } finally {
      setIsLoading(false);
    }
  }, [params.page, params.limit, params.status]);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  return {
    subscriptions,
    isLoading,
    error,
    pagination,
    refetch: fetchSubscriptions,
  };
}

