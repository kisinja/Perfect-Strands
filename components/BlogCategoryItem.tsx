import { cx } from "@/utils";
import Link from "next/link";
import React from "react";

const BlogCategoryItem = ({
  link = "#",
  name,
  currentSlug,
  ...props
}: {
  link?: string;
  name: string;
  currentSlug?: boolean;
} & React.HTMLAttributes<HTMLAnchorElement>) => {
  return (
    <Link
      href={link}
      className={cx(
        "inline-block py-2 px-10 md:py-2.5 md:px-6 rounded-full text-sm md:text-base m-1",
        "border border-pink-200 shadow-sm hover:shadow-md",
        "transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-0.5",
        "active:scale-95 active:translate-y-0",
        props.className,
        currentSlug
          ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-pink-200/50"
          : "bg-white/80 text-gray-700 hover:bg-pink-50/50"
      )}
      {...props}
    >
      #{name}
    </Link>
  );
};

export default BlogCategoryItem;
