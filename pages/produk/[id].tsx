// === pages/produk/[id].tsx ===
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
    else {
      if (product.ratings && product.ratings.length > 0) {
        const avg =
          product.ratings.reduce((acc, r) => acc + r.score, 0) / product.ratings.length;
        setAverage(avg.toFixed(1));
      }
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

  const handleDelete = async () => {
    if (!confirm('Yakin ingin menghapus produk ini?')) return;
    const res = await fetch(`/api/products/${product?._id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      alert('Produk berhasil dihapus!');
      router.push('/produk');
    } else {
      alert('Gagal menghapus produk.');
    }
  };

  if (showError) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Produk tidak ditemukan</h1>
        <button
          onClick={() => router.push('/produk')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Kembali ke Daftar Produk
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {product?.image && (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-60 object-cover rounded-md mb-4"
          />
        )}
        <h1 className="text-3xl font-bold text-blue-800 mb-2">{product?.name}</h1>
        <p className="text-gray-600 mb-4">{product?.description}</p>
        <p className="text-xl text-blue-700 font-semibold mb-2">
          Harga: Rp{product?.price.toLocaleString('id-ID')}
        </p>
        <p className="text-yellow-500 font-medium mb-4">
          ⭐ {average || 'Belum ada rating'} / 5
        </p>

        <div className="mb-4">
          <label className="block font-medium mb-1">Beri Rating:</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border rounded px-3 py-1"
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
            className="ml-4 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          >
            Kirim
          </button>
        </div>

        {message && <p className="text-green-600 font-medium">{message}</p>}

        <div className="flex justify-between mt-6">
          <button
            onClick={() => router.push('/produk')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
          >
            Kembali
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
    const product = await ProductModel.findById(id).select('name description price image ratings').lean();

    if (!product) return { props: { product: null } };

    return {
      props: { product: JSON.parse(JSON.stringify(product)) },
    };
  } catch (err) {
    console.error('Error ambil produk:', err);
    return { props: { product: null } };
  }
};