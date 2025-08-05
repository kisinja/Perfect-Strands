// app/api/products/route.ts

import { wixClientServer } from "@/lib/wixClientServer";
import { products as wixProducts } from "@wix/stores";
import { NextResponse } from "next/server";

export async function GET() {
  const wixClient = await wixClientServer();

  try {
    // Get all products
    const result = await wixClient.products.queryProducts().find();
    const productList: wixProducts.Product[] = result.items;

    // Get all collections
    const collectionResult = await wixClient.collections
      .queryCollections()
      .find();
    const allCollections = collectionResult.items;

    // Product to collection mapping
    const productIdToCollectionMap: Record<string, string[]> = {};

    for (const collection of allCollections) {
      const collectionProducts = await wixClient.collections
        .queryCollections()
        .eq("_id", collection?._id)
        .find();

      for (const product of collectionProducts.items) {

        console.log("Mapping through: ",product);

        if (!productIdToCollectionMap[product._id ?? ""]) {
          productIdToCollectionMap[product._id ?? ""] = [];
        }
        productIdToCollectionMap[product?._id ?? ""].push(
          collection.name || "Unknown Collection"
        );
      }
    }

    // Simplify product data with collection info
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
      collections: productIdToCollectionMap[item._id ?? ""] || [],
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
