"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/src/features/auth/lib/AuthContext";
import { useActiveSubscription, useSubscriptions } from "@/src/features/subscriptions/hooks/useSubscriptions";
import { useTaskStats } from "@/src/features/tasks/hooks/useTaskStats";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  CheckCircle,
  Mail,
  Calendar,
  Package,
  Clock,
  Plus,
  Loader2,
} from "lucide-react";
import { TaskList } from "@/src/features/tasks/components/TaskList";
import { CreateTaskDialog } from "@/src/features/tasks/components/CreateTaskDialog";
import { EmailVerificationDialog } from "@/src/features/auth/components/EmailVerificationDialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/src/shared/hooks/use-toast";
import Link from "next/link";
import { format } from "date-fns";

function EmailVerificationHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, isAuthenticated, isLoading, resendVerificationEmail, refreshUser } = useAuth();
  const { toast } = useToast();
  const [showCallbackDialog, setShowCallbackDialog] = useState(false);
  const [showUnverifiedDialog, setShowUnverifiedDialog] = useState(false);
  const [isResendingEmail, setIsResendingEmail] = useState(false);
  const [status, setStatus] = useState<'success' | 'failed'>('success');
  const [reason, setReason] = useState<string | undefined>();

  // Handle email verification callback from email link
  useEffect(() => {
    const emailVerification = searchParams.get('emailVerification');
    
    if (emailVerification === 'success') {
      setStatus('success');
      setReason(undefined);
      setShowCallbackDialog(true);
    } else if (emailVerification === 'false') {
      setStatus('failed');
      setReason(searchParams.get('reason') || undefined);
      setShowCallbackDialog(true);
    }
  }, [searchParams]);

  // Refresh user data when page becomes visible (user might have verified in another tab)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isAuthenticated && !isLoading) {
        refreshUser();
      }
    };

    // Also check on focus (when user switches back to tab)
    const handleFocus = () => {
      if (isAuthenticated && !isLoading) {
        refreshUser();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [isAuthenticated, isLoading, refreshUser]);

  // Show unverified email dialog when user logs in and is not verified
  useEffect(() => {
    if (!isLoading && isAuthenticated && user && !user.isEmailVerified && !showUnverifiedDialog && !showCallbackDialog) {
      setShowUnverifiedDialog(true);
    }
    // Close dialog if user verifies their email
    if (user?.isEmailVerified && showUnverifiedDialog) {
      setShowUnverifiedDialog(false);
    }
  }, [isLoading, isAuthenticated, user, showUnverifiedDialog, showCallbackDialog]);

  const handleCallbackClose = () => {
    setShowCallbackDialog(false);
    // Clean up URL
    router.replace('/dashboard', { scroll: false });
  };

  const handleUnverifiedClose = () => {
    setShowUnverifiedDialog(false);
  };

  const handleResendEmail = async () => {
    setIsResendingEmail(true);
    try {
      await resendVerificationEmail();
      toast({
        title: 'Verification email sent',
        description: 'Please check your inbox and click the verification link.',
      });
    } catch (err: any) {
      toast({
        title: 'Failed to resend email',
        description: err.message || 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsResendingEmail(false);
    }
  };

  return (
    <>
      {/* Email verification callback dialog (from email link) */}
      {showCallbackDialog && (
        <EmailVerificationDialog
          status={status}
          reason={reason}
          onClose={handleCallbackClose}
        />
      )}

      {/* Unverified email dialog (shown after login) */}
      {showUnverifiedDialog && user && (
        <AlertDialog open={showUnverifiedDialog} onOpenChange={handleUnverifiedClose}>
          <AlertDialogContent className="sm:max-w-md bg-white">
            <AlertDialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-orange-600" />
                </div>
                <AlertDialogTitle className="text-xl">Verify Your Email</AlertDialogTitle>
              </div>
              <AlertDialogDescription className="text-base text-rich-black/70 pt-2">
                We've sent a verification email to <strong>{user.email}</strong>. Please check your inbox and click the verification link to activate your account.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col sm:flex-row gap-2">
              <AlertDialogAction
                onClick={handleResendEmail}
                disabled={isResendingEmail}
                className="w-full sm:w-auto bg-tomato hover:bg-tomato-600"
              >
                {isResendingEmail ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Resend Email
                  </>
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, isLoading, user } = useAuth();
  const {
    subscription,
    hasActiveSubscription,
    isLoading: isLoadingSubscription,
  } = useActiveSubscription();
  const { subscriptions: allSubscriptions } = useSubscriptions();
  const { stats: taskStats, isLoading: isLoadingStats, refetch: refetchStats } = useTaskStats();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Check if user has subscription (from API or query param)
  const hasSubscription =
    hasActiveSubscription || searchParams.get("subscribed") === "true";

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/signin?redirect=/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (searchParams.get("subscribed")) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    }
  }, [searchParams]);

  const handleTaskCreated = () => {
    setRefreshKey((prev) => prev + 1);
    // Refresh stats when a new task is created
    refetchStats();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-rich-black/60">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  // Get user's full name
  const fullName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.firstName || user?.email?.split("@")[0];

  // Get user's initials for avatar
  const initials =
    user?.firstName && user?.lastName
      ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
      : user?.email?.[0]?.toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-white-smoke">
      <Header />
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-8 lg:pt-28 lg:pb-12">
        {showSuccess && (
          <div className="mb-6 p-4 sm:p-6 rounded-lg bg-green-50 border border-green-200 flex items-start gap-4">
            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-heading font-bold text-base sm:text-lg text-green-900 mb-1">
                Subscription Successful!
              </h3>
              <p className="text-sm sm:text-base text-green-700">
                Your subscription has been activated. You can now create tasks
                and track your requests.
              </p>
            </div>
          </div>
        )}

        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-rich-black mb-2">
            Welcome back, {user?.firstName || user?.email?.split("@")[0]}!
          </h1>
          <p className="text-base sm:text-lg text-rich-black/70">
            Your command center for managing tasks and subscriptions
          </p>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Profile & Subscription */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card className="p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-tomato to-tomato-600 flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-2xl font-bold text-white">
                    {initials}
                  </span>
                </div>
                <h2 className="font-heading font-bold text-xl text-rich-black mb-1">
                  {fullName}
                </h2>
                <p className="text-sm text-rich-black/60 flex items-center gap-2 justify-center">
                  {user?.email}
                  {!user?.isEmailVerified && (
                    <Badge
                      variant="outline"
                      className="text-xs bg-amber-50 text-amber-700 border-amber-200"
                    >
                      Not Verified
                    </Badge>
                  )}
                </p>
              </div>

              {/* Stats Section */}
              <div className="pt-2 mt-6">
                {isLoadingStats ? (
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="text-center p-3 bg-gray-100 rounded-lg animate-pulse">
                        <div className="h-8 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                      </div>
                    ))}
                  </div>
                ) : taskStats ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-tomato/5 rounded-lg">
                      <p className="text-2xl font-bold text-rich-black">
                        {taskStats.TOTAL}
                      </p>
                      <p className="text-xs text-rich-black/60 mt-1">
                        Total Tasks
                      </p>
                    </div>
                    <div className="text-center p-3 bg-tomato/5 rounded-lg">
                      <p className="text-2xl font-bold text-rich-black">
                        {taskStats.PENDING}
                      </p>
                      <p className="text-xs text-rich-black/60 mt-1">Pending</p>
                    </div>
                    <div className="text-center p-3 bg-tomato/5 rounded-lg">
                      <p className="text-2xl font-bold text-rich-black">
                        {taskStats.IN_PROGRESS}
                      </p>
                      <p className="text-xs text-rich-black/60 mt-1">
                        In Progress
                      </p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-700">
                        {taskStats.COMPLETED}
                      </p>
                      <p className="text-xs text-green-700/70 mt-1">Completed</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-4 text-sm text-rich-black/60">
                    Unable to load statistics
                  </div>
                )}
              </div>
            </Card>

            {/* Subscription Card */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-tomato/10 flex items-center justify-center">
                    <Package className="w-5 h-5 text-tomato" />
                  </div>
                  <h2 className="font-heading font-bold text-xl text-rich-black">
                    {allSubscriptions.length > 1 ? "Subscriptions" : "Subscription"}
                  </h2>
                </div>
                {allSubscriptions.length > 1 && (
                  <Link href="/subscriptions">
                    <Button variant="ghost" size="sm" className="text-tomato hover:text-tomato-600">
                      View All
                    </Button>
                  </Link>
                )}
              </div>

              {hasSubscription && subscription ? (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-green-600 text-white">Active</Badge>
                      <span className="text-sm font-semibold text-rich-black">
                        {subscription.plan?.name || "Active Plan"}
                      </span>
                    </div>
                    {subscription.plan && (
                      <p className="text-xs text-rich-black/70 mt-2">
                        {subscription.plan.billingCycle} •{" "}
                        {subscription.plan.currency} {subscription.plan.price}
                      </p>
                    )}
                  </div>

                  {subscription.hoursRemaining !== undefined && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-rich-black/70">
                          Hours Remaining
                        </span>
                        <span className="font-semibold text-rich-black">
                          {subscription.hoursRemaining} /{" "}
                          {subscription.hours ||
                            subscription.plan?.hours ||
                            subscription.plan?.hoursPerMonth ||
                            subscription.hoursRemaining +
                              subscription.hoursUsed}
                        </span>
                      </div>
                      <div className="w-full bg-platinum rounded-full h-2">
                        <div
                          className="bg-tomato h-2 rounded-full transition-all"
                          style={{
                            width: `${Math.min(
                              100,
                              (subscription.hoursRemaining /
                                (subscription.hours ||
                                  subscription.plan?.hours ||
                                  subscription.plan?.hoursPerMonth ||
                                  subscription.hoursRemaining +
                                    subscription.hoursUsed)) *
                                100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {(subscription.validityEndDate || subscription.currentPeriodEnd) && (
                    <div className="flex items-center gap-2 text-sm text-rich-black/70 pt-2 border-t">
                      <Clock className="w-4 h-4" />
                      <span>
                        {subscription.status === "ACTIVE" ? "Renews" : "Expires"}{" "}
                        {format(
                          new Date(
                            subscription.validityEndDate || subscription.currentPeriodEnd || ""
                          ),
                          "MMM d, yyyy"
                        )}
                      </span>
                    </div>
                  )}

                  <Link href="/pricing" className="block">
                    <Button variant="outline" className="w-full mt-4">
                      Browse Subscriptions
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="text-center py-6">
                  <Package className="w-12 h-12 text-rich-black/20 mx-auto mb-3" />
                  <h3 className="font-heading font-bold text-lg text-rich-black mb-2">
                    No Active Subscription
                  </h3>
                  <p className="text-sm text-rich-black/70 mb-4">
                    Subscribe to start creating tasks
                  </p>
                  <Link href="/pricing">
                    <Button className="bg-tomato hover:bg-tomato-600 w-full">
                      Browse Subscriptions
                    </Button>
                  </Link>
                </div>
              )}
            </Card>
          </div>

          {/* Right Column - Tasks */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h2 className="font-heading font-bold text-2xl text-rich-black mb-1">
                    My Tasks
                  </h2>
                  <p className="text-sm text-rich-black/70">
                    Create and manage your task requests
                  </p>
                </div>
                {hasSubscription ? (
                  <Button
                    onClick={() => setShowCreateDialog(true)}
                    className="bg-tomato hover:bg-tomato-600 flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Create Task
                  </Button>
                ) : (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-xs text-amber-800">
                      Subscribe to create tasks.{" "}
                      <Link href="/pricing" className="font-medium underline">
                        Browse subscriptions
                      </Link>
                    </p>
                  </div>
                )}
              </div>

              {/* Task List */}
              <TaskList key={refreshKey} />
            </Card>
          </div>
        </div>
      </div>

      {/* Create Task Dialog */}
      <CreateTaskDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onTaskCreated={handleTaskCreated}
      />
      <Footer />
      <Suspense fallback={null}>
        <EmailVerificationHandler />
      </Suspense>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-rich-black/60">Loading...</p>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
