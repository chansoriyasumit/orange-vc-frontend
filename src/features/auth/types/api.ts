/**
 * Auth API Types
 * Request and Response types for authentication API endpoints
 */

// Request DTOs
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

// Response DTOs
export interface AuthTokenResponse {
  accessToken: string;
  refreshToken: string;
}

// API Response wrapper (matches the API structure)
export interface AuthApiResponse {
  data: AuthTokenResponse;
  message: string;
}

// User Role from API
export interface UserRole {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

// User API Response (from GET /users)
export interface UserApiData {
  id: string;
  firstName: string;
  lastName: string;
  roleName: string;
  type: string;
  email: string;
  mobileNumber: string | null;
  isEmailVerified: boolean;
  isDeactivated: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  role: UserRole;
}

export interface UserApiResponse {
  data: UserApiData;
  message: string;
}

