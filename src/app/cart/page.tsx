import Link from "next/link";
import { CartContent } from "./CartContent";

export const metadata = {
  title: "Корзина — DARIY",
  description: "Ваша корзина покупок",
};

export default function CartPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-[1000px] px-4 py-8 md:px-6 md:py-10">
        <nav className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#8d021e]">
            Главная
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Корзина</span>
        </nav>

        <h1 className="text-2xl font-semibold text-gray-900 md:text-3xl">
          Корзина
        </h1>

        <CartContent />
      </div>
    </main>
  );
}
