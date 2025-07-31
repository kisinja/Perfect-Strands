/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/products/route.ts

import { wixClientServer } from "@/lib/wixClientServer";
import { NextResponse } from "next/server";

export async function GET() {
  const wixClient = await wixClientServer();
  try {
    const products = await wixClient.products.queryProducts().find();

    // Optional: simplify the product fields
    const simplifiedProducts = products.items.map((item: any) => ({
      id: item._id,
      name: item.name,
      description: item.description,
      price: item.price,
    }));

    return NextResponse.json(simplifiedProducts, { status: 200 });
  } catch (error) {
    console.error("Error fetching products from Wix:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
