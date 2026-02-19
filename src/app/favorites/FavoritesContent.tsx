"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { useFavoritesStore } from "@/features/favorites/favoritesStore";
import { useToastStore } from "@/features/toast/toastStore";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(price);

export function FavoritesContent() {
  const ids = useFavoritesStore((s) => s.ids);
  const toggle = useFavoritesStore((s) => s.toggle);
  const toast = useToastStore((s) => s.show);
  const favorites = products.filter((p) => ids.includes(p.id));

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Heart className="size-16 text-gray-300" />
        <p className="mt-4 text-gray-600">В избранном пока ничего нет</p>
        <Button asChild className="mt-6 bg-[#8d021e] hover:bg-[#8d021e]/90">
          <Link href="/#catalog">В каталог</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4">
      {favorites.map((product) => {
        const imgSrc = product.images?.[0];
        return (
          <div
            key={product.id}
            className="group relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm transition hover:shadow-md"
          >
            <Link href={`/product/${product.id}`} className="block">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
                {imgSrc ? (
                  <Image
                    src={imgSrc}
                    alt={product.title}
                    fill
                    className="object-cover transition group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center text-3xl text-gray-300">
                    {product.title.charAt(0)}
                  </div>
                )}
              </div>
            </Link>
            <button
              type="button"
              onClick={() => {
                toggle(product.id);
                toast("Удалено из избранного");
              }}
              className="absolute right-2 top-2 z-10 flex size-9 items-center justify-center rounded-full bg-white/90 text-[#8d021e] shadow-sm backdrop-blur-sm hover:bg-white"
              aria-label="Убрать из избранного"
            >
              <Heart className="size-4 fill-[#8d021e]" />
            </button>
            <Link href={`/product/${product.id}`} className="block p-3">
              <h2 className="line-clamp-2 text-sm font-semibold text-gray-900">
                {product.title}
              </h2>
              <p className="mt-1 text-sm font-semibold text-[#8d021e]">
                {formatPrice(product.price)}
              </p>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
