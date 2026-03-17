/**
 * Tasks Data Fetching Hooks
 */

import { useState, useEffect, useCallback } from 'react';
import { Task, TaskSearchParams } from '../types';
import { apiTaskRepository } from '../lib';
import { PaginationInfo } from '@/src/shared/types/pagination';

export function useTasks(initialParams: TaskSearchParams = {}) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState<TaskSearchParams>(initialParams);

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await apiTaskRepository.searchTasks(params);
      setTasks(result.tasks);
      setPagination(result.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const refetch = useCallback(() => {
    fetchTasks();
  }, [fetchTasks]);

  const updateParams = useCallback((newParams: Partial<TaskSearchParams>) => {
    setParams(prev => ({ ...prev, ...newParams }));
  }, []);

  return {
    tasks,
    pagination,
    isLoading,
    error,
    refetch,
    updateParams,
    params,
  };
}

export function useTask(taskId: string | null) {
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTask = useCallback(async () => {
    if (!taskId) {
      setTask(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await apiTaskRepository.getTaskById(taskId);
      setTask(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch task');
    } finally {
      setIsLoading(false);
    }
  }, [taskId]);

  useEffect(() => {
    fetchTask();
  }, [fetchTask]);

  const refetch = useCallback(() => {
    fetchTask();
  }, [fetchTask]);

  return {
    task,
    isLoading,
    error,
    refetch,
  };
}

