'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthState } from '../types/User';
import { ApiAuthRepository } from './ApiAuthRepository';
import { SignInData, SignUpData } from '../types/IAuthRepository';
import { tokenStorage, apiClient } from '@/src/lib/api';

interface AuthContextType extends AuthState {
  signIn: (data: SignInData) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  signOut: () => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
  refreshUser: () => Promise<void>;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Use the real API repository for authentication
const authRepository = new ApiAuthRepository();

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Get stored token and user
        const storedToken = tokenStorage.getToken();
        setToken(storedToken);
        
        const currentUser = await authRepository.getCurrentUser();
        setUser(currentUser);
        // Update token in case it was refreshed during getCurrentUser
        setToken(tokenStorage.getToken());
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Clear any corrupted auth state
        tokenStorage.clear();
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    const unsubscribe = authRepository.onAuthStateChange((user) => {
      setUser(user);
      setToken(tokenStorage.getToken());
      setIsLoading(false);
    });

    // Subscribe to token refresh events from apiClient
    const unsubscribeTokenRefresh = apiClient.onTokenRefresh(() => {
      // Update token state when apiClient refreshes tokens
      const newToken = tokenStorage.getToken();
      setToken(newToken);
    });

    // Subscribe to token cleared events (when refresh fails)
    const unsubscribeTokenCleared = apiClient.onTokenCleared(() => {
      // Clear auth state when tokens are cleared
      setToken(null);
      setUser(null);
    });

    return () => {
      unsubscribe();
      unsubscribeTokenRefresh();
      unsubscribeTokenCleared();
    };
  }, []);

  const signIn = async (data: SignInData) => {
    setIsLoading(true);
    try {
      const user = await authRepository.signIn(data);
      setUser(user);
      setToken(tokenStorage.getToken());
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (data: SignUpData) => {
    setIsLoading(true);
    try {
      const user = await authRepository.signUp(data);
      setUser(user);
      setToken(tokenStorage.getToken());
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await authRepository.signOut();
      setUser(null);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerificationEmail = async () => {
    await authRepository.resendVerificationEmail();
  };

  const refreshUser = async () => {
    if (token) {
      const updatedUser = await authRepository.refreshUser();
      if (updatedUser) {
        setUser(updatedUser);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user && !!token,
        token,
        signIn,
        signUp,
        signOut,
        resendVerificationEmail,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
