/**
 * Home page CMS — aligned with orange-vc-admin `HomePageCmsPayload` and backend DTOs.
 */

export interface HeroSectionData {
  badgeText: string;
  headingPart1: string;
  headingPart2: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
}

export interface AboutUsSectionData {
  headingPart1: string;
  headingPart2: string;
  description: string;
}

export interface WhyChooseUsSectionData {
  mainHeading: string;
  subheading: string;
  description: string;
}

export interface HomePageCmsPayload {
  hero: HeroSectionData;
  aboutUs: AboutUsSectionData;
  whyChooseUs: WhyChooseUsSectionData;
}

export function defaultEmptyHomePageCms(): HomePageCmsPayload {
  return {
    hero: {
      badgeText: "",
      headingPart1: "",
      headingPart2: "",
      description: "",
      primaryButtonText: "",
      primaryButtonLink: "",
      secondaryButtonText: "",
      secondaryButtonLink: "",
    },
    aboutUs: {
      headingPart1: "",
      headingPart2: "",
      description: "",
    },
    whyChooseUs: {
      mainHeading: "",
      subheading: "",
      description: "",
    },
  };
}

/** Static fallbacks when CMS fields are empty or the public API fails. */
export const HOME_PAGE_CMS_FALLBACKS: HomePageCmsPayload = {
  hero: {
    badgeText: "Over 12 Years of Professional Experience",
    headingPart1: "Free Your Time -",
    headingPart2: "Orange Virtual Connect",
    description:
      "Running a business or managing a busy professional life doesn't have to be overwhelming. We take care of your daily to-dos — so you can focus on what truly matters.",
    primaryButtonText: "Explore Services",
    primaryButtonLink: "/services",
    secondaryButtonText: "Subscribe Now",
    secondaryButtonLink: "/pricing",
  },
  aboutUs: {
    headingPart1: "A Trusted Partner in",
    headingPart2: "Productivity",
    description:
      "At Orange Virtual Connect, we believe time is your most valuable asset — and we're here to help you make the most of it.",
  },
  whyChooseUs: {
    mainHeading: "Why Orange Virtual Connect?",
    subheading: "We don't just assist — we enable you to lead with ease",
    description:
      "With over 12 years of experience, Orange Virtual Connect delivers professional virtual assistant services that adapt to your unique business needs, helping you reclaim your time and focus on what matters most.",
  },
};

function pick(primary: string, fallback: string): string {
  return primary?.trim() ? primary : fallback;
}

export function mergeHomeCmsWithFallbacks(
  data: HomePageCmsPayload,
): HomePageCmsPayload {
  const f = HOME_PAGE_CMS_FALLBACKS;
  return {
    hero: {
      badgeText: pick(data.hero.badgeText, f.hero.badgeText),
      headingPart1: pick(data.hero.headingPart1, f.hero.headingPart1),
      headingPart2: pick(data.hero.headingPart2, f.hero.headingPart2),
      description: pick(data.hero.description, f.hero.description),
      primaryButtonText: pick(
        data.hero.primaryButtonText,
        f.hero.primaryButtonText,
      ),
      primaryButtonLink: pick(
        data.hero.primaryButtonLink,
        f.hero.primaryButtonLink,
      ),
      secondaryButtonText: pick(
        data.hero.secondaryButtonText,
        f.hero.secondaryButtonText,
      ),
      secondaryButtonLink: pick(
        data.hero.secondaryButtonLink,
        f.hero.secondaryButtonLink,
      ),
    },
    aboutUs: {
      headingPart1: pick(data.aboutUs.headingPart1, f.aboutUs.headingPart1),
      headingPart2: pick(data.aboutUs.headingPart2, f.aboutUs.headingPart2),
      description: pick(data.aboutUs.description, f.aboutUs.description),
    },
    whyChooseUs: {
      mainHeading: pick(
        data.whyChooseUs.mainHeading,
        f.whyChooseUs.mainHeading,
      ),
      subheading: pick(
        data.whyChooseUs.subheading,
        f.whyChooseUs.subheading,
      ),
      description: pick(
        data.whyChooseUs.description,
        f.whyChooseUs.description,
      ),
    },
  };
}
