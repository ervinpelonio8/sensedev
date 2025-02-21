import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Product from "@/models/Product";

export async function POST(request: Request) {
  try {
    await connectToDB();

    const body = await request.json();
    
    // Create new product
    const product = await Product.create({
      name: body.name,
      price: parseFloat(body.price),
      description: body.description,
      images: body.images,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}

// Optional: Add GET endpoint to fetch products
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "9");
    const search = searchParams.get("search") || "";
    
    await connectToDB();

    // Create search query
    const searchQuery = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    // Get total count for pagination
    const total = await Product.countDocuments(searchQuery);
    
    // Get products with pagination
    const products = await Product.find(searchQuery)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json({
      products,
      hasMore: total > page * limit,
      total,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
