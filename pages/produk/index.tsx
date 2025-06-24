import { GetServerSideProps } from "next";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";

type ProductType = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  ratings?: { score: number }[];
  postedBy?: string;
};

type Props = {
  products: ProductType[];
  search?: string;
};

export default function ProdukPage({ products, search = "" }: Props) {
  const [query, setQuery] = useState(search);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/produk?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.95)), url('/umkm-banner.avif')",
      }}
    >
      {/* Header */}
      <div className="w-full px-6 py-4 flex justify-center bg-black bg-opacity-50 shadow-md">
        <div className="w-full max-w-6xl flex justify-between items-center">
          <h1 className="text-3xl font-bold text-yellow-400">
            {search ? `Hasil: "${search}"` : "Produk UMKM"}
          </h1>
          <Link href="/">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-xl transition">
              ← Kembali
            </button>
          </Link>
        </div>
      </div>

      {/* Form Pencarian */}
      <div className="flex justify-center mt-6 px-4">
        <form onSubmit={handleSearch} className="flex w-full max-w-2xl">
          <input
            type="text"
            placeholder="Cari produk UMKM..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow px-5 py-3 rounded-l-md text-black bg-white focus:outline-none"
          />
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-r-md transition"
          >
            Cari
          </button>
        </form>
      </div>

      {/* Produk */}
      <div className="flex-grow py-10 px-4 sm:px-8 max-w-6xl mx-auto">
        {products.length === 0 ? (
          <p className="text-center text-gray-300 text-xl mt-12">
            Tidak ditemukan produk yang sesuai.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((product) => {
              const averageRating = product.ratings?.length
                ? (
                    product.ratings.reduce((acc, r) => acc + r.score, 0) /
                    product.ratings.length
                  ).toFixed(1)
                : null;

              return (
                <div
                  key={product._id}
                  className="bg-white text-black rounded-xl shadow-lg p-6 hover:shadow-2xl transition"
                >
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded mb-4"
                    />
                  )}
                  <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 text-center mb-3">
                    {product.description}
                  </p>
                  <p className="text-lg font-semibold text-yellow-700 text-center mb-1">
                    Rp{product.price.toLocaleString("id-ID")}
                  </p>
                  <p className="text-sm text-yellow-500 text-center mb-3">
                    {averageRating
                      ? `⭐ ${averageRating} / 5`
                      : "Belum ada rating"}
                  </p>
                  <p className="text-sm text-gray-500 text-center mb-1">
  Diposting oleh: {product.postedBy ? product.postedBy.split("@")[0] : "Admin@admin.com"}
</p>

                  <Link
                    href={`/produk/${product._id}`}
                    className="text-center block bg-yellow-400 hover:bg-yellow-500 text-white py-2 rounded-md font-semibold transition"
                  >
                    Lihat Detail
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  await dbConnect();
  
  const search = (context.query.search || "").toString().trim();

  let query = {};
  if (search) {
    query = {
      name: { $regex: search, $options: "i" },
    };
  }

  const products = await Product.find(query)
    .select("name description price image ratings") // ambil ratings
    .lean();

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      search,
    },
  };
};
