import { Blog } from "@/lib/types";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { UserIcon } from "lucide-react";

const BlogCard = ({ blog }: { blog: Blog }) => {
  return (
    <li
      key={blog._id}
      className="flex flex-col lg:flex-row gap-4 w-full max-h-[240px]"
    >
      <div className="w-full lg:w-1/2 h-[240px] flex-grow relative">
        <Link href={`/${blog.url}`}>
          <Image
            src={blog.image || ""}
            alt={blog.title}
            fill
            className="rounded-2xl w-full h-full object-cover"
          />
        </Link>
      </div>
      <div className="flex flex-col gap-3 w-full lg:w-1/2">
        <div>
          <Link href={`/${blog.url}`}>
            <h2 className="text-2xl font-semibold underline text-shadow-2xs">
              {blog.title}
            </h2>
          </Link>
          <p className="text-gray-600 text-shadow-md text-[16px]">
            {blog.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {blog.tags?.map((t: string, idx: number) => (
              <span
                key={idx}
                className="text-blue-500 rounded bg-blue-50 py-1 px-2 text-xs font-light"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-[80px] text-sm text-gray-500">
          <div className="flex gap-2 items-center">
            <UserIcon className="w-4 h-4" />
            <span>
              {blog.author.split(" ")[0]
                ? blog.author?.split(" ")[0]
                : blog.author}
            </span>
          </div>
          <span>
            Published At: {new Date(blog.publishAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </li>
  );
};

export default BlogCard;
