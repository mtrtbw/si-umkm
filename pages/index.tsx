import Link from 'next/link';

export default function HomePage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center text-white flex items-center justify-center px-6"
      style={{
        backgroundImage: 'linear-gradient(to bottom right, rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://source.unsplash.com/featured/?umkm,market)',
      }}
    >
      <div className="max-w-2xl text-center backdrop-blur-sm bg-black/30 p-10 rounded-xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
          Selamat Datang di <span className="text-yellow-400">Si-UMKM</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-200">
          Platform digital untuk mendukung dan mempromosikan produk UMKM Indonesia.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/produk">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-xl transition w-full sm:w-auto">
              Lihat Produk
            </button>
          </Link>
          <Link href="/login">
            <button className="border border-yellow-400 hover:bg-yellow-400 hover:text-black text-white font-semibold px-6 py-3 rounded-xl transition w-full sm:w-auto">
              Masuk / Daftar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
