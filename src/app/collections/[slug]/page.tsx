import { notFound } from "next/navigation";
import Link from "next/link";
import { products } from "@/data/products";
import type { Product } from "@/data/products";
import { CollectionClient } from "./CollectionClient";

const COLLECTIONS: Record<string, { title: string; filter: (p: Product) => boolean }> = {
  men: {
    title: "Мужское",
    filter: (p) => p.gender === "unisex",
  },
  women: {
    title: "Женское",
    filter: (p) => p.gender === "female" || p.gender === "unisex",
  },
  kids: {
    title: "Детское",
    filter: (p) => p.gender === "unisex",
  },
};

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return Object.keys(COLLECTIONS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const config = COLLECTIONS[slug];
  if (!config) return { title: "Каталог" };
  return { title: `${config.title} — DARIY` };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const config = COLLECTIONS[slug];
  if (!config) notFound();

  const items = products.filter(config.filter);

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-[1600px] px-4 py-8 md:px-6 md:py-10">
        <nav className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#8d021e]">
            Главная
          </Link>
          <span className="mx-2">/</span>
          <Link href="/#catalog" className="hover:text-[#8d021e]">
            Каталог
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{config.title}</span>
        </nav>

        <h1 className="text-2xl font-semibold text-gray-900 md:text-3xl">
          {config.title}
        </h1>

        <CollectionClient products={items} />
      </div>
    </main>
  );
}
