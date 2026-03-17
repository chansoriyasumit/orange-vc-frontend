'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/src/features/auth/lib/AuthContext';
import { useCreateSubscription } from '@/src/features/subscriptions/hooks/useCreateSubscription';
import { ApiSubscriptionPlan } from '@/src/features/subscription-plans/types/api';
import { apiSubscriptionPlanRepository } from '@/src/features/subscription-plans/lib/ApiSubscriptionPlanRepository';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  CheckCircle, 
  ArrowLeft, 
  Loader2, 
  CreditCard, 
  Shield, 
  AlertCircle, 
  Lock, 
  BadgeCheck, 
  Users, 
  Clock, 
  Sparkles,
  Crown,
  Zap,
  Star,
  Check
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/src/shared/hooks/use-toast';

export default function SubscribePage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();
  const { toast } = useToast();
  
  const [plan, setPlan] = useState<ApiSubscriptionPlan | null>(null);
  const [isLoadingPlan, setIsLoadingPlan] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const planSlug = params.id as string;

  const { createSubscription, isCreating, error: subscriptionError } = useCreateSubscription({
    onSuccess: (subscriptionId) => {
      console.log('Subscription created successfully:', subscriptionId);
      
      toast({
        title: 'Order Successful! 🎉',
        description: 'Your order has been processed. Redirecting to dashboard...',
      });
      
      // Redirect to dashboard after short delay
      setTimeout(() => {
        router.push('/dashboard?subscribed=true&tab=tasks');
      }, 1500);
    },
    onError: (err) => {
      console.error('Subscription error:', err);
      
      toast({
        title: 'Order Failed',
        description: err.message || 'Failed to process order. Please try again.',
        variant: 'destructive',
      });
    },
  });

  // Check authentication
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push(`/auth/signin?redirect=/subscribe/${planSlug}`);
    }
  }, [isAuthenticated, authLoading, router, planSlug]);

  // Fetch subscription plan
  useEffect(() => {
    const loadPlan = async () => {
      try {
        setIsLoadingPlan(true);
        setError(null);

        // Fetch all plans and find by slug
        const plans = await apiSubscriptionPlanRepository.getAllPlans();
        const selectedPlan = plans.find(p => p.slug === planSlug);

        if (!selectedPlan) {
          setError('Subscription plan not found');
          return;
        }

        setPlan(selectedPlan);
      } catch (err) {
        console.error('Error loading plan:', err);
        setError('Failed to load subscription plan');
      } finally {
        setIsLoadingPlan(false);
      }
    };

    if (planSlug) {
      loadPlan();
    }
  }, [planSlug]);

  const handleSubscribe = async () => {
    if (!plan || !user) return;

    const userName = user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.firstName || user.email.split('@')[0];

    // Create subscription - will open Razorpay modal for authentication
    const success = await createSubscription(
      { planId: plan.id },
      { 
        name: userName, 
        email: user.email,
        contact: user.mobileNumber || undefined,
      }
    );

    if (!success) {
      console.log('Subscription creation was not completed');
    }
  };

  if (authLoading || isLoadingPlan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white-smoke">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-tomato animate-spin mx-auto mb-4" />
          <p className="text-rich-black/60">Loading subscription details...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (error || !plan) {
    return (
      <div className="min-h-screen bg-white-smoke">
        <div className="container mx-auto max-w-4xl px-6 lg:px-8 py-12">
          <div className="text-center py-20">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="font-heading font-bold text-2xl text-rich-black mb-2">
              {error || 'Plan Not Found'}
            </h1>
            <p className="text-rich-black/70 mb-6">
              The subscription plan you're looking for doesn't exist.
            </p>
            <Link href="/pricing">
              <Button className="bg-tomato hover:bg-tomato-600">
                View All Plans
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatBillingCycle = (cycle: string) => {
    switch (cycle) {
      case 'MONTH': return 'month';
      case 'YEAR': return 'year';
      case 'WEEK': return 'week';
      default: return cycle.toLowerCase();
    }
  };

  // Get plan icon based on plan properties
  const getPlanIcon = () => {
    if (plan.isPopular) return Crown;
    if (plan.isFeatured) return Star;
    return Zap;
  };

  const PlanIcon = getPlanIcon();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white-smoke via-white to-pale-dogwood/20">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back Link */}
        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 text-rich-black/70 hover:text-rich-black mb-6 sm:mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to pricing</span>
        </Link>

        {/* Header Section */}
        <div className="mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-tomato/10 text-tomato font-semibold text-xs sm:text-sm mb-4">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            Secure Checkout
          </div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-rich-black mb-3">
            Complete Your Order
          </h1>
          <p className="text-base sm:text-lg text-rich-black/70">
            You're purchasing <span className="font-semibold text-tomato">{plan.name}</span>
          </p>
        </div>

        {/* Error Alert */}
        {subscriptionError && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-3 shadow-sm">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-900">Payment Error</p>
              <p className="text-sm text-red-700">{subscriptionError}</p>
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Account Information */}
            <Card className="p-6 sm:p-8 shadow-lg border-2 border-platinum/50 hover:border-tomato/20 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-tomato/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-tomato" />
                </div>
                <h2 className="font-heading font-bold text-xl sm:text-2xl text-rich-black">
                  Account Information
                </h2>
              </div>
              <div className="space-y-5">
                <div className="p-4 bg-white-smoke/50 rounded-lg border border-platinum/30">
                  <p className="text-xs sm:text-sm text-rich-black/60 mb-1.5 font-medium uppercase tracking-wide">Name</p>
                  <p className="font-semibold text-base sm:text-lg text-rich-black">
                    {user?.firstName && user?.lastName
                      ? `${user.firstName} ${user.lastName}`
                      : user?.firstName || 'Not provided'}
                  </p>
                </div>
                <div className="p-4 bg-white-smoke/50 rounded-lg border border-platinum/30">
                  <p className="text-xs sm:text-sm text-rich-black/60 mb-1.5 font-medium uppercase tracking-wide">Email</p>
                  <p className="font-semibold text-base sm:text-lg text-rich-black break-all">{user?.email}</p>
                </div>
              </div>
            </Card>

            {/* Plan Features */}
            <Card className="p-6 sm:p-8 shadow-lg border-2 border-platinum/50 hover:border-tomato/20 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-tomato/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-tomato" />
                </div>
                <h2 className="font-heading font-bold text-xl sm:text-2xl text-rich-black">
                  What You'll Get
                </h2>
              </div>
              <div className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  feature.included && (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-white-smoke/50 transition-colors">
                      <CheckCircle className="w-5 h-5 text-tomato flex-shrink-0 mt-0.5" />
                      <span className="text-rich-black/80 font-medium">{feature.feature}</span>
                    </div>
                  )
                ))}
              </div>

              {plan.hoursPerMonth > 0 && (
                <div className="mt-6 pt-6 border-t-2 border-platinum/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-5 h-5 text-tomato" />
                    <p className="text-sm font-semibold text-rich-black/60 uppercase tracking-wide">Hours Per Month</p>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <p className="font-bold text-3xl sm:text-4xl text-tomato">{plan.hoursPerMonth}</p>
                    <span className="text-sm text-rich-black/60">hours</span>
                  </div>
                  {plan.additionalHourly && (
                    <p className="text-sm text-rich-black/60 mt-2 flex items-center gap-1">
                      <span className="font-medium">+{formatPrice(plan.additionalHourly, plan.currency)}/hr</span>
                      <span>after limit</span>
                    </p>
                  )}
                </div>
              )}
            </Card>

            {/* Trust & Security Section */}
            <div className="space-y-4">
              {/* Enhanced Security Card */}
              <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-green-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-green-900 mb-2 text-lg">
                      Secure Payment via Razorpay
                    </h3>
                    <p className="text-sm text-green-800 mb-4">
                      Your payment information is encrypted and secure. We use Razorpay's trusted payment gateway with industry-standard security.
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/60 rounded-lg">
                        <Lock className="w-4 h-4 text-green-700" />
                        <span className="text-xs font-medium text-green-900">SSL Encrypted</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/60 rounded-lg">
                        <BadgeCheck className="w-4 h-4 text-green-700" />
                        <span className="text-xs font-medium text-green-900">PCI Compliant</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Trust Badges */}
              <Card className="p-6 bg-white border-2 border-platinum/50 shadow-md">
                <h3 className="font-semibold text-rich-black mb-4 text-sm uppercase tracking-wide">Why Trust Us</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white-smoke/50">
                    <div className="w-8 h-8 rounded-lg bg-tomato/10 flex items-center justify-center">
                      <Shield className="w-4 h-4 text-tomato" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-rich-black">Secure Payments</p>
                      <p className="text-xs text-rich-black/60">Bank-level encryption</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white-smoke/50">
                    <div className="w-8 h-8 rounded-lg bg-tomato/10 flex items-center justify-center">
                      <Users className="w-4 h-4 text-tomato" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-rich-black">24/7 Support</p>
                      <p className="text-xs text-rich-black/60">Always here to help</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white-smoke/50">
                    <div className="w-8 h-8 rounded-lg bg-tomato/10 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-tomato" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-rich-black">Money-Back</p>
                      <p className="text-xs text-rich-black/60">Satisfaction guaranteed</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white-smoke/50">
                    <div className="w-8 h-8 rounded-lg bg-tomato/10 flex items-center justify-center">
                      <BadgeCheck className="w-4 h-4 text-tomato" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-rich-black">Trusted Gateway</p>
                      <p className="text-xs text-rich-black/60">Razorpay verified</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Right Column - Enhanced Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sm:p-8 sticky top-6 shadow-xl border-2 border-platinum/50 bg-white">
              {/* Order Summary Header */}
              <div className="mb-6">
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-rich-black mb-1">
                  Order Summary
                </h3>
                <p className="text-xs text-rich-black/60">Review your purchase details</p>
              </div>

              <Separator className="mb-6" />

              {/* Plan Details */}
              <div className="mb-6">
                <div className="flex items-start gap-3 mb-4 p-4 bg-gradient-to-br from-tomato/5 to-pale-dogwood/20 rounded-xl border border-tomato/10">
                  <div className="w-10 h-10 rounded-lg bg-tomato/10 flex items-center justify-center flex-shrink-0">
                    <PlanIcon className="w-5 h-5 text-tomato" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="font-bold text-rich-black text-base sm:text-lg">{plan.name}</p>
                      {plan.isPopular && (
                        <Badge className="bg-tomato text-white text-xs px-2 py-0.5 flex-shrink-0">
                          <Crown className="w-3 h-3 mr-1" />
                          Popular
                        </Badge>
                      )}
                    </div>
                    {plan.tagline && (
                      <p className="text-xs sm:text-sm text-rich-black/60 line-clamp-2">
                        {plan.tagline}
                      </p>
                    )}
                  </div>
                </div>

                {/* Billing Cycle Info */}
                <div className="mb-4 p-3 bg-white-smoke/50 rounded-lg border border-platinum/30">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-rich-black/70 font-medium">Billing Cycle</span>
                    <span className="text-sm font-semibold text-rich-black capitalize">
                      {formatBillingCycle(plan.billingCycle)}
                    </span>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-rich-black/70">Plan Price</span>
                    <span className="font-semibold text-rich-black text-base">
                      {formatPrice(plan.price, plan.currency)}
                    </span>
                  </div>
                  {plan.hoursPerMonth > 0 && (
                    <div className="flex justify-between items-center text-xs text-rich-black/60">
                      <span>Includes {plan.hoursPerMonth} hours/month</span>
                    </div>
                  )}
                </div>
              </div>

              <Separator className="mb-6" />

              {/* Total Section */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-base text-rich-black">Total Amount</span>
                  <span className="font-heading font-bold text-2xl sm:text-3xl text-tomato">
                    {formatPrice(plan.price, plan.currency)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-rich-black/60">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  <span>One-time payment • {formatBillingCycle(plan.billingCycle)}ly billing</span>
                </div>
              </div>

              {/* Enhanced Payment Button */}
              <div className="space-y-4">
                <Button
                  onClick={handleSubscribe}
                  size="lg"
                  className="w-full bg-gradient-to-r from-tomato to-tomato-600 hover:from-tomato-600 hover:to-tomato text-white h-14 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isCreating}
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5 mr-2" />
                      Secure Payment
                    </>
                  )}
                </Button>

                {/* Security Indicators */}
                <div className="flex items-center justify-center gap-4 pt-2 pb-2">
                  <div className="flex items-center gap-1.5 text-xs text-rich-black/60">
                    <Shield className="w-3.5 h-3.5 text-green-600" />
                    <span>Secure</span>
                  </div>
                  <div className="w-px h-4 bg-platinum"></div>
                  <div className="flex items-center gap-1.5 text-xs text-rich-black/60">
                    <Lock className="w-3.5 h-3.5 text-green-600" />
                    <span>Encrypted</span>
                  </div>
                  <div className="w-px h-4 bg-platinum"></div>
                  <div className="flex items-center gap-1.5 text-xs text-rich-black/60">
                    <BadgeCheck className="w-3.5 h-3.5 text-green-600" />
                    <span>Verified</span>
                  </div>
                </div>

                {/* Terms */}
                <p className="text-xs text-rich-black/60 text-center leading-relaxed">
                  By confirming, you agree to our{' '}
                  <Link href="/terms" className="underline hover:text-tomato transition-colors font-medium">
                    terms of service
                  </Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="underline hover:text-tomato transition-colors font-medium">
                    privacy policy
                  </Link>
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
