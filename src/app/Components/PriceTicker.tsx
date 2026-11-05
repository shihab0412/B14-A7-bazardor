
"use client";

import { useEffect, useState } from "react";

type Product = {
  id: string | number;
  name: string;
  price: number;
  change: number;
  emoji?: string;
};

const demoProducts: Product[] = [
  { id: 1, name: "স্বর্ণমতি চাল", price: 58, change: 2.5, emoji: "🍚" },
  { id: 2, name: "মিনিকেট চাল", price: 99, change: -1.2, emoji: "🍚" },
  { id: 3, name: "বাটাম সয়াবিন তেল", price: 66, change: 0.8, emoji: "🛢️" },
  { id: 4, name: "মসুর ডাল", price: 120, change: 2.9, emoji: "🫘" },
  { id: 5, name: "ছোলা", price: 82, change: -2.4, emoji: "🫘" },
  { id: 6, name: "আলু", price: 35, change: -3.5, emoji: "🥔" },
  { id: 7, name: "পেঁয়াজ", price: 60, change: 1.5, emoji: "🧅" },
  { id: 8, name: "বেগুন", price: 44, change: 0.5, emoji: "🍆" },
];

export default function PriceTicker({
  products = demoProducts,
}: {
  products?: Product[];
}) {
  const [items, setItems] = useState<Product[]>(products);

  useEffect(() => {
    setItems(products.length ? products : demoProducts);
  }, [products]);

  const bn = (value: number) =>
    new Intl.NumberFormat("bn-BD", {
      maximumFractionDigits: 1,
    }).format(value);

  if (!items.length) return null;

  const tickerItems = [...items, ...items];

  return (
    <div className="w-full overflow-hidden border-b border-base-300 bg-base-100">
      <div className="flex w-full items-center">

        <div className="flex shrink-0 items-center gap-2 bg-green-700 px-3 py-3 text-xs font-bold text-white sm:px-5">
          📈 আজকের বাজারদর
        </div>

        <div className="ticker-wrap min-w-0 flex-1 overflow-hidden py-3">
          <div className="ticker-track flex w-max items-center">

            {tickerItems.map((product, index) => (
              <div
                key={`${product.id}-${index}`}
                className="flex shrink-0 items-center gap-2 border-r border-base-300 px-4 text-xs sm:px-6"
              >
                {/* Product Emoji */}
                <span className="text-base">
                  {product.emoji || "🛒"}
                </span>

                <span className="font-semibold text-base-content">
                  {product.name}
                </span>

                <span className="font-bold">
                  ৳{bn(product.price)}
                </span>

                <span
                  className={`badge badge-xs font-bold ${
                    product.change > 0
                      ? "badge-error"
                      : product.change < 0
                      ? "badge-success"
                      : "badge-ghost"
                  }`}
                >
                  {product.change > 0 ? "▲" : product.change < 0 ? "▼" : "—"}
                  {bn(Math.abs(product.change))}%
                </span>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}
