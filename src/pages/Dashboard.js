import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';
import { useUserRole } from '../hooks/useUserRole';
import { usePosts } from '../hooks/usePosts';
import { PostForm } from '../components/PostForm';
import { UserManagement } from '../components/UserManagement';
import { Plus, Edit, Trash2, Clock, CheckCircle, XCircle, FileText, Users, Settings, Send } from 'lucide-react';
export function Dashboard() {
    const { user } = useAuth();
    const { role, canWrite, canPublish, isAdmin, loading: roleLoading } = useUserRole();
    const [activeTab, setActiveTab] = useState('posts');
    const [postFilter, setPostFilter] = useState('all');
    const { posts, loading, createPost, updatePost, submitForReview, publishPost, rejectPost, deletePost } = usePosts(postFilter);
    const [showForm, setShowForm] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    if (!user) {
        return React.createElement(Navigate, { to: "/login", replace: true });
    }
    if (roleLoading) {
        return (React.createElement("div", { className: "min-h-screen flex items-center justify-center" },
            React.createElement("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" })));
    }
    if (!canWrite) {
        return (React.createElement("div", { className: "min-h-screen flex items-center justify-center" },
            React.createElement("div", { className: "text-center" },
                React.createElement(XCircle, { className: "h-16 w-16 text-red-500 mx-auto mb-4" }),
                React.createElement("h2", { className: "text-2xl font-bold text-gray-900 mb-2" }, "Access Denied"),
                React.createElement("p", { className: "text-gray-600" }, "You don't have permission to access the dashboard."),
                React.createElement("p", { className: "text-sm text-gray-500 mt-2" }, "Contact an administrator to get writer access."))));
    }
    const handleCreatePost = async (data) => {
        await createPost(data);
        setShowForm(false);
    };
    const handleUpdatePost = async (data) => {
        if (editingPost) {
            await updatePost(editingPost.id, data);
            setEditingPost(null);
        }
    };
    const handleSubmitForReview = async (id) => {
        if (confirm('Submit this post for review? You won\'t be able to edit it until it\'s reviewed.')) {
            await submitForReview(id);
        }
    };
    const handlePublishPost = async (id) => {
        if (confirm('Publish this post? It will be visible to all visitors.')) {
            await publishPost(id, user.id);
        }
    };
    const handleRejectPost = async (id) => {
        if (confirm('Reject this post? The author will be able to edit and resubmit it.')) {
            await rejectPost(id);
        }
    };
    const handleDeletePost = async (id) => {
        if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
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
    const getStatusIcon = (status) => {
        switch (status) {
            case 'draft': return React.createElement(FileText, { size: 16, className: "text-gray-500" });
            case 'pending': return React.createElement(Clock, { size: 16, className: "text-yellow-500" });
            case 'published': return React.createElement(CheckCircle, { size: 16, className: "text-green-500" });
            case 'rejected': return React.createElement(XCircle, { size: 16, className: "text-red-500" });
            default: return React.createElement(FileText, { size: 16, className: "text-gray-500" });
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'draft': return 'bg-gray-100 text-gray-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'published': return 'bg-green-100 text-green-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    if (showForm) {
        return (React.createElement("div", { className: "min-h-screen bg-gray-50 py-12" },
            React.createElement("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" },
                React.createElement("div", { className: "bg-white rounded-lg shadow-lg p-8" },
                    React.createElement("h1", { className: "text-3xl font-bold text-gray-900 mb-8" }, editingPost ? 'Edit Article' : 'Create New Article'),
                    React.createElement(PostForm, { post: editingPost !== null ? editingPost : {
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
                        }, onSave: (data) => {
                            if (editingPost) {
                                handleUpdatePost(data);
                            }
                            else {
                                handleCreatePost(data);
                            }
                        }, onCancel: handleCancelForm })))));
    }
    return (React.createElement("div", { className: "min-h-screen bg-gray-50 py-12" },
        React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" },
            React.createElement("div", { className: "bg-white rounded-lg shadow-lg" },
                React.createElement("div", { className: "px-6 py-4 border-b border-gray-200" },
                    React.createElement("div", { className: "flex justify-between items-center" },
                        React.createElement("div", null,
                            React.createElement("h1", { className: "text-3xl font-bold text-gray-900" }, "Dashboard"),
                            React.createElement("p", { className: "text-gray-600 mt-1" },
                                "Role: ",
                                React.createElement("span", { className: "font-medium capitalize text-blue-600" }, role))),
                        canWrite && activeTab === 'posts' && (React.createElement("button", { onClick: () => setShowForm(true), className: "flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors" },
                            React.createElement(Plus, { size: 20 }),
                            React.createElement("span", null, "New Article"))))),
                React.createElement("div", { className: "border-b border-gray-200" },
                    React.createElement("nav", { className: "flex space-x-8 px-6" },
                        React.createElement("button", { onClick: () => setActiveTab('posts'), className: `py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'posts'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}` },
                            React.createElement(FileText, { size: 16, className: "inline mr-2" }),
                            "Articles"),
                        isAdmin && (React.createElement(React.Fragment, null,
                            React.createElement("button", { onClick: () => setActiveTab('users'), className: `py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'users'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}` },
                                React.createElement(Users, { size: 16, className: "inline mr-2" }),
                                "User Management"),
                            React.createElement("button", { onClick: () => setActiveTab('settings'), className: `py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'settings'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}` },
                                React.createElement(Settings, { size: 16, className: "inline mr-2" }),
                                "Settings"))))),
                React.createElement("div", { className: "p-6" },
                    activeTab === 'posts' && (React.createElement(React.Fragment, null,
                        React.createElement("div", { className: "mb-6" },
                            React.createElement("div", { className: "flex space-x-4" }, ['all', 'draft', 'pending', 'published'].map((filter) => (React.createElement("button", { key: filter, onClick: () => setPostFilter(filter), className: `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${postFilter === filter
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}` }, filter.charAt(0).toUpperCase() + filter.slice(1)))))),
                        loading ? (React.createElement("div", { className: "text-center py-12" },
                            React.createElement("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" }),
                            React.createElement("p", { className: "mt-4 text-gray-600" }, "Loading articles..."))) : posts.length === 0 ? (React.createElement("div", { className: "text-center py-12" },
                            React.createElement(FileText, { className: "h-16 w-16 text-gray-400 mx-auto mb-4" }),
                            React.createElement("h2", { className: "text-xl font-semibold text-gray-900 mb-2" }, "No articles found"),
                            React.createElement("p", { className: "text-gray-600 mb-4" }, postFilter === 'all' ? 'Create your first article to get started.' : `No ${postFilter} articles found.`),
                            canWrite && (React.createElement("button", { onClick: () => setShowForm(true), className: "bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors" }, "Create Article")))) : (React.createElement("div", { className: "overflow-x-auto" },
                            React.createElement("table", { className: "min-w-full divide-y divide-gray-200" },
                                React.createElement("thead", { className: "bg-gray-50" },
                                    React.createElement("tr", null,
                                        React.createElement("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Title"),
                                        React.createElement("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Status"),
                                        React.createElement("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Created"),
                                        React.createElement("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Actions"))),
                                React.createElement("tbody", { className: "bg-white divide-y divide-gray-200" }, posts.map((post) => (React.createElement("tr", { key: post.id, className: "hover:bg-gray-50" },
                                    React.createElement("td", { className: "px-6 py-4" },
                                        React.createElement("div", null,
                                            React.createElement("div", { className: "text-sm font-medium text-gray-900" }, post.title),
                                            React.createElement("div", { className: "text-sm text-gray-500" },
                                                "/",
                                                post.slug))),
                                    React.createElement("td", { className: "px-6 py-4 whitespace-nowrap" },
                                        React.createElement("span", { className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(post.status)}` },
                                            getStatusIcon(post.status),
                                            React.createElement("span", { className: "ml-1 capitalize" }, post.status))),
                                    React.createElement("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500" }, format(new Date(post.created_at), 'MMM dd, yyyy')),
                                    React.createElement("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium" },
                                        React.createElement("div", { className: "flex space-x-2" },
                                            ((post.status === 'draft' || post.status === 'rejected') && post.author_id === user.id) || canPublish ? (React.createElement("button", { onClick: () => handleEditPost(post), className: "text-blue-600 hover:text-blue-900 transition-colors", title: "Edit" },
                                                React.createElement(Edit, { size: 16 }))) : null,
                                            post.status === 'draft' && post.author_id === user.id && (React.createElement("button", { onClick: () => handleSubmitForReview(post.id), className: "text-yellow-600 hover:text-yellow-900 transition-colors", title: "Submit for Review" },
                                                React.createElement(Send, { size: 16 }))),
                                            post.status === 'pending' && canPublish && (React.createElement("button", { onClick: () => handlePublishPost(post.id), className: "text-green-600 hover:text-green-900 transition-colors", title: "Publish" },
                                                React.createElement(CheckCircle, { size: 16 }))),
                                            post.status === 'pending' && canPublish && (React.createElement("button", { onClick: () => handleRejectPost(post.id), className: "text-red-600 hover:text-red-900 transition-colors", title: "Reject" },
                                                React.createElement(XCircle, { size: 16 }))),
                                            ((post.status === 'draft' && post.author_id === user.id) || isAdmin) && (React.createElement("button", { onClick: () => handleDeletePost(post.id), className: "text-red-600 hover:text-red-900 transition-colors", title: "Delete" },
                                                React.createElement(Trash2, { size: 16 })))))))))))))),
                    activeTab === 'users' && isAdmin && (React.createElement(UserManagement, null)),
                    activeTab === 'settings' && isAdmin && (React.createElement("div", { className: "text-center py-12" },
                        React.createElement(Settings, { className: "h-16 w-16 text-gray-400 mx-auto mb-4" }),
                        React.createElement("h2", { className: "text-xl font-semibold text-gray-900 mb-2" }, "Settings"),
                        React.createElement("p", { className: "text-gray-600" }, "Settings panel coming soon..."))))))));
}
