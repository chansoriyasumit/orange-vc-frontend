'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/src/features/auth/lib/AuthContext';
import { AppButton } from '@/src/shared/components/ui/AppButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { AlertCircle, Eye, EyeOff, ArrowLeft } from 'lucide-react';

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirect = searchParams.get('redirect') || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await signIn({ email, password });
      router.push(redirect);
    } catch (err: any) {
      setError(err.message || 'Failed to log in. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-rich-black/60 hover:text-rich-black mb-6 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back to home</span>
      </Link>

      {/* Mobile Logo */}
      <div className="lg:hidden mb-8 text-center">
        <h2 className="font-heading font-bold text-3xl text-rich-black">
          Orange<span className="text-tomato">VC</span>
        </h2>
      </div>

      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="font-heading tracking-tighter font-bold text-4xl text-rich-black mb-3">
          Welcome Back!
        </h1>
        <p className="text-rich-black/60 text-base">
          Log in to continue to OrangeVC
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* Sign In Form */}
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
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-base">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isSubmitting}
              className="pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-rich-black/40 hover:text-rich-black/70 transition-colors"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Forgot Password */}
        <div className="text-right">
          <Link
            href="/auth/forgot-password"
            className="text-sm text-rich-black/60 hover:text-tomato transition-colors"
          >
            Forgot your password?
          </Link>
        </div>

        {/* Sign In Button */}
        <AppButton
          type="submit"
          size="lg"
          variant="primary"
          fullWidth
          isLoading={isSubmitting}
        >
          {isSubmitting ? 'Signing in...' : 'Log In'}
        </AppButton>
      </form>

      {/* Sign Up Link - Bottom */}
      <div className="mt-8 text-center">
        <span className="text-sm text-rich-black/60">Don&apos;t have an account? </span>
        <Link
          href={`/auth/signup${redirect !== '/' ? `?redirect=${redirect}` : ''}`}
          className="text-sm font-semibold text-tomato hover:text-tomato-600 transition-colors"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}

