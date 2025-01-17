// 'use server'

// import { createUser, updateUser, followUser, unfollowUser } from '@/controllers/userController'

// export async function registerUser(formData: FormData) {
//   const username = formData.get('username') as string
//   const email = formData.get('email') as string
//   const password = formData.get('password') as string

//   try {
//     const newUser = await createUser({ username, email, password, profilePicture: '', bio: '' })
//     return { success: true, user: newUser }
//   } catch (error) {
//     return { success: false, error: 'Failed to register user' }
//   }
// }

// export async function updateUserProfile(userId: string, formData: FormData) {
//   const bio = formData.get('bio') as string
//   const profilePicture = formData.get('profilePicture') as string

//   try {
//     const updatedUser = await updateUser(userId, { bio, profilePicture })
//     return { success: true, user: updatedUser }
//   } catch (error) {
//     return { success: false, error: 'Failed to update user profile' }
//   }
// }

// export async function followUserAction(userId: string, followId: string) {
//   try {
//     await followUser(userId, followId)
//     return { success: true }
//   } catch (error) {
//     return { success: false, error: 'Failed to follow user' }
//   }
// }

// export async function unfollowUserAction(userId: string, unfollowId: string) {
//   try {
//     await unfollowUser(userId, unfollowId)
//     return { success: true }
//   } catch (error) {
//     return { success: false, error: 'Failed to unfollow user' }
//   }
// }


'use server'

import { createUser, updateUser, followUser, unfollowUser } from '../../controllers/userController'

export async function registerUser(formData: FormData) {
  const username = formData.get('username') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  try {
    const newUser = await createUser({ username, email, password })
    return { success: true, user: newUser }
  } catch (error) {
    console.error('Error in registerUser:', error)
    return { success: false, error: 'Failed to register user' }
  }
}

export async function updateUserProfile(userId: string, formData: FormData) {
  const bio = formData.get('bio') as string
  const profilePicture = formData.get('profilePicture') as string

  try {
    const updatedUser = await updateUser(userId, { bio, profilePicture })
    return { success: true, user: updatedUser }
  } catch (error) {
    console.error('Error in updateUserProfile:', error)
    return { success: false, error: 'Failed to update user profile' }
  }
}

export async function followUserAction(userId: string, followId: string) {
  try {
    await followUser(userId, followId)
    return { success: true }
  } catch (error) {
    console.error('Error in followUserAction:', error)
    return { success: false, error: 'Failed to follow user' }
  }
}

export async function unfollowUserAction(userId: string, unfollowId: string) {
  try {
    await unfollowUser(userId, unfollowId)
    return { success: true }
  } catch (error) {
    console.error('Error in unfollowUserAction:', error)
    return { success: false, error: 'Failed to unfollow user' }
  }
}

