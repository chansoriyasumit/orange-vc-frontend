/**
 * API Task Repository
 * Implements task data fetching from the backend API
 */

import { apiClient } from '@/src/lib/api';
import { API_ENDPOINTS } from '@/src/lib/api/config';
import { buildPaginationQuery } from '@/src/shared/types/pagination';
import {
  Task,
  CreateTaskData,
  UpdateTaskData,
  TaskSearchParams,
  TaskSearchResponse,
  TaskByIdResponse,
  CreateTaskResponse,
  UpdateTaskResponse,
  ITaskRepository,
  TaskSearchResult,
} from '../types';

export class ApiTaskRepository implements ITaskRepository {
  /**
   * Search tasks with optional filters and pagination
   */
  async searchTasks(params: TaskSearchParams = {}): Promise<TaskSearchResult> {
    const queryString = buildPaginationQuery(params as any);
    const response = await apiClient.get<TaskSearchResponse>(
      `${API_ENDPOINTS.TASKS.SEARCH}${queryString}`
    );

    return {
      tasks: response.data.tasks,
      pagination: response.data.pagination,
    };
  }

  /**
   * Get a single task by ID
   */
  async getTaskById(id: string): Promise<Task | null> {
    try {
      const response = await apiClient.get<TaskByIdResponse>(
        API_ENDPOINTS.TASKS.BY_ID(id)
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching task:', error);
      return null;
    }
  }

  /**
   * Create a new task
   */
  async createTask(data: CreateTaskData): Promise<Task> {
    const response = await apiClient.post<CreateTaskResponse>(
      API_ENDPOINTS.TASKS.CREATE,
      data
    );
    return response.data;
  }

  /**
   * Update an existing task
   */
  async updateTask(id: string, data: UpdateTaskData): Promise<Task> {
    const response = await apiClient.patch<UpdateTaskResponse>(
      API_ENDPOINTS.TASKS.UPDATE(id),
      data
    );
    return response.data;
  }

  /**
   * Delete a task (only allowed for PENDING tasks)
   */
  async deleteTask(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.TASKS.DELETE(id));
  }
}

// Export singleton instance
export const apiTaskRepository = new ApiTaskRepository();

