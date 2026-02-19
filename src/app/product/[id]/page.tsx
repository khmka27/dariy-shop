import { notFound } from "next/navigation";
import Link from "next/link";
import { products } from "@/data/products";
import { ProductPageClient } from "./ProductPageClient";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) return { title: "Товар" };
  return {
    title: `${product.title} — DARIY`,
    description: product.category
      ? `${product.title}, ${product.category}. Цена: ${product.price} ₽`
      : undefined,
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) notFound();

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-[1200px] px-4 py-6 md:px-6 md:py-8">
        <nav className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#8d021e]">
            Главная
          </Link>
          <span className="mx-2">/</span>
          <Link href="/#catalog" className="hover:text-[#8d021e]">
            Каталог
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.title}</span>
        </nav>

        <ProductPageClient product={product} />
      </div>
    </main>
  );
}
