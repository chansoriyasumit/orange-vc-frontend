'use client';

import { Card } from '@/components/ui/card';
import { Info, Loader2, AlertCircle } from 'lucide-react';
import { TaskStatus, TaskAgent } from '../types';
import { useStreamChat } from '../hooks/useStreamChat';
import { StreamChat } from 'stream-chat';
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageList,
  MessageInput,
  Window,
} from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';

interface StreamChatWindowProps {
  taskStatus: TaskStatus;
  agent: TaskAgent | null;
  userName: string;
  streamRoomId: string | null;
}

export function StreamChatWindow({
  taskStatus,
  agent,
  userName,
  streamRoomId,
}: StreamChatWindowProps) {
  const isPending = taskStatus === 'PENDING';
  const isCompleted = taskStatus === 'COMPLETED';
  const hasAgent = agent !== null;
  const hasStreamRoom = streamRoomId !== null;
  
  // Chat is available when agent is assigned and streamRoomId exists
  // Status can be PENDING, IN_PROGRESS, or COMPLETED
  const canChat = hasAgent && hasStreamRoom;

  const { client, channel, isConnecting, isConnected, error } = useStreamChat({
    channelId: streamRoomId,
    enabled: canChat,
  });

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-bold text-lg text-rich-black">
          Communication
        </h3>
        {canChat && isConnected && (
          <span className="flex items-center gap-1.5 text-xs text-green-600">
            <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
            Agent Online
          </span>
        )}
      </div>

      {/* Info Banner - No Agent Assigned */}
      {!hasAgent && (
        <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg mb-4">
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-900">
              Chat Not Yet Available
            </p>
            <p className="text-sm text-amber-700 mt-1">
              The chat will become active once an agent is assigned to your task.
            </p>
          </div>
        </div>
      )}

      {/* Info Banner - Agent Assigned but No Stream Room */}
      {hasAgent && !hasStreamRoom && (
        <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900">
              Chat Initializing
            </p>
            <p className="text-sm text-blue-700 mt-1">
              An agent has been assigned. The chat room is being set up and will be available shortly.
            </p>
          </div>
        </div>
      )}

      {/* Info Banner - Completed */}
      {isCompleted && !canChat && (
        <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg mb-4">
          <Info className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-green-900">
              Task Completed
            </p>
            <p className="text-sm text-green-700 mt-1">
              This task has been completed. For additional support, please use the support button.
            </p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && canChat && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-red-900">
              Chat Connection Error
            </p>
            <p className="text-sm text-red-700 mt-1">
              {error}
            </p>
            {error.includes('expired') && (
              <div className="mt-3 space-y-2">
                <button
                  onClick={() => window.location.reload()}
                  className="block text-sm text-red-700 underline hover:text-red-900"
                >
                  Refresh page to get a new token
                </button>
                {error.includes('backend') && (
                  <p className="text-xs text-red-600 mt-2">
                    Note: This appears to be a backend issue. The tokens being generated are missing expiration dates. 
                    Please contact the backend team to fix the Stream token generation.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Loading State */}
      {isConnecting && canChat && (
        <div className="h-[400px] flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-tomato mx-auto mb-3" />
            <p className="text-sm text-rich-black/60">
              Connecting to chat...
            </p>
          </div>
        </div>
      )}

      {/* Stream Chat UI */}
      {canChat && client && channel && isConnected && !error && (
        <div className="h-[500px] border border-gray-200 rounded-lg overflow-hidden">
          <Chat client={client}>
            <Channel channel={channel}>
              <Window>
                <ChannelHeader />
                <MessageList />
                <MessageInput />
              </Window>
            </Channel>
          </Chat>
        </div>
      )}

      {/* Empty state for no agent */}
      {!hasAgent && (
        <div className="h-[200px] flex items-center justify-center text-center">
          <div>
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
              <Info className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-sm text-rich-black/60">
              Waiting for agent assignment
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}

