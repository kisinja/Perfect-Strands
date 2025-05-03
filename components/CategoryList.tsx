import React from 'react';
import CategoryItem from './CategoryItem';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { wixClientServer } from '@/lib/wixClientServer';

const CategoryList = async () => {

    const wixClient = await wixClientServer();
    const res = await wixClient.collections
        .queryCollections()
        .find();
    const categories = res.items;

    return (
        <div className='relative px-4'>
            {/* Scroll hint for mobile */}
            <div className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 z-10 flex items-center">
                <div className="animate-bounce-horizontal flex items-center text-gray-500">
                    <ChevronLeft className="h-6 w-6" />
                    <ChevronRight className="h-6 w-6 -ml-3" />
                </div>
            </div>

            {/* Scrollable container */}
            <div
                className="overflow-x-auto pb-4 -mx-4 px-4"
                style={{
                    scrollbarWidth: 'none', // Hide scrollbar for cleaner look
                    msOverflowStyle: 'none' // IE/Edge
                }}
            >
                <div className="flex gap-4 md:gap-8 w-max">
                    {
                        categories && categories.map(c => (
                            <CategoryItem key={c._id} category={c} />
                        ))
                    }
                </div>
            </div>

            {/* Gradient fade effect on sides */}
            <div className="md:hidden absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
            <div className="md:hidden absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
        </div>
    );
};

export default CategoryList;