import { NextRequest, NextResponse } from 'next/server'
import { addComment } from '@/controllers/postController'

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const commentData = await request.json()
    const newComment = await addComment(params.id, commentData)
    return NextResponse.json(newComment, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

