'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { DotBackground } from '@/src/shared/components/backgrounds/GridBackground';
import { Mail, Clock, Send, CheckCircle, Phone } from 'lucide-react';
import Link from 'next/link';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { ContactLeadForm } from '@/src/features/contacts/components/ContactLeadForm';

function ContactForm() {
  return (
    <>
      {/* Contact Form Section with Dot Background */}
      <DotBackground className="bg-white">
        <section className="py-24">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
                {/* Left - Contact Info */}
                <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tomato/10 text-tomato font-medium text-xs sm:text-sm mb-4">
                      Get In Touch
                    </div>
                    <h2 className="font-heading text-2xl sm:text-3xl font-bold text-rich-black mb-4">
                      Ready to Reclaim Your Time?
                    </h2>
                    <p className="text-rich-black/70 leading-relaxed mb-4 text-sm sm:text-base">
                      Fill out the form and we&apos;ll get back to you within 24 working hours to discuss how we can support your goals.
                    </p>
                    <p className="text-xs sm:text-sm text-rich-black/60 font-medium">
                      Orange Virtual Global Solutions Pvt Ltd
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-white-smoke rounded-2xl border border-platinum/50">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-tomato/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-tomato" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-heading font-semibold text-rich-black mb-1 text-sm sm:text-base">Email</h3>
                        <a 
                          href="mailto:virtual.care@orangevirtualconnect.com"
                          className="text-rich-black/70 hover:text-tomato transition-colors underline break-words break-all text-sm sm:text-base"
                        >
                          virtual.care@orangevirtualconnect.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-white-smoke rounded-2xl border border-platinum/50">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-tomato/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-tomato" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-heading font-semibold text-rich-black mb-1 text-sm sm:text-base">India</h3>
                        <a 
                          href="tel:+919310557136"
                          className="text-rich-black/70 hover:text-tomato transition-colors underline break-words break-all text-sm sm:text-base"
                        >
                          IND:91-9310557136
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-white-smoke rounded-2xl border border-platinum/50">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-tomato/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-tomato" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-heading font-semibold text-rich-black mb-1 text-sm sm:text-base">USA</h3>
                        <a 
                          href="tel:+19096342861"
                          className="text-rich-black/70 hover:text-tomato transition-colors underline break-words break-all text-sm sm:text-base"
                        >
                          +1 (909) 634-2861
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-white-smoke rounded-2xl border border-platinum/50">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-tomato/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-tomato" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-heading font-semibold text-rich-black mb-1 text-sm sm:text-base">Working Hours</h3>
                        <p className="text-rich-black/70 text-sm sm:text-base">Monday - Friday: 10 AM - 6 PM ET</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-white-smoke rounded-2xl border border-platinum/50">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-tomato/10 flex items-center justify-center flex-shrink-0">
                        <Send className="w-5 h-5 sm:w-6 sm:h-6 text-tomato" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-heading font-semibold text-rich-black mb-1 text-sm sm:text-base">Response Time</h3>
                        <p className="text-rich-black/70 text-sm sm:text-base">24 working hours</p>
                      </div>
                    </div>
                  </div>

                  {/* Trust badges */}
                  <div className="pt-4">
                    <div className="flex flex-wrap gap-3">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm">
                        <CheckCircle className="w-4 h-4" />
                        12+ Years Experience
                      </div>
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm">
                        <CheckCircle className="w-4 h-4" />
                        500+ Happy Clients
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right - Contact Form */}
                <div className="lg:col-span-3">
                  <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-platinum/50 shadow-sm">
                    <ContactLeadForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </DotBackground>
    </>
  );
}

export default function ContactPage() {
  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_KEY || '6LfAkS0sAAAAABXtfIdENl9SDjNLmo16m08DvsXO';

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
            <div className="mb-6 py-2" />
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-rich-black mb-6 leading-tight">
              Let&apos;s Simplify{' '}
              <span className="text-tomato">Your Day</span>
            </h1>
            <p className="text-xl text-rich-black/70 max-w-3xl mx-auto leading-relaxed">
              Get started today and experience how effortless your day can feel when the right team has your back.
            </p>
          </div>
        </div>
      </section>

      <GoogleReCaptchaProvider
        reCaptchaKey={recaptchaKey}
        language="en"
        scriptProps={{
          async: true,
          defer: true,
          appendTo: 'head',
        }}
        container={{
          parameters: {
            badge: 'bottomleft',
          },
        }}
      >
        <ContactForm />
      </GoogleReCaptchaProvider>

      {/* CTA Section */}
      <section className="bg-white-smoke py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="bg-gradient-to-br from-rich-black to-rich-black/95 rounded-3xl p-12 md:p-16 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-tomato/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-tomato/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-3">
                  Prefer to explore first?
                </h2>
                <p className="text-lg text-white/70">
                  Check out our services and pricing to find the perfect fit for your needs.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/services">
                  <Button size="lg" className="bg-tomato hover:bg-tomato-600 text-white px-8">
                    View Services
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-8">
                    See Pricing
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
