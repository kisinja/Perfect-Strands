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
      {product.ribbon && (
        <div className="absolute top-2 left-2 bg-[#D4AF37] text-white text-xs font-semibold px-2 py-1 rounded z-20">
          {product.ribbon}
        </div>
      )}

      <div className="relative w-full h-80">
        <Image
          src={
            product.media?.mainMedia?.image?.url || "/placeholder-product.jpg"
          }
          alt=""
          fill
          sizes="25vw"
          className="absolute object-cover rounded-md  z-10 hover:opacity-0 transition-opacity duration-500 ease-in-out"
        />
        {product.media?.items && (
          <Image
            src={
              product.media?.items[1]?.image?.url || "/placeholder-product.jpg"
            }
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md"
          />
        )}
      </div>
      <div className="flex justify-between">
        <span className="font-medium line-clamp-1">{product.name}</span>
        <span className="font-semibold">
          {product.priceData?.formatted?.price}
        </span>
      </div>

      <div className="text-sm text-gray-500 line-clamp-1">
        <div dangerouslySetInnerHTML={{ __html: product.description ?? "" }} className=" text-gray-500 text-sm" />
      </div>
      <button className="rounded-2xl ring-1 ring-[#D4AF37] text-[#D4AF37] py-2 w-max px-4 text-xs hover:bg-[#D4AF37] hover:text-white transition-colors duration-300 ease-in-out cursor-pointer">
        See Details
      </button>
    </Link>
  );
};

export default ProductItem;
