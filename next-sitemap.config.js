import { allBlogs } from "./.contentlayer/generated"; // adjust path
import { siteUrl as _siteUrl } from "./utils/siteMetaData"; // adjust path

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: _siteUrl,
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: "daily",
  priority: 0.7,

  // Add dynamic blog pages
  additionalPaths: async () => {
    return allBlogs.map((blog) => ({
      loc: `${_siteUrl}${blog.url}`,
      lastmod: new Date(blog.updatedAt).toISOString(),
      changefreq: "weekly",
      priority: 0.8,
    }));
  },
};

export default config;
