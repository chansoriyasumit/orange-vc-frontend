"use client";

import { 
  UserRound, 
  Headphones, 
  Share2,
  Briefcase,
  FileText,
  BarChart3
} from "lucide-react";

// 5 Services: Personal Assistant, Customer Engagement, Research & Insights, Social Media, Task Management
const serviceIcons = [
  { Icon: UserRound, name: "Personal Assistant" },
  { Icon: Headphones, name: "Customer Engagement" },
  { Icon: BarChart3, name: "Research & Insights" },
  { Icon: Share2, name: "Social Media" },
  { Icon: Briefcase, name: "Task Management" }
];

// For background pattern, use all icons
const icons = [UserRound, Headphones, BarChart3, Share2, Briefcase];

export function ServiceIconsDivider() {
  return (
    <div className="relative w-full h-[540px] overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 py-16">
      {/* Animated Icon Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-8 md:grid-cols-12 lg:grid-cols-16 gap-8 md:gap-12 p-8 animate-float">
          {Array.from({ length: 48 }).map((_, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div 
                key={i}
                className="flex items-center justify-center"
                style={{
                  animationDelay: `${(i * 0.1) % 3}s`,
                  opacity: 0.3 + (i % 3) * 0.2
                }}
              >
                <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" strokeWidth={1.5} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Decorative Gradient Orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl" />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-4">
              <Briefcase className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">Our Services</span>
            </div>
            <h2 className="text-3xl md:text-4xl tracking-tighter lg:text-5xl font-bold text-white mb-3">
            Intelligent Business Support
            </h2>
            <p className="text-white/90 text-lg max-w-2xl">
              Discover our comprehensive range of services designed to elevate your business
            </p>
          </div>
          
          {/* Floating Service Icons - 5 Services */}
          <div className="flex gap-4 flex-wrap justify-center">
            {serviceIcons.map((service, index) => {
              const Icon = service.Icon;
              return (
                <div 
                  key={index}
                  className="group relative"
                  style={{
                    animationDelay: `${index * 0.15}s`
                  }}
                >
                  <div className="absolute inset-0 bg-white/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                  <div className="relative p-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl hover:bg-white/30 hover:scale-110 transition-all duration-300 hover:shadow-xl">
                    <Icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/5 to-transparent" />

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

