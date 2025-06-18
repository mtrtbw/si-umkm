import db from '@/lib/db';
import Product from '@/models/Product';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await db;
  const { id } = req.query;

  if (req.method === 'GET') {
    const product = await Product.findById(id);
    return res.status(200).json(product);
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
