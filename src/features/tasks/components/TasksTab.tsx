'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { CreateTaskDialog } from './CreateTaskDialog';
import { TaskList } from './TaskList';

interface TasksTabProps {
  hasActiveSubscription: boolean;
}

export function TasksTab({ hasActiveSubscription }: TasksTabProps) {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTaskCreated = () => {
    // Trigger task list refresh
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-heading font-bold text-2xl text-rich-black">
            My Tasks
          </h2>
          <p className="text-rich-black/70 mt-1">
            Track and manage your task requests
          </p>
        </div>
        {hasActiveSubscription ? (
          <Button 
            onClick={() => setShowCreateDialog(true)}
            className="bg-tomato hover:bg-tomato-600 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Task
          </Button>
        ) : (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800">
              Subscribe to a service to create tasks.{' '}
              <Link href="/" className="font-medium underline">
                Browse services
              </Link>
            </p>
          </div>
        )}
      </div>

      {/* Task List */}
      <TaskList key={refreshKey} />

      {/* Create Task Dialog */}
      <CreateTaskDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onTaskCreated={handleTaskCreated}
      />
    </div>
  );
}

