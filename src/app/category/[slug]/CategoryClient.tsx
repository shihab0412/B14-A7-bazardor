"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Product = {
  id: number | string;
  slug: string;
  name: string;
  emoji: string;
  unit: string;
  price: number;
  change: number;
};

const categories: Record<string, { name: string; emoji: string }> = {
  chal: { name: "চাল", emoji: "🍚" },
  dal: { name: "ডাল", emoji: "🫘" },
  tel: { name: "তেল", emoji: "🛢️" },
  sobji: { name: "সবজি", emoji: "🥬" },
  mach: { name: "মাছ", emoji: "🐟" },
  mangsho: { name: "মাংস", emoji: "🍗" },
  "dim-dudh": { name: "ডিম-দুধ", emoji: "🥛" },
  mosla: { name: "মসলা", emoji: "🌶️" },
};

const API_URLS = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

export default function CategoryClient({ slug }: { slug: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sort, setSort] = useState("default");

  const category = categories[slug];

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      setError("");

      try {
        let loadedProducts: Product[] = [];

        for (const baseUrl of API_URLS) {
          try {
            const response = await fetch(
              `${baseUrl}/products?category=${encodeURIComponent(slug)}`,
              { cache: "no-store" }
            );

            if (!response.ok) continue;

            const result = await response.json();

            const list = Array.isArray(result)
              ? result
              : result?.data?.products ??
                result?.data ??
                result?.products ??
                result?.result ??
                [];

            if (!Array.isArray(list)) continue;

            loadedProducts = list.map((item: any, index: number) => ({
              id: item.id ?? item._id ?? index + 1,
              slug: item.slug ?? String(item.id ?? index + 1),
              name: item.nameBn ?? item.name ?? item.title ?? "পণ্য",
              emoji: item.image ?? item.emoji ?? "🛒",
              unit:
                item.unit === "kg"
                  ? "প্রতি কেজি"
                  : item.unit === "liter"
                  ? "প্রতি লিটার"
                  : item.unit === "dozen"
                  ? "প্রতি ডজন"
                  : item.unit ?? "প্রতি কেজি",
              price: Number(item.today ?? item.price ?? 0),
              change: Number(
                typeof item.change === "object"
                  ? item.change?.pct ?? 0
                  : item.change ?? 0
              ),
            }));

            if (loadedProducts.length > 0) break;
          } catch (err) {
            console.error("Category API error:", err);
          }
        }

        if (loadedProducts.length === 0) {
          setError("এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।");
        }

        setProducts(loadedProducts);
      } catch (err) {
        setError("পণ্যের তথ্য লোড করা যায়নি।");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [slug]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "low") return a.price - b.price;
    if (sort === "high") return b.price - a.price;
    return 0;
  });

  if (!category) {
    return (
      <main className="mx-auto min-h-screen max-w-6xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          ক্যাটাগরি পাওয়া যায়নি
        </h1>
        <Link href="/" className="btn btn-success mt-5 text-white">
          হোমে ফিরে যাও
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-8 sm:py-12">
      <div className="mb-8 rounded-2xl bg-green-100 p-6 sm:p-8">
        <p className="text-sm font-semibold text-green-800">
          বাজার দর / ক্যাটাগরি
        </p>

        <h1 className="mt-2 text-3xl font-extrabold text-gray-900">
          {category.emoji} {category.name}
        </h1>

        <p className="mt-2 text-gray-700">
          {category.name} ক্যাটাগরির আজকের বাজারদর দেখুন।
        </p>
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-gray-900">
          সকল {category.name} পণ্য
          {!loading && (
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({products.length} টি)
            </span>
          )}
        </h2>

        <select
          className="select select-bordered w-full max-w-52 bg-white text-gray-900"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="default">ডিফল্ট সাজানো</option>
          <option value="low">দাম: কম থেকে বেশি</option>
          <option value="high">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 min-[430px]:grid-cols-2 sm:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-200 bg-white p-5"
            >
              <div className="skeleton mx-auto h-20 w-20 rounded-full" />
              <div className="skeleton mx-auto mt-4 h-5 w-2/3" />
              <div className="skeleton mx-auto mt-3 h-5 w-1/2" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="rounded-xl bg-white p-10 text-center">
          <p className="text-gray-700">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-success mt-4 text-white"
          >
            আবার চেষ্টা করো
          </button>
        </div>
      ) : sortedProducts.length === 0 ? (
        <div className="rounded-xl bg-white p-10 text-center text-gray-600">
          এই ক্যাটাগরিতে কোনো পণ্য নেই।
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 min-[430px]:grid-cols-2 sm:grid-cols-3">
          {sortedProducts.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="card border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="card-body items-center text-center">
                <div className="text-6xl">{product.emoji}</div>

                <h3 className="text-lg font-bold text-gray-900">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-500">{product.unit}</p>

                <p className="text-xl font-extrabold text-green-700">
                  ৳{product.price.toLocaleString("bn-BD")}
                </p>

                <span
                  className={`badge ${
                    product.change > 0
                      ? "badge-error"
                      : product.change < 0
                      ? "badge-success"
                      : "badge-ghost"
                  }`}
                >
                  {product.change > 0
                    ? "▲"
                    : product.change < 0
                    ? "▼"
                    : "—"}{" "}
                  {Math.abs(product.change).toLocaleString("bn-BD")}%
                </span>

                <span className="btn btn-success btn-sm mt-2 text-white">
                  বিস্তারিত দেখুন
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}