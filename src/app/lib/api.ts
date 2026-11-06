
import type { Product } from "../Components/ProductCard";

const API_URL =
  "https://openapi.programming-hero.com/api/bazardor/products";

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

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(API_URL, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: ApiProduct[] = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Invalid API response");
  }

  return data.map((item) => ({
    id: item.id,
    name: item.nameBn,
    slug: item.slug,
    emoji: item.image,
    unit:
      item.unit === "kg"
        ? "প্রতি কেজি"
        : item.unit === "liter"
          ? "প্রতি লিটার"
          : item.unit === "dozen"
            ? "প্রতি ডজন"
            : item.unit,
    price: item.today,
    change: item.change?.pct ?? 0,
  }));
}
