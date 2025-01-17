import { redirect } from 'next/navigation'
import { getPosts } from '../controllers/postController'
import { getUserById } from '../controllers/userController'
import { CreatePostForm } from './components/CreatePostForm'
import { Post } from './components/Post'

export default async function Home() {
  const posts = await getPosts()
  const currentUser = await getUserById('current-user-id') // Replace with actual user authentication

  if (!currentUser) {
    redirect('/auth') // Server-side redirection
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Social Media Feed</h1>
      <CreatePostForm userId={currentUser._id} />
      <div className="mt-8">
        {posts.map(post => (
          <Post key={post._id} post={post} currentUserId={currentUser._id} />
        ))}
      </div>
    </div>
  )
}
