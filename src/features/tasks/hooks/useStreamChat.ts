/**
 * Stream Chat Hook
 * Manages Stream Chat connection and channel state
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { StreamChat, Channel } from 'stream-chat';
import { useAuth } from '@/src/features/auth/lib/AuthContext';
import {
  getStreamApiKey,
  initializeStreamClient,
  getStreamToken,
  connectUser,
  getChannel,
  disconnectUser,
} from '../lib/streamChatService';

interface UseStreamChatOptions {
  channelId: string | null;
  enabled?: boolean;
}

interface UseStreamChatReturn {
  client: StreamChat | null;
  channel: Channel | null;
  isConnecting: boolean;
  isConnected: boolean;
  error: string | null;
}

export function useStreamChat({
  channelId,
  enabled = true,
}: UseStreamChatOptions): UseStreamChatReturn {
  const { user } = useAuth();
  const [client, setClient] = useState<StreamChat | null>(null);
  const [channel, setChannel] = useState<Channel | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const retryCountRef = useRef(0);
  const isInitializingRef = useRef(false);
  const currentChannelIdRef = useRef<string | null>(null);

  const initializeChat = useCallback(async () => {
    if (!enabled || !user || !channelId) {
      return;
    }

    // Prevent multiple simultaneous initializations
    if (isInitializingRef.current) {
      console.log('Initialization already in progress, skipping...');
      return;
    }

    // Reset retry count if channelId changed
    if (currentChannelIdRef.current !== channelId) {
      retryCountRef.current = 0;
      currentChannelIdRef.current = channelId;
    }

    isInitializingRef.current = true;
    setIsConnecting(true);
    setError(null);

    try {
      // Check if API key is set
      let apiKey: string;
      try {
        apiKey = getStreamApiKey();
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Stream API key not configured';
        setError(errorMsg);
        console.error('Stream API key error:', err);
        return;
      }

      // Initialize client
      const streamClient = initializeStreamClient(apiKey);
      setClient(streamClient);

      // Get token from backend and use it immediately
      let token: string;
      try {
        console.log('[Stream Hook] Fetching token...');
        token = await getStreamToken();
        if (!token) {
          throw new Error('Token is empty');
        }
        console.log('[Stream Hook] Token received, connecting immediately...');
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to get Stream token';
        setError(errorMsg);
        console.error('[Stream Hook] Stream token error:', err);
        return;
      }

      // Connect user IMMEDIATELY after getting token (no delay)
      let connectionSuccessful = false;
      try {
        console.log('[Stream Hook] Attempting to connect with fresh token...');
        await connectUser(streamClient, user.id, token, {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          name: user.firstName && user.lastName 
            ? `${user.firstName} ${user.lastName}` 
            : user.email,
        });
        connectionSuccessful = true;
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to connect to Stream Chat';
        
        // Check if token is expired and retry once with a fresh token
        if (errorMsg.includes('expired') && retryCountRef.current === 0) {
          console.log('Token expired, retrying with fresh token...');
          retryCountRef.current = 1;
          
          // Disconnect and try again with a fresh token
          try {
            await disconnectUser(streamClient);
          } catch (disconnectErr) {
            console.error('Error disconnecting:', disconnectErr);
          }
          
          // Get a fresh token and retry
          try {
            const freshToken = await getStreamToken();
            await connectUser(streamClient, user.id, freshToken, {
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              name: user.firstName && user.lastName 
                ? `${user.firstName} ${user.lastName}` 
                : user.email,
            });
            connectionSuccessful = true;
            console.log('Successfully connected after token refresh');
          } catch (retryErr) {
            const retryErrorMsg = retryErr instanceof Error ? retryErr.message : 'Failed to connect after retry';
            setError(retryErrorMsg);
            console.error('Stream connection error after retry:', retryErr);
            return;
          }
        } else {
          setError(errorMsg);
          console.error('Stream connection error:', err);
          return;
        }
      }

      // Only proceed if connection was successful
      if (!connectionSuccessful) {
        return;
      }

      setIsConnected(true);

      // Get channel
      try {
        const streamChannel = await getChannel(streamClient, channelId);
        setChannel(streamChannel);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to load chat channel';
        setError(errorMsg);
        console.error('Stream channel error:', err);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to initialize Stream Chat';
      setError(errorMessage);
      console.error('Stream Chat initialization error:', err);
    } finally {
      setIsConnecting(false);
      isInitializingRef.current = false;
    }
  }, [user, channelId, enabled]);

  // Cleanup when channelId changes or component unmounts
  useEffect(() => {
    return () => {
      if (client) {
        console.log('Cleaning up Stream client');
        disconnectUser(client).catch(console.error);
      }
    };
  }, [client, channelId]);

  // Initialize chat when conditions are met
  useEffect(() => {
    // Only initialize if:
    // 1. Enabled and we have user and channelId
    // 2. We don't already have a client
    // 3. We're not currently connecting
    // 4. We're not already initialized for this channel
    if (enabled && user && channelId && !client && !isConnecting && !isInitializingRef.current) {
      // Reset state when channelId changes
      if (currentChannelIdRef.current !== channelId) {
        setClient(null);
        setChannel(null);
        setIsConnected(false);
        setError(null);
        retryCountRef.current = 0;
        currentChannelIdRef.current = channelId;
      }
      initializeChat();
    }
  }, [enabled, user, channelId, client, isConnecting, initializeChat]);

  return {
    client,
    channel,
    isConnecting,
    isConnected,
    error,
  };
}

