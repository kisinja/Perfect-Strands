import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { collections } from '@wix/stores';

const CategoryItem = ({ category }: { category: collections.Collection }) => {
    return (
        <Link 
            href={`/shop?cat=${category.slug}`} 
            className="flex-shrink-0 w-64 sm:w-72 md:w-80 lg:w-96 group transition-transform duration-300 hover:scale-[1.02]"
        >
            <div className="relative bg-gray-100 w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-md">
                <Image
                    src={category.media?.mainMedia?.image?.url || "/placeholder-category.jpg"}
                    alt={category.name || "Category Image"}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Category name on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h2 className="text-white text-xl md:text-2xl font-medium tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-100">
                        {category.name}
                    </h2>
                </div>
            </div>
            
            {/* Visible category name (mobile) */}
            <h2 className="mt-4 font-medium tracking-wide text-gray-800 md:hidden">
                {category.name}
            </h2>
        </Link>
    );
};

export default CategoryItem;