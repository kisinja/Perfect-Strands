import { allBlogs, Blog } from "@/.contentlayer/generated";
import BlogDetails from "@/components/BlogDetails";
import BlogNotFound from "@/components/BlogNotFound";
import BlogTag from "@/components/BlogTag";
import RenderMdx from "@/components/RenderMdx";
import TableofContents from "@/components/TableofContents";
import { ParamsProps } from "@/lib/types";
import siteMetaData from "@/utils/siteMetaData";
import GithubSlugger from "github-slugger";
import Image from "next/image";
import React from "react";

const slugger = new GithubSlugger();

export async function generateStaticParams() {
  return allBlogs.map((b) => ({ slug: b._raw.flattenedPath }));
};

export async function generateMetadata({ params }: { params: ParamsProps }) {
  const { slug } = await params;
  const blog = allBlogs.find((b) => b._raw.flattenedPath === slug);

  if (!blog) {
    return;
  }

  const publishedAtBlog = new Date(blog.publishAt).toISOString();
  const modifiedAtBlog = new Date(blog.updatedAt).toISOString();

  let imageList = [siteMetaData.socialBanner];
  if (blog.image) {
    imageList =
      typeof blog.image === "string"
        ? [siteMetaData.siteUrl + blog.image]
        : blog.image;
  }

  const ogImages = imageList.map((img) => {
    return {
      url: img.includes("http") ? img : `${siteMetaData.siteUrl}${img}`,
    };
  });

  const authors = blog?.author ? [blog.author] : [siteMetaData.author];

  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      url: `${siteMetaData.siteUrl}${blog.url}`,
      siteName: siteMetaData.title,
      type: "article",
      publishedTime: publishedAtBlog,
      modifiedTime: modifiedAtBlog,
      images: ogImages,
      authors: authors.length > 0 ? authors : [siteMetaData.author],
    },
  };
};

const BlogDetailsPage = async ({ params }: { params: ParamsProps }) => {
  const { slug } = await params;

  const blog: Blog | undefined = allBlogs.find(
    (b) => b._raw.flattenedPath === slug
  );

  if (!blog) {
    return <BlogNotFound />;
  }

  return (
    <article className="overflow-hidden">
      {/* Hero Section */}
      <div className="relative w-full h-screen max-h-[90vh] bg-black">
        {/* Background Image with overlay */}
        <div className="absolute inset-0">
          <Image
            src={blog?.image || "/placeholder-image.jpg"}
            alt={blog?.title || "Blog Image"}
            fill
            priority
            quality={90}
            className="object-cover object-center"
            style={{ filter: "brightness(0.7)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="container relative z-10 h-full flex flex-col justify-end pb-16 md:pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center md:pt-8">
            <BlogTag
              name={blog?.tags[0] || "Uncategorized"}
              link={`/categories/${
                slugger.slug(blog?.tags[0]) ?? "uncategorized"
              }`}
              className="px-5 py-1.5 text-sm font-medium bg-black backdrop-blur-sm rounded-full text-white/90 hover:bg-black/90 transition-all"
            />

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
              {blog?.title}
            </h1>

            {blog?.description && (
              <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
                {blog.description}
              </p>
            )}

            {/* Optional metadata (date, author, etc) */}
            <div className="mt-8 flex items-center justify-center space-x-4 text-white/80 text-sm">
              <span>
                {new Date(blog?.publishAt ?? "").toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
              {blog?.author && (
                <>
                  <span className="w-1 h-1 rounded-full bg-white/50" />
                  <span>By {blog.author}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Scroll indicator (optional) */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white/80 rounded-full mt-2" />
          </div>
        </div>
      </div>

      {/* Blog Content Section */}
      <div className="container mx-auto">
        <BlogDetails blog={blog} slug={slug} />

        <div className="grid grid-cols-12  gap-y-8 lg:gap-8 sxl:gap-16 mt-8 px-5 md:px-10">
          {/* Table of Contents => Left Side */}
          <div className="col-span-12 md:col-span-4">
            <TableofContents blog={blog} />
          </div>

          {/* Blog Content => Right Side */}
          <RenderMdx blog={blog} />
        </div>
      </div>
    </article>
  );
};

export default BlogDetailsPage;
