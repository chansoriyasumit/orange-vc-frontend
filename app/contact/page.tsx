'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { DotBackground } from '@/src/shared/components/backgrounds/GridBackground';
import { useState, useEffect } from 'react';
import { Mail, Clock, MessageSquare, Send, CheckCircle, Phone, Loader2, AlertCircle, Users } from 'lucide-react';
import Link from 'next/link';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { apiContactRepository } from '@/src/features/contacts';
import { ApiError } from '@/src/lib/api';

function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    query: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRecaptchaReady, setIsRecaptchaReady] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  // Check if reCAPTCHA is ready
  useEffect(() => {
    if (executeRecaptcha) {
      setIsRecaptchaReady(true);
    }
  }, [executeRecaptcha]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Get reCAPTCHA token - must be done right before submission
      if (!executeRecaptcha || !isRecaptchaReady) {
        throw new Error('reCAPTCHA is not ready. Please wait a moment and try again.');
      }

      // Generate token immediately before sending
      let recaptchaToken: string;
      try {
        recaptchaToken = await executeRecaptcha('contact_form');
      } catch (recaptchaError) {
        console.error('reCAPTCHA execution error:', recaptchaError);
        throw new Error('Failed to verify you are human. Please try again.');
      }

      // Validate token
      if (!recaptchaToken || recaptchaToken.length === 0) {
        throw new Error('Failed to generate reCAPTCHA token. Please try again.');
      }

      // Submit to API immediately after getting token
      await apiContactRepository.createContact({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        mobileNumber: formData.mobileNumber,
        query: formData.query,
        recaptchaToken,
      });

      setIsSubmitted(true);
      setFormData({ firstName: '', lastName: '', email: '', mobileNumber: '', query: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message || 'Failed to submit contact form. Please try again.');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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
                      Fill out the form and we'll get back to you within 24 working hours to discuss how we can support your goals.
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
                        <h3 className="font-heading font-semibold text-rich-black mb-1 text-sm sm:text-base">Phone</h3>
                        <a 
                          href="tel:+19096342861"
                          className="text-rich-black/70 hover:text-tomato transition-colors underline break-words text-sm sm:text-base"
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
                    {isSubmitted ? (
                      <div className="text-center py-12">
                        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                          <CheckCircle className="w-10 h-10 text-green-600" />
                        </div>
                        <h3 className="font-heading text-2xl font-bold text-rich-black mb-3">
                          Message Sent!
                        </h3>
                        <p className="text-rich-black/70">
                          Thank you for reaching out. We'll get back to you within 24 working hours.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                          <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <p className="text-sm">{error}</p>
                          </div>
                        )}

                        <div className="grid sm:grid-cols-2 gap-6">
                          <div>
                            <Label htmlFor="firstName" className="text-rich-black font-medium">First Name *</Label>
                            <Input
                              id="firstName"
                              type="text"
                              value={formData.firstName}
                              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                              required
                              placeholder="John"
                              className="mt-2 h-12 bg-white-smoke border-platinum/50 focus:border-tomato focus:ring-tomato"
                              disabled={isSubmitting}
                            />
                          </div>

                          <div>
                            <Label htmlFor="lastName" className="text-rich-black font-medium">Last Name *</Label>
                            <Input
                              id="lastName"
                              type="text"
                              value={formData.lastName}
                              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                              required
                              placeholder="Doe"
                              className="mt-2 h-12 bg-white-smoke border-platinum/50 focus:border-tomato focus:ring-tomato"
                              disabled={isSubmitting}
                            />
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                          <div>
                            <Label htmlFor="email" className="text-rich-black font-medium">Email Address *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              required
                              placeholder="john.doe@example.com"
                              className="mt-2 h-12 bg-white-smoke border-platinum/50 focus:border-tomato focus:ring-tomato"
                              disabled={isSubmitting}
                            />
                          </div>

                          <div>
                            <Label htmlFor="mobileNumber" className="text-rich-black font-medium">Mobile Number *</Label>
                            <Input
                              id="mobileNumber"
                              type="tel"
                              value={formData.mobileNumber}
                              onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                              required
                              placeholder="+919876543210"
                              className="mt-2 h-12 bg-white-smoke border-platinum/50 focus:border-tomato focus:ring-tomato"
                              disabled={isSubmitting}
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="query" className="text-rich-black font-medium">How can we help? *</Label>
                          <Textarea
                            id="query"
                            value={formData.query}
                            onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                            required
                            placeholder="I would like to know more about your services."
                            rows={5}
                            className="mt-2 bg-white-smoke border-platinum/50 focus:border-tomato focus:ring-tomato resize-none"
                            disabled={isSubmitting}
                          />
                        </div>

                        <Button
                          type="submit"
                          size="lg"
                          disabled={isSubmitting}
                          className="w-full h-14 bg-gradient-to-r from-tomato to-tomato-600 hover:from-tomato-600 hover:to-tomato text-white font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5 mr-2" />
                              Send Message
                            </>
                          )}
                        </Button>

                        <p className="text-center text-sm text-rich-black/50">
                          By submitting this form, you agree to our privacy policy.
                        </p>
                      </form>
                    )}
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
              Let's Simplify{' '}
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
