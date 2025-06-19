import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 text-white flex items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Selamat Datang di <span className="text-yellow-400">Si-UMKM</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-300">
          Platform digital untuk mendukung dan mempromosikan produk UMKM Indonesia.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/produk">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-xl transition">
              Lihat Produk
            </button>
          </Link>
          <Link href="/login">
            <button className="bg-transparent border border-yellow-400 hover:bg-yellow-400 hover:text-black text-white font-semibold px-6 py-3 rounded-xl transition">
              Masuk / Daftar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
