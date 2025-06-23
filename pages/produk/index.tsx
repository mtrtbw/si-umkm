// File: pages/produk/index.tsx
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

type ProductType = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
};

type Props = {
  products: ProductType[];
};

export default function ProdukPage({ products }: Props) {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">
          Daftar Produk UMKM
        </h1>

        {products.length === 0 ? (
          <p className="text-center text-gray-500">Belum ada produk tersedia.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
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

                <p className="text-sm text-gray-600 text-center mb-4">
                  {product.description}
                </p>

                <p className="text-lg font-semibold text-blue-600 text-center mb-4">
                  Rp{product.price.toLocaleString('id-ID')}
                </p>

                <Link
                  href={`/produk/${product._id}`}
                  className="text-center block bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition"
                >
                  Lihat Detail
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  await dbConnect();
  const products = await Product.find().lean();

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
};
