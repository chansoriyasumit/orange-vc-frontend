import { API_CONFIG, API_ENDPOINTS } from "@/src/lib/api/config";
import {
  defaultEmptyHomePageCms,
  mergeHomeCmsWithFallbacks,
  type HomePageCmsPayload,
} from "@/src/shared/types/home-page";

interface ApiEnvelope<T> {
  data?: T;
  message?: string;
}

/**
 * Server-only fetch for marketing home CMS.
 * Uses no-store to avoid stale content in production caches.
 * On failure or invalid payload, returns normalized empty CMS (no placeholder copy).
 */
export async function getPublicHomeCms(): Promise<HomePageCmsPayload> {
  const url = `${API_CONFIG.BASE_URL}${API_ENDPOINTS.CMS.HOME}`;
  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      return mergeHomeCmsWithFallbacks(defaultEmptyHomePageCms());
    }
    const json = (await res.json()) as ApiEnvelope<HomePageCmsPayload>;
    if (!json.data || typeof json.data !== "object") {
      return mergeHomeCmsWithFallbacks(defaultEmptyHomePageCms());
    }
    return mergeHomeCmsWithFallbacks(json.data);
  } catch {
    return mergeHomeCmsWithFallbacks(defaultEmptyHomePageCms());
  }
}
