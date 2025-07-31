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
  const url = new URL(
    (await headersList).get("x-url") || "http://localhost:3000"
  );
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
    "hair collection",
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
    <div className="min-h-screen bg-white">
      {/* Minimal Header Section */}
      <div className="hidden bg-pink-50 px-4 sm:flex justify-between h-64">
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl font-semibold leading-[48px] text-gray-700">
            Grab up to 50% off on
            <br /> Selected Products
          </h1>
          <button className="rounded-3xl bg-[lightPink] text-white w-max py-3 px-5 text-sm">
            Buy Now
          </button>
        </div>
        <div className="relative w-1/3">
          <Image src="/woman.png" alt="" fill className="object-contain" />
        </div>
      </div>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Filter />
        </div>

        {/* Category Info */}
        <div id="shop" className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-light text-gray-900">
                {cat?.collection?.name || "All Wigs"}
              </h2>
              {searchParams.minPrice || searchParams.maxPrice ? (
                <p className="text-sm text-gray-500 mt-1">
                  Price range: KES {searchParams.minPrice || "0"} -{" "}
                  {searchParams.maxPrice || "Any"}
                </p>
              ) : null}
            </div>

            {searchParams.sort && (
              <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2">
                <span className="text-sm font-medium text-gray-600">
                  Sorted:{" "}
                  {searchParams.sort
                    .replace("asc", "Low to High")
                    .replace("desc", "High to Low")}
                </span>
              </div>
            )}
          </div>

          {/* Product Grid */}
          <div className="bg-white rounded-lg">
            <Suspense
              fallback={
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  <ProductsListSkeleton />
                </div>
              }
            >
              <ProductList
                categoryId={
                  cat?.collection?._id || "00000000-000000-000000-000000000001"
                }
                searchParams={searchParams}
              />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
