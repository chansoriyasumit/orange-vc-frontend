/**
 * Stream Chat Service
 * Handles Stream Chat client initialization and channel management
 */

import { StreamChat, Channel, User as StreamUser } from 'stream-chat';
import { apiClient } from '@/src/lib/api';
import { API_ENDPOINTS } from '@/src/lib/api/config';
import { StreamTokenResponse } from '../types/api';

/**
 * Get Stream Chat API key from environment
 */
export function getStreamApiKey(): string {
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
  if (!apiKey) {
    throw new Error('NEXT_PUBLIC_STREAM_API_KEY is not set in environment variables');
  }
  return apiKey;
}

/**
 * Initialize Stream Chat client
 * Creates a fresh client instance following Stream's best practices
 */
export function initializeStreamClient(apiKey: string): StreamChat {
  // Create a new client instance (not using getInstance to avoid stale state)
  const streamClient = new StreamChat(apiKey, {
    enableWSFallback: true,
  });
  
  return streamClient;
}

/**
 * Get Stream Chat token from backend
 */
export async function getStreamToken(): Promise<string> {
  try {
    const fetchStartTime = Date.now();
    console.log('[Stream] Fetching token at:', new Date().toISOString());
    
    const response = await apiClient.get<StreamTokenResponse>(
      API_ENDPOINTS.USERS.STREAM_TOKEN
    );
    
    const fetchEndTime = Date.now();
    console.log('[Stream] Token fetched in', fetchEndTime - fetchStartTime, 'ms');
    console.log('[Stream] Token API response:', {
      hasData: !!response?.data,
      hasToken: !!response?.data?.token,
      tokenPreview: response?.data?.token?.substring(0, 20) + '...',
      message: response?.message,
    });
    
    if (!response || !response.data) {
      throw new Error('Invalid response structure from server');
    }
    
    if (!response.data.token) {
      console.error('[Stream] Token missing in response:', response);
      throw new Error('Token not found in server response');
    }
    
    // Try to decode JWT to check expiration (basic check)
    try {
      const tokenParts = response.data.token.split('.');
      if (tokenParts.length === 3) {
        const payload = JSON.parse(atob(tokenParts[1]));
        const exp = payload.exp;
        const now = Math.floor(Date.now() / 1000);
        const expiresIn = exp - now;
        console.log('[Stream] Token expiration check:', {
          expiresAt: exp ? new Date(exp * 1000).toISOString() : 'NOT SET',
          expiresInSeconds: expiresIn,
          isExpired: expiresIn <= 0,
          currentTime: new Date().toISOString(),
          hasExpClaim: exp !== undefined && exp !== null,
        });
        
        // Check if token is missing expiration or is expired
        if (!exp || exp === 0) {
          console.error('[Stream] ERROR: Token is missing expiration (exp) claim!');
          throw new Error('Token from backend is missing expiration. Please contact backend team to fix token generation.');
        }
        if (expiresIn <= 0) {
          console.error('[Stream] ERROR: Token is already expired when received from backend!');
          throw new Error('Token from backend is expired. Please contact backend team to fix token generation.');
        }
      } else {
        console.warn('[Stream] Token does not appear to be a valid JWT format');
      }
    } catch (decodeError) {
      // If it's our custom error about missing expiration, rethrow it
      if (decodeError instanceof Error && decodeError.message.includes('Token from backend')) {
        throw decodeError;
      }
      console.warn('[Stream] Could not decode token for expiration check:', decodeError);
    }
    
    return response.data.token;
  } catch (error) {
    console.error('[Stream] Error fetching Stream token:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch Stream Chat token: ${error.message}`);
    }
    throw new Error('Failed to fetch Stream Chat token');
  }
}

/**
 * Connect user to Stream Chat
 * Follows Stream's pattern: disconnect any existing user first, then connect
 */
