import React from "react";

const ProductsListSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Title Skeleton */}
      <div className="h-8 w-1/4 bg-gray-200 rounded mb-8 animate-pulse"></div>

      {/* Filter/Sort Controls Skeleton */}
      <div className="flex justify-between items-center mb-8">
        <div className="h-6 w-1/6 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-10 w-1/5 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Products Grid Skeleton */}
      <div className="flex flex-wrap gap-8 justify-between">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
          >
            {/* Image Placeholder */}
            <div className="relative w-full h-80 bg-gray-200 rounded-md animate-pulse"></div>

            {/* Product Info Placeholder */}
            <div className="flex justify-between">
              <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-5 w-1/4 bg-gray-200 rounded animate-pulse"></div>
            </div>

            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>

            {/* Button Placeholder */}
            <div className="h-8 w-24 bg-gray-200 rounded-2xl animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsListSkeleton;