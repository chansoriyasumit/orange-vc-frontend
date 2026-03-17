"use client";

import { ApiService } from "../types/api";
import { Card } from "@/components/ui/card";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { getServiceImage } from "../lib/serviceImages";

interface ServiceCardProps {
  service: ApiService;
  index?: number;
}

export function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const imageUrl = service.banner?.absoluteLink || service.banner?.url || getServiceImage(service.slug);
  const categoryName = service.categories[0]?.name || "General";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
      className="w-full min-w-0"
    >
      <Link href={`/services/${service.slug}`} className="block w-full min-w-0">
        <Card className="group relative overflow-hidden h-full flex flex-col border shadow-sm hover:shadow-xl transition-all duration-500 rounded-2xl w-full min-w-0">
          {/* Image Section */}
          <div className="relative h-44 overflow-hidden">
            {/* Image */}
            <img
              src={imageUrl}
              alt={service.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />

            {/* Category Chip - Top Left */}
            <div className="absolute top-3 left-3 z-20">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm text-xs font-semibold text-gray-800 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                {categoryName}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-4 sm:p-5 flex flex-col flex-grow min-w-0">
            {/* Title */}
            <h3 className="font-bold text-lg sm:text-xl text-gray-900 leading-tight mb-1 group-hover:text-orange-600 transition-colors break-words">
              {service.name}
            </h3>

            {/* Short Description */}
            <p className="text-sm sm:text-md text-gray-500 mb-3 line-clamp-1 break-words">
              {service.shortDescription}
            </p>

            {/* Description */}
            {/* <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed flex-grow">
              {service.description}
            </p> */}

            {/* Tags - Single Line with overflow */}
            <div className="flex items-center gap-1.5 my-4 overflow-hidden min-w-0">
              <div className="flex items-center gap-1.5 overflow-hidden min-w-0 flex-1">
                {service.tags.slice(0, 2).map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center text-xs px-2 py-0.5 bg-orange-50 text-orange-600 rounded font-medium whitespace-nowrap flex-shrink-0"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {service.tags.length > 2 && (
                <span className="inline-flex items-center text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded font-medium whitespace-nowrap flex-shrink-0">
                  +{service.tags.length - 2} more
                </span>
              )}
            </div>

            {/* CTA Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 min-w-0">
              <div className="flex items-center gap-1.5 text-gray-500 text-xs flex-shrink-0">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="whitespace-nowrap">{service.tags.length} features</span>
              </div>
              <div className="flex items-center gap-1 text-orange-600 font-semibold text-sm group-hover:gap-2 transition-all duration-300 flex-shrink-0">
                <span>Explore</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>

          {/* Hover Accent Line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </Card>
      </Link>
    </motion.div>
  );
}
