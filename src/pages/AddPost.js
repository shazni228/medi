import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Save, X } from 'lucide-react';
const medicalCategories = [
    'Cardiology',
    'Pediatrics',
    'Nutrition',
    'Neurology',
    'Orthopedics',
    'Dermatology',
    'Psychiatry',
    'Oncology',
    'Endocrinology',
    'Gastroenterology',
    'Pulmonology',
    'Nephrology',
    'Infectious Disease',
    'Emergency Medicine',
    'General Medicine',
    'Surgery',
    'Radiology',
    'Pathology',
    'Anesthesiology',
    'Obstetrics & Gynecology'
];
export function AddPost() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { register, handleSubmit, formState: { errors }, reset, } = useForm();
    if (!user) {
        return React.createElement(Navigate, { to: "/login", replace: true });
    }
    const onSubmit = async (data) => {
        try {
            setLoading(true);
            setError(null);
            // Ensure status is correctly typed
            const postData = {
                title: data.title,
                slug: data.slug,
                content: data.content,
                excerpt: data.excerpt,
                featured_image: data.featured_image || null,
                published: data.published || false,
                status: data.status,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                author_id: data.author_id || null,
                published_by: data.published_by || null,
                published_at: data.published_at || null,
            };
            const { error } = await supabase
                .from('posts')
                .insert(postData);
            if (error)
                throw error;
            reset();
            navigate('/');
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create post');
        }
        finally {
            setLoading(false);
        }
    };
    return (React.createElement("div", { className: "min-h-screen py-12" },
        React.createElement("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" },
            React.createElement("div", { className: "bg-white rounded-xl shadow-lg border border-blue-100" },
                React.createElement("div", { className: "px-6 py-4 border-b border-gray-200" },
                    React.createElement("h1", { className: "text-3xl font-bold text-gray-900" }, "Add New Medical Article"),
                    React.createElement("p", { className: "text-gray-600 mt-2" }, "Share your medical knowledge with the community")),
                React.createElement("form", { onSubmit: handleSubmit(onSubmit), className: "p-6 space-y-6" },
                    error && (React.createElement("div", { className: "bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg" }, error)),
                    React.createElement("div", null,
                        React.createElement("label", { htmlFor: "title", className: "block text-sm font-medium text-gray-700 mb-2" }, "Article Title *"),
                        React.createElement("input", { type: "text", id: "title", ...register('title', { required: 'Title is required' }), className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors", placeholder: "Enter the article title..." }),
                        errors.title && (React.createElement("p", { className: "mt-1 text-sm text-red-600" }, errors.title.message))),
                    React.createElement("div", null,
                        React.createElement("label", { htmlFor: "slug", className: "block text-sm font-medium text-gray-700 mb-2" }, "Article Slug *"),
                        React.createElement("input", { type: "text", id: "slug", ...register('slug', { required: 'Slug is required' }), className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors", placeholder: "Enter the article slug..." }),
                        errors.slug && (React.createElement("p", { className: "mt-1 text-sm text-red-600" }, errors.slug.message))),
                    React.createElement("div", null,
                        React.createElement("label", { htmlFor: "excerpt", className: "block text-sm font-medium text-gray-700 mb-2" }, "Article Excerpt *"),
                        React.createElement("textarea", { id: "excerpt", rows: 5, ...register('excerpt', { required: 'Excerpt is required' }), className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors font-mono text-sm", placeholder: "Write your article excerpt here..." }),
                        errors.excerpt && (React.createElement("p", { className: "mt-1 text-sm text-red-600" }, errors.excerpt.message))),
                    React.createElement("div", null,
                        React.createElement("label", { htmlFor: "content", className: "block text-sm font-medium text-gray-700 mb-2" }, "Article Content *"),
                        React.createElement("textarea", { id: "content", rows: 15, ...register('content', { required: 'Content is required' }), className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors font-mono text-sm", placeholder: "Write your medical article content here... You can use Markdown formatting." }),
                        errors.content && (React.createElement("p", { className: "mt-1 text-sm text-red-600" }, errors.content.message)),
                        React.createElement("p", { className: "mt-2 text-sm text-gray-500" }, "Tip: You can use Markdown formatting for better content structure (headings, lists, bold text, etc.)")),
                    React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6" },
                        React.createElement("div", null,
                            React.createElement("label", { htmlFor: "category", className: "block text-sm font-medium text-gray-700 mb-2" }, "Medical Category"),
                            React.createElement("select", { id: "category", ...register('category'), className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" },
                                React.createElement("option", { value: "" }, "Select a category..."),
                                medicalCategories.map((category) => (React.createElement("option", { key: category, value: category }, category))))),
                        React.createElement("div", null,
                            React.createElement("label", { htmlFor: "author", className: "block text-sm font-medium text-gray-700 mb-2" }, "Author Name"),
                            React.createElement("input", { type: "text", id: "author", ...register('author'), className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors", placeholder: "Dr. John Smith" }))),
                    React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6" },
                        React.createElement("div", null,
                            React.createElement("label", { htmlFor: "featured_image", className: "block text-sm font-medium text-gray-700 mb-2" }, "Featured Image"),
                            React.createElement("input", { type: "text", id: "featured_image", ...register('featured_image'), className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors", placeholder: "Enter the featured image URL..." })),
                        React.createElement("div", null,
                            React.createElement("label", { htmlFor: "published", className: "block text-sm font-medium text-gray-700 mb-2" }, "Published"),
                            React.createElement("input", { type: "checkbox", id: "published", ...register('published'), className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" }))),
                    React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6" },
                        React.createElement("div", null,
                            React.createElement("label", { htmlFor: "status", className: "block text-sm font-medium text-gray-700 mb-2" }, "Status"),
                            React.createElement("select", { id: "status", ...register('status'), className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" },
                                React.createElement("option", { value: "draft" }, "Draft"),
                                React.createElement("option", { value: "published" }, "Published"))),
                        React.createElement("div", null,
                            React.createElement("label", { htmlFor: "author_id", className: "block text-sm font-medium text-gray-700 mb-2" }, "Author ID"),
                            React.createElement("input", { type: "text", id: "author_id", ...register('author_id'), className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors", placeholder: "Enter the author ID..." }))),
                    React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6" },
                        React.createElement("div", null,
                            React.createElement("label", { htmlFor: "published_by", className: "block text-sm font-medium text-gray-700 mb-2" }, "Published By"),
                            React.createElement("input", { type: "text", id: "published_by", ...register('published_by'), className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors", placeholder: "Enter the published by..." })),
                        React.createElement("div", null,
                            React.createElement("label", { htmlFor: "published_at", className: "block text-sm font-medium text-gray-700 mb-2" }, "Published At"),
                            React.createElement("input", { type: "datetime-local", id: "published_at", ...register('published_at'), className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" }))),
                    React.createElement("div", { className: "flex justify-end space-x-4 pt-6 border-t border-gray-200" },
                        React.createElement("button", { type: "button", onClick: () => navigate('/'), className: "flex items-center space-x-2 px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors" },
                            React.createElement(X, { size: 18 }),
                            React.createElement("span", null, "Cancel")),
                        React.createElement("button", { type: "submit", disabled: loading, className: "flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" },
                            React.createElement(Save, { size: 18 }),
                            React.createElement("span", null, loading ? 'Publishing...' : 'Publish Article'))))))));
}
