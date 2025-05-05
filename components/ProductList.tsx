
import React from 'react'
import ProductItem from './ProductItem'
import { wixClientServer } from '@/lib/wixClientServer';
import Pagination from './Pagination';


const PRODUCTS_PER_PAGE = 4;

const ProductList = async (
    {
        categoryId,
        limit,
        searchParams,
    }:
        {
            categoryId: string,
            limit?: number,
            searchParams?: any,
        }
) => {

    const wixClient = await wixClientServer();
    const productQuery = await wixClient.products
        .queryProducts()
        .startsWith("name", searchParams?.name && searchParams?.name.toLowerCase() || "")
        .in("collectionIds", categoryId)
        .hasSome("productType", searchParams?.type ? [searchParams.type] : ["physical", "digital"])
        .gt("priceData.price", searchParams?.minPrice || 0)
        .lt("priceData.price", searchParams?.maxPrice || 999999)
        .limit(limit || PRODUCTS_PER_PAGE)
        .skip(searchParams?.page ? parseInt(searchParams.page) * (limit || PRODUCTS_PER_PAGE) : 0)
    //.find();

    if (searchParams?.sort) {
        const [sortType, sortBy] = searchParams.sort.split(' ');

        if (sortType === 'asc') {
            productQuery.ascending(sortBy);
        }
        if (sortType === 'desc') {
            productQuery.descending(sortBy);
        }
    }

    const res = await productQuery.find();

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

            <Pagination
                currentPage={res?.currentPage || 0}
                hasPrevious={res?.hasPrev()}
                hasNext={res?.hasNext()}
            />
        </div>
    );
};

export default ProductList;