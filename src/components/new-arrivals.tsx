"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

type Props = {
  products: Product[];
  className?: string;
};

export function NewArrivals({ products, className }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const step = el.clientWidth * 0.85;
    el.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
  };

  if (products.length === 0) return null;

  return (
    <section
      id="new"
      className={cn(
        "scroll-mt-[4.5rem] border-t border-gray-200 bg-white py-8 md:py-10",
        className
      )}
    >
      <div className="mx-auto max-w-[1600px] px-3 md:px-5 lg:px-6">
        <div className="mb-4 flex items-center justify-between md:mb-5">
          <h2 className="text-xl font-semibold tracking-tight text-[#8d021e] md:text-2xl">
            Новинки
          </h2>
          {products.length > 2 && (
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => scroll("left")}
                className="flex size-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:border-[#8d021e]/30 hover:bg-[#8d021e]/5 hover:text-[#8d021e]"
                aria-label="Назад"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                className="flex size-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:border-[#8d021e]/30 hover:bg-[#8d021e]/5 hover:text-[#8d021e]"
                aria-label="Вперёд"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          )}
        </div>

        <div
          ref={scrollRef}
          className="scrollbar-hide -mx-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-3 pb-2 md:-mx-5 md:px-5 lg:-mx-6 lg:px-6"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-[160px] shrink-0 snap-start md:w-[200px] lg:w-[240px]"
            >
              <ProductCard
                product={product}
                variant="dark"
                showNewBadge
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
