/* eslint-disable @typescript-eslint/no-explicit-any */
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

  let title = `${category} Wigs | Perfect Strands`;
  let description = `Premium ${category} wigs for every occasion`;
  const keywords = [
    category,
    "luxury wigs",
    "human hair",
    "lace front wigs",
    "hair collection"
  ];

  if (minPrice || maxPrice) {
    title += ` (KES ${minPrice || "0"} - ${maxPrice || "Any"})`;
    description += ` from KES ${minPrice || "0"} to ${maxPrice || "Any"}`;
  }

  if (sort) {
    description += ` | Sorted by ${sort
      .replace("asc", "low to high")
      .replace("desc", "high to low")}`;
  }

  return {
    title: title.toUpperCase(),
    description,
    keywords,
    openGraph: {
      title: title.toUpperCase(),
      description,
      url: `https://perfect-strands.vercel.app/shop?${url.searchParams.toString()}`,
      siteName: "Perfect Strands",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
    },
  };
}

const Shop = async ({ searchParams }: { searchParams: any }) => {
  const wixClient = await wixClientServer();
  const slug = searchParams?.cat || "all-products";
  const cat = await wixClient.collections.getCollectionBySlug(slug);

  return (
    <section className="relative py-8 px-4 sm:px-8">
      {/* Luxury Promo Banner */}
      <div className="bg-gradient-to-r from-[#fff0f5] to-[#fce7f3] rounded-xl overflow-hidden shadow-lg mb-12">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col items-start">
            <span className="text-[#D4AF37] font-medium mb-2">NEW COLLECTION</span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#3b1f2b] mb-4 leading-tight">
              It&apos;s Time to <br className="hidden md:block" /> Sparkle & Shine
            </h1>
            <p className="text-[#3b1f2b]/80 mb-6">
              Discover our premium wig collection designed for queens
            </p>
            <button
              className="bg-[#D4AF37] hover:bg-[#c5a233] text-white px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg"
            >
              SHOP NOW
            </button>
          </div>
          <div className="w-full md:w-1/2 h-64 md:h-96 relative">
            <Image
              src="/woman.png"
              alt="Luxury wig model"
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>

      {/* Filter Component */}
      <Filter />

      {/* Category Title */}
      <div className="flex justify-between items-center mb-8 mt-12">
        <h1 className="text-2xl md:text-3xl font-bold text-[#3b1f2b]">
          {cat?.collection?.name || "All Collections"}
          {searchParams.minPrice || searchParams.maxPrice ? (
            <span className="text-lg font-normal ml-2 text-[#3b1f2b]/70">
              (KES {searchParams.minPrice || "0"} - {searchParams.maxPrice || "Any"})
            </span>
          ) : null}
        </h1>
        {searchParams.sort && (
          <span className="text-sm text-[#3b1f2b]/70">
            Sorted by: {searchParams.sort.replace('asc', 'Low to High').replace('desc', 'High to Low')}
          </span>
        )}
      </div>

      {/* Product List */}
      <Suspense fallback={<ProductsListSkeleton />}>
        <ProductList
          categoryId={cat?.collection?._id || "00000000-000000-000000-000000000001"}
          searchParams={searchParams}
        />
      </Suspense>
    </section>
  );
};

export default Shop;