"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

const Pagination = ({
  currentPage,
  hasPrevious,
  hasNext,
}: {
  currentPage: number;
  hasPrevious: boolean;
  hasNext: boolean;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full mt-12 mb-8 px-4">
      {/* Previous Button - Full width on mobile, auto on larger screens */}
      <button
        className={`flex-1 sm:flex-none w-full sm:w-auto flex items-center justify-center gap-2 text-gray-700 font-medium py-2 px-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200
          ${
            !hasPrevious ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
          }`}
        disabled={!hasPrevious}
        onClick={() => createPageUrl(currentPage - 1)}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span className="sm:hidden">Previous Page</span>
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Current Page Indicator - Always centered */}
      {currentPage !== 0 && (
        <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-50 text-gray-600 text-sm sm:text-base">
          <span>Page</span>
          <span className="font-medium">{currentPage}</span>
        </div>
      )}

      {/* Next Button - Full width on mobile, auto on larger screens */}
      <button
        className={`flex-1 sm:flex-none w-full sm:w-auto flex items-center justify-center gap-2 text-gray-700 font-medium py-2 px-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200
          ${!hasNext ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"}`}
        disabled={!hasNext}
        onClick={() => createPageUrl(currentPage + 1)}
      >
        <span className="sm:hidden">Next Page</span>
        <span className="hidden sm:inline">Next</span>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
