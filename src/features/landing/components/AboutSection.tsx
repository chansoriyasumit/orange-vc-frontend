"use client";

import { DotBackground } from "@/src/shared/components/backgrounds/GridBackground";
import { TestimonialsSection } from "./TestimonialSection";
import type { AboutUsSectionData } from "@/src/shared/types/home-page";
import { User, Users, Globe, Shield } from "lucide-react";
import { SectionHeading } from "@/src/shared/components/ui/SectionHeading";
import { useState } from "react";

const features = [
  {
    id: "personalized",
    icon: Users,
    title: "Personalized Support",
    description: "Tailored assistance to match your goals and work style",
    image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png",
  },
  {
    id: "global",
    icon: Globe,
    title: "Global Expertise",
    description: "Support across time zones when you need it the most",
    image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png",
  },
  {
    id: "trust",
    icon: Shield,
    title: "Trust & Privacy",
    description: "Highest level of professionalism and confidentiality",
    image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png",
  },
];

export interface AboutSectionProps {
  aboutUs: AboutUsSectionData;
}

export function AboutSection({ aboutUs }: AboutSectionProps) {
  const [selectedFeature, setSelectedFeature] = useState(features[0]);

  return (
    <DotBackground className="bg-white">
      <section id="about" className="py-24 border-t border-gray-100">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                icon={User}
                iconLabel="About Us"
                title={
                  <>
                    {aboutUs.headingPart1}{" "}
                    <span className="text-tomato">{aboutUs.headingPart2}</span>
                  </>
                }
                subtitle={aboutUs.description}
                centered={false}
              />

              <div className="space-y-4 text-rich-black/70 leading-relaxed">
                <div className="px-4 md:px-0 pt-12 space-y-3">
                  {features.map((feature) => {
                    const Icon = feature.icon;
                    const isActive = selectedFeature.id === feature.id;
                    
                    return (
                      <div
                        key={feature.id}
                        onClick={() => setSelectedFeature(feature)}
                        className="flex items-center justify-center gap-6 max-w-md group cursor-pointer"
                      >
                        <div
                          className={`p-6 flex gap-4 rounded-xl transition-all duration-300 ${
                            isActive
                              ? "bg-orange-50 border-orange-400 border shadow-sm"
                              : "bg-white border border-transparent group-hover:bg-orange-50 group-hover:border-orange-200"
                          }`}
                        >
                          <Icon 
                            className={`size-6 transition-colors duration-300 ${
                              isActive ? "stroke-orange-600" : "stroke-orange-500"
                            }`}
                          />
                          <div className="space-y-2">
                            <h3 className="text-base font-semibold text-slate-800">
                              {feature.title}
                            </h3>
                            <p className="text-sm text-slate-600 max-w-xs">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="gap-4 relative overflow-hidden">
              {features.map((feature) => (
                <img
                  key={feature.id}
                  className={`max-w-2xl w-full transition-all duration-500 ${
                    selectedFeature.id === feature.id
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 absolute top-0 left-0 translate-x-4"
                  }`}
                  src={feature.image}
                  alt={feature.title}
                />
              ))}
            </div>
          </div>
        </div>

        <TestimonialsSection />
      </section>
    </DotBackground>
  );
}
