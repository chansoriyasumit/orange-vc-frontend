export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  mobileNumber?: string | null;
  roleName?: string;
  type?: string;
  isEmailVerified?: boolean;
  isDeactivated?: boolean;
  hasActiveSubscription?: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}
