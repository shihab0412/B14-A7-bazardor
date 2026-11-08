
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Hero() {
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(new Date().toLocaleDateString("bn-BD"));
  }, []);

  return (
    <section className="mx-auto w-full max-w-6xl px-4">
      <div className="card overflow-hidden border border-base-200 bg-base-100 shadow-sm">
        <div className="card-body flex flex-col items-center justify-between gap-5 p-5 sm:flex-row sm:px-7 sm:py-6">

          {/* Left Content */}
          <div className="flex-1 text-center sm:text-left">
            <div className="rounded-full w-fit mb-3 px-3 py-3 text-xs font-bold text-green-800 bg-green-100 sm:px-5">
              🗓️ {today || "আজকের বাজারদর"}
            </div>

            <h1 className="text-3xl font-extrabold leading-tight text-base-content sm:text-3xl">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="mt-5 max-w-lg text-base leading-6 text-base-content/80 sm:text-lg">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
              বাজারের সর্বশেষ দর, সর্বনিম্ন-সর্বোচ্চ এবং আগের দিনের
              দামের তুলনা দেখুন সহজেই।
            </p>

            <Link
              href="#সব-পণ্য"
              className="btn bg-green-700 btn-sm mt-5 px-5 text-white"
            >
              সব পণ্য দেখুন →
            </Link>
          </div>

          {/* Right Illustration */}
          <div className="flex w-full shrink-0 items-center justify-center sm:w-[30%]">
            <img
              src="/bazar-hero.png"
              alt="Bazar Hero"
              className="h-full w-full object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
