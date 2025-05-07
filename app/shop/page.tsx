import Filter from '@/components/Filter';
import ProductList from '@/components/ProductList';
import { wixClientServer } from '@/lib/wixClientServer';
import Image from 'next/image';
import React, { Suspense } from 'react';

type SearchParams = Promise<
    {
        [key: string]: string | string[] | undefined;
        cat?: string;
        sort?: string;
    }>;

const Shop = async ({ searchParams }: { searchParams: SearchParams }) => {
    const wixClient = await wixClientServer();

    // Get the category slug from searchParams
    const slug = searchParams?.cat || 'all-products';

    // Fetch the collection
    const cat = await wixClient.collections.getCollectionBySlug(slug);

    return (
        <section className="relative py-2">
            {/* Promo Banner */}
            <div className="hidden bg-[#D4AF37]/50 px-4 sm:flex justify-between h-64 relative">
                <div className="w-2/3 flex flex-col items-center justify-center gap-8">
                    <h1 className="font-semibold text-4xl leading-[48px] text-gray-700">
                        Grab up to 50% off on <br /> Selected Products
                    </h1>
                    <button
                        className="bg-[#D4AF37] text-white px-4 py-2 rounded-3xl mt-4 hover:bg-[#b89c2d] transition duration-200 cursor-pointer"
                    >
                        Buy Now
                    </button>
                </div>
                <div className="relative w-1/3">
                    <Image
                        src="/woman.png"
                        alt="category image"
                        className="object-contain"
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 33vw"
                    />
                </div>
            </div>

            {/* Filter Component */}
            <Filter />

            {/* Category Title */}
            <h1 className="font-semibold text-xl mt-12 mb-8">
                {cat?.collection?.name || 'Wigs'} For You!
            </h1>

            {/* Product List */}
            <Suspense fallback={<div className="text-center py-8">Loading products...</div>}>
                <ProductList
                    categoryId={cat?.collection?._id || '00000000-000000-000000-000000000001'}
                    searchParams={searchParams}
                />
            </Suspense>
        </section>
    );
};

export default Shop;