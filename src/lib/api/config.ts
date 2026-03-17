/**
 * API Configuration
 * Centralized configuration for API endpoints and settings
 */

export const API_CONFIG = {
  BASE_URL:
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://api.orangevirtualconnect.com/api/v1",
  TIMEOUT: 30000, // 30 seconds
  HEADERS: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/users/auth/login",
    REGISTER: "/users/auth/register",
    REFRESH_TOKEN: "/users/auth/refresh-token",
    RESEND_VERIFICATION: "/users/auth/resend-verification",
    FORGOT_PASSWORD: "/users/auth/forgot-password",
    RESET_PASSWORD: "/users/auth/reset-password",
    LOGOUT: "/auth/logout",
  },
  USERS: {
    ME: "/users", // GET - Fetch current user details with access token
    STREAM_TOKEN: "/users/stream-token", // GET - Get Stream Chat token for current user
    REVIEWS: "/users/reviews", // POST - Create a review for a completed task
  },
  SERVICES: {
    SEARCH: "/users/services/search", // GET - Search services with pagination & filters
    BY_ID: (id: string) => `/users/services/${id}`, // GET - Get service by ID
    BY_SLUG: (slug: string) => `/users/services/slug/${slug}`, // GET - Get service by slug
  },
  CATEGORIES: {
    SEARCH: "/users/categories/search", // GET - Search categories with pagination
  },
  SUBSCRIPTION_PLANS: {
    SEARCH: "/users/subscription-plans/search", // GET - Search subscription plans with pagination
  },
  TASKS: {
    SEARCH: "/users/tasks/search", // GET - Search tasks with pagination & filters
    BY_ID: (id: string) => `/users/tasks/${id}`, // GET - Get task by ID
    CREATE: "/users/tasks", // POST - Create new task
    UPDATE: (id: string) => `/users/tasks/${id}`, // PATCH - Update task
    DELETE: (id: string) => `/users/tasks/${id}`, // DELETE - Delete task
    STATS: "/users/tasks/stats", // GET - Get task statistics
  },
  FILES: {
    UPLOAD: (type: string) => `/files/upload/${type}`, // POST - Upload file
    DELETE: (id: string) => `/files/delete/${id}`, // DELETE - Delete file/media
  },
  SUBSCRIPTIONS: {
    SEARCH: "/users/subscriptions/search", // GET - Get all subscriptions
    ACTIVE: "/users/subscriptions/active", // GET - Get active subscription
    BY_ID: (id: string) => `/users/subscriptions/${id}`, // GET - Get subscription by ID
    CREATE: "/users/subscriptions", // POST - Subscribe to a plan
  },
  CONTACTS: {
    CREATE: "/contacts", // POST - Submit contact form
  },
} as const;
