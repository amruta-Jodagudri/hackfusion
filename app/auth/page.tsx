'use client'

import { useState } from 'react'
import { LoginForm, RegisterForm } from '../components/AuthForms'
import { Button } from "@/components/ui/button"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isLogin ? 'Sign in to your account' : 'Create a new account'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {isLogin ? <LoginForm /> : <RegisterForm />}
          <div className="mt-6">
            <Button
              onClick={() => setIsLogin(!isLogin)}
              variant="outline"
              className="w-full"
            >
              {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

