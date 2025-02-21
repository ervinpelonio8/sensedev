import { connectToDB } from "@/utils/database";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

import mongoose from "mongoose";

const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);

export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    await connectToDB();

    if (!isValidObjectId(context.params.id)) {
      return NextResponse.json({ error: "Invalid Product ID" }, { status: 400 });
    }

    const product = await Product.findById(context.params.id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}