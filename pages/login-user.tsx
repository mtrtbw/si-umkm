import { useState } from "react";
import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/router";
import Image from "next/image";

export default function UserLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (error) {
      alert("Login gagal. Periksa kembali email dan password Anda.");
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (err) {
      alert("Login dengan Google gagal.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-50 to-yellow-100 px-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Kiri - Ilustrasi */}
        <div className="md:w-1/2 bg-yellow-500 text-white flex flex-col items-center justify-center p-8">
          <Image
            src="/logo.png"
            alt="Logo Si-UMKM"
            width={64}
            height={64}
            className="mb-4"
          />
          <h2 className="text-3xl font-bold mb-2 text-center">Login Pengguna</h2>
          <p className="text-center text-sm max-w-sm">
            Masuk untuk mencari produk UMKM terbaik!
          </p>
          <Image
            src="/login-illustration.svg"
            alt="Ilustrasi Login"
            width={280}
            height={280}
            className="mt-6"
          />
        </div>

        {/* Kanan - Form Login */}
        <div className="md:w-1/2 p-8 bg-white">
          <h2 className="text-2xl font-bold text-center text-yellow-600 mb-6">
            Login Akun Anda
          </h2>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-4 py-2 rounded-md bg-white text-black placeholder-gray-500"
            />

            {/* Input password + toggle mata */}
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

          {/* Divider */}
          <div className="flex items-center my-5">
            <div className="flex-grow border-t border-gray-300" />
            <span className="px-2 text-gray-400 text-sm">atau</span>
            <div className="flex-grow border-t border-gray-300" />
          </div>

          {/* Google Login */}
          <button
            onClick={loginWithGoogle}
            className="w-full border border-gray-300 py-2 rounded-md text-gray-700 hover:bg-yellow-100 transition flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.3 32.7 29.1 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8.1 3.1l6-6C34.2 5.5 29.4 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c11 0 20-9 20-20 0-1.3-.1-2.1-.4-3.5z"/>
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14 16.2 18.6 13 24 13c3.1 0 5.9 1.2 8.1 3.1l6-6C34.2 5.5 29.4 3 24 3c-7.5 0-14 4.1-17.7 10.3z"/>
              <path fill="#4CAF50" d="M24 45c5.1 0 9.9-1.9 13.5-5.1l-6.3-5.2C29 36.8 26.6 38 24 38c-5.1 0-9.4-3.2-11-7.7l-6.6 5.1C10.1 41 16.5 45 24 45z"/>
              <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.4 3.9-5.2 7-9.3 7-5.1 0-9.4-3.2-11-7.7l-6.6 5.1C10.1 41 16.5 45 24 45c11 0 20-9 20-20 0-1.3-.1-2.1-.4-3.5z"/>
            </svg>
            Masuk dengan Google
          </button>

          <p className="text-sm text-center text-gray-600 mt-6">
            Belum punya akun?{" "}
            <a
              href="#"
              className="text-yellow-600 font-semibold hover:underline"
            >
              Daftar di sini
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
