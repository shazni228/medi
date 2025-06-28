import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { format } from 'date-fns'
import { useAuth } from '../contexts/AuthContext'
import { usePosts } from '../hooks/usePosts'
import { PostForm } from '../components/PostForm'
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import { Database } from '../lib/database.types'

type Post = Database['public']['Tables']['posts']['Row']

export function Admin() {
  const { user } = useAuth()
  const { posts, loading, createPost, updatePost, deletePost } = usePosts('all')
  const [showForm, setShowForm] = useState(false)
  const [editingPost, setEditingPost] = useState<Post | null>(null)

  if (!user) {
    return <Navigate to="/login" replace />
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
    })
    setShowForm(false)
  }

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
      })
      setEditingPost(null)
    }
  }

  const handleDeletePost = async (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
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

  if (showForm) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              {editingPost ? 'Edit Post' : 'Create New Post'}
            </h1>
            <PostForm
              post={editingPost ?? {
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
              onSave={editingPost ? handleUpdatePost : handleCreatePost}
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
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              <span>New Post</span>
            </button>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading posts...</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-12">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">No posts yet</h2>
                <p className="text-gray-600 mb-4">Create your first blog post to get started.</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Create Post
                </button>
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
                        <td className="px-6 py-4 whitespace-nowrap">
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
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            post.published
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {post.published ? (
                              <>
                                <Eye size={12} className="mr-1" />
                                Published
                              </>
                            ) : (
                              <>
                                <EyeOff size={12} className="mr-1" />
                                Draft
                              </>
                            )}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {format(new Date(post.created_at), 'MMM dd, yyyy')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditPost(post)}
                              className="text-blue-600 hover:text-blue-900 transition-colors"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeletePost(post.id)}
                              className="text-red-600 hover:text-red-900 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}