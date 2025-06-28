import React from 'react'
import { RoleAssignment } from '../components/RoleAssignment'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { LogIn, ArrowRight } from 'lucide-react'

export function GetAccess() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Access MediBlog CMS
          </h1>
          <p className="text-gray-600">
            Get the right permissions to start creating and managing medical content
          </p>
        </div>

        {!user ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <LogIn className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Login Required
            </h2>
            <p className="text-gray-600 mb-6">
              You need to login or create an account to access the CMS
            </p>
            <Link
              to="/login"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Login
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        ) : (
          <RoleAssignment />
        )}

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}