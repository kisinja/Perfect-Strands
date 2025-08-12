import { Blog } from "@/.contentlayer/generated";
import { sortBlogs } from "@/utils";
import React from "react";
import BlogLayoutOne from "./BlogLayoutOne";
import BlogLayoutTwo from "./BlogLayoutTwo";

const FeaturedPosts = ({ blogs }: { blogs: Blog[] }) => {
  const sortedBlogs = sortBlogs(blogs);

  return (
    <section className="w-full mt-8 sm:mt-16 md:mt-24 px-5 sm:px-8 md:px-10 lg:px-12 xl:px-24">
      <h2 className="w-full inline-block font-bold capitalize text-2xl md:text-4xl text-dark dark:text-light mb-10 sm:mb-16">
        Featured Posts
      </h2>

      <div className="flex flex-col md:flex-row gap-4 w-full items-start">
        {/* Left Side - Featured Post (BlogLayoutOne) */}
        <div className="h-full md:w-2/3 flex flex-col gap-6 lg:gap-8">
          <BlogLayoutOne blog={sortedBlogs[1]} />
        </div>

        {/* Right Side - Secondary Posts (BlogLayoutTwo in column) */}
        <div className="w-full md:w-1/3 flex flex-col gap-6 h-[500px]">
          <BlogLayoutTwo blog={sortedBlogs[2]} />
          <BlogLayoutTwo blog={sortedBlogs[3]} />
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
