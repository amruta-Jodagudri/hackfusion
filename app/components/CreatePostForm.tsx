'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createPostAction } from '../actions/postActions'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

interface CreatePostFormProps {
  userId: string
}

export function CreatePostForm({ userId }: CreatePostFormProps) {
  const [error, setError] = useState('')
  const router = useRouter()

  async function onSubmit(formData: FormData) {
    formData.append('userId', userId)
    const result = await createPostAction(formData)
    if (result.success) {
      router.refresh()
    } else {
      setError(result.error || 'An error occurred')
    }
  }

  return (
    <form action={onSubmit} className="space-y-4">
      <Textarea name="content" placeholder="What's on your mind?" required />
      <Input name="imageUrl" type="text" placeholder="Image URL (optional)" />
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit">Create Post</Button>
    </form>
  )
}

