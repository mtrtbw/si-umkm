import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import dbConnect from '@/lib/db';
import ProductModel from '@/models/Product';

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  ratings?: { score: number }[];
};

type Props = {
  product: Product | null;
};

export default function DetailProduk({ product }: Props) {
  const router = useRouter();
  const [showError, setShowError] = useState(false);
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [average, setAverage] = useState<string | null>(null);

  useEffect(() => {
    if (!product) setShowError(true);
    else if (product.ratings?.length) {
      const avg =
        product.ratings.reduce((acc, r) => acc + r.score, 0) /
        product.ratings.length;
      setAverage(avg.toFixed(1));
    }
  }, [product]);

  const handleRating = async () => {
    if (!rating) return;
    const res = await fetch(`/api/products/${product?._id}/rate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ score: rating }),
    });

    if (res.ok) {
      setMessage('Terima kasih atas rating Anda!');
      setTimeout(() => router.reload(), 1000);
    } else {
      setMessage('Gagal menyimpan rating.');
    }
  };

  if (showError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-8 text-white bg-black">
        <div>
          <h1 className="text-2xl font-bold mb-4">Produk tidak ditemukan</h1>
          <button
            onClick={() => router.push('/produk')}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded"
          >
            Kembali ke Daftar Produk
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white flex items-center justify-center px-4 py-10"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(0,0,0,0.95)), url('/umkm-banner.avif')",
      }}
    >
      <div className="w-full max-w-2xl bg-white backdrop-blur-md rounded-xl shadow-lg p-6">
        {product?.image && (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-60 object-cover rounded-md mb-4"
          />
        )}
        <h1 className="text-3xl font-bold text-black mb-2">{product?.name}</h1>
        <p className="text-black mb-4">{product?.description}</p>
        <p className="text-xl text-black font-semibold mb-2">
          Harga: Rp{product?.price.toLocaleString('id-ID')}
        </p>
        <p className="text-yellow-400 font-medium mb-4">
          ⭐ {average || 'Belum ada rating'} / 5
        </p>

        {/* Form Rating */}
        <div className="mb-6">
          <label className="block font-medium mb-1 text-white">Beri Rating:</label>
          <div className="flex items-center gap-3">
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="border rounded px-3 py-1 text-white"
            >
              <option value={0}>Pilih rating</option>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} ⭐
                </option>
              ))}
            </select>
            <button
              onClick={handleRating}
              className="bg-yellow-400 text-black px-4 py-1 rounded hover:bg-yellow-500 transition"
            >
              Kirim
            </button>
          </div>
          {message && <p className="text-green-300 font-medium mt-2">{message}</p>}
        </div>

        {/* Tombol Navigasi */}
        <div className="flex justify-between">
          <button
            onClick={() => router.push('/produk')}
            className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-md"
          >
            ← Kembali
          </button>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id as string;
  await dbConnect();

  try {
    const product = await ProductModel.findById(id)
      .select('name description price image ratings')
      .lean();

    if (!product) return { props: { product: null } };

    return {
      props: { product: JSON.parse(JSON.stringify(product)) },
    };
  } catch (err) {
    console.error('Error ambil produk:', err);
    return { props: { product: null } };
  }
};
