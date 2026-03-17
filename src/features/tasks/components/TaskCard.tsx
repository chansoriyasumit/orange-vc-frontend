"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Clock, AlertCircle } from "lucide-react";
import { Task, TaskStatus, TaskPriority } from "../types";
import { format, formatDistanceToNow, isPast } from "date-fns";
import { cn } from "@/src/lib/utils/utils";
import Link from "next/link";
import { TaskMediaDisplay } from "./TaskMediaDisplay";

interface TaskCardProps {
  task: Task;
}

// Status badge styling
const statusConfig: Record<TaskStatus, { color: string; label: string }> = {
  PENDING: {
    color: "bg-amber-100 text-amber-800 border-amber-200",
    label: "Pending",
  },
  IN_PROGRESS: {
    color: "bg-blue-100 text-blue-800 border-blue-200",
    label: "In Progress",
  },
  COMPLETED: {
    color: "bg-green-100 text-green-800 border-green-200",
    label: "Completed",
  },
  CANCELLED: {
    color: "bg-gray-100 text-gray-800 border-gray-200",
    label: "Cancelled",
  },
};

// Priority badge styling
const priorityConfig: Record<TaskPriority, { color: string; label: string }> = {
  LOW: { color: "bg-green-100 text-green-800 border-green-200", label: "Low" },
  MEDIUM: {
    color: "bg-amber-100 text-amber-800 border-amber-200",
    label: "Medium",
  },
  HIGH: { color: "bg-red-100 text-red-800 border-red-200", label: "High" },
};

export function TaskCard({ task }: TaskCardProps) {
  const statusStyle = statusConfig[task.status];
  const priorityStyle = priorityConfig[task.priority];
  const dueDate = new Date(task.dueDate);
  const isDueSoon =
    !isPast(dueDate) && formatDistanceToNow(dueDate).includes("day");
  const isOverdue = isPast(dueDate) && task.status !== "COMPLETED";

  return (
    <Link href={`/dashboard/tasks/${task.id}`}>
      <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
        <div className="flex gap-4">
          {/* Left Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <h3 className="font-heading font-bold text-lg text-rich-black line-clamp-2 flex-1">
                {task.title}
              </h3>
              <Badge className={cn("border", statusStyle.color)}>
                {statusStyle.label}
              </Badge>
            </div>

            <div className="flex md:flex-row flex-col items-center gap-4 justify-between">
              <div>
                {/* Description */}
                <p className="text-rich-black/70 text-sm line-clamp-2 mb-4">
                  {task.description}
                </p>

                {/* Meta Information */}
                <div className="flex flex-wrap gap-4 text-sm text-rich-black/60">
                  {/* Priority */}
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={cn("border", priorityStyle.color)}
                    >
                      {priorityStyle.label}
                    </Badge>
                  </div>

                  {/* Due Date */}
                  <div className="flex items-center gap-1.5">
                    {isOverdue ? (
                      <AlertCircle className="w-4 h-4 text-red-500" />
                    ) : (
                      <Calendar className="w-4 h-4" />
                    )}
                    <span
                      className={cn(
                        isOverdue && "text-red-600 font-medium",
                        isDueSoon && "text-amber-600"
                      )}
                    >
                      {isOverdue && "Overdue: "}
                      {format(dueDate, "MMM dd, yyyy")}
                    </span>
                  </div>

                  {/* Assigned Agent */}
                  {task.assignedTo ? (
                    <div className="flex items-center gap-1.5">
                      <User className="w-4 h-4" />
                      <span>
                        {task.assignedTo.firstName} {task.assignedTo.lastName}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-amber-600">
                      <Clock className="w-4 h-4" />
                      <span>Awaiting assignment</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Media Preview */}
              {task.medias && task.medias.length > 0 && (
                <div className="flex-shrink-0">
                  <TaskMediaDisplay media={task.medias} variant="card" />
                </div>
              )}
            </div>

            {/* Footer - Created date */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-rich-black/50">
                Created{" "}
                {formatDistanceToNow(new Date(task.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
