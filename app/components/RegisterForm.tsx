'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { registerUser } from '../actions/userActions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function RegisterForm() {
  const [error, setError] = useState('')
  const router = useRouter()

  async function onSubmit(formData: FormData) {
    const result = await registerUser(formData)
    if (result.success) {
      router.push('/login')
    } else {
      setError(result.error || 'An error occurred')
    }
  }

  return (
    <form action={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="username">Username</Label>
        <Input id="username" name="username" required />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit">Register</Button>
    </form>
  )
}

