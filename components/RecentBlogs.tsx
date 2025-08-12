import { Blog } from "@/.contentlayer/generated";
import { sortBlogs } from "@/utils";
import Link from "next/link";
import React from "react";
import BlogLayoutThree from "./BlogLayoutThree";

const RecentPosts = ({ blogs }: { blogs: Blog[] }) => {
  const sortedBlogs = sortBlogs(blogs);

  return (
    <section className="w-full mt-8 sm:mt-16 md:mt-24 px-5 sm:px-8 md:px-10 lg:px-12 xl:px-24">
      <div className="flex justify-between items-ce">
        <h2 className="inline-block font-bold capitalize text-2xl md:text-4xl text-dark dark:text-light mb-10 sm:mb-16">
          Recent Posts
        </h2>

        <Link
          href="/categories/all"
          className="text-pink-500 font-medium underline inline-block underline-offset-2 text-base"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-3 grid-rows-3 gap-16 mt-12">
        {sortedBlogs.map((b: Blog, idx: number) => {
          return (
            <article className="col-span-1 row-span-1 relative" key={idx}>
              <BlogLayoutThree blog={b} />
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default RecentPosts;
