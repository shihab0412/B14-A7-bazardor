
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProducts } from "../../lib/api";
import type { Product } from "../../Components/ProductCard";

type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

type ProductDetails = Product & {
  markets?: Market[];
};

export default function ProductDetailsPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://openapi.programming-hero.com/api/bazardor/products",
          { cache: "no-store" }
        );

        if (!response.ok) {
          throw new Error("পণ্যের তথ্য পাওয়া যায়নি");
        }

        const result = await response.json();
        const list = Array.isArray(result)
          ? result
          : result?.data?.products ?? result?.data ?? result?.products ?? [];

        const found = list.find(
          (item: any) => item.slug === slug
        );

        if (!found) {
          throw new Error("এই পণ্যটি পাওয়া যায়নি");
        }

        setProduct({
          id: found.id,
          name: found.nameBn ?? found.name,
          slug: found.slug,
          emoji: found.image ?? "🛒",
          unit: found.unit === "kg"
            ? "প্রতি কেজি"
            : found.unit ?? "প্রতি কেজি",
          price: Number(found.today ?? 0),
          change: Number(found.change?.pct ?? 0),
          markets: found.markets ?? [],
        });
      } catch (err) {
        setError("পণ্যের তথ্য লোড করা যায়নি। আবার চেষ্টা করো।");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [slug]);

  if (loading) {
    return (
      <main className="mx-auto min-h-screen max-w-6xl px-4 py-12">
        <div className="skeleton h-64 w-full rounded-2xl"></div>
        <div className="skeleton mt-5 h-10 w-1/2"></div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="mx-auto min-h-screen max-w-6xl px-4 py-16 text-center">
        <p className="text-lg font-semibold text-red-600">
          {error || "পণ্য পাওয়া যায়নি"}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="btn btn-success mt-5 text-white"
        >
          আবার চেষ্টা করো
        </button>
      </main>
    );
  }

  const prices = product.markets ?? [];
  const allPrices = prices.flatMap((market) => [
    market.min,
    market.max,
  ]);
  const minPrice = allPrices.length ? Math.min(...allPrices) : 0;
  const maxPrice = allPrices.length ? Math.max(...allPrices) : 0;
  const averagePrice = allPrices.length
    ? allPrices.reduce((sum, price) => sum + price, 0) /
      allPrices.length
    : 0;

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-8 sm:py-12">
      <div className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm sm:p-10">
        <div className="flex flex-col items-center gap-5 sm:flex-row">
          <div className="flex h-36 w-36 items-center justify-center rounded-2xl bg-green-50 text-7xl">
            {product.emoji}
          </div>

          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold text-gray-900">
              {product.name}
            </h1>
            <p className="mt-2 text-gray-500">{product.unit}</p>
            <p className="mt-4 text-3xl font-bold text-green-700">
              ৳{product.price.toLocaleString("bn-BD")}
            </p>
            <span
              className={`badge mt-2 ${
                product.change > 0
                  ? "badge-error"
                  : product.change < 0
                  ? "badge-success"
                  : "badge-ghost"
              }`}
            >
              {product.change > 0 ? "▲" : product.change < 0 ? "▼" : "—"}{" "}
              {Math.abs(product.change).toLocaleString("bn-BD")}%
            </span>
          </div>
        </div>
      </div>

      <h2 className="mb-5 mt-10 text-2xl font-bold text-gray-900">
        বাজারদরের সারসংক্ষেপ
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-green-100 bg-white p-5 shadow-sm">
          <p className="text-gray-500">সর্বনিম্ন দাম</p>
          <p className="mt-2 text-2xl font-bold text-green-700">
            {allPrices.length
              ? `৳${minPrice.toLocaleString("bn-BD")}`
              : "তথ্য নেই"}
          </p>
        </div>

        <div className="rounded-xl border border-green-100 bg-white p-5 shadow-sm">
          <p className="text-gray-500">সর্বোচ্চ দাম</p>
          <p className="mt-2 text-2xl font-bold text-red-600">
            {allPrices.length
              ? `৳${maxPrice.toLocaleString("bn-BD")}`
              : "তথ্য নেই"}
          </p>
        </div>

        <div className="rounded-xl border border-green-100 bg-white p-5 shadow-sm">
          <p className="text-gray-500">গড় দাম</p>
          <p className="mt-2 text-2xl font-bold text-blue-700">
            {allPrices.length
              ? `৳${Math.round(averagePrice).toLocaleString("bn-BD")}`
              : "তথ্য নেই"}
          </p>
        </div>
      </div>

      <h2 className="mb-5 mt-10 text-2xl font-bold text-gray-900">
        বিভিন্ন বাজারে দাম
      </h2>

      {prices.length > 0 ? (
        <div className="overflow-x-auto rounded-xl border border-green-100 bg-white">
          <table className="table">
            <thead>
              <tr className="bg-green-50 text-gray-800">
                <th>বাজার</th>
                <th>এলাকা</th>
                <th>সর্বনিম্ন দাম</th>
                <th>সর্বোচ্চ দাম</th>
              </tr>
            </thead>
            <tbody>
              {prices.map((market, index) => (
                <tr key={index}>
                  <td className="font-semibold text-gray-900">
                    {market.market}
                  </td>
                  <td>{market.division}</td>
                  <td className="font-semibold text-green-700">
                    ৳{market.min.toLocaleString("bn-BD")}
                  </td>
                  <td className="font-semibold text-red-600">
                    ৳{market.max.toLocaleString("bn-BD")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="rounded-xl bg-white p-6 text-gray-600">
          এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
        </p>
      )}
    </main>
  );
}
