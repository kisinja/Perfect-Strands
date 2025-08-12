import { Blog } from "@/.contentlayer/generated";
import { Heading } from "@/lib/types";
import React from "react";

const TableofContents = ({ blog }: { blog: Blog }) => {
  return (
    <details
      className="group bg-white border border-gray-200  rounded-xl p-5 sticky top-6 max-h-[80vh] overflow-y-auto shadow-sm hover:shadow-md transition-shadow duration-200"
      open
    >
      <summary className="text-lg font-semibold text-pink-500 cursor-pointer list-none flex items-center justify-between mb-4">
        <span>Table of Contents</span>
        <svg
          className="w-4 h-4 transition-transform duration-200 group-open:rotate-180 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </summary>

      <nav className="space-y-1">
        {blog.toc.map((heading: Heading, idx: number) => (
          <a
            key={idx}
            href={`#${heading.slug}`}
            className={`
              block py-1.5 px-3 text-sm rounded-md transition-colors duration-150
              hover:bg-gray-100 
              hover:text-pink-500 
              text-gray-500 data-[level=two]:border-t border-solid border-black/80
              ${heading.level === "two" ? "font-medium" : "pl-6 text-gray-400"}
            `}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </details>
  );
};

export default TableofContents;
