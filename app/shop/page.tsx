export const dynamic = "force-dynamic";

import Filter from "@/components/Filter";
import ProductList from "@/components/ProductList";
import ProductsListSkeleton from "@/components/ProductsListSkeleton";
import { wixClientServer } from "@/lib/wixClientServer";
import { Metadata } from "next";
import Image from "next/image";
import React, { Suspense } from "react";

export async function generateMetaData(): Promise<Metadata> {
  return {
    title: "Shop Premium Wigs | Up to 50% Off - Perfect Strands",
    description:
      "Discover premium quality wigs and hair extensions. Shop our latest collections with up to 50% discount. Fast delivery and top-rated products.",
    keywords: [
      "wigs",
      "premium wigs",
      "hair extensions",
      "shop wigs",
      "wig sale",
    ],
    openGraph: {
      title: "Shop Premium Wigs | Up to 50% Off - Perfect Strands",
      description:
        "Discover premium quality wigs and hair extensions. Shop our latest collections with up to 50% discount. Fast delivery and top-rated products.",
      url: "https://perfect-strands.vercel.app/shop",
      siteName: "Perfect Strands",
      images: [
        {
          url: "https://perfect-strands.vercel.app/_next/image?url=%2Fwoman.png&w=640&q=75",
          width: 800,
          height: 600,
          alt: "Shop Premium Wigs | Up to 50% Off - Perfect Strands",
        },
      ],
      type: "website",
    },
  };
};

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
        Explore Our {cat?.collection?.name || "Wig Collection"}!
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
