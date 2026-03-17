"use client";

import { useState, useRef, useEffect } from "react";
import { Play } from "lucide-react";

interface VideoPlayerProps {
  videoUrl: string;
  posterUrl?: string;
  className?: string;
}

export function VideoPlayer({ videoUrl, posterUrl, className = "" }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasLoadedMetadata, setHasLoadedMetadata] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Ensure first frame is shown when metadata loads
  useEffect(() => {
    if (videoRef.current && hasLoadedMetadata && !isPlaying) {
      // Seek to first frame to ensure thumbnail is visible
      videoRef.current.currentTime = 0.1;
      videoRef.current.pause();
    }
  }, [hasLoadedMetadata, isPlaying]);

  // Timeout fallback to prevent infinite loading
  useEffect(() => {
    if (!hasLoadedMetadata && !hasError) {
      const timeout = setTimeout(() => {
        setHasLoadedMetadata(true);
      }, 2000); // Show video after 2 seconds even if metadata hasn't loaded
      
      return () => clearTimeout(timeout);
    }
  }, [hasLoadedMetadata, hasError]);

  const handlePlay = async () => {
    if (videoRef.current) {
      try {
        setIsLoading(true);
        await videoRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Error playing video:', error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  if (!videoUrl) {
    return (
      <div className={`aspect-video bg-rich-black/5 rounded-3xl flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-tomato/10 flex items-center justify-center mx-auto mb-4">
            <Play className="w-8 h-8 text-tomato" />
          </div>
          <p className="text-rich-black/60 text-sm">No video URL provided</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative aspect-video rounded-3xl overflow-hidden bg-rich-black ${className}`}>
      <video
        ref={videoRef}
        src={videoUrl}
        poster={posterUrl}
        className="w-full h-full object-cover"
        controls={isPlaying}
        preload="auto"
        playsInline
        muted
        onLoadedMetadata={() => {
          setHasLoadedMetadata(true);
          // Seek to first frame immediately
          if (videoRef.current) {
            videoRef.current.currentTime = 0.1;
          }
        }}
        onLoadedData={() => {
          setHasLoadedMetadata(true);
          // Ensure video shows first frame
          if (videoRef.current && !isPlaying) {
            videoRef.current.currentTime = 0.1;
            videoRef.current.pause();
          }
        }}
        onCanPlay={() => {
          setHasLoadedMetadata(true);
          // Show first frame
          if (videoRef.current && !isPlaying) {
            videoRef.current.currentTime = 0.1;
          }
        }}
        onPlay={() => {
          setIsPlaying(true);
          // Unmute when playing
          if (videoRef.current) {
            videoRef.current.muted = false;
          }
        }}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onError={(e) => {
          console.error('Video error:', e);
          setHasError(true);
          setIsLoading(false);
        }}
      />
      
      {/* Background while video loads - only show briefly */}
      {!hasLoadedMetadata && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-rich-black/60 to-rich-black/40 flex items-center justify-center z-10">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-rich-black/50">
          <div className="text-center text-white">
            <p className="text-sm mb-2">Unable to load video</p>
            <p className="text-xs text-white/70">Please check the video URL</p>
          </div>
        </div>
      )}

      {/* Play Button Overlay - show even while loading to allow interaction */}
      {!isPlaying && !hasError && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-rich-black/10 cursor-pointer group hover:bg-rich-black/20 transition-colors z-20"
          onClick={handlePlay}
        >
          <button
            className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/90 hover:bg-white transition-all duration-300 flex items-center justify-center group-hover:scale-110"
            aria-label="Play video"
            disabled={isLoading}
          >
            {/* Pulse Animation Rings */}
            <div className="absolute inset-0 rounded-full bg-white/60 animate-ping" style={{ animationDuration: '2s' }} />
            <div className="absolute inset-0 rounded-full bg-white/40 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }} />
            <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse" />
            
            {/* Play Icon */}
            <div className="relative z-10 flex items-center justify-center bg-white rounded-full p-2">
              <Play className="w-8 h-8 md:w-10 md:h-10 text-tomato ml-1" fill="currentColor" />
            </div>
          </button>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-rich-black/50">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}

