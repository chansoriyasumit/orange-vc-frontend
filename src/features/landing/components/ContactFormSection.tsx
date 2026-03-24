'use client';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { ContactLeadForm } from '@/src/features/contacts/components/ContactLeadForm';

export function ContactFormSection() {
  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_KEY || '6LfAkS0sAAAAABXtfIdENl9SDjNLmo16m08DvsXO';

  return (
    <section className="relative py-24 border-t border-gray-100">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f9731615_1px,transparent_1px),linear-gradient(to_bottom,#f9731615_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="absolute inset-0 bg-gradient-to-b from-white via-tomato/5 to-pale-dogwood/20" />

      <div className="container relative z-10 mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tomato/10 text-tomato font-medium text-xs sm:text-sm mb-4">
              Get In Touch
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-rich-black mb-4">
              Ready to Reclaim Your Time?
            </h2>
            <p className="text-rich-black/70 leading-relaxed mb-4 text-sm sm:text-base">
              Fill out the form and we&apos;ll get back to you within 24 working hours to discuss how we can support your
              goals.
            </p>
            <p className="text-xs sm:text-sm text-rich-black/60 font-medium">Orange Virtual Global Solutions Pvt Ltd</p>
          </div>

          <div>
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-platinum/50 shadow-sm">
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
                <ContactLeadForm idPrefix="home-" />
              </GoogleReCaptchaProvider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
