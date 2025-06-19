import Link from 'next/link';

export default function HomePage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-6"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url('/umkm-banner.jpg')`,
      }}
    >
      <div className="max-w-2xl text-center text-white space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Selamat Datang di <span className="text-yellow-400">Si-UMKM</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300">
          Platform digital untuk mendukung dan mempromosikan produk UMKM Indonesia. Mari beli dan bangga buatan lokal!
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <Link href="/produk">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-xl transition">
              🛍️ Lihat Produk
            </button>
          </Link>
          <Link href="/login">
            <button className="border border-yellow-400 hover:bg-yellow-400 hover:text-black text-white font-semibold px-6 py-3 rounded-xl transition">
              🔐 Masuk / Daftar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
