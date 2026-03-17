'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authRepository } from '@/src/features/auth/lib';
import { AppButton } from '@/src/shared/components/ui/AppButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { AlertCircle, ArrowLeft, CheckCircle, Mail } from 'lucide-react';

export function ForgotPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Basic email validation
    if (!email.trim()) {
      setError('Please enter your email address');
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      await authRepository.forgotPassword(email.trim());
      setIsSuccess(true);
    } catch (err: any) {
      // Even on error, show success message (security best practice)
      setIsSuccess(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Link
          href="/auth/signin"
          className="inline-flex items-center gap-2 text-rich-black/60 hover:text-rich-black mb-6 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to log in</span>
        </Link>

        {/* Mobile Logo */}
        <div className="lg:hidden mb-8 text-center">
          <h2 className="font-heading font-bold text-3xl text-rich-black">
            Orange<span className="text-tomato">VC</span>
          </h2>
        </div>

        {/* Success Message */}
        <div className="mb-8">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6 mx-auto">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="font-heading tracking-tighter font-bold text-4xl text-rich-black mb-3 text-center">
            Check Your Email
          </h1>
          <p className="text-rich-black/60 text-base text-center">
            If an account with that email exists, a password reset link has been sent.
          </p>
        </div>

        {/* Success Details */}
        <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200">
          <p className="text-sm text-green-800 text-center">
            Please check your inbox and click the password reset link. The link will expire in 1 hour.
          </p>
        </div>

        {/* Back to Sign In */}
        <AppButton
          type="button"
          size="lg"
          variant="primary"
          fullWidth
          onClick={() => router.push('/auth/signin')}
        >
          Back to Log In
        </AppButton>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      {/* Back Button */}
      <Link
        href="/auth/signin"
        className="inline-flex items-center gap-2 text-rich-black/60 hover:text-rich-black mb-6 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back to sign in</span>
      </Link>

      {/* Mobile Logo */}
      <div className="lg:hidden mb-8 text-center">
        <h2 className="font-heading font-bold text-3xl text-rich-black">
          Orange<span className="text-tomato">VC</span>
        </h2>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading tracking-tighter font-bold text-4xl text-rich-black mb-3">
          Forgot Password?
        </h1>
        <p className="text-rich-black/60 text-base">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-base">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="andy@orangevc.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            autoComplete="email"
          />
        </div>

        {/* Submit Button */}
        <AppButton
          type="submit"
          size="lg"
          variant="primary"
          fullWidth
          isLoading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </AppButton>
      </form>

      {/* Sign In Link - Bottom */}
      <div className="mt-8 text-center">
        <span className="text-sm text-rich-black/60">Remember your password? </span>
        <Link
          href="/auth/signin"
          className="text-sm font-semibold text-tomato hover:text-tomato-600 transition-colors"
        >
          Log In
        </Link>
      </div>
    </div>
  );
}
