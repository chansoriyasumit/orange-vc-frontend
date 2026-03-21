/**
 * Blog page CMS — aligned with admin `BlogPageCmsPayload` and public `GET /cms/blog`.
 * Public API returns `{ data: ... }` like `/cms/home` and `/cms/about`.
 */

export interface BlogPageHeroCms {
  badgeLabel: string;
  headingPart1: string;
  headingPart2: string;
  subtitle: string;
}

export interface BlogPageCmsPayload {
  hero: BlogPageHeroCms;
  videosHero: BlogPageHeroCms;
  caseStudiesHero: BlogPageHeroCms;
}

function mergeHeroFields(
  partial: Partial<BlogPageHeroCms> | undefined,
  defaults: BlogPageHeroCms,
): BlogPageHeroCms {
  if (!partial || typeof partial !== "object") return defaults;
  return {
    badgeLabel:
      typeof partial.badgeLabel === "string" && partial.badgeLabel.trim()
        ? partial.badgeLabel
        : defaults.badgeLabel,
    headingPart1:
      typeof partial.headingPart1 === "string" && partial.headingPart1.trim()
        ? partial.headingPart1
        : defaults.headingPart1,
    headingPart2:
      typeof partial.headingPart2 === "string" && partial.headingPart2.trim()
        ? partial.headingPart2
        : defaults.headingPart2,
    subtitle:
      typeof partial.subtitle === "string" && partial.subtitle.trim()
        ? partial.subtitle
        : defaults.subtitle,
  };
}

export function defaultBlogPageCmsFallback(): BlogPageCmsPayload {
  return {
    hero: {
      badgeLabel: "Blog",
      headingPart1: "Insights &",
      headingPart2: "Tips",
      subtitle:
        "Practical advice on virtual assistants, remote work, and scaling your business with the right support.",
    },
    videosHero: {
      badgeLabel: "Videos",
      headingPart1: "See how teams work with",
      headingPart2: "virtual support",
      subtitle:
        "Short clips on delegation, remote collaboration, and scaling operations with the right support.",
    },
    caseStudiesHero: {
      badgeLabel: "Case studies",
      headingPart1: "Outcomes from teams like",
      headingPart2: "yours",
      subtitle:
        "Snapshot stories of how verified virtual support drives measurable results across ops, support, and growth.",
    },
  };
}

export function mergeBlogCmsWithFallbacks(
  partial: Partial<BlogPageCmsPayload> | null | undefined,
): BlogPageCmsPayload {
  const d = defaultBlogPageCmsFallback();
  if (!partial || typeof partial !== "object") return d;
  const h =
    partial.hero && typeof partial.hero === "object"
      ? partial.hero
      : undefined;
  const v =
    partial.videosHero && typeof partial.videosHero === "object"
      ? partial.videosHero
      : undefined;
  const c =
    partial.caseStudiesHero && typeof partial.caseStudiesHero === "object"
      ? partial.caseStudiesHero
      : undefined;
  return {
    hero: mergeHeroFields(h, d.hero),
    videosHero: mergeHeroFields(v, d.videosHero),
    caseStudiesHero: mergeHeroFields(c, d.caseStudiesHero),
  };
}
