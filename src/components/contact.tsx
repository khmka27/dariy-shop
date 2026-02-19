"use client";

import { useMemo, useState } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Mail,
  Copy,
  Check,
  Send,
  MessageCircle,
} from "lucide-react";

const CONTACT = {
  brand: "DARIY",
  address: "Кабардино-Балкарская Республика, Нальчик, Калининградская улица, 2",
  hours: "Ежедневно 9:00 – 17:00",
  phonePretty: "8 (999) 999 99 99",
  phoneHref: "tel:+79999999999",
  email: "hello@dariy.lv",
  telegram: "https://t.me/dariyshopp",
  whatsapp: "https://wa.me/79999999999",
  // Яндекс.Карты: ll = lon,lat; z — зум; маркер = mlon,mlat
  yandexMapsLl: "43.66456,43.51364",
  yandexMapsZ: "12",
  yandexMapsMarker: "43.664657,43.513911",
};

function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

export function ContactBlockUnusual() {
  const [copied, setCopied] = useState<null | "address" | "phone" | "email">(null);

  const chips = useMemo(
    () => [
      { key: "address" as const, label: "Адрес", value: CONTACT.address, icon: <MapPin className="size-4" /> },
      { key: "phone" as const, label: "Телефон", value: CONTACT.phonePretty, icon: <Phone className="size-4" /> },
      { key: "email" as const, label: "Email", value: CONTACT.email, icon: <Mail className="size-4" /> },
      { key: "hours" as const, label: "Часы работы", value: CONTACT.hours, icon: <Clock className="size-4" /> },
    ],
    []
  );

  const copy = async (key: "address" | "phone" | "email", text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      window.setTimeout(() => setCopied(null), 1400);
    } catch {
      // ignore
    }
  };

  const yandexMapsUrl = `https://yandex.ru/maps/?ll=${CONTACT.yandexMapsLl}&z=${CONTACT.yandexMapsZ}&pt=${CONTACT.yandexMapsMarker}`;

  return (
    <section className="relative flex min-h-0 w-full flex-1 flex-col overflow-hidden py-6 md:py-8">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-40 size-[520px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -right-28 top-24 size-[560px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/0" />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1200px] flex-1 flex-col px-4 md:px-6">
        <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-white/15 bg-white/5 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.8)] backdrop-blur-xl">
          <div className="flex flex-1 flex-col gap-4 p-4 md:gap-4 md:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
                Контакты
              </h2>
              {/* Мобилка: кнопки на всю ширину */}
              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-2">
                <a
                  href={CONTACT.telegram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 sm:w-auto sm:py-1.5"
                >
                  <Send className="size-4" />
                  Telegram
                  <span aria-hidden className="text-white/50">↗</span>
                </a>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 sm:w-auto sm:py-1.5"
                >
                  <MessageCircle className="size-4" />
                  WhatsApp
                  <span aria-hidden className="text-white/50">↗</span>
                </a>
              </div>
            </div>

            {/* Мобилка: телефон и email в один ряд на всю ширину */}
            <div className="grid grid-cols-2 gap-2 sm:hidden">
              {chips.filter((c) => c.key === "phone" || c.key === "email").map((c) => (
                <div
                  key={c.key}
                  className="flex items-start gap-2 rounded-lg border border-white/10 bg-white/5 p-2.5 transition hover:bg-white/10"
                >
                  <div className="shrink-0 rounded-md border border-white/10 bg-white/10 p-1.5 text-white">
                    {c.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-white/60">{c.label}</p>
                    <p className="mt-0.5 break-words text-sm font-medium text-white">
                      {c.value}
                    </p>
                    <button
                      type="button"
                      onClick={() => copy(c.key, c.value)}
                      className="mt-1 inline-flex items-center gap-1 rounded border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/80 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                      aria-label={`Копировать: ${c.label}`}
                    >
                      {copied === c.key ? (
                        <><Check className="size-3" /> Скопировано</>
                      ) : (
                        <><Copy className="size-3" /> Копировать</>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Мобилка: адрес и часы в одном блоке */}
            <div className="rounded-lg border border-white/10 bg-white/5 p-2.5 transition hover:bg-white/10 sm:hidden">
              <div className="flex items-start gap-2">
                <div className="shrink-0 rounded-md border border-white/10 bg-white/10 p-1.5 text-white">
                  <MapPin className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-white/60">Адрес</p>
                  <p className="mt-0.5 break-words text-sm font-medium text-white">
                    {CONTACT.address}
                  </p>
                  <button
                    type="button"
                    onClick={() => copy("address", CONTACT.address)}
                    className="mt-1 inline-flex items-center gap-1 rounded border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/80 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                    aria-label="Копировать: Адрес"
                  >
                    {copied === "address" ? (
                      <><Check className="size-3" /> Скопировано</>
                    ) : (
                      <><Copy className="size-3" /> Копировать</>
                    )}
                  </button>
                </div>
              </div>
              <div className="mt-3 flex items-start gap-2 border-t border-white/10 pt-3">
                <div className="shrink-0 rounded-md border border-white/10 bg-white/10 p-1.5 text-white">
                  <Clock className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-white/60">Часы работы</p>
                  <p className="mt-0.5 text-sm font-medium text-white">
                    {CONTACT.hours}
                  </p>
                </div>
              </div>
            </div>

            {/* Десктоп: сетка из 4 чипов */}
            <div className="hidden gap-2 sm:grid sm:grid-cols-2 lg:grid-cols-4">
              {chips.map((c) => (
                <div
                  key={c.key}
                  className="flex items-start gap-2.5 rounded-lg border border-white/10 bg-white/5 p-2.5 transition hover:bg-white/10 md:p-3"
                >
                  <div className="shrink-0 rounded-md border border-white/10 bg-white/10 p-1.5 text-white">
                    {c.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-white/60">{c.label}</p>
                    <p className="mt-0.5 break-words text-sm font-medium text-white">
                      {c.value}
                    </p>
                    {(c.key === "address" || c.key === "phone" || c.key === "email") && (
                      <button
                        type="button"
                        onClick={() => copy(c.key, c.value)}
                        className="mt-1 inline-flex items-center gap-1 rounded border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/80 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                        aria-label={`Копировать: ${c.label}`}
                      >
                        {copied === c.key ? (
                          <><Check className="size-3" /> Скопировано</>
                        ) : (
                          <><Copy className="size-3" /> Копировать</>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white/80">Как нас найти</p>
                <a
                  href={yandexMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-sm text-white/90 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                >
                  <MapPin className="size-3.5" />
                  Открыть в Яндекс.Картах
                  <span aria-hidden className="text-white/50">↗</span>
                </a>
              </div>
              <div className="overflow-hidden rounded-lg border border-white/10 bg-black/20">
                <iframe
                  title="Яндекс.Карты — адрес магазина"
                  src={`https://yandex.ru/map-widget/v1/?ll=${CONTACT.yandexMapsLl}&z=${CONTACT.yandexMapsZ}&pt=${CONTACT.yandexMapsMarker}`}
                  width="100%"
                  height="240"
                  frameBorder="0"
                  allowFullScreen
                  className="block min-h-[200px] w-full"
                  style={{ border: 0 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
