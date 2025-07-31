/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { useState } from "react";
import { ZoomIn } from "lucide-react";


const ProductsImages = ({ items }: {items:any[]}) => {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Convert to the format we need
  const formattedItems = items
    .filter((item) => item.image?.url && item.thumbnail?.url)
    .map((item) => ({
      url: item.image!.url,
      alt: item.title || "Product image",
      thumbUrl: item.thumbnail!.url,
    }));

  if (!formattedItems.length) {
    return (
      <div className="relative h-[500px] w-full rounded-lg bg-gray-100 flex items-center justify-center">
        <div className="text-center text-gray-400">No images available</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Main Image with Zoom Effect */}
      <div
        className="relative h-[500px] w-full overflow-hidden rounded-lg bg-[#fff0f5]/50 border border-[#D4AF37]/20"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={formattedItems[index].url}
          alt={formattedItems[index].alt}
          fill
          className={`object-cover transition-transform duration-300 ${
            isHovered ? "scale-105" : "scale-100"
          }`}
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300">
            <ZoomIn className="text-[#D4AF37] size-10" />
          </div>
        )}
      </div>

      {/* Thumbnails */}
      <div className="flex justify-start gap-4 mt-6 overflow-x-auto py-2 px-1">
        {formattedItems.map((item, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`flex-shrink-0 w-24 h-24 relative rounded-md overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
              index === i
                ? "border-[#D4AF37] shadow-md"
                : "border-transparent hover:border-[#D4AF37]/50"
            }`}
          >
            <Image
              src={item.thumbUrl}
              alt={item.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 20vw, 10vw"
            />
            {index === i && (
              <div className="absolute inset-0 bg-[#D4AF37]/20"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsImages;
