'use client';

import { useState } from 'react';
import { TaskMedia } from '../types';
import { Image, Video, FileText, Download, X, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/src/lib/utils/utils';

interface TaskMediaDisplayProps {
  media: TaskMedia[];
  variant?: 'card' | 'detail';
  maxVisible?: number;
}

export function TaskMediaDisplay({ 
  media, 
  variant = 'detail',
  maxVisible = variant === 'card' ? 1 : undefined 
}: TaskMediaDisplayProps) {
  const [selectedMedia, setSelectedMedia] = useState<TaskMedia | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  if (!media || media.length === 0) {
    return null;
  }

  const visibleMedia = maxVisible ? media.slice(0, maxVisible) : media;
  const remainingCount = maxVisible ? media.length - maxVisible : 0;

  // Infer MIME type from file extension if mimeType is null
  const getMimeType = (mediaItem: TaskMedia): string => {
    if (mediaItem.mimeType) {
      return mediaItem.mimeType;
    }
    
    // Infer from file extension
    const extension = mediaItem.name.split('.').pop()?.toLowerCase();
    const mimeTypeMap: Record<string, string> = {
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'gif': 'image/gif',
      'webp': 'image/webp',
      'pdf': 'application/pdf',
      'mp4': 'video/mp4',
      'mov': 'video/quicktime',
      'avi': 'video/x-msvideo',
      'webm': 'video/webm',
    };
    return mimeTypeMap[extension || ''] || 'application/octet-stream';
  };

  const getMediaType = (mediaItem: TaskMedia): 'image' | 'video' | 'pdf' | 'other' => {
    const mimeType = getMimeType(mediaItem);
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType === 'application/pdf' || mimeType.includes('pdf')) return 'pdf';
    return 'other';
  };

  const handleMediaClick = (mediaItem: TaskMedia) => {
    setSelectedMedia(mediaItem);
    setIsViewerOpen(true);
  };

  const renderMediaThumbnail = (mediaItem: TaskMedia, index: number) => {
    const mediaType = getMediaType(mediaItem);
    const isCompact = variant === 'card';

    return (
      <div
        key={mediaItem.id}
        className={cn(
          'relative group cursor-pointer overflow-hidden rounded-lg border border-gray-200 hover:border-tomato transition-all',
          isCompact 
            ? 'w-24 h-24' 
            : 'aspect-video',
          mediaType === 'image' && 'bg-gray-50'
        )}
        onClick={() => handleMediaClick(mediaItem)}
      >
        {mediaType === 'image' && (
          <>
            <img
              src={mediaItem.absoluteLink}
              alt={mediaItem.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <Image className="w-6 h-6 text-white" />
              </div>
            </div>
          </>
        )}

        {mediaType === 'video' && (
          <>
            <video
              src={mediaItem.absoluteLink}
              className="w-full h-full object-cover"
              muted
              playsInline
              preload="metadata"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center group-hover:bg-white transition-colors">
                <Play className="w-6 h-6 text-tomato ml-1" fill="currentColor" />
              </div>
            </div>
            <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded flex items-center gap-1">
              <Video className="w-3 h-3" />
              Video
            </div>
          </>
        )}

        {(mediaType === 'pdf' || mediaType === 'other') && (
          <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
            {mediaType === 'pdf' ? (
              <FileText className="w-12 h-12 text-red-600 mb-2" />
            ) : (
              <FileText className="w-12 h-12 text-gray-400 mb-2" />
            )}
            <p className="text-xs text-gray-600 text-center line-clamp-2 font-medium">
              {mediaItem.name}
            </p>
            <Download className="w-4 h-4 text-gray-400 mt-2 group-hover:text-tomato transition-colors" />
          </div>
        )}

        {/* Overlay on hover for non-video */}
        {mediaType !== 'video' && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
        )}
      </div>
    );
  };

  const renderMediaViewer = () => {
    if (!selectedMedia) return null;

    const mediaType = getMediaType(selectedMedia);

    return (
      <Dialog open={isViewerOpen} onOpenChange={setIsViewerOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-black/95">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
              onClick={() => setIsViewerOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>

            {mediaType === 'image' && (
              <img
                src={selectedMedia.absoluteLink}
                alt={selectedMedia.name}
                className="max-w-full max-h-[80vh] object-contain"
              />
            )}

            {mediaType === 'video' && (
              <video
                src={selectedMedia.absoluteLink}
                controls
                autoPlay
                className="max-w-full max-h-[80vh]"
              >
                Your browser does not support the video tag.
              </video>
            )}

            {(mediaType === 'pdf' || mediaType === 'other') && (
              <div className="w-full h-[80vh] flex flex-col items-center justify-center p-8">
                <FileText className="w-24 h-24 text-white/60 mb-4" />
                <p className="text-white text-lg mb-4 text-center">{selectedMedia.name}</p>
                <a
                  href={selectedMedia.absoluteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-tomato hover:bg-tomato-600 text-white rounded-lg transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Download File
                </a>
              </div>
            )}

            {/* Media name and download button */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/50 backdrop-blur-sm rounded-lg p-3">
              <p className="text-white text-sm truncate flex-1">{selectedMedia.name}</p>
              <a
                href={selectedMedia.absoluteLink}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="ml-4"
              >
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  <Download className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  if (variant === 'card') {
    // Compact view for task card - show first media item with count badge
    return (
      <>
        <div className="relative">
          {renderMediaThumbnail(visibleMedia[0], 0)}
          {media.length > 1 && (
            <div className="absolute top-2 right-2 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded">
              +{media.length - 1}
            </div>
          )}
        </div>
        {renderMediaViewer()}
      </>
    );
  }

  // Full view for task detail page
  return (
    <>
      <div className={cn(
        'grid gap-4',
        media.length === 1 
          ? 'grid-cols-1 max-w-xs' 
          : 'grid-cols-2 md:grid-cols-3'
      )}>
        {visibleMedia.map((mediaItem, index) => renderMediaThumbnail(mediaItem, index))}
      </div>

      {remainingCount > 0 && (
        <div className="text-center pt-2">
          <p className="text-sm text-gray-600">
            +{remainingCount} more {remainingCount === 1 ? 'file' : 'files'}
          </p>
        </div>
      )}

      {renderMediaViewer()}
    </>
  );
}

