import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { Calendar, User, Tag } from 'lucide-react'
import { Database } from '../lib/database.types'

type Post = Database['public']['Tables']['posts']['Row']

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + '...'
  }

  return (
    <article className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-blue-100">
      {/* Featured Image */}
      {post.featured_image && (
        <div className="aspect-video overflow-hidden">
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              // Hide image container if image fails to load
              e.currentTarget.parentElement!.style.display = 'none'
            }}
          />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <time className="flex items-center text-sm text-gray-500">
            <Calendar size={14} className="mr-1" />
            {format(new Date(post.created_at), 'MMM dd, yyyy')}
          </time>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
          <Link to={`/post/${post.id}`}>
            {post.title}
          </Link>
        </h2>
        
        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-gray-600 mb-4 leading-relaxed">
            {truncateContent(post.excerpt)}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <Link
            to={`/post/${post.id}`}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  )
}