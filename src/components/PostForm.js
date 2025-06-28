import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
export function PostForm({ post, onSave, onCancel }) {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { register, handleSubmit, watch, setValue, formState: { errors }, } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            excerpt: post?.excerpt || '',
            featured_image: post?.featured_image || '',
        },
    });
    const title = watch('title');
    // Auto-generate slug from title
    React.useEffect(() => {
        if (title && !post) {
            const slug = title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            setValue('slug', slug);
        }
    }, [title, post, setValue]);
    const handleFormSubmit = async (data) => {
        if (!user)
            return;
        try {
            setLoading(true);
            setError(null);
            const postData = {
                ...data,
                author_id: user.id,
                status: 'draft',
            };
            if (post) {
                // Update existing post
                const { error } = await supabase
                    .from('posts')
                    .update(postData)
                    .eq('id', post.id);
                if (error)
                    throw error;
            }
            else {
                // Create new post
                const { error } = await supabase
                    .from('posts')
                    .insert(postData);
                if (error)
                    throw error;
            }
            if (onSave)
                onSave(postData);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to save post');
        }
        finally {
            setLoading(false);
        }
    };
    return (React.createElement("div", null,
        error && (React.createElement("div", { className: "mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg" }, error)),
        React.createElement("form", { onSubmit: handleSubmit(handleFormSubmit), className: "space-y-6" },
            React.createElement("div", null,
                React.createElement("label", { htmlFor: "title", className: "block text-sm font-medium text-gray-700 mb-2" }, "Title"),
                React.createElement("input", { type: "text", id: "title", ...register('title', { required: 'Title is required' }), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" }),
                errors.title && (React.createElement("p", { className: "mt-1 text-sm text-red-600" }, errors.title.message))),
            React.createElement("div", null,
                React.createElement("label", { htmlFor: "slug", className: "block text-sm font-medium text-gray-700 mb-2" }, "Slug"),
                React.createElement("input", { type: "text", id: "slug", ...register('slug', { required: 'Slug is required' }), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" }),
                errors.slug && (React.createElement("p", { className: "mt-1 text-sm text-red-600" }, errors.slug.message))),
            React.createElement("div", null,
                React.createElement("label", { htmlFor: "excerpt", className: "block text-sm font-medium text-gray-700 mb-2" }, "Excerpt"),
                React.createElement("textarea", { id: "excerpt", rows: 3, ...register('excerpt', { required: 'Excerpt is required' }), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" }),
                errors.excerpt && (React.createElement("p", { className: "mt-1 text-sm text-red-600" }, errors.excerpt.message))),
            React.createElement("div", null,
                React.createElement("label", { htmlFor: "featured_image", className: "block text-sm font-medium text-gray-700 mb-2" }, "Featured Image URL"),
                React.createElement("input", { type: "url", id: "featured_image", ...register('featured_image'), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent", placeholder: "https://example.com/image.jpg" })),
            React.createElement("div", null,
                React.createElement("label", { htmlFor: "content", className: "block text-sm font-medium text-gray-700 mb-2" }, "Content (Markdown)"),
                React.createElement("textarea", { id: "content", rows: 15, ...register('content', { required: 'Content is required' }), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm", placeholder: "Write your post content in Markdown..." }),
                errors.content && (React.createElement("p", { className: "mt-1 text-sm text-red-600" }, errors.content.message))),
            React.createElement("div", { className: "flex justify-end space-x-4" },
                React.createElement("button", { type: "button", onClick: onCancel, className: "px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors" }, "Cancel"),
                React.createElement("button", { type: "submit", disabled: loading, className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors" }, loading ? 'Saving...' : post ? 'Update Post' : 'Create Post')))));
}
