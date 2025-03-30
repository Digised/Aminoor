import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

interface CheckoutItem {
  productId: string
  quantity: number
  price: number
}

interface ShippingDetails {
  name: string
  email: string
  address: string
  city: string
  country: string
  postalCode: string
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await request.json()
    const { items, shippingAddress } = body

    if (!items?.length) {
      return new NextResponse('No items in cart', { status: 400 })
    }

    // Create order
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        status: 'PENDING',
        total: items.reduce((acc: number, item: CheckoutItem) => acc + item.price * item.quantity, 0),
        shippingAddress,
        items: {
          create: items.map((item: CheckoutItem) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    })

    return NextResponse.json({ orderId: order.id })
  } catch (error) {
    console.error('[CHECKOUT_ERROR]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 