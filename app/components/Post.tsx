'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SafePost, SafeComment } from '@/models/Post'
import { likePostAction, unlikePostAction, addCommentAction, sharePostAction } from '../actions/postActions'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart, MessageCircle, Share2 } from 'lucide-react'

interface PostProps {
  post: SafePost
  currentUserId: string
}

export function Post({ post, currentUserId }: PostProps) {
  const [liked, setLiked] = useState(post.likes.includes(currentUserId))
  const [likesCount, setLikesCount] = useState(post.likes.length)
  const [comments, setComments] = useState<SafeComment[]>(post.comments)
  const [newComment, setNewComment] = useState('')
  const router = useRouter()

  async function handleLike() {
    if (liked) {
      await unlikePostAction(post._id, currentUserId)
      setLiked(false)
      setLikesCount(prev => prev - 1)
    } else {
      await likePostAction(post._id, currentUserId)
      setLiked(true)
      setLikesCount(prev => prev + 1)
    }
    router.refresh()
  }

  async function handleAddComment(e: React.FormEvent) {
    e.preventDefault()
    const formData = new FormData()
    formData.append('content', newComment)
    formData.append('userId', currentUserId)
    const result = await addCommentAction(post._id, formData)
    if (result.success) {
      setComments(prev => [...prev, result?.comment])
      setNewComment('')
      router.refresh()
    }
  }

  async function handleShare() {
    await sharePostAction(post._id)
    router.refresh()
  }

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4">
      <div className="flex items-center mb-2">
        <Avatar className="h-10 w-10 rounded-full mr-2">
          <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${post.userId}`} alt={post.userId} />
          <AvatarFallback>{post.userId[0]}</AvatarFallback>
        </Avatar>
        <span className="font-semibold">{post.userId}</span>
      </div>
      <p className="text-gray-700 mb-4">{post.content}</p>
      {post.imageUrl && (
        <img src={post.imageUrl || "/placeholder.svg"} alt="Post image" className="w-full h-auto rounded-lg mb-4" />
      )}
      <div className="flex items-center text-gray-500 mb-4">
        <Button variant="ghost" size="sm" onClick={handleLike} className={liked ? 'text-red-500' : ''}>
          <Heart className="h-5 w-5 mr-1" />
          <span>{likesCount}</span>
        </Button>
        <Button variant="ghost" size="sm">
          <MessageCircle className="h-5 w-5 mr-1" />
          <span>{comments.length}</span>
        </Button>
        <Button variant="ghost" size="sm" onClick={handleShare}>
          <Share2 className="h-5 w-5 mr-1" />
          <span>Share</span>
        </Button>
      </div>
      <div className="mb-4">
        {comments.map((comment) => (
          <div key={comment._id} className="flex items-start mb-2">
            <Avatar className="h-8 w-8 rounded-full mr-2">
              <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${comment.userId}`} alt={comment.userId} />
              <AvatarFallback>{comment.userId[0]}</AvatarFallback>
            </Avatar>
            <div>
              <span className="font-semibold mr-2">{comment.userId}</span>
              <span className="text-gray-700">{comment.content}</span>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleAddComment} className="flex items-center">
        <Input
          type="text"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-grow mr-2"
        />
        <Button type="submit" size="sm">
          Comment
        </Button>
      </form>
    </div>
  )
}

