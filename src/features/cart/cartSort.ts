import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  qty: number;
  size?: string;
  color?: string;
};

function lineKey(item: Pick<CartItem, "id" | "size" | "color">) {
  return `${item.id}|${item.size ?? ""}|${item.color ?? ""}`;
}

type CartState = {
  items: CartItem[];
  add: (id: string, opts?: { size?: string; color?: string; qty?: number }) => void;
  remove: (id: string, size?: string, color?: string) => void;
  setQty: (id: string, qty: number, size?: string, color?: string) => void;
  clear: () => void;
  totalItems: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (id, opts = {}) =>
        set((s) => {
          const { size, color, qty: addQty = 1 } = opts;
          const key = lineKey({ id, size, color });
          const exist = s.items.find((i) => lineKey(i) === key);
          return {
            items: exist
              ? s.items.map((i) =>
                  lineKey(i) === key ? { ...i, qty: i.qty + addQty } : i
                )
              : [...s.items, { id, qty: addQty, size, color }],
          };
        }),
      remove: (id, size, color) =>
        set((s) => ({
          items: s.items.filter(
            (i) => !(i.id === id && (i.size ?? "") === (size ?? "") && (i.color ?? "") === (color ?? ""))
          ),
        })),
      setQty: (id, qty, size, color) =>
        set((s) => ({
          items: s.items.map((i) =>
            lineKey(i) === lineKey({ id, size, color }) ? { ...i, qty } : i
          ),
        })),
      clear: () => set({ items: [] }),
      totalItems: () => get().items.reduce((acc, i) => acc + i.qty, 0),
    }),
    { name: "cart-v2" }
  )
);