export async function connectUser(
  client: StreamChat,
  userId: string,
  userToken: string,
  userData?: {
    name?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
  }
): Promise<void> {
  try {
    if (!userId || !userToken) {
      throw new Error('User ID and token are required');
    }

    const streamUser: StreamUser = {
      id: userId,
      ...(userData?.name && { name: userData.name }),
      ...(userData?.firstName && { firstName: userData.firstName }),
      ...(userData?.lastName && { lastName: userData.lastName }),
      ...(userData?.email && { email: userData.email }),
    };

    const connectStartTime = Date.now();
    const tokenPreview = userToken.substring(0, 20) + '...';
    console.log('[Stream] Connecting user at:', new Date().toISOString(), {
      userId,
      hasToken: !!userToken,
      tokenPreview,
      userData: streamUser,
    });
    
    // Always disconnect any existing user first (following Stream's best practice)
    if (client.user) {
      console.log('[Stream] Disconnecting existing user before connecting new user');
      await client.disconnectUser();
    }
    
    // Connect the user with the token immediately after fetching
    console.log('[Stream] Calling connectUser with token:', tokenPreview);
    await client.connectUser(streamUser, userToken);
    
    const connectEndTime = Date.now();
    console.log('[Stream] Successfully connected user in', connectEndTime - connectStartTime, 'ms');
  } catch (error: any) {
    console.error('[Stream] Error connecting user to Stream:', {
      error,
      errorType: typeof error,
      errorConstructor: error?.constructor?.name,
      errorMessage: error?.message,
      errorCode: error?.code,
      errorStatusCode: error?.StatusCode,
      errorString: String(error),
      errorJSON: JSON.stringify(error, null, 2),
    });
    
    // Check for expired token errors in various formats
    const errorString = String(error?.message || error || '');
    const isExpiredError = 
      errorString.includes('expired') || 
      errorString.includes('exp') ||
      error?.code === 40 ||
      error?.StatusCode === 401 ||
      (error?.message && error.message.includes('JWTAuth error'));
    
    if (isExpiredError) {
      console.error('[Stream] Token expiration detected:', {
        errorMessage: error?.message,
        errorCode: error?.code,
        errorStatusCode: error?.StatusCode,
      });
      throw new Error('Stream Chat token has expired. Please refresh the page to get a new token.');
    }
    
    // Provide more specific error messages
    if (error && typeof error === 'object') {
      if (error.message && error.message.includes('token')) {
        throw new Error(`Invalid Stream Chat token: ${error.message}`);
      }
    }
    
    if (error instanceof Error) {
      if (error.message.includes('token')) {
        throw new Error(`Invalid Stream Chat token: ${error.message}`);
      }
      if (error.message.includes('user')) {
        throw new Error(`User connection failed: ${error.message}`);
      }
      if (error.message.includes('network') || error.message.includes('fetch')) {
        throw new Error(`Network error: ${error.message}`);
      }
      throw new Error(`Failed to connect to Stream Chat: ${error.message}`);
    }
    throw new Error('Failed to connect user to Stream Chat');
  }
}

/**
 * Get or watch a channel by ID
 * Creates channel and watches it following Stream's pattern
 */
export async function getChannel(
  client: StreamChat,
  channelId: string,
  channelType: string = 'messaging'
): Promise<Channel> {
  try {
    // Create channel with optional name
    const channel = client.channel(channelType, channelId, {
      name: `Task Chat - ${channelId}`,
    });
    
    // Watch the channel to receive messages
    await channel.watch();
    
    console.log('Successfully watching channel:', channelId);
    return channel;
  } catch (error) {
    console.error('Error getting channel:', error);
    throw new Error(`Failed to get channel: ${channelId}`);
  }
}

/**
 * Disconnect user from Stream Chat
 */
export async function disconnectUser(client: StreamChat): Promise<void> {
  try {
    await client.disconnectUser();
  } catch (error) {
    console.error('Error disconnecting user from Stream:', error);
  }
}


