import { NextRequest, NextResponse } from 'next/server'
import { sharePost } from '@/controllers/postController'

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await sharePost(params.id)
    return NextResponse.json({ message: 'Post shared successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

