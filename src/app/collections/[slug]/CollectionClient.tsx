"use client";

import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/data/products";
import { Button } from "@/components/ui/button";

type Props = { products: Product[] };

export function CollectionClient({ products }: Props) {
  if (products.length === 0) {
    return (
      <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-gray-50/50 py-16 text-center">
        <p className="text-gray-600">В этой категории пока нет товаров.</p>
        <Button asChild className="mt-6 bg-[#8d021e] hover:bg-[#8d021e]/90">
          <Link href="/#catalog">Вернуться в каталог</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-4">
        {products.map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            variant="dark"
            aos="fade-up"
            aosDelay={50 * i}
          />
        ))}
      </div>
      <div className="mt-8">
        <Button variant="outline" asChild>
          <Link href="/#catalog">Вернуться в каталог</Link>
        </Button>
      </div>
    </>
  );
}
