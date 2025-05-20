export const dynamic = "force-dynamic";

import Filter from "@/components/Filter";
import ProductList from "@/components/ProductList";
import ProductsListSkeleton from "@/components/ProductsListSkeleton";
import { wixClientServer } from "@/lib/wixClientServer";
import { Metadata } from "next";
import Image from "next/image";
import React, { Suspense } from "react";
import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = headers();
  const url = new URL((await headersList).get("x-url") || "http://localhost:3000");
  const searchParams = Object.fromEntries(url.searchParams.entries());

  const category = searchParams.cat?.replace(/-/g, " ") || "All Products";
  const minPrice = searchParams.minPrice || null;
  const maxPrice = searchParams.maxPrice || null;
  const sort = searchParams.sort || null;

  let title = `Buy ${category} Wigs | Perfect Strands`;
  let description = `Shop ${category} wigs`;
  const keywords = [
    category,
    "wigs",
    "hair extensions",
    "premium wigs",
    "buy wigs online",
  ];

  if (minPrice || maxPrice) {
    title += ` from KES ${minPrice || "0"} to KES ${maxPrice || "Any"}`;
    description += ` between KES ${minPrice || "0"} and ${maxPrice || "Any"}.`;
  }

  if (sort) {
    description += ` Sorted by ${sort
      .replace("asc", "ascending")
      .replace("desc", "descending")}.`;
  }

  return {
    title:title.toLocaleUpperCase(),
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: `https://perfect-strands.vercel.app/shop?${url.searchParams.toString()}`,
      siteName: "Perfect Strands",
      images: [
        {
          url: "https://perfect-strands.vercel.app/_next/image?url=%2Fwoman.png&w=640&q=75",
          width: 800,
          height: 600,
          alt: title,
        },
      ],
      type: "website",
    },
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Shop = async ({ searchParams }: { searchParams: any }) => {
  const wixClient = await wixClientServer();

  // Get the category slug from searchParams
  const slug = searchParams?.cat || "all-products";

  // Fetch the collection
  const cat = await wixClient.collections.getCollectionBySlug(slug);

  return (
    <section className="relative py-2">
      {/* Promo Banner */}
      <div className="hidden bg-[#D4AF37]/50 px-4 sm:flex justify-between h-64 relative">
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h1 className="font-semibold text-4xl leading-[48px] text-gray-700">
            Grab up to 50% off on <br /> Selected Products
          </h1>
          <button className="bg-[#D4AF37] text-white px-4 py-2 rounded-3xl mt-4 hover:bg-[#b89c2d] transition duration-200 cursor-pointer">
            Buy Now
          </button>
        </div>
        <div className="relative w-1/3">
          <Image
            src="/woman.png"
            alt="category image"
            className="object-contain"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      </div>

      {/* Filter Component */}
      <Filter />

      {/* Category Title */}
      <h1 className="font-semibold text-xl mt-12 mb-8">
        {cat?.collection?.name
          ? `Shop ${cat.collection.name}`
          : "Explore All Wig Collections"}{" "}
        {searchParams.minPrice || searchParams.maxPrice
          ? `from KES ${searchParams.minPrice || "0"} to ${
              searchParams.maxPrice || "Any"
            }`
          : ""}
        !
      </h1>

      {/* Product List */}
      <Suspense fallback={<ProductsListSkeleton />}>
        <ProductList
          categoryId={
            cat?.collection?._id || "00000000-000000-000000-000000000001"
          }
          searchParams={searchParams}
        />
      </Suspense>
    </section>
  );
};

export default Shop;
