import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { supabase } from '../lib/supabase';
export function ViewPost() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (!id)
            return;
        const fetchPost = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('posts')
                    .select('*')
                    .eq('id', id)
                    .single();
                if (error)
                    throw error;
                setPost(data);
            }
            catch (err) {
                setError(err instanceof Error ? err.message : 'Post not found');
            }
            finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);
    if (loading) {
        return (React.createElement("div", { className: "min-h-screen flex items-center justify-center" },
            React.createElement("div", { className: "text-center" },
                React.createElement("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" }),
                React.createElement("p", { className: "mt-4 text-gray-600" }, "Loading article..."))));
    }
    if (error || !post) {
        return React.createElement(Navigate, { to: "/", replace: true });
    }
    return (React.createElement("div", { className: "min-h-screen py-12" },
        React.createElement("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" },
            React.createElement(Link, { to: "/", className: "inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors" },
                React.createElement(ArrowLeft, { size: 20, className: "mr-2" }),
                "Back to Articles"),
            React.createElement("article", { className: "bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100" },
                post.featured_image && (React.createElement("div", { className: "aspect-video overflow-hidden" },
                    React.createElement("img", { src: post.featured_image, alt: post.title, className: "w-full h-full object-cover", onError: (e) => {
                            // Hide image if it fails to load
                            e.currentTarget.style.display = 'none';
                        } }))),
                React.createElement("div", { className: "p-8" },
                    React.createElement("header", { className: "mb-8" },
                        React.createElement("div", { className: "flex flex-wrap items-center gap-4 mb-4" },
                            React.createElement("time", { className: "flex items-center text-sm text-gray-500" },
                                React.createElement(Calendar, { size: 14, className: "mr-1" }),
                                format(new Date(post.created_at), 'MMMM dd, yyyy'))),
                        React.createElement("h1", { className: "text-4xl font-bold text-gray-900 mb-4 leading-tight" }, post.title),
                        post.excerpt && (React.createElement("p", { className: "text-xl text-gray-600 mb-6 leading-relaxed" }, post.excerpt))),
                    React.createElement("div", { className: "prose prose-lg max-w-none" },
                        React.createElement(ReactMarkdown, { className: "text-gray-700 leading-relaxed", components: {
                                h1: ({ children }) => React.createElement("h1", { className: "text-2xl font-bold text-gray-900 mt-8 mb-4" }, children),
                                h2: ({ children }) => React.createElement("h2", { className: "text-xl font-bold text-gray-900 mt-6 mb-3" }, children),
                                h3: ({ children }) => React.createElement("h3", { className: "text-lg font-semibold text-gray-900 mt-4 mb-2" }, children),
                                p: ({ children }) => React.createElement("p", { className: "mb-4 text-gray-700 leading-relaxed" }, children),
                                ul: ({ children }) => React.createElement("ul", { className: "list-disc list-inside mb-4 space-y-2" }, children),
                                ol: ({ children }) => React.createElement("ol", { className: "list-decimal list-inside mb-4 space-y-2" }, children),
                                li: ({ children }) => React.createElement("li", { className: "text-gray-700" }, children),
                                blockquote: ({ children }) => (React.createElement("blockquote", { className: "border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4" }, children)),
                                img: ({ src, alt }) => (React.createElement("img", { src: src, alt: alt, className: "w-full h-auto rounded-lg my-6", onError: (e) => {
                                        e.currentTarget.style.display = 'none';
                                    } })),
                            } }, post.content)))),
            React.createElement("div", { className: "text-center mt-12" },
                React.createElement(Link, { to: "/", className: "inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors" },
                    React.createElement(ArrowLeft, { size: 20, className: "mr-2" }),
                    "Back to All Articles")))));
}
