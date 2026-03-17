/**
 * Core Task Types
 */

export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface TaskStage {
  status: TaskStatus;
  reason: string;
  createdAt: string;
}

export interface TaskCreator {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface TaskAgent {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface TaskMedia {
  id: string;
  name: string;
  absoluteLink: string;
  thumbAbsoluteLink: string | null;
  mimeType: string | null;
  size: number | null;
}

export interface TaskReview {
  id: string;
  rating: number; // 1-5
  review: string;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  reason: string | null;
  hours: number | null;
  createdById: string;
  assignedToId: string | null;
  streamRoomId: string | null;
  mediaIds: string[];
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  stages: TaskStage[];
  createdBy: TaskCreator;
  assignedTo: (TaskAgent & { roleName?: string }) | null;
  medias: TaskMedia[];
  submissionMedias?: TaskMedia[] | null; // Media files uploaded by agent after completing the task
  review?: TaskReview; // Reviews for completed tasks
}

