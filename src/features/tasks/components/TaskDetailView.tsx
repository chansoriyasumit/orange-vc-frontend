"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  ArrowLeft,
  Calendar,
  User,
  Mail,
  AlertCircle,
  Pencil,
  Trash2,
  Loader2,
  HelpCircle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Task, TaskStatus, TaskPriority } from "../types";
import { format } from "date-fns";
import { cn } from "@/src/lib/utils/utils";
import { StatusTimeline } from "./StatusTimeline";
import { StreamChatWindow } from "./StreamChatWindow";
import { useDeleteTask } from "../hooks/useTaskMutations";
import { useToast } from "@/src/shared/hooks/use-toast";
import { TaskMediaDisplay } from "./TaskMediaDisplay";
import { TaskReviewForm } from "./TaskReviewForm";
import { TaskReviewDisplay } from "./TaskReviewDisplay";
import { useAuth } from "@/src/features/auth/lib/AuthContext";
import { Star } from "lucide-react";

interface TaskDetailViewProps {
  task: Task;
  onEdit?: () => void;
  onTaskUpdate?: () => void; // Callback to refresh task data
}

// Priority badge styling
const priorityConfig: Record<TaskPriority, { color: string; label: string }> = {
  LOW: {
    color: "bg-green-100 text-green-800 border-green-200",
    label: "Low Priority",
  },
  MEDIUM: {
    color: "bg-amber-100 text-amber-800 border-amber-200",
    label: "Medium Priority",
  },
  HIGH: {
    color: "bg-red-100 text-red-800 border-red-200",
    label: "High Priority",
  },
};

