import { products } from "@wix/stores";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductItem = ({ product }: { product: products.Product }) => {
  return (
    <Link
      href={`/${product.slug}`}
      className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%] relative group"
    >
      {/* Optional ribbon badge */}
      {product.ribbon && (
        <div className="absolute top-2 left-2 bg-[#D4AF37] text-white text-xs font-semibold px-2 py-1 rounded z-20">
          {product.ribbon}
        </div>
      )}

      {/* Product Image Container with Advanced Hover Effect */}
      <div className="relative w-full h-80 rounded-md overflow-hidden">
        {/* Main Image */}
        <div className="absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-110 group-hover:opacity-0">
          <Image
            src={product.media?.mainMedia?.image?.url || "/placeholder-product.jpg"}
            alt={`${product.name} wig`}
            fill
            sizes="25vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Secondary Image (shown on hover) */}
        {product.media?.items?.[1]?.image?.url ? (
          <div className="absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] opacity-0 group-hover:opacity-100">
            <Image
              src={product.media.items[1].image.url}
              alt={`${product.name} alternate view`}
              fill
              sizes="25vw"
              className="object-cover scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
            />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <span className="text-white text-sm font-medium">View Details</span>
          </div>
        )}

        {/* Hover Overlay Effect */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Product Name & Price */}
      <div className="flex justify-between items-center">
        <span className="font-semibold text-gray-800 text-sm line-clamp-1">
          {product.name}
        </span>
        <span className="font-semibold text-[#D4AF37] text-sm">
          {product.priceData?.formatted?.price}
        </span>
      </div>

      {/* Description */}
      <div className="text-sm text-gray-500 line-clamp-1">
        <div
          dangerouslySetInnerHTML={{
            __html: product.description ?? "",
          }}
          className="text-xs"
        />
      </div>

      {/* CTA Button */}
      <button className="rounded-full ring-1 ring-[#D4AF37] text-white py-2 px-4 text-xs mt-2 hover:bg-[lightPink]/80 hover:text-white transition-all duration-300 ease-in-out w-max group-hover:bg-[lightPink] group-hover:text-white bg-[lightPink]">
        See Details
      </button>
    </Link>
  );
};

export default ProductItem;