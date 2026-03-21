"use client";

import { VideoPlayer } from "@/src/shared/components/ui/VideoPlayer";
import { blogFeaturedVideos } from "@/src/lib/blog/videos";
import type { BlogPageHeroCms } from "@/src/shared/types/blog-page-cms";
import { Video } from "lucide-react";

type BlogVideoSectionProps = {
  videosHero: BlogPageHeroCms;
};

export function BlogVideoSection({ videosHero }: BlogVideoSectionProps) {
  if (blogFeaturedVideos.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="text-center mb-10 md:mb-12">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tomato/10 text-tomato font-semibold text-sm mb-5">
          <Video className="w-4 h-4" />
          {videosHero.badgeLabel}
        </span>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-rich-black mb-4">
          {videosHero.headingPart1}{" "}
          <span className="text-tomato">{videosHero.headingPart2}</span>
        </h2>
        <p className="text-lg text-rich-black/70 max-w-2xl mx-auto leading-relaxed">
          {videosHero.subtitle}
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3 xl:gap-8">
        {blogFeaturedVideos.map((item) => (
          <article
            key={item.id}
            className="flex flex-col gap-4 min-w-0"
          >
            <h3 className="font-heading text-xl font-bold text-rich-black leading-snug">
              {item.title}
            </h3>
            <VideoPlayer
              videoUrl={item.videoUrl}
              posterUrl={item.posterUrl}
              className="shadow-xl border border-platinum/50"
            />
          </article>
        ))}
      </div>
    </div>
  );
}
