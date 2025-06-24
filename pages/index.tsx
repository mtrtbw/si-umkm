import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { auth } from "@/lib/firebase";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      unsubscribe();
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/produk?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
    setShowDropdown(false);
    router.reload(); // atau arahkan ke halaman login
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
        <div className="w-full max-w-6xl flex items-center justify-between relative">
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
            {userEmail && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="text-yellow-300 font-semibold hover:underline"
                >
                  {userEmail}
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg z-10 w-40">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-yellow-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            <Link href="/produk">
              <button className="border border-yellow-400 hover:bg-yellow-400 hover:text-black text-white font-semibold px-5 py-2 rounded-xl transition">
                Produk
              </button>
            </Link>
            <Link href="/login-user">
              <button className="border border-yellow-400 hover:bg-yellow-400 hover:text-black text-white font-semibold px-5 py-2 rounded-xl transition">
                Login User
              </button>
            </Link>
            <Link href="/login">
              <button className="border border-yellow-400 hover:bg-yellow-400 hover:text-black text-white font-semibold px-5 py-2 rounded-xl transition">
                Admin
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
