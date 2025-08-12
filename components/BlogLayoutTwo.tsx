import { Blog } from "@/.contentlayer/generated";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogLayoutTwo = ({ blog }: { blog: Blog }) => {
  return (
    <div className="group flex items-start gap-4 lg:gap-6 w-full h-full ">
      <Link
        href={blog.url}
        className=" h-full rounded-xl overflow-hidden"
      >
        <Image
          src={blog.image || "/placeholder-image.jpg"}
          alt={blog.title}
          width={420}
          height={280}
          className="object-cover object-center rounded-xl h-full transition-transform duration-700 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-col w-full">
        <span className="inline-block w-full uppercase text-pink-500 font-semibold text-xs sm:text-sm">
          {blog.tags[0]}
        </span>
        <Link href={blog.url} className="inline-block my-1">
          <h2 className="font-semibold capitalize text-base sm:text-lg">
            <span
              className="bg-gradient-to-r from-pink-500/50 dark:from-pink-500/50 to-pink-500/50 dark:to-pink-500/50 bg-[length:0px_6px]
                group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 "
            >
              {blog.title}
            </span>
          </h2>
        </Link>

        <span className="inline-block w-full capitalize text-gray-500 font-semibold  text-sm">
          {format(new Date(blog.publishAt), "MMMM dd, yyyy")}
        </span>
      </div>
    </div>
  );
};

export default BlogLayoutTwo;
