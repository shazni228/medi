import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useUserRole } from '../hooks/useUserRole'
import { supabase } from '../lib/supabase'
import { Shield, UserPlus, CheckCircle, AlertCircle } from 'lucide-react'

export function RoleAssignment() {
  const { user } = useAuth()
  const { role, isAdmin } = useUserRole()
  const [assigningRole, setAssigningRole] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const assignSelfAsAdmin = async () => {
    if (!user) return
    
    try {
      setAssigningRole(true)
      setMessage(null)

      // Try to assign admin role to current user
      const { error } = await supabase
        .from('user_roles')
        .insert({
          user_id: user.id,
          role: 'admin',
          created_by: user.id
        })

      if (error) {
        // If error is due to existing role, that's actually good
        if (error.code === '23505') { // unique constraint violation
          setMessage({ type: 'success', text: 'You already have admin access!' })
        } else {
          throw error
        }
      } else {
        setMessage({ type: 'success', text: 'Admin role assigned successfully! Please refresh the page.' })
      }
    } catch (err) {
      setMessage({ 
        type: 'error', 
        text: err instanceof Error ? err.message : 'Failed to assign admin role' 
      })
    } finally {
      setAssigningRole(false)
    }
  }

  const assignSelfAsWriter = async () => {
    if (!user) return
    
    try {
      setAssigningRole(true)
      setMessage(null)

      const { error } = await supabase
        .from('user_roles')
        .insert({
          user_id: user.id,
          role: 'writer',
          created_by: user.id
        })

      if (error) {
        if (error.code === '23505') {
          setMessage({ type: 'success', text: 'You already have writer access!' })
        } else {
          throw error
        }
      } else {
        setMessage({ type: 'success', text: 'Writer role assigned successfully! Please refresh the page.' })
      }
    } catch (err) {
      setMessage({ 
        type: 'error', 
        text: err instanceof Error ? err.message : 'Failed to assign writer role' 
      })
    } finally {
      setAssigningRole(false)
    }
  }

  if (!user) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <AlertCircle className="h-6 w-6 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-blue-900">Login Required</h3>
        </div>
        <p className="text-blue-800 mb-4">
          You need to be logged in to access the CMS. Please login or create an account first.
        </p>
      </div>
    )
  }

  if (role) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
          <h3 className="text-lg font-semibold text-green-900">Access Granted</h3>
        </div>
        <p className="text-green-800 mb-4">
          You have <strong className="capitalize">{role}</strong> access to the CMS.
        </p>
        <p className="text-sm text-green-700">
          You can now access the CMS from the navigation menu above.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="text-center mb-6">
        <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Get CMS Access</h3>
        <p className="text-gray-600">
          Choose your role to start using the MediBlog CMS
        </p>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {message.text}
        </div>
      )}

      <div className="space-y-4">
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900 flex items-center">
                <UserPlus className="h-5 w-5 mr-2 text-green-600" />
                Writer Access
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                Create and edit articles, submit for review
              </p>
            </div>
            <button
              onClick={assignSelfAsWriter}
              disabled={assigningRole}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              {assigningRole ? 'Assigning...' : 'Get Writer Access'}
            </button>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-blue-600" />
                Admin Access
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                Full access: write, publish, manage users
              </p>
            </div>
            <button
              onClick={assignSelfAsAdmin}
              disabled={assigningRole}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {assigningRole ? 'Assigning...' : 'Get Admin Access'}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-2">Role Descriptions:</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li><strong>Writer:</strong> Create articles, edit drafts, submit for review</li>
          <li><strong>Publisher:</strong> Review and publish articles from writers</li>
          <li><strong>Admin:</strong> All permissions plus user management</li>
        </ul>
      </div>
    </div>
  )
}