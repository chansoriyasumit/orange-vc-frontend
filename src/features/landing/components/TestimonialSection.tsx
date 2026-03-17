// File: src/sections/TestimonialsSection.tsx

import React from "react";

type CardData = {
  image: string;
  name: string;
  handle: string;
  testimonial: string;
};

// Testimonial texts
const testimonialTexts = [
  "Orange Virtual Connect has helped streamline our day-to-day operations with remarkable efficiency. Tasks are handled on time, communication is clear, and the team consistently delivers quality work we can rely on.",
  "Working with OVC feels like having an in-house assistant without the overhead. They understand priorities quickly, adapt to changing needs, and support our business with care and precision.",
  "The level of professionalism at Orange Virtual Connect is impressive. From managing tasks to following up proactively, their attention to detail has made a noticeable impact on our productivity.",
  "Delegating work used to be challenging, but Orange Virtual Connect changed that. Their structured approach, responsiveness, and consistent delivery have made virtual assistance both effective and dependable.",
  "The OVC team takes the time to understand expectations and ensures tasks are executed accurately. Their willingness to improve and adapt makes collaboration smooth and stress-free.",
  "As our workload increased, Orange Virtual Connect stepped in seamlessly. Their ability to manage tasks independently has allowed us to focus more on strategy and growth.",
  "Orange Virtual Connect brings organization and clarity to our daily operations. The team is proactive, respectful of deadlines, and always ready to go the extra mile.",
  "What sets OVC apart is consistency. Every task, big or small, is handled with the same level of commitment and quality, making them a reliable long-term partner.",
  "Having a team that works across time zones has been incredibly helpful. Orange Virtual Connect ensures continuity and timely execution, no matter when support is needed.",
  "Orange Virtual Connect goes beyond task completion. They bring structure, accountability, and peace of mind, helping us stay focused on what truly matters.",
];

// Helper function to generate handle from name
const generateHandle = (name: string): string => {
  const nameParts = name.toLowerCase().split(" ");
  if (nameParts.length === 1) {
    return `@${nameParts[0]}`;
  }
  return `@${nameParts[0]}${nameParts[1][0]}`;
};

// Testimonial data with images and randomly mapped testimonials
// Note: If images don't load, the folder might need to be renamed from "testimonials /" to "testimonials" (without space)
const cardsData: CardData[] = [
  {
    image: "/images/testimonials%20/Ava%20White.jpg",
    name: "Ava White",
    handle: generateHandle("Ava White"),
    testimonial: testimonialTexts[0],
  },
  {
    image: "/images/testimonials%20/Emma%20Davis.jpg",
    name: "Emma Davis",
    handle: generateHandle("Emma Davis"),
    testimonial: testimonialTexts[1],
  },
  {
    image: "/images/testimonials%20/Grace%20Baker.jpg",
    name: "Grace Baker",
    handle: generateHandle("Grace Baker"),
    testimonial: testimonialTexts[2],
  },
  {
    image: "/images/testimonials%20/Jack%20Miller.jpg",
    name: "Jack Miller",
    handle: generateHandle("Jack Miller"),
    testimonial: testimonialTexts[3],
  },
  {
    image: "/images/testimonials%20/Jay.jpg",
    name: "Jay",
    handle: generateHandle("Jay"),
    testimonial: testimonialTexts[4],
  },
  {
    image: "/images/testimonials%20/Liam%20Scott.jpg",
    name: "Liam Scott",
    handle: generateHandle("Liam Scott"),
    testimonial: testimonialTexts[5],
  },
  {
    image: "/images/testimonials%20/Lily%20Clark.jpg",
    name: "Lily Clark",
    handle: generateHandle("Lily Clark"),
    testimonial: testimonialTexts[6],
  },
  {
    image: "/images/testimonials%20/Luke%20Anderson.jpg",
    name: "Luke Anderson",
    handle: generateHandle("Luke Anderson"),
    testimonial: testimonialTexts[7],
  },
  {
    image: "/images/testimonials%20/Mia%20Thompson.jpg",
    name: "Mia Thompson",
    handle: generateHandle("Mia Thompson"),
    testimonial: testimonialTexts[8],
  },
  {
    image: "/images/testimonials%20/Sam%20Wilson.jpg",
    name: "Sam Wilson",
    handle: generateHandle("Sam Wilson"),
    testimonial: testimonialTexts[9],
  },
];

const TestimonialCard: React.FC<{ card: CardData }> = ({ card }) => (
  <div className="p-4 rounded-xl mx-4 shadow hover:shadow-lg cursor-pointer transition-all duration-200 w-72 shrink-0 bg-white">
    <div className="flex gap-2">
      <img
        className="w-11 h-11 rounded-full object-cover"
        src={card.image}
        alt={card.name}
        loading="lazy"
      />
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <p className="font-medium">{card.name}</p>
          <svg
            className="mt-0.5 fill-blue-500"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59 3 3 0 0 1-.239.297c-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.368.313.551.47.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244a4 4 0 0 1 .38-.041c.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922a4 4 0 0 1 .041-.38c.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56m4.07 3.998a.488.488 0 0 0-.691-.69l-2.91 2.91-.958-.957a.488.488 0 0 0-.69.69l1.302 1.302c.19.191.5.191.69 0z"
            />
          </svg>
        </div>
        <span className="text-xs text-slate-500">{card.handle}</span>
      </div>
    </div>
    <p className="text-md py-4 text-gray-500">
      {card.testimonial}
    </p>
  </div>
);

export function TestimonialsSection() {
  return (
    <section className="pt-12">
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .marquee-inner {
          animation: marqueeScroll 45s linear infinite;
        }
      `}</style>

      <div className="container mx-auto px-6 lg:px-8">
        <div className="space-y-6">
          <div className="marquee-row w-full mx-auto max-w-7xl overflow-hidden relative">
            <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
            <div className="marquee-inner flex transform-gpu min-w-[200%] pt-10 pb-5">
              {[...cardsData, ...cardsData].map((card, index) => (
                <TestimonialCard key={`${card.handle}-${index}`} card={card} />
              ))}
            </div>
            <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
