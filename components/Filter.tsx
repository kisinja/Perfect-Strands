"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaFilter, FaTimes, FaChevronDown, FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import CatDropdown from "./CatDropdown";
import { motion, AnimatePresence } from "framer-motion";

const Filter = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilters, setActiveFilters] = useState<string[]>([]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // Track active filters for badge display
        const filters = [];
        if (searchParams.get('category')) filters.push('category');
        if (searchParams.get('minPrice') || searchParams.get('maxPrice')) filters.push('price');
        if (searchParams.get('length')) filters.push('length');
        if (searchParams.get('texture')) filters.push('texture');
        if (searchParams.get('color')) filters.push('color');
        setActiveFilters(filters);
    }, [searchParams]);

    const handleFilterChange = (name: string, value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set(name, value);
        replace(`${pathname}?${params.toString()}`);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        handleFilterChange(name, value);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        handleFilterChange("search", searchQuery);
    };

    const clearFilters = () => {
        replace(pathname);
        setSearchQuery("");
        if (isMobile) setIsMobileFiltersOpen(false);
    };

    const hasFilters = activeFilters.length > 0;

    return (
        <div className="mt-8 mb-12">
            {/* Desktop Filter Bar */}
            {!isMobile && (
                <div className="bg-white p-6 rounded-2xl shadow-xl border border-amber-50 mb-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        {/* Search Bar */}
                        <div className="flex-1 min-w-[300px] relative">
                            <form onSubmit={handleSearch}>
                                <input
                                    type="text"
                                    placeholder="Search wigs by style, color or texture..."
                                    className="w-full py-3 pl-12 pr-6 rounded-lg border border-amber-100 focus:ring-2 focus:ring-amber-300 focus:border-transparent bg-white shadow-sm transition-all text-sm"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-400" />
                            </form>
                        </div>

                        {/* Category Dropdown */}
                        <div className="min-w-max">
                            <CatDropdown handleFilterChange={handleFilterChange} />
                        </div>

                        {/* Price Range */}
                        <div className="flex items-center gap-2 bg-amber-50 p-2 rounded-lg">
                            <input
                                type="number"
                                name="minPrice"
                                placeholder="Min (KES)"
                                className="w-24 py-2 px-3 rounded border border-amber-100 focus:ring-1 focus:ring-amber-300 focus:border-transparent bg-white text-xs"
                                onChange={handleInputChange}
                            />
                            <span className="text-amber-500 text-xs">to</span>
                            <input
                                type="number"
                                name="maxPrice"
                                placeholder="Max (KES)"
                                className="w-24 py-2 px-3 rounded border border-amber-100 focus:ring-1 focus:ring-amber-300 focus:border-transparent bg-white text-xs"
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Clear Filters */}
                        {hasFilters && (
                            <button
                                onClick={clearFilters}
                                className="flex items-center gap-1 text-amber-600 hover:text-amber-800 text-xs font-medium ml-auto"
                            >
                                <FaTimes size={10} /> Clear all
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Mobile Filter Button */}
            <button
                className="md:hidden flex items-center gap-3 bg-gradient-to-r from-amber-600 to-pink-600 text-white px-6 py-3 rounded-full text-sm mb-4 shadow-lg hover:shadow-amber-200/50 transition-all"
                onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            >
                <FaFilter className="text-white" />
                {isMobileFiltersOpen ? 'Hide Filters' : 'Filter Wigs'}
                {hasFilters && (
                    <span className="flex items-center justify-center w-5 h-5 bg-white text-amber-600 rounded-full text-xs font-bold">
                        {activeFilters.length}
                    </span>
                )}
                <FaChevronDown className={`transition-transform duration-300 ${isMobileFiltersOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Mobile Filter Panel */}
            <AnimatePresence>
                {(isMobileFiltersOpen || !isMobile) && (
                    <motion.div
                        initial={isMobile ? { y: '100%', opacity: 0 } : { opacity: 0 }}
                        animate={isMobile ? { y: 0, opacity: 1 } : { opacity: 1 }}
                        exit={isMobile ? { y: '100%', opacity: 0 } : { opacity: 0 }}
                        transition={{ type: 'spring', damping: 25 }}
                        className={`${isMobile ?
                            'fixed inset-0 z-50 bg-white p-6 overflow-y-auto pt-16' :
                            'hidden'}`}
                    >
                        {/* Mobile Header */}
                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-amber-100">
                            <h2 className="text-2xl font-bold text-amber-800">Filter Wigs</h2>
                            <button
                                onClick={() => setIsMobileFiltersOpen(false)}
                                className="text-gray-500 hover:text-amber-600 transition-colors"
                            >
                                <FaTimes size={24} />
                            </button>
                        </div>

                        {/* Mobile Search */}
                        <form onSubmit={handleSearch} className="mb-6 relative">
                            <input
                                type="text"
                                placeholder="Search wigs..."
                                className="w-full py-3 pl-10 pr-4 rounded-lg border border-amber-100 focus:ring-2 focus:ring-amber-300 focus:border-transparent bg-white shadow-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400" />
                        </form>

                        {/* Filter Sections */}
                        <div className="space-y-8">
                            {/* Category */}
                            <div>
                                <h3 className="text-sm font-semibold text-amber-700 mb-3">CATEGORY</h3>
                                <CatDropdown handleFilterChange={handleFilterChange} />
                            </div>

                            {/* Price Range */}
                            <div>
                                <h3 className="text-sm font-semibold text-amber-700 mb-3">PRICE RANGE (KES)</h3>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="number"
                                        name="minPrice"
                                        placeholder="Min"
                                        className="flex-1 py-2 px-3 rounded border border-amber-100 focus:ring-1 focus:ring-amber-300 focus:border-transparent bg-white text-sm"
                                        onChange={handleInputChange}
                                    />
                                    <span className="text-amber-500">to</span>
                                    <input
                                        type="number"
                                        name="maxPrice"
                                        placeholder="Max"
                                        className="flex-1 py-2 px-3 rounded border border-amber-100 focus:ring-1 focus:ring-amber-300 focus:border-transparent bg-white text-sm"
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            {/* Wig Length */}
                            <div>
                                <h3 className="text-sm font-semibold text-amber-700 mb-3">LENGTH</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {['Short', 'Medium', 'Long', 'Extra Long'].map((length) => (
                                        <button
                                            key={length}
                                            type="button"
                                            onClick={() => handleFilterChange('length', length.toLowerCase().replace(' ', '-'))}
                                            className={`py-2 px-3 rounded-full border text-sm ${searchParams.get('length') === length.toLowerCase().replace(' ', '-') ?
                                                'bg-amber-600 text-white border-amber-600' :
                                                'bg-white text-gray-700 border-amber-100 hover:border-amber-300'}`}
                                        >
                                            {length}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-amber-100 shadow-lg">
                            <div className="flex gap-3">
                                {hasFilters && (
                                    <button
                                        onClick={clearFilters}
                                        className="flex-1 py-3 px-4 rounded-lg border border-amber-200 text-amber-600 font-medium text-sm flex items-center justify-center gap-2"
                                    >
                                        <FaTimes /> Clear All
                                    </button>
                                )}
                                <button
                                    onClick={() => setIsMobileFiltersOpen(false)}
                                    className={`${hasFilters ? 'flex-1' : 'w-full'} py-3 px-4 rounded-lg bg-gradient-to-r from-amber-600 to-pink-600 text-white font-medium text-sm`}
                                >
                                    Show {hasFilters ? `${activeFilters.length} Filters` : 'All Wigs'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Filter;