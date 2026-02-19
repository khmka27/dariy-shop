"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCartStore, type CartItem } from "@/features/cart/cartSort";
import { useToastStore } from "@/features/toast/toastStore";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(price);

function CartRow({ item }: { item: CartItem }) {
  const product = products.find((p) => p.id === item.id);
  const setQty = useCartStore((s) => s.setQty);
  const remove = useCartStore((s) => s.remove);
  const toast = useToastStore((s) => s.show);
  const [imgError, setImgError] = useState(false);

  if (!product) return null;

  const imgSrc = product.images?.[0];
  const showPlaceholder = !imgSrc || imgError;
  const subtotal = product.price * item.qty;

  return (
    <div className="flex gap-4 border-b border-gray-200 py-4 last:border-0 md:gap-6">
      <Link
        href={`/product/${product.id}`}
        className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100 md:h-28 md:w-24"
      >
        {showPlaceholder ? (
          <div className="flex size-full items-center justify-center text-xl text-gray-300">
            {product.title.charAt(0)}
          </div>
        ) : (
          <Image
            src={imgSrc}
            alt={product.title}
            fill
            className="object-cover"
            sizes="96px"
            onError={() => setImgError(true)}
          />
        )}
      </Link>
      <div className="min-w-0 flex-1">
        <Link
          href={`/product/${product.id}`}
          className="font-medium text-gray-900 hover:text-[#8d021e]"
        >
          {product.title}
        </Link>
        {(item.size || item.color) && (
          <p className="mt-0.5 text-sm text-gray-500">
            {[item.size, item.color].filter(Boolean).join(", ")}
          </p>
        )}
        <p className="mt-1 text-sm font-semibold text-gray-900">
          {formatPrice(product.price)}
        </p>
      </div>
      <div className="flex flex-col items-end justify-between gap-2">
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() =>
              item.qty <= 1
                ? remove(product.id, item.size, item.color)
                : setQty(product.id, item.qty - 1, item.size, item.color)
            }
            aria-label="Уменьшить"
          >
            <Minus className="size-3.5" />
          </Button>
          <span className="min-w-[2rem] text-center text-sm font-medium">
            {item.qty}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => setQty(product.id, item.qty + 1, item.size, item.color)}
            aria-label="Увеличить"
          >
            <Plus className="size-3.5" />
          </Button>
        </div>
        <p className="text-sm font-semibold">{formatPrice(subtotal)}</p>
        <Button
          variant="ghost"
          size="icon"
          className="size-8 text-gray-400 hover:text-red-600"
          onClick={() => {
            remove(product.id, item.size, item.color);
            toast("Товар удалён из корзины");
          }}
          aria-label="Удалить"
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
    </div>
  );
}

export function CartContent() {
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);
  const toast = useToastStore((s) => s.show);

  const total = items.reduce((acc, item) => {
    const product = products.find((p) => p.id === item.id);
    return acc + (product?.price ?? 0) * item.qty;
  }, 0);
  const totalQty = items.reduce((acc, i) => acc + i.qty, 0);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <ShoppingBag className="size-16 text-gray-300" />
        <p className="mt-4 text-gray-600">В корзине пока ничего нет</p>
        <Button asChild className="mt-6 bg-[#8d021e] hover:bg-[#8d021e]/90">
          <Link href="/#catalog">В каталог</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="rounded-xl border border-gray-200 bg-white p-4 md:p-6">
        {items.map((item, index) => (
          <CartRow key={`${item.id}-${item.size ?? ""}-${item.color ?? ""}-${index}`} item={item} />
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-lg font-semibold text-gray-900">
          Итого ({totalQty} {totalQty === 1 ? "товар" : "товара"}): {formatPrice(total)}
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => {
              clear();
              toast("Корзина очищена");
            }}
          >
            Очистить корзину
          </Button>
          <Button asChild className="bg-[#8d021e] hover:bg-[#8d021e]/90">
            <Link href="/#contacts">Оформить заказ</Link>
          </Button>
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        Оформление заказа — через контакты (Telegram, WhatsApp, звонок). Укажите товары из корзины.
      </p>
    </div>
  );
}
