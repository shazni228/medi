import React, { useState, useEffect } from 'react';
import { PostCard } from '../components/PostCard';
import { supabase } from '../lib/supabase';
import { Heart, Users, BookOpen, Award } from 'lucide-react';
export function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetchPosts();
    }, []);
    const fetchPosts = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('status', 'published')
                .order('published_at', { ascending: false });
            if (error)
                throw error;
            setPosts(data || []);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        }
        finally {
            setLoading(false);
        }
    };
    if (loading) {
        return (React.createElement("div", { className: "min-h-screen flex items-center justify-center" },
            React.createElement("div", { className: "text-center" },
                React.createElement("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" }),
                React.createElement("p", { className: "mt-4 text-gray-600" }, "Loading medical articles..."))));
    }
    if (error) {
        return (React.createElement("div", { className: "min-h-screen flex items-center justify-center" },
            React.createElement("div", { className: "text-center" },
                React.createElement("p", { className: "text-red-600 mb-4" },
                    "Error loading posts: ",
                    error),
                React.createElement("button", { onClick: fetchPosts, className: "bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors" }, "Try Again"))));
    }
    return (React.createElement("div", { className: "min-h-screen" },
        React.createElement("div", { className: "bg-gradient-to-r from-blue-600 to-blue-800 text-white" },
            React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" },
                React.createElement("div", { className: "text-center" },
                    React.createElement("h1", { className: "text-4xl font-bold sm:text-5xl md:text-6xl mb-6" },
                        "Welcome to ",
                        React.createElement("span", { className: "text-blue-200" }, "MediBlog")),
                    React.createElement("p", { className: "text-xl max-w-3xl mx-auto mb-8 text-blue-100" }, "Your trusted source for medical knowledge, health insights, and professional healthcare content. Stay informed with the latest medical research and expert opinions."),
                    React.createElement("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-8 mt-12" },
                        React.createElement("div", { className: "text-center" },
                            React.createElement(Heart, { className: "h-8 w-8 mx-auto mb-2 text-blue-200" }),
                            React.createElement("div", { className: "text-2xl font-bold" },
                                posts.length,
                                "+"),
                            React.createElement("div", { className: "text-blue-200" }, "Published Articles")),
                        React.createElement("div", { className: "text-center" },
                            React.createElement(Users, { className: "h-8 w-8 mx-auto mb-2 text-blue-200" }),
                            React.createElement("div", { className: "text-2xl font-bold" }, "50+"),
                            React.createElement("div", { className: "text-blue-200" }, "Medical Writers")),
                        React.createElement("div", { className: "text-center" },
                            React.createElement(BookOpen, { className: "h-8 w-8 mx-auto mb-2 text-blue-200" }),
                            React.createElement("div", { className: "text-2xl font-bold" }, "20+"),
                            React.createElement("div", { className: "text-blue-200" }, "Specialties")),
                        React.createElement("div", { className: "text-center" },
                            React.createElement(Award, { className: "h-8 w-8 mx-auto mb-2 text-blue-200" }),
                            React.createElement("div", { className: "text-2xl font-bold" }, "100%"),
                            React.createElement("div", { className: "text-blue-200" }, "Peer Reviewed")))))),
        React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" }, posts.length === 0 ? (React.createElement("div", { className: "text-center py-16" },
            React.createElement(BookOpen, { className: "h-16 w-16 text-gray-400 mx-auto mb-4" }),
            React.createElement("h2", { className: "text-2xl font-bold text-gray-900 mb-4" }, "No published articles yet"),
            React.createElement("p", { className: "text-gray-600 mb-8" }, "Medical articles are being reviewed and will be published soon!"))) : (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "text-center mb-12" },
                React.createElement("h2", { className: "text-3xl font-bold text-gray-900 mb-4" }, "Latest Published Articles"),
                React.createElement("p", { className: "text-gray-600 max-w-2xl mx-auto" }, "Discover peer-reviewed medical insights from healthcare professionals and stay updated with current medical knowledge.")),
            React.createElement("div", { className: "grid gap-8 md:grid-cols-2 lg:grid-cols-3" }, posts.map((post) => (React.createElement(PostCard, { key: post.id, post: post })))))))));
}
