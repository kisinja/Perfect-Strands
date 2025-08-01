// app/api/products/route.ts

import { wixClientServer } from "@/lib/wixClientServer";
import { products as wixProducts } from "@wix/stores";
import { NextResponse } from "next/server";

export async function GET() {
  const wixClient = await wixClientServer();

  try {
    const result = await wixClient.products.queryProducts().find();
    const productList: wixProducts.Product[] = result.items;

    const simplifiedProducts = productList.map((item: wixProducts.Product) => ({
      id: item._id,
      name: item.name,
      description: item.description,
      price: item.priceData?.formatted?.price || "N/A",
      productLink: item.slug
        ? `https://perfect-strands.vercel.app/${item.slug}`
        : null,
      createdAt: new Date(item._createdDate || "").toISOString(),
      imageUrl: item.media?.mainMedia?.image?.url ?? "/placeholder-product.jpg",
      ribbon: item.ribbon || null,
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
