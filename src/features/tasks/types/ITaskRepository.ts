/**
 * Task Repository Interface
 * Defines the contract for task data operations
 */

import { Task } from './Task';
import { CreateTaskData, UpdateTaskData, TaskSearchParams } from './api';
import { PaginationInfo } from '@/src/shared/types/pagination';

export interface TaskSearchResult {
  tasks: Task[];
  pagination: PaginationInfo;
}

export interface ITaskRepository {
  searchTasks(params?: TaskSearchParams): Promise<TaskSearchResult>;
  getTaskById(id: string): Promise<Task | null>;
  createTask(data: CreateTaskData): Promise<Task>;
  updateTask(id: string, data: UpdateTaskData): Promise<Task>;
  deleteTask(id: string): Promise<void>;
}

