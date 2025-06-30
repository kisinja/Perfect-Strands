"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaFilter, FaTimes, FaChevronDown, FaSearch, FaHeart } from "react-icons/fa";
import { Sparkles, X } from "lucide-react";
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
        if (searchParams.get('name')) filters.push('name');
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
        handleFilterChange("name", searchQuery);
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
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative bg-gradient-to-br from-white/80 to-pink-50/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-pink-100/50 mb-8 overflow-hidden"
                >
                    {/* Floating Background Elements */}
                    <div className="absolute top-4 right-8 text-pink-300 text-xl opacity-30 animate-pulse">✨</div>
                    <div className="absolute bottom-6 left-12 text-yellow-300 text-lg opacity-40 animate-bounce delay-500">💖</div>
                    <div className="absolute top-8 left-1/3 text-pink-200 text-sm opacity-50 animate-pulse delay-1000">⭐</div>

                    {/* Glass Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-200/10 to-yellow-200/10 rounded-3xl"></div>

                    <div className="relative z-10">
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                                <Sparkles className="text-white text-sm" />
                            </div>
                            <h2 className="text-lg font-semibold bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text text-transparent">
                                Find Your Perfect Shine
                            </h2>
                            {hasFilters && (
                                <div className="ml-auto flex items-center gap-2">
                                    <span className="text-xs text-gray-500">Active filters:</span>
                                    <div className="flex items-center justify-center w-6 h-6 bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-full text-xs font-bold shadow-lg animate-pulse">
                                        {activeFilters.length}
                                    </div>
                                </div>
                            )}
                            {/* Clear Filters Button */}
                            {
                                hasFilters && (
                                    <button className="absolute top-1 right-1 bg-pink-400 text-white px-4 py-2 rounded-full flex items-center gap-2" onClick={clearFilters}>
                                        <X className="w-4 h-4" />
                                        <span className="text-sm font-medium">Clear Filters</span>
                                    </button>
                                )
                            }
                        </div>

                        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                            {/* Enhanced Search Bar */}
                            <div className="flex-1 min-w-[300px] relative group">
                                <form onSubmit={handleSearch}>
                                    <div className="relative overflow-hidden rounded-2xl bg-white/70 backdrop-blur-sm border border-pink-200/50 shadow-lg group-hover:shadow-xl transition-all duration-300">
                                        <input
                                            type="text"
                                            placeholder="Search for your perfect style, color, or texture... ✨"
                                            className="w-full py-4 pl-14 pr-6 bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full flex items-center justify-center">
                                            <FaSearch className="text-white text-xs" />
                                        </div>
                                        {/* Animated Border */}
                                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-300 to-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>
                                    </div>
                                </form>
                            </div>

                            {/* Enhanced Category Dropdown */}
                            <div className="relative">
                                <CatDropdown handleFilterChange={handleFilterChange} />
                            </div>

                            {/* Glamorous Price Range */}
                            <div className="flex items-center gap-3 bg-gradient-to-r from-pink-100/80 to-yellow-100/80 backdrop-blur-sm p-4 rounded-2xl border border-pink-200/50 shadow-lg">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-md">
                                        <span className="text-white text-xs font-bold">KES</span>
                                    </div>
                                </div>
                                <input
                                    type="number"
                                    name="minPrice"
                                    placeholder="Min"
                                    className="w-20 py-2 px-3 rounded-xl border border-pink-200/50 focus:ring-2 focus:ring-pink-300/50 focus:border-transparent bg-white/80 backdrop-blur-sm text-xs font-medium shadow-sm"
                                    onChange={handleInputChange}
                                />
                                <div className="w-8 h-0.5 bg-gradient-to-r from-pink-300 to-yellow-300 rounded-full"></div>
                                <input
                                    type="number"
                                    name="maxPrice"
                                    placeholder="Max"
                                    className="w-20 py-2 px-3 rounded-xl border border-pink-200/50 focus:ring-2 focus:ring-pink-300/50 focus:border-transparent bg-white/80 backdrop-blur-sm text-xs font-medium shadow-sm"
                                    onChange={handleInputChange}
                                />
                            </div>

                            {/* Magical Clear Button */}
                            {hasFilters && (
                                <motion.button
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={clearFilters}
                                    className="group flex items-center gap-2 bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white px-6 py-3 rounded-2xl text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    <FaTimes className="text-xs group-hover:rotate-90 transition-transform duration-300" />
                                    Clear Magic
                                    <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
                                </motion.button>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Stunning Mobile Filter Button */}
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="md:hidden relative overflow-hidden flex items-center gap-4 bg-gradient-to-r from-pink-400 via-pink-500 to-yellow-400 text-white px-8 py-4 rounded-3xl text-sm font-semibold mb-6 shadow-2xl hover:shadow-pink-200/50 transition-all duration-300 w-full justify-center"
                onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-400 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center gap-4">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <FaFilter className="text-white text-sm" />
                    </div>
                    <span className="text-lg">{isMobileFiltersOpen ? 'Hide Filters' : 'Find Your Sparkle'}</span>
                    {hasFilters && (
                        <div className="flex items-center justify-center w-7 h-7 bg-white text-pink-500 rounded-full text-sm font-bold shadow-lg animate-bounce">
                            {activeFilters.length}
                        </div>
                    )}
                    <FaChevronDown className={`transition-transform duration-500 ${isMobileFiltersOpen ? 'rotate-180' : ''}`} />
                </div>
                {/* Floating sparkles */}
                <div className="absolute top-2 right-4 text-white/30 text-xs animate-pulse">✨</div>
                <div className="absolute bottom-2 left-6 text-white/20 text-xs animate-bounce delay-300">💫</div>
            </motion.button>

            {/* Enchanted Mobile Filter Panel */}
            <AnimatePresence>
                {(isMobileFiltersOpen || !isMobile) && (
                    <motion.div
                        initial={isMobile ? { y: '100%', opacity: 0, scale: 0.9 } : { opacity: 0 }}
                        animate={isMobile ? { y: 0, opacity: 1, scale: 1 } : { opacity: 1 }}
                        exit={isMobile ? { y: '100%', opacity: 0, scale: 0.9 } : { opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className={`${isMobile ?
                            'fixed inset-0 z-50 bg-gradient-to-br from-pink-50 to-yellow-50 overflow-y-auto' :
                            'hidden'}`}
                    >
                        {/* Floating Background Elements */}
                        <div className="absolute top-20 right-8 text-pink-200 text-3xl opacity-30 animate-pulse">✨</div>
                        <div className="absolute top-40 left-8 text-yellow-200 text-2xl opacity-40 animate-bounce delay-300">💖</div>
                        <div className="absolute bottom-40 right-12 text-pink-300 text-xl opacity-25 animate-pulse delay-700">⭐</div>
                        <div className="absolute bottom-60 left-16 text-yellow-300 text-lg opacity-30 animate-bounce delay-1000">💫</div>

                        <div className="relative z-10 p-6 pt-16">
                            {/* Magical Mobile Header */}
                            <div className="flex justify-between items-center mb-8 pb-6 border-b-2 border-gradient-to-r from-pink-200 to-yellow-200">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-2xl flex items-center justify-center shadow-xl">
                                        <Sparkles className="text-white text-lg" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-yellow-600 bg-clip-text text-transparent">
                                            Filter Magic
                                        </h2>
                                        <p className="text-sm text-gray-500">Find your perfect match ✨</p>
                                    </div>
                                </div>
                                <motion.button
                                    whileHover={{ rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setIsMobileFiltersOpen(false)}
                                    className="w-10 h-10 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-pink-100 hover:to-yellow-100 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300"
                                >
                                    <FaTimes className="text-gray-600" />
                                </motion.button>
                            </div>

                            {/* Enchanted Mobile Search */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="mb-8"
                            >
                                <form onSubmit={handleSearch} className="relative group">
                                    <div className="relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-pink-200/50 shadow-xl group-hover:shadow-2xl transition-all duration-300">
                                        <input
                                            type="text"
                                            placeholder="Search for your dream style... 💫"
                                            className="w-full py-4 pl-14 pr-4 bg-transparent focus:outline-none text-gray-700 placeholder-gray-400 font-medium"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                                            <FaSearch className="text-white text-sm" />
                                        </div>
                                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-300/20 to-yellow-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                </form>
                            </motion.div>

                            {/* Magical Filter Sections */}
                            <div className="space-y-8">
                                {/* Category Section */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50 shadow-lg"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl flex items-center justify-center shadow-md">
                                            <FaHeart className="text-white text-sm" />
                                        </div>
                                        <h3 className="text-lg font-semibold bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text text-transparent">
                                            CATEGORY
                                        </h3>
                                    </div>
                                    <CatDropdown handleFilterChange={handleFilterChange} />
                                </motion.div>

                                {/* Price Range Section */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50 shadow-lg"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl flex items-center justify-center shadow-md">
                                            <span className="text-white text-xs font-bold">KES</span>
                                        </div>
                                        <h3 className="text-lg font-semibold bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text text-transparent">
                                            PRICE RANGE
                                        </h3>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="number"
                                            name="minPrice"
                                            placeholder="Min"
                                            className="flex-1 py-3 px-4 rounded-xl border border-pink-200/50 focus:ring-2 focus:ring-pink-300/50 focus:border-transparent bg-white/80 backdrop-blur-sm text-sm font-medium shadow-sm"
                                            onChange={handleInputChange}
                                        />
                                        <div className="w-8 h-1 bg-gradient-to-r from-pink-300 to-yellow-300 rounded-full"></div>
                                        <input
                                            type="number"
                                            name="maxPrice"
                                            placeholder="Max"
                                            className="flex-1 py-3 px-4 rounded-xl border border-pink-200/50 focus:ring-2 focus:ring-pink-300/50 focus:border-transparent bg-white/80 backdrop-blur-sm text-sm font-medium shadow-sm"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </motion.div>

                                {/* Length Selection */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50 shadow-lg"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl flex items-center justify-center shadow-md">
                                            <span className="text-white text-xs font-bold">L</span>
                                        </div>
                                        <h3 className="text-lg font-semibold bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text text-transparent">
                                            LENGTH
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        {['Short', 'Medium', 'Long', 'Extra Long'].map((length, index) => (
                                            <motion.button
                                                key={length}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.5 + index * 0.1 }}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                type="button"
                                                onClick={() => handleFilterChange('length', length.toLowerCase().replace(' ', '-'))}
                                                className={`py-3 px-4 rounded-2xl border-2 text-sm font-medium transition-all duration-300 ${searchParams.get('length') === length.toLowerCase().replace(' ', '-') ?
                                                    'bg-gradient-to-r from-pink-400 to-yellow-400 text-white border-transparent shadow-lg transform scale-105' :
                                                    'bg-white/80 text-gray-700 border-pink-200/50 hover:border-pink-300/70 hover:bg-pink-50/50 shadow-sm'}`}
                                            >
                                                {length}
                                            </motion.button>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>

                            {/* Magical Action Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent p-6 border-t border-pink-100/50 shadow-2xl backdrop-blur-lg"
                            >
                                <div className="flex gap-4">
                                    {hasFilters && (
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={clearFilters}
                                            className="flex-1 py-4 px-6 rounded-2xl border-2 border-pink-200 bg-white/80 backdrop-blur-sm text-pink-600 font-semibold text-sm flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300"
                                        >
                                            <FaTimes className="text-sm" />
                                            Clear All Magic
                                        </motion.button>
                                    )}
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setIsMobileFiltersOpen(false)}
                                        className={`${hasFilters ? 'flex-1' : 'w-full'} py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-400 via-pink-500 to-yellow-400 text-white font-bold text-sm shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden`}
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            <Sparkles />
                                            Show {hasFilters ? `${activeFilters.length} Magical Filters` : 'All Sparkles'}
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-400 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                                    </motion.button>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Filter;