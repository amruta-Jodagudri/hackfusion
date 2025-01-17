'use client'

import React, { createContext, useState, useContext, useEffect } from 'react'
import { User } from '../types/user'
import { createUser } from '@/controllers/userController'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (username: string, email: string, password: string) => Promise<void>
  updateUser: (updatedUser: Partial<User>) => void
  followUser: (userId: string) => void
  unfollowUser: (userId: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = async (email: string, password: string) => {
    // This is a mock login. In a real app, you'd call an API here.
    const mockUser: User = {
      id: '1',
      username: 'testuser',
      email,
      profilePicture: '/placeholder.svg?height=200&width=200',
      bio: 'This is a test user',
      followers: [],
      following: [],
      privacy: {
        isPrivate: false,
        showEmail: true,
      },
      twoFactorEnabled: false,
    }
    setUser(mockUser)
    localStorage.setItem('user', JSON.stringify(mockUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const register = async (username: string, email: string, password: string) => {
    // This is a mock registration. In a real app, you'd call an API here.
    const mockUser: User = {
      id: '1',
      username,
      email,
      profilePicture: '/placeholder.svg?height=200&width=200',
      bio: '',
      password,
      followers: [],
      following: [],
      privacy: {
        isPrivate: false,
        showEmail: true,
      },
      twoFactorEnabled: false,
    }
    setUser(mockUser)
    try{
      let res = await createUser(mockUser);
    }
    catch{

    }
    localStorage.setItem('user', JSON.stringify(mockUser))
  }

  const updateUser = (updatedUser: Partial<User>) => {
    setUser(prev => {
      const newUser = { ...prev, ...updatedUser }
      localStorage.setItem('user', JSON.stringify(newUser))
      return newUser
    })
  }

  const followUser = (userId: string) => {
    setUser(prev => {
      if (!prev) return null
      const newUser = {
        ...prev,
        following: [...prev.following, userId]
      }
      localStorage.setItem('user', JSON.stringify(newUser))
      return newUser
    })
  }

  const unfollowUser = (userId: string) => {
    setUser(prev => {
      if (!prev) return null
      const newUser = {
        ...prev,
        following: prev.following.filter(id => id !== userId)
      }
      localStorage.setItem('user', JSON.stringify(newUser))
      return newUser
    })
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, updateUser, followUser, unfollowUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

