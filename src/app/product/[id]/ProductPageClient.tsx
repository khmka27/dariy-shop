"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import type { Product } from "@/data/products";
import { useCartStore } from "@/features/cart/cartSort";
import { useToastStore } from "@/features/toast/toastStore";
import { Button } from "@/components/ui/button";
import { ProductGalleryCarousel } from "@/components/product-gallery-carousel";
import { cn } from "@/lib/utils";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(price);

type Props = { product: Product };

export function ProductPageClient({ product }: Props) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const add = useCartStore((s) => s.add);
  const toast = useToastStore((s) => s.show);
  const rawImages = product.images?.length ? product.images : [];
  /** Если одно фото — дублируем для демо перелистывания */
  const images =
    rawImages.length === 1
      ? [rawImages[0], rawImages[0], rawImages[0]]
      : rawImages;

  const handleAddToCart = () => {
    if (product.price === 0) return;
    if (product.sizes?.length && !selectedSize) return;
    add(product.id, {
      size: selectedSize ?? undefined,
      qty: quantity,
    });
    toast("Добавлено в корзину");
  };

  const canAdd =
    product.price > 0 && (!product.sizes?.length || selectedSize != null);

  return (
    <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
      <ProductGalleryCarousel
        images={images}
        alt={product.title}
        emptyPlaceholder={product.title.charAt(0)}
      />

      <div className="flex flex-col">
        {product.category && (
          <p className="mb-1 text-sm text-gray-500">{product.category}</p>
        )}
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl">
          {product.title}
        </h1>
        <p className="mt-3 text-xl font-semibold text-gray-900">
          {formatPrice(product.price)}
        </p>

        {product.price === 0 && (
          <p className="mt-2 text-sm text-gray-500">
            Цена по запросу. Свяжитесь с нами для заказа.
          </p>
        )}

        <div className="mt-6 space-y-6">
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <p className="mb-2 text-sm font-medium text-gray-700">
                Размер <span className="text-[#8d021e]">*</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "min-w-[2.75rem] rounded-lg border-2 px-3 py-2 text-sm font-medium transition",
                      selectedSize === size
                        ? "border-[#8d021e] bg-[#8d021e] text-white"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="mt-1.5 text-xs text-amber-600">
                  Выберите размер, чтобы добавить в корзину
                </p>
              )}
            </div>
          )}

          {product.price > 0 && (
            <div>
              <p className="mb-2 text-sm font-medium text-gray-700">Количество</p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-10 shrink-0"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Уменьшить"
                >
                  <Minus className="size-4" />
                </Button>
                <span className="min-w-[2.5rem] text-center font-medium">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-10 shrink-0"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Увеличить"
                >
                  <Plus className="size-4" />
                </Button>
              </div>
            </div>
          )}

          {product.price > 0 && (
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
              <Button
                size="lg"
                className="w-full bg-[#8d021e] hover:bg-[#8d021e]/90 sm:w-auto disabled:opacity-60"
                onClick={handleAddToCart}
                disabled={!canAdd}
                title={
                  product.sizes?.length && !selectedSize
                    ? "Сначала выберите размер"
                    : undefined
                }
              >
                <ShoppingCart className="mr-2 size-5" />
                В корзину
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/#catalog">Вернуться в каталог</Link>
              </Button>
            </div>
          )}
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-600">
            {product.category && <>Категория: {product.category}. </>}
            {product.gender && (
              <>
                Для{" "}
                {product.gender === "female"
                  ? "женщин"
                  : product.gender === "male"
                    ? "мужчин"
                    : "всех"}
                .{" "}
              </>
            )}
            По вопросам заказа — контакты внизу страницы.
          </p>
        </div>
      </div>
    </div>
  );
}
