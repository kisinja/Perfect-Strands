import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { collections } from '@wix/stores';

const CategoryItem = ({ category }: { category: collections.Collection }) => {
    return (
        <Link href={`/shop?cat=${category.slug}`} className='flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6'>
            <div className="relative bg-slate-100 w-full h-96">
                <Image
                    src={category.media?.mainMedia?.image?.url || "/placeholder-product.jpg"}
                    alt=""
                    fill
                    sizes="25vw"
                    className='object-cover'
                />
            </div>
            <h1 className='mt-8 font-light tracking-wide'>{category.name}</h1>
        </Link>
    );
};

export default CategoryItem;