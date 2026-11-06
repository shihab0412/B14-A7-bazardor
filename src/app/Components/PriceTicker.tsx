
"use client";

import { useEffect, useState } from "react";
import { getProducts } from "../lib/api";
import type { Product } from "../Components/ProductCard";

export default function PriceTicker() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadTickerProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Ticker API error:", error);
      }
    }

    loadTickerProducts();
  }, []);

  if (products.length === 0) {
    return null;
  }

  const tickerItems = [...products, ...products];

  return (
    <div className="w-full overflow-hidden border-y border-green-100 bg-white py-3">
      <div className="flex items-center">
        <div className="shrink-0 bg-green-700 px-4 py-2 text-sm font-bold text-white">
          আজকের বাজারদর
        </div>

        <div className="ticker-wrap flex-1">
          <div className="ticker-track flex w-max items-center gap-8">
            {tickerItems.map((product, index) => (
              <div
                key={`${product.id}-${index}`}
                className="flex shrink-0 items-center gap-2 text-sm"
              >
                <span className="text-lg">{product.emoji}</span>

                <span className="font-semibold text-gray-900">
                  {product.name}
                </span>

                <span className="font-bold text-gray-900">
                  {product.price.toLocaleString("bn-BD")} টাকা
                </span>

                <span
                  className={`font-bold ${
                    product.change > 0
                      ? "text-red-600"
                      : product.change < 0
                        ? "text-green-700"
                        : "text-gray-600"
                  }`}
                >
                  {product.change > 0
                    ? "▲"
                    : product.change < 0
                      ? "▼"
                      : "—"}{" "}
                  {Math.abs(product.change).toLocaleString("bn-BD")}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
