import { NextRequest, NextResponse } from 'next/server'
import { likePost, unlikePost } from '@/controllers/postController'

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { userId } = await request.json()
    await likePost(params.id, userId)
    return NextResponse.json({ message: 'Post liked successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { userId } = await request.json()
    await unlikePost(params.id, userId)
    return NextResponse.json({ message: 'Post unliked successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

