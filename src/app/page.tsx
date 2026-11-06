
"use client";

import { useEffect, useState } from "react";
import Hero from "./Components/Hero";
import ProductCard, { type Product } from "../app/Components/ProductCard";
import { getProducts } from "./lib/api";

function ProductSkeleton() {
  return (
    <div className="card border border-base-200 bg-base-100 p-4 shadow-sm">
      <div className="skeleton mb-4 h-28 w-full" />
      <div className="skeleton mb-2 h-5 w-3/4" />
      <div className="skeleton mb-2 h-4 w-1/2" />
      <div className="skeleton h-6 w-2/3" />
    </div>
  );
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();
        setProducts(data);
      } catch {
        setError("বাজার দরের তথ্য আনা যায়নি। আবার চেষ্টা করো।");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const increasedProducts = [...products]
    .filter((product) => product.change > 0)
    .sort((a, b) => b.change - a.change)
    .slice(0, 6);

  const decreasedProducts = [...products]
    .filter((product) => product.change < 0)
    .sort((a, b) => a.change - b.change)
    .slice(0, 6);

  return (
    <main>
      <Hero />

      <div className="mx-auto w-full max-w-6xl space-y-12 px-4 py-10">

        {loading ? (
          <section>
            <h2 className="mb-5 text-2xl font-bold">পণ্য লোড হচ্ছে...</h2>
            <div className="grid grid-cols-1 gap-4 min-[430px]:grid-cols-2 sm:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          </section>
        ) : error ? (
          <div className="alert alert-error">
            <span>{error}</span>
            <button
              className="btn btn-sm"
              onClick={() => window.location.reload()}
            >
              আবার চেষ্টা করো
            </button>
          </div>
        ) : (
          <>
            <section>
              <h2 className="mb-5 text-2xl font-bold text-gray-800">
                📈 আজ দাম বেড়েছে
              </h2>

              {increasedProducts.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 min-[430px]:grid-cols-2 sm:grid-cols-3">
                  {increasedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <p>দাম বেড়েছে এমন কোনো পণ্য পাওয়া যায়নি।</p>
              )}
            </section>

            <section>
              <h2 className="mb-5 text-2xl font-bold text-gray-800">
                📉 আজ দাম কমেছে
              </h2>

              {decreasedProducts.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 min-[430px]:grid-cols-2 sm:grid-cols-3">
                  {decreasedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <p>দাম কমেছে এমন কোনো পণ্য পাওয়া যায়নি।</p>
              )}
            </section>

            <section id="সব-পণ্য">
              <h2 className="mb-2 text-2xl font-bold text-gray-900">
                🛒 সব পণ্য
              </h2>
              <p className="mb-5 text-sm text-gray-700">
                বাজারের সব পণ্যের আজকের দাম এক জায়গায় দেখুন।
              </p>

              <div className="grid grid-cols-1 gap-4 min-[430px]:grid-cols-2 sm:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
