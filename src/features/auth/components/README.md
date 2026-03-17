# Auth Components

This folder contains all authentication-related UI components following clean architecture principles.

## Components

### `AuthBrandSection`
Reusable brand section displayed on the left side of authentication pages.

**Features:**
- OrangeVC logo
- Asset Distribution card with stats and chart
- Brand tagline and description
- Responsive (hidden on mobile, shown on lg screens)

**Usage:**
```tsx
import { AuthBrandSection } from '@/src/features/auth/components';

<AuthBrandSection />
```

---

### `SignInForm`
Complete sign-in form with email/password authentication and social login options.

**Features:**
- Email and password input fields
- Password visibility toggle
- Form validation
- Loading states
- Error handling
- "Forgot password" link
- Social authentication buttons (SSO, Facebook, Google, Apple)
- Mobile-responsive with logo for small screens

**Usage:**
```tsx
import { SignInForm } from '@/src/features/auth/components';

<SignInForm />
```

**Dependencies:**
- Uses `useAuth` hook from `@/src/features/auth/lib/AuthContext`
- Redirects to specified path from query params or home page

---

### `SignUpForm`
Complete sign-up form with email/password authentication and social signup options.

**Features:**
- Email and password input fields
- Password confirmation field
- Password visibility toggles
- Form validation (password match, minimum length)
- Loading states
- Error handling
- Social authentication buttons (SSO, Facebook, Google, Apple)
- Mobile-responsive with logo for small screens

**Usage:**
```tsx
import { SignUpForm } from '@/src/features/auth/components';

<SignUpForm />
```

**Dependencies:**
- Uses `useAuth` hook from `@/src/features/auth/lib/AuthContext`
- Redirects to specified path from query params or home page

---

## Design System Integration

All components use:
- **AppButton** - Consistent button styling with brand colors
- **Input** - Enhanced input fields with increased padding and brand-focused states
- **Label** - Properly styled labels with brand colors (no green!)
- **Brand Colors** - tomato, pale-dogwood, rich-black, platinum

## Architecture

These components follow the feature-based architecture:
```
src/features/auth/
├── components/          # UI Components (this folder)
│   ├── AuthBrandSection.tsx
│   ├── SignInForm.tsx
│   ├── SignUpForm.tsx
│   ├── index.ts
│   └── README.md
├── lib/                 # Business logic & context
│   ├── AuthContext.tsx
│   └── MockAuthRepository.ts
└── types/              # Type definitions
    ├── IAuthRepository.ts
    └── User.ts
```

Page files remain thin and focused on layout:
```tsx
// app/auth/signin/page.tsx
import { AuthBrandSection, SignInForm } from '@/src/features/auth/components';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex">
      <AuthBrandSection />
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-white via-white-smoke/30 to-pale-dogwood/10 px-6 py-12">
        <SignInForm />
      </div>
    </div>
  );
}
```

## Benefits

✅ **DRY (Don't Repeat Yourself)** - Brand section reused across auth pages
✅ **Separation of Concerns** - Pages handle layout, components handle logic
✅ **Maintainability** - Changes to forms happen in one place
✅ **Testability** - Components can be tested independently
✅ **Feature Isolation** - All auth-related code lives in the auth feature folder

