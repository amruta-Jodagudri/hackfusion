import { NextRequest, NextResponse } from 'next/server'
import { getPostById, updatePost } from '@/controllers/postController'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const post = await getPostById(params.id)
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }
    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const postData = await request.json()
    const updatedPost = await updatePost(params.id, postData)
    if (!updatedPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }
    return NextResponse.json(updatedPost)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

