import Add from "@/components/Add";
import CustomizeProducts from "@/components/CustomizeProducts";
import ProductImages from "@/components/ProductImages";
import ProductItem from "@/components/ProductItem";
import { wixClientServer } from "@/lib/wixClientServer";
import { Metadata } from "next";
import React from "react";
import { FaCrown } from "react-icons/fa";

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
      title: "PRODUCT NOT FOUND | PERFECT STRANDS",
      description: "Product not found",
    };
  }

  return {
    title: `${product.name?.toUpperCase()} | PERFECT STRANDS`,
    description: product.description,
    openGraph: {
      title: `${product.name?.toUpperCase()} | PERFECT STRANDS`,
      description: product.description || "",
      type: "website",
      url: `https://perfect-strands.vercel.app/shop/${slug}`,
      images: product.media?.items?.[0]?.image?.url
        ? [{ url: product.media.items[0].image.url }]
        : [],
      siteName: "PERFECT STRANDS",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name?.toUpperCase()} | PERFECT STRANDS`,
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
    return (
      <h1 className="text-2xl font-bold text-center my-20">
        PRODUCT NOT FOUND
      </h1>
    );
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
    <div className="bg-[#fff0f5]/30">
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
            brand: {
              "@type": "Brand",
              name: "Perfect Strands",
            },
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              price: product.price?.discountedPrice ?? product.price?.price,
              availability:
                (product.stock?.quantity ?? 0) > 0 ? "InStock" : "OutOfStock",
              url: `https://perfect-strands.vercel.app/shop/${product.slug}`,
            },
          }),
        }}
      />

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-12">
        {/* Product Images */}
        <div className="w-full lg:w-1/2 lg:sticky top-8 h-max">
          <ProductImages items={product.media?.items || []} />
        </div>

        {/* Product Info */}
        <div className="w-full lg:w-1/2 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            {product.ribbon && (
              <span className="bg-gradient-to-b from-amber-600 to-pink-600 text-white text-xs font-bold py-1 px-3 rounded-full w-max uppercase tracking-wider">
                {product.ribbon}
              </span>
            )}
            <h1 className="text-3xl font-bold text-[#3b1f2b]">
              {product.name}
            </h1>
          </div>

          <div
            className="text-[#3b1f2b]/90 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: product.description ?? "" }}
          />

          <div className="h-px bg-[#D4AF37]/20" />

          {/* Pricing */}
          <div className="flex flex-col gap-2">
            {product.price?.price === product.price?.discountedPrice ? (
              <div className="text-3xl font-bold text-[#3b1f2b]">
                {product.price?.formatted?.price}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <span className="text-xl text-[#3b1f2b]/60 line-through">
                  {product.price?.formatted?.price}
                </span>
                <span className="text-3xl font-bold text-[#3b1f2b]">
                  {product.price?.formatted?.discountedPrice}
                </span>
              </div>
            )}
            <div className="text-sm text-[#3b1f2b]/70">
              {product.stock?.quantity ? (
                <span className="text-[#D4AF37] font-medium">
                  {product.stock.quantity} IN STOCK
                </span>
              ) : (
                <span className="text-red-500">OUT OF STOCK</span>
              )}
            </div>
          </div>

          <div className="h-px bg-[#D4AF37]/20" />

          {/* Add to Cart */}
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

          {/* Additional Info */}
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {product.additionalInfoSections?.map((section: any) => (
            <div className="mt-6" key={section.title}>
              <h3 className="font-bold text-[#3b1f2b] mb-3 uppercase text-sm tracking-wider">
                {section.title}
              </h3>
              <div
                className="text-[#3b1f2b]/80 text-sm"
                dangerouslySetInnerHTML={{ __html: section.description }}
              />
            </div>
          ))}

          {/* Luxury Guarantee */}
          <div className="mt-6 p-4 border border-[#D4AF37]/30 rounded-lg bg-white">
            <div className="flex items-center gap-3">
              <FaCrown className="text-[#D4AF37] flex-shrink-0" />
              <div>
                <h4 className="font-bold text-[#3b1f2b] text-sm uppercase tracking-wider">
                  LUXURY GUARANTEE
                </h4>
                <p className="text-[#3b1f2b]/70 text-sm">
                  Handcrafted with premium materials for unmatched quality and
                  durability
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-[#D4AF37]/20">
          <h2 className="font-bold text-2xl text-[#3b1f2b] mb-8 uppercase tracking-wider">
            COMPLETE YOUR LOOK
          </h2>
          <div className="flex gap-8 flex-wrap">
            {relatedProducts.map((p) => (
              <ProductItem key={p._id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
