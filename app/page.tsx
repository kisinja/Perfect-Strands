
//import HeroBanner from '@/components/HeroBanner';
import ProductList from '@/components/ProductList';
import CategoryList from '@/components/CategoryList';
import { Suspense } from 'react';
import { Slider } from '@/components/Slider';
//import { wixClientServer } from '@/lib/wixClientServer';


const Homepage = async () => {

  /* const wixClient = await wixClientServer();
  const res = await wixClient.products.queryProducts().find();
  const products = res.items;
  console.log('products', products); */


  return (
    <div className=''>
      <Slider />
      {/* <HeroBanner /> */}
      <section className='mt-24' id='featured-products'>
        <h1 className='mb-12 text-2xl'>Featured Products</h1>
        <Suspense fallback={"loading..."}>
          <ProductList categoryId={process.env.FEATURED_PRODUCTS_CATEGORY_ID!} limit={4} />
        </Suspense>
      </section>
      <div className='mt-24' id='categories'>
        <h1 className='mb-12 text-2xl px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-64'>Categories</h1>
        <CategoryList />
      </div>
      {/* <section className='mt-24' id='new-products'>
        <h1 className='mb-12 text-2xl'>New Products</h1>
        <ProductList />
      </section> */}
    </div>
  );
};

export default Homepage;