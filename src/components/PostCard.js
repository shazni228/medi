import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
export function PostCard({ post }) {
    const truncateContent = (content, maxLength = 150) => {
        if (content.length <= maxLength)
            return content;
        return content.substring(0, maxLength) + '...';
    };
    return (React.createElement("article", { className: "bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-blue-100" },
        post.featured_image && (React.createElement("div", { className: "aspect-video overflow-hidden" },
            React.createElement("img", { src: post.featured_image, alt: post.title, className: "w-full h-full object-cover hover:scale-105 transition-transform duration-300", onError: (e) => {
                    // Hide image container if image fails to load
                    e.currentTarget.parentElement.style.display = 'none';
                } }))),
        React.createElement("div", { className: "p-6" },
            React.createElement("div", { className: "flex items-center justify-between mb-3" },
                React.createElement("time", { className: "flex items-center text-sm text-gray-500" },
                    React.createElement(Calendar, { size: 14, className: "mr-1" }),
                    format(new Date(post.created_at), 'MMM dd, yyyy'))),
            React.createElement("h2", { className: "text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors" },
                React.createElement(Link, { to: `/post/${post.id}` }, post.title)),
            post.excerpt && (React.createElement("p", { className: "text-gray-600 mb-4 leading-relaxed" }, truncateContent(post.excerpt))),
            React.createElement("div", { className: "flex items-center justify-between" },
                React.createElement(Link, { to: `/post/${post.id}`, className: "text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors" }, "Read more \u2192")))));
}
