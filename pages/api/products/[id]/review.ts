// pages/api/products/[id]/review.ts

import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === "POST") {
    const { user, text } = req.body;

    if (!user || !text) {
      return res.status(400).json({ error: "Ulasan tidak lengkap" });
    }

    try {
      const product = await Product.findById(id);
      if (!product) return res.status(404).json({ error: "Produk tidak ditemukan" });

      product.reviews.push({ user, text });
      await product.save();

      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: "Gagal menyimpan ulasan" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
