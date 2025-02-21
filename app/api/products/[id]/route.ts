import { connectToDB } from "@/utils/database"
import Product from "@/models/Product"
import type { NextApiRequest, NextApiResponse } from 'next'

import mongoose from "mongoose"

const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectToDB()

    const { id } = req.query

    if (!isValidObjectId(id as string)) {
      return res.status(400).json({ error: "Invalid Product ID" })
    }

    const product = await Product.findById(id)

    if (!product) {
      return res.status(404).json({ error: "Product not found" })
    }

    return res.status(200).json(product)
  } catch (error) {
    console.error("Error fetching product:", error)
    return res.status(500).json({ error: "Failed to fetch product" })
  }
}
