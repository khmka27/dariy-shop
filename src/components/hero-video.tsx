"use client";

import { useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

type HeroVideoProps = {
  /** Путь к видео (например /hero.mp4). Добавьте файл в public/. Если не указан — показывается фон-заглушка */
  videoSrc?: string;
  title?: string;
  subtitle?: string;
  /** id блока, к которому прокручивает стрелка вниз */
  nextBlockId?: string;
};

export function HeroVideo({
  videoSrc,
  title = "DARIY",
  subtitle = "одежда для всех",
  nextBlockId = "catalog",
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;
    video.play().catch(() => {});
  }, [videoSrc]);

  const scrollToNext = () => {
    document.getElementById(nextBlockId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-[calc(100dvh-3.5rem)] min-h-[calc(100dvh-3.5rem)] w-full overflow-hidden">
      {/* Видео или фон */}
      {videoSrc ? (
        <video
          ref={videoRef}
          src={videoSrc}
          className="absolute inset-0 size-full object-cover"
          muted
          loop
          playsInline
          aria-hidden
        />
      ) : (
        <div
          className="absolute inset-0 size-full bg-gradient-to-br from-muted to-muted/80"
          aria-hidden
        />
      )}

      {/* Затемнение для читаемости текста */}
      <div
        className="absolute inset-0 bg-black/30"
        aria-hidden
      />

      {/* Текст на переднем плане */}
      <div className="relative flex h-full flex-col items-center justify-center px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white drop-shadow-md md:text-4xl lg:text-5xl">
          {title}
        </h2>
        <p className="mt-1.5 text-lg text-white/95 drop-shadow md:text-xl">
          {subtitle}
        </p>
      </div>

      <button
        type="button"
        onClick={scrollToNext}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex size-10 items-center justify-center rounded-full border-2 border-white/80 bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 md:size-11 md:bottom-14"
        aria-label="К следующему блоку"
      >
        <ChevronDown className="size-6" />
      </button>
    </section>
  );
}
