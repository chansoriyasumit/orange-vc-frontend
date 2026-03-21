import { API_CONFIG, API_ENDPOINTS } from "@/src/lib/api/config";
import {
  defaultEmptyAboutPageCms,
  mergeAboutCmsWithFallbacks,
  type AboutPageCmsPayload,
} from "@/src/shared/types/about-page";

interface ApiEnvelope<T> {
  data?: T;
  message?: string;
}

/**
 * Server-only fetch for marketing about CMS. Revalidates every 60s.
 * On failure, returns merged empty payload (full static fallbacks).
 */
export async function getPublicAboutCms(): Promise<AboutPageCmsPayload> {
  const url = `${API_CONFIG.BASE_URL}${API_ENDPOINTS.CMS.ABOUT}`;
  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      return mergeAboutCmsWithFallbacks(defaultEmptyAboutPageCms());
    }
    const json = (await res.json()) as ApiEnvelope<AboutPageCmsPayload>;
    if (!json.data || typeof json.data !== "object") {
      return mergeAboutCmsWithFallbacks(defaultEmptyAboutPageCms());
    }
    return mergeAboutCmsWithFallbacks(json.data);
  } catch {
    return mergeAboutCmsWithFallbacks(defaultEmptyAboutPageCms());
  }
}
