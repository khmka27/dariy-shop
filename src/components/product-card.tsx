"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Product } from "@/data/products";
import { useFavoritesStore } from "@/features/favorites/favoritesStore";
import { useToastStore } from "@/features/toast/toastStore";
import { cn } from "@/lib/utils";

export type ProductCardProps = {
  product: Product;
  variant?: "default" | "dark";
  /** Плашка NEW слева сверху (для новинок) */
  showNewBadge?: boolean;
  aos?: string;
  aosDelay?: number;
};

/** Для карусели в карточке: если одно фото — дублируем для эффекта листания */
function getCardImages(images: string[] | undefined): string[] {
  if (!images?.length) return [];
  if (images.length === 1) return [images[0], images[0], images[0]];
  return images;
}

export function ProductCard({
  product,
  variant = "default",
  showNewBadge = false,
  aos,
  aosDelay,
}: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const cardImages = getCardImages(product.images);
  const imgSrc = cardImages[0];
  const showPlaceholder = !imgSrc || imgError;
  const hasCarousel = cardImages.length > 1;
  const aosAttr =
    aos != null
      ? { "data-aos": aos, ...(aosDelay != null && { "data-aos-delay": aosDelay }) }
      : undefined;

  const isDark = variant === "dark";

  if (isDark) {
    const isLiked = useFavoritesStore((s) => s.has(product.id));
    const toggleLike = useFavoritesStore((s) => s.toggle);
    const toast = useToastStore((s) => s.show);

    const goPrev = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setCarouselIndex((i) => (i - 1 + cardImages.length) % cardImages.length);
    };
    const goNext = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setCarouselIndex((i) => (i + 1) % cardImages.length);
    };

    return (
      <div
        className="group relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.15)] hover:border-[#8d021e]/20"
        {...aosAttr}
      >
        {showNewBadge && (
          <span className="absolute left-2 top-2 z-10 rounded bg-[#8d021e] px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-white shadow-sm">
            New
          </span>
        )}
        <Link href={`/product/${product.id}`} className="block">
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
            {showPlaceholder ? (
              <div className="flex size-full items-center justify-center text-2xl text-gray-300">
                {product.title.charAt(0)}
              </div>
            ) : hasCarousel ? (
              <>
                <div className="relative size-full">
                  <Image
                    src={cardImages[carouselIndex]}
                    alt={product.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    onError={() => setImgError(true)}
                  />
                </div>
                <div
                  className="absolute inset-0 flex opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  onClick={(e) => e.preventDefault()}
                >
                  <button
                    type="button"
                    onClick={goPrev}
                    className="flex-1 cursor-pointer border-0 bg-transparent"
                    aria-label="Предыдущее фото"
                  />
                  <button
                    type="button"
                    onClick={goNext}
                    className="flex-1 cursor-pointer border-0 bg-transparent"
                    aria-label="Следующее фото"
                  />
                </div>
                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                  {cardImages.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setCarouselIndex(i);
                      }}
                      className={cn(
                        "h-1 rounded-full transition-all duration-200",
                        i === carouselIndex ? "w-3 bg-white" : "w-1 bg-white/60 hover:bg-white/80"
                      )}
                      aria-label={`Фото ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <Image
                src={imgSrc}
                alt={product.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                onError={() => setImgError(true)}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        </Link>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const wasLiked = isLiked;
            toggleLike(product.id);
            toast(wasLiked ? "Удалено из избранного" : "Добавлено в избранное");
          }}
          className="absolute right-2 top-2 z-10 flex size-9 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-sm backdrop-blur-sm transition hover:bg-white hover:text-[#8d021e] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8d021e]/40"
          aria-label={isLiked ? "Убрать из избранного" : "В избранное"}
        >
          <Heart
            className={cn("size-4 transition", isLiked && "fill-[#8d021e] text-[#8d021e]")}
          />
        </button>

        <Link href={`/product/${product.id}`} className="block p-3 md:p-4">
          <h3 className="line-clamp-2 text-xs font-semibold text-gray-900 md:text-sm">
            {product.title}
          </h3>
          <p className="mt-1.5 text-sm font-semibold text-[#8d021e]">
            {new Intl.NumberFormat("ru-RU", {
              style: "currency",
              currency: "RUB",
              maximumFractionDigits: 0,
            }).format(product.price)}
          </p>
        </Link>
      </div>
    );
  }

  const isLiked = useFavoritesStore((s) => s.has(product.id));
  const toggleLike = useFavoritesStore((s) => s.toggle);
  const toast = useToastStore((s) => s.show);

  const goPrevDefault = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCarouselIndex((i) => (i - 1 + cardImages.length) % cardImages.length);
  };
  const goNextDefault = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCarouselIndex((i) => (i + 1) % cardImages.length);
  };

  return (
    <Card
      className="group relative overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
      {...aosAttr}
    >
      {showNewBadge && (
        <span className="absolute left-2 top-2 z-10 rounded bg-[#8d021e] px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-white shadow-sm">
          New
        </span>
      )}
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
          {showPlaceholder ? (
            <div className="flex size-full items-center justify-center text-4xl text-muted-foreground">
              {product.title.charAt(0)}
            </div>
          ) : hasCarousel ? (
            <>
              <div className="relative size-full">
                <Image
                  src={cardImages[carouselIndex]}
                  alt={product.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  onError={() => setImgError(true)}
                />
              </div>
              <div
                className="absolute inset-0 flex opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                onClick={(e) => e.preventDefault()}
              >
                <button type="button" onClick={goPrevDefault} className="flex-1 cursor-pointer border-0 bg-transparent" aria-label="Предыдущее фото" />
                <button type="button" onClick={goNextDefault} className="flex-1 cursor-pointer border-0 bg-transparent" aria-label="Следующее фото" />
              </div>
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                {cardImages.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCarouselIndex(i); }}
                    className={cn(
                      "h-1 rounded-full transition-all duration-200",
                      i === carouselIndex ? "w-3 bg-white" : "w-1 bg-white/60 hover:bg-white/80"
                    )}
                    aria-label={`Фото ${i + 1}`}
                  />
                ))}
              </div>
            </>
          ) : (
            <Image
              src={imgSrc}
              alt={product.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
              onError={() => setImgError(true)}
            />
          )}
        </div>
      </Link>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const wasLiked = isLiked;
          toggleLike(product.id);
          toast(wasLiked ? "Удалено из избранного" : "Добавлено в избранное");
        }}
        className="absolute right-2 top-2 z-10 flex size-9 items-center justify-center rounded-full bg-white/90 shadow-sm transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8d021e]/40"
        aria-label={isLiked ? "Убрать из избранного" : "В избранное"}
      >
        <Heart
          className={cn("size-4 text-gray-600", isLiked && "fill-[#8d021e] text-[#8d021e]")}
        />
      </button>
      <CardHeader>
        <CardTitle className="line-clamp-2">
          <Link href={`/product/${product.id}`} className="hover:underline">
            {product.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-semibold text-[#8d021e]">
          {new Intl.NumberFormat("ru-RU", {
            style: "currency",
            currency: "RUB",
            maximumFractionDigits: 0,
          }).format(product.price)}
        </p>
      </CardContent>
    </Card>
  );
}
