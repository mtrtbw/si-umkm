// pages/api/products/[id]/rate.ts
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('[API] /api/products/[id]/rate terpanggil');

  await dbConnect();
  const { id } = req.query;

  if (req.method === 'POST') {
    const { score } = req.body;
    if (!score || score < 1 || score > 5) {
      return res.status(400).json({ error: 'Rating tidak valid (1–5)' });
    }

    try {
      const product = await Product.findById(id);
      if (!product) return res.status(404).json({ error: 'Produk tidak ditemukan' });

      product.ratings = product.ratings || [];
      product.ratings.push({ score });
      await product.save();

      console.log('Rating berhasil disimpan');
      return res.status(200).json({ message: 'Rating berhasil disimpan' });
    } catch (error) {
      console.error('Gagal menyimpan rating:', error);
      return res.status(500).json({ error: 'Terjadi kesalahan saat menyimpan rating' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
