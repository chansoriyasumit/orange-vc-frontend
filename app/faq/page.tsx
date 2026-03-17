import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { DotBackground } from '@/src/shared/components/backgrounds/GridBackground';
import Link from 'next/link';
import { HelpCircle, MessageSquare, Sparkles, DollarSign, Shield, Rocket } from 'lucide-react';

const faqCategories = [
  {
    title: 'About Us & Services',
    icon: Sparkles,
    faqs: [
      {
        question: 'What is Orange Virtual Connect?',
        answer: 'Orange Virtual Connect is a global Virtual Assistant and business support services company helping entrepreneurs, startups, and businesses delegate tasks efficiently and scale faster.'
      },
      {
        question: 'What services do you offer?',
        answer: 'We provide Virtual Assistant services, Administrative Support, Sales & Lead Generation, Customer Support (Voice, Email & Chat), Digital Marketing Support, CRM Management, and Back-Office Operations.'
      },
      {
        question: 'Who can use your services?',
        answer: 'Our services are ideal for founders, solopreneurs, startups, SMEs, agencies, and international businesses seeking reliable and cost-effective support.'
      },
      {
        question: 'Do you offer dedicated Virtual Assistants?',
        answer: 'Yes, we offer dedicated Virtual Assistants based on the selected plan and business requirements. This ensures consistent support and allows your assistant to become familiar with your business needs and work style.'
      },
    ]
  },
  {
    title: 'Pricing & Plans',
    icon: DollarSign,
    faqs: [
      {
        question: 'What are your pricing and plans?',
        answer: 'Our plans start from $199 per month. Pricing depends on hours, role complexity, and service type. Custom plans are also available to meet specific business requirements.'
      },
      {
        question: 'What is your contract and commitment policy?',
        answer: 'We do not enforce long-term contracts. Clients can upgrade, downgrade, or discontinue services as per agreement terms, giving you the flexibility to adjust as your business needs change.'
      },
      {
        question: 'How quickly can services start?',
        answer: 'Services usually begin within 2–5 business days after onboarding. This includes matching you with a dedicated assistant and setting up all necessary tools and processes.'
      },
    ]
  },
  {
    title: 'Security & Operations',
    icon: Shield,
    faqs: [
      {
        question: 'How do you ensure data security and confidentiality?',
        answer: 'We follow strict NDAs, confidentiality policies, and secure internal processes to protect client data. All team members sign comprehensive confidentiality agreements, and we use encrypted communication channels and secure file-sharing systems.'
      },
      {
        question: 'What tools and software do you use?',
        answer: 'Clients may use their own tools or systems. If required, we can provide tools at an additional cost. We are flexible and can adapt to your existing technology stack.'
      },
      {
        question: 'Do you support inbound and outbound calling?',
        answer: 'Yes, we support both inbound and outbound calling. Call volume depends on plan hours and Average Handling Time (AHT). We can handle customer support calls, lead generation calls, and other telephony needs.'
      },
      {
        question: 'What is your dialer cost policy?',
        answer: 'Dialer costs are not included in the base plan. Clients may use their own dialer or opt for our dialer at an additional subscription cost. We can discuss the best option for your needs during onboarding.'
      },
      {
        question: 'What is your dormant account policy?',
        answer: 'If there is no activity for 15 days, the account is marked Dormant. Three reminder emails are sent at 5-day intervals to help you reactivate your account and resume services.'
      },
      {
        question: 'How do you track work and provide reporting?',
        answer: 'We provide regular updates, summaries, and performance reports with defined escalation protocols. You\'ll receive detailed reports on tasks completed, time spent, and key metrics to keep you informed about your assistant\'s work.'
      },
      {
        question: 'What are your working hours and time zones?',
        answer: 'We support US, UK, Australia, and India time zones based on client needs. Our team operates across multiple time zones to ensure seamless support when you need it most.'
      },
    ]
  },
  {
    title: 'Getting Started',
    icon: Rocket,
    faqs: [
      {
        question: 'How do I get started?',
        answer: 'Getting started is easy! Contact us via the website, select a plan that fits your needs, complete the onboarding process, and start delegating tasks. Our team will guide you through each step to ensure a smooth setup.'
      },
    ]
  }
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white-smoke">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pale-dogwood/30 via-white-smoke to-tomato/5 py-32 pt-28 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-tomato/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-pale-dogwood/50 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tomato/10 text-tomato font-semibold text-sm mb-6">
              <HelpCircle className="w-4 h-4" />
              FAQ
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-rich-black mb-6 leading-tight">
              Frequently Asked{' '}
              <span className="text-tomato">Questions</span>
            </h1>
            <p className="text-xl text-rich-black/70 max-w-2xl mx-auto leading-relaxed">
              Find answers to common questions about our virtual assistant services and how we can help you succeed.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section with Dot Background */}
      <DotBackground className="bg-white">
        <section className="py-24">
          <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
            <div className="space-y-12">
              {faqCategories.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-tomato/10 flex items-center justify-center">
                      <category.icon className="w-5 h-5 text-tomato" />
                    </div>
                    <h2 className="font-heading text-2xl font-bold text-rich-black">
                      {category.title}
                    </h2>
                  </div>

                  {/* FAQs */}
                  <Accordion type="single" collapsible className="space-y-4">
                    {category.faqs.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`item-${categoryIndex}-${index}`}
                        className="bg-white-smoke rounded-2xl border border-platinum/50 px-6 hover:border-tomato/30 transition-colors data-[state=open]:border-tomato/30 data-[state=open]:shadow-sm"
                      >
                        <AccordionTrigger className="text-left font-heading font-semibold text-lg text-rich-black hover:text-tomato py-5 [&[data-state=open]]:text-tomato">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-rich-black/70 leading-relaxed pb-5 pt-0">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </section>
      </DotBackground>

      {/* CTA Section */}
      <section className="bg-white-smoke py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="bg-gradient-to-br from-tomato to-tomato-600 rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Still Have Questions?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                We're here to help! Contact us and we'll answer any questions you have about our services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" variant="secondary" className="bg-white text-tomato hover:bg-white/90 px-8">
                    Contact Us
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8">
                    View Pricing
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
