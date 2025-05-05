import { wixClientServer } from '@/lib/wixClientServer';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { FaFacebook, FaTwitter, FaPinterest, FaLinkedin, FaBookmark, FaRegClock } from 'react-icons/fa';
//import Link from 'next/link';

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
    author?: {
        name: string;
        avatar?: string;
        bio?: string;
    };
    readTime?: number;
}

/* interface RelatedPost {
    _id: string;
    slug: string;
    title: string;
    excerpt: string;
    featuredImage?: string;
    publishedAt: string;
} */

const BlogDetails = async ({ params }: { params: { slug: string } }) => {
    const wixClient = await wixClientServer();

    // Fetch main blog post
    const blogRes = await wixClient.items.query('MyBlogPosts')
        .eq('slug', params.slug)
        .find();

    if (!blogRes.items.length) {
        return notFound();
    }

    const blogPost: BlogPost = blogRes.items[0] as BlogPost;
    const readTime = blogPost.readTime || Math.ceil(blogPost.content.split(' ').length / 200);

    // Fetch related posts (same categories)
    /* const relatedPostsRes = await wixClient.items.query('MyBlogPosts')
        .hasSome('categories', blogPost.categories)
        .ne('slug', params.slug)
        .limit(2)
        .find();

    const relatedPosts: RelatedPost[] = relatedPostsRes.items as RelatedPost[]; */

    return (
        <div className="min-h-screen bg-[#FAF8F1]">
            {/* Hero Section */}
            <div className="relative bg-[#1A1A1A] py-16 md:py-24 overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('/gold-texture.png')] bg-cover bg-center"></div>
                <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                        {blogPost.categories?.map(category => (
                            <span key={category} className="px-3 py-1 text-sm font-medium text-[#D4AF37] bg-black bg-opacity-60 rounded-full border border-[#D4AF37]">
                                {category}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-[#D4AF37] mb-6 leading-tight">
                        {blogPost.title}
                    </h1>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-[#E5E5E5]">
                        {blogPost.author && blogPost.author?.avatar && (
                            <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-[#D4AF37]">
                                <Image
                                    src={blogPost.author.avatar}
                                    alt={blogPost.author.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                        <div className="text-center md:text-left">
                            <p className="font-medium text-white">{blogPost.author?.name || 'Wig Expert'}</p>
                            <div className="flex items-center justify-center md:justify-start gap-3 text-sm">
                                <span>{format(new Date(blogPost.publishedAt), 'MMMM dd, yyyy')}</span>
                                <span className="w-1 h-1 bg-[#D4AF37] rounded-full"></span>
                                <span className="flex items-center gap-1">
                                    <FaRegClock className="text-sm" /> {readTime} min read
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Image */}
            {blogPost.featuredImage && (
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                    <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg border-4 border-[#D4AF37]">
                        <Image
                            src={blogPost.featuredImage}
                            alt={blogPost.title}
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                        />
                    </div>
                </div>
            )}

            {/* Content Section */}
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <article className="prose prose-lg max-w-none prose-headings:text-[#1A1A1A] prose-a:text-[#D4AF37] hover:prose-a:text-[#B38D22] prose-strong:text-[#1A1A1A]">
                    <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
                </article>

                {/* Tags */}
                {blogPost.tags && blogPost.tags?.length > 0 && (
                    <div className="mt-12">
                        <h3 className="text-sm font-semibold text-[#5C5C5C] mb-3">TAGS</h3>
                        <div className="flex flex-wrap gap-2">
                            {blogPost.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-[#EDE8D5] text-[#5C5C5C] rounded-full text-sm">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Share Buttons */}
                <div className="mt-12 pt-8 border-t border-[#E0D6B7]">
                    <h3 className="text-sm font-semibold text-[#5C5C5C] mb-4">SHARE THIS ARTICLE</h3>
                    <div className="flex gap-4">
                        <button className="p-3 bg-[#3B5998] text-white rounded-full hover:bg-[#344E86] transition-colors">
                            <FaFacebook className="text-lg" />
                        </button>
                        <button className="p-3 bg-[#1DA1F2] text-white rounded-full hover:bg-[#1A8CD8] transition-colors">
                            <FaTwitter className="text-lg" />
                        </button>
                        <button className="p-3 bg-[#E60023] text-white rounded-full hover:bg-[#D5001F] transition-colors">
                            <FaPinterest className="text-lg" />
                        </button>
                        <button className="p-3 bg-[#0077B5] text-white rounded-full hover:bg-[#00669B] transition-colors">
                            <FaLinkedin className="text-lg" />
                        </button>
                        <button className="p-3 bg-[#EDE8D5] text-[#5C5C5C] rounded-full hover:bg-[#E0D6B7] transition-colors ml-auto">
                            <FaBookmark className="text-lg" />
                        </button>
                    </div>
                </div>

                {/* Author Bio */}
                {blogPost.author && (
                    <div className="mt-12 pt-8 border-t border-[#E0D6B7]">
                        <div className="flex flex-col md:flex-row gap-6 bg-[#F5F1E6] p-6 rounded-lg">
                            {blogPost.author.avatar && (
                                <div className="relative h-20 w-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#D4AF37]">
                                    <Image
                                        src={blogPost.author.avatar}
                                        alt={blogPost.author.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                            <div>
                                <h3 className="text-lg font-bold text-[#1A1A1A] mb-1">About {blogPost.author.name}</h3>
                                <p className="text-[#5C5C5C]">{blogPost.author.bio || 'Wig care specialist with years of experience helping clients find their perfect look.'}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* {relatedPosts && relatedPosts.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-8">You Might Also Like</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {relatedPosts.map(post => (
                                <div key={post._id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-[#E0D6B7] group">
                                    <Link href={`/blog/${post.slug}`} className="block">
                                        {post.featuredImage && (
                                            <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
                                                <Image
                                                    src={post.featuredImage}
                                                    alt={post.title}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                                />
                                            </div>
                                        )}
                                        <h3 className="text-lg font-bold text-[#1A1A1A] mb-2 group-hover:text-[#D4AF37] transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-[#5C5C5C] mb-3 line-clamp-2">{post.excerpt}</p>
                                        <span className="text-sm text-[#D4AF37] font-medium">Read more →</span>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                )} */}
            </div>

            {/* Newsletter CTA */}
            <div className="bg-[#1A1A1A] py-16">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#D4AF37] mb-4">Get More Wig Wisdom</h2>
                    <p className="text-[#E5E5E5] mb-6">
                        Subscribe to our newsletter for exclusive tips, new product announcements, and special offers.
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

export default BlogDetails;