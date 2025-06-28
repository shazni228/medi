import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

export type UserRole = 'admin' | 'writer' | 'publisher' | null

export function useUserRole() {
  const { user } = useAuth()
  const [role, setRole] = useState<UserRole>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setRole(null)
      setLoading(false)
      return
    }

    const fetchUserRole = async () => {
      try {
        // First try the RPC function
        const { data: rpcData, error: rpcError } = await supabase
          .rpc('get_user_role', { user_uuid: user.id })

        if (!rpcError && rpcData) {
          setRole(rpcData as UserRole)
          setLoading(false)
          return
        }

        // Fallback: direct query to user_roles table
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single()

        if (error) {
          // If no role found, that's okay - user just doesn't have a role yet
          if (error.code === 'PGRST116') {
            setRole(null)
          } else {
            console.error('Error fetching user role:', error)
            setRole(null)
          }
        } else {
          setRole(data.role as UserRole)
        }
      } catch (error) {
        console.error('Error fetching user role:', error)
        setRole(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUserRole()
  }, [user])

  const hasRole = (requiredRole: UserRole | UserRole[]) => {
    if (!role) return false
    
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(role)
    }
    
    return role === requiredRole
  }

  const canWrite = hasRole(['admin', 'writer', 'publisher'])
  const canPublish = hasRole(['admin', 'publisher'])
  const isAdmin = hasRole('admin')

  return {
    role,
    loading,
    hasRole,
    canWrite,
    canPublish,
    isAdmin,
  }
}