import { Blog } from "@/.contentlayer/generated";
import { sortBlogs } from "@/utils";
import Image from "next/image";
import React from "react";
import BlogTag from "./BlogTag";
import Link from "next/link";
import GithubSlugger from "github-slugger";

const HomeBlogCoverSection = ({ blogs }: { blogs: Blog[] }) => {
  const sortedBlogs: Blog[] = sortBlogs(blogs);
  const blog = sortedBlogs[0];
  //console.log(blog);

  const slugger = new GithubSlugger();
  return (
    <div className="w-full inline-block my-2">
      <article className="flex flex-col items-start justify-end mx-5 sm:mx-10 relative h-[85vh]">
        {/* Enhanced Overlay with stronger gradient */}
        <div className="absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-b from-transparent from-0% to-black/90 rounded-3xl z-0" />

        {/* Image with improved styling */}
        <Image
          src={blog.image || "/blurImage.png"} // TODO: Add a default image
          alt={blog.title}
          placeholder="blur"
          blurDataURL={blog.image || ""} // TODO: Add a default blur image
          fill
          className="rounded-3xl w-full h-full object-cover object-center -z-10"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          priority
        />

        <div className="w-3/4 p-16 flex flex-col items-start justify-center z-0 text-gray-100">
          <BlogTag
            link={`/categories/${
              slugger.slug(blog?.tags[0]) ?? "uncategorized"
            }`}
            name={blog.tags[0]}
            className="text-lg"
          />

          <Link href={blog.url} className="mt-6">
            <h1 className="text-4xl font-bold capitalize">
              <span className="bg-gradient-to-r from-pink-500 to-pink-500 bg-[length:0px_6px] hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500">
                {blog.title}
              </span>
            </h1>
          </Link>

          <p className="text-gray-200 text-xl mt-4 inline-block">
            {blog.description.length > 100
              ? `${blog.description.slice(0, 100)}...`
              : blog.description}
          </p>
        </div>
      </article>
    </div>
  );
};

export default HomeBlogCoverSection;
