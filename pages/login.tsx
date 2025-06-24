import { useState } from "react";
import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/profile");
    } catch (error) {
      alert("Login gagal. Periksa kembali email dan password Anda.");
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/profile");
    } catch (err) {
      alert("Login dengan Google gagal.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-50 to-yellow-100 px-4 relative">
      {/* Tombol Kembali */}
      <div className="absolute top-4 left-4 z-10">
        <Link href="/">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-xl shadow transition">
            ← Beranda
          </button>
        </Link>
      </div>

      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Ilustrasi */}
        <div className="md:w-1/2 bg-yellow-500 text-white flex flex-col items-center justify-center p-8">
          <Image
            src="/logo.png"
            alt="Logo Si-UMKM"
            width={64}
            height={64}
            className="mb-4"
          />
          <h2 className="text-3xl font-bold mb-2 text-center">
            Login Admin Panel
          </h2>
          <p className="text-center text-sm max-w-sm">
            Akses fitur admin untuk mengelola produk UMKM.
          </p>
          <Image
            src="/login-illustration.svg"
            alt="Ilustrasi Login"
            width={240}
            height={240}
            className="mt-6"
          />
        </div>

        {/* Form Login */}
        <div className="md:w-1/2 p-8 bg-white text-black">
          <h2 className="text-2xl font-bold text-center text-yellow-600 mb-10">
            Masuk ke Akun Admin
          </h2>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-4 py-2 rounded-md bg-white text-black placeholder-gray-500"
            />

            {/* Password dengan ikon show/hide */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border px-4 py-2 rounded-md bg-white text-black placeholder-gray-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            <button
              onClick={login}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-md font-semibold transition"
            >
              Masuk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
