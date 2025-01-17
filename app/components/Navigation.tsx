'use client'

import Link from 'next/link'
import { Home, User, Bell, Menu, LogOut } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { Button } from "@/components/ui/button"

export default function Navigation() {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-indigo-600">SocialHub</Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              <Home className="h-5 w-5" />
            </Link>
            <Link href="/profile" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              <User className="h-5 w-5" />
            </Link>
            <Link href="/notifications" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              <Bell className="h-5 w-5" />
            </Link>
            {user ? (
              <Button onClick={logout} variant="ghost" size="sm" className="ml-2">
                <LogOut className="h-5 w-5 mr-1" />
                Logout
              </Button>
            ) : (
              <Link href="/auth" className="ml-2">
                <Button variant="ghost" size="sm">Login / Register</Button>
              </Link>
            )}
          </div>
          <div className="flex items-center sm:hidden">
            <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

