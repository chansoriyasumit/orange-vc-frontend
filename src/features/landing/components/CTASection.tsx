import { AppButton } from "@/src/shared/components/ui/AppButton";

export function CTASection() {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="bg-gradient-to-br from-tomato to-tomato-600 rounded-3xl p-12 md:p-16 text-center text-white">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Let's Simplify Your Day
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get started today and experience how effortless your day can feel
            when the right team has your back.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
            <AppButton size="lg" variant="secondary" href="/pricing">
              Get Started Today
            </AppButton>
    
            <AppButton
              size="lg"
              variant="outline"
              href="/contact"
              className="border-white text-white hover:bg-white hover:text-tomato"
            >
              Contact Us
            </AppButton>
          </div>
        </div>
      </div>
    </section>
  );
}

