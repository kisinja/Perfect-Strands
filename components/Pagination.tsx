"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

const Pagination = (
    {
        currentPage,
        hasPrevious,
        hasNext,
    }:
        {
            currentPage: number,
            hasPrevious: boolean,
            hasNext: boolean,
        }
) => {

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const createPageUrl = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', pageNumber.toString());
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex justify-center items-center gap-6 w-full mt-16 mb-12">
            {/* Previous Button */}
            <button
                className="group relative overflow-hidden bg-gradient-to-r from-pink-200 to-pink-300 hover:from-pink-300 hover:to-pink-400 text-gray-700 font-medium py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-md disabled:hover:from-pink-200 disabled:hover:to-pink-300 focus:outline-none focus:ring-4 focus:ring-pink-200 focus:ring-opacity-50"
                disabled={!hasPrevious}
                onClick={() => createPageUrl(currentPage - 1)}
            >
                <span className="relative z-10 flex items-center gap-2">
                    <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            {/* Current Page Indicator */}
            {currentPage !== 0 && (
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
                    <span className="text-gray-600 font-medium text-lg bg-white bg-opacity-60 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-pink-100">
                        Page {currentPage}
                    </span>
                    <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
                </div>
            )}

            {/* Next Button */}
            <button
                className="group relative overflow-hidden bg-gradient-to-r from-pink-200 to-pink-300 hover:from-pink-300 hover:to-pink-400 text-gray-700 font-medium py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-md disabled:hover:from-pink-200 disabled:hover:to-pink-300 focus:outline-none focus:ring-4 focus:ring-pink-200 focus:ring-opacity-50"
                disabled={!hasNext}
                onClick={() => createPageUrl(currentPage + 1)}
            >
                <span className="relative z-10 flex items-center gap-2">
                    Next
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
        </div>
    );
};

export default Pagination;