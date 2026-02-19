"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  images: string[];
  alt: string;
  emptyPlaceholder?: string;
  className?: string;
};

const SWIPE_THRESHOLD = 50;

export function ProductGalleryCarousel({ images, alt, emptyPlaceholder, className }: Props) {
  const [index, setIndex] = useState(0);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const el = thumbRefs.current[index];
    el?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (images.length <= 1) return;
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images.length, goPrev, goNext]);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (images.length <= 1) return;
      setDragStart(e.touches[0].clientX);
      setDragOffset(0);
    },
    [images.length]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (dragStart === null || images.length <= 1) return;
      setDragOffset(e.touches[0].clientX - dragStart);
    },
    [dragStart, images.length]
  );

  const handleTouchEnd = useCallback(() => {
    if (dragStart === null || images.length <= 1) return;
    if (dragOffset > SWIPE_THRESHOLD) goPrev();
    else if (dragOffset < -SWIPE_THRESHOLD) goNext();
    setDragStart(null);
    setDragOffset(0);
  }, [dragStart, dragOffset, images.length, goPrev, goNext]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (images.length <= 1) return;
      setDragStart(e.clientX);
      setDragOffset(0);
    },
    [images.length]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (dragStart === null || images.length <= 1) return;
      setDragOffset(e.clientX - dragStart);
    },
    [dragStart, images.length]
  );

  const handleMouseUp = useCallback(() => {
    if (dragStart === null || images.length <= 1) return;
    if (dragOffset > SWIPE_THRESHOLD) goPrev();
    else if (dragOffset < -SWIPE_THRESHOLD) goNext();
    setDragStart(null);
    setDragOffset(0);
  }, [dragStart, dragOffset, images.length, goPrev, goNext]);

  const handleMouseLeave = useCallback(() => {
    if (dragStart !== null) {
      setDragStart(null);
      setDragOffset(0);
    }
  }, [dragStart]);

  if (images.length === 0) {
    return (
      <div
        className={cn(
          "flex aspect-[3/4] w-full items-center justify-center rounded-2xl bg-gray-100 text-4xl text-gray-300 md:text-5xl",
          className
        )}
      >
        {emptyPlaceholder ?? "—"}
      </div>
    );
  }

  const translatePercent =
    index * -100 +
    (containerRef.current ? (dragOffset / containerRef.current.offsetWidth) * 100 : 0);

  return (
    <div className={cn("flex flex-col gap-3 md:flex-row md:gap-4", className)}>
      {/* Основное фото + свайп */}
      <div className="md:flex-1 md:min-w-0">
        <div
          ref={containerRef}
          className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-gray-100 touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="flex h-full w-full transition-transform duration-300 ease-out"
            style={{ transform: `translateX(${translatePercent}%)` }}
          >
            {images.map((src, i) => (
              <div key={`${i}-${src}`} className="relative h-full w-full shrink-0 select-none">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="pointer-events-none object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  draggable={false}
                />
              </div>
            ))}
          </div>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/95 p-2.5 shadow-lg backdrop-blur-sm transition hover:bg-white hover:shadow-xl active:scale-95"
                aria-label="Предыдущее фото"
              >
                <ChevronLeft className="size-5 text-gray-700" />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/95 p-2.5 shadow-lg backdrop-blur-sm transition hover:bg-white hover:shadow-xl active:scale-95"
                aria-label="Следующее фото"
              >
                <ChevronRight className="size-5 text-gray-700" />
              </button>
              <span className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                {index + 1} / {images.length}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Вертикальная полоса превью (десктоп) */}
      {images.length > 1 && (
        <div className="hidden md:flex md:w-20 md:flex-col md:gap-2 md:overflow-y-auto">
          {images.map((src, i) => (
            <button
              key={`${i}-${src}`}
              ref={(el) => { thumbRefs.current[i] = el; }}
              type="button"
              onClick={() => setIndex(i)}
              className={cn(
                "relative aspect-square w-full shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200",
                index === i
                  ? "border-[#8d021e] ring-2 ring-[#8d021e]/30"
                  : "border-transparent opacity-70 hover:opacity-100"
              )}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
      )}

      {/* Горизонтальная полоса превью (мобилка) + точки */}
      {images.length > 1 && (
        <div className="md:hidden space-y-2">
          <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-1">
            {images.map((src, i) => (
              <button
                key={`${i}-${src}`}
                type="button"
                onClick={() => setIndex(i)}
                className={cn(
                  "relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200",
                  index === i
                    ? "border-[#8d021e] ring-2 ring-[#8d021e]/30"
                    : "border-transparent opacity-70 hover:opacity-100"
                )}
              >
                <Image src={src} alt="" fill className="object-cover" sizes="56px" />
              </button>
            ))}
          </div>
          <div className="flex justify-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-200",
                  i === index ? "w-5 bg-[#8d021e]" : "w-1.5 bg-gray-300 hover:bg-gray-400"
                )}
                aria-label={`Фото ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
