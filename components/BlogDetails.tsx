import { Blog } from "@/.contentlayer/generated";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import GithubSlugger from "github-slugger";

const BlogDetails = ({ blog, slug }: { blog?: Blog; slug?: string }) => {
  const slugger = new GithubSlugger();
  console.log(slug);
  if (!blog) {
    return null;
  }
  return (
    <div className="px-2 my-6  md:px-10 bg-pink-500 text-gray-100 py-2 flex items-center justify-around flex-wrap text-lg sm:text-xl font-medium mx-5  md:mx-10 rounded-lg">
      <time dateTime={blog?.publishAt || ""} className="whitespace-nowrap m-3">
        {blog?.publishAt
          ? format(parseISO(blog.publishAt), "LLLL d, yyyy")
          : "Not published yet"}
      </time>

      <span className="whitespace-nowrap m-3">10 views</span>
      <div className="whitespace-nowrap m-3">{blog?.readingTime.text}</div>
      <Link
        href={`/categories/${slugger.slug(blog?.tags[0]) ?? "uncategorized"}`}
        className="whitespace-nowrap m-3"
      >
        #{blog?.tags[0] || "Uncategorized"}
      </Link>
    </div>
  );
};

export default BlogDetails;