export function TaskDetailView({
  task,
  onEdit,
  onTaskUpdate,
}: TaskDetailViewProps) {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const { deleteTask, isDeleting } = useDeleteTask();
  const { toast } = useToast();
  const { user } = useAuth();

  const priorityStyle = priorityConfig[task.priority];
  const canEdit = task.status === "PENDING";
  const canDelete = task.status === "PENDING";
  const isCompleted = task.status === "COMPLETED";

  // Get the completion description from the completed stage
  const completedStage = task.stages.find((stage) => stage.status === "COMPLETED");
  const completionDescription = completedStage?.reason || null;

  // Check if current user has already submitted a review
  // Since only task creator can review, if there's a review and user is the creator, it's their review
  const hasUserReviewed = user && task.createdById === user.id && task.review;

  // Get the user's review (if exists)
  const userReview = hasUserReviewed && task.review ? task.review : null;

  // Check if current user is the task creator (only creator can review)
  const canReview =
    isCompleted && user && task.createdById === user.id && !hasUserReviewed;

  // Handle task deletion
  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      toast({
        title: "Task Deleted",
        description: "The task has been deleted successfully.",
      });
      router.push("/dashboard?tab=tasks");
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to delete task",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="ghost"
          onClick={() => router.push("/dashboard?tab=tasks")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Tasks
        </Button>

        <div className="flex gap-2">
          {canEdit && onEdit && (
            <Button
              variant="outline"
              onClick={onEdit}
              className="flex items-center gap-2"
            >
              <Pencil className="w-4 h-4" />
              Edit
            </Button>
          )}
          {canDelete && (
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(true)}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 border-red-200"
              disabled={isDeleting}
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          )}
          {task.status === "COMPLETED" && (
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => router.push("/contact")}
            >
              <HelpCircle className="w-4 h-4" />
              Get Support
            </Button>
          )}
        </div>
      </div>

      {/* Task Title and Status */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <h1 className="font-heading font-bold text-3xl text-rich-black">
            {task.title}
          </h1>
          {isCompleted && (
            <Badge
              className={cn(
                "border bg-green-100 text-green-800 border-green-200 flex items-center gap-1.5"
              )}
            >
              <CheckCircle2 className="w-4 h-4" />
              Completed
            </Badge>
          )}
        </div>
        <Badge className={cn("border", priorityStyle.color)}>
          {priorityStyle.label}
        </Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description and Attachments */}
          <Card className="p-6">
            {/* Description Section */}
            <div className="mb-6">
              <h2 className="font-heading font-bold text-lg text-rich-black mb-4">
                Description
              </h2>
              <p className="text-rich-black/80 whitespace-pre-wrap leading-relaxed break-words overflow-hidden">
                {task.description}
              </p>
            </div>

            {/* Media Attachments Section */}
            {task.medias && task.medias.length > 0 && (
              <div className="pt-6 border-t">
                <h2 className="font-heading font-bold text-lg text-rich-black mb-4">
                  Attachments ({task.medias.length})
                </h2>
                <TaskMediaDisplay media={task.medias} variant="detail" />
              </div>
            )}
          </Card>

          {/* Completion Section - Show when task is completed, otherwise show chat */}
          {isCompleted ? (
            <Card className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h2 className="font-heading font-bold text-lg text-rich-black mb-1">
                    Task Completed
                  </h2>
                  <p className="text-xs text-rich-black/60">
                    This task has been successfully completed
                  </p>
                </div>
              </div>

              {/* Completion Description */}
              {completionDescription && (
                <div className="mb-6 pt-4 border-t">
                  <h3 className="font-heading font-semibold text-sm text-rich-black mb-3">
                    Completion Notes
                  </h3>
                  <p className="text-rich-black/80 whitespace-pre-wrap leading-relaxed break-words">
                    {completionDescription}
                  </p>
                </div>
              )}

              {/* Submission Medias Section */}
              {task.submissionMedias && task.submissionMedias.length > 0 && (
                <div className={cn(
                  "pt-4",
                  completionDescription ? "border-t" : ""
                )}>
                  <h3 className="font-heading font-semibold text-sm text-rich-black mb-3">
                    Agent Submissions ({task.submissionMedias.length})
                  </h3>
                  <p className="text-sm text-rich-black/60 mb-4">
                    Files uploaded by the agent after completing this task
                  </p>
                  <TaskMediaDisplay 
                    media={task.submissionMedias} 
                    variant="detail" 
                  />
                </div>
              )}
            </Card>
          ) : (
            /* Chat Window - Only show when task is not completed */
            <StreamChatWindow
              taskStatus={task.status}
              agent={task.assignedTo}
              userName={task.createdBy.firstName}
              streamRoomId={task.streamRoomId}
            />
          )}
     
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Review Section - Only show for completed tasks */}
          {isCompleted && (
            <>
              {hasUserReviewed && userReview ? (
                // Show user's submitted review only (no "Task Completed!" section)
                <>
                  <Card className="p-6">
                    <h3 className="font-heading font-bold text-lg text-rich-black mb-4">
                      Your Review
                    </h3>
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      {/* Review Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={cn(
                                    "w-4 h-4",
                                    star <= userReview.rating
                                      ? "text-amber-400 fill-current"
                                      : "text-gray-300"
                                  )}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-xs text-rich-black/60">
                            {format(
                              new Date(userReview.createdAt),
                              "MMMM dd, yyyy • h:mm a"
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Review Text */}
                      <p className="text-sm text-rich-black/80 whitespace-pre-wrap leading-relaxed break-words">
                        {userReview.review}
                      </p>
                    </div>
                  </Card>
                </>
              ) : canReview ? (
                // Show "Task Completed!" section with review prompt if user can review
                <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-lg text-rich-black mb-1">
                        Task Completed!
                      </h3>
                      <p className="text-xs text-rich-black/60">
                        Your task has been successfully completed
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-green-200">
                    <div className="flex items-center gap-2 text-sm text-rich-black/80">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <p className="leading-relaxed">
                        We hope you're happy with the service! Your feedback
                        helps us improve and helps other users make better
                        decisions.
                      </p>
                    </div>
                    <Button
                      onClick={() => setShowReviewDialog(true)}
                      className="w-full bg-tomato hover:bg-tomato-600 shadow-md"
                    >
                      Share Your Experience
                    </Button>
                  </div>
                </Card>
              ) : null}
            </>
          )}

          {/* Task Details */}
          <Card className="p-6">
            <h3 className="font-heading font-bold text-lg text-rich-black mb-4">
              Task Details
            </h3>
            <div className="space-y-4">
              {/* Due Date */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-tomato/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-tomato" />
                </div>
                <div>
                  <p className="text-sm text-rich-black/60">Due Date</p>
                  <p className="font-medium text-rich-black">
                    {format(new Date(task.dueDate), "MMMM dd, yyyy")}
                  </p>
                </div>
              </div>

              {/* Created By */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-tomato/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-tomato" />
                </div>
                <div>
                  <p className="text-sm text-rich-black/60">Created By</p>
                  <p className="font-medium text-rich-black">
                    {task.createdBy.firstName} {task.createdBy.lastName}
                  </p>
                  <p className="text-sm text-rich-black/60">
                    {task.createdBy.email}
                  </p>
                </div>
              </div>

              {/* Assigned Agent */}
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                    task.assignedTo ? "bg-green-100" : "bg-amber-100"
                  )}
                >
                  {task.assignedTo ? (
                    <User className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm text-rich-black/60">Assigned Agent</p>
                  {task.assignedTo ? (
                    <>
                      <p className="font-medium text-rich-black">
                        {task.assignedTo.firstName} {task.assignedTo.lastName}
                      </p>
                      <p className="text-sm text-rich-black/60">
                        {task.assignedTo.email}
                      </p>
                    </>
                  ) : (
                    <p className="font-medium text-amber-600">
                      Awaiting assignment
                    </p>
                  )}
                </div>
              </div>

              {/* Created At */}
              <div className="pt-4 border-t">
                <p className="text-xs text-rich-black/50">
                  Created on{" "}
                  {format(new Date(task.createdAt), "MMMM dd, yyyy • h:mm a")}
                </p>
              </div>
            </div>
          </Card>

          {/* Status Timeline */}
          <StatusTimeline stages={task.stages} currentStatus={task.status} />
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Task?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Review Form Dialog */}
      {isCompleted && canReview && (
        <TaskReviewForm
          taskId={task.id}
          open={showReviewDialog}
          onOpenChange={setShowReviewDialog}
          onReviewSubmitted={() => {
            // Refresh task data to show the new review
            onTaskUpdate?.();
          }}
        />
      )}
    </div>
  );
}
