// 'use server'

// import { createPost, updatePost, likePost, unlikePost, addComment, sharePost } from '@/controllers/postController'

// export async function createPostAction(formData: FormData) {
//   const content = formData.get('content') as string
//   const userId = formData.get('userId') as string
//   const imageUrl = formData.get('imageUrl') as string | undefined

//   try {
//     const newPost = await createPost({ userId, content, imageUrl })
//     return { success: true, post: newPost }
//   } catch (error) {
//     return { success: false, error: 'Failed to create post' }
//   }
// }

// export async function updatePostAction(postId: string, formData: FormData) {
//   const content = formData.get('content') as string

//   try {
//     const updatedPost = await updatePost(postId, { content })
//     return { success: true, post: updatedPost }
//   } catch (error) {
//     return { success: false, error: 'Failed to update post' }
//   }
// }

// export async function likePostAction(postId: string, userId: string) {
//   try {
//     await likePost(postId, userId)
//     return { success: true }
//   } catch (error) {
//     return { success: false, error: 'Failed to like post' }
//   }
// }

// export async function unlikePostAction(postId: string, userId: string) {
//   try {
//     await unlikePost(postId, userId)
//     return { success: true }
//   } catch (error) {
//     return { success: false, error: 'Failed to unlike post' }
//   }
// }

// export async function addCommentAction(postId: string, formData: FormData) {
//   const content = formData.get('content') as string
//   const userId = formData.get('userId') as string

//   try {
//     const newComment = await addComment(postId, { userId, content })
//     return { success: true, comment: newComment }
//   } catch (error) {
//     return { success: false, error: 'Failed to add comment' }
//   }
// }

// export async function sharePostAction(postId: string) {
//   try {
//     await sharePost(postId)
//     return { success: true }
//   } catch (error) {
//     return { success: false, error: 'Failed to share post' }
//   }
// }


'use server'

import { createPost, updatePost, likePost, unlikePost, addComment, sharePost } from '../../controllers/postController'

export async function createPostAction(formData: FormData) {
  const content = formData.get('content') as string
  const userId = formData.get('userId') as string
  const imageUrl = formData.get('imageUrl') as string | undefined

  try {
    const newPost = await createPost({ userId, content, imageUrl })
    return { success: true, post: newPost }
  } catch (error) {
    console.error('Error in createPostAction:', error)
    return { success: false, error: 'Failed to create post' }
  }
}

export async function updatePostAction(postId: string, formData: FormData) {
  const content = formData.get('content') as string

  try {
    const updatedPost = await updatePost(postId, { content })
    return { success: true, post: updatedPost }
  } catch (error) {
    console.error('Error in updatePostAction:', error)
    return { success: false, error: 'Failed to update post' }
  }
}

export async function likePostAction(postId: string, userId: string) {
  try {
    await likePost(postId, userId)
    return { success: true }
  } catch (error) {
    console.error('Error in likePostAction:', error)
    return { success: false, error: 'Failed to like post' }
  }
}

export async function unlikePostAction(postId: string, userId: string) {
  try {
    await unlikePost(postId, userId)
    return { success: true }
  } catch (error) {
    console.error('Error in unlikePostAction:', error)
    return { success: false, error: 'Failed to unlike post' }
  }
}

export async function addCommentAction(postId: string, formData: FormData) {
  const content = formData.get('content') as string
  const userId = formData.get('userId') as string

  try {
    const newComment = await addComment(postId, { userId, content })
    return { success: true, comment: newComment }
  } catch (error) {
    console.error('Error in addCommentAction:', error)
    return { success: false, error: 'Failed to add comment' }
  }
}

export async function sharePostAction(postId: string) {
  try {
    await sharePost(postId)
    return { success: true }
  } catch (error) {
    console.error('Error in sharePostAction:', error)
    return { success: false, error: 'Failed to share post' }
  }
}

