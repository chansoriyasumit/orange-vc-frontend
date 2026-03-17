# Landing Page Feature

This feature contains all the sections for the homepage landing page, organized following clean architecture principles.

## Structure

```
landing/
├── components/
│   ├── HeroSection.tsx          # Hero section with radar and CTA
│   ├── AboutSection.tsx         # About Us section
│   ├── ServicesSection.tsx      # Featured services grid
│   ├── WhyChooseUsSection.tsx   # Benefits/value proposition
│   ├── HowItWorksSection.tsx    # 3-step process
│   ├── CTASection.tsx           # Call-to-action banner
│   └── index.ts                 # Barrel export for clean imports
└── README.md                     # This file
```

## Component Overview

### HeroSection
- Main hero section with animated content
- Includes the interactive radar visualization
- Service icons displayed in circular layout
- Stats display (Years Experience, Happy Clients, Confidentiality)

### AboutSection
- Company overview and mission
- 4-card grid showcasing key features:
  - Personalized Support
  - Global Expertise
  - Trust & Privacy
  - 12+ Years Experience

### ServicesSection
- Displays popular services from `services.json`
- Uses `ServiceCard` component from services feature
- "View All Services" CTA button

### WhyChooseUsSection
- 6-card grid highlighting benefits:
  - Reclaim Your Time
  - Stay Organized
  - Work Smarter
  - Better Engagement
  - Smart Investment
  - Trusted Partner

### HowItWorksSection
- 3-step process visualization
- Numbered cards with descriptions

### CTASection
- Final call-to-action banner
- Dual CTA buttons (Get Started & Explore Services)
- Gradient background with white text

## Usage

Import and use in your page:

```tsx
import {
  HeroSection,
  AboutSection,
  ServicesSection,
  WhyChooseUsSection,
  HowItWorksSection,
  CTASection,
} from "@/src/features/landing/components";

export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </div>
  );
}
```

## Design Principles

- **Separation of Concerns**: Each section is self-contained
- **Reusability**: Components can be reordered or reused
- **Maintainability**: Easy to update individual sections
- **Clean Architecture**: Feature-first organization
- **Type Safety**: Full TypeScript support

## Dependencies

- `motion/react` - Animations (HeroSection)
- `lucide-react` - Icons
- `@/components/ui/*` - Shadcn/ui components
- `@/src/shared/components/*` - Shared components (Radar, IconContainer, GridBackground)
- `@/src/features/services/*` - Services data and components

