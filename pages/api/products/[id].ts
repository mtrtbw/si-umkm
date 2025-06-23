// pages/api/products/[id].ts
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ error: 'Produk tidak ditemukan' });
      }

      return res.status(200).json(product); // ⬅️ pastikan ratings ikut terkirim
    } catch (error) {
      return res.status(500).json({ error: 'Terjadi kesalahan saat mengambil produk' });
    }
  }

  if (req.method === 'PUT') {
    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json(updated);
  }

  if (req.method === 'DELETE') {
    await Product.findByIdAndDelete(id);
    return res.status(204).end();
  }

  res.status(405).end();
}
