import { NextRequest, NextResponse } from 'next/server'
import { followUser, unfollowUser } from '@/controllers/userController'

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { followId } = await request.json()
    await followUser(params.id, followId)
    return NextResponse.json({ message: 'User followed successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { unfollowId } = await request.json()
    await unfollowUser(params.id, unfollowId)
    return NextResponse.json({ message: 'User unfollowed successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

