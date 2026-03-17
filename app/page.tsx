'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/src/features/auth/lib/AuthContext';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  HeroSection,
  AboutSection,
  ServiceIconsDivider,
  ServicesSection,
  WhyChooseUsSection,
  ContactFormSection,
} from "@/src/features/landing/components";
import { EmailVerificationDialog } from "@/src/features/auth/components/EmailVerificationDialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { Mail, Loader2 } from 'lucide-react';
import { useToast } from '@/src/shared/hooks/use-toast';

function EmailVerificationHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, isAuthenticated, isLoading, resendVerificationEmail, refreshUser } = useAuth();
  const { toast } = useToast();
  const [showCallbackDialog, setShowCallbackDialog] = useState(false);
  const [showUnverifiedDialog, setShowUnverifiedDialog] = useState(false);
  const [isResendingEmail, setIsResendingEmail] = useState(false);
  const [status, setStatus] = useState<'success' | 'failed'>('success');
  const [reason, setReason] = useState<string | undefined>();

  // Handle email verification callback from email link
  useEffect(() => {
    const emailVerification = searchParams.get('emailVerification');
    
    if (emailVerification === 'success') {
      setStatus('success');
      setReason(undefined);
      setShowCallbackDialog(true);
    } else if (emailVerification === 'false') {
      setStatus('failed');
      setReason(searchParams.get('reason') || undefined);
      setShowCallbackDialog(true);
    }
  }, [searchParams]);

  // Refresh user data when page becomes visible (user might have verified in another tab)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isAuthenticated && !isLoading) {
        refreshUser();
      }
    };

    // Also check on focus (when user switches back to tab)
    const handleFocus = () => {
      if (isAuthenticated && !isLoading) {
        refreshUser();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [isAuthenticated, isLoading, refreshUser]);

  // Show unverified email dialog when user logs in and is not verified
  useEffect(() => {
    if (!isLoading && isAuthenticated && user && !user.isEmailVerified && !showUnverifiedDialog && !showCallbackDialog) {
      setShowUnverifiedDialog(true);
    }
    // Close dialog if user verifies their email
    if (user?.isEmailVerified && showUnverifiedDialog) {
      setShowUnverifiedDialog(false);
    }
  }, [isLoading, isAuthenticated, user, showUnverifiedDialog, showCallbackDialog]);

  const handleCallbackClose = () => {
    setShowCallbackDialog(false);
    // Clean up URL
    router.replace('/', { scroll: false });
  };

  const handleUnverifiedClose = () => {
    setShowUnverifiedDialog(false);
  };

  const handleResendEmail = async () => {
    setIsResendingEmail(true);
    try {
      await resendVerificationEmail();
      toast({
        title: 'Verification email sent',
        description: 'Please check your inbox and click the verification link.',
      });
    } catch (err: any) {
      toast({
        title: 'Failed to resend email',
        description: err.message || 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsResendingEmail(false);
    }
  };

  return (
    <>
      {/* Email verification callback dialog (from email link) */}
      {showCallbackDialog && (
        <EmailVerificationDialog
          status={status}
          reason={reason}
          onClose={handleCallbackClose}
        />
      )}

      {/* Unverified email dialog (shown after login) */}
      {showUnverifiedDialog && user && (
        <AlertDialog open={showUnverifiedDialog} onOpenChange={handleUnverifiedClose}>
          <AlertDialogContent className="sm:max-w-md bg-white">
            <AlertDialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-orange-600" />
                </div>
                <AlertDialogTitle className="text-xl">Verify Your Email</AlertDialogTitle>
              </div>
              <AlertDialogDescription className="text-base text-rich-black/70 pt-2">
                We've sent a verification email to <strong>{user.email}</strong>. Please check your inbox and click the verification link to activate your account.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col sm:flex-row gap-2">
              <AlertDialogAction
                onClick={handleResendEmail}
                disabled={isResendingEmail}
                className="w-full sm:w-auto bg-tomato hover:bg-tomato-600"
              >
                {isResendingEmail ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Resend Email
                  </>
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <ServiceIconsDivider />
      <div className="-mt-72">
        <ServicesSection />
      </div>
      <WhyChooseUsSection />
      <ContactFormSection />
      <Footer />
      <Suspense fallback={null}>
        <EmailVerificationHandler />
      </Suspense>
    </div>
  );
}
