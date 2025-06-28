import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Database } from '../lib/database.types'

type Post = Database['public']['Tables']['posts']['Row']

export function usePosts(status?: 'published' | 'all' | 'draft' | 'pending') {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPosts()
  }, [status])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      let query = supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (status === 'published') {
        query = query.eq('status', 'published')
      } else if (status === 'draft') {
        query = query.eq('status', 'draft')
      } else if (status === 'pending') {
        query = query.eq('status', 'pending')
      }
      // 'all' means no filter

      const { data, error } = await query

      if (error) throw error
      setPosts(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const createPost = async (post: Database['public']['Tables']['posts']['Insert']) => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .insert({ ...post, status: 'draft' })
        .select()
        .single()

      if (error) throw error
      setPosts(prev => [data, ...prev])
      return data
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to create post')
    }
  }

  const updatePost = async (id: string, updates: Database['public']['Tables']['posts']['Update']) => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      setPosts(prev => prev.map(post => post.id === id ? data : post))
      return data
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update post')
    }
  }

  const submitForReview = async (id: string) => {
    return updatePost(id, { status: 'pending' })
  }

  const publishPost = async (id: string, publisherId: string) => {
    return updatePost(id, { 
      status: 'published', 
      published_by: publisherId,
      published_at: new Date().toISOString()
    })
  }

  const rejectPost = async (id: string) => {
    return updatePost(id, { status: 'rejected' })
  }

  const deletePost = async (id: string) => {
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id)

      if (error) throw error
      setPosts(prev => prev.filter(post => post.id !== id))
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to delete post')
    }
  }

  return {
    posts,
    loading,
    error,
    createPost,
    updatePost,
    submitForReview,
    publishPost,
    rejectPost,
    deletePost,
    refetch: fetchPosts,
  }
}

export function usePost(slug: string) {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return

    const fetchPost = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('slug', slug)
          .eq('status', 'published')
          .single()

        if (error) throw error
        setPost(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Post not found')
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  return { post, loading, error }
}