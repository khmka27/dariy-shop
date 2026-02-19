import productsJson from "./products.json";

export type Product = {
  id: string;
  title: string;
  price: number;
  images?: string[];
  sizes?: string[];
  colors?: string[];
  gender?: string;
  category?: string;
};

export const products: Product[] = productsJson as Product[];

export const allSizes = Array.from(
  new Set(products.flatMap((p) => p.sizes ?? []))
).sort();

export const allColors = Array.from(
  new Set(products.flatMap((p) => p.colors ?? []))
).sort();

export const allGenders = Array.from(
  new Set(products.flatMap((p) => (p.gender ? [p.gender] : [])))
).sort();

export const allCategories = Array.from(
  new Set(products.flatMap((p) => (p.category ? [p.category] : [])))
).sort();
