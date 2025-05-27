import Add from "@/components/Add";
import CustomizeProducts from "@/components/CustomizeProducts";
import ProductImages from "@/components/ProductImages";
import ProductItem from "@/components/ProductItem";
import { wixClientServer } from "@/lib/wixClientServer";
import { Metadata } from "next";
import React from "react";

type ParamsProps = Promise<{ slug: string }>;

export const generateMetadata = async ({
  params,
}: {
  params: ParamsProps;
}): Promise<Metadata> => {
  const { slug } = await params;
  const wixClient = await wixClientServer();
  const res = await wixClient.products.queryProducts().eq("slug", slug).find();
  const product = res.items[0];

  if (!product) {
    return {
      title: "Product not found",
      description: "Product not found",
    };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name || "",
      description: product.description || "",
      type: "website",
      url: `https://perfect-strands.vercel.app/shop/${slug}`,
      images: product.media?.items?.[0]?.image?.url
        ? [{ url: product.media.items[0].image.url }]
        : [],
      siteName: "Perfect Strands",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name || "",
      description: product.description || "",
      images: product.media?.items?.[0]?.image?.url
        ? [product.media.items[0].image.url]
        : [],
    },
    metadataBase: new URL("https://perfect-strands.vercel.app"),
    alternates: {
      canonical: `/shop/${slug}`,
    },
  };
};

const ProductDetails = async ({ params }: { params: ParamsProps }) => {
  const { slug } = await params;
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

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: product.name,
            image: product.media?.items?.map((i) => i.image?.url),
            description: product.description,
            sku: product._id,
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              price: product.price?.discountedPrice ?? product.price?.price,
              availability:
                (product.stock?.quantity ?? 0) > 0 ? "InStock" : "OutOfStock",
              url: `https://yourdomain.com/shop/${product.slug}`,
            },
          }),
        }}
      />

      <section className="flex flex-col md:flex-row gap-16 pb-6">
        <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
          <ProductImages items={product.media?.items} />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <div className="text-2xl font-medium relative">
            {product.name}
            {product.ribbon && (
              <span className="absolute -top-2 text-xs bg-[#D4AF37] text-white py-1 px-3 rounded-md font-bold z-20 transform -rotate-8 shadow-md">{product.ribbon}</span>
            )}
          </div>
          <div dangerouslySetInnerHTML={{ __html: product.description ?? "" }} className=" text-gray-500" />
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

          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {product.additionalInfoSections?.map((section: any) => (
            <div className="text-sm" key={section.title}>
              <h3 className="font-medium mb-4 underline">{section.title}</h3>
              <div dangerouslySetInnerHTML={{ __html: section.description }} />
            </div>
          ))}
        </div>
      </section>

      {relatedProducts && relatedProducts.length > 0 && (
        <>
          <div className="w-full h-[2px] bg-gray-100" />
          <section>
            <h2 className="font-semibold text-2xl my-12">
              Related to “{product.name}”
            </h2>
            <div className="flex gap-x-8 gap-y-16 justify-between flex-wrap">
              {relatedProducts.map((p) => (
                <ProductItem key={p._id} product={p} />
              ))}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default ProductDetails;
