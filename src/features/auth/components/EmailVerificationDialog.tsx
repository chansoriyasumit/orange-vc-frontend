'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/src/features/auth/lib/AuthContext';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { CheckCircle, XCircle, AlertCircle, Mail, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/src/shared/hooks/use-toast';

interface EmailVerificationDialogProps {
  status: 'success' | 'failed';
  reason?: string;
  onClose: () => void;
}

export function EmailVerificationDialog({
  status,
  reason,
  onClose,
}: EmailVerificationDialogProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, resendVerificationEmail, refreshUser } = useAuth();
  const { toast } = useToast();

  // Auto-dismiss after 5 seconds for success
  useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => {
        handleClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  // Refresh user data after successful verification
  useEffect(() => {
    if (status === 'success' && isAuthenticated && refreshUser) {
      refreshUser();
    }
  }, [status, isAuthenticated, refreshUser]);

  const handleClose = () => {
    onClose();
    // Clean up URL - use current pathname instead of hardcoded '/'
    router.replace(pathname || '/', { scroll: false });
  };

  const handleResend = async () => {
    try {
      await resendVerificationEmail();
      toast({
        title: 'Verification email sent',
        description: 'Please check your inbox and click the verification link.',
      });
      handleClose();
    } catch (err: any) {
      toast({
        title: 'Failed to resend email',
        description: err.message || 'Please try again later.',
        variant: 'destructive',
      });
    }
  };

  if (status === 'success') {
    return (
      <AlertDialog open={true} onOpenChange={handleClose}>
        <AlertDialogContent className="sm:max-w-md bg-white">
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <AlertDialogTitle className="text-xl">Email Verified!</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-base text-rich-black/70 pt-2">
              Your email has been successfully verified. You can now access all features of your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleClose} className="bg-tomato hover:bg-tomato-600">
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  // Failed cases
  if (reason === 'already_verified') {
    return (
      <AlertDialog open={true} onOpenChange={handleClose}>
        <AlertDialogContent className="sm:max-w-md bg-white">
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-blue-600" />
              </div>
              <AlertDialogTitle className="text-xl">Already Verified</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-base text-rich-black/70 pt-2">
              Your email address has already been verified. You can continue using your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleClose} className="bg-tomato hover:bg-tomato-600">
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  // invalid_or_expired case
  return (
    <AlertDialog open={true} onOpenChange={handleClose}>
      <AlertDialogContent className="sm:max-w-md bg-white">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <AlertDialogTitle className="text-xl">Verification Link Invalid</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-base text-rich-black/70 pt-2">
            This verification link is invalid or has expired. Please request a new verification email.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col sm:flex-row gap-2">
          {isAuthenticated ? (
            <AlertDialogAction
              onClick={handleResend}
              className="w-full sm:w-auto bg-tomato hover:bg-tomato-600"
            >
              <Mail className="w-4 h-4 mr-2" />
              Resend Verification Email
            </AlertDialogAction>
          ) : (
            <AlertDialogAction
              onClick={handleClose}
              className="w-full sm:w-auto bg-tomato hover:bg-tomato-600"
            >
              Close
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

