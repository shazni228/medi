import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { format } from 'date-fns'
import { useAuth } from '../contexts/AuthContext'
import { useUserRole } from '../hooks/useUserRole'
import { usePosts } from '../hooks/usePosts'
import { PostForm } from '../components/PostForm'
import { UserManagement } from '../components/UserManagement'
import { 
  Plus, Edit, Trash2, Eye, EyeOff, Clock, CheckCircle, XCircle, 
  FileText, Users, Settings, Send 
} from 'lucide-react'
import { Database } from '../lib/database.types'

type Post = Database['public']['Tables']['posts']['Row']

export function Dashboard() {
  const { user } = useAuth()
  const { role, canWrite, canPublish, isAdmin, loading: roleLoading } = useUserRole()
  const [activeTab, setActiveTab] = useState<'posts' | 'users' | 'settings'>('posts')
  const [postFilter, setPostFilter] = useState<'all' | 'draft' | 'pending' | 'published'>('all')
  const { posts, loading, createPost, updatePost, submitForReview, publishPost, rejectPost, deletePost } = usePosts(postFilter)
  const [showForm, setShowForm] = useState(false)
  const [editingPost, setEditingPost] = useState<Post | null>(null)

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!canWrite) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access the dashboard.</p>
          <p className="text-sm text-gray-500 mt-2">Contact an administrator to get writer access.</p>
        </div>
      </div>
    )
  }

  const handleCreatePost = async (data: Database['public']['Tables']['posts']['Insert']) => {
    await createPost(data)
    setShowForm(false)
  }

  const handleUpdatePost = async (data: Database['public']['Tables']['posts']['Update']) => {
    if (editingPost) {
      await updatePost(editingPost.id, data)
      setEditingPost(null)
    }
  }

  const handleSubmitForReview = async (id: string) => {
    if (confirm('Submit this post for review? You won\'t be able to edit it until it\'s reviewed.')) {
      await submitForReview(id)
    }
  }

  const handlePublishPost = async (id: string) => {
    if (confirm('Publish this post? It will be visible to all visitors.')) {
      await publishPost(id, user.id)
    }
  }

  const handleRejectPost = async (id: string) => {
    if (confirm('Reject this post? The author will be able to edit and resubmit it.')) {
      await rejectPost(id)
    }
  }

  const handleDeletePost = async (id: string) => {
    if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      await deletePost(id)
    }
  }

  const handleEditPost = (post: Post) => {
    setEditingPost(post)
    setShowForm(true)
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setEditingPost(null)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <FileText size={16} className="text-gray-500" />
      case 'pending': return <Clock size={16} className="text-yellow-500" />
      case 'published': return <CheckCircle size={16} className="text-green-500" />
      case 'rejected': return <XCircle size={16} className="text-red-500" />
      default: return <FileText size={16} className="text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'published': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (showForm) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              {editingPost ? 'Edit Article' : 'Create New Article'}
            </h1>
            <PostForm
              post={editingPost !== null ? editingPost : {
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
              }}
              onSave={(data: Database['public']['Tables']['posts']['Insert'] | Database['public']['Tables']['posts']['Update']) => {
                if (editingPost) {
                  handleUpdatePost(data as Database['public']['Tables']['posts']['Update'])
                } else {
                  handleCreatePost(data as Database['public']['Tables']['posts']['Insert'])
                }
              }}
              onCancel={handleCancelForm}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-1">
                  Role: <span className="font-medium capitalize text-blue-600">{role}</span>
                </p>
              </div>
              {canWrite && activeTab === 'posts' && (
                <button
                  onClick={() => setShowForm(true)}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Plus size={20} />
                  <span>New Article</span>
                </button>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('posts')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'posts'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FileText size={16} className="inline mr-2" />
                Articles
              </button>
              {isAdmin && (
                <>
                  <button
                    onClick={() => setActiveTab('users')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'users'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Users size={16} className="inline mr-2" />
                    User Management
                  </button>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'settings'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Settings size={16} className="inline mr-2" />
                    Settings
                  </button>
                </>
              )}
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'posts' && (
              <>
                {/* Post Filters */}
                <div className="mb-6">
                  <div className="flex space-x-4">
                    {['all', 'draft', 'pending', 'published'].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setPostFilter(filter as any)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          postFilter === filter
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Posts Table */}
                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading articles...</p>
                  </div>
                ) : posts.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h2>
                    <p className="text-gray-600 mb-4">
                      {postFilter === 'all' ? 'Create your first article to get started.' : `No ${postFilter} articles found.`}
                    </p>
                    {canWrite && (
                      <button
                        onClick={() => setShowForm(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Create Article
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Title
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Created
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {posts.map((post) => (
                          <tr key={post.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {post.title}
                                </div>
                                <div className="text-sm text-gray-500">
                                  /{post.slug}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                                {getStatusIcon(post.status)}
                                <span className="ml-1 capitalize">{post.status}</span>
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {format(new Date(post.created_at), 'MMM dd, yyyy')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                {/* Edit - only for drafts and rejected posts by author, or admin/publisher */}
                                {((post.status === 'draft' || post.status === 'rejected') && post.author_id === user.id) || canPublish ? (
                                  <button
                                    onClick={() => handleEditPost(post)}
                                    className="text-blue-600 hover:text-blue-900 transition-colors"
                                    title="Edit"
                                  >
                                    <Edit size={16} />
                                  </button>
                                ) : null}

                                {/* Submit for Review - only for draft posts by author */}
                                {post.status === 'draft' && post.author_id === user.id && (
                                  <button
                                    onClick={() => handleSubmitForReview(post.id)}
                                    className="text-yellow-600 hover:text-yellow-900 transition-colors"
                                    title="Submit for Review"
                                  >
                                    <Send size={16} />
                                  </button>
                                )}

                                {/* Publish - only for publishers on pending posts */}
                                {post.status === 'pending' && canPublish && (
                                  <button
                                    onClick={() => handlePublishPost(post.id)}
                                    className="text-green-600 hover:text-green-900 transition-colors"
                                    title="Publish"
                                  >
                                    <CheckCircle size={16} />
                                  </button>
                                )}

                                {/* Reject - only for publishers on pending posts */}
                                {post.status === 'pending' && canPublish && (
                                  <button
                                    onClick={() => handleRejectPost(post.id)}
                                    className="text-red-600 hover:text-red-900 transition-colors"
                                    title="Reject"
                                  >
                                    <XCircle size={16} />
                                  </button>
                                )}

                                {/* Delete - only for draft posts by author or admin */}
                                {((post.status === 'draft' && post.author_id === user.id) || isAdmin) && (
                                  <button
                                    onClick={() => handleDeletePost(post.id)}
                                    className="text-red-600 hover:text-red-900 transition-colors"
                                    title="Delete"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}

            {activeTab === 'users' && isAdmin && (
              <UserManagement />
            )}

            {activeTab === 'settings' && isAdmin && (
              <div className="text-center py-12">
                <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Settings</h2>
                <p className="text-gray-600">Settings panel coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}