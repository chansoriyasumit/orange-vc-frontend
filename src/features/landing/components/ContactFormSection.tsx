'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { apiContactRepository } from '@/src/features/contacts';
import { ApiError } from '@/src/lib/api';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

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
    <section className="relative py-24 border-t border-gray-100">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f9731615_1px,transparent_1px),linear-gradient(to_bottom,#f9731615_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      {/* Soft Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-tomato/5 to-pale-dogwood/20" />
      
      <div className="container relative z-10 mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-8">
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
            
            {/* Contact Form */}
            <div>
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
                          <Label htmlFor="home-firstName" className="text-rich-black font-medium">First Name *</Label>
                          <Input
                            id="home-firstName"
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
                          <Label htmlFor="home-lastName" className="text-rich-black font-medium">Last Name *</Label>
                          <Input
                            id="home-lastName"
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
                          <Label htmlFor="home-email" className="text-rich-black font-medium">Email Address *</Label>
                          <Input
                            id="home-email"
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
                          <Label htmlFor="home-mobileNumber" className="text-rich-black font-medium">Mobile Number *</Label>
                          <Input
                            id="home-mobileNumber"
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
                        <Label htmlFor="home-query" className="text-rich-black font-medium">How can we help? *</Label>
                        <Textarea
                          id="home-query"
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
    </section>
  );
}

export function ContactFormSection() {
  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_KEY || '6LfAkS0sAAAAABXtfIdENl9SDjNLmo16m08DvsXO';

  return (
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
  );
}

