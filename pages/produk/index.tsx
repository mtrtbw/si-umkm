import { GetStaticProps } from 'next';
import Link from 'next/link';

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
};

type Props = {
  products: Product[];
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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/products`);

  if (!res.ok) {
    console.error("Failed to fetch /api/products:", res.status);
    return { props: { products: [] } };
  }

  const products = await res.json();

  return {
    props: { products },
    revalidate: 10,
  };
};
