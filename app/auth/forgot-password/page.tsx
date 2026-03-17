import { Suspense } from "react";
import { AuthBrandSection, ForgotPasswordForm } from "@/src/features/auth/components";

export const dynamic = 'force-dynamic';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-white via-white-smoke/30 to-pale-dogwood/10 px-6 py-12">
        <Suspense fallback={<div>Loading...</div>}>
          <ForgotPasswordForm />
        </Suspense>
      </div>
      <AuthBrandSection />
    </div>
  );
}
