/**
 * API Client
 * Centralized HTTP client with interceptors, error handling, and auth token management
 */

import { API_CONFIG, API_ENDPOINTS } from './config';
import { tokenStorage } from './tokenStorage';

// Generic API response wrapper
export interface ApiResponse<T> {
  data: T;
  message: string;
}

// API Error class for consistent error handling
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public response?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Request options type
interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  skipAuth?: boolean;
}

class ApiClient {
  private baseUrl: string;
  private refreshTokenPromise: Promise<void> | null = null;
  private tokenRefreshCallbacks: Array<() => void> = [];
  private tokenClearedCallbacks: Array<() => void> = [];

  constructor(baseUrl: string = API_CONFIG.BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Subscribe to token refresh events
   * Returns unsubscribe function
   */
  onTokenRefresh(callback: () => void): () => void {
    this.tokenRefreshCallbacks.push(callback);
    return () => {
      this.tokenRefreshCallbacks = this.tokenRefreshCallbacks.filter(
        (cb) => cb !== callback
      );
    };
  }

  /**
   * Subscribe to token cleared events (when auth fails)
   * Returns unsubscribe function
   */
  onTokenCleared(callback: () => void): () => void {
    this.tokenClearedCallbacks.push(callback);
    return () => {
      this.tokenClearedCallbacks = this.tokenClearedCallbacks.filter(
        (cb) => cb !== callback
      );
    };
  }

  /**
   * Notify all listeners that tokens were refreshed
   */
  private notifyTokenRefresh(): void {
    this.tokenRefreshCallbacks.forEach((callback) => callback());
  }

  /**
   * Notify all listeners that tokens were cleared
   */
  private notifyTokenCleared(): void {
    this.tokenClearedCallbacks.forEach((callback) => callback());
  }

  /**
   * Refresh the access token using the refresh token
   * Uses a promise cache to prevent multiple simultaneous refresh requests
   */
  private async refreshAccessToken(): Promise<void> {
    // If a refresh is already in progress, wait for it
    if (this.refreshTokenPromise) {
      return this.refreshTokenPromise;
    }

    const refreshToken = tokenStorage.getRefreshToken();
    if (!refreshToken) {
      throw new ApiError('No refresh token available', 401);
    }

    // Create and cache the refresh promise
    this.refreshTokenPromise = (async () => {
      try {
        const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.AUTH.REFRESH_TOKEN}`, {
          method: 'POST',
          headers: {
            ...API_CONFIG.HEADERS,
          },
          body: JSON.stringify({ refreshToken }),
        });

        if (!response.ok) {
          // Refresh failed, clear auth state
          tokenStorage.clear();
          this.notifyTokenCleared();
          throw new ApiError('Token refresh failed', response.status);
        }

        const data = await response.json() as {
          data: { accessToken: string; refreshToken: string };
          message: string;
        };

        // Store the new tokens
        tokenStorage.setTokens({
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken,
        });

        // Notify listeners that tokens were refreshed
        this.notifyTokenRefresh();
      } catch (error) {
        // Clear auth state on any error
        tokenStorage.clear();
        this.notifyTokenCleared();
        throw error instanceof ApiError
          ? error
          : new ApiError('Token refresh failed', 401);
      } finally {
        // Clear the promise cache
        this.refreshTokenPromise = null;
      }
    })();

    return this.refreshTokenPromise;
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { body, skipAuth = false, headers: customHeaders, ...restOptions } = options;

    // Build headers
    const headers: HeadersInit = {
      ...API_CONFIG.HEADERS,
      ...customHeaders,
    };

    // Add auth token if available and not skipped
    if (!skipAuth) {
      const token = tokenStorage.getToken();
      if (token) {
        (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
      }
    }

    const config: RequestInit = {
      ...restOptions,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    };

    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, config);

      // Handle non-JSON responses
      const contentType = response.headers.get('content-type');
      let data: unknown;

      if (contentType?.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      // Handle error responses
      if (!response.ok) {
        // Handle 401 Unauthorized - try to refresh token and retry
        if (response.status === 401 && !skipAuth) {
          try {
            // Attempt to refresh the token
            await this.refreshAccessToken();

            // Create fresh headers for retry with new token
            const newToken = tokenStorage.getToken();
            const retryHeaders: HeadersInit = {
              ...API_CONFIG.HEADERS,
              ...customHeaders,
            };

            if (newToken) {
              (retryHeaders as Record<string, string>)['Authorization'] = `Bearer ${newToken}`;
            }

            // Retry the request
            const retryConfig: RequestInit = {
              ...restOptions,
              headers: retryHeaders,
              body: body ? JSON.stringify(body) : undefined,
            };

            const retryResponse = await fetch(url, retryConfig);

            // Handle non-JSON responses
            const retryContentType = retryResponse.headers.get('content-type');
            let retryData: unknown;

            if (retryContentType?.includes('application/json')) {
              retryData = await retryResponse.json();
            } else {
              retryData = await retryResponse.text();
            }

            // If retry also fails, throw error
            if (!retryResponse.ok) {
              let errorMessage = `Request failed with status ${retryResponse.status}`;
              
              if (typeof retryData === 'object' && retryData !== null) {
                const errorData = retryData as Record<string, unknown>;
                
                if (
                  typeof errorData.data === 'object' && 
                  errorData.data !== null && 
                  'message' in errorData.data
                ) {
                  errorMessage = (errorData.data as { message: string }).message;
                }
                else if ('message' in errorData && typeof errorData.message === 'string') {
                  errorMessage = errorData.message;
                }
              }

              throw new ApiError(errorMessage, retryResponse.status, retryData);
            }

            // Return successful retry response
            return retryData as T;
          } catch (refreshError) {
            // If refresh fails, throw the original 401 error
            let errorMessage = `Request failed with status ${response.status}`;
            
            if (typeof data === 'object' && data !== null) {
              const errorData = data as Record<string, unknown>;
              
              if (
                typeof errorData.data === 'object' && 
                errorData.data !== null && 
                'message' in errorData.data
              ) {
                errorMessage = (errorData.data as { message: string }).message;
              }
              else if ('message' in errorData && typeof errorData.message === 'string') {
                errorMessage = errorData.message;
              }
            }

            throw new ApiError(errorMessage, response.status, data);
          }
        }

        // Extract error message - API returns errors in data.message or top-level message
        let errorMessage = `Request failed with status ${response.status}`;
        
        if (typeof data === 'object' && data !== null) {
          const errorData = data as Record<string, unknown>;
          
          // Check for nested error message in data.message (API error format)
          if (
            typeof errorData.data === 'object' && 
            errorData.data !== null && 
            'message' in errorData.data
          ) {
            errorMessage = (errorData.data as { message: string }).message;
          }
          // Fallback to top-level message
          else if ('message' in errorData && typeof errorData.message === 'string') {
            errorMessage = errorData.message;
          }
        }

        throw new ApiError(errorMessage, response.status, data);
      }

      return data as T;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      // Handle network errors
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new ApiError('Network error. Please check your connection.', 0);
      }

      throw new ApiError(
        error instanceof Error ? error.message : 'An unexpected error occurred',
        0
      );
    }
  }

  // HTTP Methods
  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  async post<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'POST', body });
  }

  async put<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'PUT', body });
  }

  async patch<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'PATCH', body });
  }

  async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export class for testing or custom instances
export { ApiClient };

