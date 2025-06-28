import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';
import { usePosts } from '../hooks/usePosts';
import { PostForm } from '../components/PostForm';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
export function Admin() {
    const { user } = useAuth();
    const { posts, loading, createPost, updatePost, deletePost } = usePosts('all');
    const [showForm, setShowForm] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    if (!user) {
        return React.createElement(Navigate, { to: "/login", replace: true });
    }
    const handleCreatePost = async () => {
        await createPost({
            title: '',
            slug: '',
            content: '',
            excerpt: '',
            featured_image: null,
            published: false,
            status: 'draft',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            author_id: user.id,
            published_by: null,
            published_at: null,
        });
        setShowForm(false);
    };
    const handleUpdatePost = async () => {
        if (editingPost) {
            await updatePost(editingPost.id, {
                title: editingPost.title,
                slug: editingPost.slug,
                content: editingPost.content,
                excerpt: editingPost.excerpt,
                featured_image: editingPost.featured_image,
                published: editingPost.published,
                status: editingPost.status,
                created_at: editingPost.created_at,
                updated_at: new Date().toISOString(),
                author_id: editingPost.author_id,
                published_by: editingPost.published_by,
                published_at: editingPost.published_at,
            });
            setEditingPost(null);
        }
    };
    const handleDeletePost = async (id) => {
        if (confirm('Are you sure you want to delete this post?')) {
            await deletePost(id);
        }
    };
    const handleEditPost = (post) => {
        setEditingPost(post);
        setShowForm(true);
    };
    const handleCancelForm = () => {
        setShowForm(false);
        setEditingPost(null);
    };
    if (showForm) {
        return (React.createElement("div", { className: "min-h-screen bg-gray-50 py-12" },
            React.createElement("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" },
                React.createElement("div", { className: "bg-white rounded-lg shadow-lg p-8" },
                    React.createElement("h1", { className: "text-3xl font-bold text-gray-900 mb-8" }, editingPost ? 'Edit Post' : 'Create New Post'),
                    React.createElement(PostForm, { post: editingPost ?? {
                            id: '',
                            title: '',
                            slug: '',
                            content: '',
                            excerpt: '',
                            featured_image: null,
                            published: false,
                            status: 'draft',
                            created_at: new Date().toISOString(),
                            updated_at: new Date().toISOString(),
                            author_id: user.id,
                            published_by: null,
                            published_at: null,
                        }, onSave: editingPost ? handleUpdatePost : handleCreatePost, onCancel: handleCancelForm })))));
    }
    return (React.createElement("div", { className: "min-h-screen bg-gray-50 py-12" },
        React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" },
            React.createElement("div", { className: "bg-white rounded-lg shadow-lg" },
                React.createElement("div", { className: "px-6 py-4 border-b border-gray-200 flex justify-between items-center" },
                    React.createElement("h1", { className: "text-3xl font-bold text-gray-900" }, "Admin Dashboard"),
                    React.createElement("button", { onClick: () => setShowForm(true), className: "flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors" },
                        React.createElement(Plus, { size: 20 }),
                        React.createElement("span", null, "New Post"))),
                React.createElement("div", { className: "p-6" }, loading ? (React.createElement("div", { className: "text-center py-12" },
                    React.createElement("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" }),
                    React.createElement("p", { className: "mt-4 text-gray-600" }, "Loading posts..."))) : posts.length === 0 ? (React.createElement("div", { className: "text-center py-12" },
                    React.createElement("h2", { className: "text-xl font-semibold text-gray-900 mb-2" }, "No posts yet"),
                    React.createElement("p", { className: "text-gray-600 mb-4" }, "Create your first blog post to get started."),
                    React.createElement("button", { onClick: () => setShowForm(true), className: "bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors" }, "Create Post"))) : (React.createElement("div", { className: "overflow-x-auto" },
                    React.createElement("table", { className: "min-w-full divide-y divide-gray-200" },
                        React.createElement("thead", { className: "bg-gray-50" },
                            React.createElement("tr", null,
                                React.createElement("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Title"),
                                React.createElement("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Status"),
                                React.createElement("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Created"),
                                React.createElement("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Actions"))),
                        React.createElement("tbody", { className: "bg-white divide-y divide-gray-200" }, posts.map((post) => (React.createElement("tr", { key: post.id, className: "hover:bg-gray-50" },
                            React.createElement("td", { className: "px-6 py-4 whitespace-nowrap" },
                                React.createElement("div", null,
                                    React.createElement("div", { className: "text-sm font-medium text-gray-900" }, post.title),
                                    React.createElement("div", { className: "text-sm text-gray-500" },
                                        "/",
                                        post.slug))),
                            React.createElement("td", { className: "px-6 py-4 whitespace-nowrap" },
                                React.createElement("span", { className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${post.published
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-gray-100 text-gray-800'}` }, post.published ? (React.createElement(React.Fragment, null,
                                    React.createElement(Eye, { size: 12, className: "mr-1" }),
                                    "Published")) : (React.createElement(React.Fragment, null,
                                    React.createElement(EyeOff, { size: 12, className: "mr-1" }),
                                    "Draft")))),
                            React.createElement("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500" }, format(new Date(post.created_at), 'MMM dd, yyyy')),
                            React.createElement("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium" },
                                React.createElement("div", { className: "flex space-x-2" },
                                    React.createElement("button", { onClick: () => handleEditPost(post), className: "text-blue-600 hover:text-blue-900 transition-colors" },
                                        React.createElement(Edit, { size: 16 })),
                                    React.createElement("button", { onClick: () => handleDeletePost(post.id), className: "text-red-600 hover:text-red-900 transition-colors" },
                                        React.createElement(Trash2, { size: 16 }))))))))))))))));
}
