import { API_CONFIG, API_ENDPOINTS } from "@/src/lib/api/config";
import {
  defaultBlogPageCmsFallback,
  mergeBlogCmsWithFallbacks,
  type BlogPageCmsPayload,
} from "@/src/shared/types/blog-page-cms";

interface ApiEnvelope<T> {
  data?: T;
  message?: string;
}

/**
 * Public blog page CMS (same envelope as `/cms/home` and `/cms/about`).
 * Revalidates every 60s. On failure or invalid body, returns merged static fallbacks.
 */
export async function getPublicBlogCms(): Promise<BlogPageCmsPayload> {
  const url = `${API_CONFIG.BASE_URL}${API_ENDPOINTS.CMS.BLOG}`;
  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      return mergeBlogCmsWithFallbacks(defaultBlogPageCmsFallback());
    }
    const json = (await res.json()) as ApiEnvelope<unknown>;
    if (!json.data || typeof json.data !== "object") {
      return mergeBlogCmsWithFallbacks(defaultBlogPageCmsFallback());
    }
    return mergeBlogCmsWithFallbacks(
      json.data as Partial<BlogPageCmsPayload>,
    );
  } catch {
    return mergeBlogCmsWithFallbacks(defaultBlogPageCmsFallback());
  }
}
