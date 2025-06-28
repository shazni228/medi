import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
export function usePosts(status) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetchPosts();
    }, [status]);
    const fetchPosts = async () => {
        try {
            setLoading(true);
            let query = supabase
                .from('posts')
                .select('*')
                .order('created_at', { ascending: false });
            if (status === 'published') {
                query = query.eq('status', 'published');
            }
            else if (status === 'draft') {
                query = query.eq('status', 'draft');
            }
            else if (status === 'pending') {
                query = query.eq('status', 'pending');
            }
            // 'all' means no filter
            const { data, error } = await query;
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
    const createPost = async (post) => {
        try {
            const { data, error } = await supabase
                .from('posts')
                .insert({ ...post, status: 'draft' })
                .select()
                .single();
            if (error)
                throw error;
            setPosts(prev => [data, ...prev]);
            return data;
        }
        catch (err) {
            throw err instanceof Error ? err : new Error('Failed to create post');
        }
    };
    const updatePost = async (id, updates) => {
        try {
            const { data, error } = await supabase
                .from('posts')
                .update({ ...updates, updated_at: new Date().toISOString() })
                .eq('id', id)
                .select()
                .single();
            if (error)
                throw error;
            setPosts(prev => prev.map(post => post.id === id ? data : post));
            return data;
        }
        catch (err) {
            throw err instanceof Error ? err : new Error('Failed to update post');
        }
    };
    const submitForReview = async (id) => {
        return updatePost(id, { status: 'pending' });
    };
    const publishPost = async (id, publisherId) => {
        return updatePost(id, {
            status: 'published',
            published_by: publisherId,
            published_at: new Date().toISOString()
        });
    };
    const rejectPost = async (id) => {
        return updatePost(id, { status: 'rejected' });
    };
    const deletePost = async (id) => {
        try {
            const { error } = await supabase
                .from('posts')
                .delete()
                .eq('id', id);
            if (error)
                throw error;
            setPosts(prev => prev.filter(post => post.id !== id));
        }
        catch (err) {
            throw err instanceof Error ? err : new Error('Failed to delete post');
        }
    };
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
    };
}
export function usePost(slug) {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (!slug)
            return;
        const fetchPost = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('posts')
                    .select('*')
                    .eq('slug', slug)
                    .eq('status', 'published')
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
    }, [slug]);
    return { post, loading, error };
}
