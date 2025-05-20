import React from 'react';
import CategoryItem from './CategoryItem';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { wixClientServer } from '@/lib/wixClientServer';

const CategoryList = async () => {
    const wixClient = await wixClientServer();
    const res = await wixClient.collections.queryCollections().find();
    const categories = res.items;

    return (
        <div className="relative">
            {/* Scroll indicators for mobile */}
            <div className="md:hidden absolute right-6 top-1/2 -translate-y-1/2 z-10 flex items-center">
                <div className="animate-bounce-horizontal flex items-center text-gray-400">
                    <ChevronLeft className="h-6 w-6" />
                    <ChevronRight className="h-6 w-6" />
                </div>
            </div>

            {/* Scrollable container */}
            <div className="relative">
                <div 
                    className="overflow-x-auto pb-6 scroll-smooth"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}
                >
                    <div className="flex gap-4 md:gap-6 lg:gap-8 w-max">
                        {categories && categories.map(c => (
                            <CategoryItem key={c._id} category={c} />
                        ))}
                    </div>
                </div>

                {/* Gradient fade effects */}
                <div className="md:hidden absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none"></div>
                <div className="md:hidden absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none"></div>
            </div>
        </div>
    );
};

export default CategoryList;