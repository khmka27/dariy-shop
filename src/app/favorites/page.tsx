import Link from "next/link";
import { FavoritesContent } from "./FavoritesContent";

export const metadata = {
  title: "Избранное — DARIY",
  description: "Избранные товары",
};

export default function FavoritesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-6 md:py-10">
        <nav className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#8d021e]">
            Главная
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Избранное</span>
        </nav>

        <h1 className="text-2xl font-semibold text-gray-900 md:text-3xl">
          Избранное
        </h1>

        <FavoritesContent />
      </div>
    </main>
  );
}
