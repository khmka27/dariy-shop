"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { products } from "@/data/products";

export function Catalog() {
  return (
    <section
      id="catalog"
      className="relative w-full overflow-hidden border-t border-gray-200 bg-white py-4 scroll-mt-[4.5rem] md:py-10"
    >
      <div className="relative mx-auto w-full max-w-[1600px] px-3 md:px-5 lg:px-6">
        <div className="rounded-2xl border border-gray-200 bg-gray-50/80 p-4 shadow-sm md:p-5 lg:p-6">
          {/* Заголовок */}
          <div
            className="relative mb-4 md:mb-5"
            data-aos="fade-up"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold tracking-tight text-[#8d021e] md:text-2xl">
                Каталог
              </h2>

              <div className="flex flex-wrap gap-1.5">
                <Link
                  href="/collections/men"
                  className="group inline-flex items-center gap-1 rounded-lg border-2 border-[#8d021e]/20 bg-[#8d021e] px-3 py-2 text-xs font-medium text-white shadow-sm transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8d021e]/30 md:text-sm"
                >
                  Мужское
                  <ArrowRight className="size-3.5 text-white/90 transition group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/collections/women"
                  className="group inline-flex items-center gap-1 rounded-lg border-2 border-[#8d021e]/25 bg-white px-3 py-2 text-xs font-medium text-[#8d021e] transition hover:bg-[#8d021e]/5 hover:border-[#8d021e]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8d021e]/25 md:text-sm"
                >
                  Женское
                  <ArrowRight className="size-3.5 text-[#8d021e]/70 transition group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/collections/kids"
                  className="group inline-flex items-center gap-1 rounded-lg border-2 border-[#8d021e]/25 bg-white px-3 py-2 text-xs font-medium text-[#8d021e] transition hover:bg-[#8d021e]/5 hover:border-[#8d021e]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8d021e]/25 md:text-sm"
                >
                  Детское
                  <ArrowRight className="size-3.5 text-[#8d021e]/70 transition group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Сетка товаров */}
          <div className="grid grid-cols-2 gap-3 sm:gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-4">
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
        </div>
      </div>
    </section>
  );
}
