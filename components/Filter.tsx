"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaFilter, FaTimes, FaChevronDown } from "react-icons/fa";
import { useState, useEffect } from "react";
import CatDropdown from "./CatDropdown";

const Filter = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleFilterChange = (name: string, value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set(name, value);
        replace(`${pathname}?${params.toString()}`);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        handleFilterChange(name, value);
    };

    const clearFilters = () => {
        replace(pathname);
        if (isMobile) setIsMobileFiltersOpen(false);
    };

    return (
        <div className="mt-12 mb-8">
            {/* Mobile Filter Button */}
            <button
                className="md:hidden flex items-center gap-2 bg-[#D4AF37] text-white px-4 py-3 rounded-full text-sm mb-4 shadow-lg hover:bg-[#c5a233] transition-colors"
                onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            >
                <FaFilter className="text-white" />
                {isMobileFiltersOpen ? 'Hide Filters' : 'Show Filters'}
                <FaChevronDown className={`transition-transform ${isMobileFiltersOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Mobile Filter Panel */}
            {(isMobileFiltersOpen || !isMobile) && (
                <div className={`${isMobile ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto' : 'flex justify-between flex-wrap items-center bg-white p-2 rounded-full shadow-sm border border-gray-100'}`}>
                    {isMobile && (
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-[#D4AF37]">Filter Wigs</h2>
                            <button
                                onClick={() => setIsMobileFiltersOpen(false)}
                                className="text-gray-500 hover:text-[#D4AF37]"
                            >
                                <FaTimes size={20} />
                            </button>
                        </div>
                    )}

                    <div className={`${isMobile ? 'space-y-6' : 'flex gap-4 items-center flex-wrap'}`}>
                        {/* Category Dropdown */}
                        <div className={`${isMobile ? 'w-full' : ''}`}>
                            <label className={`${isMobile ? 'block text-sm font-medium text-gray-700 mb-1' : 'sr-only'}`}>Category</label>
                            <CatDropdown handleFilterChange={handleFilterChange} />
                        </div>

                        {/* Price Range */}
                        <div className={`${isMobile ? 'w-full space-y-2' : 'flex items-center gap-2'}`}>
                            <label className={`${isMobile ? 'block text-sm font-medium text-gray-700' : 'sr-only'}`}>Price Range</label>
                            <div className="flex items-center gap-2 w-full">
                                <input
                                    type="number"
                                    name="minPrice"
                                    placeholder="Min Price in (KES)"
                                    className="flex-1 py-3 px-4 rounded-full border border-gray-200 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 text-sm"
                                    onChange={handleInputChange}
                                />
                                <span className="text-gray-400">-</span>
                                <input
                                    type="number"
                                    name="maxPrice"
                                    placeholder="Max Price in (KES)"
                                    className="flex-1 py-3 px-4 rounded-full border border-gray-200 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 text-sm"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        {/* Clear Filters */}
                        {searchParams.toString() && (
                            <button
                                onClick={clearFilters}
                                className={`${isMobile ? 'w-full' : ''} flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-full text-sm transition-colors`}
                            >
                                <FaTimes /> Clear all filters
                            </button>
                        )}
                    </div>

                    {/* Sort By - Mobile */}
                    {isMobile && (
                        <div className="mt-8 w-full">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                            <select
                                name="sort"
                                className="w-full py-3 px-4 rounded-full border border-gray-200 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 bg-white text-sm"
                                onChange={handleInputChange}
                                value={searchParams.get('sort') || ''}
                            >
                                <option>Sort By</option>
                                <option value="asc price">Price (low to high)</option>
                                <option value="desc price">Price (high to low)</option>
                                <option value="asc lastUpdated">Newest</option>
                                <option value="desc lastUpdated">Oldest</option>
                            </select>
                        </div>
                    )}

                    {/* Sort By - Desktop */}
                    {!isMobile && (
                        <div className="flex items-center gap-2">

                            <select
                                name="sort"
                                className="py-2 px-4 rounded-full border border-gray-200 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] bg-white text-xs"
                                onChange={handleInputChange}
                                value={searchParams.get('sort') || ''}
                            >
                                <option>Sort By</option>
                                <option value="asc price">Price (low to high)</option>
                                <option value="desc price">Price (high to low)</option>
                                <option value="asc lastUpdated">Newest</option>
                                <option value="desc lastUpdated">Oldest</option>
                            </select>
                        </div>
                    )}

                    {isMobile && (
                        <button
                            onClick={() => setIsMobileFiltersOpen(false)}
                            className="w-full mt-6 bg-[#D4AF37] hover:bg-[#c5a233] text-white py-3 px-6 rounded-full text-sm font-medium transition-colors"
                        >
                            Show Results
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Filter;