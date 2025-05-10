import Add from "@/components/Add";
import CustomizeProducts from "@/components/CustomizeProducts";
import ProductImages from "@/components/ProductImages";
import ProductItem from "@/components/ProductItem";
import { wixClientServer } from "@/lib/wixClientServer";
import React from "react";

type ParamsProps = Promise<{
  slug: string;
}>;

const ProductDetails = async ({ params }: { params: ParamsProps }) => {
  const slug = (await params).slug;
  const wixClient = await wixClientServer();

  const res = await wixClient.products.queryProducts().eq("slug", slug).find();
  const product = res.items[0];
  if (!product) {
    return <h1>Product not found</h1>;
  }

  const relatedRes = await wixClient.products
    .queryProducts()
    .eq("collectionIds", product?.collectionIds?.[0] ?? "")
    .limit(4)
    .find();

  const relatedProducts = relatedRes.items?.filter(
    (item) => item._id !== product._id
  );

  console.log(product);

  return (
    <>
      <section className="flex flex-col md:flex-row gap-16 pb-6">
        <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
          <ProductImages items={product.media?.items} />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <h1 className="text-4xl font-medium">{product.name}</h1>
          <p className="text-gray-500">{product.description}</p>
          <div className="h-[2px] bg-gray-100" />

          {product.price?.price === product.price?.discountedPrice ? (
            <h2 className="text-2xl font-medium">
              {product.price?.formatted?.price}
            </h2>
          ) : (
            <div className="flex items-center gap-4">
              <h3 className="text-xl text-gray-500 line-through">
                {product.price?.formatted?.price}
              </h3>
              <h2 className="text-2xl font-medium">
                {product.price?.formatted?.discountedPrice}
              </h2>
            </div>
          )}

          <div className="h-[2px] bg-gray-100" />

          {product.variants && product.productOptions ? (
            <CustomizeProducts
              productId={product._id!}
              variants={product.variants}
              productOptions={product.productOptions}
            />
          ) : (
            <Add
              productId={product._id!}
              variantId="00000000-0000-0000-0000-000000000000"
              stockNumber={product.stock?.quantity || 0}
            />
          )}
          <div className="h-[2px] bg-gray-100" />
          {product.additionalInfoSections &&
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            product.additionalInfoSections?.map((section: any) => (
              <div className="text-sm" key={section.title}>
                <h4 className="font-medium mb-4 underline">{section.title}</h4>
                <div
                  dangerouslySetInnerHTML={{ __html: section.description }}
                />
              </div>
            ))}
        </div>
      </section>
      <div className="w-full h-[2px] bg-gray-100" />
      <section>
        {relatedProducts.length > 0 ? (
          <>
            <h1 className="font-sembold text-2xl my-12">Related Products</h1>
            <div className="flex gap-x-8 gap-y-16 justify-between flex-wrap">
              {relatedProducts?.map((p) => (
                <ProductItem key={p._id} product={p} />
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-[50vh]">
            <h3 className="text-gray-600 text-xl text-center">
              No related products found
            </h3>
          </div>
        )}
      </section>
    </>
  );
};

export default ProductDetails;
