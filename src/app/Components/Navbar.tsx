
"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const categories = [
  { name: "চাল", slug: "chal", emoji: "🍚" },
  { name: "ডাল", slug: "dal", emoji: "🫘" },
  { name: "তেল", slug: "tel", emoji: "🛢️" },
  { name: "সবজি", slug: "sobji", emoji: "🥬" },
  { name: "মাছ", slug: "mach", emoji: "🐟" },
  { name: "মাংস", slug: "mangsho", emoji: "🍗" },
  { name: "মসলা", slug: "mosla", emoji: "🌶️" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const date = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-50 border-b border-base-200 bg-base-100">

      {/* Main Navbar */}
      <div className="navbar mx-auto max-w-6xl px-4">

        {/* Logo */}
        <div className="navbar-start">
          <Link href="/" className="flex items-center gap-2">
            <div className="grid size-10 place-items-center rounded-xl bg-green-700 text-xl text-white">
              <img src="/logo-icon.png" alt="" />
            </div>

            <div>
              <h1 className="text-xl font-extrabold leading-tight">
                বাজার দর
              </h1>
              <p className="text-[10px] text-gray-950">
                {date}
              </p>
            </div>
          </Link>
        </div>

        {/* Desktop Auth */}
        <div className="navbar-end hidden gap-3 sm:flex">
          <Link
            href="/signin"
            className="btn btn-ghost btn-sm"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="btn bg-green-700 btn-sm text-white"
          >
            সাইন আপ
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="navbar-end sm:hidden">
          <button
            className="btn btn-ghost btn-square"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <span className="text-xl">✕</span>
            ) : (
              <span className="text-2xl">☰</span>
            )}
          </button>
        </div>
      </div>

      {/* Desktop Category Menu */}
      <nav className="hidden border-t border-base-200 sm:block">
        <div className="mx-auto max-w-6xl px-4">
          <ul className="menu menu-horizontal flex flex-wrap items-center gap-1 px-0 py-1">

            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/category/${category.slug}`}
                  className={
                    pathname === `/category/${category.slug}`
                      ? "active font-bold text-success"
                      : "font-medium"
                  }
                >
                  <span>{category.emoji}</span>
                  {category.name}
                </Link>
              </li>
            ))}

          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-base-200 bg-base-100 p-4 sm:hidden">

          <ul className="menu grid grid-cols-2 gap-2 rounded-box bg-base-200 p-2">

            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/category/${category.slug}`}
                  onClick={() => setMenuOpen(false)}
                  className={
                    pathname === `/category/${category.slug}`
                      ? "active font-bold text-success"
                      : "font-medium"
                  }
                >
                  {category.emoji} {category.name}
                </Link>
              </li>
            ))}

          </ul>

          <div className="mt-3 flex gap-2">
            <Link
              href="/signin"
              onClick={() => setMenuOpen(false)}
              className="btn btn-outline btn-sm flex-1"
            >
              সাইন ইন
            </Link>

            <Link
              href="/signup"
              onClick={() => setMenuOpen(false)}
              className="btn bg-green-700 btn-sm flex-1 text-white"
            >
              সাইন আপ
            </Link>
          </div>

        </div>
      )}

    </header>
  );
}
