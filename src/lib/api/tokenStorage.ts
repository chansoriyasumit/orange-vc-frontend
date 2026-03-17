/**
 * Token Storage Utility
 * Handles auth token persistence in localStorage with SSR safety
 */

const ACCESS_TOKEN_KEY = 'orangevc_access_token';
const REFRESH_TOKEN_KEY = 'orangevc_refresh_token';
const USER_KEY = 'orangevc_user';

interface StoredUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  mobileNumber?: string | null;
  roleName?: string;
  type?: string;
  isEmailVerified?: boolean;
  isDeactivated?: boolean;
  createdAt: string;
  updatedAt?: string;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

class TokenStorage {
  private isClient(): boolean {
    return typeof window !== 'undefined';
  }

  // Access Token methods
  getToken(): string | null {
    if (!this.isClient()) return null;
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  setToken(token: string): void {
    if (!this.isClient()) return;
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }

  removeToken(): void {
    if (!this.isClient()) return;
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }

  // Refresh Token methods
  getRefreshToken(): string | null {
    if (!this.isClient()) return null;
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  setRefreshToken(token: string): void {
    if (!this.isClient()) return;
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  }

  removeRefreshToken(): void {
    if (!this.isClient()) return;
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }

  // Set both tokens at once
  setTokens(tokens: AuthTokens): void {
    this.setToken(tokens.accessToken);
    this.setRefreshToken(tokens.refreshToken);
  }

  // Get both tokens
  getTokens(): AuthTokens | null {
    const accessToken = this.getToken();
    const refreshToken = this.getRefreshToken();
    if (!accessToken || !refreshToken) return null;
    return { accessToken, refreshToken };
  }

  // User methods
  getUser(): StoredUser | null {
    if (!this.isClient()) return null;
    const userJson = localStorage.getItem(USER_KEY);
    if (!userJson) return null;

    try {
      return JSON.parse(userJson);
    } catch {
      return null;
    }
  }

  setUser(user: StoredUser): void {
    if (!this.isClient()) return;
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  removeUser(): void {
    if (!this.isClient()) return;
    localStorage.removeItem(USER_KEY);
  }

  // Clear all auth data
  clear(): void {
    this.removeToken();
    this.removeRefreshToken();
    this.removeUser();
  }

  // Check if user is authenticated (has valid token)
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export const tokenStorage = new TokenStorage();
export type { StoredUser, AuthTokens };

