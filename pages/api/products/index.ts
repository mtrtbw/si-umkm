import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import validator from 'validator';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect(); // ⬅️ WAJIB agar terkoneksi ke MongoDB

  if (req.method === 'GET') {
    try {
      const products = await Product.find();
      return res.status(200).json(products);
    } catch (err) {
      return res.status(500).json({ error: 'Gagal mengambil produk' });
    }
  }

  if (req.method === 'POST') {
    const { name, description, price } = req.body;

    // Validasi nama tidak boleh kosong dan hanya huruf/angka/spasi
    if (!name || !validator.isAlphanumeric(name.replace(/\s/g, ''))) {
      return res.status(400).json({ error: 'Nama hanya boleh huruf, angka dan spasi' });
    }

    // Validasi harga
    if (!price || isNaN(price)) {
      return res.status(400).json({ error: 'Harga tidak valid' });
    }

    // Sanitasi deskripsi agar aman dari XSS
    const cleanDescription = validator.escape(description || '');

    try {
      const product = await Product.create({
        name,
        description: cleanDescription,
        price,
      });

      return res.status(201).json(product);
    } catch (error) {
      return res.status(500).json({ error: 'Gagal menyimpan produk' });
    }
  }

  // Jika method bukan GET atau POST
  return res.status(405).json({ error: 'Method not allowed' });
}
