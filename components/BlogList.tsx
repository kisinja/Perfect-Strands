import { Blog, BlogListProps } from "@/lib/types";
import React from "react";
import BlogCard from "./BlogCard";

const BlogList = ({ blogs }: BlogListProps) => {
  if (!blogs || blogs.length === 0) {
    return <p className="text-gray-500">No blogs available</p>;
  }

  return (
    <ul className="grid grid-cols-1 gap-y-8 max-w-7xl mx-auto">
      {blogs.map((blog: Blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </ul>
  );
};

export default BlogList;
