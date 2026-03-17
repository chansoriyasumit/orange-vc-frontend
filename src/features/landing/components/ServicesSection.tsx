'use client';

import { useEffect, useState } from 'react';
import { ServiceCard } from "@/src/features/services/components/ServiceCard";
import { AppButton } from "@/src/shared/components/ui/AppButton";
import { ApiService } from "@/src/features/services/types/api";
import { apiServiceRepository } from "@/src/features/services/lib/ApiServiceRepository";
import { ArrowRight, Loader2 } from "lucide-react";

export function ServicesSection() {
  const [services, setServices] = useState<ApiService[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        // Fetch first 6 services to display on home page
        const result = await apiServiceRepository.searchServices({ limit: 6 });
        setServices(result.services);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <section
      id="services"
      className="relative pb-24"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f9731615_1px,transparent_1px),linear-gradient(to_bottom,#f9731615_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Gradient Overlays - White to Light Orange */}
      <div className="absolute inset-0 top-1/2 bg-gradient-to-b from-white via-orange-50/30 to-orange-100/50" />

      <div className="container relative z-10 mx-auto px-6 lg:px-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-tomato" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 my-16">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        )}

        <div className="text-center group">
          <AppButton size="lg" variant="primary" href="/services">
            View All Services
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </AppButton>
        </div>
      </div>
    </section>
  );
}
