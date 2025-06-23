import { useState } from 'react';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/router';
import Image from 'next/image';






export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/profile');
    } catch (error) {
      alert('Login gagal');
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/profile');
    } catch (err) {
      alert('Login gagal');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        
        {/* === Left Side: Illustration and Welcome Text === */}
        <div className="md:w-1/2 bg-blue-600 text-white flex flex-col items-center justify-center p-8">
          <Image src="/logo.png" alt="Si-UMKM Logo" width={70} height={70} className="mb-4" />
          <h2 className="text-3xl font-bold mb-2 text-center">Selamat Datang di Si-UMKM</h2>
          <p className="text-center text-sm max-w-sm">
            Temukan produk UMKM terbaik dan bantu ekonomi lokal tumbuh!
          </p>
          <Image
            src="/login-illustration.svg"
            alt="Ilustrasi Login"
            width={280}
            height={280}
            className="mt-6"
          />
        </div>

        {/* === Right Side: Login Form === */}
        <div className="md:w-1/2 p-8 bg-white">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login Akun</h2>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={login}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition"
            >
              Masuk
            </button>
          </div>

          <div className="flex items-center my-5">
            <div className="flex-grow border-t border-gray-300" />
            <span className="px-2 text-gray-400 text-sm">atau</span>
            <div className="flex-grow border-t border-gray-300" />
          </div>

          <button
            onClick={loginWithGoogle}
            className="w-full border border-gray-300 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
          >
            Login dengan Google
          </button>

          <p className="text-sm text-center text-gray-600 mt-6">
            Belum punya akun?{' '}
            <a href="#" className="text-blue-600 font-semibold hover:underline">
              Daftar di sini
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
