import { useEffect, useState } from "react";
import axios from "axios";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
};

export default function AdminPanel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const fetchProducts = async () => {
    const res = await axios.get("/api/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Yakin ingin menghapus produk ini?")) {
      await axios.delete(`/api/products/${id}`);
      fetchProducts();
    }
  };

  const handleAddProduct = async () => {
    try {
      await axios.post("/api/products", {
        name,
        description,
        price: parseFloat(price),
        image,
      });
      setName("");
      setDescription("");
      setPrice("");
      setImage("");
      fetchProducts();
    } catch (err: any) {
      alert(err?.response?.data?.error || "Gagal menambah produk");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(0,0,0,0.95)), url('/umkm-banner.avif')",
      }}
    >
      <div className="min-h-screen px-6 py-10">
        <div className="max-w-6xl mx-auto space-y-12">
          <h1 className="text-4xl font-bold text-yellow-400 text-center">
            Admin Panel – Kelola Produk UMKM
          </h1>

          {/* Form Tambah Produk dan gambar*/}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddProduct();
            }}
            className="bg-white/90 backdrop-blur-sm text-black border border-yellow-200 rounded-2xl shadow-xl p-8 space-y-5"
          >
            <h2 className="text-2xl font-bold text-blue-700">
              Tambah Produk Baru
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Nama Produk
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border px-4 py-2 rounded-md bg-white text-black placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Harga Produk (Rp)
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className="w-full border px-4 py-2 rounded-md bg-white text-black placeholder-gray-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Deskripsi Produk
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="w-full border px-4 py-2 rounded-md bg-white text-black placeholder-gray-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">
                  URL Gambar Produk
                </label>
                <input
                  type="url"
                  placeholder="https://contoh.com/gambar.jpg"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full border px-4 py-2 rounded-md bg-white text-black placeholder-gray-500"
                />
                {image && (
                  <img
                    src={image}
                    alt="Preview"
                    className="mt-4 h-40 object-cover rounded shadow"
                  />
                )}
              </div>
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="bg-blue-700 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-800 transition"
              >
                + Tambah Produk
              </button>
            </div>
          </form>

          {/* Daftar Produk */}
          <div className="bg-white/90 backdrop-blur-sm text-black border border-gray-200 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-blue-700 mb-6">
              Daftar Produk
            </h2>

            {products.length === 0 ? (
              <p className="text-gray-600 italic">
                Belum ada produk ditambahkan.
              </p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((p) => (
                  <div
                    key={p._id}
                    className="bg-white border rounded-lg p-5 shadow hover:shadow-lg transition"
                  >
                    {p.image && (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-40 object-cover rounded mb-3"
                      />
                    )}
                    <h3 className="font-bold text-gray-800 text-lg">
                      {p.name}
                    </h3>
                    <p className="text-sm text-gray-600">{p.description}</p>
                    <p className="text-blue-600 font-semibold mt-2 mb-3">
                      Rp{p.price.toLocaleString("id-ID")}
                    </p>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md text-sm"
                    >
                      Hapus
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
