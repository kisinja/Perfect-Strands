
import React from 'react'
import ProductItem from './ProductItem'
import { wixClientServer } from '@/lib/wixClientServer';

const PRODUCTS_PER_PAGE = 20;


const ProductList = async ({
    categoryId,
    limit,
    searchParams,
}:
    {
        categoryId: string,
        limit?: number,
        searchParams?: any,
    }) => {

    const wixClient = await wixClientServer();
    const res = await wixClient.products
        .queryProducts()
        .startsWith("name", searchParams?.name && searchParams?.name.toLowerCase() || "")
        .limit(limit || PRODUCTS_PER_PAGE)
        .in("collectionIds", categoryId)
        .hasSome("productType", searchParams?.type ? [searchParams.type] : ["physical", "digital"])
        .gt("priceData.price", searchParams?.minPrice || 0)
        .lt("priceData.price", searchParams?.maxPrice || 999999)
        .find();
    const products = res.items;

    return (
        <div className='flex gap-x-8 gap-y-16 justify-between flex-wrap'>
            {
                products.map((product) => (
                    <ProductItem key={product._id} product={product} />
                ))
            }
            {
                products.length === 0 && <div className='text-center'>No products found</div>
            }

        </div>
    )
}

export default ProductList