
import Link from "next/link";

export type Product = {
  id: string | number;
  name: string;
  slug: string;
  emoji: string;
  unit: string;
  price: number;
  change: number;
};

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  const bn = (value: number) =>
    new Intl.NumberFormat("bn-BD", {
      maximumFractionDigits: 1,
    }).format(value);

  const isUp = product.change > 0;
  const isDown = product.change < 0;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="card card-compact border border-base-200 bg-base-100 transition duration-200 hover:-translate-y-1 hover:border-success/40 hover:shadow-md"
    >
      <div className="card-body gap-2 p-3 sm:p-3.5">

        {/* Product Info */}
        <div className="flex items-center gap-3">

          <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-base-200 text-xl">
            {product.emoji}
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-sm font-bold text-base-content">
              {product.name}
            </h3>

            <p className="text-[10px] text-2xl font-bold text-base-content/50">
              {product.unit}
            </p>
          </div>

        </div>

        {/* Price */}
        <div className="flex items-end justify-between gap-2">

          <div>
            <p className="text-[13px] text-base-content/50">
              আজকের দাম
            </p>

            <p className="text-sm font-extrabold text-base-content">
              {bn(product.price)} টাকা
            </p>
          </div>

          {/* Price Change */}
          <span
            className={`badge badge-sm font-bold ${
              isUp
                ? "badge-error"
                : isDown
                ? "badge-success"
                : "badge-ghost"
            }`}
          >
            {isUp ? "▲" : isDown ? "▼" : "—"}
            {bn(Math.abs(product.change))}%
          </span>

        </div>

      </div>
    </Link>
  );
}
