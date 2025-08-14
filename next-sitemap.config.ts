import { IConfig, ISitemapField } from "next-sitemap";
import { allBlogs } from "./.contentlayer/generated"; // adjust path
import siteMetaData from "@/utils/siteMetaData"; // adjust path

const config: IConfig = {
  siteUrl: siteMetaData.siteUrl,
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: "daily",
  priority: 0.7,

  // Add dynamic blog pages
  additionalPaths: async (): Promise<ISitemapField[]> => {
    return allBlogs.map((blog) => ({
      loc: `${siteMetaData.siteUrl}${blog.url}`,
      lastmod: new Date(blog.updatedAt).toISOString(),
      changefreq: "weekly",
      priority: 0.8,
    }));
  },
};

export default config;
