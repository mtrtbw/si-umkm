import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/produk?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white flex flex-col"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url('/umkm-banner.avif')",
      }}
    >
      {/* Navbar */}
      <div className="w-full px-6 py-4 flex items-center justify-center bg-black bg-opacity-50 shadow-md">
        <div className="w-full max-w-6xl flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Logo Si-UMKM"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>

          {/* Navigasi */}
          <div className="flex items-center gap-4">
            <Link href="/produk">
              <button className="border border-yellow-400 hover:bg-yellow-400 hover:text-black text-white font-semibold px-5 py-2 rounded-xl transition">
                Produk
              </button>
            </Link>
            <Link href="/login">
              <button className="border border-yellow-400 hover:bg-yellow-400 hover:text-black text-white font-semibold px-5 py-2 rounded-xl transition">
                Masuk / Daftar
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* Konten utama */}
      <div className="flex-grow flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Selamat Datang di <span className="text-yellow-400">Si-UMKM</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 max-w-xl mb-6">
          Platform digital untuk mendukung dan mempromosikan produk UMKM
          Indonesia. Mari beli dan bangga buatan lokal!
        </p>
        {/* Form Pencarian */}
        <form onSubmit={handleSearch} className="w-full flex justify-center">
          <div className="flex w-full max-w-2xl">
            <input
              type="text"
              placeholder="Cari produk UMKM..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-grow px-5 py-3 rounded-l-md text-white focus:outline-none w-full"
            />
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-r-md transition"
            >
              Cari
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
