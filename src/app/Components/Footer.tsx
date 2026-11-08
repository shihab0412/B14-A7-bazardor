
import Link from "next/link";

const categories = [
  { name: "চাল", slug: "chal" },
  { name: "ডাল", slug: "dal" },
  { name: "তেল", slug: "tel" },
  { name: "সবজি", slug: "sobji" },
  { name: "মাছ", slug: "mach" },
  { name: "মাংস", slug: "mangsho" },
  { name: "মসলা", slug: "mosla" },
];

export default function Footer() {
  return (
    <footer className="border-t border-base-300 bg-base-100">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Footer Main */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Link href="/" className="mb-3 inline-flex items-center gap-2">
              <div className="grid size-10 place-items-center rounded-xl bg-green-700 text-xl text-white">
                <img src="/logo-icon.png" alt="BazarDor Logo" />
              </div>

              <span className="text-2xl font-extrabold">
                বাজার <span className="text-green-700">দর</span>
              </span>
            </Link>

            <p className="max-w-xs text-sm leading-7 text-base-content/70">
              প্রতিদিনের বাজারের সঠিক দাম জানুন সহজেই।
              বাজার করার আগে পণ্যের দাম যাচাই করুন এবং
              সচেতনভাবে কেনাকাটা করুন।
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-bold">গুরুত্বপূর্ণ লিংক</h3>

            <ul className="space-y-3 text-sm text-base-content/70">
              <li>
                <Link href="/" className="transition hover:text-green-700">
                  হোম
                </Link>
              </li>

              <li>
                <Link href="/profile" className="transition hover:text-green-700">
                  আমার প্রোফাইল
                </Link>
              </li>

              <li>
                <Link href="/signin" className="transition hover:text-green-700">
                  সাইন ইন
                </Link>
              </li>

              <li>
                <Link href="/signup" className="transition hover:text-green-700">
                  সাইন আপ
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 text-lg font-bold">পণ্যের ক্যাটাগরি</h3>

            <ul className="grid grid-cols-2 gap-3 text-sm text-base-content/70">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/category/${category.slug}`}
                    className="transition hover:text-green-700"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-bold">আমাদের সম্পর্কে</h3>

            <p className="text-sm leading-7 text-base-content/70">
              বাজার দর একটি অনলাইন বাজারদর প্ল্যাটফর্ম।
              আমাদের লক্ষ্য হলো ক্রেতাদের প্রতিদিনের
              বাজারদর সম্পর্কে তথ্য দেওয়া।
            </p>

            <Link
              href="/"
              className="mt-4 inline-block font-semibold text-green-700 hover:text-green-800"
            >
              বাজারদর দেখুন →
            </Link>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="mt-10 border-t border-base-300 pt-6">
          <div className="flex flex-col items-center justify-between gap-3 text-center text-sm text-base-content/60 sm:flex-row sm:text-left">

            <p>
              © {new Date().getFullYear()} বাজার দর। সর্বস্বত্ব সংরক্ষিত।
            </p>

      
          </div>
        </div>

      </div>
    </footer>
  );
}
