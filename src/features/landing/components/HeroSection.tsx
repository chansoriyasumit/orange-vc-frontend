"use client";

import { AppButton } from "@/src/shared/components/ui/AppButton";
import {
  Users,
  Star,
  Shield,
  ArrowRight,
  Sparkles,
  FileText,
  Smartphone,
  Briefcase,
  BarChart3,
} from "lucide-react";
import { motion } from "motion/react";
import { Radar } from "@/src/shared/components/ui/Radar";
import { IconContainer } from "@/src/shared/components/ui/IconContainer";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grid Background Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f9731615_1px,transparent_1px),linear-gradient(to_bottom,#f9731615_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Subtle Gradient Overlays for Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-200/40 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/30" />

      <div className="container relative z-10 mx-auto px-6 lg:px-8 pt-32 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tomato/10 backdrop-blur-sm border border-tomato/20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Sparkles className="w-4 h-4 text-tomato animate-pulse" />
              <span className="text-sm text-rich-black font-medium">
                Over 12 Years of Professional Experience
              </span>
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h1 className="font-heading text-5xl lg:text-7xl font-bold tracking-tighter text-rich-black leading-tight">
                Free Your Time -
                <span className="relative inline-block">
                  <span className="relative z-10 text-tomato">
                    Orange Virtual Connect
                  </span>
                  {/* <motion.span
                    className="absolute bottom-2 left-0 w-full h-3 bg-tomato/20 -z-0"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  /> */}
                </span>
              </h1>
              <p className="text-lg text-rich-black/80 leading-relaxed max-w-xl">
                Running a business or managing a busy professional life doesn't
                have to be overwhelming. We take care of your daily to-dos — so
                you can focus on what truly matters.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <AppButton
                size="lg"
                variant="primary"
                href="/services"
                className="group"
              >
                Explore Services
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </AppButton>
              <AppButton size="lg" variant="outline" href="/pricing">
                Subscribe Now
              </AppButton>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-6 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-tomato">
                  <Users className="w-5 h-5" />
                  <span className="font-heading text-3xl font-bold text-rich-black">
                    12+
                  </span>
                </div>
                <p className="text-sm text-rich-black/70">Years Experience</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-tomato">
                  <Star className="w-5 h-5" />
                  <span className="font-heading text-3xl font-bold text-rich-black">
                    100+
                  </span>
                </div>
                <p className="text-sm text-rich-black/70">Happy Clients</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-tomato">
                  <Shield className="w-5 h-5" />
                  <span className="font-heading text-3xl font-bold text-rich-black">
                    100%
                  </span>
                </div>
                <p className="text-sm text-rich-black/70">Confidential</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Radar View */}
          <motion.div
            className="relative hidden lg:flex items-center justify-center w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {/* Radar Container */}
            <div className="relative h-[600px] w-[600px]">
              {/* Radar Effect */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <Radar className="h-[500px] w-[500px]" />
              </div>

              {/* Center Content */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="flex h-24 w-24 items-center justify-center rounded-full shadow-2xl overflow-hidden"
                >
                  <img
                    src="/logo/orangevclogo.png"
                    alt="OrangeVC Logo"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>

              {/* Service Icons Positioned Around Radar - 5 Services evenly spaced in 360° Pentagon */}
              {/* Personal Assistant - Top (0°/360°) - Closer to center */}
              <IconContainer
                icon={<Users className="w-6 h-6 text-tomato" />}
                text="Personal Assistant"
                delay={0.7}
                className="absolute left-[10%] top-[8%] -translate-x-1/2"
              />

              {/* Social Media - Upper Right (72°) - A bit further from center */}
              <IconContainer
                icon={<Smartphone className="w-6 h-6 text-tomato" />}
                text="Social Media"
                delay={0.8}
                className="absolute right-[2%] top-[50%]"
              />

              {/* Task Management - Lower Right (144°) */}
              <IconContainer
                icon={<Briefcase className="w-6 h-6 text-tomato" />}
                text="Task Management"
                delay={0.9}
                className="absolute left-[-25%] bottom-[12%]"
              />

              {/* Research & Insights - Lower Left (216°) */}
              <IconContainer
                icon={<FileText className="w-6 h-6 text-tomato" />}
                text="Research & Insights"
                delay={1.0}
                className="absolute left-[33%] bottom-[12%]"
              />

              {/* Customer Engagement - Upper Left (288°) */}
              <IconContainer
                icon={<BarChart3 className="w-6 h-6 text-tomato" />}
                text="Customer Engagement"
                delay={1.1}
                className="absolute right-[23%] bottom-[24%]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
