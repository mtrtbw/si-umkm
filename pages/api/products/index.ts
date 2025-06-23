// File: pages/api/products/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    const products = await Product.find();
    return res.status(200).json(products);
  }

  if (req.method === 'POST') {
    try {
      const { name, description, price, image } = req.body;

      // ✅ image harus ikut disimpan di sini
      const newProduct = new Product({
        name,
        description,
        price,
        image, // ✅ Pastikan ini ada
      });

      await newProduct.save();

      return res.status(201).json(newProduct);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Gagal menyimpan produk' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
