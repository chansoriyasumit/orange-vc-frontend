"use client";

import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/features/auth/lib/AuthContext";
import { useSubscriptions } from "@/src/features/subscriptions/hooks/useSubscriptions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  Package,
  Clock,
  ArrowLeft,
  Loader2,
  CheckCircle,
  XCircle,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

function SubscriptionsContent() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { subscriptions, isLoading, error } = useSubscriptions();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/auth/signin?redirect=/subscriptions");
    }
  }, [isAuthenticated, authLoading, router]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white-smoke">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-tomato animate-spin mx-auto mb-4" />
          <p className="text-rich-black/60">Loading subscriptions...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const getStatusBadge = (status: string, hoursRemaining?: number) => {
    // If status is ACTIVE but hours are 0, show as Expired
    if (status === "ACTIVE" && hoursRemaining !== undefined && hoursRemaining === 0) {
      return (
        <Badge variant="outline" className="border-gray-300 text-gray-700">
          Expired
        </Badge>
      );
    }

    switch (status) {
      case "ACTIVE":
        return (
          <Badge className="bg-green-600 text-white">Active</Badge>
        );
      case "EXPIRED":
        return (
          <Badge variant="outline" className="border-gray-300 text-gray-700">
            Expired
          </Badge>
        );
      case "CANCELLED":
        return (
          <Badge variant="outline" className="border-red-300 text-red-700">
            Cancelled
          </Badge>
        );
      case "PENDING":
        return (
          <Badge className="bg-amber-600 text-white">Pending</Badge>
        );
      default:
        return (
          <Badge variant="outline">{status}</Badge>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white-smoke">
      <Header />
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-8 lg:pt-28 lg:pb-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard">
            <Button
              variant="ghost"
              className="mb-4 text-rich-black/70 hover:text-rich-black"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-rich-black mb-2">
            My Subscriptions
          </h1>
          <p className="text-base sm:text-lg text-rich-black/70">
            View and manage all your subscription plans
          </p>
        </div>

        {/* Error State */}
        {error && (
          <Card className="p-6 mb-6 border-red-200 bg-red-50">
            <div className="flex items-center gap-3">
              <XCircle className="w-5 h-5 text-red-600" />
              <p className="text-red-800">{error}</p>
            </div>
          </Card>
        )}

        {/* Subscriptions List */}
        {subscriptions.length === 0 ? (
          <Card className="p-12 text-center">
            <Package className="w-16 h-16 text-rich-black/20 mx-auto mb-4" />
            <h3 className="font-heading font-bold text-xl text-rich-black mb-2">
              No Subscriptions Found
            </h3>
            <p className="text-rich-black/70 mb-6">
              You don't have any subscriptions yet.
            </p>
            <Link href="/pricing">
              <Button className="bg-tomato hover:bg-tomato-600">
                Browse Plans
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {subscriptions.map((subscription) => (
              <Card key={subscription.id} className="p-6 hover:shadow-lg transition-shadow">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-tomato/10 flex items-center justify-center">
                      <Package className="w-5 h-5 text-tomato" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-lg text-rich-black">
                        {subscription.plan?.name || "Unknown Plan"}
                      </h3>
                      {subscription.plan && (
                        <p className="text-sm text-rich-black/60">
                          {subscription.plan.currency} {subscription.plan.price}
                        </p>
                      )}
                    </div>
                  </div>
                  {getStatusBadge(subscription.status, subscription.hoursRemaining)}
                </div>

                {/* Status Info */}
                <div className="space-y-3 mb-4">
                  {subscription.status === "ACTIVE" && 
                   subscription.hoursRemaining !== undefined && 
                   subscription.hoursRemaining > 0 && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 text-green-800">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Active Subscription</span>
                      </div>
                    </div>
                  )}

                  {/* Hours Information */}
                  {subscription.hoursRemaining !== undefined && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-rich-black/70">Hours Remaining</span>
                        <span className="font-semibold text-rich-black">
                          {subscription.hoursRemaining} /{" "}
                          {subscription.hours ||
                            subscription.plan?.hours ||
                            subscription.plan?.hoursPerMonth ||
                            subscription.hoursRemaining + subscription.hoursUsed}
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
                      {subscription.hoursUsed !== undefined && (
                        <p className="text-xs text-rich-black/60">
                          {subscription.hoursUsed} hours used
                        </p>
                      )}
                    </div>
                  )}

                  {/* Validity/End Date */}
                  {(subscription.validityEndDate || subscription.currentPeriodEnd) && (
                    <div className="flex items-center gap-2 text-sm text-rich-black/70 pt-2 border-t">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {subscription.status === "ACTIVE" ? "Valid until" : "Expired on"}{" "}
                        {format(
                          new Date(
                            subscription.validityEndDate || subscription.currentPeriodEnd || ""
                          ),
                          "MMM d, yyyy"
                        )}
                      </span>
                    </div>
                  )}

                  {/* Payment Info */}
                  {subscription.lastPaymentDate && (
                    <div className="flex items-center gap-2 text-sm text-rich-black/70 pt-2 border-t">
                      <Clock className="w-4 h-4" />
                      <span>
                        Last payment:{" "}
                        {format(
                          new Date(subscription.lastPaymentDate),
                          "MMM d, yyyy"
                        )}
                      </span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-4 border-t">
                  {subscription.status === "ACTIVE" && 
                   subscription.hoursRemaining !== undefined && 
                   subscription.hoursRemaining > 0 ? (
                    <Link href="/dashboard">
                      <Button variant="outline" className="w-full">
                        View Dashboard
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/pricing">
                      <Button className="w-full bg-tomato hover:bg-tomato-600">
                        Subscribe Again
                      </Button>
                    </Link>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default function SubscriptionsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-12 h-12 text-tomato animate-spin" />
        </div>
      }
    >
      <SubscriptionsContent />
    </Suspense>
  );
}

