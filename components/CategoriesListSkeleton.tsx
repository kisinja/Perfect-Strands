import React from "react";

const CategoriesListSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Title Skeleton */}
      <div className="h-8 w-1/4 bg-gray-200 rounded mb-8 animate-pulse"></div>

      {/* Categories Grid Skeleton */}
      <div className="flex flex-wrap gap-8">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
          >
            {/* Image Placeholder */}
            <div className="relative bg-gray-200 w-full h-96 rounded animate-pulse"></div>

            {/* Category Name Placeholder */}
            <div className="h-6 w-3/4 bg-gray-200 rounded mt-8 animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesListSkeleton;