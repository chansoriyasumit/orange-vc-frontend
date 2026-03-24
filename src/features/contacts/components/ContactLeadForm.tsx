'use client';

import { useEffect, useRef, useState } from 'react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { apiContactRepository } from '../lib/ApiContactRepository';
import { ApiError } from '@/src/lib/api';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { splitDisplayName } from '../lib/splitDisplayName';
import { cn } from '@/src/lib/utils/utils';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RECAPTCHA_TIMEOUT_MS = 25000;
const SUBMIT_TIMEOUT_MS = 45000;

function withTimeout<T>(promise: Promise<T>, timeoutMs: number, message: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => reject(new Error(message)), timeoutMs);
    promise.then(
      (value) => {
        clearTimeout(timeoutId);
        resolve(value);
      },
      (error) => {
        clearTimeout(timeoutId);
        reject(error);
      }
    );
  });
}

export type ContactLeadFormProps = {
  idPrefix?: string;
  className?: string;
};

export function ContactLeadForm({ idPrefix = '', className }: ContactLeadFormProps) {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneE164, setPhoneE164] = useState<string | undefined>();
  const [query, setQuery] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const submitLockRef = useRef(false);
  const successResetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isRecaptchaReady = typeof executeRecaptcha === 'function';

  useEffect(() => {
    return () => {
      if (successResetTimeoutRef.current) {
        clearTimeout(successResetTimeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const nameTrim = displayName.trim();
    if (!nameTrim) {
      setError('Please enter your name.');
      return;
    }

    const emailTrim = email.trim();
    const phoneValid =
      !!phoneE164 && isValidPhoneNumber(phoneE164);
    const digitsOnly = phoneE164?.replace(/\D/g, '') ?? '';
    const userTouchedPhone = digitsOnly.length > 0;

    if (!emailTrim && !phoneValid) {
      setError('Please provide a valid email address or mobile number.');
      return;
    }
    if (emailTrim && !EMAIL_RE.test(emailTrim)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (userTouchedPhone && !phoneValid) {
      setError('Please enter a valid mobile number.');
      return;
    }

    if (submitLockRef.current) {
      return;
    }
    if (!isRecaptchaReady) {
      setError('Security check is still loading. Please wait a moment and try again.');
      return;
    }

    submitLockRef.current = true;
    setIsSubmitting(true);

    let abortTimer: ReturnType<typeof setTimeout> | null = null;

    try {
      let recaptchaToken: string;
      try {
        recaptchaToken = await withTimeout(
          executeRecaptcha('contact_form'),
          RECAPTCHA_TIMEOUT_MS,
          'Security check timed out. Please try again.'
        );
      } catch (recaptchaError) {
        console.error('reCAPTCHA execution error:', recaptchaError);
        throw recaptchaError instanceof Error
          ? recaptchaError
          : new Error('Failed to verify you are human. Please try again.');
      }

      if (!recaptchaToken || recaptchaToken.length === 0) {
        throw new Error('Failed to generate reCAPTCHA token. Please try again.');
      }

      const { firstName, lastName } = splitDisplayName(nameTrim);
      const abortController = new AbortController();
      abortTimer = setTimeout(() => abortController.abort(), SUBMIT_TIMEOUT_MS);

      await apiContactRepository.createContact(
        {
          firstName,
          ...(lastName ? { lastName } : {}),
          ...(emailTrim ? { email: emailTrim } : {}),
          ...(phoneValid ? { mobileNumber: phoneE164 } : {}),
          ...(query.trim() ? { query: query.trim() } : {}),
          recaptchaToken,
        },
        { signal: abortController.signal }
      );

      setIsSubmitted(true);
      setDisplayName('');
      setEmail('');
      setPhoneE164(undefined);
      setQuery('');

      successResetTimeoutRef.current = setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        setError('Request timed out. Please try again.');
        return;
      }
      if (err instanceof ApiError) {
        setError(err.message || 'Failed to submit contact form. Please try again.');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      if (abortTimer) {
        clearTimeout(abortTimer);
      }
      submitLockRef.current = false;
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={cn('text-center py-12', className)}>
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-rich-black mb-3">Message Sent!</h3>
        <p className="text-rich-black/70">
          Thank you for reaching out. We&apos;ll get back to you within 24 working hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-6', className)}>
      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div>
        <Label htmlFor={`${idPrefix}name`} className="text-rich-black font-medium">
          Name *
        </Label>
        <Input
          id={`${idPrefix}name`}
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
          placeholder="Full Name"
          className="mt-2 h-12 bg-white-smoke border-platinum/50 focus:border-tomato focus:ring-tomato"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <Label htmlFor={`${idPrefix}email`} className="text-rich-black font-medium">
            Email address
          </Label>
          <Input
            id={`${idPrefix}email`}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mt-2 h-12 bg-white-smoke border-platinum/50 focus:border-tomato focus:ring-tomato"
            autoComplete="email"
          />
        </div>

        <div>
          <Label htmlFor={`${idPrefix}phone`} className="text-rich-black font-medium">
            Mobile number
          </Label>
          <div className="mt-2">
            <PhoneInput
              international
              defaultCountry="US"
              countryCallingCodeEditable={false}
              value={phoneE164}
              onChange={setPhoneE164}
              id={`${idPrefix}phone`}
              className={cn(
                'flex h-12 w-full items-center gap-2 rounded-lg border border-platinum/50 bg-white-smoke px-2',
                'focus-within:border-tomato focus-within:ring-2 focus-within:ring-tomato/20'
              )}
              numberInputProps={{
                className:
                  'min-w-0 flex-1 border-0 bg-transparent py-2 text-base text-rich-black outline-none placeholder:text-rich-black/40 disabled:cursor-not-allowed',
              }}
            />
          </div>
        </div>
      </div>

      <p className="text-sm text-rich-black/60 -mt-2">
        Provide at least one: a valid email or a complete mobile number (with country code).
      </p>

      <div>
        <Label htmlFor={`${idPrefix}query`} className="text-rich-black font-medium">
          How can we help?
        </Label>
        <Textarea
          id={`${idPrefix}query`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="I would like to know more about your services."
          rows={5}
          className="mt-2 bg-white-smoke border-platinum/50 focus:border-tomato focus:ring-tomato resize-none"
        />
      </div>

      {!isRecaptchaReady && !isSubmitting && (
        <div className="flex items-center gap-2 p-3 rounded-lg border border-platinum/50 bg-white-smoke text-sm text-rich-black/70">
          <Loader2 className="w-4 h-4 animate-spin text-tomato" />
          Preparing secure form check...
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting || !isRecaptchaReady}
        className="w-full h-14 bg-gradient-to-r from-tomato to-tomato-600 hover:from-tomato-600 hover:to-tomato text-white font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Sending...
          </>
        ) : !isRecaptchaReady ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Preparing...
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
  );
}
