import { DotBackground } from "@/src/shared/components/backgrounds/GridBackground";
import { SectionHeading } from "@/src/shared/components/ui/SectionHeading";
import { User } from "lucide-react";

export function WhyChooseUsSection() {
  return (
    <DotBackground className="bg-">
      <section id="why-choose-us" className="py-24">
        <div className="container mx-auto flex px-6 lg:px-8">
          <SectionHeading
            icon={User}
            iconLabel="Why Choose Us"
            title="Why Orange Virtual Connect?"
            subtitle="We don't just assist — we enable you to lead with ease"
            centered={false}
            className="max-w-full"
          />
        </div>
     
        <div className="relative mx-auto max-w-7xl px-8 mt-16">
          <div className="absolute -z-50 size-[400px] -top-10 -left-20 aspect-square rounded-full bg-orange-500/30 blur-3xl"></div>
          <p className="text-slate-800 text-lg text-left max-w-3xl">
            With over 12 years of experience, Orange Virtual Connect delivers professional virtual assistant services that adapt to your unique business needs, helping you reclaim your time and focus on what matters most.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 mt-8 gap-10">
            <div className="md:col-span-2">
              <img
                alt="Professional virtual assistants at work"
                src="/images/why-us/main-banner.png"
              />
            </div>
            <div className="md:col-span-1">
              <img
                alt="Reliable support services"
                className="hover:-translate-y-0.5 transition duration-300"
                src="/images/why-us/monthly-invoice.png"
              />
              <h3 className="text-[24px]/7.5 text-slate-800 font-medium mt-6">
                Maximize productivity with dedicated support
              </h3>
              <p className="text-slate-600 mt-2">
                Orange Virtual Connect empowers businesses and professionals to scale efficiently with reliable, skilled virtual assistants.
              </p>
              <a
                href="/about"
                className="group flex items-center gap-2 mt-4 text-orange-600 hover:text-orange-700 transition"
              >
                Learn more about Orange Virtual Connect
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-up-right size-5 group-hover:translate-x-0.5 transition duration-300"
                  aria-hidden="true"
                >
                  <path d="M7 7h10v10"></path>
                  <path d="M7 17 17 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </DotBackground>
  );
}
