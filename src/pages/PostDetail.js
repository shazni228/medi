import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import { usePost } from '../hooks/usePosts';
export function PostDetail() {
    const { slug } = useParams();
    const { post, loading, error } = usePost(slug);
    if (loading) {
        return (React.createElement("div", { className: "min-h-screen bg-gray-50 py-12" },
            React.createElement("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" },
                React.createElement("div", { className: "text-center" },
                    React.createElement("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" }),
                    React.createElement("p", { className: "mt-4 text-gray-600" }, "Loading post...")))));
    }
    if (error || !post) {
        return React.createElement(Navigate, { to: "/", replace: true });
    }
    return (React.createElement("div", { className: "min-h-screen bg-gray-50 py-12" },
        React.createElement("article", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" },
            React.createElement("div", { className: "bg-white rounded-lg shadow-lg overflow-hidden" },
                post.featured_image && (React.createElement("div", { className: "aspect-video overflow-hidden" },
                    React.createElement("img", { src: post.featured_image, alt: post.title, className: "w-full h-full object-cover" }))),
                React.createElement("div", { className: "p-8" },
                    React.createElement("header", { className: "mb-8" },
                        React.createElement("h1", { className: "text-4xl font-bold text-gray-900 mb-4" }, post.title),
                        React.createElement("div", { className: "flex items-center text-gray-600" },
                            React.createElement("time", { dateTime: post.created_at },
                                "Published on ",
                                format(new Date(post.created_at), 'MMMM dd, yyyy')),
                            post.updated_at !== post.created_at && (React.createElement("span", { className: "ml-4" },
                                "\u2022 Updated ",
                                format(new Date(post.updated_at), 'MMMM dd, yyyy'))))),
                    React.createElement("div", { className: "prose prose-lg max-w-none" },
                        React.createElement(ReactMarkdown, null, post.content)))))));
}
