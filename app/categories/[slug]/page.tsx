import { allBlogs, Blog } from "@/.contentlayer/generated";
import { ParamsProps } from "@/lib/types";
import React from "react";
import GithubSlugger from "github-slugger";
import Categories from "@/components/Categories";
import BlogLayoutThree from "@/components/BlogLayoutThree";

const slugger = new GithubSlugger();

export async function generateStaticParams() {
  const categories: string[] = [];
  const paths = [{ slug: "all" }];

  allBlogs.map((b) => {
    if (b.isPublished) {
      b.tags.map((t) => {
        const slugified: string = slugger.slug(t);
        if (!categories.includes(slugified)) {
          categories.push(slugified);
          paths.push({ slug: slugified });
        }
      });
    }
  });

  return paths;
}

export async function generateMetadata({ params }: { params: ParamsProps }) {
  const { slug } = await params;
  return {
    title: `${slug.replaceAll("-", " ")} Blogs`,
    description: `Learn more about ${
      slug === "all" ? "wigs" : slug.replaceAll("-", " ")
    } through our collection of expert blogs and tutorials`,
  };
}

const CategoriesPage = async ({ params }: { params: ParamsProps }) => {
  const { slug } = await params;

  const allCategories = ["all"];

  const blogs = allBlogs.filter((b: Blog) => {
    return b.tags.some((t: string) => {
      const sluggified = slugger.slug(t);
      if (!allCategories.includes(sluggified)) {
        allCategories.push(sluggified);
      }
      if (slug === "all") {
        return true;
      }

      return sluggified === slug;
    });
  });

  return (
    <article className="mt-4 flex flex-col text-black blog-font">
      <section className=" flex flex-col ">
        <h1 className="mt-6 font-medium text-5xl ">#{slug}</h1>
        <span className="mt-2 inline-block text-gray-600">
          Discover more categories and expand your knowledge
        </span>
      </section>
      <Categories categories={allCategories} active={slug} />

      <section className="grid grid-cols-2 sm:grid-cols-3 grid-rows-2 gap-16 mt-8">
        {blogs.length === 0 ? (
          <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg text-center">
            No blogs found in this category.
          </div>
        ) : (
          blogs.map((b, idx: number) => (
            <article key={idx} className="col-span-1 row-span-1 relative">
              <BlogLayoutThree blog={b} />
            </article>
          ))
        )}
      </section>
    </article>
  );
};

export default CategoriesPage;
