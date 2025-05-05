"use client";

import React from 'react';
import { BlogPostDocument } from '@/models/schemas';
import { useFormState } from 'react-dom';

const BlogForm = ({ action, post }: {
    action: (prevState: any, formData: FormData) => Promise<{ success: boolean; message: string }>;
    post?: BlogPostDocument
}) => {
    const [state, formAction] = useFormState(action, { success: false, message: '' });

    return (
        <form action={formAction} className='space-y-6'>
            {state.message && (
                <div className={`p-4 rounded ${state.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {state.message}
                </div>
            )}

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="title" className="block mb-2 font-medium">Title*</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        defaultValue={post?.title}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="slug" className="block mb-2 font-medium">Slug*</label>
                    <input
                        type="text"
                        id="slug"
                        name="slug"
                        defaultValue={post?.slug}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
            </div>

            {/* Featured Image */}
            <div>
                <label htmlFor="featuredImage" className="block mb-2 font-medium">Featured Image URL</label>
                <input
                    type="url"
                    id="featuredImage"
                    name="featuredImage"
                    defaultValue={post?.featuredImage}
                    className="w-full p-2 border rounded"
                />
            </div>

            {/* Excerpt */}
            <div>
                <label htmlFor="excerpt" className="block mb-2 font-medium">Excerpt*</label>
                <textarea
                    id="excerpt"
                    name="excerpt"
                    defaultValue={post?.excerpt}
                    className="w-full p-2 border rounded min-h-[100px]"
                    required
                />
            </div>

            {/* Content */}
            <div>
                <label htmlFor="content" className="block mb-2 font-medium">Content*</label>
                <textarea
                    id="content"
                    name="content"
                    defaultValue={post?.content}
                    className="w-full p-2 border rounded min-h-[300px]"
                    required
                />
            </div>

            {/* Categories and Tags */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="categories" className="block mb-2 font-medium">Categories</label>
                    <select
                        id="categories"
                        name="categories"
                        multiple
                        className="w-full p-2 border rounded"
                        defaultValue={post?.categories?.map(c => c.toString())}
                    >
                        {/* These options should be populated from your database */}
                        <option value="65a1b2c3d4e5f6g7h8i9j0">Wig Care</option>
                        <option value="65a1b2c3d4e5f6g7h8i9j1">Styling Tips</option>
                        <option value="65a1b2c3d4e5f6g7h8i9j2">Product Reviews</option>
                    </select>
                    <p className="text-sm text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
                </div>

                <div>
                    <label htmlFor="tags" className="block mb-2 font-medium">Tags</label>
                    <select
                        id="tags"
                        name="tags"
                        multiple
                        className="w-full p-2 border rounded"
                        defaultValue={post?.tags?.map(t => t.toString())}
                    >
                        {/* These options should be populated from your database */}
                        <option value="75a1b2c3d4e5f6g7h8i9j0">Synthetic Wigs</option>
                        <option value="75a1b2c3d4e5f6g7h8i9j1">Human Hair</option>
                        <option value="75a1b2c3d4e5f6g7h8i9j2">Maintenance</option>
                    </select>
                    <p className="text-sm text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
                </div>
            </div>

            {/* Publish Status */}
            <div className="flex items-center gap-4">
                <input
                    type="checkbox"
                    id="isPublished"
                    name="isPublished"
                    defaultChecked={post?.isPublished}
                    className="w-5 h-5"
                />
                <label htmlFor="isPublished" className="font-medium">Publish immediately</label>
            </div>

            {/* SEO Metadata */}
            <div className="space-y-4 border-t pt-4">
                <h3 className="text-lg font-semibold">SEO Settings</h3>

                <div>
                    <label htmlFor="meta.title" className="block mb-2 font-medium">Meta Title</label>
                    <input
                        type="text"
                        id="meta.title"
                        name="meta.title"
                        defaultValue={post?.meta?.title}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label htmlFor="meta.description" className="block mb-2 font-medium">Meta Description</label>
                    <textarea
                        id="meta.description"
                        name="meta.description"
                        defaultValue={post?.meta?.description}
                        className="w-full p-2 border rounded min-h-[100px]"
                    />
                </div>

                <div>
                    <label htmlFor="meta.keywords" className="block mb-2 font-medium">Keywords (comma separated)</label>
                    <input
                        type="text"
                        id="meta.keywords"
                        name="meta.keywords"
                        defaultValue={post?.meta?.keywords?.join(', ')}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label htmlFor="meta.ogImage" className="block mb-2 font-medium">OpenGraph Image URL</label>
                    <input
                        type="url"
                        id="meta.ogImage"
                        name="meta.ogImage"
                        defaultValue={post?.meta?.ogImage}
                        className="w-full p-2 border rounded"
                    />
                </div>
            </div>

            {/* Related Posts */}
            <div>
                <label htmlFor="relatedPosts" className="block mb-2 font-medium">Related Posts</label>
                <select
                    id="relatedPosts"
                    name="relatedPosts"
                    multiple
                    className="w-full p-2 border rounded"
                    defaultValue={post?.relatedPosts?.map(rp => rp.toString())}
                >
                    {/* These options should be populated from your database */}
                    <option value="85a1b2c3d4e5f6g7h8i9j0">How to Care for Synthetic Wigs</option>
                    <option value="85a1b2c3d4e5f6g7h8i9j1">Best Products for Wig Maintenance</option>
                    <option value="85a1b2c3d4e5f6g7h8i9j2">Styling Tips for Long Wigs</option>
                </select>
                <p className="text-sm text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                    {post ? 'Update Post' : 'Create Post'}
                </button>
            </div>
        </form>
    );
};

export default BlogForm;