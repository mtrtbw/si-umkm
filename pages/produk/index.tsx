import { GetStaticProps } from 'next';
import Link from 'next/link';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

type ProductType = {
  _id: string;
  name: string;
  description: string;
  price: number;
};

type Props = {
  products: ProductType[];
};

export default function ProdukPage({ products }: Props) {
  return (
    <div
      style={{
        padding: '2rem',
        minHeight: '100vh',
        fontFamily: 'sans-serif',
      }}
    >
      <h1>Daftar Produk UMKM</h1>

      {products.length === 0 ? (
        <p>Belum ada produk tersedia.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product._id} style={{ marginBottom: '1rem' }}>
              <Link href={`/produk/${product._id}`}>
                <strong>{product.name}</strong> - Rp{product.price}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  await dbConnect(); // koneksi ke MongoDB Atlas

  const products = await Product.find().lean(); // ambil data langsung

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)), // serialisasi data
    },
    revalidate: 10, // ISR: regenerasi setiap 10 detik
  };
};
