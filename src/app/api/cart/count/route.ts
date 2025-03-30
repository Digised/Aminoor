import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ count: 0 })
    }

    const cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
      include: {
        items: true,
      },
    })

    const count = cart?.items.reduce((total, item) => total + item.quantity, 0) || 0

    return NextResponse.json({ count })
  } catch (error) {
    console.error('Error getting cart count:', error)
    return NextResponse.json(
      { error: 'Failed to get cart count' },
      { status: 500 }
    )
  }
} 