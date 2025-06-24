import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "GET") {
    const products = await Product.find({});
    return res.status(200).json(products);
  }

  if (req.method === "POST") {
    const { name, description, price, image, postedBy } = req.body;
    try {
      const newProduct = await Product.create({ name, description, price, image, postedBy });
      return res.status(201).json(newProduct);
    } catch (error) {
      return res.status(400).json({ error: "Gagal menambahkan produk." });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
