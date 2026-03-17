'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Check, Crown, Sparkles, Zap, X, Loader2, Star, UserPlus, Users, ClipboardList, ArrowRight, CreditCard } from 'lucide-react';
import { DotBackground } from '@/src/shared/components/backgrounds/GridBackground';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { apiSubscriptionPlanRepository } from '@/src/features/subscription-plans/lib/ApiSubscriptionPlanRepository';
import { ApiSubscriptionPlan } from '@/src/features/subscription-plans/types/api';
import { useAuth } from '@/src/features/auth/lib/AuthContext';
import { motion } from 'motion/react';

export default function PricingPage() {
  const [plans, setPlans] = useState<ApiSubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlans() {
      try {
        const result = await apiSubscriptionPlanRepository.searchPlans({
          isActive: true,
          orderBy: 'sortOrder:asc',
          limit: 10,
        });
        setPlans(result.plans);
      } catch (err) {
        console.error('Failed to fetch plans:', err);
        setError('Unable to load pricing plans. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchPlans();
  }, []);

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
      case 'MONTH': return '/month';
      case 'YEAR': return '/year';
      case 'WEEK': return '/week';
      case 'DAY': return '/day';
      default: return '';
    }
  };

  const getPlanIcon = (index: number, isPopular: boolean, isFeatured: boolean) => {
    if (isPopular) return Crown;
    if (isFeatured) return Star;
    if (index === 0) return Zap;
    return Sparkles;
  };

  // Get grid layout classes based on number of plans
  const getGridClasses = (count: number) => {
    switch (count) {
      case 1:
        return 'grid-cols-1 max-w-md';
      case 2:
        return 'grid-cols-1 md:grid-cols-2 max-w-3xl';
      case 3:
        return 'grid-cols-1 md:grid-cols-3 max-w-5xl';
      case 4:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-6xl';
      case 5:
        // For 5 cards: show 3 on top row and 2 centered on bottom row
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl';
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl';
    }
  };

  const PricingCard = ({ plan, index }: { plan: ApiSubscriptionPlan; index: number }) => {
    const { isAuthenticated } = useAuth();
    const PlanIcon = getPlanIcon(index, plan.isPopular, plan.isFeatured);
    const isPopular = plan.isPopular;
    
    // Determine the href based on authentication status
    const getHref = () => {
      if (plan.planType === 'CUSTOM') {
        return '/contact';
      }
      // If not authenticated, redirect to signup with redirect parameter
      if (!isAuthenticated) {
        return `/auth/signup?redirect=/subscribe/${plan.slug}`;
      }
      // If authenticated, go directly to subscribe page
      return `/subscribe/${plan.slug}`;
    };

    return (
      <div 
        className={`rounded-3xl p-6 lg:p-8 relative transition-all duration-300 hover:scale-[1.02] flex flex-col h-full ${
          isPopular 
            ? 'bg-gradient-to-br from-tomato to-tomato-600 border-2 border-tomato shadow-xl shadow-tomato/20' 
            : 'bg-white border-2 border-platinum/50 hover:border-tomato/30 hover:shadow-lg'
        }`}
      >
        {isPopular && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
            <div className="inline-flex items-center gap-1.5 bg-white text-tomato px-4 py-1.5 rounded-full text-sm font-semibold shadow-md">
              <Crown className="w-4 h-4" />
              Most Popular
            </div>
          </div>
        )}
        
        {/* Header Section - Fixed Height */}
        <div className="text-center mb-6">
          {/* Plan icon */}
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 ${
            isPopular ? 'bg-white/20' : 'bg-tomato/10'
          }`}>
            <PlanIcon className={`w-6 h-6 ${isPopular ? 'text-white' : 'text-tomato'}`} />
          </div>

          <h3 className={`font-heading text-xl lg:text-2xl font-bold mb-1 ${
            isPopular ? 'text-white' : 'text-rich-black'
          }`}>
            {plan.name}
          </h3>
          
          {plan.tagline && (
            <p className={`text-sm mb-4 min-h-[20px] ${isPopular ? 'text-white/80' : 'text-rich-black/60'}`}>
              {plan.tagline}
            </p>
          )}

          {/* Price */}
          <div className="mb-2">
            {plan.planType === 'CUSTOM' ? (
              <span className={`text-3xl lg:text-4xl font-bold ${isPopular ? 'text-white' : 'text-rich-black'}`}>
                Custom
              </span>
            ) : (
              <>
                <span className={`text-4xl lg:text-5xl font-bold ${isPopular ? 'text-white' : 'text-rich-black'}`}>
                  {formatPrice(plan.price, plan.currency)}
                </span>
                <span className={`text-sm ${isPopular ? 'text-white/80' : 'text-rich-black/60'}`}>
                  {formatBillingCycle(plan.billingCycle)}
                </span>
              </>
            )}
          </div>

          {/* Hours info */}
          <div className="min-h-[44px] flex flex-col justify-center">
            {plan.hoursPerMonth > 0 && (
              <p className={`text-sm ${isPopular ? 'text-white/70' : 'text-rich-black/50'}`}>
                Up to {plan.hoursPerMonth} hours/month
              </p>
            )}
            
            {plan.additionalHourly && (
              <p className={`text-xs ${isPopular ? 'text-white/60' : 'text-rich-black/40'}`}>
                +{formatPrice(plan.additionalHourly, plan.currency)}/hr after
              </p>
            )}
          </div>

          {plan.hasFreeTrial && plan.freeTrialDays && (
            <div className={`inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full text-xs font-medium ${
              isPopular ? 'bg-white/20 text-white' : 'bg-green-100 text-green-700'
            }`}>
              <Check className="w-3 h-3" />
              {plan.freeTrialDays}-day free trial
            </div>
          )}
        </div>

        {/* Divider */}
        <div className={`h-px w-full mb-6 ${isPopular ? 'bg-white/20' : 'bg-platinum'}`} />

        {/* Features list - Flex grow to push button to bottom */}
        <ul className="space-y-3 flex-1">
          {plan.features.slice(0, 5).map((feature, featureIndex) => (
            <li key={featureIndex} className="flex items-start gap-2">
              {feature.included ? (
                <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                  isPopular ? 'text-white' : 'text-tomato'
                }`} />
              ) : (
                <X className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                  isPopular ? 'text-white/40' : 'text-rich-black/30'
                }`} />
              )}
              <span className={`text-sm leading-tight ${
                feature.included 
                  ? (isPopular ? 'text-white/90' : 'text-rich-black/70')
                  : (isPopular ? 'text-white/40 line-through' : 'text-rich-black/40 line-through')
              }`}>
                {feature.feature}
              </span>
            </li>
          ))}
          {plan.features.length > 5 && (
            <li className={`text-sm ${isPopular ? 'text-white/70' : 'text-rich-black/50'}`}>
              + {plan.features.length - 5} more features
            </li>
          )}
        </ul>

        {/* CTA Button - Always at bottom */}
        <div className="mt-6">
          <Link href={getHref()} className="block">
            <Button 
              size="lg" 
              className={`w-full font-semibold ${
                isPopular 
                  ? 'bg-white text-tomato hover:bg-white/90' 
                  : 'bg-gradient-to-r from-tomato to-tomato-600 text-white hover:from-tomato-600 hover:to-tomato'
              }`}
            >
              {plan.planType === 'CUSTOM' ? 'Contact Sales' : 'Get Started'}
            </Button>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white-smoke">
      <Header />
      
      {/* Hero Section with Minimal How It Works */}
      <section className="relative bg-gradient-to-br from-pale-dogwood/30 via-white-smoke to-tomato/5 py-24 pt-28 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-tomato/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-pale-dogwood/50 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tomato/10 text-tomato font-semibold text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              Pricing
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-rich-black mb-6 leading-tight">
              Flexible Plans for{' '}
              <span className="text-tomato">Every Need</span>
            </h1>
            <p className="text-xl text-rich-black/70 max-w-3xl mx-auto leading-relaxed">
              Get world-class virtual assistant support at a fraction of full-time hiring costs. Smart investment for smart professionals.
            </p>
          </div>

          {/* How It Works - Responsive Single Component */}
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Connecting line - hidden on mobile, visible on larger screens */}
              <div className="hidden md:block absolute top-6 md:top-8 lg:top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-tomato/30 to-transparent z-0" />
              
              <div className="grid grid-cols-4 gap-2 md:gap-4 lg:gap-6 items-start relative z-10">
                {[
                  { number: 1, icon: CreditCard, title: 'Choose Your Plan', accent: 'from-tomato to-tomato-600' },
                  { number: 2, icon: UserPlus, title: 'Create Your Account', accent: 'from-tomato-600 to-tomato' },
                  { number: 3, icon: Users, title: 'Get Your VA Match', accent: 'from-tomato to-tomato-600' },
                  { number: 4, icon: ClipboardList, title: 'Assign Your Tasks', accent: 'from-tomato-600 to-tomato' },
                ].map((step, index) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative group flex flex-col items-center"
                  >
                    {/* Icon Container - Responsive sizing with hover effects */}
                    <div className="relative mb-2 md:mb-3 lg:mb-4">
                      <div className={`
                        w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 
                        rounded-lg md:rounded-xl lg:rounded-2xl
                        bg-gradient-to-br ${step.accent} 
                        flex items-center justify-center 
                        text-white shadow-md md:shadow-lg lg:shadow-xl
                        transition-all duration-300 ease-out
                        group-hover:scale-110 group-hover:shadow-2xl
                        group-hover:shadow-tomato/40 group-hover:-translate-y-1
                      `}>
                        <step.icon className="w-4 h-4 md:w-5 md:h-5 lg:w-7 lg:h-7 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
                      </div>
                      {/* Step Number Badge - Responsive sizing with hover effects */}
                      <div className="absolute -top-1 -right-1 md:-top-1.5 md:-right-1.5 lg:-top-2 lg:-right-2 w-4 h-4 md:w-5 md:h-5 lg:w-7 lg:h-7 rounded-full bg-white border-2 border-tomato flex items-center justify-center text-[9px] md:text-[10px] lg:text-xs font-bold text-tomato shadow-sm md:shadow-md lg:shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-tomato group-hover:text-white group-hover:border-tomato-600 group-hover:shadow-tomato/30">
                        {step.number}
                      </div>
                    </div>
                    {/* Title - Responsive text sizing with hover effects */}
                    <h3 className="font-heading text-[10px] md:text-xs lg:text-sm font-semibold text-rich-black text-center leading-tight px-0.5 md:px-1 lg:px-2 transition-all duration-300 group-hover:text-tomato group-hover:font-bold">
                      {step.title}
                    </h3>
                    {/* Arrow connector - hidden on mobile, visible on larger screens */}
                    {index < 3 && (
                      <div className="hidden md:flex absolute top-6 md:top-8 lg:top-12 left-[calc(100%+0.5rem)] md:left-[calc(100%+0.75rem)] lg:left-[calc(100%+1rem)] items-center justify-center pointer-events-none">
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-tomato/30 transition-all duration-300 group-hover:text-tomato group-hover:translate-x-1" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Pricing Cards Section with Dot Background */}
      <DotBackground className="bg-white">
        <section className="py-24">
          <div className="container mx-auto px-6 lg:px-8">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <Loader2 className="w-12 h-12 text-tomato animate-spin mx-auto mb-4" />
                  <p className="text-rich-black/70">Loading pricing plans...</p>
                </div>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                  <X className="w-8 h-8 text-red-500" />
                </div>
                <p className="text-rich-black/70 mb-4">{error}</p>
                <Button 
                  onClick={() => window.location.reload()}
                  className="bg-tomato hover:bg-tomato-600 text-white"
                >
                  Try Again
                </Button>
              </div>
            ) : plans.length === 5 ? (
              // Special layout for 5 cards: 3 on top, 2 centered on bottom
              <div className="max-w-6xl mx-auto">
                {/* First row: 3 cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  {plans.slice(0, 3).map((plan, index) => (
                    <PricingCard key={plan.id} plan={plan} index={index} />
                  ))}
                </div>
                {/* Second row: 2 cards centered */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {plans.slice(3, 5).map((plan, index) => (
                    <PricingCard key={plan.id} plan={plan} index={index + 3} />
                  ))}
                </div>
              </div>
            ) : (
              <div className={`grid gap-6 mx-auto ${getGridClasses(plans.length)}`}>
                {plans.map((plan, index) => (
                  <PricingCard key={plan.id} plan={plan} index={index} />
                ))}
              </div>
            )}

            {/* Additional info */}
            {!loading && !error && plans.length > 0 && (
              <div className="mt-16 text-center">
                <div className="inline-flex flex-wrap justify-center gap-6 text-sm text-rich-black/60">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Cancel anytime</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>No hidden fees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Dedicated support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Secure payments</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </DotBackground>

      {/* CTA Section */}
      <section className="bg-white-smoke py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="bg-gradient-to-br from-rich-black to-rich-black/95 rounded-3xl p-12 md:p-16 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-tomato/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-tomato/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 text-center">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                Not sure which plan is right for you?
              </h2>
              <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
                Let's discuss your needs and find the perfect solution for your business. Our team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="bg-tomato hover:bg-tomato-600 text-white px-8">
                    Schedule a Consultation
                  </Button>
                </Link>
                <Link href="/faq">
                  <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-8">
                    Read FAQs
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
