
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "../lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
    }
  }, [session]);

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg text-success"></span>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <h2 className="text-xl font-bold">প্রোফাইল দেখতে Login করুন</h2>
        <Link href="/signin" className="btn bg-green-700 text-white">
          সাইন ইন
        </Link>
      </div>
    );
  }

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    if (!name.trim()) {
      setMessage("নাম লিখুন");
      return;
    }

    setSaving(true);

    const { error } = await authClient.updateUser({
      name: name.trim(),
    });

    setSaving(false);

    if (error) {
      setMessage(error.message || "নাম পরিবর্তন করা যায়নি");
      return;
    }

    setMessage("নাম সফলভাবে পরিবর্তন হয়েছে!");
  };

  const handleGoogleSync = async () => {
    setMessage("");
    setSyncing(true);

    const { error } = await authClient.linkSocial({
      provider: "google",
      callbackURL: "/profile",
    });

    if (error) {
      setMessage(error.message || "Google Profile Sync করা যায়নি");
      setSyncing(false);
    }
  };

  return (
    <main className="min-h-screen bg-base-200 px-4 py-12">
      <div className="mx-auto max-w-lg rounded-2xl bg-base-100 p-6 shadow-lg sm:p-8">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 size-24 overflow-hidden rounded-full border-4 border-green-600 bg-green-100">
            {session.user.image ? (
              <img
                src={session.user.image}
                alt="Profile Picture"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-green-700">
                {session.user.name?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
          </div>

          <h1 className="text-2xl font-extrabold">আমার প্রোফাইল</h1>
          <p className="mt-1 text-sm text-base-content/60">
            আপনার Account Information
          </p>
        </div>

        <div className="mb-5">
          <label className="mb-2 block font-semibold">Email Address</label>
          <input
            type="email"
            value={session.user.email}
            readOnly
            className="input input-bordered w-full bg-base-200"
          />
        </div>

        <form onSubmit={handleUpdate}>
          <label className="mb-2 block font-semibold">আপনার নাম</label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="আপনার নাম লিখুন"
            className="input input-bordered w-full"
            required
          />

          <button
            type="submit"
            disabled={saving}
            className="btn mt-4 w-full bg-green-700 text-white"
          >
            {saving ? "আপডেট হচ্ছে..." : "নাম আপডেট করুন"}
          </button>
        </form>

        <button
          type="button"
          onClick={handleGoogleSync}
          disabled={syncing}
          className="btn mt-3 w-full border border-green-700 bg-white text-green-800"
        >
          {syncing ? "Google-এর সঙ্গে Connect হচ্ছে..." : "Google Profile Picture Sync করুন"}
        </button>

        {message && (
          <p className="mt-4 text-center text-sm font-medium">
            {message}
          </p>
        )}

        <button
          onClick={() => router.push("/")}
          className="btn btn-ghost mt-3 w-full"
        >
          হোম পেজে ফিরে যান
        </button>
      </div>
    </main>
  );
}
