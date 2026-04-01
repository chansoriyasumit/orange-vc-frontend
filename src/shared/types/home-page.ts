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

function pick(primary: string, fallback: string): string {
  return primary?.trim() ? primary : fallback;
}

/**
 * Ensures every CMS field exists. Empty or missing values stay empty — no
 * marketing copy is injected when the API returns blanks or errors.
 */
export function mergeHomeCmsWithFallbacks(
  data: HomePageCmsPayload,
): HomePageCmsPayload {
  const empty = defaultEmptyHomePageCms();
  return {
    hero: {
      badgeText: pick(data.hero?.badgeText ?? "", empty.hero.badgeText),
      headingPart1: pick(data.hero?.headingPart1 ?? "", empty.hero.headingPart1),
      headingPart2: pick(data.hero?.headingPart2 ?? "", empty.hero.headingPart2),
      description: pick(data.hero?.description ?? "", empty.hero.description),
      primaryButtonText: pick(
        data.hero?.primaryButtonText ?? "",
        empty.hero.primaryButtonText,
      ),
      primaryButtonLink: pick(
        data.hero?.primaryButtonLink ?? "",
        empty.hero.primaryButtonLink,
      ),
      secondaryButtonText: pick(
        data.hero?.secondaryButtonText ?? "",
        empty.hero.secondaryButtonText,
      ),
      secondaryButtonLink: pick(
        data.hero?.secondaryButtonLink ?? "",
        empty.hero.secondaryButtonLink,
      ),
    },
    aboutUs: {
      headingPart1: pick(
        data.aboutUs?.headingPart1 ?? "",
        empty.aboutUs.headingPart1,
      ),
      headingPart2: pick(
        data.aboutUs?.headingPart2 ?? "",
        empty.aboutUs.headingPart2,
      ),
      description: pick(
        data.aboutUs?.description ?? "",
        empty.aboutUs.description,
      ),
    },
    whyChooseUs: {
      mainHeading: pick(
        data.whyChooseUs?.mainHeading ?? "",
        empty.whyChooseUs.mainHeading,
      ),
      subheading: pick(
        data.whyChooseUs?.subheading ?? "",
        empty.whyChooseUs.subheading,
      ),
      description: pick(
        data.whyChooseUs?.description ?? "",
        empty.whyChooseUs.description,
      ),
    },
  };
}
