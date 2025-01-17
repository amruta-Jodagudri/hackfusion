import dbConnect from '../lib/mongoose'
import Post, { IPost, IComment } from '../models/Post'
import User from '../models/User'
import mongoose from 'mongoose'

export async function getPosts(): Promise<IPost[]> {
  await dbConnect()
  return Post.find().sort({ createdAt: -1 }).lean()
}

export async function getPostById(id: string): Promise<IPost | null> {
  await dbConnect()
  return Post.findById(id).lean()
}

export async function createPost(postData: Partial<IPost>): Promise<IPost> {
  await dbConnect()
  const newPost = new Post(postData)
  const savedPost = await newPost.save()
  await User.findByIdAndUpdate(postData.userId, { $push: { posts: savedPost._id } })
  return savedPost
}

export async function updatePost(id: string, postData: Partial<IPost>): Promise<IPost | null> {
  await dbConnect()
  return Post.findByIdAndUpdate(id, postData, { new: true }).lean()
}

export async function likePost(postId: string, userId: string): Promise<void> {
  await dbConnect()
  await Post.findByIdAndUpdate(postId, { $addToSet: { likes: userId } })
}

export async function unlikePost(postId: string, userId: string): Promise<void> {
  await dbConnect()
  await Post.findByIdAndUpdate(postId, { $pull: { likes: userId } })
}

export async function addComment(postId: string, comment: Partial<IComment>): Promise<IComment> {
  await dbConnect()
  const post = await Post.findById(postId)
  if (!post) {
    throw new Error('Post not found')
  }
  post.comments.push(comment as IComment)
  await post.save()
  return post.comments[post.comments.length - 1]
}

export async function sharePost(postId: string): Promise<void> {
  await dbConnect()
  await Post.findByIdAndUpdate(postId, { $inc: { shares: 1 } })
}

