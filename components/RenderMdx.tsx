"use client";
import { Blog } from "@/.contentlayer/generated";
import { useMDXComponent } from "next-contentlayer2/hooks";
import Image from "next/image";
import React from "react";

const mdxComponents = {
  Image,
  a: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a
      href={href}
      rel="noopener noreferrer"
      className="text-pink-600 hover:text-pink-700 underline decoration-pink-500/50 hover:decoration-pink-600 transition-colors duration-200 font-medium"
    >
      {children}
    </a>
  ),
};

const RenderMdx = ({ blog }: { blog: Blog }) => {
  const MDXContent = useMDXComponent(blog.body.code || "");
  return (
    <div
      className="col-span-12 blog-font lg:col-span-8 prose sm:prose-base max-w-max
      prose-h1:text-gray-700
      prose-h2:text-gray-700
      prose-h3:text-gray-700
      prose-h4:text-gray-700

      /* Lists */
      prose-ul:list-disc
      prose-ol:list-decimal
      prose-li:ml-1
      prose-li:marker:text-pink-300

      /* Links */
      prose-a:text-pink-600
      prose-a:hover:text-pink-700
      prose-a:underline
      prose-a:decoration-pink-500/50
      prose-a:hover:decoration-pink-600
      prose-a:transition-colors
      prose-a:duration-200
      prose-a:font-medium

      /* Bold text */
      prose-strong:text-gray-900

      /* Image */
      prose-img:rounded-xl
      prose-img:shadow-lg

      prose-img:transition-transform

      /* Blockquote */
      prose-blockquote:not-italic
      prose-blockquote:rounded-r-lg
      prose-blockquote:w-max
      prose-blockquote:px-4
      prose-blockquote:bg-pink-100
      prose-blockquote:text-gray-800

      /* Videos */
      prose-video:rounded-xl
      prose-video:shadow-lg

    "
    >
      <MDXContent components={mdxComponents} />
    </div>
  );
};

export default RenderMdx;
