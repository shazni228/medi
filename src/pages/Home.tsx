import React, { useState, useEffect } from 'react'
import { PostCard } from '../components/PostCard'
import { supabase } from '../lib/supabase'
import { Database } from '../lib/database.types'
import { Heart, Users, BookOpen, Award } from 'lucide-react'

type Post = Database['public']['Tables']['posts']['Row']

export function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading medical articles...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading posts: {error}</p>
          <button 
            onClick={fetchPosts}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl mb-6">
              Welcome to <span className="text-blue-200">MediBlog</span>
            </h1>
            <p className="text-xl max-w-3xl mx-auto mb-8 text-blue-100">
              Your trusted source for medical knowledge, health insights, and professional healthcare content. 
              Stay informed with the latest medical research and expert opinions.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              <div className="text-center">
                <Heart className="h-8 w-8 mx-auto mb-2 text-blue-200" />
                <div className="text-2xl font-bold">{posts.length}+</div>
                <div className="text-blue-200">Published Articles</div>
              </div>
              <div className="text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-blue-200" />
                <div className="text-2xl font-bold">50+</div>
                <div className="text-blue-200">Medical Writers</div>
              </div>
              <div className="text-center">
                <BookOpen className="h-8 w-8 mx-auto mb-2 text-blue-200" />
                <div className="text-2xl font-bold">20+</div>
                <div className="text-blue-200">Specialties</div>
              </div>
              <div className="text-center">
                <Award className="h-8 w-8 mx-auto mb-2 text-blue-200" />
                <div className="text-2xl font-bold">100%</div>
                <div className="text-blue-200">Peer Reviewed</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No published articles yet</h2>
            <p className="text-gray-600 mb-8">Medical articles are being reviewed and will be published soon!</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Published Articles</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover peer-reviewed medical insights from healthcare professionals and stay updated with current medical knowledge.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}