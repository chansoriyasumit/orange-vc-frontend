/**
 * API Authentication Repository
 * Real implementation of IAuthRepository using the backend API
 */

import { IAuthRepository, SignUpData, SignInData } from '../types/IAuthRepository';
import { User } from '../types/User';
import { apiClient, ApiError, tokenStorage, API_ENDPOINTS } from '@/src/lib/api';
import { AuthApiResponse, LoginRequest, RegisterRequest, UserApiResponse, ForgotPasswordRequest, ResetPasswordRequest } from '../types/api';

export class ApiAuthRepository implements IAuthRepository {
  private authChangeCallbacks: ((user: User | null) => void)[] = [];

  /**
   * Fetch user details from /users endpoint
   */
  private async fetchUserDetails(): Promise<User> {
    const response = await apiClient.get<UserApiResponse>(API_ENDPOINTS.USERS.ME);
    
    const userData = response.data;
    const user: User = {
      id: userData.id,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      mobileNumber: userData.mobileNumber,
      roleName: userData.roleName,
      type: userData.type,
      isEmailVerified: userData.isEmailVerified,
      isDeactivated: userData.isDeactivated,
      createdAt: new Date(userData.createdAt),
      updatedAt: userData.updatedAt ? new Date(userData.updatedAt) : undefined,
    };

    // Cache user data locally
    tokenStorage.setUser({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      mobileNumber: user.mobileNumber,
      roleName: user.roleName,
      type: user.type,
      isEmailVerified: user.isEmailVerified,
      isDeactivated: user.isDeactivated,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt?.toISOString(),
    });

    return user;
  }

  /**
   * Sign up a new user
   */
  async signUp(data: SignUpData): Promise<User> {
    const request: RegisterRequest = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };

    try {
      const response = await apiClient.post<AuthApiResponse>(
        API_ENDPOINTS.AUTH.REGISTER,
        request,
        { skipAuth: true }
      );

      // Store both tokens
      tokenStorage.setTokens({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      });

      // Fetch user details from API
      const user = await this.fetchUserDetails();

      // Notify listeners
      this.notifyAuthChange(user);

      return user;
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(error.message);
      }
      throw new Error('Registration failed. Please try again.');
    }
  }

  /**
   * Sign in an existing user
   */
  async signIn(data: SignInData): Promise<User> {
    const request: LoginRequest = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await apiClient.post<AuthApiResponse>(
        API_ENDPOINTS.AUTH.LOGIN,
        request,
        { skipAuth: true }
      );

      // Store both tokens
      tokenStorage.setTokens({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      });

      // Fetch user details from API
      const user = await this.fetchUserDetails();

      // Notify listeners
      this.notifyAuthChange(user);

      return user;
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(error.message);
      }
      throw new Error('Log in failed. Please check your credentials.');
    }
  }

  /**
   * Refresh the access token using the refresh token
   */
  async refreshToken(): Promise<void> {
    const refreshToken = tokenStorage.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await apiClient.post<AuthApiResponse>(
        API_ENDPOINTS.AUTH.REFRESH_TOKEN,
        { refreshToken },
        { skipAuth: true }
      );

      // Store the new tokens
      tokenStorage.setTokens({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      });
    } catch (error) {
      // If refresh fails, clear auth state
      tokenStorage.clear();
      this.notifyAuthChange(null);
      throw error;
    }
  }

  /**
   * Sign out the current user
   */
  async signOut(): Promise<void> {
    // Clear stored auth data
    tokenStorage.clear();

    // Notify listeners
    this.notifyAuthChange(null);
  }

  /**
   * Get the current authenticated user
   * First checks local storage, then fetches from API if token exists
   */
  async getCurrentUser(): Promise<User | null> {
    // Check if we have a token
    const token = tokenStorage.getToken();
    if (!token) return null;

    // First try to get cached user data
    const storedUser = tokenStorage.getUser();
    if (storedUser) {
      return {
        id: storedUser.id,
        email: storedUser.email,
        firstName: storedUser.firstName,
        lastName: storedUser.lastName,
        mobileNumber: storedUser.mobileNumber,
        roleName: storedUser.roleName,
        type: storedUser.type,
        isEmailVerified: storedUser.isEmailVerified,
        isDeactivated: storedUser.isDeactivated,
        createdAt: new Date(storedUser.createdAt),
        updatedAt: storedUser.updatedAt ? new Date(storedUser.updatedAt) : undefined,
      };
    }

    // If no cached user, fetch from API
    // Note: apiClient will automatically refresh the token if it's expired
    try {
      const user = await this.fetchUserDetails();
      return user;
    } catch (error) {
      // If error persists after token refresh attempt, check if we still have a token
      const token = tokenStorage.getToken();
      if (!token) {
        // Token refresh failed or no token available, clear auth state
        tokenStorage.clear();
        this.notifyAuthChange(null);
        return null;
      }
      // Token might have been refreshed, try one more time
      try {
        return await this.fetchUserDetails();
      } catch (retryError) {
        // Still failing, clear auth state
        tokenStorage.clear();
        this.notifyAuthChange(null);
        return null;
      }
    }
  }

  /**
   * Refresh user data from API
   */
  async refreshUser(): Promise<User | null> {
    const token = tokenStorage.getToken();
    if (!token) return null;

    try {
      const user = await this.fetchUserDetails();
      this.notifyAuthChange(user);
      return user;
    } catch (error) {
      return null;
    }
  }

  /**
   * Resend verification email to the current user
   */
  async resendVerificationEmail(): Promise<void> {
    try {
      await apiClient.post(
        API_ENDPOINTS.AUTH.RESEND_VERIFICATION,
        {},
        { skipAuth: false }
      );
    } catch (error) {
      if (error instanceof ApiError) {
        // Handle 400: Email already verified or user not found
        if (error.statusCode === 400) {
          throw new Error('Email already verified or user not found');
        }
        throw new Error(error.message);
      }
      throw new Error('Failed to resend verification email. Please try again.');
    }
  }

  /**
   * Request password reset email
   */
  async forgotPassword(email: string): Promise<void> {
    const request: ForgotPasswordRequest = {
      email,
    };

    try {
      await apiClient.post(
        API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
        request,
        { skipAuth: true }
      );
    } catch (error) {
      // Always show success message regardless of error (security best practice)
      // The API will handle the actual email sending
      // We don't want to reveal if an email exists or not
    }
  }

  /**
   * Reset password using token from email
   */
  async resetPassword(token: string, password: string): Promise<void> {
    const request: ResetPasswordRequest = {
      token,
      password,
    };

    try {
      await apiClient.post(
        API_ENDPOINTS.AUTH.RESET_PASSWORD,
        request,
        { skipAuth: true }
      );
    } catch (error) {
      if (error instanceof ApiError) {
        // Handle specific error cases
        if (error.statusCode === 400) {
          throw new Error('Invalid or expired reset token. Please request a new password reset link.');
        }
        throw new Error(error.message);
      }
      throw new Error('Failed to reset password. Please try again.');
    }
  }

  /**
   * Subscribe to auth state changes
   */
  onAuthStateChange(callback: (user: User | null) => void): () => void {
    this.authChangeCallbacks.push(callback);

    // Return unsubscribe function
    return () => {
      this.authChangeCallbacks = this.authChangeCallbacks.filter(
        (cb) => cb !== callback
      );
    };
  }

  // Private helper methods
  private notifyAuthChange(user: User | null): void {
    this.authChangeCallbacks.forEach((callback) => callback(user));
  }
}
