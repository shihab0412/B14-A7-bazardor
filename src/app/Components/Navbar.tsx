
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "../lib/auth-client";

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
  const [date, setDate] = useState("");

  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    setDate(
      new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
  }, []);

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      alert("Sign Out করা যায়নি। আবার চেষ্টা করুন।");
      return;
    }

    setMenuOpen(false);
    router.push("/signin");
    router.refresh();
  };

  // Profile Avatar
  const ProfileAvatar = ({ size = "size-9" }: { size?: string }) => (
    <div
      className={`${size} shrink-0 overflow-hidden rounded-full border-2 border-green-600 bg-green-100`}
    >
      {session?.user?.image ? (
        <img
          src={session.user.image}
          alt="Profile"
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center font-bold text-green-700">
          {session?.user?.name?.charAt(0).toUpperCase() || "U"}
        </div>
      )}
    </div>
  );

  // Profile Link
  const ProfileLink = ({ mobile = false }: { mobile?: boolean }) => (
    <Link
      href="/profile"
      onClick={() => mobile && setMenuOpen(false)}
      className={`flex items-center gap-2 rounded-lg transition hover:bg-base-200 ${
        mobile ? "flex-1 border border-base-300 p-2" : "px-2 py-1"
      }`}
    >
      <ProfileAvatar size={mobile ? "size-10" : "size-9"} />

      <span className="max-w-32 truncate text-sm font-semibold">
        {session?.user?.name || "আমার প্রোফাইল"}
      </span>
    </Link>
  );

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

          {!isPending && (
            session ? (
              <>
                <ProfileLink />

                <button
                  onClick={handleSignOut}
                  className="btn bg-red-600 btn-sm text-white"
                >
                  সাইন আউট
                </button>
              </>
            ) : (
              <>
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
              </>
            )
          )}

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

          {/* Mobile Auth */}
          <div className="mt-3 flex gap-2">

            {!isPending && (
              session ? (
                <>
                  <ProfileLink mobile />

                  <button
                    onClick={handleSignOut}
                    className="btn bg-red-600 btn-sm flex-1 text-white"
                  >
                    সাইন আউট
                  </button>
                </>
              ) : (
                <>
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
                </>
              )
            )}

          </div>

        </div>
      )}

    </header>
  );
}
