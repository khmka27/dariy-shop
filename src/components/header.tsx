"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/features/cart/cartSort";
import { useFavoritesStore } from "@/features/favorites/favoritesStore";

const navLinks = [
  { href: "/#catalog", label: "Каталог" },
  { href: "/#new", label: "Новинки" },
  { href: "/#contacts", label: "Контакты" },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = useCartStore((s) =>
    s.items.reduce((acc, i) => acc + i.qty, 0)
  );
  const favoritesCount = useFavoritesStore((s) => s.ids.length);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMenuOpen(false);
    const isHome = pathname === "/" || pathname == null;

    if (!isHome) {
      return;
    }

    e.preventDefault();
    const hash = href.includes("#") ? href.slice(href.indexOf("#")) : "";
    const id = hash.replace(/^#/, "");
    if (!id) return;

    const scrollToSection = () => {
      try {
        const el = document.getElementById(id);
        if (el) {
          const header = document.querySelector("header");
          const headerHeight = header?.getBoundingClientRect().height ?? 56;
          const y = el.getBoundingClientRect().top + window.scrollY - headerHeight;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
        window.history.pushState(null, "", href);
      } catch {
        window.location.href = href;
      }
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(scrollToSection);
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#8d021e] text-white shadow-sm">
      <div className="relative mx-auto flex h-14 w-full max-w-[1920px] items-center justify-between gap-3 px-4 md:h-16 md:gap-4 md:px-8 lg:px-10 xl:px-12">
        {/* Слева: меню (мобильные) / навигация (десктоп) */}
        <div className="flex min-w-0 flex-1 items-center gap-3 md:gap-5">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden size-10 shrink-0 text-white hover:bg-white/10 hover:text-white active:scale-95"
            aria-label="Меню"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
          <nav className="hidden md:flex items-center gap-5" aria-label="Навигация">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className="shrink-0 text-sm font-medium text-white/90 whitespace-nowrap transition-colors hover:text-white"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Логотип по центру */}
        <Link
          href="/"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-semibold tracking-wide text-white transition-opacity hover:opacity-90 md:text-xl"
        >
          DARIY
        </Link>

        {/* Справа: избранное и корзина */}
        <div className="flex flex-1 items-center justify-end gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="relative size-10 text-white hover:bg-white/10 hover:text-white active:scale-95"
            asChild
            aria-label={favoritesCount > 0 ? `Избранное: ${favoritesCount}` : "Избранное"}
          >
            <Link href="/favorites" className="relative inline-flex">
              <Heart className="size-5" />
              {favoritesCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[10px] font-semibold text-[#8d021e]">
                  {favoritesCount > 99 ? "99+" : favoritesCount}
                </span>
              )}
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative size-10 text-white hover:bg-white/10 hover:text-white active:scale-95"
            asChild
            aria-label={cartCount > 0 ? `Корзина: ${cartCount} товаров` : "Корзина"}
          >
            <Link href="/cart" className="relative inline-flex">
              <ShoppingCart className="size-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[10px] font-semibold text-[#8d021e]">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
          </Button>
        </div>
      </div>

      {/* Мобильное меню */}
      <div
        className="grid w-full transition-[grid-template-rows] duration-200 ease-out md:hidden"
        style={{ gridTemplateRows: menuOpen ? "1fr" : "0fr" }}
      >
        <div className="min-h-0 overflow-hidden border-t border-white/10 bg-[#8d021e]">
          <nav className="px-3 py-2.5 md:px-5" aria-label="Навигация">
            <div className="flex flex-col gap-0.5">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className="block py-2 text-sm font-medium text-white/90 transition-colors hover:text-white"
                >
                  {label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
