import { Blog } from "@/.contentlayer/generated";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import BlogTag from "./BlogTag";
import GithubSlugger from "github-slugger";

const BlogLayoutOne = ({ blog }: { blog: Blog }) => {
  const slugger = new GithubSlugger();

  return (
    <div className="group relative h-full min-h-max w-max overflow-hidden rounded-xl lg:rounded-2xl shadow-lg">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent/70 to-black/90" />

      {/* Featured Image */}
      <Image
        src={blog.image || "/placeholder-image.jpg"}
        alt={blog.title}
        placeholder="blur"
        blurDataURL={blog.image || "/placeholder-blur.jpg"}
        width={560}
        height={300}
        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
        quality={80}
      />

      {/* Content */}
      <div className="absolute bottom-0 left-0 z-20 w-full p-6 sm:p-8 md:p-10">
        <BlogTag
          link={`/categories/${slugger.slug(blog?.tags[0]) ?? "uncategorized"}`}
          name={blog.tags[0]}
          className="mb-4 text-sm font-medium sm:text-base px-4 py-2 border border-white/30 hover:border-white/60"
        />

        <Link href={blog.url}>
          <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
            <span className="bg-gradient-to-r from-pink-400 to-pink-600 bg-[length:0px_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_6px]">
              {blog.title}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default BlogLayoutOne;
