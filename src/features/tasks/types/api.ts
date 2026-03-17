/**
 * API Types for Tasks Feature
 */

import { Task, TaskPriority, TaskStatus } from './Task';
import { PaginationInfo, PaginationParams } from '@/src/shared/types/pagination';
import { ApiResponse } from '@/src/lib/api/apiClient';

// Search/List Tasks
export interface TaskSearchParams extends PaginationParams {
  status?: TaskStatus;
  priority?: TaskPriority;
  search?: string;
  sortBy?: 'createdAt' | 'dueDate' | 'priority';
  sortOrder?: 'asc' | 'desc';
}

export interface TaskSearchData {
  tasks: Task[];
  pagination: PaginationInfo;
}

export type TaskSearchResponse = ApiResponse<TaskSearchData>;

// Get Task by ID
export type TaskByIdResponse = ApiResponse<Task>;

// Create Task
export interface CreateTaskData {
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate: string;
  mediaIds?: string[];
}

export type CreateTaskResponse = ApiResponse<Task>;

// Update Task
export interface UpdateTaskData {
  title?: string;
  description?: string;
  priority?: TaskPriority;
  dueDate?: string;
  status?: TaskStatus;
  reason?: string;
}

export type UpdateTaskResponse = ApiResponse<Task>;

// Delete Task
export type DeleteTaskResponse = ApiResponse<{ message: string }>;

// File Upload
export interface UploadedFile {
  id: string;
  url: string;
  type: string;
  name: string;
  size: number;
}

export interface FileUploadResponse {
  data: UploadedFile;
  message: string;
}

// Stream Chat Token
export interface StreamTokenData {
  token: string;
  userId: string;
}

export type StreamTokenResponse = ApiResponse<StreamTokenData>;

// Create Review
export interface CreateReviewData {
  taskId: string;
  rating: number; // 1-5
  review: string;
}

export type CreateReviewResponse = ApiResponse<{ message: string }>;

// Task Statistics
export interface TaskStatsData {
  PENDING: number;
  IN_PROGRESS: number;
  COMPLETED: number;
  CANCELLED: number;
  REJECTED: number;
  TOTAL: number;
}

export interface TaskStatsResponseData {
  status: TaskStatsData;
}

export type TaskStatsResponse = ApiResponse<TaskStatsResponseData>;

