"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ContentSectionItem } from "@/src/shared/types/blog-page-cms";
import { useCallback, useState } from "react";

function excerptForCard(item: ContentSectionItem): string {
  const d = item.description?.trim();
  if (d) return d;
  return item.subtitle?.trim() ?? "";
}

type BlogListWithDetailModalProps = {
  items: ContentSectionItem[];
};

export function BlogListWithDetailModal({ items }: BlogListWithDetailModalProps) {
  const [selected, setSelected] = useState<ContentSectionItem | null>(null);

  const open = selected !== null;

  const handleOpenChange = useCallback((next: boolean) => {
    if (!next) setSelected(null);
  }, []);

  const activateCard = (item: ContentSectionItem) => {
    setSelected(item);
  };

  const onCardKeyDown = (
    e: React.KeyboardEvent,
    item: ContentSectionItem,
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      activateCard(item);
    }
  };

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, index) => (
          <Card
            key={`blog-${index}-${item.title}`}
            role="button"
            tabIndex={0}
            onClick={() => activateCard(item)}
            onKeyDown={(e) => onCardKeyDown(e, item)}
            className="h-full cursor-pointer border border-platinum/60 bg-white hover:shadow-lg hover:border-tomato/20 transition-all duration-300 group overflow-hidden flex flex-col p-0 gap-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tomato focus-visible:ring-offset-2"
          >
            <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-platinum/40">
              {item.imageUrl?.trim() ? (
                // eslint-disable-next-line @next/next/no-img-element -- CMS S3/CDN URLs
                <img
                  src={item.imageUrl}
                  alt={item.title || "Blog"}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm text-rich-black/40">
                  No image
                </div>
              )}
            </div>
            <CardHeader className="space-y-0 px-6 pt-6 pb-2">
              <h2 className="font-heading text-xl font-bold text-rich-black group-hover:text-tomato transition-colors line-clamp-2">
                {item.title || "Untitled"}
              </h2>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-0">
              <p className="text-rich-black/70 text-sm leading-relaxed line-clamp-3">
                {excerptForCard(item) || "—"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-h-[min(90vh,900px)] max-w-2xl overflow-y-auto border-platinum/60 bg-white p-0 gap-0 sm:rounded-xl">
          {selected ? (
            <div className="flex flex-col">
              <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-platinum/40">
                {selected.imageUrl?.trim() ? (
                  // eslint-disable-next-line @next/next/no-img-element -- CMS S3/CDN URLs
                  <img
                    src={selected.imageUrl}
                    alt={selected.title || "Blog"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex min-h-[200px] w-full items-center justify-center text-sm text-rich-black/40">
                    No image
                  </div>
                )}
              </div>
              <DialogHeader className="px-6 pt-6 pb-2 text-left space-y-3">
                <DialogTitle className="font-heading text-2xl font-bold text-rich-black leading-tight pr-8">
                  {selected.title || "Untitled"}
                </DialogTitle>
                {selected.subtitle?.trim() ? (
                  <p className="text-base font-medium text-rich-black/80 leading-snug">
                    {selected.subtitle.trim()}
                  </p>
                ) : null}
              </DialogHeader>
              <div className="px-6 pb-6 pt-1">
                <p className="text-rich-black/70 text-sm leading-relaxed whitespace-pre-wrap">
                  {selected.description?.trim() || "—"}
                </p>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
