import React from "react";
import Link from "next/link";

const BlogNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-12 px-4 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center bg-rose-100 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-pink-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-3">
          Post Not Found
        </h2>

        <p className="text-gray-600 mb-6">
          The post you&apos;re looking for doesn&apos;t exist or may have
          been removed.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Link
            href="/"
            className="px-6 py-2.5 bg-pink-500 text-white font-medium rounded-lg hover:bg-pink-400 transition-colors"
          >
            Return Home
          </Link>

          <Link
            href="/blogs"
            className="px-6 py-2.5 border border-gray-300 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Browse All Blogs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogNotFound;
