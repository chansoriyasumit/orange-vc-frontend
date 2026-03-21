export type BlogFeaturedVideo = {
  id: string;
  title: string;
  /** Optional short line under the title */
  description?: string;
  videoUrl: string;
  posterUrl?: string;
};

/**
 * Featured videos on the blog page. Add or remove entries as needed.
 * Use direct .mp4 (or other browser-supported) URLs your CDN allows.
 */
export const blogFeaturedVideos: BlogFeaturedVideo[] = [
  {
    id: "delegate-ops",
    title: "Delegating day-to-day operations",
    description:
      "How leaders hand off inbox, calendar, and follow-ups so they can focus on strategy.",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    posterUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1280&q=80",
  },
  {
    id: "remote-teams",
    title: "Running lean remote teams",
    description:
      "Staying aligned across time zones with clear ownership and async habits.",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    posterUrl:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1280&q=80",
  },
  {
    id: "customer-support",
    title: "Scaling customer support",
    description:
      "Keeping response quality high as ticket volume grows with dedicated support capacity.",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    posterUrl:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1280&q=80",
  },
];
