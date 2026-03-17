'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { Send, Paperclip, Smile, Info } from 'lucide-react';
import { TaskStatus, TaskAgent } from '../types';
import { format } from 'date-fns';
import { cn } from '@/src/lib/utils/utils';

interface MockChatWindowProps {
  taskStatus: TaskStatus;
  agent: TaskAgent | null;
  userName: string;
}

// Mock chat messages
const mockMessages = [
  {
    id: '1',
    sender: 'agent',
    senderName: 'Agent',
    content: 'Hello! I\'ve been assigned to your task. I\'ll start working on it right away.',
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
  },
  {
    id: '2',
    sender: 'user',
    senderName: 'You',
    content: 'Great! Do you need any additional information from me?',
    timestamp: new Date(Date.now() - 3000000), // 50 minutes ago
  },
  {
    id: '3',
    sender: 'agent',
    senderName: 'Agent',
    content: 'No, I have everything I need. I\'ll update you on the progress soon.',
    timestamp: new Date(Date.now() - 2400000), // 40 minutes ago
  },
  {
    id: '4',
    sender: 'agent',
    senderName: 'Agent',
    content: 'I\'ve made significant progress. I should have this completed by the end of the day.',
    timestamp: new Date(Date.now() - 600000), // 10 minutes ago
  },
];

export function MockChatWindow({ taskStatus, agent, userName }: MockChatWindowProps) {
  const isChatActive = taskStatus === 'IN_PROGRESS' && agent;
  const isPending = taskStatus === 'PENDING';
  const isCompleted = taskStatus === 'COMPLETED';

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-bold text-lg text-rich-black">
          Communication
        </h3>
        {isChatActive && (
          <span className="flex items-center gap-1.5 text-xs text-green-600">
            <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
            Agent Online
          </span>
        )}
      </div>

      {/* Info Banner */}
      {isPending && (
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

      {isCompleted && (
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

      {/* Chat Messages - Only show if agent assigned */}
      {isChatActive && (
        <>
          <div className="h-[400px] overflow-y-auto mb-4 space-y-4 p-4 bg-gray-50 rounded-lg">
            {mockMessages.map((message) => {
              const isUser = message.sender === 'user';
              
              return (
                <div
                  key={message.id}
                  className={cn(
                    'flex gap-3',
                    isUser && 'flex-row-reverse'
                  )}
                >
                  {/* Avatar */}
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <div className={cn(
                      'w-full h-full rounded-full flex items-center justify-center text-sm font-semibold',
                      isUser ? 'bg-tomato text-white' : 'bg-blue-500 text-white'
                    )}>
                      {isUser ? userName[0]?.toUpperCase() : agent?.firstName[0]?.toUpperCase()}
                    </div>
                  </Avatar>

                  {/* Message */}
                  <div className={cn(
                    'flex-1 max-w-[70%]',
                    isUser && 'flex flex-col items-end'
                  )}>
                    <div className={cn(
                      'rounded-lg p-3',
                      isUser 
                        ? 'bg-tomato text-white' 
                        : 'bg-white border border-gray-200'
                    )}>
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <p className="text-xs text-rich-black/50 mt-1">
                      {format(message.timestamp, 'h:mm a')}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chat Input */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                placeholder="Type your message... (This is a demo)"
                disabled
                className="pr-20"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  disabled
                >
                  <Paperclip className="w-4 h-4 text-gray-400" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  disabled
                >
                  <Smile className="w-4 h-4 text-gray-400" />
                </Button>
              </div>
            </div>
            <Button
              className="bg-tomato hover:bg-tomato-600"
              disabled
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>

          {/* Demo Notice */}
          <p className="text-xs text-center text-rich-black/50 mt-3 italic">
            This is a mock chat interface. Real-time chat will be integrated in the future.
          </p>
        </>
      )}

      {/* Empty state for pending */}
      {isPending && (
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

