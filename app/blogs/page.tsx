import FeaturedBlogs from "@/components/FeaturedBlogs";
import HomeBlogCoverSection from "@/components/HomeBlogCoverSection";
import RecentPosts from "@/components/RecentBlogs";
import { allBlogs } from "contentlayer/generated";


export default function BlogPage() {
  console.log(allBlogs[3]);
  return (
    <div className="container mx-auto">
      <HomeBlogCoverSection blogs={allBlogs} />
      <FeaturedBlogs blogs={allBlogs} />
      {/* <BlogList blogs={allBlogs} /> */}
      <RecentPosts blogs={allBlogs} />
    </div>
  );
}
