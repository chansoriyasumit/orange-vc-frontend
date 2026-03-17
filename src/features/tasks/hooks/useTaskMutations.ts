/**
 * Task Mutation Hooks
 */

import { useState, useCallback } from 'react';
import { CreateTaskData, UpdateTaskData, Task } from '../types';
import { apiTaskRepository } from '../lib';

export function useCreateTask() {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTask = useCallback(async (data: CreateTaskData): Promise<Task | null> => {
    setIsCreating(true);
    setError(null);

    try {
      const task = await apiTaskRepository.createTask(data);
      return task;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create task';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsCreating(false);
    }
  }, []);

  return {
    createTask,
    isCreating,
    error,
  };
}

export function useUpdateTask() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateTask = useCallback(
    async (id: string, data: UpdateTaskData): Promise<Task | null> => {
      setIsUpdating(true);
      setError(null);

      try {
        const task = await apiTaskRepository.updateTask(id, data);
        return task;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to update task';
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setIsUpdating(false);
      }
    },
    []
  );

  return {
    updateTask,
    isUpdating,
    error,
  };
}

export function useDeleteTask() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteTask = useCallback(async (id: string): Promise<void> => {
    setIsDeleting(true);
    setError(null);

    try {
      await apiTaskRepository.deleteTask(id);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete task';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  }, []);

  return {
    deleteTask,
    isDeleting,
    error,
  };
}

