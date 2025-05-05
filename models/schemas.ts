import { ObjectId } from 'mongodb';

// Blog Post Schema
export interface BlogPostDocument {
    _id?: ObjectId;
    slug: string;
    title: string;
    content: string;
    excerpt: string;
    featuredImage?: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    isPublished: boolean;
    categories: ObjectId[];
    tags: ObjectId[];
    meta?: {
        title?: string;
        description?: string;
        keywords?: string[];
        ogImage?: string;
    };
    relatedPosts?: ObjectId[];
}

// Category Schema
export interface CategoryDocument {
    _id?: ObjectId;
    slug: string;
    name: string;
    description?: string;
    image?: string;
    meta?: {
        title?: string;
        description?: string;
    };
    parentCategory?: ObjectId;
}

// Tag Schema
export interface TagDocument {
    _id?: ObjectId;
    slug: string;
    name: string;
    description?: string;
}

// Comment Schema
export interface CommentDocument {
    _id?: ObjectId;
    postId: ObjectId;
    author: {
        name: string;
        email: string;
        avatar?: string;
    };
    content: string;
    createdAt: Date;
    replies?: ObjectId[];
    isApproved: boolean;
}