/**
 * Blog page CMS — aligned with public `GET /cms/blog` and admin payload shape.
 * Public API returns `{ data: ... }` like `/cms/home` and `/cms/about`.
 */

export interface BlogPageHeroCms {
  badgeLabel: string;
  headingPart1: string;
  headingPart2: string;
  subtitle: string;
}

/** Row in `blogs` / `videos` / `caseStudies` arrays (matches backend ContentSectionItem). */
export interface ContentSectionItem {
  title: string;
  subtitle: string;
  description: string;
  imageUrl?: string;
  imageId?: string;
  videoUrl?: string;
  videoId?: string;
  sortOrder?: number;
}

export interface BlogPageCmsPayload {
  hero: BlogPageHeroCms;
  videosHero: BlogPageHeroCms;
  caseStudiesHero: BlogPageHeroCms;
  blogs: ContentSectionItem[];
  videos: ContentSectionItem[];
  caseStudies: ContentSectionItem[];
}

const EMPTY_HERO: BlogPageHeroCms = {
  badgeLabel: "",
  headingPart1: "",
  headingPart2: "",
  subtitle: "",
};

function parseHero(partial: unknown): BlogPageHeroCms {
  if (!partial || typeof partial !== "object") {
    return { ...EMPTY_HERO };
  }
  const o = partial as Record<string, unknown>;
  return {
    badgeLabel: typeof o.badgeLabel === "string" ? o.badgeLabel : "",
    headingPart1: typeof o.headingPart1 === "string" ? o.headingPart1 : "",
    headingPart2: typeof o.headingPart2 === "string" ? o.headingPart2 : "",
    subtitle: typeof o.subtitle === "string" ? o.subtitle : "",
  };
}

function parseContentSectionItem(raw: unknown, index: number): ContentSectionItem {
  if (!raw || typeof raw !== "object") {
    return {
      title: "",
      subtitle: "",
      description: "",
      sortOrder: index + 1,
    };
  }
  const o = raw as Record<string, unknown>;
  const sortOrder =
    typeof o.sortOrder === "number" && Number.isFinite(o.sortOrder)
      ? o.sortOrder
      : index + 1;
  return {
    title: typeof o.title === "string" ? o.title : "",
    subtitle: typeof o.subtitle === "string" ? o.subtitle : "",
    description: typeof o.description === "string" ? o.description : "",
    imageUrl: typeof o.imageUrl === "string" ? o.imageUrl : undefined,
    imageId: typeof o.imageId === "string" ? o.imageId : undefined,
    videoUrl: typeof o.videoUrl === "string" ? o.videoUrl : undefined,
    videoId: typeof o.videoId === "string" ? o.videoId : undefined,
    sortOrder,
  };
}

function parseContentSectionList(raw: unknown): ContentSectionItem[] {
  if (!Array.isArray(raw)) return [];
  const withIdx = raw.map((item, index) => ({
    item: parseContentSectionItem(item, index),
    index,
  }));
  withIdx.sort((a, b) => {
    const sa = a.item.sortOrder ?? a.index + 1;
    const sb = b.item.sortOrder ?? b.index + 1;
    return sa - sb;
  });
  return withIdx.map((x) => x.item);
}

/**
 * Normalize API `data` object. Heroes use empty strings for missing fields.
 * Lists default to [] when missing or invalid.
 */
export function parseBlogPageCmsPayload(data: unknown): BlogPageCmsPayload {
  if (!data || typeof data !== "object") {
    return {
      hero: { ...EMPTY_HERO },
      videosHero: { ...EMPTY_HERO },
      caseStudiesHero: { ...EMPTY_HERO },
      blogs: [],
      videos: [],
      caseStudies: [],
    };
  }
  const o = data as Record<string, unknown>;
  return {
    hero: parseHero(o.hero),
    videosHero: parseHero(o.videosHero),
    caseStudiesHero: parseHero(o.caseStudiesHero),
    blogs: parseContentSectionList(o.blogs),
    videos: parseContentSectionList(o.videos),
    caseStudies: parseContentSectionList(o.caseStudies),
  };
}
