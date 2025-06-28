import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useUserRole } from '../hooks/useUserRole'
import { Stethoscope, LogIn, LogOut, User, LayoutDashboard, Key, Menu, X } from 'lucide-react'

export function Header() {
  const { user, signOut } = useAuth()
  const { canWrite, role } = useUserRole()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="bg-white shadow-lg border-b-2 border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Stethoscope className="h-8 w-8 text-blue-600" />
            <Link to="/" className="text-2xl font-bold text-blue-900 hover:text-blue-700 transition-colors">
              MediBlog
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Home
            </Link>
            
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              About
            </Link>
            
            <Link 
              to="/contact" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Contact
            </Link>
            
            {/* Dashboard Access */}
            {canWrite ? (
              <Link 
                to="/dashboard" 
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </Link>
            ) : user ? (
              <Link 
                to="/get-access" 
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                <Key size={18} />
                <span>Get Access</span>
              </Link>
            ) : null}
          </nav>

          {/* Desktop User Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-700">
                  <User size={18} className="text-blue-600" />
                  <div className="text-sm">
                    <div className="font-medium">{user.email}</div>
                    {role && (
                      <div className="text-xs text-blue-600 capitalize">{role}</div>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 bg-red-50 text-red-700 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors duration-200"
                >
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <LogIn size={18} />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              {/* Navigation Links */}
              <Link 
                to="/" 
                onClick={closeMobileMenu}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 px-2 py-1"
              >
                Home
              </Link>
              
              <Link 
                to="/about" 
                onClick={closeMobileMenu}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 px-2 py-1"
              >
                About
              </Link>
              
              <Link 
                to="/contact" 
                onClick={closeMobileMenu}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 px-2 py-1"
              >
                Contact
              </Link>
              
              {/* Dashboard/Get Access */}
              {canWrite ? (
                <Link 
                  to="/dashboard" 
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 px-2 py-1"
                >
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </Link>
              ) : user ? (
                <Link 
                  to="/get-access" 
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 px-2 py-1"
                >
                  <Key size={18} />
                  <span>Get Access</span>
                </Link>
              ) : null}

              {/* User Section */}
              {user ? (
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex items-center space-x-2 text-gray-700 px-2 py-1 mb-3">
                    <User size={18} className="text-blue-600" />
                    <div className="text-sm">
                      <div className="font-medium">{user.email}</div>
                      {role && (
                        <div className="text-xs text-blue-600 capitalize">{role}</div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleSignOut()
                      closeMobileMenu()
                    }}
                    className="flex items-center space-x-2 bg-red-50 text-red-700 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors duration-200 w-full"
                  >
                    <LogOut size={18} />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 w-full"
                  >
                    <LogIn size={18} />
                    <span>Login</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}