import { BlogTagProps } from "@/lib/types";
import { cx } from "@/utils";
import Link from "next/link";
import React from "react";

const BlogTag = ({ link = "#", name, ...props }: BlogTagProps) => {
  return (
    <Link
      href={link}
      className={cx(
        "inline-block py-2 px-6 bg-black/80 text-gray-100 rounded-full capitalize font-semibold border-1 border-solid border-[lightPink] hover:scale-105 transition-all ease duration-200",
        props.className
      )}
    >
      {name}
    </Link>
  );
};

export default BlogTag;
