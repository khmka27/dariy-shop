Можно сделать “вкладыши” как **редакционные карточки-разделители прямо в сетке**: они выглядят как части каталога (мужское/женское/детское), но **не являются фильтрами** — это скорее “витрины/островки” с переходом на страницу коллекции или на якорь внутри (или открывают отдельный блок-подборку ниже).

Ниже 3 решения — от самого “вау” до самого простого. Все без настоящей фильтрации.

---

## 1) Вкладыши прямо в сетке (редакционные “островки”)

Идея: каждые N карточек вставлять большую карточку “Мужское / Женское / Детское”, которая **занимает 2 колонки на мобиле** и **2×2 на десктопе** (или просто `col-span-2`/`row-span-2`). Сетка остаётся сеткой товаров, но появляются интересные “вдохновляющие” вставки.

### Компонент `CategoryInsertCard`

```tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type CategoryInsertCardProps = {
  title: string;
  subtitle: string;
  href: string;
  tag?: string;
  gradientClass?: string; // чтобы отличались визуально
  aos?: string;
  aosDelay?: number;
};

function CategoryInsertCard({
  title,
  subtitle,
  href,
  tag,
  gradientClass = "from-[#8d021e]/10 via-rose-50 to-white",
  aos,
  aosDelay,
}: CategoryInsertCardProps) {
  return (
    <Link
      href={href}
      data-aos={aos}
      data-aos-delay={aosDelay}
      className={[
        "group relative overflow-hidden rounded-3xl border border-gray-200 bg-white",
        "p-5 sm:p-6 md:p-7",
        "col-span-2 md:col-span-1 md:row-span-2", // ключ: занимает место в сетке
        "transition-shadow duration-200 hover:shadow-lg",
      ].join(" ")}
    >
      <div className={["absolute inset-0 bg-gradient-to-br", gradientClass].join(" ")} />
      <div className="relative flex h-full flex-col justify-between gap-4">
        <div>
          {tag ? (
            <div className="inline-flex rounded-full border border-gray-200 bg-white/70 px-3 py-1 text-xs text-gray-700">
              {tag}
            </div>
          ) : null}

          <div className="mt-3">
            <h3 className="text-xl font-semibold tracking-tight text-gray-900 md:text-2xl">
              {title}
            </h3>
            <p className="mt-2 text-sm text-gray-700 md:text-base">
              {subtitle}
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 text-sm font-medium text-gray-900">
          Смотреть подборку
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}
```

### Вставка в `Catalog` без фильтров

```tsx
const inserts = [
  {
    after: 3,
    card: (
      <CategoryInsertCard
        title="Мужское"
        subtitle="Строгие силуэты и базовые вещи — на каждый день."
        href="/collections/men"
        tag="Коллекция"
        gradientClass="from-slate-100 via-white to-white"
        aos="fade-up"
      />
    ),
  },
  {
    after: 9,
    card: (
      <CategoryInsertCard
        title="Женское"
        subtitle="Акцент на деталях: фактуры, цвет и лёгкость."
        href="/collections/women"
        tag="Новая подборка"
        gradientClass="from-rose-100 via-white to-white"
        aos="fade-up"
      />
    ),
  },
  {
    after: 15,
    card: (
      <CategoryInsertCard
        title="Детское"
        subtitle="Мягкие материалы и удобные посадки."
        href="/collections/kids"
        tag="Для семьи"
        gradientClass="from-amber-100 via-white to-white"
        aos="fade-up"
      />
    ),
  },
];

function withInserts<T>(items: T[]) {
  const out: Array<{ type: "product"; item: T } | { type: "insert"; node: React.ReactNode; key: string }> = [];
  items.forEach((item, idx) => {
    out.push({ type: "product", item });
    const hit = inserts.find((x) => x.after === idx + 1);
    if (hit) out.push({ type: "insert", node: hit.card, key: `insert-${hit.after}` });
  });
  return out;
}
```

И в рендере:

```tsx
<div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 md:gap-6">
  {withInserts(products).map((x, i) => {
    if (x.type === "insert") return <div key={x.key}>{x.node}</div>;

    const product = x.item;
    return (
      <ProductCard
        key={(product as any).id}
        {...({
          product,
          variant: "dark",
          aos: "fade-up",
          aosDelay: 80 * (i % 6),
        } satisfies ProductCardProps)}
      />
    );
  })}
</div>
```

**Почему это “интересно”**: выглядит как дизайнерская верстка, а не как UI фильтра. И даёт естественные “остановки” при скролле.

---

## 2) “Вкладыши” как липкие табы-подсказки (не фильтры)

Слева/сверху тонкая полоска “Мужское • Женское • Детское” — **не меняет товары**, но при клике ведёт на отдельные коллекции/страницы или на секции ниже (“витрины”). Можно сделать `sticky` внутри каталога — ощущается как журнал.

---

## 3) “Вкладыши” как мини-лукбук внутри каталога

Вставка-карточка “Образ недели” (м/ж/дет) с 2–3 товарами и одним большим hero. Тоже не фильтр — это curated content.

---

### Что выбрать

Если хочешь именно **внутри текущей сетки** и “вау без усложнений” — бери **вариант 1** (он самый эффектный и простой).

Если скажешь, у тебя есть отдельные страницы `/collections/men` и т.п. или ты хочешь якоря на этой же странице — подстрою `href` и механику (без фильтрации, только навигация/витрины).
