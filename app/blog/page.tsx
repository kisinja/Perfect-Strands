"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { useWixClient } from '@/hooks/useWixCient';
import { FaSearch } from 'react-icons/fa';

interface BlogPost {
    _id: string;
    slug: string;
    title: string;
    content: string;
    excerpt: string;
    featuredImage?: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    isPublished: boolean;
    categories: string[];
    tags: string[];
}

const Blog = () => {
    const wixClient = useWixClient();
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const getPosts = async () => {
            try {
                setLoading(true);
                const postRes = await wixClient.items.query('MyBlogPosts')
                    .eq('isPublished', true)
                    .descending('publishedAt')
                    .find();
                setPosts(postRes.items as BlogPost[]);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };

        getPosts();
    }, [wixClient]);

    // Extract unique categories for filtering
    const allCategories = Array.from(
        new Set(posts.flatMap(post => post.categories))
    );

    // Filter posts based on selected category and search query
    const filteredPosts = posts.filter(post => {
        const matchesCategory = !selectedCategory || post.categories.includes(selectedCategory);
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-[#FAF8F1]">
            {/* Hero Section */}
            <div className="relative bg-[#1A1A1A] py-20 overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('/gold-texture.png')] bg-cover bg-center"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-4xl md:text-6xl font-extrabold text-[#D4AF37] tracking-tight"
                        >
                            WIG Wisdom
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="mt-6 max-w-lg mx-auto text-xl text-[#E5E5E5]"
                        >
                            Expert tips, styling guides, and care advice for your perfect wig
                        </motion.p>
                    </div>
                </div>
            </div>

            {/* Search and Filter Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                    <div className="w-full md:w-1/2">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search articles..."
                                className="w-full px-6 py-3 rounded-full border border-[#E0D6B7] shadow-sm focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] bg-[#FAF8F1]"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <FaSearch className="absolute right-4 top-3.5 h-5 w-5 text-[#5C5C5C]" />
                        </div>
                    </div>
                    <div className="w-full md:w-auto">
                        <div className="flex flex-wrap gap-2 justify-center">
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!selectedCategory ? 'bg-[#D4AF37] text-[#1A1A1A]' : 'bg-[#EDE8D5] text-[#5C5C5C] hover:bg-[#E0D6B7]'}`}
                            >
                                All Topics
                            </button>
                            {allCategories && allCategories.map((category, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category ? 'bg-[#D4AF37] text-[#1A1A1A]' : 'bg-[#EDE8D5] text-[#5C5C5C] hover:bg-[#E0D6B7]'}`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                                <div className="h-48 bg-[#EDE8D5]"></div>
                                <div className="p-6">
                                    <div className="h-6 bg-[#EDE8D5] rounded w-3/4 mb-4"></div>
                                    <div className="h-4 bg-[#EDE8D5] rounded w-full mb-2"></div>
                                    <div className="h-4 bg-[#EDE8D5] rounded w-5/6 mb-4"></div>
                                    <div className="h-10 bg-[#EDE8D5] rounded w-1/3"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Blog Posts Grid */}
                {!loading && (
                    <>
                        {filteredPosts.length === 0 ? (
                            <div className="text-center py-12">
                                <h3 className="text-xl font-medium text-[#5C5C5C]">No articles found</h3>
                                <p className="mt-2 text-[#5C5C5C]">Try adjusting your search or filter criteria</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredPosts.map((post) => (
                                    <motion.div
                                        key={post._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                        whileHover={{ y: -5 }}
                                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-[#E0D6B7]"
                                    >
                                        <Link href={`/blog/${post.slug}`} className="block group">
                                            {post.featuredImage && (
                                                <div className="relative h-48 w-full overflow-hidden">
                                                    <Image
                                                        src={post.featuredImage}
                                                        alt={post.title}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    />
                                                </div>
                                            )}
                                            <div className="p-6">
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    {post.categories && post.categories.map(category => (
                                                        <span key={category} className="px-2 py-1 text-xs font-medium text-[#1A1A1A] bg-[#EDE8D5] rounded-full">
                                                            {category}
                                                        </span>
                                                    ))}
                                                </div>
                                                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2 line-clamp-2 group-hover:text-[#D4AF37] transition-colors">
                                                    {post.title}
                                                </h3>
                                                <div className="flex items-center gap-2 text-[#5C5C5C] text-sm mb-4">
                                                    <span>{format(new Date(post.publishedAt), 'MMMM dd, yyyy')}</span>
                                                    <span className="w-1 h-1 bg-[#5C5C5C] rounded-full"></span>
                                                    {/* <span className="flex items-center gap-1">
                                                        <FaRegClock className="text-xs" /> {post.readTime} min read
                                                    </span> */}
                                                </div>
                                                <p className="text-[#5C5C5C] mb-4 line-clamp-3">
                                                    {post.excerpt}
                                                </p>
                                                <div className="flex items-center text-[#D4AF37] font-medium group-hover:text-[#B38D22] transition-colors">
                                                    Read more
                                                    <svg
                                                        className="ml-1 w-4 h-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </>
                )}

                {/* Newsletter CTA */}
                <div className="mt-16 bg-[#1A1A1A] rounded-xl p-8 md:p-12 text-center">
                    <h3 className="text-2xl md:text-3xl font-bold text-[#D4AF37] mb-4">
                        Get the latest wig tips straight to your inbox
                    </h3>
                    <p className="text-[#E5E5E5] mb-6 max-w-2xl mx-auto">
                        Subscribe to our newsletter for exclusive styling advice, product launches, and special offers.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="flex-grow px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-[#2D2D2D] text-white placeholder-[#999999]"
                        />
                        <button className="px-6 py-3 bg-[#D4AF37] text-[#1A1A1A] font-medium rounded-lg hover:bg-[#B38D22] transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;