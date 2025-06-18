import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
};

type Props = {
  product: Product | null;
};

export default function DetailProduk({ product }: Props) {
  const router = useRouter();

  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (!product) setShowError(true);
  }, [product]);

  if (showError) {
    return (
      <div style={{ padding: '2rem' }}>
        <h1>Produk tidak ditemukan</h1>
        <button onClick={() => router.push('/produk')}>Kembali ke daftar produk</button>
      </div>
    );
  }

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

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{product?.name}</h1>
      <p dangerouslySetInnerHTML={{ __html: product?.description || '' }} />
      <p><strong>Harga:</strong> Rp{product?.price}</p>
      <button onClick={handleDelete} style={{ marginTop: '1rem', background: 'red', color: 'white' }}>
        Hapus Produk
      </button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  try {
    const res = await fetch(`${baseUrl}/api/products/${id}`);

    if (!res.ok) {
      return { props: { product: null } };
    }

    const product = await res.json();

    return {
      props: { product },
    };
  } catch (err) {
    console.error('Gagal mengambil produk:', err);
    return { props: { product: null } };
  }
};
