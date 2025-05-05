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
        <div className="flex justify-between items-center w-full mt-12">
            <button className="rounded-md bg-[#D4AF37] text-white p-2 text-sm w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-[#D4AF37]/20 focus:bg-black" disabled={!hasPrevious} onClick={() => createPageUrl(currentPage - 1)}>
                Previous
            </button>

            <button className="rounded-md bg-[#D4AF37] text-white p-2 text-sm w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-[#D4AF37]/50 focus:bg-black" disabled={!hasNext} onClick={() => createPageUrl(currentPage + 1)}>
                Next
            </button>
        </div>
    );
};

export default Pagination;