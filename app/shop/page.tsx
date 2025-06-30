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
    <div className="relative min-h-screen px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-pink-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-24 h-24 bg-yellow-200 rounded-full opacity-30 animate-bounce delay-300"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-pink-300 rounded-full opacity-25 animate-pulse delay-700"></div>
        <div className="absolute bottom-40 right-1/3 w-16 h-16 bg-yellow-300 rounded-full opacity-20 animate-bounce delay-1000"></div>
      </div>

      <div className="relative z-10 py-8 px-4 sm:px-8">
        {/* Mind-Blowing Hero Banner */}
        <div className="relative bg-gradient-to-br from-pink-300 via-pink-200 to-yellow-200 rounded-3xl overflow-hidden shadow-2xl mb-16 transform hover:scale-[1.02] transition-all duration-700">
          {/* Floating Sparkles */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-8 left-8 text-yellow-400 text-2xl animate-pulse">✨</div>
            <div className="absolute top-16 right-16 text-pink-400 text-xl animate-bounce delay-300">💖</div>
            <div className="absolute bottom-20 left-20 text-yellow-300 text-lg animate-pulse delay-500">⭐</div>
            <div className="absolute bottom-32 right-24 text-pink-300 text-2xl animate-bounce delay-700">✨</div>
            <div className="absolute top-1/2 left-1/2 text-yellow-200 text-sm animate-pulse delay-1000">💫</div>
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-transparent"></div>

          <div className="container mx-auto flex flex-col md:flex-row items-center relative z-10 md:justify-between">
            <div className="w-full md:w-2/3 p-8 md:p-16 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 bg-white/30 backdrop-blur-sm rounded-full px-4 py-2 mb-4 border border-white/40">
                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                <span className="text-gray-700 font-medium text-sm uppercase tracking-wider">
                  {cat?.collection?.name + " Collection" || "All Collections"}
                </span>
                <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-300"></span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                It&apos;s time to
                <br />
                <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent animate-pulse">
                  sparkle &
                </span>
                <br />
                <span className="bg-gradient-to-r from-yellow-500 to-pink-500 bg-clip-text text-transparent animate-pulse delay-300">
                  shine
                </span>
              </h1>

              <p className="text-gray-600 text-lg mb-8 leading-relaxed max-w-md">
                Discover our premium collection designed for queens who dare to shine bright ✨
              </p>

              <div className="flex gap-4">
                <button className="group relative overflow-hidden bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1">
                  <span className="relative z-10 flex items-center gap-2">
                    <a href="#shop">SHOP NOW</a>
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                <button className="group bg-white/30 backdrop-blur-sm hover:bg-white/50 text-gray-700 px-8 py-4 rounded-full font-semibold transition-all duration-300 border border-white/40 hover:border-white/60 transform hover:-translate-y-1">
                  <span className="flex items-center gap-2">
                    Explore
                    <svg className="w-5 h-5 transition-transform group-hover:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>

            <div className="w-full md:w-1/3 h-64 md:h-[500px] relative">
              <div className="absolute inset-4 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl backdrop-blur-sm border border-white/30"></div>
              <Image
                src="/woman.png"
                alt="Luxury wig model"
                fill
                className="object-contain rounded-2xl transform hover:scale-105 transition-transform duration-700"
                priority
                sizes=""
              />
              {/* Image Overlay Effects */}
              <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 via-transparent to-yellow-300/20 rounded-2xl"></div>
            </div>
          </div>

          {/* Bottom Decorative Wave */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-r from-pink-200 to-yellow-200 opacity-50">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
              <path d="M0,120 Q150,80 300,100 T600,90 T900,100 T1200,80 L1200,120 Z" fill="rgba(255,255,255,0.3)" />
            </svg>
          </div>
        </div>

        {/* Enhanced Filter Section */}

        <Filter />


        {/* Elegant Category Header */}
        <div id="shop" className="relative mb-12">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 bg-gradient-to-r from-pink-50 to-yellow-50 rounded-2xl p-8 border border-pink-100 shadow-lg">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-300"></div>
                <div className="w-1 h-1 bg-pink-300 rounded-full animate-pulse delay-500"></div>
              </div>
              <h1 className="text-3xl md:text-4xl font-medium bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text text-transparent">
                {cat?.collection?.name + " Collection" || "All Collections"}
              </h1>
              {searchParams.minPrice || searchParams.maxPrice ? (
                <div className="inline-flex items-center gap-2 mt-3 bg-white/50 backdrop-blur-sm rounded-full px-4 py-2 border border-pink-200">
                  <span className="text-sm font-medium text-gray-600">
                    KES {searchParams.minPrice || "0"} - {searchParams.maxPrice || "Any"}
                  </span>
                </div>
              ) : null}
            </div>

            {searchParams.sort && (
              <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm rounded-full px-4 py-2 border border-yellow-200">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
                <span className="text-sm font-medium text-gray-600">
                  {searchParams.sort.replace('asc', 'Low to High').replace('desc', 'High to Low')}
                </span>
              </div>
            )}
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-300 rounded-full opacity-60 animate-bounce"></div>
          <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-pink-300 rounded-full opacity-60 animate-pulse"></div>
        </div>

        {/* Enhanced Product List Container */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-50/30 to-transparent pointer-events-none"></div>
          <Suspense fallback={
            <div className="relative bg-white/40 backdrop-blur-sm rounded-2xl p-8 border border-pink-100">
              <ProductsListSkeleton />
            </div>
          }>
            <div className="relative bg-white/40 backdrop-blur-sm rounded-2xl p-8 border border-pink-100 shadow-lg">
              <ProductList
                categoryId={cat?.collection?._id || "00000000-000000-000000-000000000001"}
                searchParams={searchParams}
              />
            </div>
          </Suspense>
        </div>

        {/* Bottom Floating Elements */}
        <div className="fixed bottom-8 right-8 pointer-events-none z-20">
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full opacity-20 animate-pulse"></div>
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full opacity-30 animate-bounce delay-300"></div>
            <div className="w-6 h-6 bg-gradient-to-r from-pink-300 to-yellow-300 rounded-full opacity-25 animate-pulse delay-600"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;