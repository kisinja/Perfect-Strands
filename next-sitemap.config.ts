import { allBlogs } from "./.contentlayer/generated"; // Contentlayer ESM
import siteMetaData from "./utils/siteMetaData";

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: siteMetaData.siteUrl,
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: "daily",
  priority: 0.7,

  // Add dynamic blog pages
  additionalPaths: async () => {
    return allBlogs.map((blog) => ({
      loc: `${siteMetaData.siteUrl}${blog.url}`,
      lastmod: new Date(blog.updatedAt).toISOString(),
      changefreq: "weekly",
      priority: 0.8,
    }));
  },
};

export default config;
