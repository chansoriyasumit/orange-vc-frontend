"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ApiService } from "@/src/features/services/types/api";
import { ApiSubscriptionPlan } from "@/src/features/subscription-plans/types/api";
import { apiServiceRepository } from "@/src/features/services/lib/ApiServiceRepository";
import { apiSubscriptionPlanRepository } from "@/src/features/subscription-plans/lib/ApiSubscriptionPlanRepository";
import { getServiceImage } from "@/src/features/services/lib/serviceImages";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  ArrowLeft,
  Clock,
  Loader2,
  Star,
  Sparkles,
  Shield,
  HeadphonesIcon,
  Award,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/src/features/auth/lib/AuthContext";
import { motion } from "motion/react";

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  // State
  const [service, setService] = useState<ApiService | null>(null);
  const [subscriptionPlans, setSubscriptionPlans] = useState<
    ApiSubscriptionPlan[]
  >([]);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingPlans, setIsLoadingPlans] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch service and subscription plans
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch service by slug
        const serviceData = await apiServiceRepository.getServiceBySlug(
          params.slug as string
        );
        if (!serviceData) {
          setError("Service not found");
          return;
        }
        setService(serviceData);
      } catch (err) {
        console.error("Error fetching service:", err);
        setError("Failed to load service. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchPlans = async () => {
      try {
        setIsLoadingPlans(true);
        const plans = await apiSubscriptionPlanRepository.getAllPlans();
        setSubscriptionPlans(plans);

        // Auto-select the popular plan or first plan
        const popularPlan = plans.find((p) => p.isPopular);
        setSelectedPlan(popularPlan?.id || plans[0]?.id || null);
      } catch (err) {
        console.error("Error fetching subscription plans:", err);
      } finally {
        setIsLoadingPlans(false);
      }
    };

    fetchData();
    fetchPlans();
  }, [params.slug]);

  const handleSubscribe = () => {
    if (!selectedPlan) return;

    if (!isAuthenticated) {
      router.push(`/auth/signup?redirect=/services/${params.slug}`);
      return;
    }

    // Get the selected plan data to navigate to its slug
    const planData = subscriptionPlans.find((p) => p.id === selectedPlan);
    if (planData) {
      router.push(`/subscribe/${planData.slug}`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-orange-100 rounded-full" />
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-orange-500 rounded-full border-t-transparent animate-spin" />
          </div>
          <p className="mt-6 text-gray-500 font-medium">Loading service...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-red-600 mb-4 font-medium">
            {error || "Service not found"}
          </p>
          <Link href="/services">
            <Button variant="outline" className="rounded-xl">
              Back to Services
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const imageUrl = service.banner?.absoluteLink || service.banner?.url || getServiceImage(service.slug, true);
  const categoryName = service.categories[0]?.name || "General";
  const selectedPlanData = subscriptionPlans.find((p) => p.id === selectedPlan);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section with Image */}
      <section className="relative">
        {/* Background Image with Overlay */}
        <div className="relative h-[45vh] min-h-[400px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-gray-900/30 z-10" />
          <img
            src={imageUrl}
            alt={service.name}
            className="w-full h-full object-cover"
          />

          {/* Content Overlay */}
          <div className="absolute inset-0 z-20 flex flex-col justify-end">
            <div className="container mx-auto px-6 lg:px-8 pb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Back Link */}
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span className="text-sm font-medium">
                    Back to all services
                  </span>
                </Link>

                {/* Category Badge */}
                <div className="flex items-center gap-3 mb-4">
                  <Badge className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border-0 px-3 py-1">
                    {categoryName}
                  </Badge>
                  <span className="text-white/60 text-sm">
                    {service.tags.length} features
                  </span>
                </div>

                {/* Title */}
                <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 max-w-3xl">
                  {service.name}
                </h1>

                {/* Short Description */}
                <p className="text-lg md:text-xl text-white/80 max-w-2xl">
                  {service.shortDescription}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto max-w-7xl px-6 lg:px-8 py-16 -mt-8 relative z-30">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left Column - Service Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-8 rounded-2xl border-0 shadow-sm bg-white">
                <h2 className="font-heading font-bold text-2xl text-gray-900 mb-4">
                  Why a Virtual Assistant is Needed
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {service.description}
                </p>
              </Card>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-8 rounded-2xl border-0 shadow-sm bg-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-orange-600" />
                  </div>
                  <h2 className="font-heading font-bold text-2xl text-gray-900">
                    What the Virtual Assistant Will Do
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {service.tags.map((tag, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.05 }}
                      className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-orange-50 transition-colors group"
                    >
                      <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-orange-200 transition-colors">
                        <Check className="w-3.5 h-3.5 text-orange-600" />
                      </div>
                      <span className="text-gray-700 font-medium">{tag}</span>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Our Service Differentiators */}
            {service.differentiator && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="p-8 rounded-2xl border-0 shadow-sm bg-gradient-to-br from-orange-50 to-orange-100/50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-200 flex items-center justify-center">
                      <Award className="w-5 h-5 text-orange-700" />
                    </div>
                    <h2 className="font-heading font-bold text-2xl text-gray-900">
                      Our Service Differentiators
                    </h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {service.differentiator}
                  </p>
                </Card>
              </motion.div>
            )}

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-3 gap-4"
            >
              <Card className="p-6 rounded-2xl border-0 shadow-sm bg-white text-center">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <p className="font-semibold text-gray-900 mb-1">Secure</p>
                <p className="text-sm text-gray-500">Data Protected</p>
              </Card>
              <Card className="p-6 rounded-2xl border-0 shadow-sm bg-white text-center">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mx-auto mb-3">
                  <HeadphonesIcon className="w-6 h-6 text-blue-600" />
                </div>
                <p className="font-semibold text-gray-900 mb-1">24/7 Support</p>
                <p className="text-sm text-gray-500">Always Available</p>
              </Card>
              <Card className="p-6 rounded-2xl border-0 shadow-sm bg-white text-center">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <p className="font-semibold text-gray-900 mb-1">Verified</p>
                <p className="text-sm text-gray-500">Expert Team</p>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Pricing Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6 rounded-2xl border-0 shadow-lg bg-white sticky top-24">
                <div className="flex items-center gap-2 mb-6">
                  <Star className="w-5 h-5 text-orange-500 fill-orange-500" />
                  <h3 className="font-heading font-bold text-xl text-gray-900">
                    Choose Your Plan
                  </h3>
                </div>

                {isLoadingPlans ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
                  </div>
                ) : subscriptionPlans.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No subscription plans available.
                  </p>
                ) : (
                  <>
                    <div className="space-y-3 mb-6">
                      {subscriptionPlans.map((plan) => (
                        <button
                          key={plan.id}
                          onClick={() => setSelectedPlan(plan.id)}
                          className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 relative ${
                            selectedPlan === plan.id
                              ? "border-orange-500 bg-orange-50"
                              : "border-gray-200 hover:border-orange-200 hover:bg-gray-50"
                          }`}
                        >
                          {plan.isPopular && (
                            <Badge className="absolute -top-2.5 right-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs border-0">
                              Most Popular
                            </Badge>
                          )}
                          <div className="flex items-center justify-between mb-2">
                            <span
                              className={`font-semibold ${
                                selectedPlan === plan.id
                                  ? "text-orange-900"
                                  : "text-gray-900"
                              }`}
                            >
                              {plan.name}
                            </span>
                          </div>
                          <div className="flex items-baseline gap-1 mb-2">
                            <span
                              className={`text-3xl font-bold ${
                                selectedPlan === plan.id
                                  ? "text-orange-600"
                                  : "text-gray-900"
                              }`}
                            >
                              ${plan.price}
                            </span>
                            <span className="text-sm text-gray-500">
                              / {plan.billingCycle.toLowerCase()}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-sm text-gray-500">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{plan.hoursPerMonth} hours/month</span>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Selected Plan Features */}
                    {selectedPlanData && (
                      <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                        <p className="text-sm font-semibold text-gray-900 mb-2">
                          {selectedPlanData.tagline}
                        </p>
                        <div className="space-y-2">
                          {selectedPlanData.features
                            .slice(0, 4)
                            .map((feature, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2 text-sm"
                              >
                                <Check className="w-4 h-4 text-orange-500" />
                                <span className="text-gray-600">
                                  {feature.feature}
                                </span>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}

                    <Button
                      onClick={handleSubscribe}
                      size="lg"
                      disabled={!selectedPlan}
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white h-14 rounded-xl text-lg font-semibold shadow-lg shadow-orange-500/25 transition-all duration-200"
                    >
                      {isAuthenticated
                        ? "Subscribe Now"
                        : "Sign Up to Subscribe"}
                    </Button>
                  </>
                )}

                {/* Guarantees */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      Cancel anytime, no questions asked
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      Dedicated support team
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      Verified professionals only
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

