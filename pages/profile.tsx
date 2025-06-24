import { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "@/lib/firebase";
import Image from "next/image";
import { useRouter } from "next/router";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  ratings?: { score: number }[];
};

export default function AdminPanel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    fetchProducts();

    const user = auth.currentUser;
    if (user) setUserEmail(user.email || "User");
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get("/api/products");
    setProducts(res.data);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Yakin ingin menghapus produk ini?")) {
      await axios.delete(`/api/products/${id}`);
      fetchProducts();
    }
  };

  const handleResetRating = async (id: string) => {
    if (confirm("Yakin ingin mereset rating produk ini?")) {
      await axios.put(`/api/products/${id}`, { ratings: [] });
      fetchProducts();
    }
  };

  const handleResetReviews = async (id: string) => {
    if (confirm("Yakin ingin mereset semua ulasan produk ini?")) {
      await axios.put(`/api/products/${id}`, { reviews: [] });
      fetchProducts();
    }
  };

  const handleEdit = (product: Product) => {
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price.toString());
    setImage(product.image || "");
    setEditingProductId(product._id);
  };

  const handleCancelEdit = () => {
    setEditingProductId(null);
    setName("");
    setDescription("");
    setPrice("");
    setImage("");
  };

  const handleAddOrUpdateProduct = async () => {
    try {
      if (editingProductId) {
        await axios.put(`/api/products/${editingProductId}`, {
          name,
          description,
          price: parseFloat(price),
          image,
        });
      } else {
        await axios.post("/api/products", {
          name,
          description,
          price: parseFloat(price),
          image,
        });
      }

      setName("");
      setDescription("");
      setPrice("");
      setImage("");
      setEditingProductId(null);

      fetchProducts();
    } catch (err: any) {
      alert(err?.response?.data?.error || "Gagal menyimpan produk");
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
    router.push("/login");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(0,0,0,0.95)), url('/umkm-banner.avif')",
      }}
    >
      <div className="w-full px-6 py-4 flex items-center justify-center bg-black bg-opacity-50 shadow-md">
        <div className="w-full max-w-6xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Logo Si-UMKM"
              width={48}
              height={48}
              className="object-contain"
            />
            <h2 className="text-lg font-semibold text-white">Si-UMKM</h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white font-medium">{userEmail}</span>
            <button
              onClick={handleLogout}
              className="border border-yellow-400 hover:bg-red-600 hover:text-white text-white font-semibold px-5 py-2 rounded-xl transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="min-h-screen px-6 py-10">
        <div className="max-w-6xl mx-auto space-y-12">
          <h1 className="text-4xl font-bold text-yellow-400 text-center">
            Admin Panel – Kelola Produk UMKM
          </h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddOrUpdateProduct();
            }}
            className="bg-white/90 backdrop-blur-sm text-black border border-yellow-200 rounded-2xl shadow-xl p-8 space-y-5"
          >
            <h2 className="text-2xl font-bold text-yellow-700">
              {editingProductId ? "Edit Produk" : "Tambah Produk Baru"}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Nama Produk</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full border px-4 py-2 rounded-md bg-white text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Harga Produk (Rp)</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className="w-full border px-4 py-2 rounded-md bg-white text-black"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Deskripsi Produk</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="w-full border px-4 py-2 rounded-md bg-white text-black"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">URL Gambar Produk</label>
                <input
                  type="url"
                  placeholder="https://contoh.com/gambar.jpg"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full border px-4 py-2 rounded-md bg-white text-black"
                />
                {image && <img src={image} alt="Preview" className="mt-4 h-40 object-cover rounded shadow" />}
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              {editingProductId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="text-red-600 hover:underline font-medium"
                >
                  Batalkan Edit
                </button>
              )}
              <button
                type="submit"
                className="bg-yellow-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-yellow-700 transition"
              >
                {editingProductId ? "Simpan Perubahan" : "+ Tambah Produk"}
              </button>
            </div>
          </form>

          <div className="bg-white/90 backdrop-blur-sm text-black border border-gray-200 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-yellow-700 mb-6">Daftar Produk</h2>
            {products.length === 0 ? (
              <p className="text-gray-600 italic">Belum ada produk ditambahkan.</p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((p) => {
                  const avgRating = p.ratings?.length
                    ? (p.ratings.reduce((sum, r) => sum + r.score, 0) / p.ratings.length).toFixed(1)
                    : null;
                  return (
                    <div key={p._id} className="bg-white border rounded-lg p-5 shadow hover:shadow-lg transition">
                      {p.image && <img src={p.image} alt={p.name} className="w-full h-40 object-cover rounded mb-3" />}
                      <h3 className="font-bold text-gray-800 text-lg">{p.name}</h3>
                      <p className="text-sm text-gray-600">{p.description}</p>
                      <p className="text-yellow-600 font-semibold mt-2">Rp{p.price.toLocaleString("id-ID")}</p>
                      <p className="text-sm text-yellow-500 mt-1">
                        Rating: {avgRating ? `${avgRating} / 5` : "Belum ada rating"}
                      </p>
                      <div className="grid grid-cols-1 gap-2 mt-3">
                        <div className="flex justify-between gap-2">
                          <button
                            onClick={() => handleEdit(p)}
                            className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1.5 rounded-md text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleResetRating(p._id)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm"
                          >
                            Reset Rating
                          </button>
                          <button
                            onClick={() => handleDelete(p._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-sm"
                          >
                            Hapus
                          </button>
                        </div>
                        <button
                          onClick={() => handleResetReviews(p._id)}
                          className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-md text-sm"
                        >
                          Reset Ulasan
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
