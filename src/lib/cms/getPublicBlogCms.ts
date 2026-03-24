import { API_CONFIG, API_ENDPOINTS } from "@/src/lib/api/config";
import {
  parseBlogPageCmsPayload,
  type BlogPageCmsPayload,
} from "@/src/shared/types/blog-page-cms";

interface ApiEnvelope<T> {
  data?: T;
  message?: string;
}

/**
 * Public blog page CMS (same envelope as `/cms/home` and `/cms/about`).
 * Revalidates every 60s. Throws if the API is unavailable or returns an invalid body.
 */
export async function getPublicBlogCms(): Promise<BlogPageCmsPayload> {
  const url = `${API_CONFIG.BASE_URL}${API_ENDPOINTS.CMS.BLOG}`;
  const res = await fetch(url, {
    next: { revalidate: 60 },
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(
      `Blog CMS request failed (${res.status}). Check NEXT_PUBLIC_API_BASE_URL and that GET /cms/blog is public.`,
    );
  }
  const json = (await res.json()) as ApiEnvelope<unknown>;
  if (!json.data || typeof json.data !== "object") {
    throw new Error("Blog CMS response missing data object.");
  }
  return parseBlogPageCmsPayload(json.data);
}
