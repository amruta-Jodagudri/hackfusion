// import { NextResponse } from 'next/server'
// import { ObjectId } from 'mongodb'
// import clientPromise from '../lib/mongodb'
// import { User, SafeUser } from '../models/User'
// import bcrypt from 'bcryptjs'

// export async function getUsers(): Promise<SafeUser[]> {
//   
//   const users = await client.db().collection<User>('users').find().toArray()
//   return users.map(user => ({
//     ...user,
//     _id: user._id.toString(),
//     followers: user.followers.map(id => id.toString()),
//     following: user.following.map(id => id.toString()),
//     posts: user.posts.map(id => id.toString()),
//     password: undefined
//   }))
// }

// export async function getUserById(id: string): Promise<SafeUser | null> {
//   const client = await clientPromise;
//   console.log((id), 123456789012345678901234);
//   const user = await client.db().collection<User>('users').findOne({ _id: new ObjectId(123456789012345678901234) })
//   if (!user) return null
//   return {
//     ...user,
//     _id: user._id.toString(),
//     followers: user.followers.map(id => id.toString()),
//     following: user.following.map(id => id.toString()),
//     posts: user.posts.map(id => id.toString()),
//     password: undefined
//   }
// }

// export async function createUser(userData: Omit<User, '_id' | 'followers' | 'following' | 'posts'>): Promise<SafeUser> {
//   const client = await clientPromise
//   const hashedPassword = await bcrypt.hash(userData.password, 10)
//   const newUser: Omit<User, '_id'> = {
//     ...userData,
//     password: hashedPassword,
//     followers: [],
//     following: [],
//     posts: []
//   }
//   const result = await client.db().collection<User>('users').insertOne(newUser)
//   const createdUser = await getUserById(result.insertedId.toString())
//   return createdUser!
// }

// export async function updateUser(id: string, userData: Partial<User>): Promise<SafeUser | null> {
//   const client = await clientPromise
//   const result = await client.db().collection<User>('users').findOneAndUpdate(
//     { _id: new ObjectId(id) },
//     { $set: userData },
//     { returnDocument: 'after' }
//   )
//   if (!result.value) return null
//   return {
//     ...result.value,
//     _id: result.value._id.toString(),
//     followers: result.value.followers.map(id => id.toString()),
//     following: result.value.following.map(id => id.toString()),
//     posts: result.value.posts.map(id => id.toString()),
//     password: undefined
//   }
// }

// export async function followUser(userId: string, followId: string): Promise<void> {
//   const client = await clientPromise
//   await client.db().collection<User>('users').updateOne(
//     { _id: new ObjectId(userId) },
//     { $addToSet: { following: new ObjectId(followId) } }
//   )
//   await client.db().collection<User>('users').updateOne(
//     { _id: new ObjectId(followId) },
//     { $addToSet: { followers: new ObjectId(userId) } }
//   )
// }

// export async function unfollowUser(userId: string, unfollowId: string): Promise<void> {
//   const client = await clientPromise
//   await client.db().collection<User>('users').updateOne(
//     { _id: new ObjectId(userId) },
//     { $pull: { following: new ObjectId(unfollowId) } }
//   )
//   await client.db().collection<User>('users').updateOne(
//     { _id: new ObjectId(unfollowId) },
//     { $pull: { followers: new ObjectId(userId) } }
//   )
// }


import dbConnect from '../lib/mongoose'
import User, { IUser } from '../models/User'
import bcrypt from 'bcryptjs'

export async function getUsers(): Promise<IUser[]> {
  await dbConnect()
  return User.find().lean()
}

export async function getUserById(id: string): Promise<IUser | null> {
  await dbConnect()
  try {
    
    const user = await  User.findById(id).lean();
    return user;
  } catch (error) {
    return null;
  }
}

export async function createUser(userData: Partial<IUser>): Promise<IUser> {
  await dbConnect()
  const hashedPassword = await bcrypt.hash(userData.password!, 10)
  const newUser = new User({
    ...userData,
    password: hashedPassword,
  })
  return newUser.save()
}

export async function updateUser(id: string, userData: Partial<IUser>): Promise<IUser | null> {
  await dbConnect()
  return User.findByIdAndUpdate(id, userData, { new: true }).lean()
}

export async function followUser(userId: string, followId: string): Promise<void> {
  await dbConnect()
  await User.findByIdAndUpdate(userId, { $addToSet: { following: followId } })
  await User.findByIdAndUpdate(followId, { $addToSet: { followers: userId } })
}

export async function unfollowUser(userId: string, unfollowId: string): Promise<void> {
  await dbConnect()
  await User.findByIdAndUpdate(userId, { $pull: { following: unfollowId } })
  await User.findByIdAndUpdate(unfollowId, { $pull: { followers: userId } })
}

