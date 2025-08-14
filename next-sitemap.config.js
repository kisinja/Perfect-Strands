import { allBlogs } from "./.contentlayer/generated/index.mjs"; // JSON export

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://perfect-strands.vercel.app",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: "daily",
  priority: 0.7,

  additionalPaths: async () =>
    allBlogs.map((blog) => ({
      loc: `https://perfect-strands.vercel.app${blog.url}`,
      lastmod: new Date(blog.updatedAt).toISOString(),
      changefreq: "weekly",
      priority: 0.8,
    })),
};
