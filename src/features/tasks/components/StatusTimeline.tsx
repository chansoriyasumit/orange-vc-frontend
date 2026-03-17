'use client';

import { Card } from '@/components/ui/card';
import { CheckCircle, Clock, Play, XCircle } from 'lucide-react';
import { TaskStage, TaskStatus } from '../types';
import { format } from 'date-fns';
import { cn } from '@/src/lib/utils/utils';

interface StatusTimelineProps {
  stages: TaskStage[];
  currentStatus: TaskStatus;
}

const statusIcons: Record<TaskStatus, React.ReactNode> = {
  PENDING: <Clock className="w-5 h-5" />,
  IN_PROGRESS: <Play className="w-5 h-5" />,
  COMPLETED: <CheckCircle className="w-5 h-5" />,
  CANCELLED: <XCircle className="w-5 h-5" />,
};

const statusColors: Record<TaskStatus, string> = {
  PENDING: 'bg-amber-100 text-amber-700 border-amber-300',
  IN_PROGRESS: 'bg-blue-100 text-blue-700 border-blue-300',
  COMPLETED: 'bg-green-100 text-green-700 border-green-300',
  CANCELLED: 'bg-gray-100 text-gray-700 border-gray-300',
};

const statusLabels: Record<TaskStatus, string> = {
  PENDING: 'Pending Approval',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
};

export function StatusTimeline({ stages, currentStatus }: StatusTimelineProps) {
  return (
    <Card className="p-6">
      <h3 className="font-heading font-bold text-lg text-rich-black mb-6">
        Task Timeline
      </h3>

      <div className="space-y-4">
        {stages.map((stage, index) => {
          const isLast = index === stages.length - 1;
          const isCurrent = stage.status === currentStatus;
          const color = statusColors[stage.status];

          return (
            <div key={index} className="relative">
              {/* Timeline Line */}
              {!isLast && (
                <div className="absolute left-[19px] top-10 w-0.5 h-full bg-gray-200" />
              )}

              {/* Timeline Item */}
              <div className="flex gap-4">
                {/* Icon */}
                <div
                  className={cn(
                    'w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 z-10',
                    color,
                    isCurrent && 'ring-4 ring-offset-2',
                    isCurrent && stage.status === 'PENDING' && 'ring-amber-100',
                    isCurrent && stage.status === 'IN_PROGRESS' && 'ring-blue-100',
                    isCurrent && stage.status === 'COMPLETED' && 'ring-green-100',
                    isCurrent && stage.status === 'CANCELLED' && 'ring-gray-100'
                  )}
                >
                  {statusIcons[stage.status]}
                </div>

                {/* Content */}
                <div className="flex-1 pt-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-rich-black">
                      {statusLabels[stage.status]}
                    </h4>
                    {isCurrent && (
                      <span className="text-xs px-2 py-0.5 bg-tomato text-white rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-rich-black/70 mb-1 break-all">
                    {stage.reason}
                  </p>
                  <p className="text-xs text-rich-black/50">
                    {format(new Date(stage.createdAt), 'MMM dd, yyyy • h:mm a')}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

