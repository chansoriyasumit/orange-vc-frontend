/**
 * Task Statistics Hook
 * Fetches task statistics from the API
 */

import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '@/src/lib/api';
import { API_ENDPOINTS } from '@/src/lib/api/config';
import { TaskStatsResponse, TaskStatsData } from '../types/api';

export function useTaskStats() {
  const [stats, setStats] = useState<TaskStatsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.get<TaskStatsResponse>(
        API_ENDPOINTS.TASKS.STATS
      );
      setStats(response.data.status);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch task statistics';
      setError(errorMessage);
      console.error('Error fetching task stats:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    isLoading,
    error,
    refetch: fetchStats,
  };
}

