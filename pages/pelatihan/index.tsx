// File: pages/pelatihan/index.tsx
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaChalkboardTeacher, FaRegCalendarAlt } from "react-icons/fa";

// Tipe data pelatihan
type Pelatihan = {
  id: string;
  nama: string;
  penyelenggara: string;
  tanggal: string;
  lokasi: string;
  linkPendaftaran?: string;
};

export default function PelatihanPage() {
  const [pelatihan, setPelatihan] = useState<Pelatihan[]>([]);

  useEffect(() => {
    // Simulasi fetch dari API atau database
    const fetchPelatihan = async () => {
      const data: Pelatihan[] = [
        {
          id: "1",
          nama: "Pelatihan UMKM Go Digital: Meningkatkan Daya Saing di Era Digital",
          penyelenggara: "Dinas Koperasi,Usaha Kecil dan Menengah Provinsi Sulawesi Tengah",
          tanggal: "2025-07-15",
          lokasi: "Sulawesi Tengah (Online)",
          linkPendaftaran: "https://dinkopumkm.sultengprov.go.id/2024/07/29/pelatihan-umkm-go-digital-meningkatkan-daya-saing-di-era-digital/",
        },
        {
          id: "2",
          nama: "Manajemen Keuangan untuk UMKM",
          penyelenggara: "Dinas Koperasi Provinsi Jawa Tengah",
          tanggal: "2025-08-05",
          lokasi: "Semarang",
        },
      ];
      setPelatihan(data);
    };

    fetchPelatihan();
  }, []);

  return (
    <div className="min-h-screen bg-yellow-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-yellow-700 text-center mb-8">
          Program Pelatihan & Pembinaan UMKM
        </h1>

        {pelatihan.length === 0 ? (
          <p className="text-center text-gray-600">Belum ada data pelatihan saat ini.</p>
        ) : (
          <div className="space-y-6">
            {pelatihan.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-yellow-200 shadow-md rounded-lg p-6"
              >
                <h2 className="text-xl font-bold text-yellow-700 flex items-center gap-2">
                  <FaChalkboardTeacher /> {item.nama}
                </h2>
                <p className="text-gray-700 mt-2">Diselenggarakan oleh: {item.penyelenggara}</p>
                <p className="text-gray-700">Tanggal: {item.tanggal}</p>
                <p className="text-gray-700">Lokasi: {item.lokasi}</p>
                {item.linkPendaftaran && (
                  <a
                    href={item.linkPendaftaran}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-sm text-white bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded"
                  >
                    Daftar Sekarang
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link href="/">
            <span className="text-yellow-600 hover:underline">← Kembali ke Beranda</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
