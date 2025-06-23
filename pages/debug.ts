import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();
    const count = await Product.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Gagal menghitung produk' });
  }
}
