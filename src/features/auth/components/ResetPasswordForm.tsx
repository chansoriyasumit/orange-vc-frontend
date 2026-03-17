'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authRepository } from '@/src/features/auth/lib';
import { AppButton } from '@/src/shared/components/ui/AppButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { AlertCircle, Eye, EyeOff, Check, X, ArrowLeft, CheckCircle } from 'lucide-react';
import { PASSWORD_REGEX, checkPasswordStrength } from '../lib/passwordValidation';
import type { PasswordStrength } from '../lib/passwordValidation';

function PasswordRequirement({ met, text }: { met: boolean; text: string }) {
  return (
    <div className={`flex items-center gap-2 text-xs ${met ? 'text-green-600' : 'text-rich-black/50'}`}>
      {met ? (
        <Check className="w-3.5 h-3.5" />
      ) : (
        <X className="w-3.5 h-3.5" />
      )}
      <span>{text}</span>
    </div>
  );
}

function PasswordStrengthBar({ strength }: { strength: PasswordStrength }) {
  const colors = {
    weak: 'bg-red-500',
    fair: 'bg-orange-500',
    good: 'bg-yellow-500',
    strong: 'bg-green-500',
  };

  const labels = {
    weak: 'Weak',
    fair: 'Fair',
    good: 'Good',
    strong: 'Strong',
  };

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={`h-1 flex-1 rounded-full transition-colors ${
              level <= strength.score ? colors[strength.label] : 'bg-platinum/50'
            }`}
          />
        ))}
      </div>
      {strength.score > 0 && (
        <p className={`text-xs ${colors[strength.label].replace('bg-', 'text-')}`}>
          {labels[strength.label]} password
        </p>
      )}
    </div>
  );
}

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);

  // Extract token from URL query params
  useEffect(() => {
    const tokenParam = searchParams.get('token');
    if (!tokenParam) {
      setError('Invalid reset link. Please request a new password reset link.');
    } else {
      setToken(tokenParam);
    }
  }, [searchParams]);

  // Calculate password strength in real-time
  const passwordStrength = useMemo(() => checkPasswordStrength(password), [password]);

  // Check if password meets minimum requirements for submission using regex
  const isPasswordValid = useMemo(() => PASSWORD_REGEX.test(password), [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!token) {
      setError('Invalid reset link. Please request a new password reset link.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!isPasswordValid) {
      setError('Please create a stronger password that meets all requirements');
      return;
    }

    setIsLoading(true);

    try {
      await authRepository.resetPassword(token, password);
      setIsSuccess(true);
      // Redirect to sign in after 3 seconds
      setTimeout(() => {
        router.push('/auth/signin');
      }, 3000);
    } catch (err: any) {
      if (err.message.includes('Invalid') || err.message.includes('expired')) {
        setError('Invalid or expired reset token. Please request a new password reset link.');
      } else if (err.message.includes('validation') || err.message.includes('Password')) {
        setError('Password does not meet requirements. Please check the requirements below.');
      } else {
        setError(err.message || 'Failed to reset password. Please try again.');
      }
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
            Password Reset Successful!
          </h1>
          <p className="text-rich-black/60 text-base text-center">
            Your password has been successfully reset. Redirecting to log in...
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
          Go to Log In
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
        <span className="text-sm font-medium">Back to log in</span>
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
          Reset Password
        </h1>
        <p className="text-rich-black/60 text-base">
          Enter your new password below
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
        {/* Password Field with Strength Indicator */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-base">New Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setShowPasswordRequirements(true)}
              onBlur={() => setShowPasswordRequirements(false)}
              required
              disabled={isLoading || !token}
              className="pr-12"
              autoComplete="new-password"
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
          
          {/* Password Strength Bar */}
          {password && <PasswordStrengthBar strength={passwordStrength} />}
          
          {/* Password Requirements */}
          {(showPasswordRequirements || password) && (
            <div className="mt-3 p-3 rounded-lg bg-white-smoke/50 space-y-1.5">
              <PasswordRequirement met={passwordStrength.hasMinLength} text="At least 8 characters" />
              <PasswordRequirement met={passwordStrength.hasUppercase} text="One uppercase letter" />
              <PasswordRequirement met={passwordStrength.hasLowercase} text="One lowercase letter" />
              <PasswordRequirement met={passwordStrength.hasNumber} text="One number" />
              <PasswordRequirement met={passwordStrength.hasSpecialChar} text="One special character (!@#$%&*()_+\-=\\₹)" />
            </div>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-base">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={isLoading || !token}
              className="pr-12"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-rich-black/40 hover:text-rich-black/70 transition-colors"
              tabIndex={-1}
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {/* Password match indicator */}
          {confirmPassword && (
            <p className={`text-xs mt-1 ${password === confirmPassword ? 'text-green-600' : 'text-red-500'}`}>
              {password === confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <AppButton
          type="submit"
          size="lg"
          variant="primary"
          fullWidth
          isLoading={isLoading}
          disabled={isLoading || !isPasswordValid || password !== confirmPassword || !token}
        >
          {isLoading ? 'Resetting Password...' : 'Reset Password'}
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
