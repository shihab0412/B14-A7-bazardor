
import type { Product } from "../Components/ProductCard";

const API_URLS = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

type ApiProduct = {
  id: number;
  slug: string;
  nameBn: string;
  unit: string;
  image: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
};

function normalizeProducts(data: any): Product[] {
  const list = Array.isArray(data)
    ? data
    : data?.data?.products ??
      data?.data ??
      data?.products ??
      data?.result ??
      [];

  if (!Array.isArray(list)) return [];

  return list.map((item: any, index: number) => ({
    id: item.id ?? item._id ?? index + 1,
    name: item.nameBn ?? item.name ?? item.title ?? `পণ্য ${index + 1}`,
    slug: item.slug ?? String(item.id ?? index + 1),
    emoji: item.image ?? item.emoji ?? "🛒",
    unit:
      item.unit === "kg"
        ? "প্রতি কেজি"
        : item.unit === "liter"
          ? "প্রতি লিটার"
          : item.unit === "dozen"
            ? "প্রতি ডজন"
            : item.unit ?? "প্রতি কেজি",
    price: Number(item.today ?? item.price ?? item.current_price ?? 0),
    change: Number(
      typeof item.change === "object"
        ? item.change?.pct ?? 0
        : item.change ?? item.price_change ?? 0
    ),
  }));
}

async function fetchFromApi(endpoint: string): Promise<Product[]> {
  let lastError: unknown;

  for (const baseUrl of API_URLS) {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        cache: "no-store",
      });

      if (!response.ok) continue;

      const result = await response.json();
      const products = normalizeProducts(result);

      if (products.length > 0) return products;
    } catch (error) {
      lastError = error;
      console.error("API error:", baseUrl, error);
    }
  }

  throw lastError ?? new Error("পণ্যের তথ্য পাওয়া যায়নি।");
}

export async function getProducts(): Promise<Product[]> {
  return fetchFromApi("/products");
}

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  return fetchFromApi(
    `/products?category=${encodeURIComponent(category)}`
  );
}
