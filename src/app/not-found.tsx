import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16">
      <h1 className="text-2xl font-semibold text-gray-900 md:text-3xl">
        Страница не найдена
      </h1>
      <p className="mt-2 text-gray-600">
        Запрашиваемая страница не существует или была удалена.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-xl bg-[#8d021e] px-6 py-3 text-base font-medium text-white transition hover:bg-[#8d021e]/90"
      >
        Вернуться на главную
      </Link>
    </main>
  );
}
