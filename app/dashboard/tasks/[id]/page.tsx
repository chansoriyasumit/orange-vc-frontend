'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/src/features/auth/lib/AuthContext';
import { useTask } from '@/src/features/tasks/hooks/useTasks';
import { TaskDetailView } from '@/src/features/tasks/components/TaskDetailView';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

function TaskDetailContent() {
  const router = useRouter();
  const params = useParams();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const taskId = params.id as string;
  const { task, isLoading, error, refetch } = useTask(taskId);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth/signin?redirect=/dashboard/tasks/' + taskId);
    }
  }, [isAuthenticated, authLoading, router, taskId]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-white-smoke">
        <Header />
        <div className="container mx-auto max-w-7xl px-6 lg:px-8 pt-24 pb-12">
          <Skeleton className="h-10 w-32 mb-8" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-32 mb-8" />
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-96 w-full" />
            </div>
            <div>
              <Skeleton className="h-80 w-full" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white-smoke">
        <Header />
        <div className="container mx-auto max-w-7xl px-6 lg:px-8 pt-24 pb-12">
          <div className="flex flex-col items-center justify-center py-20">
            <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
            <h1 className="font-heading font-bold text-2xl text-rich-black mb-2">
              Error Loading Task
            </h1>
            <p className="text-rich-black/70 mb-6">{error}</p>
            <Button onClick={() => router.push('/dashboard')}>
              Back to Dashboard
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!task) {
    return (
      <div className="min-h-screen bg-white-smoke">
        <Header />
        <div className="container mx-auto max-w-7xl px-6 lg:px-8 pt-24 pb-12">
          <div className="flex flex-col items-center justify-center py-20">
            <AlertCircle className="w-16 h-16 text-amber-500 mb-4" />
            <h1 className="font-heading font-bold text-2xl text-rich-black mb-2">
              Task Not Found
            </h1>
            <p className="text-rich-black/70 mb-6">
              The task you're looking for doesn't exist or has been deleted.
            </p>
            <Button onClick={() => router.push('/dashboard')}>
              Back to Dashboard
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white-smoke">
      <Header />
      <div className="container mx-auto max-w-7xl px-6 lg:px-8 pt-24 pb-12">
        <TaskDetailView task={task} onTaskUpdate={refetch} />
      </div>
      <Footer />
    </div>
  );
}

export default function TaskDetailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-rich-black/60">Loading task...</p>
      </div>
    }>
      <TaskDetailContent />
    </Suspense>
  );
}

