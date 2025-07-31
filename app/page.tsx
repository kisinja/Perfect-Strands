export const dynamic = "force-dynamic";

import HeroBanner from "@/components/HeroBanner";
import ProductList from "@/components/ProductList";
import CategoryList from "@/components/CategoryList";
import { Suspense } from "react";
import { PromoGrid } from "@/components/Slider";
import ProductsListSkeleton from "@/components/ProductsListSkeleton";
import CategoriesListSkeleton from "@/components/CategoriesListSkeleton";

export async function generateMetadata() {
  return {
    title: "Perfect Strands | Trend-Setting Wigs for Iconic Queens",
    description:
      "Shop premium wigs, lace front wigs, and human hair extensions for every style and occasion. Enjoy exclusive discounts on top-quality hair products.",
    keywords: [
      "wigs",
      "human hair wigs",
      "lace front wigs",
      "hair extensions",
      "online wig store",
      "buy wigs Kenya",
      "affordable wigs",
      "premium wigs",
    ],
    openGraph: {
      title:
        "Premium Wigs & Hair Extensions | Trend-Setting Wigs for Iconic Queens",
      description:
        "Perfect Strands is an online based go-to shop for affordable and high-quality wigs. We offer a wide selection of human, semi-human, and synthetic wigs to fit every style and budget. From stylish headband wigs starting at Ksh 2500 to premium human hair options",
      url: "https://perfect-strands.vercel.app",
      type: "website",
      images: [
        {
          url: "https://perfect-strands.vercel.app/og-banner.jpg",
          width: 800,
          height: 600,
          alt: "Shop Premium Wigs Online",
        },
      ],
    },
  };
}

const Homepage = async () => {
  return (
    <main>
      {/* Hero Banner & Slider */}
      <PromoGrid />
      <HeroBanner />

      <section className="mt-24 px-4 md:px-12" id="featured-products">
        <h2 className="mb-12 text-3xl font-light text-gray-700 tracking-wide font-playfair">
          Featured Wigs & Hair Extensions
        </h2>

        <Suspense fallback={<ProductsListSkeleton />}>
          <ProductList
            categoryId={process.env.FEATURED_PRODUCTS_CATEGORY_ID!}
            limit={4}
            type="homepage"
          />
        </Suspense>
      </section>

      {/* Product Categories */}
      <div className="mt-24" id="categories">
        <h2 className="mb-12 text-3xl font-light text-gray-700 tracking-wide font-playfair px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-64">
          Wig Categories
        </h2>

        <Suspense fallback={<CategoriesListSkeleton />}>
          <CategoryList />
        </Suspense>
      </div>

      {/* Optional: Structured Data Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            name: "Perfect Strands",
            url: "https://perfect-strands.vercel.app",
            description:
              "Premium online store for wigs and hair extensions. Find human hair wigs, lace fronts, and more.",
            image: "https://perfect-strands.vercel.app/logo.jpeg",
            sameAs: [
              "https://www.tiktok.com/@perfect_strands.ke?_t=ZM-8vvODE3yeZR&_r=1",
              "https://www.instagram.com/perfect_strands.ke/profilecard/?igsh=MW0ydjcxZDU5YjN4Mw==",
            ],
          }),
        }}
      />
    </main>
  );
};

export default Homepage;
export const revalidate = 60;
