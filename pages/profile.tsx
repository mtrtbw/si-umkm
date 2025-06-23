import { useEffect, useState } from 'react';
import axios from 'axios';

type Product = {
_id: string;
name: string;
description: string;
price: number;
image?: string;
};

export default function AdminPanel() {
const [products, setProducts] = useState<Product[]>([]);
const [name, setName] = useState('');
const [description, setDescription] = useState('');
const [price, setPrice] = useState('');
const [image, setImage] = useState('');

const fetchProducts = async () => {
const res = await axios.get('/api/products');
setProducts(res.data);
};

useEffect(() => {
fetchProducts();
}, []);

const handleDelete = async (id: string) => {
if (confirm('Yakin ingin menghapus produk ini?')) {
await axios.delete(`/api/products/${id}`);
fetchProducts();
}
};

const handleAddProduct = async () => {
try {
await axios.post('/api/products', {
name,
description,
price: parseFloat(price),
image,
});
setName('');
setDescription('');
setPrice('');
setImage('');
fetchProducts();
} catch (err: any) {
alert(err?.response?.data?.error || 'Gagal menambah produk');
}
};

return (
<div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/umkm-banner.avif')" }}>
<div className="min-h-screen backdrop-blur-md bg-white/85 p-8">
<div className="max-w-5xl mx-auto space-y-10">
<h1 className="text-4xl font-bold text-center text-blue-900">
Admin Panel – Kelola Produk UMKM
</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddProduct();
        }}
        className="bg-white border border-blue-200 shadow-md rounded-lg p-6 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-blue-800">Tambah Produk Baru</h2>

        <div>
          <label className="block text-sm font-medium">Nama Produk</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full border px-4 py-2 rounded-md" />
        </div>

        <div>
          <label className="block text-sm font-medium">Deskripsi Produk</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required className="w-full border px-4 py-2 rounded-md" />
        </div>

        <div>
          <label className="block text-sm font-medium">Harga Produk (Rp)</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full border px-4 py-2 rounded-md" />
        </div>

        <div>
          <label className="block text-sm font-medium">URL Gambar Produk</label>
          <input
            type="url"
            placeholder="https://contoh.com/gambar.jpg"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full border px-4 py-2 rounded-md"
          />
          {image && <img src={image} alt="Preview" className="mt-3 h-32 rounded shadow" />}
        </div>

        <div className="text-right">
          <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">
            + Tambah Produk
          </button>
        </div>
      </form>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Daftar Produk Ditambahkan</h2>
        {products.length === 0 ? (
          <p className="text-gray-500 italic">Belum ada produk ditambahkan.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div key={p._id} className="bg-white border rounded-xl p-6 shadow hover:shadow-xl">
                {p.image && <img src={p.image} alt={p.name} className="w-full h-40 object-cover mb-4 rounded" />}
                <h3 className="text-lg font-bold text-gray-800 mb-1">{p.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{p.description}</p>
                <p className="text-blue-600 font-semibold mb-4">Rp{p.price.toLocaleString('id-ID')}</p>
                <button onClick={() => handleDelete(p._id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm">
                  Hapus Produk
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
</div>
);
}