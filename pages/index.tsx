import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "@/lib/firebase";
import { FiMenu, FiX } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUserEmail(user?.email ?? null);
    });
    return () => unsubscribe();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/produk?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
    setUserEmail(null);
    setShowUserMenu(false);
    router.push("/");
  };

  const getInitial = (email: string) => email.charAt(0).toUpperCase();

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white flex flex-col"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url('/umkm-banner.avif')",
      }}
    >
      {/* Navbar */}
      <div className="w-full px-6 py-4 flex items-center justify-between bg-black bg-opacity-50 shadow-md">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Logo Si-UMKM"
            width={48}
            height={48}
            className="object-contain"
          />
          <span className="text-xl font-semibold hidden sm:block">Si-UMKM</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-4 relative">
          <Link href="/produk">
            <button className="border border-yellow-400 hover:bg-yellow-400 hover:text-black text-white font-semibold px-4 py-2 rounded-xl transition">
              Produk
            </button>
          </Link>
          <Link href="/pelatihan">
            <button className="border border-yellow-400 hover:bg-yellow-400 hover:text-black text-white font-semibold px-4 py-2 rounded-xl transition">
              Pelatihan
            </button>
          </Link>

          {!userEmail && (
            <Link href="/login-user">
              <button className="border border-yellow-400 hover:bg-yellow-400 hover:text-black text-white font-semibold px-4 py-2 rounded-xl transition">
                Login User
              </button>
            </Link>
          )}

          {userEmail && (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 text-yellow-300 font-medium border border-yellow-400 px-3 py-1.5 rounded-xl hover:bg-yellow-400 hover:text-black"
              >
                <FaUserCircle className="text-lg" />
                <span>{getInitial(userEmail)}</span>
              </button>
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg text-black z-50">
                  <div className="px-4 py-2 border-b font-semibold text-sm">{userEmail}</div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-red-600 text-left px-4 py-2 hover:bg-red-100 text-sm"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          <Link href="/login">
            <button className="border border-yellow-400 hover:bg-yellow-400 hover:text-black text-white font-semibold px-4 py-2 rounded-xl transition">
              Login Admin
            </button>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="sm:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-yellow-400 text-2xl"
          >
            <FiMenu />
          </button>
        </div>
      </div>

      {/* Sidebar Mobile */}
      <div
        className={`fixed inset-0 z-50 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        } sm:hidden`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black bg-opacity-60"
          onClick={() => setSidebarOpen(false)}
        ></div>

        {/* Sidebar */}
        <div className="absolute top-0 right-0 w-64 h-full bg-black text-white shadow-lg p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-yellow-400">Menu</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-2xl text-yellow-400"
            >
              <FiX />
            </button>
          </div>

          <Link href="/produk" onClick={() => setSidebarOpen(false)}>
            <button className="text-left text-white w-full px-4 py-2 rounded hover:bg-yellow-500 hover:text-black">
              Produk
            </button>
          </Link>
          <Link href="/pelatihan" onClick={() => setSidebarOpen(false)}>
            <button className="text-left text-white w-full px-4 py-2 rounded hover:bg-yellow-500 hover:text-black">
              Pelatihan
            </button>
          </Link>
          {!userEmail && (
            <Link href="/login-user" onClick={() => setSidebarOpen(false)}>
              <button className="text-left text-white w-full px-4 py-2 rounded hover:bg-yellow-500 hover:text-black">
                Login User
              </button>
            </Link>
          )}
          <Link href="/login" onClick={() => setSidebarOpen(false)}>
            <button className="text-left text-white w-full px-4 py-2 rounded hover:bg-yellow-500 hover:text-black">
              Login Admin
            </button>
          </Link>

          {userEmail && (
            <div className="mt-4 border-t pt-4">
              <div className="flex items-center gap-2 text-yellow-300 mb-2">
                <FaUserCircle className="text-lg" />
                <span>{getInitial(userEmail)}</span>
              </div>
              <div className="text-sm text-white mb-2">{userEmail}</div>
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-yellow-500"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex-grow flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Selamat Datang di <span className="text-yellow-400">Si-UMKM</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 max-w-xl mb-6">
          Platform digital untuk mendukung dan mempromosikan produk UMKM Indonesia. Mari beli dan bangga buatan lokal!
        </p>

        {/* Form Pencarian */}
        <form onSubmit={handleSearch} className="w-full flex justify-center">
          <div className="flex w-full max-w-2xl">
            <input
              type="text"
              placeholder="Cari produk UMKM..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-grow px-5 py-3 rounded-l-md text-white bg-black/30 placeholder-gray-300 focus:outline-none"
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
